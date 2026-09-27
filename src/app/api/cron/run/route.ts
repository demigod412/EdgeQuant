import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ingestCandles } from "@/lib/pipeline/ingest";
import { generateSignals, settleSignals } from "@/lib/pipeline/signals";

export const maxDuration = 300;
export const dynamic = "force-dynamic";

/** Light jobs only; the heavy sync runs as its own process (npm run ingest). Protected by CRON_SECRET. */
export async function GET(req: Request) {
  if (!process.env.CRON_SECRET || req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const job = new URL(req.url).searchParams.get("job");
  if (job === "settle") {
    // Token screens settle here too. They used to settle nowhere: settleScreens was reachable only by
    // running `npm run screen -- --settle` by hand, so the 24-hour horizon never arrived on its own and
    // the screener's record — the only evidence it is worth anything — stayed permanently empty.
    const { settleScreens } = await import("@/lib/token/ledger");
    return NextResponse.json({ ok: true, ...(await settleSignals(prisma)), screens: await settleScreens(prisma).catch((e) => ({ error: (e as Error).message })) });
  }
  if (job === "portfolio") {
    const { rebuildPortfolio, reviewSetups, syncFunding } = await import("@/lib/pipeline/portfolio");
    return NextResponse.json({ ok: true, review: await reviewSetups(prisma), funding: await syncFunding(prisma), portfolio: await rebuildPortfolio(prisma) });
  }
  if (job === "signals") return NextResponse.json({ ok: true, ...(await generateSignals(prisma)) });
  if (job === "watch") {
    // The fast loop: keyless probes of open holdings only, so it can run every few minutes.
    const { watchHoldings } = await import("@/lib/token/holdings");
    return NextResponse.json({ ok: true, ...(await watchHoldings(prisma)) });
  }
  if (job === "discover") {
    // Watch first, then discover. A re-screen of something you may be holding is worth more than one
    // more row in the record, and each has its own budget so neither starves the other.
    const { discoverAndScreen, rescreenTracked } = await import("@/lib/token/discover");
    const rescreened = await rescreenTracked(prisma).catch((e) => ({ error: (e as Error).message }));
    return NextResponse.json({ ok: true, rescreened, ...(await discoverAndScreen(prisma)) });
  }
  if (job === "summary") {
    const { sendAlert, summaryMessage } = await import("@/lib/alerts");
    const [open, today, all] = await Promise.all([
      prisma.signal.count({ where: { state: "OPEN" } }),
      prisma.signal.findMany({ where: { settledAt: { gte: new Date(Date.now() - 86_400_000) }, state: { in: ["WON", "LOST", "TIMEOUT"] } }, select: { rMultiple: true, state: true } }),
      prisma.signal.findMany({ where: { state: { in: ["WON", "LOST", "TIMEOUT"] } }, select: { rMultiple: true } }),
    ]);
    const res = await sendAlert(summaryMessage({ open, settled: today.length, wonToday: today.filter((t) => t.state === "WON").length,
      rToday: today.reduce((s, x) => s + (x.rMultiple ?? 0), 0), expectancy: all.length ? all.reduce((s, x) => s + (x.rMultiple ?? 0), 0) / all.length : 0, total: all.length }));
    return NextResponse.json({ ok: res.ok, message: res.message });
  }
  const { settleScreens } = await import("@/lib/token/ledger");
  return NextResponse.json({ ok: true, candles: await ingestCandles(prisma), signals: await generateSignals(prisma),
    settled: await settleSignals(prisma), screens: await settleScreens(prisma).catch((e) => ({ error: (e as Error).message })) });
}
