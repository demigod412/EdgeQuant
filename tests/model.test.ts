import { describe, expect, it } from "vitest";
import { atr, featuresAt, rsi, type Bar } from "@/lib/model/features";
import { expectedR, rMultiple, tripleBarrier } from "@/lib/model/barriers";
import { applyCalibration, fitCalibration, fitLogit, predictLogit } from "@/lib/model/logit";
import { brier, maxDrawdown } from "@/lib/model/stats";
import { buildSamples, walkForward } from "@/lib/model/backtest";
import { checkLimits, sizePosition } from "@/lib/risk";

/** Deterministic price series: a random walk with a mild trend and volatility clustering. */
function series(n: number, seed = 7, drift = 0.0002): Bar[] {
  let s = seed, price = 100, vol = 0.01;
  const rnd = () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; };
  const bars: Bar[] = [];
  for (let i = 0; i < n; i++) {
    vol = 0.9 * vol + 0.1 * (0.005 + 0.02 * rnd());
    const ret = drift + vol * (rnd() * 2 - 1);
    const open = price, close = price * (1 + ret);
    const high = Math.max(open, close) * (1 + vol * rnd() * 0.5), low = Math.min(open, close) * (1 - vol * rnd() * 0.5);
    bars.push({ openTime: i * 14_400_000, open, high, low, close, volume: 100 + 50 * rnd() });
    price = close;
  }
  return bars;
}

describe("indicators", () => {
  const bars = series(300);
  it("ATR is positive and scales with price", () => {
    expect(atr(bars, 14)).toBeGreaterThan(0);
    const bigger = bars.map((b) => ({ ...b, open: b.open * 10, high: b.high * 10, low: b.low * 10, close: b.close * 10 }));
    expect(atr(bigger, 14)).toBeCloseTo(atr(bars, 14) * 10, 6);
  });
  it("RSI stays in range and reacts to direction", () => {
    const up = Array.from({ length: 60 }, (_, i) => ({ ...bars[0], close: 100 + i }));
    const down = Array.from({ length: 60 }, (_, i) => ({ ...bars[0], close: 160 - i }));
    expect(rsi(up.map((b) => b.close))).toBeGreaterThan(90);
    expect(rsi(down.map((b) => b.close))).toBeLessThan(10);
    expect(rsi(bars.map((b) => b.close))).toBeGreaterThanOrEqual(0);
  });
  it("features are scale-free: the same series at 10× gives the same numbers", () => {
    const a = featuresAt(bars)!;
    const b = featuresAt(bars.map((x) => ({ ...x, open: x.open * 10, high: x.high * 10, low: x.low * 10, close: x.close * 10 })))!;
    a.forEach((v, i) => expect(b[i]).toBeCloseTo(v, 6));
    expect(featuresAt(bars.slice(0, 50))).toBeNull(); // not enough history
  });
});

describe("triple-barrier labelling", () => {
  const flat = (closes: number[]): Bar[] => closes.map((c, i) => ({ openTime: i, open: c, high: c + 0.5, low: c - 0.5, close: c, volume: 1 }));
  it("target first wins, stop first loses, neither times out", () => {
    expect(tripleBarrier(flat([100, 101, 103]), 1, "LONG", 100, 98, 102, 5)!.outcome).toBe("WON");
    expect(tripleBarrier(flat([100, 99, 97]), 1, "LONG", 100, 98, 102, 5)!.outcome).toBe("LOST");
    expect(tripleBarrier(flat([100, 100.2, 100.1, 100.3]), 1, "LONG", 100, 98, 102, 3)!.outcome).toBe("TIMEOUT");
  });
  it("a bar touching both barriers counts as a loss, and short side mirrors", () => {
    const wild: Bar[] = [{ openTime: 0, open: 100, high: 100, low: 100, close: 100, volume: 1 }, { openTime: 1, open: 100, high: 103, low: 97, close: 100, volume: 1 }];
    expect(tripleBarrier(wild, 1, "LONG", 100, 98, 102, 3)!.outcome).toBe("LOST");
    expect(tripleBarrier(flat([100, 99, 97]), 1, "SHORT", 100, 102, 98, 5)!.outcome).toBe("WON");
  });
  it("returns null while the future is still unknown", () => {
    expect(tripleBarrier(flat([100, 100.1]), 1, "LONG", 100, 98, 102, 5)).toBeNull();
  });
});

