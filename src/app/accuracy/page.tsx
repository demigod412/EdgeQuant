import { settledSignals } from "@/lib/queries";
import { brier, buckets, logLoss, maxDrawdown, mean } from "@/lib/model/stats";
import { EmptyState } from "@/components/EmptyState";
import { Card, SectionTitle, cn, pct } from "@/components/ui";
import { BrierChart } from "@/components/BrierChart";
import { fmtWat } from "@/lib/time";

export const dynamic = "force-dynamic";
export const metadata = { title: "Record" };
const f3 = (x: number) => x.toFixed(3);

/** The ledger: every locked call, scored. This page is the reason the app exists. */
export default async function Record() {
  const rows = (await settledSignals(365)).filter((s) => s.state !== "VOID");
  if (!rows.length) return (
    <>
      <h1 className="mb-4 text-2xl font-semibold tracking-tight">Record</h1>
      <EmptyState title="Nothing settled yet" body="Calls are scored once their target, stop or time limit is reached. Give it a few days of bars." />
    </>
  );
  const scored = rows.filter((s) => s.state !== "TIMEOUT").map((s) => ({ p: s.calP, y: (s.state === "WON" ? 1 : 0) as 0 | 1 }));
  const base = mean(scored.map((s) => s.y));
  const rs = rows.map((s) => s.rMultiple ?? 0);
  const bySetup = new Map<string, typeof rows>();
  for (const r of rows) bySetup.set(r.setup.name, [...(bySetup.get(r.setup.name) ?? []), r]);
  const byDay = new Map<string, { p: number; y: 0 | 1 }[]>();
  for (const s of rows) if (s.state !== "TIMEOUT") {
    const k = s.barTime.toISOString().slice(0, 10);
    byDay.set(k, [...(byDay.get(k) ?? []), { p: s.calP, y: (s.state === "WON" ? 1 : 0) as 0 | 1 }]);
  }
  const series = [...byDay.entries()].sort(([a], [b]) => a.localeCompare(b))
    .map(([day, xs]) => ({ day, n: xs.length, model: brier(xs), home: brier(xs.map((x) => ({ p: base, y: x.y }))) }));

  return (
    <>
      <header className="mb-4">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Record</h1>
        <p className="mt-1 max-w-2xl text-sm text-slate-400">Every locked call, settled from price data. Timeouts count in the R column but not in the hit rate, because no barrier was reached.</p>
      </header>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <SectionTitle aside={`${rows.length} calls`}>Is the model any good?</SectionTitle>
          <table className="num w-full text-xs">
            <thead className="text-slate-500"><tr><th className="text-left font-normal">Forecaster</th><th className="font-normal">Brier</th><th className="font-normal">Log loss</th><th className="font-normal">n</th></tr></thead>
            <tbody>
              <tr className="border-t hairline"><td className="py-2 font-sans text-slate-300">EdgeQuant model</td><td className={cn("text-center", brier(scored) <= brier(scored.map((s) => ({ p: base, y: s.y }))) && "text-edge")}>{f3(brier(scored))}</td><td className="text-center">{f3(logLoss(scored))}</td><td className="text-center text-slate-500">{scored.length}</td></tr>
              <tr className="border-t hairline"><td className="py-2 font-sans text-slate-300">No skill (base rate {pct(base)})</td><td className="text-center">{f3(brier(scored.map((s) => ({ p: base, y: s.y }))))}</td><td className="text-center">{f3(logLoss(scored.map((s) => ({ p: base, y: s.y }))))}</td><td className="text-center text-slate-500">{scored.length}</td></tr>
            </tbody>
          </table>
          <p className="mt-3 text-[11px] text-slate-500">Beating the base rate is the minimum bar. If the model cannot, its percentages carry no information and no amount of sizing will help.</p>
        </Card>
        <Card>
          <SectionTitle aside="after fees, spread and slippage">Money view</SectionTitle>
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div><dt className="text-slate-500">Expectancy</dt><dd className={cn("num text-lg", mean(rs) >= 0 ? "text-edge" : "text-miss")}>{mean(rs).toFixed(3)}R</dd></div>
            <div><dt className="text-slate-500">Total</dt><dd className={cn("num text-lg", rs.reduce((a, b) => a + b, 0) >= 0 ? "text-edge" : "text-miss")}>{rs.reduce((a, b) => a + b, 0).toFixed(1)}R</dd></div>
            <div><dt className="text-slate-500">Hit rate</dt><dd className="num text-lg">{pct(base)}</dd></div>
            <div><dt className="text-slate-500">Worst drawdown</dt><dd className="num text-lg text-miss">-{maxDrawdown(rs).toFixed(1)}R</dd></div>
          </dl>
          <p className="mt-3 text-[11px] text-slate-500">A positive expectancy over fewer than about 100 settled calls is not yet evidence. Judge it after a few hundred.</p>
        </Card>
        <Card><SectionTitle aside="daily Brier, lower is better">Calibration over time</SectionTitle><BrierChart data={series} /></Card>
        <Card>
          <SectionTitle aside="said vs happened">Calibration</SectionTitle>
          <table className="num w-full text-xs">
            <thead className="text-slate-500"><tr><th className="text-left font-normal">Model said</th><th className="font-normal">Calls</th><th className="font-normal">Avg said</th><th className="font-normal">Won</th></tr></thead>
            <tbody>{buckets(scored).map((b) => (
              <tr key={b.lo} className="border-t hairline"><td className="py-1.5">{Math.round(b.lo * 100)}-{Math.round(b.hi * 100)}%</td><td className="text-center">{b.n}</td><td className="text-center">{pct(b.avgP)}</td>
                <td className={cn("text-center", Math.abs(b.rate - b.avgP) <= 0.08 ? "text-edge" : "text-amber")}>{pct(b.rate)}</td></tr>
            ))}</tbody>
          </table>
        </Card>
        <Card className="lg:col-span-2">
          <SectionTitle>By setup</SectionTitle>
          <div className="overflow-x-auto"><table className="num w-full text-xs">
            <thead className="text-slate-500"><tr><th className="text-left font-normal">Setup</th><th className="font-normal">Calls</th><th className="font-normal">Won</th><th className="font-normal">Timeouts</th><th className="font-normal">Avg said</th><th className="font-normal">Expectancy</th><th className="font-normal">Total R</th></tr></thead>
            <tbody>{[...bySetup.entries()].map(([name, xs]) => {
              const dec = xs.filter((x) => x.state !== "TIMEOUT");
              const r = xs.map((x) => x.rMultiple ?? 0);
              return (
                <tr key={name} className="border-t hairline">
                  <td className="py-1.5 font-sans text-slate-300">{name}</td><td className="text-center">{xs.length}</td>
                  <td className="text-center">{dec.length ? pct(mean(dec.map((x) => (x.state === "WON" ? 1 : 0)))) : "-"}</td>
                  <td className="text-center text-slate-500">{xs.filter((x) => x.state === "TIMEOUT").length}</td>
                  <td className="text-center text-slate-400">{pct(mean(xs.map((x) => x.calP)))}</td>
                  <td className={cn("text-center", mean(r) >= 0 ? "text-edge" : "text-miss")}>{mean(r).toFixed(3)}R</td>
                  <td className={cn("text-center", r.reduce((a, b) => a + b, 0) >= 0 ? "text-edge" : "text-miss")}>{r.reduce((a, b) => a + b, 0).toFixed(1)}</td>
                </tr>
              );
            })}</tbody>
          </table></div>
        </Card>
        <Card className="lg:col-span-2">
          <SectionTitle aside="newest first">Last 25 settled calls</SectionTitle>
          <div className="overflow-x-auto"><table className="num w-full text-xs">
            <thead className="text-slate-500"><tr><th className="text-left font-normal">Bar</th><th className="text-left font-normal">Instrument</th><th className="font-normal">Said</th><th className="font-normal">Result</th><th className="font-normal">R</th></tr></thead>
            <tbody>{rows.slice(0, 25).map((s) => (
              <tr key={s.id} className="border-t hairline">
                <td className="py-1.5">{fmtWat(s.barTime, "d MMM HH:mm")}</td>
                <td className="font-sans text-slate-300">{s.instrument.display} <span className="text-slate-500">{s.setup.side === "LONG" ? "long" : "short"}</span></td>
                <td className="text-center">{pct(s.calP)}</td>
                <td className={cn("text-center", s.state === "WON" ? "text-edge" : s.state === "LOST" ? "text-miss" : "text-slate-400")}>{s.state.toLowerCase()}</td>
                <td className={cn("text-center", (s.rMultiple ?? 0) >= 0 ? "text-edge" : "text-miss")}>{(s.rMultiple ?? 0).toFixed(2)}</td>
              </tr>
            ))}</tbody>
          </table></div>
        </Card>
      </div>
    </>
  );
}
