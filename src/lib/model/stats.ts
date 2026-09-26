/** Small statistics helpers, kept pure so every number in the app is testable. */
export const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);
export const sd = (xs: number[]) => {
  if (xs.length < 2) return 0;
  const m = mean(xs);
  return Math.sqrt(xs.reduce((s, x) => s + (x - m) ** 2, 0) / (xs.length - 1));
};
export const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));
export const sigmoid = (z: number) => 1 / (1 + Math.exp(-clamp(z, -30, 30)));
export const brier = (rows: { p: number; y: 0 | 1 }[]) => (rows.length ? rows.reduce((s, r) => s + (r.p - r.y) ** 2, 0) / rows.length : 0);
export const logLoss = (rows: { p: number; y: 0 | 1 }[]) =>
  rows.length ? rows.reduce((s, r) => s - Math.log(Math.max(1e-12, r.y ? r.p : 1 - r.p)), 0) / rows.length : 0;

/** Maximum drawdown of a cumulative-R curve, in R. */
export function maxDrawdown(rs: number[]) {
  let peak = 0, cum = 0, worst = 0;
  for (const r of rs) { cum += r; peak = Math.max(peak, cum); worst = Math.min(worst, cum - peak); }
  return -worst;
}

/** Calibration buckets: what the model said vs what happened. */
export function buckets(rows: { p: number; y: 0 | 1 }[], n = 5) {
  const out = Array.from({ length: n }, (_, i) => ({ lo: i / n, hi: (i + 1) / n, n: 0, avgP: 0, rate: 0 }));
  for (const r of rows) { const b = out[Math.min(n - 1, Math.floor(r.p * n))]; b.n++; b.avgP += r.p; b.rate += r.y; }
  return out.filter((b) => b.n).map((b) => ({ ...b, avgP: b.avgP / b.n, rate: b.rate / b.n }));
}
