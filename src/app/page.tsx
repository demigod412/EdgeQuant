import Link from "next/link";
import { prisma } from "@/lib/db";
import { openSignals, riskProfile } from "@/lib/queries";
import { sizePosition } from "@/lib/risk";
import { fmtWat } from "@/lib/time";
import { ENTRY_LABEL, MANAGE_LABEL, type EntryStyle, type ManageMode } from "@/lib/model/plan";
import { CopyButton } from "@/components/CopyButton";
import { EmptyState } from "@/components/EmptyState";
import { Card, SectionTitle, cn, pct } from "@/components/ui";

export const dynamic = "force-dynamic";
export const metadata = { title: "Signals" };

type TicketRow = { instrument: { display: string }; setup: { name: string; side: string; timeframe: string; horizonBars: number }; entry: number; stop: number; target: number; rr: number; calP: number; edge: number; entryStyle: string; manageMode: string };
/** A complete order ticket, ready to paste into an exchange. */
const ticket = (s: TicketRow, units: number, risk: number) => [
  `${s.instrument.display} · ${s.setup.side} · ${s.setup.timeframe} · ${s.setup.name}`,
  `${ENTRY_LABEL[s.entryStyle as EntryStyle]}: ${s.entry.toPrecision(6)}`,
  `Stop loss:   ${s.stop.toPrecision(6)}`,
  `Take profit: ${s.target.toPrecision(6)}`,
  `Risk:reward 1 : ${s.rr.toFixed(2)} · model ${(s.calP * 100).toFixed(0)}% · edge ${s.edge >= 0 ? "+" : ""}${s.edge.toFixed(2)}R after costs`,
  `Size ${units.toPrecision(4)} units · risking ${risk.toFixed(2)}`,
  `Management: ${MANAGE_LABEL[s.manageMode as ManageMode]}`,
  `Valid ${s.setup.horizonBars} bars, then close at market.`,
].join("\n");

/** Live calls: every one is already locked in the ledger, so what you see here is exactly what gets scored. */
export default async function Signals() {
  const [signals, risk, lastSync, counts] = await Promise.all([
    openSignals(), riskProfile(),
    prisma.instrument.findFirst({ where: { lastSyncAt: { not: null } }, orderBy: { lastSyncAt: "desc" }, select: { lastSyncAt: true } }),
    prisma.signal.groupBy({ by: ["state"], _count: true }),
  ]);
  const settled = counts.filter((c) => c.state !== "OPEN").reduce((s, c) => s + c._count, 0);

  return (
    <>
      <header className="mb-4">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Open calls</h1>
        <p className="mt-1 max-w-2xl text-sm text-slate-400">
          Each call was locked at a bar close and will be scored from the bars that follow: target first, stop first, or the time limit.
          Edge is expected R after fees, spread and slippage — anything below zero is not worth taking, however good the setup looks.
          {lastSync?.lastSyncAt && <> Last data sync <span className="num">{fmtWat(lastSync.lastSyncAt, "d MMM HH:mm")}</span>.</>}
        </p>
      </header>

      {signals.length === 0 ? (
        <EmptyState title="No open calls right now"
          body={settled ? "Nothing currently passes its setup rule with a positive edge. That is normal: most bars are not opportunities." : "Run a sync and a model fit first — the app needs price history before it can price anything."}
          action={{ href: "/backtest", label: "See the backtests" }} />
      ) : (
        <ul className="space-y-2">
          {signals.map((s) => {
            const size = sizePosition({ accountSize: risk.accountSize, riskPct: risk.riskPctPerTrade, entry: s.entry, stop: s.stop, p: s.calP, rewardR: s.setup.atrTarget / s.setup.atrStop, kellyFraction: risk.kellyFraction });
            return (
              <li key={s.id} className="glass p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <span className="text-base font-medium">{s.instrument.display}</span>
                    <span className={cn("ml-2 rounded-md border px-1.5 py-0.5 text-[11px]", s.setup.side === "LONG" ? "border-edge/40 text-edge" : "border-miss/40 text-miss")}>{s.setup.side}</span>
                    <span className="ml-2 text-xs text-slate-400">{s.setup.name} · {s.setup.timeframe}</span>
                  </div>
                  <div className="num text-right text-sm">
                    <span className="text-slate-100">{pct(s.calP)}</span> <span className="text-slate-500">chance</span>
                    <span className={cn("ml-3", s.edge > 0 ? "text-edge" : "text-miss")}>{s.edge >= 0 ? "+" : ""}{s.edge.toFixed(2)}R</span> <span className="text-slate-500">edge</span>
                  </div>
                </div>
                <div className="num mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-400 sm:grid-cols-5">
                  <div>{s.entryStyle === "market" ? "entry" : s.entryStyle === "limit" ? "limit" : "stop entry"} <span className="text-slate-200">{s.entry.toPrecision(6)}</span></div>
                  <div>stop <span className="text-miss">{s.stop.toPrecision(6)}</span></div>
                  <div>target <span className="text-edge">{s.target.toPrecision(6)}</span></div>
                  <div>R:R <span className="text-slate-200">1 : {s.rr.toFixed(2)}</span></div>
                  <div>size <span className="text-slate-200">{size.units.toPrecision(4)}</span> units</div>
                </div>
                <details className="mt-2 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="cursor-pointer list-none text-[11px] text-ice">Order ticket</summary>
                  <pre className="num mt-2 overflow-x-auto rounded-lg border hairline bg-black/30 p-3 text-[11px] leading-relaxed text-slate-300">{ticket(s, size.units, size.cashRisk)}</pre>
                  <div className="mt-2"><CopyButton text={ticket(s, size.units, size.cashRisk)} label="Copy ticket" /></div>
                </details>
                <div className="mt-2 text-[11px] text-slate-500">
                  Locked <span className="num">{fmtWat(s.lockedAt, "d MMM HH:mm")}</span> on the <span className="num">{s.setup.timeframe}</span> bar.
                  Risking <span className="num">{risk.riskPctPerTrade}%</span> (<span className="num">{size.cashRisk.toFixed(2)}</span>) of a <span className="num">{risk.accountSize.toLocaleString()}</span> account,
                  quarter-Kelly capped. <Link href="/risk" className="underline underline-offset-2">Adjust</Link>.
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <Card className="mt-6">
        <SectionTitle aside={`${settled} settled`}>How to read this</SectionTitle>
        <ul className="space-y-1.5 text-sm text-slate-300">
          <li>· A 55% call with 1.5R reward is worth taking; a 65% call with 0.5R reward is not. The edge column already does that arithmetic.</li>
          <li>· Sizing assumes the stop is honoured. If you move stops, the record here stops describing your results.</li>
          <li>· The <Link href="/accuracy" className="underline underline-offset-2">Record</Link> page is the one that matters: it shows whether these percentages have been true.</li>
        </ul>
      </Card>
    </>
  );
}
