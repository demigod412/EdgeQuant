import type { Bar } from "./model/features";
import { atr, rsi, sma } from "./model/features";

/** The starting setups. One rule, one horizon, one barrier pair each — models are fitted per setup, never pooled. */
export interface SetupSeed { key: string; name: string; description: string; timeframe: string; side: "LONG" | "SHORT"; atrTarget: number; atrStop: number; horizonBars: number }

/*
 * Day trading and scalping: nothing here may be held longer than MAX_HOLD_HOURS.
 *
 * These were 4h setups on 12-18 bar horizons (two to three days) and a daily one on 6 bars (six days).
 * Rewritten onto 1h bars for the day-trading setups and 15m for the scalps, with horizons chosen so the
 * time barrier lands inside six hours. The entry rules are unchanged - only the bar size and the
 * horizon - because the rules describe shapes, and a shape is a shape on any timeframe.
 *
 * A word on what this costs. Expected R is computed after fees, spread and slippage, and those are a
 * fixed toll per round trip while the target shrinks with the bar. A 1 ATR stop on a 15m bar is a much
 * smaller move than on a 4h bar, so the same 10-15bps round trip eats a far larger share of it. Expect
 * FEWER calls from these, not more: plenty of scalp candidates will price out with negative edge, and
 * that is the arithmetic being honest rather than the setup failing.
 */
export const SETUP_SEEDS: SetupSeed[] = [
  { key: "trend-pullback-long", name: "Trend pullback (long)", timeframe: "1h", side: "LONG", atrTarget: 1.5, atrStop: 1, horizonBars: 6,
    description: "Price above its 50-bar average, pulled back from the 20-bar high. Target 1.5 ATR, stop 1 ATR, closed out after 6 hours." },
  { key: "trend-pullback-short", name: "Trend pullback (short)", timeframe: "1h", side: "SHORT", atrTarget: 1.5, atrStop: 1, horizonBars: 6,
    description: "Mirror of the long: price below its 50-bar average, bounced from the 20-bar low. 6 hours." },
  { key: "breakout-long", name: "Range breakout (long)", timeframe: "1h", side: "LONG", atrTarget: 2, atrStop: 1, horizonBars: 6,
    description: "Close at the top of the 20-bar range after a quiet stretch. Target 2 ATR, stop 1 ATR, 6 hours." },
  { key: "mean-revert-long", name: "Oversold snapback (long)", timeframe: "1h", side: "LONG", atrTarget: 1, atrStop: 1, horizonBars: 4,
    description: "RSI below 32 with price under its 50-bar average. Even money on the bounce, 4 hours." },
  // Scalps: the same shapes on 15m bars, so the same bar counts land in minutes rather than hours.
  { key: "scalp-breakout-long", name: "Scalp breakout (long)", timeframe: "15m", side: "LONG", atrTarget: 1.5, atrStop: 1, horizonBars: 8,
    description: "Breaks the 20-bar high on a 15m bar after a quiet stretch. Target 1.5 ATR, stop 1 ATR, 2 hours." },
  { key: "scalp-pullback-long", name: "Scalp pullback (long)", timeframe: "15m", side: "LONG", atrTarget: 1.2, atrStop: 1, horizonBars: 12,
    description: "Above the 50-bar average and pulled back from the 20-bar high, on 15m bars. 3 hours." },
  { key: "scalp-pullback-short", name: "Scalp pullback (short)", timeframe: "15m", side: "SHORT", atrTarget: 1.2, atrStop: 1, horizonBars: 12,
    description: "Below the 50-bar average and bounced off the 20-bar low, on 15m bars. 3 hours." },
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

// The scalps run the same shapes as their hourly counterparts. Aliased rather than copied so a fix to
// one cannot drift from the other; each setup is still fitted separately, on its own timeframe.
ENTRY_RULES["scalp-breakout-long"] = ENTRY_RULES["breakout-long"];
ENTRY_RULES["scalp-pullback-long"] = ENTRY_RULES["trend-pullback-long"];
ENTRY_RULES["scalp-pullback-short"] = ENTRY_RULES["trend-pullback-short"];
