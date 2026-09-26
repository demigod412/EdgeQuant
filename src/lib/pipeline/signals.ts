import "server-only";
import type { PrismaClient, Setup, Instrument } from "@prisma/client";
import { atr, featuresAt } from "../model/features";
import { buildSamples, totalBps, type SetupDef } from "../model/backtest";
import { applyCalibration, fitCalibration, fitLogit, predictLogit, IDENTITY, type Calibration, type Fit } from "../model/logit";
import { expectedR } from "../model/barriers";
import { costInR, orderPlan, simulatePlan, type EntryStyle, type ManageMode, DEFAULT_PLAN } from "../model/plan";
import { sizePosition } from "../risk";
import { ENTRY_RULES } from "../setups";
import { barsOf, tfMs } from "./ingest";
import { brier } from "../model/stats";

export const MODEL_VERSION = "eq-logit-v1";
const ENTRY_TEXT: Record<string, string> = { market: "Market at bar close", limit: "Buy/sell LIMIT at", stop: "STOP entry at" };
const defOf = (s: Setup): SetupDef => ({ key: s.key, side: s.side, atrTarget: s.atrTarget, atrStop: s.atrStop, horizonBars: s.horizonBars, entryRule: ENTRY_RULES[s.key] });

/**
 * Refit a setup's model on everything settled so far, and store it. Coefficients come from the older part of the
 * window and the calibration from the newest quarter, so the calibration is never fitted on its own training data.
 */
export async function refitSetup(db: PrismaClient, setup: Setup) {
  const instruments = await db.instrument.findMany({ where: { enabled: true } });
  const X: number[][] = [], y: (0 | 1)[] = [];
  for (const inst of instruments) {
    const bars = await barsOf(db, inst.id, setup.timeframe, 2000);
    if (bars.length < 300) continue;
    for (const s of buildSamples(bars, defOf(setup), { feeBps: inst.feeBps, slipBps: inst.slipBps })) { X.push(s.x); y.push(s.y); }
  }
  if (X.length < 250) return { fitted: false, n: X.length };
  const cut = Math.floor(X.length * 0.75);
  const core = fitLogit(X.slice(0, cut), y.slice(0, cut), { l2: 2 });
  const cal = fitCalibration(X.slice(cut).map((x, i) => ({ p: predictLogit(core, x), y: y[cut + i] })));
  const full = fitLogit(X, y, { l2: 2 });
  const score = brier(X.slice(cut).map((x, i) => ({ p: applyCalibration(cal, predictLogit(core, x)), y: y[cut + i] })));
  await db.modelFit.updateMany({ where: { setupId: setup.id, active: true }, data: { active: false } });
  await db.modelFit.create({ data: { setupId: setup.id, modelVersion: MODEL_VERSION, coefficients: full as unknown as object, calibration: cal as unknown as object, n: X.length, fittedTo: new Date(), brier: score } });
  return { fitted: true, n: X.length, brier: score };
}

async function activeFit(db: PrismaClient, setupId: string): Promise<{ fit: Fit; cal: Calibration } | null> {
  const row = await db.modelFit.findFirst({ where: { setupId, active: true }, orderBy: { createdAt: "desc" } });
  return row ? { fit: row.coefficients as unknown as Fit, cal: row.calibration as unknown as Calibration } : null;
}

/**
 * Make calls on the latest CLOSED bar of every instrument that passes each setup's rule.
 * One call per instrument+setup+bar, written once: the ledger is append-only by construction.
 */
