import "server-only";
import { isPumpSwap, pumpswapLpMint } from "./pumpswap";

/*
 * The three checks that need indexed history rather than a single account read: whether the pool's LP
 * was burned or locked, what the deployer has done before, and who took the supply in the opening slots.
 *
 * Free-plan shaped on purpose: 10 requests/second and 1M credits a month. Every call is spaced, every
 * walk is capped, and hitting a cap returns null so the check reports "unknown" rather than inventing a
 * pass. That last part matters more than the coverage — a screen that quietly grades a token clean
 * because a lookup ran out of budget is worse than no screen at all.
 *
 * Each function also says plainly what it actually measures. Two of them are proxies, and the wording
 * the UI shows says so: "liquidity gone" is not the same as proven theft, and "took supply early" is
 * not the same as proven collusion.
 */

const RPC = () => process.env.SOLANA_RPC_URL ?? "";
/** Helius exposes DAS and the enhanced endpoints; the key can come from its own var or the RPC URL. */
const HELIUS_KEY = () => process.env.HELIUS_API_KEY || new URL(RPC() || "https://x.invalid").searchParams.get("api-key") || "";
const isHelius = () => /helius/i.test(RPC()) || !!process.env.HELIUS_API_KEY;

/** Free plan is 10 req/s; keep well under it. */
const SPACING_MS = 150;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** How far back a signature walk will go before giving up. A token worth screening early is young. */
const MAX_SIG_PAGES = 6;      // 6 × 1000 signatures
const OPENING_SLOTS = 60;     // ~30 seconds of slots after the first transfer
const MAX_PRIOR_MINTS = 30;   // DexScreener takes 30 addresses per request

const BURNERS = new Set([
  "1nc1nerator11111111111111111111111111111111",
  "11111111111111111111111111111111",
]);
/** Programs that hold LP on someone's behalf with a time lock. Held here is not withdrawable now. */
const LOCKERS = new Set([
  "7KqpRwzkkeweW5jQoETyLzhvs9rcCj9dVQ1MnzudirsM", // Raydium LP lock (CLMM/AMM lock vault)
  "CLoCKyJ6DXBJqqu2VWx9RLbgnwwR6BMHHuyasVmfMzBh", // Streamflow lock
  "LocpQgucEQHbqNABEYvBvwoxCPsSbG91A1QaQhQQqjn",  // Bonfida token lock
]);

async function rpc<T>(method: string, params: unknown): Promise<T | null> {
  if (!RPC()) return null;
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 15_000);
  try {
    const r = await fetch(RPC(), {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: "eq", method, params }), signal: ctl.signal, cache: "no-store",
    });
    if (!r.ok) throw new Error(`${method} HTTP ${r.status}`);
    const j = (await r.json()) as { result?: T; error?: { message: string } };
    if (j.error) throw new Error(`${method}: ${j.error.message}`);
    return j.result ?? null;
  } finally { clearTimeout(t); }
}

async function getJson<T>(url: string): Promise<T | null> {
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 15_000);
  try {
    const r = await fetch(url, { signal: ctl.signal, cache: "no-store" });
    if (!r.ok) return null;
    return (await r.json()) as T;
  } finally { clearTimeout(t); }
}

// ─────────────────────────────────────────────────────────────────────────────────────────────────────
// 1. LP burned or locked
// ─────────────────────────────────────────────────────────────────────────────────────────────────────

/**
 * Share of the pool's LP supply that is burned or sitting in a lock program, and the largest single
 * live holder of it.
 *
 * The LP mint has to be resolved from the pool, which is DEX-specific. Raydium publishes it, so Raydium
 * pools are checkable. pump.fun's own curve has no transferable LP at all — liquidity there is held by
 * the program and cannot be withdrawn by the deployer, which is a pass rather than an unknown. Anything
 * else returns null and is reported as unchecked, naming the DEX, instead of being guessed at.
 */
