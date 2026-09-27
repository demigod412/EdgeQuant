import { prisma } from "@/lib/db";
import { fmtWat } from "@/lib/time";
import { CHECKPOINT_HOURS, parseChecks, screenRecord, SETTLE_HOURS, type Checkpoint } from "@/lib/token/ledger";
import { gradeScreen, SURVIVAL_MIN_SETTLED } from "@/lib/token/score";
import { byClearance, rateEntry, type Rating } from "@/lib/token/rating";
import { parseSnapshot } from "@/lib/token/ledger";
import { CopyButton } from "@/components/CopyButton";
import Link from "next/link";
import { EmptyState } from "@/components/EmptyState";
import { Card, SectionTitle, cn, pct } from "@/components/ui";
import { RemoveButton, ScreenForm } from "./tokens/form";

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
const RATING_STYLE: Record<Rating, string> = {
  strong: "border-edge/60 bg-edge/15 text-edge",
  medium: "border-amber/60 bg-amber/10 text-amber",
  weak: "border-slate-600 bg-white/5 text-slate-300",
  avoid: "border-miss/60 bg-miss/15 text-miss",
};
const usd = (x: number) => `$${Math.round(x).toLocaleString("en-US")}`;

/**
 * Re-rate a stored screen.
 *
 * Recomputed from the stored checks and snapshot rather than saved alongside them, so a change to the
 * thresholds applies to everything at once — and so the rating can never drift out of step with the
 * findings it is supposed to summarise.
 */
function rateRow(row: { checks: unknown; snapshot: unknown }) {
  const checks = parseChecks(row.checks);
  const snap = parseSnapshot(row.snapshot);
  if (!checks.length || !snap) return null;
  return rateEntry(checks, gradeScreen(checks), snap);
}

