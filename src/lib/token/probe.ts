/**
 * The sell-simulation probe: which currency to round-trip through, and how much of it.
 *
 * Kept out of `sources.ts` because that module is server-only, and this is a pure decision worth
 * testing on its own — it is the part that was wrong.
 */

export const USDC = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
export const WSOL = "So11111111111111111111111111111111111111112";

/** Reference position size, in dollars, for the round trip. */
export const SELL_PROBE_USD = Number(process.env.SELL_PROBE_USD) || 50;

/**
 * Only the RATIO of the two quotes is used, so the currency and its units cancel — which is what lets
 * the probe switch to wrapped SOL when the token being screened IS the usual USDC quote. Without that
 * switch, screening USDC asked Jupiter for USDC → USDC and was refused outright:
 * "Input and output mints are not allowed to be equal", which reached the report as a bare HTTP 400.
 */
export function sellProbe(mint: string): { via: string; amount: number } {
  return mint === USDC
    ? { via: WSOL, amount: Math.round(0.25 * 1e9) } // wrapped SOL has 9 decimals
    : { via: USDC, amount: Math.round(SELL_PROBE_USD * 1e6) }; // USDC has 6
}
