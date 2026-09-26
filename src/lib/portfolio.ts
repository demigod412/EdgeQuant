/*
 * Portfolio layer: rank a universe, size by volatility, and cap total risk.
 *
 * Cross-sectional momentum (buy the strongest, avoid the weakest, rebalanced weekly) is one of the few
 * effects that has survived decades of out-of-sample testing across equities, futures and crypto. It is
 * cheap to run, low turnover, and does not depend on timing a single instrument.
 */
export interface Series { id: string; display: string; market: string; closes: number[] }
export interface RankRow { id: string; display: string; market: string; score: number; mom30: number; mom90: number; vol: number; rank: number; slot: "LONG" | "AVOID" | "FLAT" }

const ret = (closes: number[], bars: number) => (closes.length > bars ? closes[closes.length - 1] / closes[closes.length - 1 - bars] - 1 : 0);
/** Annualised volatility from bar returns. barsPerYear lets 4h and daily series be compared honestly. */
export function annualVol(closes: number[], barsPerYear: number, lookback = 60) {
  const xs = closes.slice(-lookback - 1);
  if (xs.length < 10) return 0;
  const rs = xs.slice(1).map((c, i) => Math.log(c / xs[i]));
  const m = rs.reduce((a, b) => a + b, 0) / rs.length;
  const v = rs.reduce((s, r) => s + (r - m) ** 2, 0) / (rs.length - 1);
  return Math.sqrt(v * barsPerYear);
}

/**
 * Risk-adjusted momentum: blend of 30-bar and 90-bar return divided by volatility, so a calm 20% move
 * outranks a wild one. Instruments are ranked within their own market (crypto against crypto, FX against FX).
 */
export function rankUniverse(series: Series[], opts: { barsPerYear: number; longSlots?: number; avoidSlots?: number } ): RankRow[] {
  const longSlots = opts.longSlots ?? 5, avoidSlots = opts.avoidSlots ?? 5;
  const rows = series.map((s) => {
    const vol = annualVol(s.closes, opts.barsPerYear) || 1e-6;
    const mom30 = ret(s.closes, 30), mom90 = ret(s.closes, 90);
    return { id: s.id, display: s.display, market: s.market, mom30, mom90, vol, score: (0.6 * mom30 + 0.4 * mom90) / vol, rank: 0, slot: "FLAT" as const };
  });
  const out: RankRow[] = [];
  for (const market of [...new Set(rows.map((r) => r.market))]) {
    const group = rows.filter((r) => r.market === market).sort((a, b) => b.score - a.score);
    group.forEach((r, i) => out.push({ ...r, rank: i + 1, slot: i < longSlots ? "LONG" : i >= group.length - avoidSlots ? "AVOID" : "FLAT" }));
  }
  return out.sort((a, b) => b.score - a.score);
}

export interface Weighted extends RankRow { weight: number; riskPct: number }
/**
 * Volatility targeting: each held instrument gets the same RISK, not the same money, and the book is
 * scaled so the portfolio's expected volatility lands on target. Calm instruments get more size, wild ones less.
 */
export function volTargetWeights(rows: RankRow[], opts: { targetVol: number; maxWeight?: number; maxTotalRiskPct: number }): Weighted[] {
  const held = rows.filter((r) => r.slot === "LONG");
  if (!held.length) return [];
  const inv = held.map((r) => 1 / Math.max(0.05, r.vol));
  const sum = inv.reduce((a, b) => a + b, 0);
  const scale = Math.min(1, opts.targetVol / Math.max(1e-6, held.reduce((s, r, i) => s + (inv[i] / sum) * r.vol, 0)));
  const maxW = opts.maxWeight ?? 0.35;
  const raw = held.map((r, i) => Math.min(maxW, (inv[i] / sum) * scale));
  const total = raw.reduce((a, b) => a + b, 0) || 1;
  return held.map((r, i) => ({ ...r, weight: raw[i], riskPct: (raw[i] / total) * opts.maxTotalRiskPct }));
}

/**
 * Circuit breaker on the recent equity curve: half size after a moderate drawdown, stop after a deep one.
 * Surviving a bad run matters more than catching every trade — an edge you can't hold through isn't one.
 */
export function circuitBreaker(recentR: number[], opts = { halveAt: 6, stopAt: 10 }) {
  let peak = 0, cum = 0, dd = 0;
  for (const r of recentR) { cum += r; peak = Math.max(peak, cum); dd = Math.max(dd, peak - cum); }
  if (dd >= opts.stopAt) return { multiplier: 0, drawdownR: dd, note: `Trading paused: ${dd.toFixed(1)}R drawdown. Review before resuming.` };
  if (dd >= opts.halveAt) return { multiplier: 0.5, drawdownR: dd, note: `Half size: ${dd.toFixed(1)}R drawdown.` };
  return { multiplier: 1, drawdownR: dd, note: "" };
}

/** Correlation of returns — long BTC, ETH and SOL is one bet, and this is how you see that. */
export function correlation(a: number[], b: number[]) {
  const n = Math.min(a.length, b.length);
  if (n < 10) return 0;
  const ra = a.slice(-n).slice(1).map((c, i) => Math.log(c / a.slice(-n)[i]));
  const rb = b.slice(-n).slice(1).map((c, i) => Math.log(c / b.slice(-n)[i]));
  const ma = ra.reduce((x, y) => x + y, 0) / ra.length, mb = rb.reduce((x, y) => x + y, 0) / rb.length;
  const cov = ra.reduce((s, x, i) => s + (x - ma) * (rb[i] - mb), 0);
  const va = Math.sqrt(ra.reduce((s, x) => s + (x - ma) ** 2, 0)), vb = Math.sqrt(rb.reduce((s, x) => s + (x - mb) ** 2, 0));
  return va && vb ? cov / (va * vb) : 0;
}

/** Effective number of independent bets: 5 positions at 0.9 correlation are barely more than 1. */
export function effectiveBets(corr: number[][]) {
  const n = corr.length;
  if (!n) return 0;
  let sum = 0;
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) sum += corr[i][j];
  return sum > 0 ? (n * n) / sum : n;
}
