import { applyCalibration, fitCalibration, fitLogit, predictLogit, IDENTITY, type Calibration, type Fit } from "./logit";
import { atr, featuresAt, type Bar } from "./features";
import { expectedR, rMultiple, tripleBarrier } from "./barriers";
import { costInR, orderPlan, simulatePlan, type ManageMode, type EntryStyle, type PlanConfig, DEFAULT_PLAN } from "./plan";
import { brier, buckets, maxDrawdown, mean } from "./stats";

export interface SetupDef { key: string; side: "LONG" | "SHORT"; atrTarget: number; atrStop: number; horizonBars: number; entryRule?: (bars: Bar[]) => boolean }
export interface Costs { feeBps: number; slipBps: number }
export const totalBps = (c: Costs) => c.feeBps + 2 * c.slipBps;

export interface VariantResult { entry: EntryStyle; manage: ManageMode; trades: number; filled: number; hitRate: number; expectR: number; totalR: number; maxDdR: number }

/**
 * Score one entry style + management rule over the SAME signals, so the comparison is like for like.
 * Unfilled limit/stop orders are counted as zero-R non-trades, which is the honest way to price "it got away".
 */
export function scoreVariant(bars: Bar[], s: SetupDef, costs: Costs, cfg: PlanConfig, indices: { i: number; atr: number }[]): VariantResult {
  const rs: number[] = []; let filled = 0, wins = 0;
  for (const { i, atr: a } of indices) {
    const plan = orderPlan(s.side, bars[i].close, a, s.atrStop, s.atrTarget, cfg);
    const out = simulatePlan(bars, i + 1, s.side, plan, s.horizonBars, cfg);
    if (!out) continue;
    if (!out.filled) { rs.push(0); continue; }
    filled++;
    const legs = cfg.manage === "partial" ? 2 : 1;
    const r = (out.rMultiple ?? 0) - costInR(out.entry!, plan.stop, totalBps(costs), legs);
    if (r > 0) wins++;
    rs.push(r);
  }
  return { entry: cfg.entry, manage: cfg.manage, trades: rs.length, filled, hitRate: filled ? wins / filled : 0,
    expectR: rs.length ? mean(rs) : 0, totalR: rs.reduce((a, b) => a + b, 0), maxDdR: maxDrawdown(rs) };
}

/** Candidate bars for a setup (used to score every variant over identical signals). */
export function candidateBars(bars: Bar[], s: SetupDef) {
  const out: { i: number; atr: number }[] = [];
  for (let i = 120; i < bars.length - 1; i++) {
    const w = bars.slice(0, i + 1);
    if (s.entryRule && !s.entryRule(w)) continue;
    const a = atr(w, 14);
    if (a > 0 && featuresAt(w)) out.push({ i, atr: a });
  }
  return out;
}

export interface Sample { i: number; time: number; x: number[]; entry: number; stop: number; target: number; atr: number; y: 0 | 1; outcome: "WON" | "LOST" | "TIMEOUT"; r: number }

/** Every bar that passes the setup's rule becomes one labelled sample (no look-ahead: features use bars up to i only). */
export function buildSamples(bars: Bar[], s: SetupDef, costs: Costs): Sample[] {
  const out: Sample[] = [];
  for (let i = 120; i < bars.length - 1; i++) {
    const window = bars.slice(0, i + 1);
    if (s.entryRule && !s.entryRule(window)) continue;
    const x = featuresAt(window);
    if (!x) continue;
    const a = atr(window, 14), entry = bars[i].close;
    if (!(a > 0)) continue;
    const dir = s.side === "LONG" ? 1 : -1;
    const stop = entry - dir * s.atrStop * a, target = entry + dir * s.atrTarget * a;
    const lab = tripleBarrier(bars, i + 1, s.side, entry, stop, target, s.horizonBars);
    if (!lab) continue;
    out.push({ i, time: bars[i].openTime, x, entry, stop, target, atr: a, y: lab.outcome === "WON" ? 1 : 0, outcome: lab.outcome,
      r: rMultiple(s.side, entry, stop, lab.exitPrice, totalBps(costs)) });
  }
  return out;
}

