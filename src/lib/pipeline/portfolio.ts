import "server-only";
import type { PrismaClient } from "@prisma/client";
import { rankUniverse, volTargetWeights, circuitBreaker, correlation, effectiveBets, type Series } from "../portfolio";
import { brier } from "../model/stats";
import { barsOf } from "./ingest";

const BARS_PER_YEAR: Record<string, number> = { "15m": 35_040, "1h": 8760, "4h": 2190, "1d": 365 };

/** Rank the universe, size it by volatility, and store the snapshot so the choice can be reviewed later. */
export async function rebuildPortfolio(db: PrismaClient, opts: { timeframe?: string; targetVol?: number; longSlots?: number; maxTotalRiskPct?: number } = {}) {
  const tf = opts.timeframe ?? "1d", targetVol = opts.targetVol ?? 0.3;
  const instruments = await db.instrument.findMany({ where: { enabled: true } });
  const series: Series[] = [];
  for (const i of instruments) {
    const bars = await barsOf(db, i.id, tf, 400);
    if (bars.length >= 120) series.push({ id: i.id, display: i.display, market: i.market as string, closes: bars.map((b) => b.close) });
  }
  if (!series.length) return { ranked: 0 };
  const ranked = rankUniverse(series, { barsPerYear: BARS_PER_YEAR[tf] ?? 365, longSlots: opts.longSlots ?? 5 });
  const risk = await db.riskProfile.findUnique({ where: { id: "default" } });
  const weighted = volTargetWeights(ranked, { targetVol, maxTotalRiskPct: opts.maxTotalRiskPct ?? risk?.maxOpenRisk ?? 3 });
  // How independent are the held positions really?
  const held = weighted.map((w) => series.find((s) => s.id === w.id)!);
  const corr = held.map((a) => held.map((b) => correlation(a.closes, b.closes)));
  const rows = ranked.map((r) => ({ ...r, weight: weighted.find((w) => w.id === r.id)?.weight ?? 0, riskPct: weighted.find((w) => w.id === r.id)?.riskPct ?? 0 }));
  await db.portfolioSnapshot.create({ data: { targetVol, rows: rows as unknown as object,
    note: held.length ? `${held.length} held · about ${effectiveBets(corr).toFixed(1)} independent bets` : null } });
  return { ranked: ranked.length, held: held.length, effectiveBets: held.length ? effectiveBets(corr) : 0 };
}

/**
 * Switch off a setup whose recent calls no longer beat a no-skill forecaster, and switch it back on if it recovers.
 * Hoping a broken setup comes back is the expensive way to find out.
 */
export async function reviewSetups(db: PrismaClient, opts: { minCalls?: number; window?: number } = {}) {
  const minCalls = opts.minCalls ?? 40, window = opts.window ?? 120;
  const out: Record<string, string> = {};
  for (const setup of await db.setup.findMany()) {
    const calls = await db.signal.findMany({ where: { setupId: setup.id, state: { in: ["WON", "LOST"] } }, orderBy: { barTime: "desc" }, take: window, select: { calP: true, state: true } });
    if (calls.length < minCalls) { out[setup.key] = `only ${calls.length} settled calls — leaving alone`; continue; }
    const rows = calls.map((c) => ({ p: c.calP, y: (c.state === "WON" ? 1 : 0) as 0 | 1 }));
    const base = rows.reduce((s, r) => s + r.y, 0) / rows.length;
    const model = brier(rows), noSkill = brier(rows.map((r) => ({ p: base, y: r.y })));
    const worse = model > noSkill;
    if (worse && setup.enabled) {
      await db.setup.update({ where: { id: setup.id }, data: { enabled: false, autoDisabledAt: new Date(), reviewNote: `Brier ${model.toFixed(3)} vs no-skill ${noSkill.toFixed(3)} over ${rows.length} calls` } });
      out[setup.key] = "disabled: no longer beating a no-skill forecaster";
    } else if (!worse && !setup.enabled && setup.autoDisabledAt) {
      await db.setup.update({ where: { id: setup.id }, data: { enabled: true, autoDisabledAt: null, reviewNote: `Re-enabled: Brier ${model.toFixed(3)} vs no-skill ${noSkill.toFixed(3)}` } });
      out[setup.key] = "re-enabled: beating no-skill again";
    } else out[setup.key] = `${worse ? "below" : "above"} no-skill (${model.toFixed(3)} vs ${noSkill.toFixed(3)})`;
  }
  return out;
}

/** Size multiplier from the recent record: this is what actually protects the account. */
export async function riskState(db: PrismaClient, lookback = 40) {
  const recent = await db.signal.findMany({ where: { state: { in: ["WON", "LOST", "TIMEOUT"] } }, orderBy: { settledAt: "desc" }, take: lookback, select: { rMultiple: true } });
  return circuitBreaker(recent.map((r) => r.rMultiple ?? 0).reverse());
}

/** Store the latest funding for every crypto instrument, so the carry view is based on real history. */
export async function syncFunding(db: PrismaClient, fetcher?: (symbol: string) => Promise<{ rate: number; intervalHours: number; fundedAt: number }[]>) {
  const get = fetcher ?? (await import("../data/funding")).fetchFunding;
  const rows = await db.instrument.findMany({ where: { enabled: true, market: "CRYPTO" } });
  let saved = 0;
  for (const i of rows) {
    try {
      for (const f of await get(i.symbol)) {
        await db.fundingRate.upsert({ where: { instrumentId_fundedAt: { instrumentId: i.id, fundedAt: new Date(f.fundedAt) } },
          update: { rate: f.rate }, create: { instrumentId: i.id, fundedAt: new Date(f.fundedAt), rate: f.rate, intervalHours: f.intervalHours } });
        saved++;
      }
    } catch { /* funding is a bonus, never a blocker */ }
  }
  return { saved };
}
