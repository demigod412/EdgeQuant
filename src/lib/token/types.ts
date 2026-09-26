/*
 * A token screen, in the same spirit as the rest of EdgeQuant: measure what can be measured, record the
 * measurement, and let the ledger decide whether it was worth anything.
 *
 * What this is NOT: a buy signal. A new token has no cash flows and no history, so there is nothing to
 * forecast from. Every number here describes *avoidable risk* — the ways a token can be built to take
 * your money regardless of where the price goes. That is measurable at mint time. "Will it go up" is not.
 */

/** Everything a screen needs about one token, normalised away from any particular data source. */
export interface TokenSnapshot {
  chain: "solana";
  mint: string;
  symbol: string | null;
  name: string | null;
  /** When the mint was created, if known. */
  createdAt: Date | null;
  observedAt: Date;

  // ---- authorities: can the issuer still change the rules after you buy? ----
  /** Can more supply be minted? null = could not be determined. */
  mintAuthority: string | null;
  mintAuthorityRenounced: boolean | null;
  /** Can your account be frozen, making your tokens unsellable? */
  freezeAuthority: string | null;
  freezeAuthorityRenounced: boolean | null;
  /** Token-2022 transfer-fee / transfer-hook extensions, which can tax or block a sale. */
  transferFeeBps: number | null;
  hasTransferHook: boolean | null;

  // ---- liquidity: can it be pulled out from under you? ----
  liquidityUsd: number | null;
  /** Which DEX the deepest pool is on; LP checkability depends on it. */
  dexId: string | null;
  /** Why the LP check could not run, when it could not. */
  lpUnchecked: string | null;
  /** Share of LP tokens burned or held by a lock program, 0..1. */
  lpLockedShare: number | null;
  /** Largest single LP holder's share, 0..1. One wallet holding the pool can empty it. */
  lpTopHolderShare: number | null;

  // ---- distribution: how concentrated is the float? ----
  /** Share held by the top 10 holders excluding the pool and burn addresses, 0..1. */
  top10Share: number | null;
  /** Largest non-pool holder, 0..1. */
  topHolderShare: number | null;
  holderCount: number | null;

  // ---- the deployer's track record ----
  deployer: string | null;
  /** Mints this deployer has created before. */
  deployerPriorMints: number | null;
  /**
   * How many of the deployer's earlier mints now have no liquidity. A proxy: abandoned and drained
   * look identical from outside, and the wording shown to the user says so.
   */
  deployerPriorRugs: number | null;
  /** How many prior mints could actually be checked, so a thin sample is visible as one. */
  deployerChecked: number | null;

  // ---- the opening blocks ----
  /**
   * Share of supply taken in the opening slots, 0..1. Measures timing, not collusion: proving the
   * wallets are one operator would mean tracing how each was funded.
   */
  sniperBundleShare: number | null;
  /** How many slots after first activity the measurement covered. */
  openingSlots: number | null;
  /** Distinct wallets in that opening cluster. */
  sniperWallets: number | null;

  // ---- can you actually get out? ----
  /** A quote for selling a small position, round-tripped. null = no quote available. */
  sellQuote: { inUsd: number; outUsd: number } | null;
  /** Price impact of a sale at the reference size, 0..1. */
  sellPriceImpact: number | null;

  // ---- market context, for the record rather than for a forecast ----
  fdvUsd: number | null;
  volume24hUsd: number | null;
  buys24h: number | null;
  sells24h: number | null;
}

export type Verdict = "pass" | "warn" | "fail" | "unknown";

export interface CheckResult {
  id: CheckId;
  label: string;
  verdict: Verdict;
  /** What was measured, in plain words, including the number that decided it. */
  detail: string;
  /** A hard fail is disqualifying on its own: the token is built so it can take your money. */
  hard: boolean;
}

export type CheckId =
  | "mintAuthority" | "freezeAuthority" | "transferRules"
  | "lpLocked" | "liquidityDepth"
  | "concentration" | "deployerHistory" | "sniperBundle" | "sellable";
