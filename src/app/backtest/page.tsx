import { prisma } from "@/lib/db";
import { EmptyState } from "@/components/EmptyState";
import { Card, SectionTitle, cn, pct } from "@/components/ui";
import { fmtWat } from "@/lib/time";

export const dynamic = "force-dynamic";
export const metadata = { title: "Backtest" };

/** Walk-forward results, stored so they can be compared over time rather than re-run from memory. */
export default async function Backtest() {
  const runs = await prisma.backtestRun.findMany({ include: { setup: true }, orderBy: { createdAt: "desc" }, take: 40 });
  const latest = new Map<string, (typeof runs)[number]>();
  for (const r of runs) if (!latest.has(r.setupId)) latest.set(r.setupId, r);

  return (
    <>
      <header className="mb-4">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Backtests</h1>
        <p className="mt-1 max-w-2xl text-sm text-slate-400">
          Walk-forward only: the model is fitted on the past, then judged on bars it has never seen, refitting as it steps
          forward. Costs are charged on every trade. A single in-sample backtest can be made to look like anything; this cannot.
          Run one with <span className="num">npm run backtest</span>.
        </p>
      </header>

      {latest.size === 0 ? (
        <EmptyState title="No backtests yet" body="Run npm run backtest on the server once enough price history has been synced (about 300 bars per instrument)." />
      ) : (
        <div className="space-y-3">
          {[...latest.values()].map((r) => {
            const base = r.baseline as { alwaysTake?: number; randomWalkBrier?: number; baseRate?: number };
            const beatsNoSkill = r.brier < (base.randomWalkBrier ?? 1);
            return (
              <Card key={r.id}>
                <SectionTitle aside={`${fmtWat(r.from, "MMM yyyy")} – ${fmtWat(r.to, "MMM yyyy")} · ${r.costsBps.toFixed(0)} bps costs`}>{r.setup.name}</SectionTitle>
                <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                  <div><dt className="text-slate-500">Trades taken</dt><dd className="num text-lg">{r.trades}</dd></div>
                  <div><dt className="text-slate-500">Expectancy</dt><dd className={cn("num text-lg", r.expectR >= 0 ? "text-edge" : "text-miss")}>{r.expectR.toFixed(3)}R</dd></div>
                  <div><dt className="text-slate-500">Total</dt><dd className={cn("num text-lg", r.totalR >= 0 ? "text-edge" : "text-miss")}>{r.totalR.toFixed(1)}R</dd></div>
                  <div><dt className="text-slate-500">Worst drawdown</dt><dd className="num text-lg text-miss">-{r.maxDdR.toFixed(1)}R</dd></div>
                  <div><dt className="text-slate-500">Hit rate</dt><dd className="num">{pct(r.hitRate)}</dd></div>
                  <div><dt className="text-slate-500">Model said</dt><dd className="num">{pct(r.avgPredP)}</dd></div>
                  <div><dt className="text-slate-500">Brier</dt><dd className={cn("num", beatsNoSkill ? "text-edge" : "text-miss")}>{r.brier.toFixed(3)}</dd></div>
                  <div><dt className="text-slate-500">No-skill Brier</dt><dd className="num text-slate-400">{(base.randomWalkBrier ?? 0).toFixed(3)}</dd></div>
                </dl>
                {(() => {
                  const v = ((r.detail as { variants?: { entry: string; manage: string; trades: number; filled: number; hitRate: number; expectR: number; totalR: number }[] }).variants ?? []).slice(0, 12);
                  if (!v.length) return null;
                  const best = v[0];
                  return (
                    <div className="mt-4">
                      <div className="mb-1 text-[11px] uppercase tracking-wide text-slate-500">Entry style × management, same signals</div>
                      <div className="overflow-x-auto"><table className="num w-full text-xs">
                        <thead className="text-slate-500"><tr><th className="text-left font-normal">Entry</th><th className="text-left font-normal">Management</th><th className="font-normal">Signals</th><th className="font-normal">Filled</th><th className="font-normal">Hit</th><th className="font-normal">Expectancy</th><th className="font-normal">Total R</th></tr></thead>
                        <tbody>{v.map((x) => (
                          <tr key={`${x.entry}-${x.manage}`} className={cn("border-t hairline", x === best && "bg-edge/[0.07]")}>
                            <td className="py-1.5 font-sans text-slate-300">{x.entry}</td><td className="font-sans text-slate-400">{x.manage}</td>
                            <td className="text-center">{x.trades}</td><td className="text-center text-slate-400">{x.filled}</td><td className="text-center">{pct(x.hitRate)}</td>
                            <td className={cn("text-center", x.expectR >= 0 ? "text-edge" : "text-miss")}>{x.expectR.toFixed(3)}R</td>
                            <td className={cn("text-center", x.totalR >= 0 ? "text-edge" : "text-miss")}>{x.totalR.toFixed(1)}</td>
                          </tr>
                        ))}</tbody>
                      </table></div>
                      <p className="mt-2 text-[11px] text-slate-500">
                        Best here: <span className="text-slate-300">{best.entry} entry + {best.manage}</span>. Limit and stop entries do not always fill; unfilled signals count as
                        zero-R non-trades, which is why their signal and filled counts differ. Set the winner on this setup in the database
                        (<span className="num">entryStyle</span>, <span className="num">manageMode</span>) and future calls will use it.
                      </p>
                    </div>
                  );
                })()}
                <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
                  Taking every signal instead of only the positive-edge ones would have averaged{" "}
                  <span className={cn("num", (base.alwaysTake ?? 0) >= 0 ? "text-edge" : "text-miss")}>{(base.alwaysTake ?? 0).toFixed(3)}R</span> per trade.
                  {beatsNoSkill ? " The model's probabilities beat a no-skill forecaster on this window." : " The model did NOT beat a no-skill forecaster here — treat its percentages as noise until that changes."}
                  {r.trades < 100 && " Fewer than 100 trades: not enough to conclude anything."}
                </p>
              </Card>
            );
          })}
        </div>
      )}

      <Card className="mt-6">
        <SectionTitle>What would make a result believable</SectionTitle>
        <ul className="space-y-1.5 text-sm text-slate-300">
          <li>· Several hundred out-of-sample trades, not thirty.</li>
          <li>· Expectancy that survives doubling the cost assumption.</li>
          <li>· A hit rate close to what the model said, bucket by bucket, on the Record page.</li>
          <li>· Similar behaviour across instruments, not one lucky symbol carrying the whole curve.</li>
          <li>· A drawdown you could actually sit through at your position size.</li>
        </ul>
      </Card>
    </>
  );
}
