/** Daily Telegram summary: cron runs this once a day. */
import { PrismaClient } from "@prisma/client";
import { sendAlert, summaryMessage } from "../src/lib/alerts";

const db = new PrismaClient();
(async () => {
  const since = new Date(Date.now() - 86_400_000);
  const [open, today, all] = await Promise.all([
    db.signal.count({ where: { state: "OPEN" } }),
    db.signal.findMany({ where: { settledAt: { gte: since }, state: { in: ["WON", "LOST", "TIMEOUT"] } }, select: { rMultiple: true, state: true } }),
    db.signal.findMany({ where: { state: { in: ["WON", "LOST", "TIMEOUT"] } }, select: { rMultiple: true } }),
  ]);
  const rToday = today.reduce((s, x) => s + (x.rMultiple ?? 0), 0);
  const expectancy = all.length ? all.reduce((s, x) => s + (x.rMultiple ?? 0), 0) / all.length : 0;
  const res = await sendAlert(summaryMessage({ open, settled: today.length, wonToday: today.filter((t) => t.state === "WON").length, rToday, expectancy, total: all.length }));
  console.log(JSON.stringify({ ok: res.ok, message: res.message, open, settledToday: today.length }));
})().catch((e) => { console.error(e); process.exitCode = 1; }).finally(() => db.$disconnect());
