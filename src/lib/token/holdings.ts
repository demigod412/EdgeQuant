import "server-only";
import type { PrismaClient } from "@prisma/client";
import { readPairs, simulateSell } from "./sources";
import { screenToken } from "./ledger";
import { shouldSend, watchAlerts, watchMessage, type Baseline, type Observation, type Severity } from "./watchRules";

/*
 * Watching what you actually hold.
 *
 * Two loops, on purpose. The four-hourly re-screen builds the record and costs RPC credits. This one is
 * for the thing that has to be caught in minutes — the pool draining, or the sale ceasing to quote — and
 * it uses only keyless sources, so a five-minute cadence costs nothing but time.
 *
 * Each holding is probed at ITS OWN size, which is the point of recording holdings at all: price impact
 * scales with the position, so one global probe size answered the same question for every token instead
 * of the right question for each.
 */

/** Open a holding and take its baseline. The full screen at your size establishes what "normal" is. */
export async function openHolding(db: PrismaClient, input: { mint: string; sizeUsd: number; stopLossPct?: number | null; note?: string | null }) {
  const existing = await db.tokenHolding.findFirst({ where: { mint: input.mint, closedAt: null } });
  if (existing) return { ok: false as const, message: "You already have an open holding for that mint." };

  // Screened at the position's own size, so the baseline is the exit you would actually face.
  const { grade, row } = await screenToken(db, input.mint, { source: "manual", probeUsd: input.sizeUsd });
  const snap = row.snapshot as unknown as { liquidityUsd?: number | null; topHolderShare?: number | null; sellQuote?: { probeIn: number; probeOut: number } | null };
  const exitCost = snap?.sellQuote ? 1 - snap.sellQuote.probeOut / Math.max(1e-9, snap.sellQuote.probeIn) : null;
  const pairs = await readPairs(input.mint).catch(() => null);

  const holding = await db.tokenHolding.create({
    data: {
      mint: input.mint, symbol: row.symbol, sizeUsd: input.sizeUsd,
      stopLossPct: input.stopLossPct ?? null, note: input.note ?? null,
      baseLiquidityUsd: snap?.liquidityUsd ?? null,
      baseExitCost: exitCost,
      baseTopHolder: snap?.topHolderShare ?? null,
      basePriceUsd: pairs?.priceUsd ?? null,
    },
  });
  return { ok: true as const, holding, grade, message: `Watching ${row.symbol ?? "it"} at $${input.sizeUsd}. ${grade.headline}` };
}

export async function closeHolding(db: PrismaClient, id: string) {
  await db.tokenHolding.updateMany({ where: { id, closedAt: null }, data: { closedAt: new Date() } });
  return { ok: true as const, message: "Closed. It stops being watched; its screens stay in the record." };
}

/**
 * Probe every open holding and alert on what changed.
 *
 * Deliberately cheap: pool data and a sell quote, both keyless. Nothing here reads the chain, so this can
 * run every few minutes for as many holdings as you have without touching the RPC budget.
 */
export async function watchHoldings(db: PrismaClient, opts: { now?: Date } = {}) {
  const now = opts.now ?? new Date();
  const open = await db.tokenHolding.findMany({ where: { closedAt: null }, orderBy: { openedAt: "asc" } });
  const report: { mint: string; alerts: number; sent: boolean; note?: string }[] = [];

  for (const h of open) {
    try {
      const pairs = await readPairs(h.mint).catch(() => null);
      const sell = await simulateSell(h.mint, null, h.sizeUsd).catch(() => null);
      const exitCost = sell?.sellQuote ? 1 - sell.sellQuote.probeOut / Math.max(1e-9, sell.sellQuote.probeIn) : null;

      const obs: Observation = {
        liquidityUsd: pairs?.liquidityUsd ?? null,
        exitCost,
        // A quote of zero out is a blocked sale; a failed request is not, and must not raise the alarm.
        sellQuoted: sell ? !!sell.sellQuote && sell.sellQuote.probeOut > 0 : true,
        topHolderShare: null,     // needs the chain; the four-hourly re-screen carries that one
        priceUsd: pairs?.priceUsd ?? null,
      };
      await db.tokenWatch.create({ data: { mint: h.mint, liquidityUsd: obs.liquidityUsd, exitCost: obs.exitCost, priceUsd: obs.priceUsd, sellQuoted: obs.sellQuoted } });

      const base: Baseline = {
        liquidityUsd: h.baseLiquidityUsd, exitCost: h.baseExitCost,
        topHolderShare: h.baseTopHolder, priceUsd: h.basePriceUsd,
      };
      const alerts = watchAlerts(obs, base, { stopLossPct: h.stopLossPct });
      const worst = alerts[0];
      let sent = false;
      if (worst && shouldSend(worst, { key: h.lastAlertKey, at: h.lastAlertAt, severity: h.lastAlertSeverity as Severity | null }, now)) {
        const { sendAlert } = await import("../alerts");
        const r = await sendAlert(watchMessage({ symbol: h.symbol, mint: h.mint, sizeUsd: h.sizeUsd, alerts }));
        sent = r.ok;
      }
      await db.tokenHolding.update({
        where: { id: h.id },
        data: {
          lastCheckedAt: now, lastLiquidityUsd: obs.liquidityUsd, lastExitCost: obs.exitCost, lastPriceUsd: obs.priceUsd,
          ...(sent && worst ? { lastAlertKey: worst.key, lastAlertSeverity: worst.severity, lastAlertAt: now } : {}),
        },
      });
      report.push({ mint: h.mint, alerts: alerts.length, sent });
    } catch (e) {
      report.push({ mint: h.mint, alerts: 0, sent: false, note: (e as Error).message.slice(0, 80) });
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  return { watching: open.length, checked: report.length, alerted: report.filter((r) => r.sent).length, report };
}
