import type { CheckResult, TokenSnapshot, Verdict } from "./types";

/*
 * The nine checks. Each is a pure function of the snapshot so it can be unit-tested and, later, scored
 * against what actually happened.
 *
 * Thresholds are deliberately conservative and named here rather than buried in the logic, because they
 * are judgement calls and will need revising once the ledger has settled outcomes to argue with.
 */
export const LIMITS = {
  /** Below this, a single ordinary sell moves the price enough that the quoted price is fiction. */
  minLiquidityUsd: 15_000,
  /** LP not locked at least this much can be withdrawn under you. */
  minLpLocked: 0.9,
  /** One LP holder above this can empty the pool alone. */
  maxLpTopHolder: 0.2,
  /** Top ten holders above this and a handful of wallets decide the price. */
  maxTop10: 0.35,
  warnTop10: 0.25,
  /** One non-pool wallet above this can exit into your bid. */
  maxTopHolder: 0.12,
  /** An opening cluster above this holds the float before anyone else could bid. */
  maxSniperShare: 0.15,
  warnSniperShare: 0.08,
  /** A sale costing more than this in price impact is not an exit. */
  maxSellImpact: 0.15,
  /** Round-trip loss on the sell simulation beyond this means a tax or a trap. */
  maxRoundTripLoss: 0.12,
  /** Any transfer fee at all is a tax on exit; beyond this it is punitive. */
  maxTransferFeeBps: 100,
  /** A deployer with prior rugs at or above this count has shown you what they do. */
  maxDeployerRugs: 1,
  /** A deployer still holding this much can sell it into your bid whatever their past looks like. */
  maxDeployerHold: 0.15,
  warnDeployerHold: 0.05,
  minHolders: 50,
} as const;

const pct = (x: number) => `${(x * 100).toFixed(1)}%`;
const usd = (x: number) => `$${Math.round(x).toLocaleString("en-US")}`;

/** Unknown is never treated as pass: a check that could not run is reported as such. */
const unknown = (id: CheckResult["id"], label: string, why: string, hard = false): CheckResult =>
  ({ id, label, verdict: "unknown", detail: why, hard });

