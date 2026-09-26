import { PublicKey } from "@solana/web3.js";

/**
 * PumpSwap pool addresses.
 *
 * Kept out of helius.ts because that module is server-only and this is a pure derivation worth pinning
 * with a test: the LP-lock check is the most consequential one in the screener, and it hangs on these
 * exact bytes.
 *
 * Program id and seeds verified against pump-fun/pump-public-docs and the PumpSwap IDL snapshot.
 */
export const PUMPSWAP_PROGRAM = "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA";

/** The pool's own LP mint, at the PDA ["pool_lp_mint", pool]. Null if the pool address is not a key. */
export function pumpswapLpMint(pool: string): string | null {
  try {
    const [pda] = PublicKey.findProgramAddressSync(
      [Buffer.from("pool_lp_mint"), new PublicKey(pool).toBuffer()],
      new PublicKey(PUMPSWAP_PROGRAM),
    );
    return pda.toBase58();
  } catch { return null; }
}

/** DEX ids DexScreener reports for PumpSwap pools. */
export const isPumpSwap = (dexId: string) => {
  const d = dexId.toLowerCase();
  return d.includes("pumpswap") || d === "pumpamm" || d === "pump-amm";
};
