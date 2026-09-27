import type { CheckResult, TokenSnapshot } from "./types";
import type { ScreenGrade } from "./score";
import { overhang, readOverhang } from "./overhang";

/*
 * Strong, medium, weak — a single verdict instead of nine lines to read.
 *
 * ── What this rates, and what it cannot ─────────────────────────────────────────────────────────────
 * It rates how completely the AVOIDABLE risk has been ruled out, and how cheap the exit is at the size
 * you actually trade. Nothing here contains any information about whether a price will rise: no check
 * does, and there is no history to fit one on at the moment you would have to act.
 *
 * So "strong" means: everything that can be checked was checked, none of it is wrong, and you can get
 * out at a sane cost. It does not mean the token will go up, and a strong token can still go to zero on
 * its own merits. The wording in every verdict below says so, because a three-level rating is exactly
 * the kind of thing that gets read as a recommendation once the reasoning scrolls off the screen.
 *
 * What makes it worth having anyway: the nine checks are not equally decisive, they are not equally
 * available, and two of the most important ones depend on YOUR position size. Weighing that by hand on
 * every screen is how mistakes get made — and it is why five tokens with identical scores were not
 * remotely equivalent.
 */

export type Rating = "avoid" | "weak" | "medium" | "strong";

export interface EntryRating {
  rating: Rating;
  /** One line, in decision terms. */
  verdict: string;
  /** Everything keeping it below strong. Empty only when strong. */
  holdingBack: string[];
  /**
   * What is actually in its favour, in plain terms.
   *
   * A list of only negatives reads as a verdict on the token when it is really a list of open questions,
   * and it gives no way to tell a token with one blemish from one with nothing going for it.
   */
  strengths: string[];
  /** Concrete things that would raise it — including ones you control, like position size. */
  wouldRaise: string[];
  /** Round-trip cost at the screened size, for ranking. Null when no quote came back. */
  exitCost: number | null;
  /** Pool depth as a multiple of the screened position size. Null when either is unknown. */
  depthMultiple: number | null;
}

/** Judgement calls, named rather than buried. Each one is a threshold I would defend, not a fact. */
export const RATING = {
  /** Round-trip cost, as a share of the position. */
  strongExitCost: 0.03,
  mediumExitCost: 0.08,
  /** Price impact of the sale alone. */
  strongImpact: 0.03,
  mediumImpact: 0.10,
  /** Pool liquidity as a multiple of your position. Below the medium figure, you are the market. */
  strongDepth: 40,
  mediumDepth: 15,
  /** Share of the check weight that must have been evaluated. */
  strongCoverage: 0.999,
  mediumCoverage: 0.75,
} as const;

const pct = (x: number) => `${(x * 100).toFixed(1)}%`;

