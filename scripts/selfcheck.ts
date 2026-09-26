/**
 * Server self-check: data freshness, ledger invariants, and (with --demo) a full end-to-end run on simulated prices.
 *   cd /var/www/edgequant && npm run selfcheck [-- --demo]
 */
import { PrismaClient } from "@prisma/client";
import { ensureSeeds } from "../src/lib/pipeline/ingest";
import { generateSignals, refitSetup, settleSignals } from "../src/lib/pipeline/signals";
import { brier, mean } from "../src/lib/model/stats";

const db = new PrismaClient();
let fails = 0;
const check = (n: string, ok: boolean, info = "") => { console.log(`${ok ? "PASS" : "FAIL"}  ${n}${info ? ` — ${info}` : ""}`); if (!ok) fails++; };

/** Deterministic price series, used only by --demo so the whole pipeline can be exercised without network access. */
function demoBars(n: number, seed: number, start: number, stepMs: number) {
  let s = seed, price = 100 + (seed % 7), vol = 0.012;
  const rnd = () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; };
  return Array.from({ length: n }, (_, i) => {
    vol = 0.92 * vol + 0.08 * (0.004 + 0.02 * rnd());
    const close = price * (1 + 0.0003 + vol * (rnd() * 2 - 1));
    const bar = { openTime: new Date(start + i * stepMs), open: price, high: Math.max(price, close) * (1 + vol * rnd() * 0.4), low: Math.min(price, close) * (1 - vol * rnd() * 0.4), close, volume: 100 + 80 * rnd() };
    price = close; return bar;
  });
}

(async () => {
  const demo = process.argv.includes("--demo");
  console.log(`EdgeQuant self-check ${new Date().toISOString()}${demo ? " (with demo data)" : ""}\n`);
  await ensureSeeds(db);
  check("database reachable", true, `${await db.instrument.count()} instruments, ${await db.setup.count()} setups`);

  if (demo) {
    const inst = await db.instrument.upsert({ where: { venue_symbol: { venue: "DEMO", symbol: "DEMOUSD" } },
      update: {}, create: { market: "CRYPTO", venue: "DEMO", symbol: "DEMOUSD", display: "DEMO/USD", feeBps: 10, slipBps: 2 } });
    await db.candle.deleteMany({ where: { instrumentId: inst.id } });
    const bars = demoBars(2500, 5, Date.now() - 2500 * 14_400_000, 14_400_000);
    await db.candle.createMany({ data: bars.map((b) => ({ instrumentId: inst.id, timeframe: "4h", ...b })), skipDuplicates: true });
    check("demo candles stored", (await db.candle.count({ where: { instrumentId: inst.id } })) === bars.length);
    const setup = await db.setup.findFirstOrThrow({ where: { key: "trend-pullback-long" } });
    const fit = await refitSetup(db, setup);
    check("model fits on demo history", fit.fitted, `n ${fit.n}${fit.brier ? ` · Brier ${fit.brier.toFixed(3)}` : ""}`);
    const made = await generateSignals(db, { minEdgeR: -99 });   // force at least one call so settlement can be exercised
    check("calls can be generated", made.made + made.skipped > 0, JSON.stringify(made));
    const settled = await settleSignals(db);
    check("settlement runs", true, JSON.stringify(settled));
  }

  const open = await db.signal.count({ where: { state: "OPEN" } });
  const settled = await db.signal.findMany({ where: { state: { in: ["WON", "LOST", "TIMEOUT"] } }, select: { calP: true, state: true, rMultiple: true, barTime: true, settledAt: true, lockedAt: true } });
  check("no call is settled before it was locked", settled.every((s) => !s.settledAt || s.settledAt >= s.lockedAt));
  check("every settled call has an R value", settled.every((s) => s.rMultiple != null), `${settled.length} settled, ${open} open`);
  const dup = await db.$queryRawUnsafe<{ n: bigint }[]>(`SELECT count(*)::bigint AS n FROM (SELECT "instrumentId","setupId","barTime" FROM "Signal" GROUP BY 1,2,3 HAVING count(*) > 1) x`);
  check("one call per instrument, setup and bar", Number(dup[0]?.n ?? 0) === 0);
  const decided = settled.filter((s) => s.state !== "TIMEOUT").map((s) => ({ p: s.calP, y: (s.state === "WON" ? 1 : 0) as 0 | 1 }));
  if (decided.length) {
    const base = mean(decided.map((d) => d.y));
    console.log(`      ${decided.length} decided · Brier ${brier(decided).toFixed(3)} vs no-skill ${brier(decided.map((d) => ({ p: base, y: d.y }))).toFixed(3)} · expectancy ${mean(settled.map((s) => s.rMultiple ?? 0)).toFixed(3)}R`);
  }
  const stale = await db.instrument.findMany({ where: { enabled: true, OR: [{ lastSyncAt: null }, { lastSyncAt: { lt: new Date(Date.now() - 36 * 3600_000) } }] }, select: { display: true } });
  check("price data is fresh (36h)", stale.length === 0, stale.length ? `stale: ${stale.map((s) => s.display).join(", ")}` : "");
  console.log(`\n${fails ? `${fails} check(s) FAILED` : "All checks passed"}`);
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error("FAIL  self-check crashed:", e); process.exit(1); }).finally(() => db.$disconnect());