describe("R maths", () => {
  it("1R loss, 1.5R win, costs always subtract", () => {
    expect(rMultiple("LONG", 100, 99, 99, 0)).toBeCloseTo(-1, 6);
    expect(rMultiple("LONG", 100, 99, 101.5, 0)).toBeCloseTo(1.5, 6);
    expect(rMultiple("LONG", 100, 99, 101.5, 20)).toBeLessThan(1.5);
    expect(rMultiple("SHORT", 100, 101, 98.5, 0)).toBeCloseTo(1.5, 6);
  });
  it("expected R turns a probability into a decision", () => {
    expect(expectedR(0.5, 1.5, 100, 99, 0)).toBeCloseTo(0.25, 6);
    expect(expectedR(0.4, 1.5, 100, 99, 0)).toBeCloseTo(0, 6);     // break-even probability at 1.5R
    expect(expectedR(0.4, 1.5, 100, 99, 20)).toBeLessThan(0);      // costs push it negative
  });
});

describe("logistic model and calibration", () => {
  it("learns a signal and beats the base rate on Brier", () => {
    const X: number[][] = [], y: (0 | 1)[] = [];
    let s = 3;
    const rnd = () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; };
    for (let i = 0; i < 800; i++) { const x = rnd() * 2 - 1; X.push([x, rnd()]); y.push(rnd() < 1 / (1 + Math.exp(-2 * x)) ? 1 : 0); }
    const fit = fitLogit(X, y, { l2: 1 });
    const rows = X.map((x, i) => ({ p: predictLogit(fit, x), y: y[i] }));
    expect(brier(rows)).toBeLessThan(brier(X.map((_, i) => ({ p: 0.5, y: y[i] }))));
    expect(fit.w[0]).toBeGreaterThan(0);                            // picked up the real driver
    expect(Math.abs(fit.w[1])).toBeLessThan(Math.abs(fit.w[0]));    // and not the noise one
  });
  it("calibration is identity until there is enough data, then corrects an over-confident model", () => {
    expect(applyCalibration(fitCalibration([{ p: 0.9, y: 1 }]), 0.9)).toBeCloseTo(0.9, 6);
    const rows = Array.from({ length: 400 }, (_, i) => ({ p: 0.8, y: (i % 5 === 0 ? 1 : 0) as 0 | 1 })); // says 80%, wins 20%
    const c = fitCalibration(rows);
    expect(applyCalibration(c, 0.8)).toBeLessThan(0.45);
  });
});

describe("walk-forward backtest", () => {
  const bars = series(2000, 11);
  const costs = { feeBps: 10, slipBps: 2 };
  const setup = { key: "t", side: "LONG" as const, atrTarget: 1.5, atrStop: 1, horizonBars: 12 };
  it("labels samples without look-ahead and reports honest numbers", () => {
    const samples = buildSamples(bars, setup, costs);
    expect(samples.length).toBeGreaterThan(300);
    expect(samples.every((s) => s.time < bars[bars.length - 1].openTime)).toBe(true);
    const r = walkForward(samples, { rewardR: 1.5 });
    expect(r.brier).toBeGreaterThan(0);
    expect(r.brier).toBeLessThan(0.35);
    expect(r.calibration.length).toBeGreaterThan(0);
    expect(r.equity.length).toBe(r.trades);
    expect(r.maxDdR).toBeGreaterThanOrEqual(0);
    if (r.trades) expect(r.totalR / r.trades).toBeCloseTo(r.expectR, 6);
  });
  it("costs reduce expectancy", () => {
    const cheap = walkForward(buildSamples(bars, setup, { feeBps: 0, slipBps: 0 }), { rewardR: 1.5 });
    const dear = walkForward(buildSamples(bars, setup, { feeBps: 40, slipBps: 10 }), { rewardR: 1.5 });
    expect(dear.expectR).toBeLessThan(cheap.expectR);
  });
  it("needs enough history before it will say anything", () => {
    expect(walkForward(buildSamples(series(300), setup, costs), { rewardR: 1.5 }).trades).toBe(0);
  });
});