export async function generateSignals(db: PrismaClient, opts: { minEdgeR?: number } = {}) {
  const minEdge = opts.minEdgeR ?? 0.02;
  const setups = await db.setup.findMany({ where: { enabled: true } });
  const instruments = await db.instrument.findMany({ where: { enabled: true } });
  let made = 0, skipped = 0;
  /*
   * Why each candidate was passed over, and the best edge anyone came close with.
   *
   * "made 0, skipped 40" is true but unusable: no calls is the normal state most of the time, and
   * without a reason there is no way to tell a working pipeline waiting for a setup from a broken one.
   * Three of the paths below did not even reach the counter, so they vanished from both numbers.
   */
  const why: Record<string, number> = {};
  const skip = (reason: string) => { why[reason] = (why[reason] ?? 0) + 1; skipped++; };
  let bestEdge: { instrument: string; setup: string; edge: number } | null = null;

  for (const setup of setups) {
    const model = await activeFit(db, setup.id);
    if (!model) { skip("no fitted model"); continue; }
    for (const inst of instruments) {
      const bars = await barsOf(db, inst.id, setup.timeframe, 400);
      if (bars.length < 150) { skip(`not enough ${setup.timeframe} history`); continue; }
      const rule = ENTRY_RULES[setup.key];
      if (rule && !rule(bars)) { skip("setup rule not met on the latest bar"); continue; }
      const x = featuresAt(bars);
      const a = atr(bars, 14);
      if (!x || !(a > 0)) { skip("features or ATR unavailable"); continue; }
      const last = bars[bars.length - 1];
      const cfg = { ...DEFAULT_PLAN, entry: setup.entryStyle as EntryStyle, manage: setup.manageMode as ManageMode };
      const plan = orderPlan(setup.side, last.close, a, setup.atrStop, setup.atrTarget, cfg);
      const entry = plan.orderPrice, stop = plan.stop, target = plan.target;
      const rawP = predictLogit(model.fit, x), calP = applyCalibration(model.cal, rawP);
      const edge = expectedR(calP, plan.rr, entry, stop, totalBps(inst));
      if (!bestEdge || edge > bestEdge.edge) bestEdge = { instrument: inst.display, setup: setup.key, edge };
      if (edge < minEdge) { skip(`edge below the ${minEdge}R floor`); continue; }
      const barTime = new Date(last.openTime);
      const exists = await db.signal.findUnique({ where: { instrumentId_setupId_barTime: { instrumentId: inst.id, setupId: setup.id, barTime } } });
      if (exists) { skip("already called on this bar"); continue; }
      const created = await db.signal.create({ data: { instrumentId: inst.id, setupId: setup.id, barTime, entry, stop, target, atr: a, rawP, calP, edge,
        entryStyle: cfg.entry, manageMode: cfg.manage, rr: plan.rr,
        features: Object.fromEntries(x.map((v, i) => [`f${i}`, v])), modelVersion: MODEL_VERSION } });
      made++;
      // Alert with the full ticket, sized to the saved risk profile. A failed send never blocks the ledger.
      const risk = await db.riskProfile.findUnique({ where: { id: "default" } });
      const { riskState } = await import("./portfolio");
      const brake = await riskState(db);                    // halve or stop after a bad run
      const size = sizePosition({ accountSize: risk?.accountSize ?? 1000, riskPct: (risk?.riskPctPerTrade ?? 1) * brake.multiplier, entry, stop, p: calP, rewardR: plan.rr, kellyFraction: risk?.kellyFraction ?? 0.25 });
      const { sendAlert, entryMessage } = await import("../alerts"); // lazy: keeps this module usable without settings
      const sent = await sendAlert(entryMessage({ instrument: inst.display, side: setup.side, setup: setup.name, timeframe: setup.timeframe,
        style: ENTRY_TEXT[cfg.entry], order: entry, stop, target, rr: plan.rr, p: calP, edge, units: size.units, risk: size.cashRisk, horizonBars: setup.horizonBars }) + (brake.note ? `\n<i>${brake.note}</i>` : ""));
      if (sent.ok) await db.signal.update({ where: { id: created.id }, data: { alertedAt: new Date() } });
    }
  }
  // bestEdge is the honest measure of how close anything came: an edge of -0.4R means nothing was
  // remotely tradeable, while -0.01R against a 0.02R floor means the next bar could well fire.
  return { made, skipped, why, bestEdge: bestEdge ? { ...bestEdge, edge: Number(bestEdge.edge.toFixed(3)) } : null };
}

/** Settle open calls from the bars that followed. Never edits a call: it fills in the outcome once, from data. */
/** Settle open calls from the bars that followed, honouring the entry style and management rule they were made with. */
export async function settleSignals(db: PrismaClient) {
  const open = await db.signal.findMany({ where: { state: "OPEN" }, include: { instrument: true, setup: true } });
  let settled = 0;
  for (const s of open) {
    const bars = await barsOf(db, s.instrumentId, s.setup.timeframe, 800);
    const idx = bars.findIndex((b) => b.openTime === +s.barTime);
    if (idx < 0) continue;
    const cfg = { ...DEFAULT_PLAN, entry: s.entryStyle as EntryStyle, manage: s.manageMode as ManageMode };
    const out = simulatePlan(bars, idx + 1, s.setup.side, { style: cfg.entry, orderPrice: s.entry, stop: s.stop, target: s.target, rr: s.rr }, s.setup.horizonBars, cfg);
    if (!out) continue;                                            // still running
    if (!out.filled) {
      await db.signal.update({ where: { id: s.id }, data: { state: "VOID", settledAt: new Date(), note: "order never filled" } });
      settled++; continue;
    }
    const legs = cfg.manage === "partial" ? 2 : 1;
    const r = (out.rMultiple ?? 0) - costInR(out.entry!, s.stop, s.instrument.feeBps + 2 * s.instrument.slipBps, legs);
    const exitTime = new Date(bars[out.exitIndex!].openTime + tfMs(s.setup.timeframe));
    await db.signal.update({ where: { id: s.id }, data: { state: out.outcome as "WON" | "LOST" | "TIMEOUT", exitPrice: out.exitPrice, exitTime, rMultiple: r, settledAt: new Date() } });
    settled++;
    const held = `${Math.max(1, Math.round((+exitTime - +s.barTime) / tfMs(s.setup.timeframe)))} bars`;
    const { sendAlert, exitMessage } = await import("../alerts");
    const sent = await sendAlert(exitMessage({ instrument: s.instrument.display, side: s.setup.side, outcome: out.outcome ?? "", exit: out.exitPrice ?? 0, r, held }));
    if (sent.ok) await db.signal.update({ where: { id: s.id }, data: { exitAlertedAt: new Date() } });
  }
  return { settled };
}
