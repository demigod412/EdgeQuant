import type { CheckResult } from "./types";

/*
 * Grading a screen.
 *
 * ── On "which to buy" ───────────────────────────────────────────────────────────────────────────────
 * This module does not output one, and the omission is deliberate rather than unfinished.
 *
 * Everywhere else in EdgeQuant a probability is earned: a setup is labelled with triple barriers, fitted
 * on a walk-forward split, calibrated on held-out data, and nothing is called unless expected R is
 * positive. A brand-new token has no price history, no cash flow and no comparable population at the
 * moment you would have to act, so there is nothing to fit. Any "87% chance this pumps" would be a
 * number with no derivation — exactly what the rest of this app exists to avoid.
 *
 * What IS estimable at mint time is the opposite question: whether the token is *built* so that it can
 * take your money regardless of price — supply that can be inflated, accounts that can be frozen,
 * liquidity that can be withdrawn, an exit that is taxed or blocked, a float already held by the people
 * ahead of you. That is a property of the contract and the distribution, readable now, and it has a
 * ground truth that arrives within hours: did the liquidity get pulled, did selling stop working.
 *
 * So: this grades avoidable risk, records the measurement, and lets the ledger produce a calibrated
 * survival probability once enough screens have settled. Until then `survival` is null and the UI says
 * so, the same way the signal models run as identity until 50 settled calls. A screen that survives is
 * not a reason to buy; it only means the ways of losing that can be checked have been checked.
 */

export type Grade = "avoid" | "unproven" | "caution" | "clear";

export interface ScreenGrade {
  grade: Grade;
  hardFails: CheckResult[];
  unknownHard: CheckResult[];
  /** Failures on checks that are not disqualifying alone. Still failures. */
  softFails: CheckResult[];
  warns: CheckResult[];
  /** 0–100, describing how many checks were cleared and how heavily. Descriptive, not predictive. */
  safety: number;
  /**
   * Share of the total weight that could actually be evaluated, 0–1.
   *
   * Without this the score is misleading in a specific way: an unknown scores zero, so a token whose
   * LP lock, deployer and opening blocks are all unreadable scores exactly 100 − 34 = 66 no matter what
   * it is. Every established pump.fun token lands on the same number, which looks like a measurement of
   * the token and is really a measurement of what the free data tier can see. Coverage is how you tell
   * a 66 that means "six clean checks and three blind spots" from a 66 that means something was wrong.
   */
  coverage: number;
  /** Counts by verdict, so "why do these all score the same" is answerable from the card itself. */
  counts: { pass: number; warn: number; fail: number; unknown: number };
  /** One line fit for the top of a card. */
  headline: string;
}

/** Weights reflect how completely each failure can cost you everything, not how common it is. */
const WEIGHT: Record<string, number> = {
  mintAuthority: 18, freezeAuthority: 18, sellable: 18, lpLocked: 16,
  sniperBundle: 10, deployerHistory: 8, concentration: 6, transferRules: 4, liquidityDepth: 2,
  /*
   * The queue to sell. Weighted above concentration because it measures something concentration cannot:
   * a token can pass at 20% of supply held and still have five times the pool sitting above you, and it
   * is the dollar value against the market — not the share — that decides whether you can get out.
   *
   * The total is computed from whatever checks are present rather than fixed at 100, so adding this
   * rescales every score. Old screens keep their own weights, which is the point of storing checks with
   * the screen rather than recomputing history.
   */
  sellPressure: 10,
};

export function gradeScreen(checks: CheckResult[]): ScreenGrade {
  const hardFails = checks.filter((c) => c.hard && c.verdict === "fail");
  const unknownHard = checks.filter((c) => c.hard && c.verdict === "unknown");
  /*
   * Failures on the checks that are not disqualifying on their own.
   *
   * These were missing from the ladder altogether, and the omission was serious: a token whose only
   * problem was a soft failure fell through to "caution" on the strength of its warnings, or to
   * "clear" if it had none — and the headline read "No disqualifying findings" directly above a FAIL in
   * the list. A failure is a failure; only whether it disqualifies on its own is in question.
   */
  const softFails = checks.filter((c) => !c.hard && c.verdict === "fail");
  const warns = checks.filter((c) => c.verdict === "warn");

  // Safety is a weighted share of the checks cleared. An unknown scores zero: a check that could not
  // run is not a check that passed, and rounding it up would be the whole point of the exercise lost.
  const total = checks.reduce((s, c) => s + (WEIGHT[c.id] ?? 5), 0);
  const got = checks.reduce((s, c) => s + (WEIGHT[c.id] ?? 5) * (c.verdict === "pass" ? 1 : c.verdict === "warn" ? 0.5 : 0), 0);
  const safety = total ? Math.round((got / total) * 100) : 0;

  const unknownWeight = checks.filter((c) => c.verdict === "unknown").reduce((x, c) => x + (WEIGHT[c.id] ?? 5), 0);
  const coverage = total ? (total - unknownWeight) / total : 0;
  const counts = { pass: 0, warn: 0, fail: 0, unknown: 0 };
  for (const c of checks) counts[c.verdict]++;

  const grade: Grade = hardFails.length ? "avoid"
    : unknownHard.length ? "unproven"
    : softFails.length || warns.length ? "caution"
    : "clear";
  const names = (cs: CheckResult[]) => cs.map((c) => c.label.toLowerCase()).join(", ");
  const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;
  const headline =
    grade === "avoid" ? `Avoid — ${plural(hardFails.length, "disqualifying finding", "disqualifying findings")}: ${names(hardFails)}.`
    : grade === "unproven" ? `Unproven — ${plural(unknownHard.length, "critical check", "critical checks")} could not be run: ${names(unknownHard)}. Not the same as safe.`
    : grade === "caution" ? (softFails.length
        ? `${plural(softFails.length, "check fails", "checks fail")} — ${names(softFails)}${warns.length ? `, with ${plural(warns.length, "caution", "cautions")}` : ""}. Not disqualifying on their own, but not clean.`
        : `No disqualifying findings, ${plural(warns.length, "caution", "cautions")}.`)
    : "All checks cleared. This says nothing about where the price goes.";

  return { grade, hardFails, unknownHard, softFails, warns, safety, coverage, counts, headline };
}

/**
 * Calibrated probability that a screened token is still tradeable after `horizonHours` — liquidity
 * intact and selling still working. Null until the ledger has enough settled screens to fit, which is
 * the honest state rather than a placeholder number.
 */
/**
 * Distinct tokens that must have settled before a survival probability is fitted.
 *
 * Distinct TOKENS, not screens. A watched token is re-screened every few hours, and counting those
 * repeats as independent outcomes would let the threshold be reached with a fraction of the evidence it
 * is meant to represent.
 */
export const SURVIVAL_MIN_SETTLED = 200;

export interface SurvivalModel { intercept: number; weights: Partial<Record<string, number>>; n: number; horizonHours: number }

export function survivalProbability(checks: CheckResult[], model: SurvivalModel | null): number | null {
  if (!model || model.n < SURVIVAL_MIN_SETTLED) return null;
  let z = model.intercept;
  for (const c of checks) {
    const w = model.weights[c.id];
    if (w == null) continue;
    z += w * (c.verdict === "pass" ? 1 : c.verdict === "warn" ? 0.5 : 0);
  }
  return 1 / (1 + Math.exp(-z));
}