export function runChecks(t: TokenSnapshot): CheckResult[] {
  const out: CheckResult[] = [];
  const add = (id: CheckResult["id"], label: string, verdict: Verdict, detail: string, hard = false) =>
    out.push({ id, label, verdict, detail, hard });

  // ---- 1. mint authority -------------------------------------------------------------------------
  if (t.mintAuthorityRenounced == null) out.push(unknown("mintAuthority", "Mint authority", "Could not read the mint account.", true));
  else if (t.mintAuthorityRenounced) add("mintAuthority", "Mint authority", "pass", "Renounced — the supply cannot be increased.", true);
  else add("mintAuthority", "Mint authority", "fail", `Still held by ${t.mintAuthority ?? "an address"} — more supply can be minted at any time, diluting every holder.`, true);

  // ---- 2. freeze authority -----------------------------------------------------------------------
  if (t.freezeAuthorityRenounced == null) out.push(unknown("freezeAuthority", "Freeze authority", "Could not read the mint account.", true));
  else if (t.freezeAuthorityRenounced) add("freezeAuthority", "Freeze authority", "pass", "Renounced — your account cannot be frozen.", true);
  else add("freezeAuthority", "Freeze authority", "fail", `Still held by ${t.freezeAuthority ?? "an address"} — your tokens can be frozen in place, which makes selling impossible whatever the price.`, true);

  // ---- 3. transfer rules (Token-2022) ------------------------------------------------------------
  if (t.transferFeeBps == null && t.hasTransferHook == null) out.push(unknown("transferRules", "Transfer rules", "Token extensions not read."));
  else if (t.hasTransferHook) add("transferRules", "Transfer rules", "fail", "A transfer hook is set: arbitrary program code runs on every transfer and can reject your sale.", true);
  else if ((t.transferFeeBps ?? 0) > LIMITS.maxTransferFeeBps) add("transferRules", "Transfer rules", "fail", `Transfer fee of ${((t.transferFeeBps ?? 0) / 100).toFixed(2)}% is charged on every move, including your exit.`, true);
  else if ((t.transferFeeBps ?? 0) > 0) add("transferRules", "Transfer rules", "warn", `Transfer fee of ${((t.transferFeeBps ?? 0) / 100).toFixed(2)}% — a standing tax on selling.`);
  else add("transferRules", "Transfer rules", "pass", "No transfer fee and no transfer hook.");

  // ---- 4. LP locked or burned --------------------------------------------------------------------
  // A pool with no LP token cannot have a locked one. That is an answer, not a gap, so it is a warning
  // about withdrawable liquidity rather than a critical check that failed to run.
  if (t.lpWithdrawable) add("lpLocked", "Liquidity locked", "warn", t.lpWithdrawable);
  else if (t.lpLockedShare == null) out.push(unknown("lpLocked", "Liquidity locked", t.lpUnchecked ?? "The LP holders could not be read, so whether the liquidity can be withdrawn is unknown.", true));
  else if (t.lpLockedShare >= LIMITS.minLpLocked) add("lpLocked", "Liquidity locked", "pass", `${pct(t.lpLockedShare)} of LP burned or locked.`, true);
  else if (t.lpTopHolderShare != null && t.lpTopHolderShare > LIMITS.maxLpTopHolder)
    add("lpLocked", "Liquidity locked", "fail", `Only ${pct(t.lpLockedShare)} of LP is locked and one wallet holds ${pct(t.lpTopHolderShare)} of it — the pool can be withdrawn, leaving your tokens unsellable at any price.`, true);
  else add("lpLocked", "Liquidity locked", "fail", `Only ${pct(t.lpLockedShare)} of LP is locked or burned.`, true);

  // ---- 5. liquidity depth ------------------------------------------------------------------------
  if (t.liquidityUsd == null) out.push(unknown("liquidityDepth", "Liquidity depth", "No pool data."));
  else if (t.liquidityUsd >= LIMITS.minLiquidityUsd) add("liquidityDepth", "Liquidity depth", "pass", `${usd(t.liquidityUsd)} in the pool.`);
  else add("liquidityDepth", "Liquidity depth", "warn", `${usd(t.liquidityUsd)} in the pool — thin enough that the quoted price is not the price you would get.`);

  // ---- 6. holder concentration -------------------------------------------------------------------
  if (t.top10Share == null) out.push(unknown("concentration", "Holder concentration", t.concentrationUnchecked ?? "Holder list unavailable."));
  else {
    const top = t.topHolderShare;
    const worst = Math.max(t.top10Share > LIMITS.maxTop10 ? 2 : t.top10Share > LIMITS.warnTop10 ? 1 : 0,
      top != null && top > LIMITS.maxTopHolder ? 2 : 0);
    const detail = `Top 10 hold ${pct(t.top10Share)}${top != null ? `, largest single wallet ${pct(top)}` : ""}`
      + `${t.holderCount != null ? `, ${t.holderCount.toLocaleString("en-US")} holder${t.holderCount === 1 ? "" : "s"}` : ""}.`;
    add("concentration", "Holder concentration", worst === 2 ? "fail" : worst === 1 ? "warn" : "pass",
      worst === 2 ? `${detail} A few wallets can exit into whatever bid exists.` : detail);
  }

  // ---- 7. the deployer: who they are, what they launched before, and what they still hold --------
  if (t.deployerPriorMints == null || t.deployerPriorRugs == null) out.push(unknown("deployerHistory", "Deployer", t.deployerUnchecked ?? "Deployer not identified."));
  else {
    /*
     * Three things, worst one wins.
     *
     * Their record is the strongest signal but the least available: a wallet that is not creator-indexed
     * returns no mints, and that is not the same as having launched none. What they still HOLD is always
     * measurable once they are identified, and it is a live risk regardless of history — a deployer
     * sitting on a fifth of the supply can sell it into your bid however clean their past looks.
     */
    const hold = t.deployerHoldShare;
    const attributed = t.deployerAttributedMints;
    const mints = t.deployerPriorMints, dead = t.deployerPriorRugs, checked = t.deployerChecked ?? 0;

    let rank = 0; // 0 pass, 1 warn, 2 fail
    let history: string;
    if (dead >= LIMITS.maxDeployerRugs) {
      rank = 2;
      history = `${dead} of the ${checked || mints} earlier mint${(checked || mints) === 1 ? "" : "s"} from this wallet that could be checked now have no liquidity — abandoned or drained, which look the same from outside. Either way it is a trail of dead launches.`;
    } else if (mints === 0 && attributed != null && attributed > 1) {
      // Jupiter counts the wallet's mints but says nothing about how they ended, so this is a warning
      // about missing information, not a clean record.
      rank = 1;
      history = `${attributed} mints are attributed to this wallet, but none could be traced here, so whether any of them still trade is unknown.`;
    } else if (mints === 0) {
      rank = 1;
      history = "First mint traceable to this wallet — no track record either way.";
    } else if (checked === 0) {
      rank = 1;
      history = `${mints} earlier mint${mints === 1 ? "" : "s"} from this wallet, none of which ever traded — nothing to judge them on.`;
    } else {
      history = `${checked} earlier mint${checked === 1 ? "" : "s"} from this wallet still have liquidity${mints > checked ? ` (of ${mints} launched)` : ""}.`;
    }

    let holding = "";
    if (hold == null) holding = " What the deployer still holds could not be read.";
    else if (hold > LIMITS.maxDeployerHold) {
      rank = 2;
      holding = ` The deployer's own wallet still holds ${pct(hold)} of supply, which can be sold into whatever bid exists.`;
    } else if (hold > LIMITS.warnDeployerHold) {
      rank = Math.max(rank, 1);
      holding = ` The deployer still holds ${pct(hold)} of supply.`;
    } else holding = ` The deployer holds ${pct(hold)} of supply.`;

    // Say which source named them. One is a chain record; the other is an index's attribution, and a
    // reader deciding what to trust is entitled to know the difference.
    const named = t.deployerIdentifiedBy === "jupiter" ? " Identified from Jupiter's index rather than an on-chain creator record." : "";
    add("deployerHistory", "Deployer", rank === 2 ? "fail" : rank === 1 ? "warn" : "pass", `${history}${holding}${named}`, rank === 2);
  }

  // ---- 8. opening-block cluster ------------------------------------------------------------------
  if (t.sniperBundleShare == null) out.push(unknown("sniperBundle", "Opening blocks", t.openingUnchecked ?? "Early buyers not traced."));
  else if (t.sniperBundleShare > LIMITS.maxSniperShare)
    add("sniperBundle", "Opening blocks", "fail", `${pct(t.sniperBundleShare)} of supply was taken by ${t.sniperWallets ?? "several"} wallet${t.sniperWallets === 1 ? "" : "s"} within the first ${t.openingSlots ?? 60} slots — the float was gone before anyone else could bid, and it sits above you in the queue to sell. Whether those wallets are one operator is not checked.`, true);
  else if (t.sniperBundleShare > LIMITS.warnSniperShare)
    add("sniperBundle", "Opening blocks", "warn", `${pct(t.sniperBundleShare)} of supply taken by ${t.sniperWallets ?? "several"} wallet${t.sniperWallets === 1 ? "" : "s"} in the first ${t.openingSlots ?? 60} slots.`);
  else add("sniperBundle", "Opening blocks", "pass", `${pct(t.sniperBundleShare)} of supply taken in the first ${t.openingSlots ?? 60} slots.`);

  // ---- 9. can you actually sell ------------------------------------------------------------------
  if (!t.sellQuote) out.push(unknown("sellable", "Sell simulation", "No sell quote returned — treat as unproven, not as safe.", true));
  else {
    const loss = 1 - t.sellQuote.probeOut / Math.max(1e-9, t.sellQuote.probeIn);
    const impact = t.sellPriceImpact;
    // The size is part of every statement here. Price impact scales with it, so "round-trips at 2%" is
    // not a fact about the token until you know what was being sold.
    const at = t.sellProbeUsd != null ? ` at ${usd(t.sellProbeUsd)}` : "";
    if (loss >= 0.99) add("sellable", "Sell simulation", "fail", "A sale quotes out at essentially nothing: this is a honeypot — you can buy but not sell.", true);
    else if (loss > LIMITS.maxRoundTripLoss) add("sellable", "Sell simulation", "fail", `Selling${at} straight back loses ${pct(loss)} — a tax, a trap, or a pool too thin for that size.`, true);
    else if (impact != null && impact > LIMITS.maxSellImpact) add("sellable", "Sell simulation", "warn", `Round trip${at} costs ${pct(loss)}, and the sale moves the price ${pct(impact)} — the pool is thin for that size.`);
    else add("sellable", "Sell simulation", "pass", `A sale${at} round-trips at ${pct(loss)} cost${impact != null ? `, price impact ${pct(impact)}` : ""}.`);
  }

  return out;
}
