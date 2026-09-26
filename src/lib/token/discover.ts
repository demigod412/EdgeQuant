import type { PrismaClient } from "@prisma/client";

/*
 * Finding tokens to screen, so the ledger fills itself.
 *
 * The screener's grades are reasoned judgement until enough screens have settled to fit a survival
 * probability on. At a handful of hand-typed mints a day that threshold is months away, which means the
 * grades would never become evidence of anything. Screening automatically is the only route to a record
 * worth reading.
 *
 * ── On the source ───────────────────────────────────────────────────────────────────────────────────
 * DexScreener has no public new-pairs endpoint. Its documented feeds are latest token PROFILES and paid
 * BOOSTS, both of which select for tokens whose promoters spent money — precisely the wrong sample, and
 * it would bias the survival record towards whatever promoted tokens do.
 *
 * Jupiter's recent-tokens endpoint is ordered by FIRST POOL CREATION, which is the event that matters
 * here: it is the moment a token becomes tradeable and therefore the moment a screen is meaningful. It
 * needs no key and runs on the same host as the sell-simulation quotes.
 *
 * ── On cost ─────────────────────────────────────────────────────────────────────────────────────────
 * A screen is roughly 8–12 RPC calls. At the default 8 per run and a run every 30 minutes that is about
 * 400 screens a day and well inside a free Helius month; the two limits are `TOKEN_DISCOVER_LIMIT` and
 * the cron interval, and raising either raises credit use proportionally.
 */

import { AUTO_PROBE_USD } from "./probe";

export const DISCOVER_URL = process.env.TOKEN_DISCOVER_URL ?? "https://lite-api.jup.ag/tokens/v2/recent";

/** How many to screen per run. The binding constraint is RPC credits, not the feed. */
export const DISCOVER_LIMIT = Number(process.env.TOKEN_DISCOVER_LIMIT) || 8;
/** Below this there is little to screen and a survival answer means little either. */
export const DISCOVER_MIN_LIQUIDITY = Number(process.env.TOKEN_DISCOVER_MIN_LIQUIDITY) || 5_000;
/** Only tokens whose first pool is this new: the screener is about the early window. */
export const DISCOVER_MAX_AGE_HOURS = Number(process.env.TOKEN_DISCOVER_MAX_AGE_HOURS) || 24;
/** Don't screen the same mint again inside this window — a second row this soon says nothing new. */
export const RESCREEN_HOURS = Number(process.env.TOKEN_RESCREEN_HOURS) || 24;

export interface Candidate {
  mint: string;
  symbol: string | null;
  name: string | null;
  liquidityUsd: number | null;
  firstPoolAt: Date | null;
  holderCount: number | null;
}

const num = (v: unknown): number | null => (typeof v === "number" && Number.isFinite(v) ? v : null);
const str = (v: unknown): string | null => (typeof v === "string" && v ? v : null);
const BASE58 = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

/**
 * Read the feed defensively.
 *
 * Only the mint is required; everything else is a filter input that degrades to "unknown" if the shape
 * changes. A feed that quietly renames a field should cost us a filter, not the whole run — and it must
 * never cause a token to be screened that should have been skipped, so a missing liquidity figure is
 * treated as unknown rather than as zero or as passing.
 */
export function parseRecent(json: unknown): Candidate[] {
  const rows = Array.isArray(json) ? json : Array.isArray((json as { tokens?: unknown[] })?.tokens) ? (json as { tokens: unknown[] }).tokens : [];
  const out: Candidate[] = [];
  for (const raw of rows) {
    if (!raw || typeof raw !== "object") continue;
    const r = raw as Record<string, unknown>;
    const mint = str(r.id) ?? str(r.address) ?? str(r.mint);
    if (!mint || !BASE58.test(mint)) continue;
    const pool = r.firstPool as Record<string, unknown> | undefined;
    const createdAt = str(pool?.createdAt) ?? str(r.firstPoolCreatedAt) ?? str(r.createdAt);
    const t = createdAt ? Date.parse(createdAt) : NaN;
    out.push({
      mint,
      symbol: str(r.symbol),
      name: str(r.name),
      liquidityUsd: num(r.liquidity) ?? num((r.stats24h as Record<string, unknown>)?.liquidity),
      firstPoolAt: Number.isFinite(t) ? new Date(t) : null,
      holderCount: num(r.holderCount),
    });
  }
  return out;
}

