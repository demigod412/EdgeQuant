import type { Market, Venue } from "@prisma/client";

/** Instruments EdgeQuant tracks by default. Fees are round-trip in basis points, deliberately pessimistic. */
export interface InstrumentSeed { market: Market; venue: Venue; symbol: string; display: string; feeBps: number; slipBps: number }

export const CRYPTO: InstrumentSeed[] = [
  { market: "CRYPTO", venue: "BINANCE", symbol: "BTCUSDT", display: "BTC/USDT", feeBps: 10, slipBps: 2 },
  { market: "CRYPTO", venue: "BINANCE", symbol: "ETHUSDT", display: "ETH/USDT", feeBps: 10, slipBps: 3 },
  { market: "CRYPTO", venue: "BINANCE", symbol: "SOLUSDT", display: "SOL/USDT", feeBps: 10, slipBps: 4 },
  { market: "CRYPTO", venue: "BINANCE", symbol: "BNBUSDT", display: "BNB/USDT", feeBps: 10, slipBps: 4 },
  { market: "CRYPTO", venue: "BINANCE", symbol: "XRPUSDT", display: "XRP/USDT", feeBps: 10, slipBps: 5 },
];
export const FX: InstrumentSeed[] = [
  { market: "FX", venue: "TWELVE_DATA", symbol: "EUR/USD", display: "EUR/USD", feeBps: 2, slipBps: 1 },
  { market: "FX", venue: "TWELVE_DATA", symbol: "GBP/USD", display: "GBP/USD", feeBps: 3, slipBps: 1 },
  { market: "FX", venue: "TWELVE_DATA", symbol: "USD/JPY", display: "USD/JPY", feeBps: 2, slipBps: 1 },
  { market: "FX", venue: "TWELVE_DATA", symbol: "AUD/USD", display: "AUD/USD", feeBps: 3, slipBps: 1 },
  { market: "FX", venue: "TWELVE_DATA", symbol: "USD/CAD", display: "USD/CAD", feeBps: 3, slipBps: 1 },
];
export const ALL_SEEDS = [...CRYPTO, ...FX];
export const TIMEFRAMES = ["15m", "1h", "4h", "1d"] as const;
export type Timeframe = (typeof TIMEFRAMES)[number];
export const TF_MS: Record<Timeframe, number> = { "15m": 900_000, "1h": 3_600_000, "4h": 14_400_000, "1d": 86_400_000 };

/**
 * The longest a call may stay open, in hours.
 *
 * The day-trading and scalping constraint, enforced rather than intended: a setup's time barrier is
 * `horizonBars` bars of its own timeframe, so the 4h setups shipped at 12-18 bars were holding for two
 * to three days and the daily one for six. A test asserts every seeded setup fits inside this.
 */
export const MAX_HOLD_HOURS = 6;
export const holdHours = (timeframe: Timeframe, horizonBars: number) => (TF_MS[timeframe] * horizonBars) / 3_600_000;