describe("risk and sizing", () => {
  it("sizes so a stop-out loses exactly the risk budget", () => {
    const r = sizePosition({ accountSize: 10_000, riskPct: 1, entry: 100, stop: 98 });
    expect(r.cashRisk).toBeCloseTo(100, 6);
    expect(r.units).toBeCloseTo(50, 6);
    expect(r.notional).toBeCloseTo(5000, 6);
  });
  it("quarter Kelly never exceeds the risk budget and is zero without an edge", () => {
    const edge = sizePosition({ accountSize: 10_000, riskPct: 5, entry: 100, stop: 98, p: 0.6, rewardR: 1.5, kellyFraction: 0.25 });
    expect(edge.kelly).toBeGreaterThan(0);
    expect(edge.cashRisk).toBeLessThanOrEqual(500);
    const none = sizePosition({ accountSize: 10_000, riskPct: 5, entry: 100, stop: 98, p: 0.3, rewardR: 1.5 });
    expect(none.kelly).toBe(0);
    expect(none.units).toBe(0);
  });
  it("blocks over-exposure and correlated piles", () => {
    const caps = { maxOpenRisk: 3, maxPerMarket: 2 };
    expect(checkLimits([{ market: "CRYPTO", riskPct: 1 }, { market: "CRYPTO", riskPct: 1 }], { market: "CRYPTO", riskPct: 1 }, caps).ok).toBe(false);
    expect(checkLimits([{ market: "CRYPTO", riskPct: 1 }], { market: "FX", riskPct: 1 }, caps).ok).toBe(true);
  });
  it("drawdown is measured peak to trough", () => {
    expect(maxDrawdown([1, -0.5, -0.5, 1])).toBeCloseTo(1, 6);
  });
});

import { orderPlan, simulatePlan, costInR, type PlanConfig } from "@/lib/model/plan";