export type SkipReason = "too illiquid" | "liquidity unknown" | "too old" | "screened recently" | "over the run limit";

/** Which candidates are worth a screen, and why the rest are not. Pure, so the rules can be tested. */
export function selectCandidates(
  candidates: Candidate[],
  opts: { now: Date; recentlyScreened: Set<string>; limit?: number; minLiquidityUsd?: number; maxAgeHours?: number },
): { take: Candidate[]; skipped: Record<string, number> } {
  const limit = opts.limit ?? DISCOVER_LIMIT;
  const minLiq = opts.minLiquidityUsd ?? DISCOVER_MIN_LIQUIDITY;
  const maxAge = opts.maxAgeHours ?? DISCOVER_MAX_AGE_HOURS;
  const skipped: Record<string, number> = {};
  const note = (r: SkipReason) => { skipped[r] = (skipped[r] ?? 0) + 1; };
  const take: Candidate[] = [];
  const seen = new Set<string>();

  // Deepest liquidity first: those are the ones whose survival answer carries information.
  for (const c of [...candidates].sort((a, b) => (b.liquidityUsd ?? 0) - (a.liquidityUsd ?? 0))) {
    if (seen.has(c.mint)) continue;
    seen.add(c.mint);
    if (opts.recentlyScreened.has(c.mint)) { note("screened recently"); continue; }
    if (c.liquidityUsd == null) { note("liquidity unknown"); continue; }
    if (c.liquidityUsd < minLiq) { note("too illiquid"); continue; }
    if (c.firstPoolAt && opts.now.getTime() - c.firstPoolAt.getTime() > maxAge * 3600_000) { note("too old"); continue; }
    if (take.length >= limit) { note("over the run limit"); continue; }
    take.push(c);
  }
  return { take, skipped };
}

/** Fetch the feed. Kept separate from the selection so the rules above need no network to test. */
async function fetchRecent(): Promise<unknown> {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), 20_000);
  try {
    const r = await fetch(DISCOVER_URL, { headers: { Accept: "application/json" }, signal: ctl.signal, cache: "no-store" });
    if (!r.ok) throw new Error(`HTTP ${r.status} from ${new URL(DISCOVER_URL).host}: ${(await r.text()).slice(0, 140)}`);
    return await r.json();
  } finally { clearTimeout(t); }
}

/**
 * Screen whatever the feed offers that passes the filters, recording each as an ordinary screen.
 *
 * Each row is marked `source: "auto"` so the list can keep your own screens separate — a few hundred
 * automatic rows a day would otherwise bury them.
 */
export async function discoverAndScreen(db: PrismaClient, opts: { now?: Date; limit?: number } = {}) {
  const now = opts.now ?? new Date();
  const { screenToken } = await import("./ledger");

  const candidates = parseRecent(await fetchRecent());
  if (!candidates.length) return { seen: 0, screened: 0, skipped: {}, results: [] as { mint: string; grade: string }[] };

  const since = new Date(now.getTime() - RESCREEN_HOURS * 3600_000);
  const already = await db.tokenScreen.findMany({
    where: { mint: { in: candidates.map((c) => c.mint) }, screenedAt: { gte: since } },
    select: { mint: true },
  });
  const { take, skipped } = selectCandidates(candidates, {
    now, recentlyScreened: new Set(already.map((a) => a.mint)), limit: opts.limit,
  });

  const results: { mint: string; grade: string }[] = [];
  for (const c of take) {
    try {
      // A fixed probe, not the configured one: see AUTO_PROBE_USD. The record has to be comparable.
      const { grade } = await screenToken(db, c.mint, { source: "auto", probeUsd: AUTO_PROBE_USD });
      results.push({ mint: c.mint, grade: grade.grade });
    } catch (e) {
      // One bad token must not end the run: the next one is a fresh attempt.
      results.push({ mint: c.mint, grade: `failed: ${(e as Error).message.slice(0, 80)}` });
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  return { seen: candidates.length, screened: results.length, skipped, results };
}
