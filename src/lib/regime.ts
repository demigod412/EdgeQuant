import type { Bar } from "./model/features";
import { atr } from "./model/features";

/*
 * Regime and session. Trend systems earn in trending, calm-to-normal conditions and bleed in chop;
 * FX behaves differently across sessions. Filtering by regime turns some flat systems positive —
 * but only when the split is measured, never assumed.
 */
export type Regime = "calm-trend" | "wild-trend" | "calm-chop" | "wild-chop";
export type Session = "asia" | "london" | "newyork";

export function regimeOf(bars: Bar[]): Regime {
  const closes = bars.map((b) => b.close), n = closes.length;
  const ma50 = closes.slice(-50).reduce((a, b) => a + b, 0) / Math.min(50, n);
  const ma200 = closes.slice(-200).reduce((a, b) => a + b, 0) / Math.min(200, n);
  const a = atr(bars, 14);
  const longRun = Array.from({ length: 12 }, (_, k) => atr(bars.slice(0, n - k * 8), 14)).filter((x) => x > 0);
  const avgAtr = longRun.reduce((s, x) => s + x, 0) / (longRun.length || 1);
  const trending = Math.abs(ma50 - ma200) / Math.max(1e-9, a) > 1;
  const wild = a > avgAtr * 1.25;
  return trending ? (wild ? "wild-trend" : "calm-trend") : wild ? "wild-chop" : "calm-chop";
}

/** UTC hour → session. Overlaps are attributed to the more active market. */
export function sessionOf(ms: number): Session {
  const h = new Date(ms).getUTCHours();
  if (h >= 7 && h < 13) return "london";
  if (h >= 13 && h < 21) return "newyork";
  return "asia";
}

/** Split any labelled set by regime or session, so a filter can be judged rather than believed. */
export function splitBy<T>(rows: T[], key: (r: T) => string) {
  const out = new Map<string, T[]>();
  for (const r of rows) { const k = key(r); out.set(k, [...(out.get(k) ?? []), r]); }
  return out;
}
