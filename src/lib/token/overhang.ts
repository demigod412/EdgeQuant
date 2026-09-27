import type { TokenSnapshot } from "./types";

/*
 * Who is ahead of you in the queue to sell, what it would take for them to leave, and whether they have
 * anything to leave with yet.
 *
 * ── The idea, and the one correction it needs ───────────────────────────────────────────────────────
 * If the people at the top can extract more than they irrevocably committed, they have every reason to
 * go, and you are behind them. But their PROFIT is not computable — nothing on chain says what they
 * paid. A wallet holding $400k that bought at $400k is not in profit, and a metric calling it profit
 * would be inventing the most important number in it.
 *
 * What IS computable, from figures already in every snapshot:
 *
 *   1. How much the largest wallets could sell, against the pool they would sell it into. The number
 *      that decides whether YOU can get out, needing no assumption about anyone's intent.
 *   2. The same, against the liquidity that can never be withdrawn — extractable versus genuinely sunk.
 *   3. The market cap at which those two meet: below it, nobody at the top has recovered what was
 *      committed, and dumping realises less than was given up. That is a real, if temporary, alignment
 *      of interests, and it is the one genuinely reassuring thing in this file.
 *   4. What the deployer's own wallet holds — with the caveat that a creator who means to sell rarely
 *      does it from the wallet that deployed.
 *
 * Carried with (2) and (3) wherever they are shown: burned or locked LP is not necessarily the top
 * holders' own — on a curve launch it comes from buyers — so a large ratio is an asymmetry of
 * incentives, not evidence of a plan.
 */

export const OVERHANG = {
  /** Sellable value this many times the pool and the exit is crowded past the point of orderly. */
  severeTimesPool: 5,
  warnTimesPool: 2,
  /** Extractable against irrevocably committed. Beyond this the commitment is nominal. */
  severeTimesLocked: 20,
  warnTimesLocked: 5,
  /** Below this share of break-even, the top of the queue has clearly not recovered its commitment. */
  wellBelowBreakEven: 0.7,
} as const;

export interface Overhang {
  /** USD the ten largest non-pool wallets could sell. */
  sellableUsd: number | null;
  /** The pool they would be selling into. */
  poolUsd: number | null;
  /** Sellable value as a multiple of the pool. */
  timesPool: number | null;
  /** Dollar liquidity that can never be withdrawn. */
  lockedUsd: number | null;
  /** Sellable value as a multiple of what is genuinely sunk. */
  timesLocked: number | null;
  /** Market cap at which the top holders' stake is worth what was locked. Null when not derivable. */
  breakEvenCapUsd: number | null;
  /** Current cap as a share of break-even. Below 1, nothing at the top has been recovered yet. */
  towardsBreakEven: number | null;
  /** What the deployer's own wallet could sell. */
  deployerUsd: number | null;
  /** The largest position this pool can absorb while its quoted exit still means something. */
  exitableUsd: number | null;
  capUsd: number | null;
}

/** Pool depth a position should not exceed if its exit price is to mean anything. */
const EXITABLE_FRACTION = 1 / 15;

/**
 * The cap at which sellable value equals locked value.
 *
 * Not simply `locked / share`, because the locked liquidity is itself priced in dollars and grows as the
 * token does: a pool's value scales with the square root of the price. Solving
 * `cap · s = L₀ · √(cap / cap₀)` gives `cap = L₀² / (s² · cap₀)`. The naive form understates it, and the
 * gap widens the further away break-even is — which is exactly when the number is being relied on.
 */
export function breakEvenCap(lockedUsd: number, topShare: number, currentCapUsd: number): number | null {
  if (!(lockedUsd > 0) || !(topShare > 0) || !(currentCapUsd > 0)) return null;
  return (lockedUsd * lockedUsd) / (topShare * topShare * currentCapUsd);
}

export function overhang(t: TokenSnapshot): Overhang {
  const cap = t.marketCapUsd ?? t.fdvUsd;
  const pool = t.liquidityUsd;
  const sellableUsd = cap != null && t.top10Share != null ? cap * t.top10Share : null;
  const lockedUsd = pool != null && t.lpLockedShare != null ? pool * t.lpLockedShare : null;
  const deployerUsd = cap != null && t.deployerHoldShare != null ? cap * t.deployerHoldShare : null;
  const be = lockedUsd != null && t.top10Share != null && cap != null
    ? breakEvenCap(lockedUsd, t.top10Share, cap) : null;
  return {
    sellableUsd,
    poolUsd: pool,
    timesPool: sellableUsd != null && pool ? sellableUsd / pool : null,
    lockedUsd,
    // Nothing locked at all is not "infinitely asymmetric"; it is a different finding, and the
    // liquidity-lock check already makes it. Null keeps this from restating that one badly.
    timesLocked: sellableUsd != null && lockedUsd && lockedUsd > 0 ? sellableUsd / lockedUsd : null,
    breakEvenCapUsd: be,
    towardsBreakEven: be && cap != null ? cap / be : null,
    deployerUsd,
    exitableUsd: pool != null ? pool * EXITABLE_FRACTION : null,
    capUsd: cap,
  };
}

export const money = (x: number): string => {
  const a = Math.abs(x);
  if (a >= 1e9) return `$${(x / 1e9).toFixed(a >= 1e10 ? 0 : 1)}B`;
  if (a >= 1e6) return `$${(x / 1e6).toFixed(a >= 1e7 ? 0 : 1)}M`;
  if (a >= 1e3) return `$${(x / 1e3).toFixed(a >= 1e4 ? 0 : 1)}K`;
  return `$${Math.round(x)}`;
};

