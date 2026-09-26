import type { Bar } from "./features";

export type Outcome = "WON" | "LOST" | "TIMEOUT";
export interface Labelled { outcome: Outcome; exitPrice: number; exitIndex: number }

/**
 * Triple-barrier labelling: from the bar AFTER the signal, which comes first — target, stop, or the time limit?
 * When a single bar covers both barriers the pessimistic side wins (assume the stop), so the record can't flatter itself.
 */
export function tripleBarrier(bars: Bar[], from: number, side: "LONG" | "SHORT", entry: number, stop: number, target: number, horizon: number): Labelled | null {
  if (from >= bars.length) return null;
  const end = Math.min(bars.length - 1, from + horizon - 1);
  for (let i = from; i <= end; i++) {
    const b = bars[i];
    const hitStop = side === "LONG" ? b.low <= stop : b.high >= stop;
    const hitTarget = side === "LONG" ? b.high >= target : b.low <= target;
    if (hitStop) return { outcome: "LOST", exitPrice: stop, exitIndex: i };      // pessimistic when both are touched
    if (hitTarget) return { outcome: "WON", exitPrice: target, exitIndex: i };
  }
  if (from + horizon - 1 > bars.length - 1) return null;                          // not enough future bars yet
  return { outcome: "TIMEOUT", exitPrice: bars[end].close, exitIndex: end };
}

/** Realised R after costs, where 1R is the distance from entry to stop. */
export function rMultiple(side: "LONG" | "SHORT", entry: number, stop: number, exit: number, costBps: number) {
  const risk = Math.abs(entry - stop);
  if (!(risk > 0)) return 0;
  const gross = side === "LONG" ? exit - entry : entry - exit;
  const cost = (entry * costBps) / 10_000;
  return (gross - cost) / risk;
}

/** Expected R of taking a call: p × reward − (1 − p) × 1, minus costs. Positive is the only reason to trade it. */
export function expectedR(p: number, rewardR: number, entry: number, stop: number, costBps: number) {
  const risk = Math.abs(entry - stop);
  const costR = risk > 0 ? (entry * costBps) / 10_000 / risk : 0;
  return p * rewardR - (1 - p) * 1 - costR;
}