/**
 * Pool architectures that hold liquidity as individual positions rather than as a pooled LP token.
 *
 * Orca Whirlpools, Raydium CLMM and Meteora DLMM all work this way. There is no LP token to burn or
 * lock, so "is the LP locked" has no answer — and reporting "not checkable on orca" implied a gap in our
 * tooling when it is a property of the pool. The honest statement is the opposite and more useful: this
 * liquidity CAN be withdrawn, position by position, by whoever owns each position.
 */
const CONCENTRATED = new Set(["clmm", "dlmm", "wp", "whirlpool"]);

/*
 * Where a concentrated pool's liquidity CAN be measured, position by position.
 *
 * "There is no LP token to lock" is true but incomplete. The risk an LP lock protects against is that
 * someone withdraws the liquidity under you, and in a concentrated pool that risk is still measurable:
 * if one position holds most of the pool, whoever owns it can pull most of the pool.
 *
 * Only layouts verified against the program's own source go in this table. An unverified decoder would
 * produce numbers rather than errors, and a confident wrong number is worse than an honest unknown —
 * which is why Raydium CLMM and Meteora DLMM are absent rather than guessed at.
 */
const POSITION_LAYOUTS: Record<string, { program: string; size: number; poolOffset: number; liqOffset: number; name: string }> = {
  // orca-so/whirlpools, programs/whirlpool/src/state/position.rs: LEN = 8 + 136 + 72 = 216, with
  // whirlpool at 8 and liquidity (u128) at 72.
  wp: { program: "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc", size: 216, poolOffset: 8, liqOffset: 72, name: "Orca Whirlpool" },
};

/** Little-endian u128 out of a 16-byte buffer. */
function readU128LE(buf: Buffer): bigint {
  return buf.readBigUInt64LE(0) + (buf.readBigUInt64LE(8) << 64n);
}

/**
 * How much of a concentrated pool's liquidity sits in its single largest position.
 *
 * A LOWER bound on concentration, and the asymmetry matters: several positions can share one owner, so a
 * high number is trustworthy evidence that one actor could pull the pool, while a low number is NOT
 * evidence that no one can. The check wording says so rather than letting a reassuring number stand
 * unqualified.
 */
async function positionSpread(label: string, pool: string): Promise<{ positions: number; topShare: number; name: string } | null> {
  const L = POSITION_LAYOUTS[label];
  if (!L || !RPC()) return null;
  type Accounts = { account?: { data?: [string, string] | string } }[];
  const res = await rpc<Accounts>("getProgramAccounts", [L.program, {
    encoding: "base64",
    // Only the liquidity field comes back, so the response stays small however many positions exist.
    dataSlice: { offset: L.liqOffset, length: 16 },
    filters: [{ dataSize: L.size }, { memcmp: { offset: L.poolOffset, bytes: pool } }],
  }]).catch(() => null);
  if (!Array.isArray(res) || !res.length) return null;

  let total = 0n, top = 0n, counted = 0;
  for (const row of res) {
    const raw = row?.account?.data;
    const b64 = Array.isArray(raw) ? raw[0] : raw;
    if (typeof b64 !== "string") continue;
    const buf = Buffer.from(b64, "base64");
    if (buf.length < 16) continue;
    const liq = readU128LE(buf);
    total += liq; counted++;
    if (liq > top) top = liq;
  }
  // Positions all at zero liquidity are closed ones; there is nothing to measure and nothing to claim.
  if (!counted || total === 0n) return null;
  return { positions: counted, topShare: Number((top * 10_000n) / total) / 10_000, name: L.name };
}

export async function lpLock(dexId: string | null, pairAddress: string | null, labels: string[] = []): Promise<
  { lockedShare: number; topHolderShare: number; note: string }
  | { withdrawable: string; positions?: number; topPositionShare?: number }
  | { unchecked: string } | null
