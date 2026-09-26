/**
 * The sell-simulation probe: which currency to round-trip through, and how much of it.
 *
 * Kept out of `sources.ts` because that module is server-only, and this is a pure decision worth
 * testing on its own — it is the part that was wrong.
 */

export const USDC = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
export const WSOL = "So11111111111111111111111111111111111111112";

/**
 * Reference position size, in dollars, for a screen you asked for.
 *
 * Set this to what you actually trade: price impact scales with size, so a $50 probe answers a question
 * about somebody else's trade. Every screen records the size it used, because "round-trips at 2% cost"
 * means nothing without it.
 */
export const SELL_PROBE_USD = Number(process.env.SELL_PROBE_USD) || 50;

/**
 * The size used for automatic screens, held fixed on purpose.
 *
 * The survival record is only readable if its measurements are comparable, and a probe that follows
 * whatever SELL_PROBE_USD happens to be would make the sell-simulation figures mean different things in
 * different rows. Worse, a large probe against the small pools discovery finds measures the probe rather
 * than the token: $500 into a $5,000 pool is a tenth of the pool, and it would fail the impact threshold
 * on almost anything — filling the record with rejections that are arithmetic, not findings.
 */
export const AUTO_PROBE_USD = Number(process.env.TOKEN_AUTO_PROBE_USD) || 50;

/**
 * Only the RATIO of the two quotes is used, so the currency and its units cancel — which is what lets
 * the probe switch to wrapped SOL when the token being screened IS the usual USDC quote. Without that
 * switch, screening USDC asked Jupiter for USDC → USDC and was refused outright:
 * "Input and output mints are not allowed to be equal", which reached the report as a bare HTTP 400.
 */
export function sellProbe(mint: string, usd = SELL_PROBE_USD): { via: string; amount: number; usd: number } {
  return mint === USDC
    // Wrapped SOL has 9 decimals. The amount is nominal here: only the ratio of the two quotes is used,
    // so this path reports the dollar figure it was asked for rather than a converted SOL amount.
    ? { via: WSOL, amount: Math.round(0.25 * 1e9), usd }
    : { via: USDC, amount: Math.round(usd * 1e6), usd }; // USDC has 6
}
