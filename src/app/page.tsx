import Link from "next/link";
import { prisma } from "@/lib/db";
import { openSignals, riskProfile } from "@/lib/queries";
import { readLastScan } from "@/lib/pipeline/signals";
import { sizePosition } from "@/lib/risk";
import { fmtWat } from "@/lib/time";
import { ENTRY_LABEL, MANAGE_LABEL, type EntryStyle, type ManageMode } from "@/lib/model/plan";
import type { LastScan } from "@/lib/pipeline/signals";
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

/**
 * How strong a candidate is, in one word.
 *
 * Strength is the calibrated probability the target is hit before the stop — but a probability alone is
 * not a recommendation, because a 65% chance of a 0.5R reward is a losing trade and a 45% chance of a 2R
 * reward is a good one. So the edge is always shown beside it: that is the number with the arithmetic
 * already done, and the only one that decides whether a call is made.
 */
function Strength({ p, edge, floor }: { p: number; edge: number; floor: number }) {
  const label = edge >= floor ? "tradeable" : edge >= 0 ? "positive, below the floor" : "not worth taking";
  return (
    <span className="num whitespace-nowrap text-xs">
      <span className="text-slate-100">{pct(p)}</span>
      <span className="text-slate-500"> chance · </span>
      <span className={cn(edge >= floor ? "text-edge" : edge >= 0 ? "text-amber" : "text-miss")}>
        {edge >= 0 ? "+" : ""}{edge.toFixed(2)}R
      </span>
      <span className="text-slate-500"> {label}</span>
    </span>
  );
}

/** What the last scan found, so an empty board is legible rather than just empty. */
function ScanPanel({ scan }: { scan: LastScan }) {
  const reasons = Object.entries(scan.why).sort((a, b) => b[1] - a[1]);
  return (
    <Card className="mt-4">
      <SectionTitle aside={`scanned ${fmtWat(new Date(scan.at), "d MMM HH:mm")}`}>Closest to firing</SectionTitle>
      {scan.candidates.length === 0 ? (
        <p className="text-sm text-slate-400">
          No candidate even reached pricing on the last scan — every instrument failed its setup rule on
          the latest bar. Nothing is wrong; the rules are waiting for a shape that is not there yet.
        </p>
      ) : (
        <ul className="space-y-1.5">
          {scan.candidates.map((c) => (
            <li key={`${c.instrument}-${c.setupKey}`} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-sm">
              <span className="min-w-0">
                <span className="text-slate-200">{c.instrument}</span>
                <span className={cn("ml-2 rounded-md border px-1.5 py-0.5 text-[10px]", c.side === "LONG" ? "border-edge/40 text-edge" : "border-miss/40 text-miss")}>{c.side}</span>
                <span className="ml-2 text-xs text-slate-500">{c.setup} · {c.timeframe} · {c.holdHours}h max</span>
              </span>
              <Strength p={c.p} edge={c.edge} floor={scan.minEdge} />
            </li>
          ))}
        </ul>
      )}
      {reasons.length > 0 && (
        <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
          {scan.skipped} candidate{scan.skipped === 1 ? "" : "s"} passed over: {reasons.map(([r, n]) => `${n} ${r}`).join(", ")}.
          A call is only made when expected R after fees, spread and slippage clears{" "}
          <span className="num">{scan.minEdge}R</span>.
        </p>
      )}
    </Card>
  );
}

/** Live calls: every one is already locked in the ledger, so what you see here is exactly what gets scored. */
export default async function Signals() {
  const [signals, risk, lastSync, counts, scan] = await Promise.all([
    openSignals(), riskProfile(),
    prisma.instrument.findFirst({ where: { lastSyncAt: { not: null } }, orderBy: { lastSyncAt: "desc" }, select: { lastSyncAt: true } }),
    prisma.signal.groupBy({ by: ["state"], _count: true }),
    readLastScan(prisma),
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
        <>
          <EmptyState title="No open calls right now"
            body={scan ? "Nothing currently clears its setup rule with a positive edge after costs. That is the normal state: most bars are not opportunities, and the scan below shows what came closest." : "Run a sync and a model fit first — the app needs price history before it can price anything."}
            action={{ href: "/backtest", label: "See the backtests" }} />
          {scan && <ScanPanel scan={scan} />}
        </>
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
