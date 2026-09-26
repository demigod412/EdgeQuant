import "server-only";
import type { PrismaClient } from "@prisma/client";
import { gradeScreen } from "./score";
import { runChecks } from "./checks";
import { readPairs, simulateSell, snapshot } from "./sources";
import type { CheckResult, TokenSnapshot } from "./types";
import { CHECKPOINT_HOURS, SETTLE_HOURS, parseCheckpoints, type Checkpoint } from "./horizons";

/**
 * Screen a token and record it. Append-only: a re-screen is a new row, so what was known at the time
 * is never rewritten by what is known now — the same rule the signal ledger follows.
 */
export async function screenToken(db: PrismaClient, mint: string, opts: { source?: "manual" | "auto"; probeUsd?: number } = {}) {
  const { snap, errors } = await snapshot(mint, { probeUsd: opts.probeUsd });
  const checks = runChecks(snap);
  const g = gradeScreen(checks);
  const row = await db.tokenScreen.create({
    data: {
      chain: snap.chain, mint, symbol: snap.symbol, name: snap.name, source: opts.source ?? "manual",
      grade: g.grade, safety: g.safety,
      checks: checks as unknown as object, snapshot: snap as unknown as object,
      errors: errors as unknown as object,
      liquidityUsd: snap.liquidityUsd, fdvUsd: snap.fdvUsd,
    },
  });
  return { row, checks, grade: g, errors };
}

export { SETTLE_HOURS, CHECKPOINT_HOURS, parseCheckpoints, type Checkpoint } from "./horizons";

/** Is the token still tradeable right now: liquidity present, and a sale that quotes at a real price. */
async function stillTradeable(mint: string) {
  const pairs = await readPairs(mint).catch(() => null);
  const liquidityUsd = pairs?.liquidityUsd ?? 0;
  const sell = await simulateSell(mint, null).catch(() => ({ sellQuote: null, sellPriceImpact: null }));
  const canSell = !!sell.sellQuote && sell.sellQuote.probeOut > sell.sellQuote.probeIn * 0.5;
  const survived = liquidityUsd >= 1_000 && canSell;
  return { survived, liquidityUsd, failureKind: survived ? null : liquidityUsd < 1_000 ? "rug" : !canSell ? "honeypot" : "drained" };
}

/**
 * Settle screens past the horizon: is there still liquidity, and does a sale still quote?
 * This is the ground truth the survival model is fitted on, and the reason the screener can ever claim
 * to be worth anything. Without it the scores are just opinions with numbers attached.
 */
export async function settleScreens(db: PrismaClient, now = new Date()) {
  let settled = 0, survived = 0, checkpoints = 0;

  // ---- interim checkpoints ---------------------------------------------------------------------
  // Anything past a checkpoint hour that has not recorded it yet, final settle or not.
  for (const hours of CHECKPOINT_HOURS) {
    const dueAt = new Date(now.getTime() - hours * 3600_000);
    const rows = await db.tokenScreen.findMany({
      where: { screenedAt: { lte: dueAt } }, orderBy: { screenedAt: "desc" }, take: 40,
      select: { id: true, mint: true, checkpoints: true },
    });
    for (const s of rows) {
      const have = parseCheckpoints(s.checkpoints);
      if (have.some((c) => c.hours === hours)) continue;
      try {
        const r = await stillTradeable(s.mint);
        const next: Checkpoint[] = [...have, { hours, at: new Date().toISOString(), ...r }].sort((a, b) => a.hours - b.hours);
        await db.tokenScreen.update({ where: { id: s.id }, data: { checkpoints: next as unknown as object } });
        checkpoints++;
      } catch { /* try again next run */ }
      await new Promise((r) => setTimeout(r, 250));
    }
  }

  // ---- the final horizon ------------------------------------------------------------------------
  const due = await db.tokenScreen.findMany({
    where: { settledAt: null, screenedAt: { lte: new Date(now.getTime() - SETTLE_HOURS * 3600_000) } },
    orderBy: { screenedAt: "asc" }, take: 40,
  });
  for (const s of due) {
    try {
      const r = await stillTradeable(s.mint);
      await db.tokenScreen.update({ where: { id: s.id },
        data: { settledAt: new Date(), survived: r.survived, liqAtSettle: r.liquidityUsd, failureKind: r.failureKind } });
      settled++; if (r.survived) survived++;
    } catch { /* leave unsettled; the next run tries again */ }
    await new Promise((r) => setTimeout(r, 250));
  }
  return { settled, survived, checkpoints };
}

