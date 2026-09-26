import { riskProfile } from "@/lib/queries";
import { prisma } from "@/lib/db";
import { sizePosition, checkLimits } from "@/lib/risk";
import { RiskForm } from "./form";
import { Card, SectionTitle, cn } from "@/components/ui";

export const dynamic = "force-dynamic";
export const metadata = { title: "Risk sizing" };

export default async function Risk() {
  const risk = await riskProfile();
  const open = await prisma.trade.findMany({ where: { closedAt: null }, include: { instrument: true } });
  const exposure = open.map((t) => ({ market: t.instrument.market as string, riskPct: (t.riskAmount / risk.accountSize) * 100 }));
  const limits = checkLimits(exposure, { market: "CRYPTO", riskPct: risk.riskPctPerTrade }, { maxOpenRisk: risk.maxOpenRisk, maxPerMarket: risk.maxPerMarket });
  const example = sizePosition({ accountSize: risk.accountSize, riskPct: risk.riskPctPerTrade, entry: 100, stop: 98, p: 0.55, rewardR: 1.5, kellyFraction: risk.kellyFraction });

  return (
    <>
      <header className="mb-4">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Risk sizing</h1>
        <p className="mt-1 max-w-2xl text-sm text-slate-400">
          Sizing is the part of trading you fully control, and the part that decides whether an edge survives a losing run.
          These settings drive the size shown on every call.
        </p>
      </header>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card><SectionTitle>Your rules</SectionTitle><RiskForm risk={{ accountSize: risk.accountSize, riskPctPerTrade: risk.riskPctPerTrade, kellyFraction: risk.kellyFraction, maxOpenRisk: risk.maxOpenRisk, maxPerMarket: risk.maxPerMarket }} /></Card>
        <Card>
          <SectionTitle aside="worked example">What that means</SectionTitle>
          <p className="text-sm text-slate-300">
            On a trade entered at 100 with a stop at 98, you would risk{" "}
            <span className="num text-slate-50">{example.cashRisk.toFixed(2)}</span> and trade{" "}
            <span className="num text-slate-50">{example.units.toFixed(3)}</span> units (notional{" "}
            <span className="num">{example.notional.toFixed(2)}</span>).
          </p>
          <ul className="mt-3 space-y-1.5 text-[13px] text-slate-400">
            <li>· A 10-loss run costs <span className="num text-miss">{(risk.riskPctPerTrade * 10).toFixed(0)}%</span> of the account. Runs that long happen: at a 45% hit rate, roughly once every 500 trades.</li>
            <li>· Quarter Kelly is used, capped by your per-trade risk. Full Kelly maximises growth but produces drawdowns most people cannot hold.</li>
            <li>· Open risk now: <span className={cn("num", limits.openRisk > risk.maxOpenRisk ? "text-miss" : "text-slate-200")}>{limits.openRisk.toFixed(1)}%</span> of {risk.maxOpenRisk}% allowed, across {open.length} open trade{open.length === 1 ? "" : "s"}.</li>
            {!limits.ok && limits.reasons.map((r) => <li key={r} className="text-amber">· A new crypto trade would break a limit: {r}.</li>)}
          </ul>
        </Card>
      </div>
    </>
  );
}
