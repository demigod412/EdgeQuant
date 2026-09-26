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
  warns: CheckResult[];
  /** 0–100, describing how many checks were cleared and how heavily. Descriptive, not predictive. */
  safety: number;
  /** One line fit for the top of a card. */
  headline: string;
}

/** Weights reflect how completely each failure can cost you everything, not how common it is. */
const WEIGHT: Record<string, number> = {
  mintAuthority: 18, freezeAuthority: 18, sellable: 18, lpLocked: 16,
  sniperBundle: 10, deployerHistory: 8, concentration: 6, transferRules: 4, liquidityDepth: 2,
};

export function gradeScreen(checks: CheckResult[]): ScreenGrade {
  const hardFails = checks.filter((c) => c.hard && c.verdict === "fail");
  const unknownHard = checks.filter((c) => c.hard && c.verdict === "unknown");
  const warns = checks.filter((c) => c.verdict === "warn");

  // Safety is a weighted share of the checks cleared. An unknown scores zero: a check that could not
  // run is not a check that passed, and rounding it up would be the whole point of the exercise lost.
  const total = checks.reduce((s, c) => s + (WEIGHT[c.id] ?? 5), 0);
  const got = checks.reduce((s, c) => s + (WEIGHT[c.id] ?? 5) * (c.verdict === "pass" ? 1 : c.verdict === "warn" ? 0.5 : 0), 0);
  const safety = total ? Math.round((got / total) * 100) : 0;

  const grade: Grade = hardFails.length ? "avoid" : unknownHard.length ? "unproven" : warns.length ? "caution" : "clear";
  const headline =
    grade === "avoid" ? `Avoid — ${hardFails.length} disqualifying ${hardFails.length === 1 ? "finding" : "findings"}: ${hardFails.map((c) => c.label.toLowerCase()).join(", ")}.`
    : grade === "unproven" ? `Unproven — ${unknownHard.length} critical ${unknownHard.length === 1 ? "check" : "checks"} could not be run: ${unknownHard.map((c) => c.label.toLowerCase()).join(", ")}. Not the same as safe.`
    : grade === "caution" ? `No disqualifying findings, ${warns.length} caution${warns.length === 1 ? "" : "s"}.`
    : "All checks cleared. This says nothing about where the price goes.";

  return { grade, hardFails, unknownHard, warns, safety, headline };
}

/**
 * Calibrated probability that a screened token is still tradeable after `horizonHours` — liquidity
 * intact and selling still working. Null until the ledger has enough settled screens to fit, which is
 * the honest state rather than a placeholder number.
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
