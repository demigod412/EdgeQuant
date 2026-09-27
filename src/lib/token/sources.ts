import "server-only";
import { SELL_PROBE_USD, sellProbe, USDC } from "./probe";
import type { TokenSnapshot } from "./types";
import { deployerHistory, lpLock, openingBlocks } from "./helius";
import { jupiterToken } from "./jupiterToken";

/*
 * Gathering a snapshot. Three independent sources, each optional:
 *
 *   Solana RPC   — mint and freeze authority, Token-2022 extensions, holder distribution. The
 *                  authorities are read straight off the mint account, so they are facts, not opinions.
 *   DexScreener  — pools, liquidity, volume. Public, no key.
 *   Jupiter      — a real quote for selling, which is the only way to tell a honeypot from a token
 *                  that merely looks fine.
 *
 * Anything a source cannot answer stays null, and a null is reported as "unknown" rather than quietly
 * treated as a pass. Screening a token with half the data is worse than useless if the gaps read as
 * clean, so the grade carries them explicitly.
 */

const RPC = () => process.env.SOLANA_RPC_URL ?? "";
const DEX = "https://api.dexscreener.com";
/**
 * Jupiter's v6 host (quote-api.jup.ag) no longer resolves; every sell simulation failed on it with a
 * bare "fetch failed". lite-api is the current keyless tier and returns the same shape.
 */
const JUP = process.env.JUPITER_QUOTE_URL ?? "https://lite-api.jup.ag/swap/v1";
/** Size used for the sell simulation, in USD. Small enough to be realistic, big enough to be honest. */
/** The classic SPL Token program. A mint it owns cannot carry Token-2022 extensions. */
const TOKEN_PROGRAM = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";

const BURN = new Set([
  "1nc1nerator11111111111111111111111111111111",
  "11111111111111111111111111111111",
]);

async function post<T>(url: string, body: unknown, ms = 12_000): Promise<T> {
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), ms);
  try {
    const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), signal: ctl.signal, cache: "no-store" });
    if (!r.ok) throw new Error(`RPC HTTP ${r.status}`);
    return (await r.json()) as T;
  } finally { clearTimeout(t); }
}
async function get<T>(url: string, ms = 12_000): Promise<T> {
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), ms);
  try {
    const r = await fetch(url, { signal: ctl.signal, cache: "no-store" });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return (await r.json()) as T;
  } finally { clearTimeout(t); }
}

type RpcRes<T> = { result?: T; error?: { message: string } };
const rpc = async <T>(method: string, params: unknown[]): Promise<T | null> => {
  if (!RPC()) return null;
  const r = await post<RpcRes<T>>(RPC(), { jsonrpc: "2.0", id: 1, method, params });
  if (r.error) throw new Error(`${method}: ${r.error.message}`);
  return r.result ?? null;
};

/** Mint account: authorities and Token-2022 extensions. These are the facts that matter most. */
export async function readMint(mint: string) {
  type Parsed = {
    value?: { owner?: string; data?: { parsed?: { info?: { mintAuthority?: string | null; freezeAuthority?: string | null; decimals?: number; supply?: string;
      extensions?: { extension: string; state?: { newerTransferFee?: { transferFeeBasisPoints?: number }; transferFeeConfigAuthority?: string } }[] } } } };
  };
  const r = await rpc<Parsed["value"] extends infer _ ? Parsed : never>("getAccountInfo", [mint, { encoding: "jsonParsed" }]);
  const info = r?.value?.data?.parsed?.info;
  if (!info) return null;
  const exts = info.extensions ?? [];
  const fee = exts.find((e) => e.extension === "transferFeeConfig");
  /*
   * Transfer fees and hooks are Token-2022 features and cannot exist on a classic SPL mint. The owning
   * program says which this is, so a classic mint reports 0 and false as facts rather than reporting
   * "extensions not read" and costing itself a check it had already answered.
   */
  const classic = r?.value?.owner === TOKEN_PROGRAM;
  return {
    mintAuthority: info.mintAuthority ?? null,
    freezeAuthority: info.freezeAuthority ?? null,
    decimals: info.decimals ?? null,
    supply: info.supply ?? null,
    transferFeeBps: fee?.state?.newerTransferFee?.transferFeeBasisPoints ?? (classic || exts.length ? 0 : null),
    hasTransferHook: classic ? false : exts.length ? exts.some((e) => e.extension === "transferHook") : null,
  };
}

/**
 * Pool authorities: the accounts that own an AMM's token accounts. Not the pool address itself.
 *
 * Deliberately incomplete, and that is handled below rather than pretended away — there is no closed
 * list of every AMM on Solana, so an unrecognised pool is treated as an unanswerable question instead of
 * as a whale.
 */
