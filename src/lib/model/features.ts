import { mean, sd } from "./stats";

export interface Bar { openTime: number; open: number; high: number; low: number; close: number; volume: number }

/** Average true range: the unit everything else is measured in, so BTC and EUR/USD are comparable. */
export function atr(bars: Bar[], n = 14): number {
  if (bars.length < 2) return 0;
  const trs: number[] = [];
  for (let i = Math.max(1, bars.length - n); i < bars.length; i++) {
    const b = bars[i], prev = bars[i - 1];
    trs.push(Math.max(b.high - b.low, Math.abs(b.high - prev.close), Math.abs(b.low - prev.close)));
  }
  return mean(trs);
}
export const sma = (xs: number[], n: number) => mean(xs.slice(-n));
export function rsi(closes: number[], n = 14) {
  if (closes.length <= n) return 50;
  let up = 0, down = 0;
  for (let i = closes.length - n; i < closes.length; i++) {
    const d = closes[i] - closes[i - 1];
    if (d >= 0) up += d; else down -= d;
  }
  const rs = down === 0 ? 100 : up / down;
  return 100 - 100 / (1 + rs);
}

export const FEATURE_NAMES = ["trend", "pullback", "momentum", "volRegime", "rangePos", "bodyRatio", "volumeZ"] as const;

/**
 * Features at the close of bars[last]. All scale-free, so one model works across instruments:
 *   trend      — distance of price above/below its 50-bar average, in ATR
 *   pullback   — how far price has come back from the recent high, in ATR
 *   momentum   — RSI(14) centred on 50 and scaled
 *   volRegime  — current ATR against its own 100-bar average (calm vs wild)
 *   rangePos   — where the close sits inside the last 20 bars' range (0 low, 1 high)
 *   bodyRatio  — candle body as a share of its range (conviction of the last bar)
 *   volumeZ    — volume against its 20-bar average, in standard deviations
 */
export function featuresAt(bars: Bar[]): number[] | null {
  if (bars.length < 120) return null;
  const closes = bars.map((b) => b.close), last = bars[bars.length - 1];
  const a = atr(bars, 14);
  if (!(a > 0)) return null;
  const ma50 = sma(closes, 50);
  const hi20 = Math.max(...bars.slice(-20).map((b) => b.high)), lo20 = Math.min(...bars.slice(-20).map((b) => b.low));
  const atrLong = mean(Array.from({ length: 20 }, (_, k) => atr(bars.slice(0, bars.length - k * 4), 14)).filter((x) => x > 0));
  const vols = bars.slice(-20).map((b) => b.volume), vsd = sd(vols) || 1;
  const range = Math.max(1e-9, last.high - last.low);
  return [
    (last.close - ma50) / a,
    (hi20 - last.close) / a,
    (rsi(closes, 14) - 50) / 25,
    atrLong > 0 ? a / atrLong : 1,
    (last.close - lo20) / Math.max(1e-9, hi20 - lo20),
    (last.close - last.open) / range,
    (last.volume - mean(vols)) / vsd,
  ];
}