> {
  if (!pairAddress) return null;
  const dex = (dexId ?? "").toLowerCase();
  const kinds = labels.map((l) => l.toLowerCase());

  // Liquidity on the bonding curve is program-owned: there is no LP token for anyone to pull.
  if (dex.includes("pumpfun") || dex === "pump" || dex.includes("moonshot")) {
    return { lockedShare: 1, topHolderShare: 0, note: "liquidity is held by the launch program, not by an LP holder" };
  }
  /*
   * PumpSwap.
   *
   * "It is on PumpSwap" is NOT the same as "the LP is burned". The canonical pool created by pump.fun's
   * migrate instruction does burn its LP, which locks the liquidity for good — but `withdraw` works
   * identically on every PumpSwap pool, and anyone can create one. So a PumpSwap pool has to be measured
   * like any other, not waved through.
   *
   * Every pool has its own Token-2022 LP mint at the PDA ["pool_lp_mint", pool], so the same burn and
   * concentration arithmetic used for Raydium below applies once that address is derived.
   *
   * Seeds and program id verified against pump-fun/pump-public-docs and the PumpSwap IDL.
   */
  // Concentrated liquidity: no LP token exists, and each position owner can pull their own share.
  const conc = kinds.find((k) => CONCENTRATED.has(k));
  if (conc) {
    const where = dex ? `${dex} ${conc.toUpperCase()}` : conc.toUpperCase();
    const base = `This is a ${where} pool: liquidity is held as individual positions, not as a pooled LP token, so there is nothing to burn or lock.`;
    await sleep(SPACING_MS);
    const spread = await positionSpread(conc, pairAddress);
    if (!spread) {
      return { withdrawable: `${base} Each position's owner can withdraw their share at any time, and how that liquidity is split between positions could not be measured for this pool type.` };
    }
    return {
      withdrawable: `${base} It is spread across ${spread.positions} position${spread.positions === 1 ? "" : "s"}, the largest holding ${(spread.topShare * 100).toFixed(1)}% of the pool's liquidity, and that position's owner can withdraw it at any time.`,
      positions: spread.positions,
      topPositionShare: spread.topShare,
    };
  }

  if (isPumpSwap(dex)) {
    const lp = pumpswapLpMint(pairAddress);
    if (!lp) return { unchecked: "this pool address is not a valid public key" };
    await sleep(SPACING_MS);
    /*
     * The fail-safe that makes this implementation honest: a burned LP mint still EXISTS on chain with a
     * supply of zero. A mint that is absent altogether means the derivation is wrong or this is not a
     * PumpSwap pool — so "missing" must report unchecked and never "all of it was burned", which is what
     * the supply-zero branch below would otherwise conclude. Wrong data must fail towards unknown.
     */
    const acct = await rpc<{ value?: unknown }>("getAccountInfo", [lp, { encoding: "base64" }]);
    if (!acct?.value) return { unchecked: "this pool's LP mint could not be found on chain, so the lock cannot be confirmed" };
    return measureLpMint(lp);
  }

  if (!dex.startsWith("raydium")) {
    // Named precisely, so it is clear what is missing rather than just that something is.
    const what = [dex || "an unrecognised DEX", ...kinds].filter(Boolean).join(" ");
    return { unchecked: `LP lock is not implemented for ${what} pools, so whether the liquidity can be withdrawn is unknown` };
  }

  const pool = await getJson<{ success?: boolean; data?: { type?: string; lpMint?: { address?: string } }[] }>(
    `https://api-v3.raydium.io/pools/info/ids?ids=${pairAddress}`,
  );
  const lpMint = pool?.data?.[0]?.lpMint?.address;
  if (!lpMint) {
    // Raydium's own type field is the second chance at this: a concentrated pool reaching here means
    // DexScreener carried no label for it.
    const kind = (pool?.data?.[0]?.type ?? "").toLowerCase();
    if (kind.includes("concentrat")) {
      return { withdrawable: "This is a Raydium concentrated-liquidity pool: liquidity is held as individual positions, not as a pooled LP token, so there is nothing to burn or lock. Each position's owner can withdraw their share at any time." };
    }
    return { unchecked: `Raydium returned no LP mint for this ${kind || "pool"}, so whether the liquidity can be withdrawn is unknown` };
  }
  return measureLpMint(lpMint);
}

/** How much of an LP mint is burned or locked, and how much one live holder controls. */
async function measureLpMint(lpMint: string): Promise<
  { lockedShare: number; topHolderShare: number; note: string } | { unchecked: string } | null
