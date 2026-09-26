import type { Bar } from "./model/features";
import { atr, rsi, sma } from "./model/features";

/** The starting setups. One rule, one horizon, one barrier pair each — models are fitted per setup, never pooled. */
export interface SetupSeed { key: string; name: string; description: string; timeframe: string; side: "LONG" | "SHORT"; atrTarget: number; atrStop: number; horizonBars: number }

export const SETUP_SEEDS: SetupSeed[] = [
  { key: "trend-pullback-long", name: "Trend pullback (long)", timeframe: "4h", side: "LONG", atrTarget: 1.5, atrStop: 1, horizonBars: 12,
    description: "Price above its 50-bar average, pulled back from the 20-bar high. Target 1.5 ATR, stop 1 ATR, 12 bars." },
  { key: "trend-pullback-short", name: "Trend pullback (short)", timeframe: "4h", side: "SHORT", atrTarget: 1.5, atrStop: 1, horizonBars: 12,
    description: "Mirror of the long: price below its 50-bar average, bounced from the 20-bar low." },
  { key: "breakout-long", name: "Range breakout (long)", timeframe: "4h", side: "LONG", atrTarget: 2, atrStop: 1, horizonBars: 18,
    description: "Close at the top of the 20-bar range after a quiet stretch. Target 2 ATR, stop 1 ATR, 18 bars." },
  { key: "mean-revert-long", name: "Oversold snapback (long)", timeframe: "1d", side: "LONG", atrTarget: 1, atrStop: 1, horizonBars: 6,
    description: "RSI below 32 with price under its 50-day average. Even money on the bounce, 6 days." },
];

/** Entry rules: they only decide WHICH bars are candidates. The model prices them. */
export const ENTRY_RULES: Record<string, (bars: Bar[]) => boolean> = {
  "trend-pullback-long": (b) => {
    const c = b.map((x) => x.close), last = b[b.length - 1], a = atr(b, 14);
    const hi20 = Math.max(...b.slice(-20).map((x) => x.high));
    return a > 0 && last.close > sma(c, 50) && hi20 - last.close > 0.3 * a && hi20 - last.close < 2.5 * a;
  },
  "trend-pullback-short": (b) => {
    const c = b.map((x) => x.close), last = b[b.length - 1], a = atr(b, 14);
    const lo20 = Math.min(...b.slice(-20).map((x) => x.low));
    return a > 0 && last.close < sma(c, 50) && last.close - lo20 > 0.3 * a && last.close - lo20 < 2.5 * a;
  },
  "breakout-long": (b) => {
    const last = b[b.length - 1], a = atr(b, 14);
    const prior = b.slice(-21, -1), hi = Math.max(...prior.map((x) => x.high)), lo = Math.min(...prior.map((x) => x.low));
    return a > 0 && last.close >= hi && hi - lo < 6 * a;
  },
  "mean-revert-long": (b) => {
    const c = b.map((x) => x.close);
    return rsi(c, 14) < 32 && c[c.length - 1] < sma(c, 50);
  },
};
