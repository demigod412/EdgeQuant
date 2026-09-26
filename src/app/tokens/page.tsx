import { prisma } from "@/lib/db";
import { fmtWat } from "@/lib/time";
import { parseChecks, screenRecord, SETTLE_HOURS } from "@/lib/token/ledger";
import { SURVIVAL_MIN_SETTLED } from "@/lib/token/score";
import { CopyButton } from "@/components/CopyButton";
import { EmptyState } from "@/components/EmptyState";
import { Card, SectionTitle, cn, pct } from "@/components/ui";
import { ScreenForm } from "./form";

export const dynamic = "force-dynamic";
export const metadata = { title: "Token screener" };

const GRADE_STYLE: Record<string, string> = {
  avoid: "border-miss/50 bg-miss/10 text-miss",
  unproven: "border-amber/50 bg-amber/10 text-amber",
  caution: "border-amber/40 bg-amber/5 text-amber",
  clear: "border-edge/50 bg-edge/10 text-edge",
};
const VERDICT_STYLE: Record<string, string> = {
  pass: "text-edge", warn: "text-amber", fail: "text-miss", unknown: "text-slate-500",
};
const VERDICT_MARK: Record<string, string> = { pass: "✓", warn: "!", fail: "✕", unknown: "?" };

export default async function Tokens() {
  const [screens, record] = await Promise.all([
    prisma.tokenScreen.findMany({ orderBy: { screenedAt: "desc" }, take: 40 }),
    screenRecord(prisma),
  ]);

  return (
    <div className="space-y-4">
      <header className="mb-1">
        <h1 className="text-2xl font-semibold tracking-tight">Token screener</h1>
        <p className="mt-1 max-w-2xl text-sm text-slate-400">
          What can be checked before you buy: whether the supply can be inflated, your account frozen,
          the liquidity withdrawn, or the sale taxed or blocked — and who already holds the float.
          These are properties of the contract and the distribution, readable now.
          <b className="text-slate-200"> None of it forecasts the price.</b> A token that clears every
          check can still go to zero on its own; clearing them only means the ways of losing that can be
          checked have been checked.
        </p>
      </header>

      <Card>
        <SectionTitle aside={`settles after ${SETTLE_HOURS}h`}>Screen a mint</SectionTitle>
        <ScreenForm />
      </Card>

      <Card>
        <SectionTitle aside={record.n ? `${record.n} settled` : "nothing settled yet"}>Does the screener work?</SectionTitle>
        {record.n === 0 ? (
          <p className="text-sm text-slate-400">
            No screen has reached its {SETTLE_HOURS}-hour horizon yet. Until they do, the grades are
            reasoned judgements with nothing behind them — this panel is where they earn or lose their
            keep, by showing the realised survival rate of each grade. A calibrated survival probability
            appears once {SURVIVAL_MIN_SETTLED} screens have settled, not before.
          </p>
        ) : (
          <>
            <table className="w-full text-sm">
              <thead><tr className="text-left text-xs text-slate-500"><th className="pb-1">Grade</th><th className="pb-1">Screens</th><th className="pb-1">Still tradeable at {SETTLE_HOURS}h</th></tr></thead>
              <tbody className="divide-y divide-white/[0.06]">
                {record.byGrade.map((g) => (
                  <tr key={g.grade}>
                    <td className="py-1.5 capitalize">{g.grade}</td>
                    <td className="num py-1.5 text-slate-300">{g.n}</td>
                    <td className={cn("num py-1.5", g.survivalRate >= 0.8 ? "text-edge" : g.survivalRate >= 0.5 ? "text-amber" : "text-miss")}>{pct(g.survivalRate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {record.failures.length > 0 && (
              <p className="mt-3 text-[11px] text-slate-500">How they failed: {record.failures.map((f) => `${f.kind} ${f.n}`).join(" · ")}.</p>
            )}
            {record.n < SURVIVAL_MIN_SETTLED && (
              <p className="mt-2 text-[11px] text-slate-500">
                {record.n} of {SURVIVAL_MIN_SETTLED} settled screens needed before a calibrated survival
                probability is fitted. Reading a rate off this few is how you fool yourself.
              </p>
            )}
          </>
        )}
      </Card>

      <SectionTitle aside={screens.length ? `last ${screens.length}` : undefined}>Screens</SectionTitle>
      {screens.length === 0 ? (
        <EmptyState title="No screens yet" body="Paste a Solana mint address above. Every screen is recorded and judged later, so the record above fills in on its own." />
      ) : (
        <div className="space-y-3">
          {screens.map((s) => {
            const checks = parseChecks(s.checks);
            const errs = Array.isArray(s.errors) ? (s.errors as string[]) : [];
            // Counted here rather than read off the row: screens recorded before 0.5.6 have no counts
            // stored, and the checks themselves are the source of truth either way.
            const n = { pass: 0, warn: 0, fail: 0, unknown: 0 };
            for (const c of checks) n[c.verdict] = (n[c.verdict] ?? 0) + 1;
            return (
              <Card key={s.id}>
                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium">{s.symbol ?? "unknown"}</h3>
                    {/* In full, and copyable: an abbreviated mint is useless the moment you want to act on it. */}
                    <p className="num mt-0.5 flex items-center gap-2 text-[11px] text-slate-400">
                      <span className="break-all">{s.mint}</span>
                      <CopyButton text={s.mint} label="Copy" />
                    </p>
                    <p className="num text-[11px] text-slate-500">
                      {fmtWat(s.screenedAt, "d MMM HH:mm")}
                      {s.liquidityUsd != null && <> · liquidity ${Math.round(s.liquidityUsd).toLocaleString("en-US")}</>}
                      {s.settledAt && <> · {s.survived ? <span className="text-edge">still tradeable at {SETTLE_HOURS}h</span> : <span className="text-miss">failed: {s.failureKind}</span>}</>}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-xs capitalize", GRADE_STYLE[s.grade] ?? "hairline")}>{s.grade}</span>
                    <div className="num mt-1 text-[11px] text-slate-500">{s.safety}/100</div>
                    <div className="mt-0.5 text-[11px] text-slate-500">
                      {n.pass} cleared · {n.fail} failed · {n.unknown} unavailable
                    </div>
                  </div>
                </div>
                <ul className="grid gap-1 sm:grid-cols-2">
                  {checks.map((c) => (
                    <li key={c.id} className="flex gap-2 text-[12px]">
                      <span className={cn("num shrink-0", VERDICT_STYLE[c.verdict])}>{VERDICT_MARK[c.verdict]}</span>
                      <span className="min-w-0">
                        <span className={cn(c.hard && c.verdict === "fail" ? "text-miss" : "text-slate-300")}>{c.label}</span>
                        <span className="text-slate-500"> — {c.detail}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                {errs.length > 0 && (
                  <p className="mt-2 text-[11px] text-amber">
                    Incomplete screen: {errs.join("; ")}. Missing checks are counted as unknown, never as passed.
                  </p>
                )}
                {n.unknown > 0 && (
                  <p className="mt-1 text-[11px] text-slate-500">
                    With {n.unknown} of {checks.length} checks unavailable, the score above is mostly a
                    measure of what could be read, not of this token — every token with the same blind
                    spots lands on the same number. Compare the individual findings, not the totals.
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