const POOL_AUTHORITIES = new Set([
  "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1",  // Raydium AMM v4 authority
  "GpMZbSM2GgvTKHJirzeGfMFoaZ8UR2X7F4v8vHTvxFbL",  // Raydium CPMM authority
  "3uaZBfLJKMwEMFSxhcYtYqfLUzabh7hoWWMmNvvOXbFN",  // Raydium CLMM authority
]);

/**
 * A single holder above this share, on a token that has a live pool, is far more likely to be a pool
 * account we failed to recognise than a wallet. Reported as unknown rather than as a finding.
 */
const AMBIGUOUS_TOP_SHARE = 0.5;

/**
 * Largest holders, with pool and burn accounts set aside so concentration means what it says.
 *
 * ── The bug this replaces ───────────────────────────────────────────────────────────────────────────
 * `getTokenLargestAccounts` returns TOKEN ACCOUNT addresses. The pool list from DexScreener holds PAIR
 * addresses. Those are different kinds of address, so `pools.has(account.address)` could never match and
 * the pool was never actually excluded — it was simply ranked as the biggest holder.
 *
 * On an established token that barely showed: the pool holds a few percent and the numbers looked
 * plausible. On a new token, where the curve or pool holds almost the entire supply, it produced
 * "largest single wallet 100.0%" — a false finding, on a token where nothing was wrong.
 *
 * The fix is to resolve each account's OWNER and exclude by that. One extra call for up to twenty
 * accounts.
 */
export async function readHolders(mint: string, poolAddresses: string[]): Promise<
  { top10Share: number; topHolderShare: number; holdersRanked: number } | { unchecked: string } | null
> {
  type Largest = { value?: { address: string; uiAmount: number | null }[] };
  // Refused on mints with an enormous number of accounts (a major stablecoin, not a new token).
  // The message matters: "unavailable" reads like a broken key, which sends you looking in the wrong place.
  const r = await rpc<Largest>("getTokenLargestAccounts", [mint]).catch((e) => {
    throw new Error(/too many accounts/i.test((e as Error).message)
      ? "too many holder accounts to rank — normal for a major token, not for a new one"
      : (e as Error).message);
  });
  const rows = r?.value ?? null;
  if (!rows?.length) return null;
  const supplyRes = await rpc<{ value?: { uiAmount: number | null } }>("getTokenSupply", [mint]);
  const supply = supplyRes?.value?.uiAmount ?? null;
  if (!supply) return null;

  // Resolve who owns each of those token accounts.
  type Multi = { value?: ({ data?: { parsed?: { info?: { owner?: string } } } } | null)[] };
  const owners = await rpc<Multi>("getMultipleAccounts", [rows.map((x) => x.address), { encoding: "jsonParsed" }]).catch(() => null);
  if (!owners?.value) {
    // Without owners the pool cannot be told from a wallet, and a number that might be the pool is
    // worse than no number: it reads as a finding about the distribution.
    return { unchecked: "holder accounts could not be attributed to owners, so pool balances cannot be told apart from wallets" };
  }
  const ownerOf = rows.map((x, i) => owners.value?.[i]?.data?.parsed?.info?.owner ?? null);

  const pools = new Set(poolAddresses);
  const excluded = (i: number) => {
    const acct = rows[i].address, owner = ownerOf[i];
    if (BURN.has(acct)) return true;
    if (!owner) return false;
    return pools.has(owner) || POOL_AUTHORITIES.has(owner) || BURN.has(owner);
  };
  const outside = rows.filter((_, i) => !excluded(i));
  if (!outside.length) {
    // Every ranked account belongs to a pool or a burn address: nobody is holding it outside the market.
    return { top10Share: 0, topHolderShare: 0, holdersRanked: 0 };
  }
  const share = (n: number) => Math.min(1, outside.slice(0, n).reduce((s, x) => s + (x.uiAmount ?? 0), 0) / supply);
  const top = share(1);
  if (top >= AMBIGUOUS_TOP_SHARE && poolAddresses.length) {
    return { unchecked: `the largest account holds ${(top * 100).toFixed(1)}% and could not be matched to a known pool — on a token with a live market that is more likely an unrecognised pool than a wallet, so it is not reported as concentration` };
  }
  return { top10Share: share(10), topHolderShare: top, holdersRanked: outside.length };
}