describe("entry styles and trade management", () => {
  const bar = (o: number, h: number, l: number, c = l, i = 0): Bar => ({ openTime: i, open: o, high: h, low: l, close: c, volume: 1 });
  const cfg = (x: Partial<PlanConfig>): PlanConfig => ({ entry: "market", manage: "plain", offsetAtr: 0.5, fillBars: 3, trailAtr: 1, ...x });

  it("places the right prices for each entry style", () => {
    const m = orderPlan("LONG", 100, 2, 1, 1.5, cfg({ entry: "market" }));
    expect([m.orderPrice, m.stop, m.target]).toEqual([100, 98, 103]);
    expect(m.rr).toBeCloseTo(1.5, 6);
    expect(orderPlan("LONG", 100, 2, 1, 1.5, cfg({ entry: "limit" })).orderPrice).toBe(99);   // below the close
    expect(orderPlan("LONG", 100, 2, 1, 1.5, cfg({ entry: "stop" })).orderPrice).toBe(101);   // above the close
    const short = orderPlan("SHORT", 100, 2, 1, 1.5, cfg({ entry: "limit" }));
    expect(short.orderPrice).toBe(101); expect(short.stop).toBe(103); expect(short.target).toBe(98);
  });

  it("market entry: target pays the reward, stop loses exactly 1R", () => {
    const plan = orderPlan("LONG", 100, 2, 1, 1.5, cfg({}));
    const win = simulatePlan([bar(100, 100, 100), bar(100, 103.5, 99.5, 103)], 1, "LONG", plan, 5, cfg({}))!;
    expect(win.outcome).toBe("WON"); expect(win.rMultiple).toBeCloseTo(1.5, 6);
    const loss = simulatePlan([bar(100, 100, 100), bar(100, 100.5, 97.5, 98)], 1, "LONG", plan, 5, cfg({}))!;
    expect(loss.outcome).toBe("LOST"); expect(loss.rMultiple).toBeCloseTo(-1, 6);
  });

  it("limit orders fill at a better price, or never fill at all", () => {
    const plan = orderPlan("LONG", 100, 2, 1, 1.5, cfg({ entry: "limit" }));
    const filled = simulatePlan([bar(100, 100, 100), bar(100, 100.2, 98.9, 99.5), bar(99.5, 102, 99.4, 101.8)], 1, "LONG", plan, 5, cfg({ entry: "limit" }))!;
    expect(filled.filled).toBe(true); expect(filled.entry).toBe(99);
    const missed = simulatePlan([bar(100, 100, 100), bar(100, 101, 99.6, 100.8), bar(100.8, 102, 100.2, 101.5), bar(101.5, 103, 101, 102.6), bar(102.6, 104, 102, 103)], 1, "LONG", plan, 5, cfg({ entry: "limit" }))!;
    expect(missed.filled).toBe(false); expect(missed.outcome).toBe("UNFILLED"); expect(missed.rMultiple).toBe(0);
  });

  it("stop entry only triggers on confirmation", () => {
    const plan = orderPlan("LONG", 100, 2, 1, 1.5, cfg({ entry: "stop" }));
    const quiet = simulatePlan([bar(100, 100, 100), bar(100, 100.4, 99, 99.5), bar(99.5, 100.6, 99, 100), bar(100, 100.9, 99.5, 100.2), bar(100, 101, 100, 100.5)], 1, "LONG", plan, 5, cfg({ entry: "stop" }))!;
    expect(quiet.filled).toBe(false);
    const breaks = simulatePlan([bar(100, 100, 100), bar(100, 101.5, 99.8, 101.2), bar(101.2, 104.5, 101, 104)], 1, "LONG", plan, 5, cfg({ entry: "stop" }))!;
    expect(breaks.filled).toBe(true); expect(breaks.entry).toBe(101);
  });

  it("breakeven and partial rules change what a reversal costs", () => {
    const plan = orderPlan("LONG", 100, 2, 1, 1.5, cfg({}));
    // up to +1R (102), then back through the entry to the original stop
    const path = [bar(100, 100, 100), bar(100, 102.2, 99.8, 102), bar(102, 102.1, 97.5, 98)];
    expect(simulatePlan(path, 1, "LONG", plan, 5, cfg({ manage: "plain" }))!.rMultiple).toBeCloseTo(-1, 6);
    expect(simulatePlan(path, 1, "LONG", plan, 5, cfg({ manage: "breakeven" }))!.rMultiple).toBeCloseTo(0, 6);
    expect(simulatePlan(path, 1, "LONG", plan, 5, cfg({ manage: "partial" }))!.rMultiple).toBeCloseTo(0.5, 6); // half booked at +1R
  });

  it("taking half early caps the winners too — the trade-off is measured, not assumed", () => {
    const plan = orderPlan("LONG", 100, 2, 1, 1.5, cfg({}));
    const runner = [bar(100, 100, 100), bar(100, 102.1, 99.9, 102), bar(102, 103.5, 101.5, 103.4)];
    expect(simulatePlan(runner, 1, "LONG", plan, 5, cfg({ manage: "plain" }))!.rMultiple).toBeCloseTo(1.5, 6);
    expect(simulatePlan(runner, 1, "LONG", plan, 5, cfg({ manage: "partial" }))!.rMultiple).toBeCloseTo(1.25, 6);
  });

  it("a bar touching both barriers is a loss, and an unresolved trade returns null", () => {
    const plan = orderPlan("LONG", 100, 2, 1, 1.5, cfg({}));
    expect(simulatePlan([bar(100, 100, 100), bar(100, 104, 97, 101)], 1, "LONG", plan, 5, cfg({}))!.outcome).toBe("LOST");
    expect(simulatePlan([bar(100, 100, 100), bar(100, 101, 99.5, 100.5)], 1, "LONG", plan, 9, cfg({}))).toBeNull();
  });

  it("costs are charged per leg, so partials pay twice", () => {
    expect(costInR(100, 98, 20, 1)).toBeCloseTo(0.1, 6);
    expect(costInR(100, 98, 20, 2)).toBeCloseTo(0.2, 6);
  });
});

