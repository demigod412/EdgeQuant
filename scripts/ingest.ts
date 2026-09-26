/**
 * Full cycle as its own process: fetch candles → refit models → make calls → settle what has resolved.
 *   cd /var/www/edgequant && npm run ingest
 */
import { PrismaClient } from "@prisma/client";
import { ingestCandles } from "../src/lib/pipeline/ingest";
import { generateSignals, refitSetup, settleSignals } from "../src/lib/pipeline/signals";
import { rebuildPortfolio, reviewSetups, syncFunding } from "../src/lib/pipeline/portfolio";
import { settleScreens } from "../src/lib/token/ledger";

const db = new PrismaClient();
(async () => {
  const started = Date.now();
  const candles = await ingestCandles(db);
  const fits: Record<string, unknown> = {};
  for (const s of await db.setup.findMany({ where: { enabled: true } })) fits[s.key] = await refitSetup(db, s);
  const review = await reviewSetups(db);                 // switch off anything that stopped beating no-skill
  const signals = await generateSignals(db);
  const settled = await settleSignals(db);
  const funding = await syncFunding(db);
  // Token screens are judged on the same schedule as everything else, rather than only when someone
  // remembers to run `npm run screen -- --settle`.
  const screens = await settleScreens(db).catch((e) => ({ error: (e as Error).message }));
  const portfolio = await rebuildPortfolio(db);
  console.log(JSON.stringify({ at: new Date(started).toISOString(), ok: true, seconds: Math.round((Date.now() - started) / 1000), candles, fits, review, signals, settled, funding, portfolio, screens }));
})().catch((e) => { console.log(JSON.stringify({ ok: false, error: (e as Error).message })); process.exitCode = 1; }).finally(() => db.$disconnect());
