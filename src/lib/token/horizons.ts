/**
 * When a screen gets judged.
 *
 * Separate from ledger.ts, which is server-only, so the horizons can be asserted in tests: the
 * relationship between them is a rule, not a preference — every checkpoint must fall strictly inside
 * the final horizon, and at least one must fall inside the longest hold the app allows.
 */

/** The final horizon. Long enough for a rug to have happened, short enough to still learn from. */
export const SETTLE_HOURS = Number(process.env.SCREEN_SETTLE_HOURS) || 24;

/**
 * Interim horizons, recorded before the final one.
 *
 * Twenty-four hours answers "did this rug", which is the right question for the screener's own record
 * and the wrong one for a position held for two hours: a token can survive the day and still have been
 * unsellable at the moment you wanted out. Nothing in this app is held longer than MAX_HOLD_HOURS, so
 * the ledger also learns on the timescale actually traded — and learns within the hour rather than after
 * a day, which matters when the record needs hundreds of screens before it can say anything.
 */
export const CHECKPOINT_HOURS = (process.env.SCREEN_CHECKPOINT_HOURS ?? "1,6")
  .split(",").map((h) => Number(h.trim()))
  .filter((h) => Number.isFinite(h) && h > 0 && h < SETTLE_HOURS)
  .sort((a, b) => a - b);

export interface Checkpoint {
  hours: number;
  at: string;
  survived: boolean;
  liquidityUsd: number;
  failureKind: string | null;
}

export const parseCheckpoints = (v: unknown): Checkpoint[] => (Array.isArray(v) ? (v as Checkpoint[]) : []);