> {
  {
  await sleep(SPACING_MS);
  const supply = await rpc<{ value?: { uiAmount: number | null } }>("getTokenSupply", [lpMint]);
  const total = supply?.value?.uiAmount ?? 0;
  await sleep(SPACING_MS);
  const largest = await rpc<{ value?: { address: string; uiAmount: number | null }[] }>("getTokenLargestAccounts", [lpMint]);
  const rows = largest?.value ?? [];
  if (!rows.length) return { unchecked: "the LP mint has no holders on record, so how much of it is burned cannot be established" };

  // A burned LP supply shows up as holders summing to less than the mint's recorded supply, or as a
  // balance parked at an incinerator. Both count as burned.
  let lockedUi = 0, liveTop = 0;
  for (const h of rows) {
    const amt = h.uiAmount ?? 0;
    if (BURNERS.has(h.address) || LOCKERS.has(h.address)) lockedUi += amt;
    else liveTop = Math.max(liveTop, amt);
  }
  if (total <= 0) {
    // Supply of zero means every LP token was burned outright.
    return { lockedShare: 1, topHolderShare: 0, note: "LP supply is zero — all of it was burned" };
  }
  const held = rows.reduce((s, h) => s + (h.uiAmount ?? 0), 0);
  const unaccounted = Math.max(0, total - held); // burned before the holder list was taken
  const lockedShare = Math.min(1, (lockedUi + unaccounted) / total);
  return { lockedShare, topHolderShare: Math.min(1, liveTop / total), note: "" };
  }
}

// ─────────────────────────────────────────────────────────────────────────────────────────────────────
// 2. Deployer history
// ─────────────────────────────────────────────────────────────────────────────────────────────────────

/**
 * How much of the supply the deployer's own wallet still holds.
 *
 * One call: the wallet's token accounts for this mint, against the supply. Measured rather than read off
 * an index, so it is a number we can stand behind. Null when it cannot be established, never zero —
 * "we could not tell" and "they hold nothing" are opposite conclusions.
 */
async function deployerHolding(mint: string, owner: string): Promise<number | null> {
  type Accounts = { value?: { account?: { data?: { parsed?: { info?: { tokenAmount?: { uiAmount?: number | null } } } } } }[] };
  const accts = await rpc<Accounts>("getTokenAccountsByOwner", [owner, { mint }, { encoding: "jsonParsed" }]).catch(() => null);
  if (!accts?.value) return null;
  const held = accts.value.reduce((s, a) => s + (a.account?.data?.parsed?.info?.tokenAmount?.uiAmount ?? 0), 0);
  await sleep(SPACING_MS);
  const supplyRes = await rpc<{ value?: { uiAmount: number | null } }>("getTokenSupply", [mint]).catch(() => null);
  const supply = supplyRes?.value?.uiAmount ?? 0;
  if (!supply) return null;
  return Math.min(1, held / supply);
}

/**
 * The creator recorded on the asset, which for launchpad tokens is the deployer.
 *
 * Only a real `creators` entry counts. This used to fall back to the first *authority*, which is the
 * mint authority — a different thing entirely. On USDC that resolved to Circle's authority, found none
 * of its mints indexed by creator, and reported "first mint from this wallet" about the largest
 * stablecoin on Solana. Returning null instead makes the check read "unknown", which is true.
 */
async function creatorOf(mint: string): Promise<string | null> {
  if (!isHelius()) return null;
  type Asset = { creators?: { address?: string; share?: number }[] };
  const a = await rpc<Asset>("getAsset", { id: mint });
  return (a?.creators ?? []).find((x) => x.address)?.address ?? null;
}

/**
 * How many tokens this deployer has launched before, and how many of those now have no liquidity.
 *
 * "No liquidity now" is a proxy for a rug, not proof of one: a token can be abandoned rather than
 * drained, and the two look identical from outside. The wording shown to you says exactly that. It is
 * still the single most predictive thing available at mint time — a wallet with a trail of dead launches
 * behind it is telling you what it does.
 */
