/**
 * Jupiter's token record, used for the one thing Helius cannot give us: who deployed the mint.
 *
 * Our own deployer lookup reads the `creators` entry off the asset, and plenty of mints record none —
 * an older SPL token, or one not issued through a launchpad. On those, the deployer check reported
 * "no creator recorded on this mint" and the whole branch went unknown. Jupiter indexes a `dev` field
 * for the same mints, which closes that gap.
 *
 * What is taken from here, and what is not:
 *
 *   - `dev` — the deployer address. An identity, used as a starting point for our own measurements.
 *   - `audit.devMints` — how many mints Jupiter attributes to that wallet. A count, not an outcome:
 *     it says nothing about whether those mints still trade, which is the part that actually matters.
 *   - NOT the mint and freeze authorities, which we read off the mint account ourselves. Those are
 *     facts we can verify, and a second-hand version of a fact we already hold is only a way to be
 *     wrong.
 *   - NOT `organicScore`. It is an unexplained number, and importing someone else's judgement as if it
 *     were a measurement is exactly what the rest of this app exists to avoid.
 *
 * The dev's current holding is measured on chain instead of taken from `devBalancePercentage`, because
 * we can, and because a number we compute is one we can stand behind.
 */

const JUP_TOKENS = process.env.JUPITER_TOKEN_URL ?? "https://lite-api.jup.ag/tokens/v2";

export interface JupiterToken {
  /** The deployer, as Jupiter has it. Null when it has no record of the mint. */
  dev: string | null;
  /** Mints Jupiter attributes to that wallet, this one presumably included. */
  devMints: number | null;
  launchpad: string | null;
  holderCount: number | null;
}

export function parseJupiterToken(json: unknown, mint: string): JupiterToken | null {
  const rows = Array.isArray(json) ? json : Array.isArray((json as { tokens?: unknown[] })?.tokens) ? (json as { tokens: unknown[] }).tokens : [];
  const hit = rows.find((r) => r && typeof r === "object" && (r as { id?: string }).id === mint) as Record<string, unknown> | undefined;
  if (!hit) return null;
  const audit = (hit.audit ?? {}) as Record<string, unknown>;
  const n = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : null);
  const s = (v: unknown) => (typeof v === "string" && v ? v : null);
  return {
    dev: s(hit.dev),
    devMints: n(audit.devMints),
    launchpad: s(hit.launchpad),
    holderCount: n(hit.holderCount),
  };
}

/** Look up one mint. Returns null on any failure: this is an enrichment, never a dependency. */
export async function jupiterToken(mint: string): Promise<JupiterToken | null> {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), 12_000);
  try {
    const r = await fetch(`${JUP_TOKENS}/search?query=${encodeURIComponent(mint)}`, {
      headers: { Accept: "application/json" }, signal: ctl.signal, cache: "no-store",
    });
    if (!r.ok) return null;
    return parseJupiterToken(await r.json(), mint);
  } catch { return null; } finally { clearTimeout(t); }
}
