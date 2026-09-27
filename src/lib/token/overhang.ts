import type { TokenSnapshot } from "./types";

/*
 * Who is ahead of you in the queue to sell, and how much they can take.
 *
 * ── The idea, and the one correction it needs ───────────────────────────────────────────────────────
 * The instinct is right: if the people at the top can extract more than they irrevocably committed, they
 * have every reason to leave, and you are behind them. But their PROFIT is not computable — nothing on
 * chain says what they paid. A wallet holding $400k that bought at $400k is not in profit, and a metric
 * that called it profit would be inventing the most important number in it.
 *
 * What IS computable, from figures already in every snapshot:
 *
 *   1. How much the largest holders could sell, against the pool they would sell it into. This is the
 *      one that decides whether YOU can get out, and it needs no assumption about anyone's intent.
 *   2. How much they could sell, against the liquidity that can never be withdrawn. An asymmetry
 *      between what is extractable and what is genuinely sunk.
 *   3. What the deployer alone could sell.
 *
 * The second needs a caveat carried with it wherever it is shown: burned or locked LP was not necessarily
 * put up by those holders — on a bonding-curve launch it comes from buyers — so a large ratio is an
 * asymmetry of incentives, not evidence of a plan.
 */

export const OVERHANG = {
  /** Sellable value this many times the pool and the exit is crowded past the point of orderly. */
  severeTimesPool: 5,
  warnTimesPool: 2,
  /** Extractable against irrevocably committed. Beyond this the commitment is nominal. */
  severeTimesLocked: 20,
  warnTimesLocked: 5,
} as const;

export interface Overhang {
  /** USD the ten largest non-pool wallets could sell. */
  sellableUsd: number | null;
  /** The pool they would be selling into. */
  poolUsd: number | null;
  /** Sellable value as a multiple of the pool. The number that decides whether you can get out. */
  timesPool: number | null;
  /** Dollar liquidity that can never be withdrawn. */
  lockedUsd: number | null;
  /** Sellable value as a multiple of what is genuinely sunk. */
  timesLocked: number | null;
  /** What the deployer's own wallet could sell. */
  deployerUsd: number | null;
  /** The largest position you could exit while keeping the pool deep enough for the quote to hold. */
  exitableUsd: number | null;
}

/** Pool depth a position should not exceed if its exit price is to mean anything. */
const EXITABLE_FRACTION = 1 / 15;

export function overhang(t: TokenSnapshot): Overhang {
  const cap = t.marketCapUsd ?? t.fdvUsd;
  const pool = t.liquidityUsd;
  const sellableUsd = cap != null && t.top10Share != null ? cap * t.top10Share : null;
  const lockedUsd = pool != null && t.lpLockedShare != null ? pool * t.lpLockedShare : null;
  const deployerUsd = cap != null && t.deployerHoldShare != null ? cap * t.deployerHoldShare : null;
  return {
    sellableUsd,
    poolUsd: pool,
    timesPool: sellableUsd != null && pool ? sellableUsd / pool : null,
    lockedUsd,
    // Nothing locked at all is not "infinitely asymmetric"; it is a different finding, which the
    // liquidity-lock check already makes. Null keeps this metric from restating that one badly.
    timesLocked: sellableUsd != null && lockedUsd && lockedUsd > 0 ? sellableUsd / lockedUsd : null,
    deployerUsd,
    exitableUsd: pool != null ? pool * EXITABLE_FRACTION : null,
  };
}

const money = (x: number): string => {
  const a = Math.abs(x);
  if (a >= 1e9) return `$${(x / 1e9).toFixed(a >= 1e10 ? 0 : 1)}B`;
  if (a >= 1e6) return `$${(x / 1e6).toFixed(a >= 1e7 ? 0 : 1)}M`;
  if (a >= 1e3) return `$${(x / 1e3).toFixed(a >= 1e4 ? 0 : 1)}K`;
  return `$${Math.round(x)}`;
};

export type OverhangLevel = "severe" | "warn" | "ok" | "unknown";

/** How bad the queue is, and how to say it. Worst of the two ratios decides. */
export function readOverhang(o: Overhang): { level: OverhangLevel; lines: string[] } {
  const lines: string[] = [];
  let level: OverhangLevel = o.timesPool == null && o.timesLocked == null ? "unknown" : "ok";
  const worsen = (l: OverhangLevel) => {
    const rank = { unknown: 0, ok: 1, warn: 2, severe: 3 };
    if (rank[l] > rank[level]) level = l;
  };

  if (o.timesPool != null && o.sellableUsd != null && o.poolUsd != null) {
    const times = o.timesPool;
    if (times >= OVERHANG.severeTimesPool) worsen("severe");
    else if (times >= OVERHANG.warnTimesPool) worsen("warn");
    lines.push(
      `The ten largest wallets hold ${money(o.sellableUsd)} of tokens against a ${money(o.poolUsd)} pool — `
      + `${times.toFixed(1)}× the market they would be selling into. `
      + (times >= OVERHANG.warnTimesPool
        ? "They cannot all get out at these prices, and whoever moves first takes most of what is there."
        : "Small enough that the holders above you do not by themselves define the exit."),
    );
  }

  if (o.timesLocked != null && o.lockedUsd != null && o.sellableUsd != null) {
    const times = o.timesLocked;
    if (times >= OVERHANG.severeTimesLocked) worsen("severe");
    else if (times >= OVERHANG.warnTimesLocked) worsen("warn");
    lines.push(
      `${money(o.lockedUsd)} of liquidity can never be withdrawn, against ${money(o.sellableUsd)} that those `
      + `wallets can still sell: ${times.toFixed(0)}× more extractable than is genuinely committed. `
      + "Locked liquidity is not necessarily theirs — on a curve launch it comes from buyers — so this is "
      + "an asymmetry of incentives, not evidence of a plan. And what they paid is not on chain, so it is "
      + "not profit either.",
    );
  }

  if (o.deployerUsd != null && o.deployerUsd > 0 && o.poolUsd) {
    const times = o.deployerUsd / o.poolUsd;
    if (times >= 1) worsen("severe");
    else if (times >= 0.25) worsen("warn");
    lines.push(`The deployer's own wallet holds ${money(o.deployerUsd)}, ${times < 0.01 ? "a negligible share of" : `${times.toFixed(2)}×`} the pool.`);
  }

  return { level, lines };
}

/** One short line for a dense row. */
export function overhangLabel(o: Overhang): string | null {
  if (o.timesPool == null) return null;
  return `${o.timesPool.toFixed(1)}× overhang`;
}