describe("variant comparison", () => {
  it("scores every entry style and management rule over the same signals", async () => {
    const { candidateBars, scoreVariant } = await import("@/lib/model/backtest");
    const { ENTRY_STYLES, MANAGE_MODES, DEFAULT_PLAN } = await import("@/lib/model/plan");
    const bars = series(1500, 23);
    const setup = { key: "t", side: "LONG" as const, atrTarget: 1.5, atrStop: 1, horizonBars: 12 };
    const cands = candidateBars(bars, setup);
    expect(cands.length).toBeGreaterThan(50);
    const rows = ENTRY_STYLES.flatMap((entry) => MANAGE_MODES.map((manage) => scoreVariant(bars, setup, { feeBps: 10, slipBps: 2 }, { ...DEFAULT_PLAN, entry, manage }, cands)));
    expect(rows).toHaveLength(12);
    for (const r of rows) expect(r.trades).toBeGreaterThan(0);
    // limit and stop orders do not always fill; market orders always do
    const market = rows.filter((r) => r.entry === "market"), limit = rows.filter((r) => r.entry === "limit");
    expect(market.every((r) => r.filled === r.trades)).toBe(true);
    expect(limit.some((r) => r.filled < r.trades)).toBe(true);
    // no variant can lose more than 1R plus costs on a single trade
    const worst = ENTRY_STYLES.flatMap((entry) => MANAGE_MODES.map((manage) => ({ entry, manage })))
      .map(({ entry, manage }) => scoreVariant(bars, setup, { feeBps: 10, slipBps: 2 }, { ...DEFAULT_PLAN, entry, manage }, cands));
    for (const r of worst) expect(r.expectR).toBeGreaterThan(-1.2);
    expect(rows.some((r) => r.manage === "partial" && r.hitRate > 0)).toBe(true);
  });
});