export async function deployerHistory(mint: string, hint?: { dev?: string | null; devMints?: number | null }): Promise<
  { deployer: string; priorMints: number; priorDead: number; checked: number; devHoldShare: number | null; attributedMints: number | null; identifiedBy: "creator" | "jupiter" }
  | { unavailable: string }
> {
  if (!isHelius()) return { unavailable: "needs a Helius RPC to read the asset's creator" };
  /*
   * Two ways to learn who deployed this. The creator recorded on the asset is first because it comes
   * from the chain; plenty of mints record none, and Jupiter's `dev` covers those. Which one answered is
   * carried out in `identifiedBy`, since one is a chain fact and the other is an index's opinion.
   */
  const fromCreator = await creatorOf(mint);
  const deployer = fromCreator ?? hint?.dev ?? null;
  if (!deployer) return { unavailable: "no deployer recorded for this mint by either the asset's creators or Jupiter" };
  const identifiedBy: "creator" | "jupiter" = fromCreator ? "creator" : "jupiter";

  // What the deployer still holds, measured here rather than taken from anyone's index. A deployer
  // sitting on a large slice can sell it into your bid whatever their past record looks like.
  await sleep(SPACING_MS);
  const devHoldShare = await deployerHolding(mint, deployer);
  await sleep(SPACING_MS);

  type Page = { items?: { id?: string }[]; total?: number };
  const page = await rpc<Page>("getAssetsByCreator", {
    creatorAddress: deployer, onlyVerified: false, page: 1, limit: 1000,
    displayOptions: { showFungible: true },
  });
  /*
   * A wallet that is not creator-indexed returns nothing here, which is not the same as having launched
   * nothing. When that happens the count Jupiter attributes to the wallet is reported instead, clearly
   * labelled, because it is a count with no outcomes attached — it cannot say whether those mints still
   * trade, and that is the part that matters.
   */
  if (!page) {
    return { deployer, identifiedBy, devHoldShare, attributedMints: hint?.devMints ?? null,
      priorMints: 0, priorDead: 0, checked: 0 };
  }
  const others = (page.items ?? []).map((i) => i.id).filter((id): id is string => !!id && id !== mint);
  if (!others.length) return { deployer, identifiedBy, devHoldShare, attributedMints: hint?.devMints ?? null, priorMints: 0, priorDead: 0, checked: 0 };

  // DexScreener takes 30 addresses at a time; one request settles them all.
  const sample = others.slice(0, MAX_PRIOR_MINTS);
  await sleep(SPACING_MS);
  type Pairs = { pairs?: { baseToken?: { address?: string }; liquidity?: { usd?: number } }[] | null };
  const r = await getJson<Pairs>(`https://api.dexscreener.com/latest/dex/tokens/${sample.join(",")}`);
  if (!r) return { deployer, identifiedBy, devHoldShare, attributedMints: hint?.devMints ?? null, priorMints: others.length, priorDead: 0, checked: 0 };
  const liqBy = new Map<string, number>();
  for (const p of r.pairs ?? []) {
    const a = p.baseToken?.address; if (!a) continue;
    liqBy.set(a, (liqBy.get(a) ?? 0) + (p.liquidity?.usd ?? 0));
  }
  // A mint with no pair at all was never traded; only count ones that had a market and now have none.
  const traded = sample.filter((m) => liqBy.has(m));
  const dead = traded.filter((m) => (liqBy.get(m) ?? 0) < 1_000).length;
  return { deployer, identifiedBy, devHoldShare, attributedMints: hint?.devMints ?? null, priorMints: others.length, priorDead: dead, checked: traded.length };
}

// ─────────────────────────────────────────────────────────────────────────────────────────────────────
// 3. The opening slots
// ─────────────────────────────────────────────────────────────────────────────────────────────────────

