/**
 * Screen tokens from the command line, and settle the ones past their horizon:
 *   npm run screen -- <mint> [<mint> …]     screen one or more mints
 *   npm run screen -- --settle              judge screens past the horizon
 */
import { PrismaClient } from "@prisma/client";
import { screenToken, settleScreens, screenRecord } from "../src/lib/token/ledger";

const db = new PrismaClient();
(async () => {
  const args = process.argv.slice(2);
  if (args.includes("--settle") || !args.length) {
    const r = await settleScreens(db);
    const rec = await screenRecord(db);
    console.log(JSON.stringify({ at: new Date().toISOString(), settled: r.settled, survived: r.survived, record: rec }, null, 1));
    return;
  }
  for (const mint of args.filter((a) => !a.startsWith("--"))) {
    const { grade, checks, errors } = await screenToken(db, mint);
    console.log(`\n${mint}\n${grade.grade.toUpperCase()} · ${grade.safety}/100 — ${grade.headline}`);
    for (const c of checks) console.log(`  ${{ pass: "PASS", warn: "WARN", fail: "FAIL", unknown: "????" }[c.verdict]}  ${c.label}: ${c.detail}`);
    if (errors.length) console.log(`  sources unavailable: ${errors.join("; ")}`);
  }
})().catch((e) => { console.error(e); process.exitCode = 1; }).finally(() => db.$disconnect());