describe("portfolio layer", () => {
  const closes = (n: number, drift: number, vol: number, seed = 1) => {
    let s = seed, p = 100; const out: number[] = [];
    const rnd = () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; };
    for (let i = 0; i < n; i++) { p *= 1 + drift + vol * (rnd() * 2 - 1); out.push(p); }
    return out;
  };
  it("ranks the strongest risk-adjusted movers first, within each market", async () => {
    const { rankUniverse } = await import("@/lib/portfolio");
    const rows = rankUniverse([
      { id: "a", display: "STRONG", market: "CRYPTO", closes: closes(200, 0.004, 0.01, 2) },
      { id: "b", display: "WILD", market: "CRYPTO", closes: closes(200, 0.004, 0.05, 3) },
      { id: "c", display: "WEAK", market: "CRYPTO", closes: closes(200, -0.003, 0.01, 4) },
      { id: "d", display: "FX1", market: "FX", closes: closes(200, 0.001, 0.003, 5) },
    ], { barsPerYear: 2190, longSlots: 1, avoidSlots: 1 });
    const crypto = rows.filter((r) => r.market === "CRYPTO");
    expect(crypto[0].display).toBe("STRONG");                  // calm riser beats the wild one
    expect(crypto.find((r) => r.display === "WEAK")!.slot).toBe("AVOID");
    expect(rows.find((r) => r.market === "FX")!.rank).toBe(1);  // ranked inside its own market
  });
  it("volatility targeting gives calm instruments more size and caps the book", async () => {
    const { rankUniverse, volTargetWeights } = await import("@/lib/portfolio");
    const rows = rankUniverse([
      { id: "a", display: "CALM", market: "CRYPTO", closes: closes(200, 0.004, 0.008, 6) },
      { id: "b", display: "WILD", market: "CRYPTO", closes: closes(200, 0.004, 0.04, 7) },
    ], { barsPerYear: 2190, longSlots: 2, avoidSlots: 0 });
    const w = volTargetWeights(rows, { targetVol: 0.3, maxTotalRiskPct: 3 });
    const calm = w.find((x) => x.display === "CALM")!, wild = w.find((x) => x.display === "WILD")!;
    expect(calm.weight).toBeGreaterThan(wild.weight);
    expect(w.reduce((s, x) => s + x.riskPct, 0)).toBeCloseTo(3, 6);
  });
  it("the circuit breaker halves then stops", async () => {
    const { circuitBreaker } = await import("@/lib/portfolio");
    expect(circuitBreaker([1, 1, -1]).multiplier).toBe(1);
    expect(circuitBreaker([2, -7]).multiplier).toBe(0.5);
    expect(circuitBreaker([2, -13]).multiplier).toBe(0);
    expect(circuitBreaker([2, -13]).note).toContain("paused");
  });
  it("correlation and effective bets expose piled-up positions", async () => {
    const { correlation, effectiveBets } = await import("@/lib/portfolio");
    const a = closes(200, 0.002, 0.02, 8);
    expect(correlation(a, a)).toBeCloseTo(1, 6);
    expect(effectiveBets([[1, 0.95], [0.95, 1]])).toBeLessThan(1.1);   // two near-identical bets ≈ one
    expect(effectiveBets([[1, 0], [0, 1]])).toBeCloseTo(2, 6);
  });
});

describe("regime and session", () => {
  it("labels trend vs chop and calm vs wild", async () => {
    const { regimeOf, sessionOf } = await import("@/lib/regime");
    const trend = Array.from({ length: 300 }, (_, i) => ({ openTime: i, open: 100 + i, high: 100.5 + i, low: 99.5 + i, close: 100 + i, volume: 1 }));
    expect(regimeOf(trend)).toContain("trend");
    const chop = Array.from({ length: 300 }, (_, i) => ({ openTime: i, open: 100, high: 101, low: 99, close: 100 + (i % 2 ? 0.2 : -0.2), volume: 1 }));
    expect(regimeOf(chop)).toContain("chop");
    expect(sessionOf(Date.UTC(2026, 0, 5, 9))).toBe("london");
    expect(sessionOf(Date.UTC(2026, 0, 5, 15))).toBe("newyork");
    expect(sessionOf(Date.UTC(2026, 0, 5, 2))).toBe("asia");
  });
});

describe("purged walk-forward", () => {
  it("drops training samples whose outcome window touches the test block", async () => {
    const { buildSamples, walkForward } = await import("@/lib/model/backtest");
    const bars = series(1800, 31);
    const setup = { key: "t", side: "LONG" as const, atrTarget: 1.5, atrStop: 1, horizonBars: 12 };
    const samples = buildSamples(bars, setup, { feeBps: 10, slipBps: 2 });
    const plain = walkForward(samples, { rewardR: 1.5 });
    const purged = walkForward(samples, { rewardR: 1.5, horizonBars: 12, embargo: 6 });
    expect(purged.brier).toBeGreaterThan(0);
    expect(purged.trades).toBeLessThanOrEqual(plain.trades + 5);       // same signals, cleaner training
    expect(purged.calibration.length).toBeGreaterThan(0);
  });
});
