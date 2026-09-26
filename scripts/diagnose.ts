/**
 * Why is a page empty?
 *   npm run diagnose
 *
 * Every page in this app is downstream of the one before it: instruments → candles → fitted setups →
 * calls → the record. An empty page is almost never a broken page; it is the first missing link, and
 * this walks the chain in order and names it, with the command that fixes it.
 *
 * It also pings each price source from THIS machine, because a source can be reachable from your laptop
 * and blocked from the server — Binance answers some cloud ranges with HTTP 451, which arrives as an
 * ingest error and would otherwise look like an app fault.
 */
import { PrismaClient } from "@prisma/client";
import { ALL_SEEDS, TIMEFRAMES } from "../src/lib/instruments";
import { binance, bybit, twelveData } from "../src/lib/data/sources";
import { getSecret, getSetting } from "../src/lib/secrets";

const db = new PrismaClient();
const fix: string[] = [];
const line = (label: string, value: string, hint?: string) => {
  console.log(`  ${label.padEnd(22)} ${value}`);
  if (hint) fix.push(hint);
};

(async () => {
  console.log(`EdgeQuant diagnose · ${new Date().toISOString()}\n`);

  // ---- 1. can we even reach the database? ---------------------------------------------------------
  try { await db.$queryRawUnsafe("SELECT 1"); } catch (e) {
    console.error(`database unreachable: ${(e as Error).message}\n\nCheck DATABASE_URL in .env, then: sudo systemctl restart edgequant`);
    process.exit(1);
  }

  // ---- 2. instruments: the root of everything ----------------------------------------------------
  console.log("instruments");
  const instruments = await db.instrument.findMany({ orderBy: [{ market: "asc" }, { display: "asc" }] });
  const crypto = instruments.filter((i) => i.market === "CRYPTO");
  const fx = instruments.filter((i) => i.market === "FX");
  line("crypto", crypto.length ? `${crypto.length}: ${crypto.map((i) => i.display).join(", ")}` : "NONE",
    crypto.length ? undefined : "npm run db:seed        # creates the instruments; nothing can work without them");
  line("fx", fx.length ? `${fx.length}: ${fx.map((i) => i.display).join(", ")}` : "NONE",
    fx.length ? undefined : "npm run db:seed        # the FX pairs are seeded with or without a data key");
  line("expected from seed", `${ALL_SEEDS.length}`);
  line("disabled", `${instruments.filter((i) => !i.enabled).length}`);

  // ---- 3. keys ------------------------------------------------------------------------------------
  console.log("\ndata access");
  const tdKey = await getSecret("TWELVE_DATA_KEY").catch(() => null);
  line("crypto source", (await getSetting<string>("cryptoSource", "binance")) ?? "binance");
  line("twelve data key", tdKey ? "set" : "NOT SET — FX cannot sync",
    tdKey ? undefined : "Settings → Data and instruments → Twelve Data key (free, 800 requests/day)");
  line("helius / solana rpc", process.env.SOLANA_RPC_URL ? (/helius/i.test(process.env.SOLANA_RPC_URL) ? "Helius" : "set (not Helius)") : "NOT SET");

  // ---- 4. are the sources reachable from HERE? ----------------------------------------------------
  console.log("\nsource reachability from this machine");
  for (const src of [binance(), bybit(), ...(tdKey ? [twelveData(tdKey)] : [])]) {
    const r = await src.test().catch((e) => ({ ok: false, message: (e as Error).message }));
    line(src.name, `${r.ok ? "ok" : "FAILED"} — ${r.message}`,
      r.ok ? undefined : /451|403|restricted|geo/i.test(r.message)
        ? `${src.name} is blocking this server's IP. Switch source in Settings, or set ${src.venue}_BASE_URL to a reachable mirror.`
        : undefined);
  }

  // ---- 5. candles, per instrument and timeframe ---------------------------------------------------
  console.log("\nprice history");
  if (!instruments.length) line("candles", "no instruments, so none");
  else {
    const counts = await db.candle.groupBy({ by: ["instrumentId", "timeframe"], _count: true, _max: { openTime: true } });
    let withData = 0;
    for (const inst of instruments) {
      const rows = counts.filter((c) => c.instrumentId === inst.id);
      const total = rows.reduce((s, r) => s + r._count, 0);
      if (total) withData++;
      // Sorting Dates with a bare .sort() compares their toString(), which is not chronological.
      const newest = rows.map((r) => r._max.openTime).filter((d): d is Date => !!d).sort((x, y) => +x - +y).at(-1);
      const per = TIMEFRAMES.map((tf) => { const r = rows.find((x) => x.timeframe === tf); return r ? `${tf}:${r._count}` : null; }).filter(Boolean).join(" ");
      line(inst.display, total ? `${per}${newest ? ` · newest ${new Date(newest).toISOString().slice(0, 16)}Z` : ""}` : "no bars");
    }
    if (!withData) fix.push("npm run ingest         # pulls price history — this is what fills every chart and call");
  }

  // ---- 6. everything downstream ------------------------------------------------------------------
  console.log("\ndownstream");
  const [setups, fitted, open, settled, screens, screensSettled] = await Promise.all([
    db.setup.count(),
    db.modelFit.findMany({ distinct: ["setupId"], select: { setupId: true } }).then((r) => r.length),
    db.signal.count({ where: { state: "OPEN" } }),
    db.signal.count({ where: { state: { in: ["WON", "LOST", "TIMEOUT"] } } }),
    db.tokenScreen.count(),
    db.tokenScreen.count({ where: { settledAt: { not: null } } }),
  ]);
  line("setups", `${setups} defined, ${fitted} fitted`, fitted ? undefined : "npm run selfcheck      # fits the setups once there is history to fit on");
  line("calls", `${open} open, ${settled} settled`);
  line("token screens", `${screens} recorded, ${screensSettled} settled`,
    screens ? undefined : "npm run screen -- <mint>   # the Token screener page lists past screens, so it is empty until you run one");

  console.log(fix.length ? `\nDo these, in order:\n${fix.map((f) => `  ${f}`).join("\n")}` : "\nNothing missing: every stage has data.");
})().catch((e) => { console.error(e); process.exitCode = 1; }).finally(() => db.$disconnect());