export type OverhangLevel = "severe" | "warn" | "ok" | "unknown";
/** Whether a reading is in your favour, against you, or merely a fact. */
export type Tone = "good" | "bad" | "neutral";
export interface Reading { tone: Tone; line: string }

/**
 * The queue, read out. Worst of the ratios sets the level; each line carries its own sense, so a card
 * can show what is in your favour as plainly as what is not.
 */
export function readOverhang(o: Overhang, t?: Pick<TokenSnapshot, "sniperBundleShare" | "deployerHoldShare">): { level: OverhangLevel; readings: Reading[] } {
  const readings: Reading[] = [];
  let level: OverhangLevel = o.timesPool == null && o.timesLocked == null ? "unknown" : "ok";
  const worsen = (l: OverhangLevel) => {
    const rank = { unknown: 0, ok: 1, warn: 2, severe: 3 };
    if (rank[l] > rank[level]) level = l;
  };

  // ---- 1. sellable against the pool -------------------------------------------------------------
  if (o.timesPool != null && o.sellableUsd != null && o.poolUsd != null) {
    const times = o.timesPool;
    const bad = times >= OVERHANG.warnTimesPool;
    if (times >= OVERHANG.severeTimesPool) worsen("severe");
    else if (bad) worsen("warn");
    readings.push({
      tone: bad ? "bad" : "good",
      line: `The ten largest wallets hold ${money(o.sellableUsd)} of tokens against a ${money(o.poolUsd)} pool — ${times.toFixed(1)}× the market they would be selling into. `
        + (bad
          ? "They cannot all get out at these prices, and whoever moves first takes most of what is there. You are behind them."
          : "Small enough that the holders above you do not by themselves define the exit."),
    });
  }

  // ---- 2 & 3. against what is sunk, and the cap where that changes -------------------------------
  if (o.timesLocked != null && o.lockedUsd != null && o.sellableUsd != null) {
    const times = o.timesLocked;
    const below = o.towardsBreakEven != null && o.towardsBreakEven < 1;
    if (times >= OVERHANG.severeTimesLocked) worsen("severe");
    else if (times >= OVERHANG.warnTimesLocked) worsen("warn");

    if (below && o.breakEvenCapUsd != null && o.capUsd != null) {
      /*
       * The favourable case, and the only genuinely reassuring reading here. Below break-even, selling
       * everything realises less than was irrevocably given up — so for now the people at the top of the
       * queue gain nothing by leaving. It is temporary by nature: it expires the moment the cap rises.
       */
      const needs = o.breakEvenCapUsd / o.capUsd - 1;
      readings.push({
        tone: "good",
        line: `Sellable value is still below what is locked: ${money(o.sellableUsd)} against ${money(o.lockedUsd)} that can never be withdrawn. `
          + `The cap would have to reach about ${money(o.breakEvenCapUsd)} — ${(needs * 100).toFixed(0)}% above the present ${money(o.capUsd)} — before dumping realised more than was given up. `
          + `Until then the top of the queue gains nothing by leaving, which is the one thing here that is actually in your favour. It expires as the cap rises.`,
      });
    } else {
      readings.push({
        tone: times >= OVERHANG.warnTimesLocked ? "bad" : "neutral",
        line: `${money(o.lockedUsd)} of liquidity can never be withdrawn, against ${money(o.sellableUsd)} those wallets can still sell: ${times.toFixed(0)}× more extractable than is genuinely committed`
          + (o.breakEvenCapUsd != null && o.capUsd != null ? `, and the cap passed the ${money(o.breakEvenCapUsd)} where that flipped` : "")
          + ". Locked liquidity is not necessarily theirs — on a curve launch it comes from buyers — so this is an asymmetry of incentives, not evidence of a plan. And what they paid is not on chain, so it is not profit either.",
      });
    }
  }

  // ---- 4. the deployer, and why their own balance is weak evidence -------------------------------
  if (o.deployerUsd != null && o.poolUsd) {
    const times = o.deployerUsd / o.poolUsd;
    const holdsLittle = (t?.deployerHoldShare ?? 0) < 0.01;
    if (times >= 1) worsen("severe");
    else if (times >= 0.25) worsen("warn");
    if (holdsLittle) {
      /*
       * The point worth making plainly: a creator who intends to sell rarely does it from the wallet
       * that deployed. An empty deployer wallet is therefore not reassurance, and treating it as such
       * is exactly the mistake this reading exists to prevent. The ten-largest figure above covers the
       * case whoever the wallets belong to, and the opening-blocks check is the closest thing to a tell.
       */
      const sniped = t?.sniperBundleShare ?? null;
      readings.push({
        tone: "neutral",
        line: `The deployer's own wallet holds almost nothing — which is not reassurance. A creator who means to sell rarely does it from the wallet that deployed; they appear as an ordinary holder. `
          + (sniped != null && sniped > 0.05
            ? `Here ${(sniped * 100).toFixed(1)}% of supply went to wallets in the opening slots, which is the closest thing to a tell. `
            : "")
          + "The ten-largest figure above is the one that matters, whoever those wallets belong to.",
      });
    } else {
      readings.push({
        tone: times >= 0.25 ? "bad" : "neutral",
        line: `The deployer's own wallet holds ${money(o.deployerUsd)}, ${times.toFixed(2)}× the pool.`,
      });
    }
  }

  return { level, readings };
}

/** One short line for a dense row. */
export function overhangLabel(o: Overhang): string | null {
  if (o.timesPool == null) return null;
  return `${o.timesPool.toFixed(1)}× overhang`;
}