/**
 * Share of supply that moved into wallets within the first `OPENING_SLOTS` slots of the mint's first
 * activity, and how many distinct wallets took it.
 *
 * This measures *timing*, not collusion. Wallets that all buy in the first half-minute may be one
 * operator with many keys, or may be unrelated bots racing each other; proving which would mean tracing
 * how each was funded, which the free plan cannot afford. Either way the position is the same for you:
 * that supply sits above you in the queue to sell. The wording reflects that and claims nothing more.
 *
 * Returns null when the signature walk cannot reach the beginning within its cap, which happens on
 * older, busier tokens — reported as unknown rather than computed from a partial history.
 */
export async function openingBlocks(mint: string, poolAddresses: string[]): Promise<
  { share: number; wallets: number; slots: number } | { unavailable: string }
> {
  if (!RPC()) return { unavailable: "no RPC configured" };
  type Sig = { signature: string; slot: number };
  const all: Sig[] = [];
  let before: string | undefined;
  for (let page = 0; page < MAX_SIG_PAGES; page++) {
    const batch = await rpc<Sig[]>("getSignaturesForAddress", [mint, { limit: 1000, ...(before ? { before } : {}) }]);
    if (!batch?.length) break;
    all.push(...batch);
    before = batch[batch.length - 1].signature;
    if (batch.length < 1000) { before = undefined; break; }
    await sleep(SPACING_MS);
  }
  // `before` still set means there was more history than the cap allowed: we never saw the launch.
  if (!all.length) return { unavailable: "no transactions found for this mint" };
  if (before) return { unavailable: `more than ${MAX_SIG_PAGES * 1000} transactions, so the launch is out of reach — expected on an established token` };

  const firstSlot = Math.min(...all.map((s) => s.slot));
  const opening = all.filter((s) => s.slot <= firstSlot + OPENING_SLOTS).map((s) => s.signature);
  if (!opening.length) return { unavailable: "no transactions in the opening slots" };

  const supplyRes = await rpc<{ value?: { uiAmount: number | null } }>("getTokenSupply", [mint]);
  const supply = supplyRes?.value?.uiAmount ?? 0;
  if (!supply) return { unavailable: "token supply could not be read" };

  const pools = new Set(poolAddresses);
  const takenBy = new Map<string, number>();
  // Parsed transactions in batches, oldest first. Capped: the opening burst of a launch is small.
  for (const chunk of chunks(opening.slice(0, 200), 100)) {
    await sleep(SPACING_MS);
    type Tx = { tokenTransfers?: { mint?: string; toUserAccount?: string; fromUserAccount?: string; tokenAmount?: number }[] };
    const txs = await heliusTransactions(chunk);
    if (!txs) return { unavailable: "parsed transactions unavailable — needs a Helius key" };
    for (const tx of txs as Tx[]) {
      for (const tr of tx.tokenTransfers ?? []) {
        if (tr.mint !== mint) continue;
        const to = tr.toUserAccount;
        const amt = tr.tokenAmount ?? 0;
        if (!to || amt <= 0 || pools.has(to) || BURNERS.has(to)) continue;
        takenBy.set(to, (takenBy.get(to) ?? 0) + amt);
      }
    }
  }
  if (!takenBy.size) return { share: 0, wallets: 0, slots: OPENING_SLOTS };
  const taken = [...takenBy.values()].reduce((s, x) => s + x, 0);
  return { share: Math.min(1, taken / supply), wallets: takenBy.size, slots: OPENING_SLOTS };
}

/** Helius enhanced transactions: parsed token transfers without decoding instructions ourselves. */
async function heliusTransactions(signatures: string[]): Promise<unknown[] | null> {
  const key = HELIUS_KEY();
  if (!key) return null;
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 20_000);
  try {
    const r = await fetch(`https://api.helius.xyz/v0/transactions?api-key=${key}`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transactions: signatures }), signal: ctl.signal, cache: "no-store",
    });
    if (!r.ok) return null;
    const j = await r.json();
    return Array.isArray(j) ? j : null;
  } finally { clearTimeout(t); }
}

const chunks = <T>(xs: T[], n: number): T[][] =>
  Array.from({ length: Math.ceil(xs.length / n) }, (_, i) => xs.slice(i * n, i * n + n));
