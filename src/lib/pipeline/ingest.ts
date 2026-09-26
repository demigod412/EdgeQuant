import "server-only";
import type { PrismaClient } from "@prisma/client";
import { ALL_SEEDS, TF_MS, type Timeframe } from "../instruments";
import { SETUP_SEEDS } from "../setups";
import type { PriceSource } from "../data/sources";

/** Create the instruments and setups the app ships with (safe to run repeatedly). */
export async function ensureSeeds(db: PrismaClient) {
  for (const s of ALL_SEEDS) {
    await db.instrument.upsert({ where: { venue_symbol: { venue: s.venue, symbol: s.symbol } }, update: { display: s.display }, create: { ...s } });
  }
  for (const s of SETUP_SEEDS) {
    await db.setup.upsert({ where: { key: s.key }, update: { name: s.name, description: s.description }, create: { ...s } });
  }
}

/** Pull closed bars for every enabled instrument and timeframe. Only new bars are written; history is never rewritten. */
export async function ingestCandles(db: PrismaClient, opts: { limit?: number; timeframes?: Timeframe[]; source?: (market: "CRYPTO" | "FX") => Promise<PriceSource | null> } = {}) {
  await ensureSeeds(db);
  const limit = opts.limit ?? 1000, tfs = opts.timeframes ?? (["4h", "1d"] as Timeframe[]);
  const report: Record<string, unknown> = {};
  const instruments = await db.instrument.findMany({ where: { enabled: true } });
  for (const inst of instruments) {
    // Loaded lazily so this module can run with an injected source (tests, scripts) without touching settings.
    const resolve = opts.source ?? (await import("../data/provider")).sourceFor;
    const src = await resolve(inst.market);
    if (!src) { report[inst.display] = "no source (FX needs a Twelve Data key)"; continue; }
    const per: Record<string, number | string> = {};
    for (const tf of tfs) {
      try {
        const bars = await src.candles(inst.symbol, tf, limit);
        if (!bars.length) { per[tf] = "no bars"; continue; }
        const newest = await db.candle.findFirst({ where: { instrumentId: inst.id, timeframe: tf }, orderBy: { openTime: "desc" }, select: { openTime: true } });
        const fresh = bars.filter((b) => !newest || b.openTime > +newest.openTime);
        if (fresh.length) {
          await db.candle.createMany({
            data: fresh.map((b) => ({ instrumentId: inst.id, timeframe: tf, openTime: new Date(b.openTime), open: b.open, high: b.high, low: b.low, close: b.close, volume: b.volume })),
            skipDuplicates: true,
          });
        }
        per[tf] = fresh.length;
      } catch (e) { per[tf] = `error: ${(e as Error).message}`; }
      // Each source sets its own floor when its rate limit is tighter than the default.
      await new Promise((r) => setTimeout(r, Math.max(Number(process.env.SOURCE_DELAY_MS ?? 400), src.minSpacingMs ?? 0)));
    }
    await db.instrument.update({ where: { id: inst.id }, data: { lastSyncAt: new Date() } });
    report[inst.display] = per;
  }
  return report;
}

export const barsOf = async (db: PrismaClient, instrumentId: string, timeframe: string, take = 1500) =>
  (await db.candle.findMany({ where: { instrumentId, timeframe }, orderBy: { openTime: "desc" }, take }))
    .reverse().map((c) => ({ openTime: +c.openTime, open: c.open, high: c.high, low: c.low, close: c.close, volume: c.volume }));

export const tfMs = (tf: string) => TF_MS[tf as Timeframe] ?? 14_400_000;