/** Pools, liquidity and volume. No key needed. */
export async function readPairs(mint: string) {
  type Pair = { chainId: string; pairAddress: string; dexId?: string; labels?: string[]; baseToken: { address: string; symbol?: string; name?: string };
    liquidity?: { usd?: number }; fdv?: number; volume?: { h24?: number }; txns?: { h24?: { buys?: number; sells?: number } }; pairCreatedAt?: number };
  const r = await get<{ pairs?: Pair[] | null }>(`${DEX}/latest/dex/tokens/${mint}`);
  const pairs = (r.pairs ?? []).filter((p) => p.chainId === "solana");
  if (!pairs.length) return null;
  const deepest = pairs.reduce((a, b) => ((b.liquidity?.usd ?? 0) > (a.liquidity?.usd ?? 0) ? b : a));
  return {
    poolAddresses: pairs.map((p) => p.pairAddress),
    deepestPair: deepest.pairAddress,
    dexId: deepest.dexId ?? null,
    // The pool's architecture: "CLMM", "DLMM", "wp", "DYN2" and so on. It decides whether an LP token
    // exists to be locked at all, which is a different question from whether we can read one.
    dexLabels: deepest.labels ?? [],
    symbol: deepest.baseToken.symbol ?? null,
    name: deepest.baseToken.name ?? null,
    liquidityUsd: pairs.reduce((s, p) => s + (p.liquidity?.usd ?? 0), 0),
    fdvUsd: deepest.fdv ?? null,
    volume24hUsd: pairs.reduce((s, p) => s + (p.volume?.h24 ?? 0), 0),
    buys24h: pairs.reduce((s, p) => s + (p.txns?.h24?.buys ?? 0), 0),
    sells24h: pairs.reduce((s, p) => s + (p.txns?.h24?.sells ?? 0), 0),
    createdAt: deepest.pairCreatedAt ? new Date(deepest.pairCreatedAt) : null,
  };
}

/**
 * Sell simulation: quote USDC → token, then the token amount straight back → USDC. A honeypot happily
 * quotes the buy and cannot quote the sale, which no amount of reading the mint account would reveal.
 */
/** Jupiter states its refusals in the body; an "HTTP 400" on its own sends you looking in the wrong place. */
async function quote(url: string) {
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 12_000);
  try {
    const r = await fetch(url, { signal: ctl.signal, cache: "no-store" });
    const body = await r.text();
    if (!r.ok) {
      let why = body.slice(0, 160);
      try { const j = JSON.parse(body) as { error?: string }; if (j.error) why = j.error; } catch { /* keep the raw body */ }
      throw new Error(`Jupiter ${r.status}: ${why}`);
    }
    return JSON.parse(body) as { outAmount?: string; priceImpactPct?: string | number };
  } finally { clearTimeout(t); }
}

export async function simulateSell(mint: string, decimals: number | null, probeUsd = SELL_PROBE_USD) {
  const { via, amount: probe, usd } = sellProbe(mint, probeUsd);
  const buy = await quote(`${JUP}/quote?inputMint=${via}&outputMint=${mint}&amount=${probe}&slippageBps=300`);
  const tokenOut = Number(buy.outAmount ?? 0);
  if (!tokenOut) return { sellQuote: null, sellPriceImpact: null, sellNote: null, sellProbeUsd: usd };
  let refused: string | null = null;
  const sell = await quote(`${JUP}/quote?inputMint=${mint}&outputMint=${via}&amount=${Math.floor(tokenOut)}&slippageBps=300`)
    .catch((e: Error) => { refused = e.message; return null; });
  if (!sell?.outAmount) {
    // The buy quotes and the sale does not: the defining shape of a honeypot. The verdict stands on its
    // own, but carry the refusal out too, so a routing outage is not read as a trap.
    return { sellQuote: { probeIn: probe, probeOut: 0 }, sellPriceImpact: null, sellNote: refused, sellProbeUsd: usd };
  }
  const impact = Number(sell.priceImpactPct ?? 0);
  void decimals;
  return {
    sellQuote: { probeIn: probe, probeOut: Number(sell.outAmount) },
    sellPriceImpact: Number.isFinite(impact) ? Math.abs(impact) : null,
    sellNote: null,
    sellProbeUsd: usd,
  };
}

