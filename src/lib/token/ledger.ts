import "server-only";
import type { PrismaClient } from "@prisma/client";
import { gradeScreen } from "./score";
import { runChecks } from "./checks";
import { readPairs, simulateSell, snapshot } from "./sources";
import type { CheckResult, TokenSnapshot } from "./types";

/**
 * Screen a token and record it. Append-only: a re-screen is a new row, so what was known at the time
 * is never rewritten by what is known now — the same rule the signal ledger follows.
 */
export async function screenToken(db: PrismaClient, mint: string) {
  const { snap, errors } = await snapshot(mint);
  const checks = runChecks(snap);
  const g = gradeScreen(checks);
  const row = await db.tokenScreen.create({
    data: {
      chain: snap.chain, mint, symbol: snap.symbol, name: snap.name,
      grade: g.grade, safety: g.safety,
      checks: checks as unknown as object, snapshot: snap as unknown as object,
      errors: errors as unknown as object,
      liquidityUsd: snap.liquidityUsd, fdvUsd: snap.fdvUsd,
    },
  });
  return { row, checks, grade: g, errors };
}

/** Horizon at which a screen is judged. Long enough for a rug to happen, short enough to learn from. */
export const SETTLE_HOURS = Number(process.env.SCREEN_SETTLE_HOURS) || 24;

/**
 * Settle screens past the horizon: is there still liquidity, and does a sale still quote?
 * This is the ground truth the survival model is fitted on, and the reason the screener can ever claim
 * to be worth anything. Without it the scores are just opinions with numbers attached.
 */
export async function settleScreens(db: PrismaClient, now = new Date()) {
  const due = await db.tokenScreen.findMany({
    where: { settledAt: null, screenedAt: { lte: new Date(now.getTime() - SETTLE_HOURS * 3600_000) } },
    orderBy: { screenedAt: "asc" }, take: 40,
  });
  let settled = 0, survived = 0;
  for (const s of due) {
    try {
      const pairs = await readPairs(s.mint).catch(() => null);
      const liq = pairs?.liquidityUsd ?? 0;
      const sell = await simulateSell(s.mint, null).catch(() => ({ sellQuote: null, sellPriceImpact: null }));
      const canSell = !!sell.sellQuote && sell.sellQuote.outUsd > sell.sellQuote.inUsd * 0.5;
      const alive = liq >= 1_000 && canSell;
      const kind = alive ? null : liq < 1_000 ? "rug" : !canSell ? "honeypot" : "drained";
      await db.tokenScreen.update({ where: { id: s.id }, data: { settledAt: new Date(), survived: alive, liqAtSettle: liq, failureKind: kind } });
      settled++; if (alive) survived++;
    } catch { /* leave unsettled; the next run tries again */ }
    await new Promise((r) => setTimeout(r, 250));
  }
  return { settled, survived };
}

/**
 * What the ledger says about each grade so far. This is the only honest answer to "does the screener
 * work": the realised survival rate per grade, from settled screens, with the counts shown so a thin
 * sample is visible as one.
 */
export async function screenRecord(db: PrismaClient) {
  const rows = await db.tokenScreen.findMany({ where: { settledAt: { not: null } }, select: { grade: true, survived: true, failureKind: true } });
  const byGrade = new Map<string, { n: number; survived: number }>();
  for (const r of rows) {
    const e = byGrade.get(r.grade) ?? { n: 0, survived: 0 };
    e.n++; if (r.survived) e.survived++;
    byGrade.set(r.grade, e);
  }
  const failures = new Map<string, number>();
  for (const r of rows) if (r.failureKind) failures.set(r.failureKind, (failures.get(r.failureKind) ?? 0) + 1);
  return {
    n: rows.length,
    byGrade: [...byGrade.entries()].map(([grade, e]) => ({ grade, n: e.n, survivalRate: e.n ? e.survived / e.n : 0 })),
    failures: [...failures.entries()].map(([kind, n]) => ({ kind, n })).sort((a, b) => b.n - a.n),
  };
}

export const parseChecks = (v: unknown): CheckResult[] => (Array.isArray(v) ? (v as CheckResult[]) : []);
export const parseSnapshot = (v: unknown): TokenSnapshot | null => (v && typeof v === "object" ? (v as TokenSnapshot) : null);
