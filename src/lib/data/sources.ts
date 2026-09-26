import "server-only";
import type { Bar } from "../model/features";
import { TF_MS, type Timeframe } from "../instruments";

/*
 * Price sources. Only CLOSED bars are returned: a forming bar repaints and would poison both the model and the ledger.
 *   Binance / Bybit — public, no key, generous limits
 *   Twelve Data     — free key (800 requests/day) for FX
 */
export interface PriceSource {
  venue: "BINANCE" | "BYBIT" | "TWELVE_DATA"; name: string;
  /**
   * Minimum gap between requests to this source, when its own rate limit is tighter than the default.
   * Twelve Data's free plan allows 8 requests a minute; at the default spacing the ten requests an FX
   * sync makes would arrive inside five seconds, and most would be answered 429 and then sit through a
   * 31-second retry — slow enough to look like the app had hung.
   */
  minSpacingMs?: number;
  candles(symbol: string, tf: Timeframe, limit: number): Promise<Bar[]>;
  test(): Promise<{ ok: boolean; message: string }>;
}

async function getJson<T>(url: string, headers: Record<string, string> = {}): Promise<T> {
  for (let attempt = 0; attempt < 3; attempt++) {
    const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 20_000);
    try {
      const r = await fetch(url, { headers: { Accept: "application/json", ...headers }, signal: ctl.signal, cache: "no-store" });
      if (r.status === 429 || r.status >= 500) { const ra = Number(r.headers.get("Retry-After")) || 0; await new Promise((x) => setTimeout(x, Math.min(90_000, (ra ? ra + 1 : 31) * 1000))); continue; }
      if (!r.ok) throw new Error(`HTTP ${r.status} from ${new URL(url).host}: ${(await r.text()).slice(0, 140)}`);
      return (await r.json()) as T;
    } finally { clearTimeout(t); }
  }
  throw new Error(`no response from ${new URL(url).host}`);
}
const closedOnly = (bars: Bar[], tf: Timeframe) => bars.filter((b) => b.openTime + TF_MS[tf] <= Date.now());

export function parseBinance(rows: unknown[][], tf: Timeframe): Bar[] {
  return closedOnly(rows.map((r) => ({ openTime: Number(r[0]), open: Number(r[1]), high: Number(r[2]), low: Number(r[3]), close: Number(r[4]), volume: Number(r[5]) }))
    .filter((b) => Number.isFinite(b.close) && b.close > 0), tf);
}
export function parseBybit(rows: string[][], tf: Timeframe): Bar[] {
  return closedOnly(rows.map((r) => ({ openTime: Number(r[0]), open: Number(r[1]), high: Number(r[2]), low: Number(r[3]), close: Number(r[4]), volume: Number(r[5]) }))
    .filter((b) => Number.isFinite(b.close) && b.close > 0).sort((a, b) => a.openTime - b.openTime), tf);
}
export interface TdValue { datetime: string; open: string; high: string; low: string; close: string; volume?: string }
export function parseTwelveData(values: TdValue[], tf: Timeframe): Bar[] {
  return closedOnly(values.map((v) => ({
    openTime: Date.parse(v.datetime.includes(" ") ? `${v.datetime.replace(" ", "T")}Z` : `${v.datetime}T00:00:00Z`),
    open: Number(v.open), high: Number(v.high), low: Number(v.low), close: Number(v.close), volume: Number(v.volume ?? 0),
  })).filter((b) => Number.isFinite(b.close) && Number.isFinite(b.openTime)).sort((a, b) => a.openTime - b.openTime), tf);
}

const BINANCE_TF: Record<Timeframe, string> = { "1h": "1h", "4h": "4h", "1d": "1d" };
const BYBIT_TF: Record<Timeframe, string> = { "1h": "60", "4h": "240", "1d": "D" };
const TD_TF: Record<Timeframe, string> = { "1h": "1h", "4h": "4h", "1d": "1day" };

/*
 * data-api.binance.vision, not api.binance.com, by default.
 *
 * api.binance.com answers a great many cloud IP ranges with HTTP 451 ("restricted location"), and Bybit
 * answers the same addresses with a CloudFront 403 — so a server that could reach neither had no crypto
 * source at all and silently stored no candles, which empties every page downstream of price history.
 * The .vision host is Binance's own market-data-only endpoint: no key, no account, identical klines
 * response, and not under that restriction. Override with BINANCE_BASE_URL if your server can reach the
 * main API and you would rather use it.
 */
export const binance = (base = process.env.BINANCE_BASE_URL ?? "https://data-api.binance.vision"): PriceSource => ({
  venue: "BINANCE", name: "Binance",
  async candles(symbol, tf, limit) { return parseBinance(await getJson<unknown[][]>(`${base}/api/v3/klines?symbol=${symbol}&interval=${BINANCE_TF[tf]}&limit=${Math.min(1000, limit)}`), tf); },
  async test() { try { const b = await this.candles("BTCUSDT", "1h", 5); return { ok: b.length > 0, message: `Binance: ${b.length} bars, last close ${b.at(-1)?.close}` }; } catch (e) { return { ok: false, message: `Binance: ${(e as Error).message}` }; } },
});
export const bybit = (base = process.env.BYBIT_BASE_URL ?? "https://api.bybit.com"): PriceSource => ({
  venue: "BYBIT", name: "Bybit",
  async candles(symbol, tf, limit) {
    const r = await getJson<{ result?: { list?: string[][] } }>(`${base}/v5/market/kline?category=spot&symbol=${symbol}&interval=${BYBIT_TF[tf]}&limit=${Math.min(1000, limit)}`);
    return parseBybit(r.result?.list ?? [], tf);
  },
  async test() { try { const b = await this.candles("BTCUSDT", "1h", 5); return { ok: b.length > 0, message: `Bybit: ${b.length} bars` }; } catch (e) { return { ok: false, message: `Bybit: ${(e as Error).message}` }; } },
});
export const twelveData = (key: string, base = process.env.TWELVE_DATA_BASE_URL ?? "https://api.twelvedata.com"): PriceSource => ({
  venue: "TWELVE_DATA", name: "Twelve Data",
  minSpacingMs: Number(process.env.TWELVE_DATA_SPACING_MS) || 8_000, // free plan: 8 requests/minute
  async candles(symbol, tf, limit) {
    const r = await getJson<{ values?: TdValue[]; status?: string; message?: string }>(`${base}/time_series?symbol=${encodeURIComponent(symbol)}&interval=${TD_TF[tf]}&outputsize=${Math.min(5000, limit)}&format=JSON&apikey=${key}`);
    if (r.status === "error") throw new Error(r.message ?? "Twelve Data error");
    return parseTwelveData(r.values ?? [], tf);
  },
  /*
   * 4h, not 1h: the app ingests 4h and 1d, and testing a timeframe it never uses reported FAILED on a
   * source that was about to pull 996 bars per pair without trouble. An empty answer on a weekend is
   * also not a failure — the FX market is shut — so say that rather than implying the key is bad.
   */
  async test() {
    try {
      const b = await this.candles("EUR/USD", "4h", 5);
      const weekend = [0, 6].includes(new Date().getUTCDay());
      return b.length > 0
        ? { ok: true, message: `Twelve Data: ${b.length} bars, last close ${b.at(-1)?.close}` }
        : { ok: false, message: `Twelve Data: no bars returned${weekend ? " — the FX market is closed this weekend, which is expected" : ""}` };
    } catch (e) { return { ok: false, message: `Twelve Data: ${(e as Error).message}` }; }
  },
});