/** Assemble a snapshot, tolerating each source failing on its own. */
export async function snapshot(mint: string, opts: { probeUsd?: number } = {}): Promise<{ snap: TokenSnapshot; errors: string[] }> {
  const errors: string[] = [];
  const observedAt = new Date();
  const pairs = await readPairs(mint).catch((e) => { errors.push(`pools: ${(e as Error).message}`); return null; });
  const m = await readMint(mint).catch((e) => { errors.push(`mint account: ${(e as Error).message}`); return null; });
  if (!RPC()) errors.push("no SOLANA_RPC_URL set — authorities and holder distribution could not be read");
  // Every Solana address is base58 and 32–44 characters, so a pool address passes every check the form
  // can make. This is where it stops being plausible: a pool is not a mint account, and screening one
  // by accident — which a copied DexScreener URL invites — would otherwise report a token with no
  // authorities, no supply and no holders as if that were a finding about the token.
  else if (!m) errors.push("this address has no mint account, so it is not a token — a DexScreener URL gives you the pool address, not the token's");
  const holdersRes = await readHolders(mint, pairs?.poolAddresses ?? []).catch((e) => { errors.push(`holders: ${(e as Error).message}`); return null; });
  const holders = holdersRes && !("unchecked" in holdersRes) ? holdersRes : null;
  const holdersWhy = holdersRes && "unchecked" in holdersRes ? holdersRes.unchecked : null;
  if (holdersWhy) errors.push(`holder concentration: ${holdersWhy}`);
  const sell = await simulateSell(mint, m?.decimals ?? null, opts.probeUsd).catch((e) => { errors.push(`sell quote: ${(e as Error).message}`); return { sellQuote: null, sellPriceImpact: null, sellNote: null, sellProbeUsd: opts.probeUsd ?? SELL_PROBE_USD }; });
  if (sell.sellNote) errors.push(`sell side refused: ${sell.sellNote}`);

  // The three that need indexed history. Each failure is recorded and leaves its check unknown.
  const lp = await lpLock(pairs?.dexId ?? null, pairs?.deepestPair ?? null, pairs?.dexLabels ?? [])
    .catch((e) => { errors.push(`LP lock: ${(e as Error).message}`); return null; });
  // One lookup, purely for the deployer's identity where the chain records no creator.
  const jup = await jupiterToken(mint);
  const dep = await deployerHistory(mint, { dev: jup?.dev, devMints: jup?.devMints }).catch((e) => ({ unavailable: (e as Error).message }));
  const open = await openingBlocks(mint, pairs?.poolAddresses ?? []).catch((e) => ({ unavailable: (e as Error).message }));
  const depWhy = dep && "unavailable" in dep ? dep.unavailable : null;
  const openWhy = open && "unavailable" in open ? open.unavailable : null;
  if (depWhy) errors.push(`deployer history: ${depWhy}`);
  if (openWhy) errors.push(`opening slots: ${openWhy}`);
  const depOk = dep && !("unavailable" in dep) ? dep : null;
  const openOk = open && !("unavailable" in open) ? open : null;

  return {
    errors,
    snap: {
      chain: "solana", mint, observedAt,
      symbol: pairs?.symbol ?? null, name: pairs?.name ?? null, createdAt: pairs?.createdAt ?? null,
      mintAuthority: m?.mintAuthority ?? null,
      mintAuthorityRenounced: m ? m.mintAuthority == null : null,
      freezeAuthority: m?.freezeAuthority ?? null,
      freezeAuthorityRenounced: m ? m.freezeAuthority == null : null,
      transferFeeBps: m?.transferFeeBps ?? null,
      hasTransferHook: m?.hasTransferHook ?? null,
      // DexScreener does not index a pool the instant it opens, and reported $0 for tokens Jupiter had
      // already priced at several thousand. Its own figure is preferred when it has one.
      liquidityUsd: pairs?.liquidityUsd || jup?.liquidity || null,
      dexId: pairs?.dexId ?? null,
      // The reason is a sentence when it explains itself and a DEX name when it does not; the old
      // template assumed the latter and produced "not checkable on Raydium did not return an LP mint".
      lpWithdrawable: lp && "withdrawable" in lp ? lp.withdrawable : null,
      lpUnchecked: lp && "unchecked" in lp
        ? (/\s/.test(lp.unchecked) ? `${lp.unchecked[0].toUpperCase()}${lp.unchecked.slice(1)}.` : `LP lock is not checkable on ${lp.unchecked}.`)
        : null,
      lpLockedShare: lp && "lockedShare" in lp ? lp.lockedShare : null,
      lpTopHolderShare: lp && "topHolderShare" in lp ? lp.topHolderShare : null,
      top10Share: holders?.top10Share ?? null,
      concentrationUnchecked: holdersWhy, topHolderShare: holders?.topHolderShare ?? null,
      holderCount: jup?.holderCount ?? null,
      deployer: depOk?.deployer ?? null,
      deployerPriorMints: depOk?.priorMints ?? null,
      deployerPriorRugs: depOk?.priorDead ?? null,
      deployerChecked: depOk?.checked ?? null,
      deployerUnchecked: depWhy,
      deployerHoldShare: depOk?.devHoldShare ?? null,
      deployerAttributedMints: depOk?.attributedMints ?? null,
      deployerIdentifiedBy: depOk?.identifiedBy ?? null,
      launchpad: jup?.launchpad ?? null,
      sniperBundleShare: openOk?.share ?? null,
      sniperWallets: openOk?.wallets ?? null,
      openingSlots: openOk?.slots ?? null,
      openingUnchecked: openWhy,
      sellQuote: sell.sellQuote,
      sellProbeUsd: sell.sellProbeUsd, sellPriceImpact: sell.sellPriceImpact,
      fdvUsd: pairs?.fdvUsd ?? null, volume24hUsd: pairs?.volume24hUsd ?? null,
      buys24h: pairs?.buys24h ?? null, sells24h: pairs?.sells24h ?? null,
    },
  };
}