/**
 * What the ledger says about each grade so far. This is the only honest answer to "does the screener
 * work": the realised survival rate per grade, from settled screens, with the counts shown so a thin
 * sample is visible as one.
 */
export async function screenRecord(db: PrismaClient) {
  /*
   * ── One observation per token ───────────────────────────────────────────────────────────────────
   *
   * A token is re-screened every few hours while it is being watched, so the same mint contributes many
   * rows. Counting those rows as independent outcomes would overstate the evidence badly: forty tokens
   * screened five times each is forty observations dressed up as two hundred, and every survival rate
   * computed from them would look far better supported than it is. It is the same error as testing a
   * model on correlated samples.
   *
   * So every rate here is computed from the EARLIEST settled screen of each mint — the one that was made
   * before the outcome was known, which is the only one that was ever a prediction. The raw row count is
   * reported separately as `screens`, because it is still worth seeing how much work has been done.
   */
  const rows = await db.tokenScreen.findMany({
    where: { settledAt: { not: null } },
    orderBy: { screenedAt: "asc" },
    select: { mint: true, grade: true, survived: true, failureKind: true },
  });
  const firstPerMint = new Map<string, (typeof rows)[number]>();
  for (const r of rows) if (!firstPerMint.has(r.mint)) firstPerMint.set(r.mint, r);
  const settled = [...firstPerMint.values()];

  // Checkpoint survival is counted from every token that has reached the hour, settled or not: waiting a
  // full day to learn what was true at six hours would throw away the only timely signal there is.
  // Deduplicated the same way, and for the same reason.
  const early = await db.tokenScreen.findMany({
    where: { NOT: { checkpoints: { equals: [] } } },
    orderBy: { screenedAt: "asc" },
    select: { mint: true, checkpoints: true },
  });
  const byHour = new Map<number, { n: number; survived: number }>();
  const seenHour = new Set<string>();
  for (const r of early) {
    for (const c of parseCheckpoints(r.checkpoints)) {
      const key = `${r.mint}@${c.hours}`;
      if (seenHour.has(key)) continue;
      seenHour.add(key);
      const e = byHour.get(c.hours) ?? { n: 0, survived: 0 };
      e.n++; if (c.survived) e.survived++;
      byHour.set(c.hours, e);
    }
  }

  const byGrade = new Map<string, { n: number; survived: number }>();
  for (const r of settled) {
    const e = byGrade.get(r.grade) ?? { n: 0, survived: 0 };
    e.n++; if (r.survived) e.survived++;
    byGrade.set(r.grade, e);
  }
  const failures = new Map<string, number>();
  for (const r of settled) if (r.failureKind) failures.set(r.failureKind, (failures.get(r.failureKind) ?? 0) + 1);
  return {
    checkpoints: [...byHour.entries()].sort((a, b) => a[0] - b[0])
      .map(([hours, e]) => ({ hours, n: e.n, survivalRate: e.n ? e.survived / e.n : 0 })),
    /** Distinct tokens with a settled outcome. This is what the survival threshold counts. */
    n: settled.length,
    /** Settled rows, repeats included. Work done, not evidence gathered. */
    screens: rows.length,
    byGrade: [...byGrade.entries()].map(([grade, e]) => ({ grade, n: e.n, survivalRate: e.n ? e.survived / e.n : 0 })),
    failures: [...failures.entries()].map(([kind, n]) => ({ kind, n })).sort((a, b) => b.n - a.n),
  };
}

export const parseChecks = (v: unknown): CheckResult[] => (Array.isArray(v) ? (v as CheckResult[]) : []);
export const parseSnapshot = (v: unknown): TokenSnapshot | null => (v && typeof v === "object" ? (v as TokenSnapshot) : null);
