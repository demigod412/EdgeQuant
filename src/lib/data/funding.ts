import "server-only";

/*
 * Perpetual funding. Longs pay shorts when it is positive. It is a real, measurable cash flow — the one
 * "edge" here that needs no forecast — but collecting it means holding a delta-neutral position and
 * carrying exchange, custody and liquidation risk. Shown as an APR so it can be compared with anything else.
 */
export interface Funding { symbol: string; rate: number; intervalHours: number; fundedAt: number }

export function fundingApr(rate: number, intervalHours: number) {
  return rate * (24 / intervalHours) * 365;
}

export function parseBinanceFunding(rows: { symbol: string; fundingRate: string; fundingTime: number }[]): Funding[] {
  return rows.map((r) => ({ symbol: r.symbol, rate: Number(r.fundingRate), intervalHours: 8, fundedAt: Number(r.fundingTime) }))
    .filter((f) => Number.isFinite(f.rate) && Number.isFinite(f.fundedAt));
}

/** Binance USDⓈ-M futures funding history: public, no key. */
export async function fetchFunding(symbol: string, limit = 30, base = process.env.BINANCE_FUTURES_URL ?? "https://fapi.binance.com"): Promise<Funding[]> {
  const r = await fetch(`${base}/fapi/v1/fundingRate?symbol=${symbol}&limit=${Math.min(1000, limit)}`, { cache: "no-store", headers: { Accept: "application/json" } });
  if (!r.ok) throw new Error(`funding HTTP ${r.status}`);
  return parseBinanceFunding((await r.json()) as { symbol: string; fundingRate: string; fundingTime: number }[]);
}

/** What a cash-and-carry (short perp, long spot) would have earned lately, before execution costs. */
export function carrySummary(rows: { rate: number; intervalHours: number }[]) {
  if (!rows.length) return { aprNow: 0, apr30: 0, positiveShare: 0, n: 0 };
  const aprs = rows.map((r) => fundingApr(r.rate, r.intervalHours));
  return {
    aprNow: aprs[aprs.length - 1],
    apr30: aprs.reduce((a, b) => a + b, 0) / aprs.length,
    positiveShare: rows.filter((r) => r.rate > 0).length / rows.length,
    n: rows.length,
  };
}
