/**
 * Screen whatever has just become tradeable, so the survival record fills without typing mints:
 *   npm run discover            one pass
 *   npm run discover -- 20      one pass, up to 20 screens
 *
 * Cron runs this twice an hour via /api/cron/run?job=discover; this script is for running it by hand.
 */
import { PrismaClient } from "@prisma/client";
import { discoverAndScreen, rescreenTracked, DISCOVER_LIMIT, DISCOVER_MIN_LIQUIDITY, DISCOVER_MAX_AGE_HOURS, RESCREEN_HOURS } from "../src/lib/token/discover";
import { screenRecord } from "../src/lib/token/ledger";

const db = new PrismaClient();
(async () => {
  const limit = Number(process.argv[2]) || DISCOVER_LIMIT;
  console.log(`Discovering: up to ${limit} screens, liquidity >= $${DISCOVER_MIN_LIQUIDITY.toLocaleString("en-US")}, first pool within ${DISCOVER_MAX_AGE_HOURS}h\n`);
  const again = await rescreenTracked(db);
  console.log(`re-screening: ${again.watching} tracked, ${again.due} due (every ${RESCREEN_HOURS}h), ${again.rescreened} done`);
  for (const x of again.results) console.log(`  ${x.grade.padEnd(24)} ${x.mint}`);

  const r = await discoverAndScreen(db, { limit });
  console.log(`${r.seen} in the feed, ${r.screened} screened`);
  for (const x of r.results) console.log(`  ${x.grade.padEnd(24)} ${x.mint}`);
  if (Object.keys(r.skipped).length) console.log(`\npassed over: ${Object.entries(r.skipped).map(([k, n]) => `${n} ${k}`).join(", ")}`);
  const rec = await screenRecord(db);
  const total = await db.tokenScreen.count();
  console.log(`\nledger: ${total} screens, ${rec.n} settled${rec.checkpoints.length ? ` · ${rec.checkpoints.map((c) => `${c.hours}h ${(c.survivalRate * 100).toFixed(0)}% of ${c.n}`).join(" · ")}` : ""}`);
})().catch((e) => { console.error(e); process.exitCode = 1; }).finally(() => db.$disconnect());
