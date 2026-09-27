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
  /**
   * Set when the pool holds liquidity as individual positions rather than a pooled LP token, so there
   * is no LP to lock. Not an unknown: a statement that this liquidity is withdrawable by its owners.
   */
  lpWithdrawable: string | null;
  /** Positions the pool's liquidity is split across, for a concentrated pool. */
  lpPositions: number | null;
  /**
   * Share of a concentrated pool's liquidity in its single largest position.
   *
   * A LOWER bound on concentration: positions can share an owner, so a high value is good evidence that
   * one actor could pull the pool, while a low value is not evidence that nobody can.
   */
  lpTopPositionShare: number | null;
  /** Share of LP tokens burned or held by a lock program, 0..1. */
  lpLockedShare: number | null;
  /** Largest single LP holder's share, 0..1. One wallet holding the pool can empty it. */
  lpTopHolderShare: number | null;

  // ---- distribution: how concentrated is the float? ----
  /** Share held by the top 10 holders excluding the pool and burn addresses, 0..1. */
  top10Share: number | null;
  /** Why concentration could not be established, when it could not. */
  concentrationUnchecked: string | null;
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
  /** Why the deployer could not be traced, when it could not. */
  deployerUnchecked: string | null;
  /** Share of supply the deployer's own wallet still holds. Measured on chain; null if unreadable. */
  deployerHoldShare: number | null;
  /**
   * Mints Jupiter attributes to the deployer's wallet, used only when the wallet is not creator-indexed.
   * A count with no outcomes attached: it cannot say whether those mints still trade.
   */
  deployerAttributedMints: number | null;
  /** Which source named the deployer: the chain's own creators entry, or Jupiter's index. */
  deployerIdentifiedBy: "creator" | "jupiter" | null;
  /** The launchpad the token came from, when one is recorded. Context, not a verdict. */
  launchpad: string | null;

  // ---- the opening blocks ----
  /**
   * Share of supply taken in the opening slots, 0..1. Measures timing, not collusion: proving the
   * wallets are one operator would mean tracing how each was funded.
   */
  sniperBundleShare: number | null;
  /** How many slots after first activity the measurement covered. */
  openingSlots: number | null;
  /** Why the opening slots could not be measured, when they could not. */
  openingUnchecked: string | null;
  /** Distinct wallets in that opening cluster. */
  sniperWallets: number | null;

  // ---- can you actually get out? ----
  /**
   * A quote for buying a small position and selling it straight back. null = no quote available.
   * Both sides are in the probe currency's own base units, not dollars: only their RATIO is ever used,
   * which is what lets the probe be wrapped SOL when the token being screened is the USDC quote itself.
   */
  sellQuote: { probeIn: number; probeOut: number } | null;
  /**
   * Position size the round trip was measured at, in dollars.
   *
   * Recorded per screen because price impact scales with size: the same token round-trips at 0.4% for
   * $50 and far worse for $5,000, and a cost figure without its size is not a measurement.
   */
  sellProbeUsd: number | null;
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
