/**
 * Probe every open holding now, rather than waiting for the next five-minute tick:
 *   npm run watch
 *
 * Cheap by design — pool data and a sell quote, both keyless — so running it by hand costs nothing.
 */
import { PrismaClient } from "@prisma/client";
import { watchHoldings } from "../src/lib/token/holdings";
import { alertsEnabled } from "../src/lib/alerts";

const db = new PrismaClient();
(async () => {
  if (!(await alertsEnabled())) {
    console.log("No Telegram bot token or chat id saved, so nothing can be sent.");
    console.log("Settings → unlock → Telegram alerts. Probes still run and the page still shows them.\n");
  }
  const r = await watchHoldings(db);
  console.log(`${r.watching} holding${r.watching === 1 ? "" : "s"} watched, ${r.chainReads} chain read${r.chainReads === 1 ? "" : "s"}, ${r.alerted} alert${r.alerted === 1 ? "" : "s"} sent`);
  for (const x of r.report) console.log(`  ${x.mint}  ${x.alerts} finding(s)${x.chainRead ? " · chain read" : ""}${x.sent ? " · alerted" : ""}${x.note ? ` · ${x.note}` : ""}`);
  if (!r.watching) console.log("\nAdd one on the Token screener page: mint, size, optional stop.");
})().catch((e) => { console.error(e); process.exitCode = 1; }).finally(() => db.$disconnect());
