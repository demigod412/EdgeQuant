/**
 * Turning what someone pasted into a mint address.
 *
 * People paste the page they were looking at, not the address on it, and the two traps are worth
 * catching by name rather than answering every one of them with "that is not a Solana mint address":
 *
 *   - a full URL from pump.fun, Birdeye, Solscan or Jupiter, which usually contains the mint
 *   - an EVM address, because this screener is Solana-only and 0x… will never be valid here
 *
 * One trap cannot be caught here: a DexScreener URL carries the POOL address, which is a perfectly
 * valid base58 pubkey and so passes every format check. That one is caught when the mint account turns
 * out not to be a mint account.
 */

/** Base58 (no 0, O, I or l), 32–44 characters: the shape of every Solana address. */
const BASE58 = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

export type MintInput = { ok: true; mint: string } | { ok: false; message: string };

export function parseMintInput(raw: string): MintInput {
  const text = raw.trim();
  if (!text) return { ok: false, message: "Paste a Solana mint address." };

  if (/^0x[0-9a-fA-F]{40}$/.test(text)) {
    return { ok: false, message: "That is an Ethereum or BSC address. This screener reads Solana mints only." };
  }
  if (/[…]|\.\.\./.test(text)) {
    return { ok: false, message: "That address is abbreviated in the middle. Use the copy button rather than selecting the shortened text." };
  }
  if (BASE58.test(text)) return { ok: true, mint: text };

  // A pasted link: take the last path segment that looks like an address. DexScreener is excluded
  // deliberately — its URL holds the pool, and screening the pool silently would be worse than asking.
  if (/^https?:\/\//i.test(text) || text.includes("/")) {
    if (/dexscreener\.com/i.test(text)) {
      return { ok: false, message: "A DexScreener link carries the pool address, not the token's. Copy the token address from the panel on the right of that page." };
    }
    const hit = text.split(/[/?#&=]/).reverse().find((seg) => BASE58.test(seg));
    if (hit) return { ok: true, mint: hit };
    return { ok: false, message: "No Solana address found in that link. Copy the token address itself." };
  }

  if (/^[1-9A-HJ-NP-Za-km-z]+$/.test(text)) {
    return { ok: false, message: `That is ${text.length} characters; a Solana mint is 32 to 44. It may have been cut short when copied.` };
  }
  return { ok: false, message: "That is not a Solana mint address — base58, 32 to 44 characters, no 0x prefix." };
}
