import { prisma } from "@/lib/db";
import { riskState } from "@/lib/pipeline/portfolio";
import { carrySummary, fundingApr } from "@/lib/data/funding";
import { EmptyState } from "@/components/EmptyState";
import { Card, SectionTitle, cn, pct } from "@/components/ui";
import { fmtWat } from "@/lib/time";

export const dynamic = "force-dynamic";
export const metadata = { title: "Portfolio" };
type Row = { id: string; display: string; market: string; score: number; vol: number; rank: number; slot: string; weight: number; riskPct: number };

/** Selection and sizing across the whole universe — the layer with the best evidence behind it. */
export default async function Portfolio() {
  const [snap, risk, state, instruments] = await Promise.all([
    prisma.portfolioSnapshot.findFirst({ orderBy: { takenAt: "desc" } }),
    prisma.riskProfile.findUnique({ where: { id: "default" } }),
    riskState(prisma),
    prisma.instrument.findMany({ where: { enabled: true, market: "CRYPTO" }, include: { funding: { orderBy: { fundedAt: "desc" }, take: 90 } } }),
  ]);
  const rows = (snap?.rows ?? []) as unknown as Row[];
  const held = rows.filter((r) => r.slot === "LONG");
  const carry = instruments.map((i) => ({ display: i.display, ...carrySummary(i.funding.map((f) => ({ rate: f.rate, intervalHours: f.intervalHours }))) }))
    .filter((c) => c.n > 0).sort((a, b) => b.apr30 - a.apr30);

  return (
    <>
      <header className="mb-4">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Portfolio</h1>
        <p className="mt-1 max-w-2xl text-sm text-slate-400">
          Rank the whole universe, hold the strongest on a risk-adjusted basis, and size each one so the book targets a
          volatility rather than a number of positions. Cross-sectional momentum has held up out of sample for decades;
          it is the closest thing here to a real edge, and it does not depend on timing any single instrument.
        </p>
      </header>

      <Card className="mb-4">
        <SectionTitle aside="last 40 settled calls">Risk state</SectionTitle>
        <p className={cn("text-sm", state.multiplier === 1 ? "text-edge" : state.multiplier === 0.5 ? "text-amber" : "text-miss")}>
          {state.multiplier === 1 ? "Full size." : state.multiplier === 0.5 ? "Half size." : "Trading paused."}{" "}
          <span className="num">{state.drawdownR.toFixed(1)}R</span> drawdown on the recent curve.{state.note ? ` ${state.note}` : ""}
        </p>
        <p className="mt-2 text-[11px] text-slate-500">Halves at 6R, stops at 10R. Surviving a bad run matters more than catching every trade.</p>
      </Card>

      {!snap ? <EmptyState title="No ranking yet" body="Run npm run ingest once there is daily history; the ranking is rebuilt on every sync." /> : (
        <Card className="mb-4">
          <SectionTitle aside={`${fmtWat(snap.takenAt, "d MMM HH:mm")} · target vol ${pct(snap.targetVol)}`}>Ranking and weights</SectionTitle>
          {snap.note && <p className="mb-2 text-[11px] text-slate-400">{snap.note}</p>}
          <div className="overflow-x-auto"><table className="num w-full text-xs">
            <thead className="text-slate-500"><tr><th className="text-left font-normal">#</th><th className="text-left font-normal">Instrument</th><th className="font-normal">Market</th><th className="font-normal">Score</th><th className="font-normal">Ann. vol</th><th className="font-normal">Slot</th><th className="font-normal">Weight</th><th className="font-normal">Risk</th></tr></thead>
            <tbody>{rows.slice(0, 20).map((r) => (
              <tr key={r.id} className={cn("border-t hairline", r.slot === "LONG" && "bg-edge/[0.06]")}>
                <td className="py-1.5">{r.rank}</td><td className="font-sans text-slate-300">{r.display}</td>
                <td className="text-center text-slate-500">{r.market === "CRYPTO" ? "crypto" : "fx"}</td>
                <td className={cn("text-center", r.score >= 0 ? "text-edge" : "text-miss")}>{r.score.toFixed(2)}</td>
                <td className="text-center text-slate-400">{pct(r.vol)}</td>
                <td className={cn("text-center", r.slot === "LONG" ? "text-edge" : r.slot === "AVOID" ? "text-miss" : "text-slate-500")}>{r.slot.toLowerCase()}</td>
                <td className="text-center">{r.weight ? pct(r.weight) : "-"}</td>
                <td className="text-center">{r.riskPct ? `${r.riskPct.toFixed(2)}%` : "-"}</td>
              </tr>
            ))}</tbody>
          </table></div>
          <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
            {held.length} held, {rows.filter((r) => r.slot === "AVOID").length} flagged to avoid. Total risk is capped at{" "}
            <span className="num">{risk?.maxOpenRisk ?? 3}%</span> of the account and split by volatility, not evenly.
            Rebalance weekly; trading it daily just pays more costs.
          </p>
        </Card>
      )}

      <Card>
        <SectionTitle aside="perpetual funding, annualised">Carry watch</SectionTitle>
        {carry.length === 0 ? <p className="text-sm text-slate-400">No funding history yet — it is collected on each sync for crypto instruments.</p> : (
          <>
            <div className="overflow-x-auto"><table className="num w-full text-xs">
              <thead className="text-slate-500"><tr><th className="text-left font-normal">Instrument</th><th className="font-normal">Now (APR)</th><th className="font-normal">Recent average</th><th className="font-normal">Positive</th></tr></thead>
              <tbody>{carry.map((c) => (
                <tr key={c.display} className="border-t hairline">
                  <td className="py-1.5 font-sans text-slate-300">{c.display}</td>
                  <td className={cn("text-center", c.aprNow >= 0 ? "text-edge" : "text-miss")}>{(c.aprNow * 100).toFixed(1)}%</td>
                  <td className={cn("text-center", c.apr30 >= 0 ? "text-edge" : "text-miss")}>{(c.apr30 * 100).toFixed(1)}%</td>
                  <td className="text-center text-slate-400">{pct(c.positiveShare)}</td>
                </tr>
              ))}</tbody>
            </table></div>
            <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
              Positive funding means longs pay shorts. A short perp against long spot collects it and needs no forecast —
              but it carries exchange, custody and liquidation risk, and the rate can flip. Treat anything under about{" "}
              <span className="num">{(fundingApr(0.0001, 8) * 100).toFixed(0)}%</span> APR as noise once costs are paid.
            </p>
          </>
        )}
      </Card>
    </>
  );
}
