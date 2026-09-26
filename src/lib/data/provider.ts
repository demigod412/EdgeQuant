import "server-only";
import { getSecret, getSetting } from "../secrets";
import { binance, bybit, twelveData, type PriceSource } from "./sources";
import type { Market } from "@prisma/client";

/** Which source serves each market. Crypto needs no key; FX needs a free Twelve Data key. */
export async function sourceFor(market: Market): Promise<PriceSource | null> {
  if (market === "CRYPTO") {
    const pick = await getSetting<string>("cryptoSource", "binance");
    return pick === "bybit" ? bybit() : binance();
  }
  const key = await getSecret("TWELVE_DATA_KEY");
  return key ? twelveData(key) : null;
}
