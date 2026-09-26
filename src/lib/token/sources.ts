import "server-only";
import type { TokenSnapshot } from "./types";

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
const JUP = process.env.JUPITER_QUOTE_URL ?? "https://quote-api.jup.ag/v6";
/** Size used for the sell simulation, in USD. Small enough to be realistic, big enough to be honest. */
export const SELL_PROBE_USD = Number(process.env.SELL_PROBE_USD) || 50;
const USDC = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

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
    value?: { data?: { parsed?: { info?: { mintAuthority?: string | null; freezeAuthority?: string | null; decimals?: number; supply?: string;
      extensions?: { extension: string; state?: { newerTransferFee?: { transferFeeBasisPoints?: number }; transferFeeConfigAuthority?: string } }[] } } } };
  };
  const r = await rpc<Parsed["value"] extends infer _ ? Parsed : never>("getAccountInfo", [mint, { encoding: "jsonParsed" }]);
  const info = r?.value?.data?.parsed?.info;
  if (!info) return null;
  const exts = info.extensions ?? [];
  const fee = exts.find((e) => e.extension === "transferFeeConfig");
  return {
    mintAuthority: info.mintAuthority ?? null,
    freezeAuthority: info.freezeAuthority ?? null,
    decimals: info.decimals ?? null,
    supply: info.supply ?? null,
    transferFeeBps: fee?.state?.newerTransferFee?.transferFeeBasisPoints ?? (exts.length ? 0 : null),
    hasTransferHook: exts.length ? exts.some((e) => e.extension === "transferHook") : null,
  };
}

/** Largest holders, with the pool and burn addresses set aside so concentration means what it says. */
export async function readHolders(mint: string, poolAddresses: string[]) {
  type Largest = { value?: { address: string; uiAmount: number | null }[] };
  const r = await rpc<Largest>("getTokenLargestAccounts", [mint]);
  const rows = r?.value ?? null;
  if (!rows) return null;
  const supplyRes = await rpc<{ value?: { uiAmount: number | null } }>("getTokenSupply", [mint]);
  const supply = supplyRes?.value?.uiAmount ?? null;
  if (!supply) return null;
  const pools = new Set(poolAddresses);
  const outside = rows.filter((x) => !pools.has(x.address) && !BURN.has(x.address));
  const share = (n: number) => outside.slice(0, n).reduce((s, x) => s + (x.uiAmount ?? 0), 0) / supply;
  return { top10Share: Math.min(1, share(10)), topHolderShare: Math.min(1, share(1)) };
}

/** Pools, liquidity and volume. No key needed. */
export async function readPairs(mint: string) {
  type Pair = { chainId: string; pairAddress: string; baseToken: { address: string; symbol?: string; name?: string };
    liquidity?: { usd?: number }; fdv?: number; volume?: { h24?: number }; txns?: { h24?: { buys?: number; sells?: number } }; pairCreatedAt?: number };
  const r = await get<{ pairs?: Pair[] | null }>(`${DEX}/latest/dex/tokens/${mint}`);
  const pairs = (r.pairs ?? []).filter((p) => p.chainId === "solana");
  if (!pairs.length) return null;
  const deepest = pairs.reduce((a, b) => ((b.liquidity?.usd ?? 0) > (a.liquidity?.usd ?? 0) ? b : a));
  return {
    poolAddresses: pairs.map((p) => p.pairAddress),
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
export async function simulateSell(mint: string, decimals: number | null) {
  type Quote = { outAmount?: string; priceImpactPct?: string | number };
  const inLamports = Math.round(SELL_PROBE_USD * 1e6); // USDC has 6 decimals
  const buy = await get<Quote>(`${JUP}/quote?inputMint=${USDC}&outputMint=${mint}&amount=${inLamports}&slippageBps=300`);
  const tokenOut = Number(buy.outAmount ?? 0);
  if (!tokenOut) return { sellQuote: null, sellPriceImpact: null };
  const sell = await get<Quote>(`${JUP}/quote?inputMint=${mint}&outputMint=${USDC}&amount=${Math.floor(tokenOut)}&slippageBps=300`).catch(() => null);
  if (!sell?.outAmount) {
    // The buy quotes and the sale does not: the defining shape of a honeypot.
    return { sellQuote: { inUsd: SELL_PROBE_USD, outUsd: 0 }, sellPriceImpact: null };
  }
  const impact = Number(sell.priceImpactPct ?? 0);
  void decimals;
  return {
    sellQuote: { inUsd: SELL_PROBE_USD, outUsd: Number(sell.outAmount) / 1e6 },
    sellPriceImpact: Number.isFinite(impact) ? Math.abs(impact) : null,
  };
}

/** Assemble a snapshot, tolerating each source failing on its own. */
export async function snapshot(mint: string): Promise<{ snap: TokenSnapshot; errors: string[] }> {
  const errors: string[] = [];
  const observedAt = new Date();
  const pairs = await readPairs(mint).catch((e) => { errors.push(`pools: ${(e as Error).message}`); return null; });
  const m = await readMint(mint).catch((e) => { errors.push(`mint account: ${(e as Error).message}`); return null; });
  if (!RPC()) errors.push("no SOLANA_RPC_URL set — authorities and holder distribution could not be read");
  const holders = await readHolders(mint, pairs?.poolAddresses ?? []).catch((e) => { errors.push(`holders: ${(e as Error).message}`); return null; });
  const sell = await simulateSell(mint, m?.decimals ?? null).catch((e) => { errors.push(`sell quote: ${(e as Error).message}`); return { sellQuote: null, sellPriceImpact: null }; });

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
      liquidityUsd: pairs?.liquidityUsd ?? null,
      // LP lock and the opening-block cluster need indexed history; left null until that source exists,
      // which the grade reports as "unproven" rather than passing them by default.
      lpLockedShare: null, lpTopHolderShare: null,
      top10Share: holders?.top10Share ?? null, topHolderShare: holders?.topHolderShare ?? null,
      holderCount: null,
      deployer: null, deployerPriorMints: null, deployerPriorRugs: null,
      sniperBundleShare: null, sniperWallets: null,
      sellQuote: sell.sellQuote, sellPriceImpact: sell.sellPriceImpact,
      fdvUsd: pairs?.fdvUsd ?? null, volume24hUsd: pairs?.volume24hUsd ?? null,
      buys24h: pairs?.buys24h ?? null, sells24h: pairs?.sells24h ?? null,
    },
  };
}
