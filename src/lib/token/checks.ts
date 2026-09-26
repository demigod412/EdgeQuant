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
  if (t.lpLockedShare == null) out.push(unknown("lpLocked", "Liquidity locked", "Could not read the LP holders.", true));
  else if (t.lpLockedShare >= LIMITS.minLpLocked) add("lpLocked", "Liquidity locked", "pass", `${pct(t.lpLockedShare)} of LP burned or locked.`, true);
  else if (t.lpTopHolderShare != null && t.lpTopHolderShare > LIMITS.maxLpTopHolder)
    add("lpLocked", "Liquidity locked", "fail", `Only ${pct(t.lpLockedShare)} of LP is locked and one wallet holds ${pct(t.lpTopHolderShare)} of it — the pool can be withdrawn, leaving your tokens unsellable at any price.`, true);
  else add("lpLocked", "Liquidity locked", "fail", `Only ${pct(t.lpLockedShare)} of LP is locked or burned.`, true);

  // ---- 5. liquidity depth ------------------------------------------------------------------------
  if (t.liquidityUsd == null) out.push(unknown("liquidityDepth", "Liquidity depth", "No pool data."));
  else if (t.liquidityUsd >= LIMITS.minLiquidityUsd) add("liquidityDepth", "Liquidity depth", "pass", `${usd(t.liquidityUsd)} in the pool.`);
  else add("liquidityDepth", "Liquidity depth", "warn", `${usd(t.liquidityUsd)} in the pool — thin enough that the quoted price is not the price you would get.`);

  // ---- 6. holder concentration -------------------------------------------------------------------
  if (t.top10Share == null) out.push(unknown("concentration", "Holder concentration", "Holder list unavailable."));
  else {
    const top = t.topHolderShare;
    const worst = Math.max(t.top10Share > LIMITS.maxTop10 ? 2 : t.top10Share > LIMITS.warnTop10 ? 1 : 0,
      top != null && top > LIMITS.maxTopHolder ? 2 : 0);
    const detail = `Top 10 hold ${pct(t.top10Share)}${top != null ? `, largest single wallet ${pct(top)}` : ""}`
      + `${t.holderCount != null ? `, ${t.holderCount.toLocaleString("en-US")} holders` : ""}.`;
    add("concentration", "Holder concentration", worst === 2 ? "fail" : worst === 1 ? "warn" : "pass",
      worst === 2 ? `${detail} A few wallets can exit into whatever bid exists.` : detail);
  }

  // ---- 7. deployer history -----------------------------------------------------------------------
  if (t.deployerPriorMints == null || t.deployerPriorRugs == null) out.push(unknown("deployerHistory", "Deployer history", "Deployer's earlier mints not traced."));
  else if (t.deployerPriorRugs >= LIMITS.maxDeployerRugs)
    add("deployerHistory", "Deployer history", "fail", `This deployer has ${t.deployerPriorRugs} earlier mint${t.deployerPriorRugs === 1 ? "" : "s"} whose liquidity was removed, out of ${t.deployerPriorMints}. Past behaviour is the strongest signal available here.`, true);
  else if (t.deployerPriorMints === 0) add("deployerHistory", "Deployer history", "warn", "First mint from this wallet — no track record either way.");
  else add("deployerHistory", "Deployer history", "pass", `${t.deployerPriorMints} earlier mint${t.deployerPriorMints === 1 ? "" : "s"} from this deployer, none with liquidity removed.`);

  // ---- 8. opening-block cluster ------------------------------------------------------------------
  if (t.sniperBundleShare == null) out.push(unknown("sniperBundle", "Opening blocks", "Early buyers not traced."));
  else if (t.sniperBundleShare > LIMITS.maxSniperShare)
    add("sniperBundle", "Opening blocks", "fail", `${pct(t.sniperBundleShare)} of supply was taken in the opening slots by ${t.sniperWallets ?? "several"} co-funded wallets — the float was captured before anyone else could bid, and they are above you in the queue to sell.`, true);
  else if (t.sniperBundleShare > LIMITS.warnSniperShare)
    add("sniperBundle", "Opening blocks", "warn", `${pct(t.sniperBundleShare)} of supply taken in the opening slots by ${t.sniperWallets ?? "several"} co-funded wallets.`);
  else add("sniperBundle", "Opening blocks", "pass", `${pct(t.sniperBundleShare)} of supply taken in the opening slots.`);

  // ---- 9. can you actually sell ------------------------------------------------------------------
  if (!t.sellQuote) out.push(unknown("sellable", "Sell simulation", "No sell quote returned — treat as unproven, not as safe.", true));
  else {
    const loss = 1 - t.sellQuote.outUsd / Math.max(1e-9, t.sellQuote.inUsd);
    const impact = t.sellPriceImpact;
    if (loss >= 0.99) add("sellable", "Sell simulation", "fail", "A sale quotes out at essentially nothing: this is a honeypot — you can buy but not sell.", true);
    else if (loss > LIMITS.maxRoundTripLoss) add("sellable", "Sell simulation", "fail", `Selling straight back loses ${pct(loss)} — a tax or a trap, not a spread.`, true);
    else if (impact != null && impact > LIMITS.maxSellImpact) add("sellable", "Sell simulation", "warn", `Round trip costs ${pct(loss)}; a sale at the reference size moves the price ${pct(impact)}.`);
    else add("sellable", "Sell simulation", "pass", `A sale round-trips at ${pct(loss)} cost${impact != null ? `, price impact ${pct(impact)}` : ""}.`);
  }

  return out;
}