export function rateEntry(checks: CheckResult[], grade: ScreenGrade, t: TokenSnapshot): EntryRating {
  const holdingBack: string[] = [];
  const strengths: string[] = [];
  const wouldRaise: string[] = [];

  const exitCost = t.sellQuote ? 1 - t.sellQuote.probeOut / Math.max(1e-9, t.sellQuote.probeIn) : null;
  const depthMultiple = t.liquidityUsd != null && t.sellProbeUsd ? t.liquidityUsd / t.sellProbeUsd : null;
  const size = t.sellProbeUsd;

  // ---- disqualifying, and nothing else matters --------------------------------------------------
  if (grade.hardFails.length) {
    return {
      strengths: [],
      rating: "avoid",
      verdict: `Do not buy. ${grade.hardFails.length === 1 ? "A check that disqualifies on its own has failed" : "Checks that disqualify on their own have failed"}: ${grade.hardFails.map((c) => c.label.toLowerCase()).join(", ")}.`,
      holdingBack: grade.hardFails.map((c) => c.detail),
      wouldRaise: ["Nothing. A disqualifying finding is not a threshold to be tuned around."],
      exitCost, depthMultiple,
    };
  }

  // ---- what is holding it back --------------------------------------------------------------------
  for (const c of grade.unknownHard) {
    holdingBack.push(`${c.label} could not be established — ${c.detail}`);
    wouldRaise.push(`${c.label}: a re-screen may resolve it once the pool and its history are indexed.`);
  }
  for (const c of grade.softFails) holdingBack.push(`${c.label} fails: ${c.detail}`);
  for (const c of grade.warns) holdingBack.push(`${c.label}: ${c.detail}`);

  if (exitCost == null) {
    holdingBack.push("No sell quote came back, so the exit is unproven — treat that as the most important gap, not a detail.");
  } else if (exitCost > RATING.mediumExitCost) {
    holdingBack.push(`Getting out costs ${pct(exitCost)} of the position at ${size ? `$${size}` : "the screened size"}.`);
    if (size) wouldRaise.push(`A smaller position. Cost scales with size, so screening at a fraction of $${size} would price your real exit honestly.`);
  } else if (exitCost > RATING.strongExitCost) {
    holdingBack.push(`Getting out costs ${pct(exitCost)} at ${size ? `$${size}` : "the screened size"} — workable, but it is a real toll on entry and exit both.`);
  }

  if (depthMultiple != null && depthMultiple < RATING.mediumDepth) {
    holdingBack.push(`The pool is only ${depthMultiple.toFixed(1)}× your position: at that ratio you are a large part of the market, and the quoted price is not the price you would get.`);
    if (size) wouldRaise.push(`A position nearer $${Math.max(1, Math.round((t.liquidityUsd ?? 0) / RATING.mediumDepth))} would leave the pool deep enough for the quote to mean something.`);
  } else if (depthMultiple != null && depthMultiple < RATING.strongDepth) {
    holdingBack.push(`The pool is ${depthMultiple.toFixed(0)}× your position — adequate, not deep.`);
  }

  /*
   * Who is ahead of you in the queue.
   *
   * Every other input here is a property of the token or of your size. This one is about the people
   * already holding it: if the wallets above you can sell several times the pool, the exit is theirs
   * before it is yours, and no check in the nine notices — concentration measures the SHARE they hold,
   * not what that share is worth against the market it would hit.
   */
  const queue = readOverhang(overhang(t), t);
  for (const r of queue.readings) {
    if (r.tone === "bad") holdingBack.push(r.line);
    else if (r.tone === "good") strengths.push(r.line);
  }

  if (grade.coverage < RATING.mediumCoverage) {
    holdingBack.push(`Only ${pct(grade.coverage)} of the checks could be evaluated, so most of this verdict is missing information rather than findings.`);
  }

  // ---- the ladder ---------------------------------------------------------------------------------
  const exitStrong = exitCost != null && exitCost <= RATING.strongExitCost
    && (t.sellPriceImpact == null || t.sellPriceImpact <= RATING.strongImpact);
  const exitOk = exitCost != null && exitCost <= RATING.mediumExitCost
    && (t.sellPriceImpact == null || t.sellPriceImpact <= RATING.mediumImpact);
  const depthStrong = depthMultiple != null && depthMultiple >= RATING.strongDepth;
  const depthOk = depthMultiple != null && depthMultiple >= RATING.mediumDepth;

  const strong = grade.coverage >= RATING.strongCoverage && !grade.softFails.length && !grade.warns.length
    && !grade.unknownHard.length && exitStrong && depthStrong && queue.level === "ok";
  const medium = !grade.unknownHard.length && !grade.softFails.length
    && grade.coverage >= RATING.mediumCoverage && exitOk && depthOk && queue.level !== "severe";

  const rating: Rating = strong ? "strong" : medium ? "medium" : "weak";

  const verdict =
    rating === "strong"
      ? `Strong. Every check ran and none of them is wrong, and at ${size ? `$${size}` : "this size"} the exit costs ${exitCost != null ? pct(exitCost) : "little"} in a pool ${depthMultiple ? `${depthMultiple.toFixed(0)}×` : "well"} bigger than your position. That is the most this can tell you — it says nothing about where the price goes.`
      : rating === "medium"
        ? `Medium. Nothing disqualifying and nothing failing, but ${holdingBack.length} thing${holdingBack.length === 1 ? "" : "s"} below keep${holdingBack.length === 1 ? "s" : ""} it from clean. Reasonable with a size you would not mind losing entirely.`
        : `Weak. ${grade.unknownHard.length ? `${grade.unknownHard.length} critical check${grade.unknownHard.length === 1 ? "" : "s"} could not be run, so you would be buying with the most important question${grade.unknownHard.length === 1 ? "" : "s"} unanswered.` : "Too much is wrong or unmeasured to call this a considered entry."} Unknown is not the same as fine.`;

  if (rating === "strong" && !wouldRaise.length) wouldRaise.push("Nothing on the risk side. What remains is price, which this tool does not measure.");

  // The plain positives, so the card is a balance rather than a charge sheet.
  for (const c of checks) {
    if (c.verdict !== "pass") continue;
    if (c.id === "lpLocked") strengths.push("The liquidity cannot be withdrawn from under you.");
    if (c.id === "mintAuthority") strengths.push("No more supply can be printed.");
    if (c.id === "freezeAuthority") strengths.push("Your account cannot be frozen.");
  }
  if (exitStrong && exitCost != null) strengths.push(`Getting out costs ${pct(exitCost)} at ${size ? `$${size}` : "this size"}.`);
  if (depthStrong && depthMultiple != null) strengths.push(`The pool is ${depthMultiple.toFixed(0)}× your position, so the quote means something.`);

  return { rating, verdict, holdingBack, strengths, wouldRaise, exitCost, depthMultiple };
}

/** Ranking order, for putting the best-cleared screens at the top of a list. */
export const RATING_ORDER: Record<Rating, number> = { strong: 3, medium: 2, weak: 1, avoid: 0 };

/**
 * Sort screens by how well their risk is cleared, then by the cheaper exit.
 *
 * Deliberately not by liquidity, volume or price change: those are the things that look like upside and
 * are not, and putting them in the sort would turn a risk list into an implied buy list.
 */
export function byClearance<T extends { rating: Rating; exitCost: number | null }>(a: T, b: T) {
  const d = RATING_ORDER[b.rating] - RATING_ORDER[a.rating];
  if (d) return d;
  return (a.exitCost ?? 1) - (b.exitCost ?? 1);
}