export interface WalkResult {
  trades: number; hitRate: number; avgPredP: number; expectR: number; totalR: number; maxDdR: number; brier: number;
  baseline: { alwaysTake: number; randomWalkBrier: number; baseRate: number };
  calibration: { lo: number; hi: number; n: number; avgP: number; rate: number }[];
  equity: { time: number; cumR: number }[];
  taken: { time: number; p: number; r: number; y: 0 | 1 }[];
  fit: Fit | null; cal: Calibration;
}

/**
 * Walk-forward evaluation: fit on the first `trainFrac`, then step forward in blocks, refitting as we go.
 * Every probability is produced by a model that never saw that sample — the only backtest worth reading.
 */
export function walkForward(samples: Sample[], opts: { trainFrac?: number; blocks?: number; minEdgeR?: number; rewardR: number; horizonBars?: number; embargo?: number } = { rewardR: 1.5 }): WalkResult {
  const trainFrac = opts.trainFrac ?? 0.5, blocks = opts.blocks ?? 6, minEdge = opts.minEdgeR ?? 0.02;
  // Purge + embargo: a trade's label depends on the bars that follow it, so samples whose outcome window
  // overlaps the test block would leak the future into training. Drop them, plus a small buffer after.
  const horizon = opts.horizonBars ?? 12, embargo = opts.embargo ?? Math.ceil(horizon / 2);
  const purge = (train: Sample[], testFrom: number) => train.filter((s) => s.i + horizon + embargo < testFrom);
  const empty: WalkResult = { trades: 0, hitRate: 0, avgPredP: 0, expectR: 0, totalR: 0, maxDdR: 0, brier: 0,
    baseline: { alwaysTake: 0, randomWalkBrier: 0, baseRate: 0 }, calibration: [], equity: [], taken: [], fit: null, cal: IDENTITY };
  if (samples.length < 200) return empty;

  const start = Math.floor(samples.length * trainFrac), step = Math.max(1, Math.ceil((samples.length - start) / blocks));
  const scored: { time: number; p: number; y: 0 | 1; r: number; edge: number }[] = [];
  let fit: Fit | null = null, cal: Calibration = IDENTITY;
  for (let cut = start; cut < samples.length; cut += step) {
    const test = samples.slice(cut, Math.min(samples.length, cut + step));
    const train = purge(samples.slice(0, cut), test[0]?.i ?? Infinity);
    if (train.length < 100 || !test.length) continue;
    fit = fitLogit(train.map((s) => s.x), train.map((s) => s.y), { l2: 2 });
    // Calibrate on the most recent quarter of the training window, held out from the coefficients' own fit.
    const holdout = train.slice(Math.floor(train.length * 0.75));
    const f2 = fitLogit(train.slice(0, Math.floor(train.length * 0.75)).map((s) => s.x), train.slice(0, Math.floor(train.length * 0.75)).map((s) => s.y), { l2: 2 });
    cal = fitCalibration(holdout.map((s) => ({ p: predictLogit(f2, s.x), y: s.y })));
    for (const s of test) {
      const p = applyCalibration(cal, predictLogit(fit, s.x));
      scored.push({ time: s.time, p, y: s.y, r: s.r, edge: expectedR(p, opts.rewardR, s.entry, s.stop, 0) });
    }
  }
  const taken = scored.filter((s) => s.edge >= minEdge);
  const rs = taken.map((t) => t.r);
  let cum = 0;
  const equity = taken.map((t) => ({ time: t.time, cumR: (cum += t.r) }));
  const base = mean(scored.map((s) => s.y));
  return {
    trades: taken.length,
    hitRate: taken.length ? mean(taken.map((t) => t.y)) : 0,
    avgPredP: taken.length ? mean(taken.map((t) => t.p)) : 0,
    expectR: taken.length ? mean(rs) : 0,
    totalR: rs.reduce((a, b) => a + b, 0),
    maxDdR: maxDrawdown(rs),
    brier: brier(scored.map((s) => ({ p: s.p, y: s.y }))),
    baseline: {
      alwaysTake: scored.length ? mean(scored.map((s) => s.r)) : 0,          // taking every signal, edge filter off
      randomWalkBrier: brier(scored.map((s) => ({ p: base, y: s.y }))),      // the "no skill" forecaster
      baseRate: base,
    },
    calibration: buckets(scored.map((s) => ({ p: s.p, y: s.y }))),
    equity,
    taken: taken.map((t) => ({ time: t.time, p: t.p, r: t.r, y: t.y })),
    fit, cal,
  };
}
