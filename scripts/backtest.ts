/**
 * Walk-forward backtest for every setup, then a like-for-like comparison of all 12 combinations
 * (3 entry styles × 4 management rules) over the SAME signals.
 *   cd /var/www/edgequant && npm run backtest
 */
import { PrismaClient } from "@prisma/client";
import { buildSamples, candidateBars, scoreVariant, totalBps, walkForward } from "../src/lib/model/backtest";
import { ENTRY_STYLES, MANAGE_MODES, DEFAULT_PLAN, ENTRY_LABEL, MANAGE_LABEL } from "../src/lib/model/plan";
import { ENTRY_RULES } from "../src/lib/setups";
import { barsOf } from "../src/lib/pipeline/ingest";

const db = new PrismaClient();
(async () => {
  const setups = await db.setup.findMany({ where: { enabled: true } });
  const instruments = await db.instrument.findMany({ where: { enabled: true } });
  for (const setup of setups) {
    const def = { key: setup.key, side: setup.side, atrTarget: setup.atrTarget, atrStop: setup.atrStop, horizonBars: setup.horizonBars, entryRule: ENTRY_RULES[setup.key] };
    const samples = [];
    const variants = new Map<string, { trades: number; filled: number; wins: number; totalR: number; ddSum: number }>();
    let costs = 0, n = 0;
    for (const inst of instruments) {
      const bars = await barsOf(db, inst.id, setup.timeframe, 3000);
      if (bars.length < 400) continue;
      samples.push(...buildSamples(bars, def, inst));
      const cands = candidateBars(bars, def);
      for (const entry of ENTRY_STYLES) for (const manage of MANAGE_MODES) {
        const r = scoreVariant(bars, def, inst, { ...DEFAULT_PLAN, entry, manage }, cands);
        const k = `${entry}|${manage}`, cur = variants.get(k) ?? { trades: 0, filled: 0, wins: 0, totalR: 0, ddSum: 0 };
        variants.set(k, { trades: cur.trades + r.trades, filled: cur.filled + r.filled, wins: cur.wins + Math.round(r.hitRate * r.filled), totalR: cur.totalR + r.totalR, ddSum: cur.ddSum + r.maxDdR });
      }
      costs += totalBps(inst); n++;
    }
    if (!samples.length) { console.log(`${setup.key}: no samples yet — sync more history`); continue; }
    samples.sort((a, b) => a.time - b.time);
    const wf = walkForward(samples, { rewardR: setup.atrTarget / setup.atrStop });
    await db.backtestRun.create({ data: {
      setupId: setup.id, label: `${new Date().toISOString().slice(0, 10)} walk-forward`,
      from: new Date(samples[0].time), to: new Date(samples[samples.length - 1].time),
      trades: wf.trades, hitRate: wf.hitRate, avgPredP: wf.avgPredP, expectR: wf.expectR, totalR: wf.totalR, maxDdR: wf.maxDdR, brier: wf.brier,
      baseline: wf.baseline as unknown as object, costsBps: n ? costs / n : 0, entryStyle: setup.entryStyle, manageMode: setup.manageMode,
      detail: { calibration: wf.calibration, equity: wf.equity.slice(-200),
        variants: [...variants.entries()].map(([k, v]) => { const [entry, manage] = k.split("|");
          return { entry, manage, trades: v.trades, filled: v.filled, hitRate: v.filled ? v.wins / v.filled : 0, expectR: v.trades ? v.totalR / v.trades : 0, totalR: v.totalR, maxDdR: v.ddSum }; })
          .sort((a, b) => b.expectR - a.expectR) } as unknown as object,
    } });
    const best = [...variants.entries()].map(([k, v]) => ({ k, e: v.trades ? v.totalR / v.trades : 0, t: v.trades })).sort((a, b) => b.e - a.e)[0];
    const [be, bm] = best.k.split("|");
    console.log(`${setup.key}: ${samples.length} samples · walk-forward ${wf.trades} trades, expectancy ${wf.expectR.toFixed(3)}R, Brier ${wf.brier.toFixed(3)} vs no-skill ${wf.baseline.randomWalkBrier.toFixed(3)}`);
    console.log(`   best combination: ${ENTRY_LABEL[be as "market"]} + ${MANAGE_LABEL[bm as "plain"]} → ${best.e.toFixed(3)}R over ${best.t} signals`);
  }
})().catch((e) => { console.error(e); process.exitCode = 1; }).finally(() => db.$disconnect());
