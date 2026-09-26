/**
 * Put the instruments and setups the app ships with into the database:
 *   npm run db:seed
 *
 * This file was referenced by package.json and by the installer but did not exist, so `npm run db:seed`
 * failed and a fresh install had no instruments in it. That is why every page looked broken at once:
 * with no Instrument rows there is nothing to sync, so no candles, so no setups to fit, so no calls, so
 * nothing on Signals, Portfolio, Backtest or Record — and an empty instrument list in Settings.
 *
 * Instruments are seeded regardless of which data keys are configured. Crypto needs no key; FX needs a
 * free Twelve Data key, but the PAIRS should still be listed and switchable before the key exists,
 * otherwise Settings gives you nothing to point a key at.
 *
 * Safe to run repeatedly: every write is an upsert keyed on venue+symbol, and it never touches candles,
 * signals or anything else the ledger owns.
 */
import { PrismaClient } from "@prisma/client";
import { ensureSeeds } from "../src/lib/pipeline/ingest";

const db = new PrismaClient();

(async () => {
  await ensureSeeds(db);
  const [instruments, setups] = await Promise.all([
    db.instrument.findMany({ orderBy: [{ market: "asc" }, { display: "asc" }], select: { display: true, market: true, venue: true } }),
    db.setup.count(),
  ]);
  const by = (m: string) => instruments.filter((i) => i.market === m).map((i) => i.display).join(", ");
  console.log(`${instruments.length} instruments, ${setups} setups`);
  console.log(`  crypto  ${by("CRYPTO") || "none"}`);
  console.log(`  fx      ${by("FX") || "none"}`);
  console.log("\nNext: npm run ingest    (pulls price history; FX needs a Twelve Data key in Settings)");
})().catch((e) => { console.error(e); process.exitCode = 1; }).finally(() => db.$disconnect());