export default async function Tokens({ searchParams }: { searchParams: Promise<{ show?: string }> }) {
  // Automatic screens fill the survival record and would bury your own a few hundred rows deep, so the
  // list shows yours by default. Hidden ones are excluded from the list but never from the record.
  const show = (await searchParams).show === "all" ? "all" : "mine";
  const [screens, shortlistRows, record, autoCount, hiddenCount] = await Promise.all([
    prisma.tokenScreen.findMany({
      where: { hiddenAt: null, ...(show === "mine" ? { source: "manual" } : {}) },
      orderBy: { screenedAt: "desc" }, take: 40,
    }),
    // The shortlist looks at everything screened recently, yours and automatic alike, and keeps only the
    // most recent screen of each mint: a token re-screened six times should appear once, as it is now.
    prisma.tokenScreen.findMany({
      where: { hiddenAt: null, screenedAt: { gte: new Date(Date.now() - 24 * 3600_000) } },
      orderBy: { screenedAt: "desc" }, take: 200,
    }),
    screenRecord(prisma),
    prisma.tokenScreen.count({ where: { source: "auto" } }),
    prisma.tokenScreen.count({ where: { hiddenAt: { not: null } } }),
  ]);

  // ---- the shortlist ----------------------------------------------------------------------------
  const seenMint = new Set<string>();
  const shortlist = shortlistRows
    .filter((r) => (seenMint.has(r.mint) ? false : (seenMint.add(r.mint), true)))
    .map((r) => ({ row: r, rating: rateRow(r) }))
    .filter((x): x is { row: (typeof shortlistRows)[number]; rating: NonNullable<ReturnType<typeof rateRow>> } => !!x.rating)
    .filter((x) => x.rating.rating === "strong" || x.rating.rating === "medium")
    .sort((a, b) => byClearance(a.rating, b.rating))
    .slice(0, 6);

  return (
    <div className="space-y-4">
      <header className="mb-1">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Token screener</h1>
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

      {/*
        The shortlist. Ranked by how completely the avoidable risk was ruled out and how cheap the exit
        was — never by liquidity, volume or price change, because those look like upside and are not,
        and putting them in the sort would turn a risk list into an implied buy list.
      */}
      <Card>
        <SectionTitle aside={shortlist.length ? "last 24 hours" : undefined}>Best risk clearance</SectionTitle>
        {shortlist.length === 0 ? (
          <p className="text-sm text-slate-400">
            Nothing screened in the last day cleared enough of its checks to list. That is the usual
            result, and an empty shortlist is a finding in itself.
          </p>
        ) : (
          <>
            <ul className="space-y-2">
              {shortlist.map(({ row, rating }) => (
                <li key={row.id} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b hairline pb-2 last:border-0 last:pb-0">
                  <span className="min-w-0">
                    <span className={cn("mr-2 inline-flex rounded-full border px-2 py-0.5 text-[10px] capitalize", RATING_STYLE[rating.rating])}>{rating.rating}</span>
                    <span className="text-sm text-slate-200">{row.symbol ?? "unknown"}</span>
                    <span className="num ml-2 text-[11px] text-slate-500">{row.mint.slice(0, 4)}…{row.mint.slice(-4)}</span>
                  </span>
                  <span className="num text-[11px] text-slate-500">
                    exit {rating.exitCost != null ? pct(rating.exitCost) : "—"}
                    {rating.depthMultiple != null && <> · pool {rating.depthMultiple.toFixed(0)}× position</>}
                    {parseSnapshot(row.snapshot)?.sellProbeUsd != null && <> · rated at {usd(parseSnapshot(row.snapshot)!.sellProbeUsd!)}</>}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
              This ranks <b className="text-slate-300">how much of the avoidable risk has been ruled
              out</b>, and how cheaply you could get out at the size each was screened at. It is not a
              ranking of upside: no check here contains any information about where a price goes, and a
              token at the top of this list can still go to zero on its own. Note the size each was rated
              at — an automatic screen uses $50, and a token that exits cheaply at $50 may not at yours.
            </p>
          </>
        )}
      </Card>

      <Card>
        <SectionTitle aside={record.n ? `${record.n} token${record.n === 1 ? "" : "s"} settled` : "nothing settled yet"}>Does the screener work?</SectionTitle>
        {record.checkpoints.length > 0 && (
          <div className="mb-3">
            <p className="text-[11px] uppercase tracking-wide text-slate-500">Still tradeable at each checkpoint</p>
            <p className="num mt-1 text-sm text-slate-200">
              {record.checkpoints.map((c) => (
                <span key={c.hours} className="mr-4">{c.hours}h <span className={c.survivalRate >= 0.9 ? "text-edge" : "text-amber"}>{pct(c.survivalRate)}</span> <span className="text-[11px] text-slate-500">of {c.n} token{c.n === 1 ? "" : "s"}</span></span>
              ))}
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              These land within the hour rather than after a day, and they are the horizons you actually
              trade. Waiting for the {SETTLE_HOURS}-hour figure before learning anything would throw away
              the only timely signal there is.
            </p>
          </div>
        )}
        {record.n === 0 ? (
          <p className="text-sm text-slate-400">
            No screen has reached its {SETTLE_HOURS}-hour horizon yet — that horizon judges whether a token
            <em> rugged</em>, and it is about grading the screener, not about whether you may act on a
            result. The verdict above each screen was complete the moment it ran. Interim checks at{" "}
            {CHECKPOINT_HOURS.join("h and ")}h arrive far sooner. A calibrated survival probability appears
            once {SURVIVAL_MIN_SETTLED} screens have settled, not before.
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
                {record.n} of {SURVIVAL_MIN_SETTLED} settled <em>tokens</em> needed before a calibrated
                survival probability is fitted &mdash; distinct tokens, not screens, because a watched
                token is re-screened every few hours and those repeats are not independent outcomes.
                {record.screens > record.n && <> {record.screens} settled screens so far cover {record.n}.</>}
                {" "}Reading a rate off this few is how you fool yourself.
              </p>
            )}
          </>
        )}
      </Card>

      <SectionTitle aside={screens.length ? `last ${screens.length}` : undefined}>
        {show === "mine" ? "Your screens" : "All screens"}
      </SectionTitle>
      <p className="-mt-1 mb-2 text-[11px] text-slate-500">
        {autoCount > 0 ? (
          <>
            <span className="num">{autoCount.toLocaleString("en-US")}</span> screened automatically from
            tokens whose first pool has just opened — that is what builds the record above.{" "}
            <Link href={show === "mine" ? "/?show=all" : "/"} className="underline underline-offset-2">
              {show === "mine" ? "Show those too" : "Show only mine"}
            </Link>
          </>
        ) : (
          <>Automatic screening runs twice an hour and has not recorded anything yet.</>
        )}
        {hiddenCount > 0 && <> · <span className="num">{hiddenCount}</span> hidden, still counted in the record.</>}
      </p>
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
            const rating = rateRow(s);
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
                      {(Array.isArray(s.checkpoints) ? (s.checkpoints as unknown as Checkpoint[]) : []).map((c) => (
                        <span key={c.hours}> · {c.hours}h {c.survived ? <span className="text-edge">ok</span> : <span className="text-miss">{c.failureKind}</span>}</span>
                      ))}
                      {s.settledAt && <> · {s.survived ? <span className="text-edge">still tradeable at {SETTLE_HOURS}h</span> : <span className="text-miss">failed: {s.failureKind}</span>}</>}
                    </p>
                  </div>
                  <div className="text-right">
                    {s.source === "auto" && <span className="mr-2 rounded-md border hairline px-1.5 py-0.5 text-[10px] text-slate-500">auto</span>}
                    {rating && <span className={cn("mr-2 inline-flex rounded-full border px-2.5 py-1 text-xs capitalize", RATING_STYLE[rating.rating])}>{rating.rating}</span>}
                    <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-xs capitalize", GRADE_STYLE[s.grade] ?? "hairline")}>{s.grade}</span>
                    <div className="num mt-1 text-[11px] text-slate-500">{s.safety}/100</div>
                    <div className="mt-0.5 text-[11px] text-slate-500">
                      {n.pass} cleared · {n.fail} failed · {n.unknown} unavailable
                    </div>
                    <div className="mt-1"><RemoveButton id={s.id} /></div>
                  </div>
                </div>
                {rating && (
                  <div className="mb-3 rounded-lg border hairline bg-black/20 p-3">
                    <p className="text-[12px] leading-relaxed text-slate-300">{rating.verdict}</p>
                    {rating.holdingBack.length > 0 && (
                      <>
                        <p className="mt-2 text-[10px] uppercase tracking-wide text-slate-500">Holding it back</p>
                        <ul className="mt-0.5 space-y-0.5">
                          {rating.holdingBack.map((h, i) => <li key={i} className="text-[11px] text-slate-400">· {h}</li>)}
                        </ul>
                      </>
                    )}
                    {rating.wouldRaise.length > 0 && (
                      <>
                        <p className="mt-2 text-[10px] uppercase tracking-wide text-slate-500">What would change it</p>
                        <ul className="mt-0.5 space-y-0.5">
                          {rating.wouldRaise.map((h, i) => <li key={i} className="text-[11px] text-ice/80">· {h}</li>)}
                        </ul>
                      </>
                    )}
                  </div>
                )}
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
