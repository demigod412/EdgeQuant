import { prisma } from "@/lib/db";
import { mean, maxDrawdown } from "@/lib/model/stats";
import { streakNote } from "@/lib/risk";
import { JournalForms } from "./forms";
import { Card, SectionTitle, cn } from "@/components/ui";
import { fmtWat } from "@/lib/time";

export const dynamic = "force-dynamic";
export const metadata = { title: "Journal" };

/** Your trades, not the model's. Discipline is measured here: plan followed, and what it cost when it wasn't. */
export default async function Journal() {
  const [instruments, trades] = await Promise.all([
    prisma.instrument.findMany({ where: { enabled: true }, orderBy: { display: "asc" } }),
    prisma.trade.findMany({ include: { instrument: true }, orderBy: { openedAt: "desc" }, take: 100 }),
  ]);
  const closed = trades.filter((t) => t.rMultiple != null);
  const rs = closed.map((t) => t.rMultiple!);
  const kept = closed.filter((t) => t.followedPlan), broke = closed.filter((t) => !t.followedPlan);
  const streak = streakNote(rs);

  return (
    <>
      <header className="mb-4">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Journal</h1>
        <p className="mt-1 max-w-2xl text-sm text-slate-400">Log what you actually did. The comparison that matters is not win or lose, but whether you followed your own plan.</p>
      </header>

      {closed.length > 0 && (
        <Card className="mb-4">
          <SectionTitle aside={`${closed.length} closed`}>Your numbers</SectionTitle>
          <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            <div><dt className="text-slate-500">Expectancy</dt><dd className={cn("num text-lg", mean(rs) >= 0 ? "text-edge" : "text-miss")}>{mean(rs).toFixed(3)}R</dd></div>
            <div><dt className="text-slate-500">Total</dt><dd className={cn("num text-lg", rs.reduce((a, b) => a + b, 0) >= 0 ? "text-edge" : "text-miss")}>{rs.reduce((a, b) => a + b, 0).toFixed(1)}R</dd></div>
            <div><dt className="text-slate-500">Worst drawdown</dt><dd className="num text-lg text-miss">-{maxDrawdown(rs).toFixed(1)}R</dd></div>
            <div><dt className="text-slate-500">Longest losing run</dt><dd className="num text-lg">{streak.longestLosingRun}</dd></div>
          </dl>
          {broke.length > 0 && (
            <p className="mt-3 text-[13px] text-amber">
              Trades where you followed the plan averaged <span className="num">{mean(kept.map((t) => t.rMultiple!)).toFixed(3)}R</span>;
              the {broke.length} where you did not averaged <span className="num">{mean(broke.map((t) => t.rMultiple!)).toFixed(3)}R</span>.
            </p>
          )}
        </Card>
      )}

      <JournalForms instruments={instruments.map((i) => ({ id: i.id, display: i.display }))} open={trades.filter((t) => !t.closedAt).map((t) => ({ id: t.id, label: `${t.instrument.display} ${t.side.toLowerCase()} @ ${t.entry}` }))} />

      <Card className="mt-4">
        <SectionTitle aside="newest first">Trades</SectionTitle>
        {trades.length === 0 ? <p className="text-sm text-slate-400">Nothing logged yet.</p> : (
          <div className="overflow-x-auto"><table className="num w-full text-xs">
            <thead className="text-slate-500"><tr><th className="text-left font-normal">Opened</th><th className="text-left font-normal">Instrument</th><th className="font-normal">Entry</th><th className="font-normal">Stop</th><th className="font-normal">Exit</th><th className="font-normal">R</th><th className="font-normal">Plan</th></tr></thead>
            <tbody>{trades.map((t) => (
              <tr key={t.id} className="border-t hairline">
                <td className="py-1.5">{fmtWat(t.openedAt, "d MMM HH:mm")}</td>
                <td className="font-sans text-slate-300">{t.instrument.display} <span className="text-slate-500">{t.side.toLowerCase()}</span></td>
                <td className="text-center">{t.entry}</td><td className="text-center text-miss">{t.stop}</td><td className="text-center">{t.exit ?? "-"}</td>
                <td className={cn("text-center", (t.rMultiple ?? 0) >= 0 ? "text-edge" : "text-miss")}>{t.rMultiple?.toFixed(2) ?? "open"}</td>
                <td className={cn("text-center", t.followedPlan ? "text-edge" : "text-amber")}>{t.followedPlan ? "kept" : "broken"}</td>
              </tr>
            ))}</tbody>
          </table></div>
        )}
      </Card>
    </>
  );
}
