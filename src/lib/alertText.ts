/* Message builders — pure, so they can be unit-tested without touching settings or the database. */
const n = (x: number) => (Math.abs(x) >= 100 ? x.toFixed(2) : x.toPrecision(6));

/** The message that arrives when a call is made: a complete ticket, nothing to look up. */
export function entryMessage(a: { instrument: string; side: string; setup: string; timeframe: string; style: string;
  order: number; stop: number; target: number; rr: number; p: number; edge: number; units: number; risk: number; horizonBars: number }) {
  return [
    `<b>${a.instrument} · ${a.side}</b> — ${a.setup} (${a.timeframe})`,
    `${a.style}: <b>${n(a.order)}</b>`,
    `Stop <b>${n(a.stop)}</b> · Target <b>${n(a.target)}</b> · R:R 1 : ${a.rr.toFixed(2)}`,
    `Model ${(a.p * 100).toFixed(0)}% · edge ${a.edge >= 0 ? "+" : ""}${a.edge.toFixed(2)}R after costs`,
    `Size ${a.units.toPrecision(4)} units · risking ${a.risk.toFixed(2)}`,
    `Valid ${a.horizonBars} bars, then close at market.`,
    `<i>Estimate, not advice. Stop is part of the plan.</i>`,
  ].join("\n");
}

export function exitMessage(a: { instrument: string; side: string; outcome: string; exit: number; r: number; held: string }) {
  const face = a.r > 0 ? "✅" : a.r < 0 ? "❌" : "➖";
  return `${face} <b>${a.instrument} ${a.side}</b> closed ${a.outcome.toLowerCase()} at <b>${n(a.exit)}</b> · <b>${a.r >= 0 ? "+" : ""}${a.r.toFixed(2)}R</b> after costs · held ${a.held}`;
}

export function summaryMessage(a: { open: number; settled: number; wonToday: number; rToday: number; expectancy: number; total: number }) {
  return [`<b>EdgeQuant daily summary</b>`,
    `Settled today: ${a.settled} (${a.wonToday} won) · ${a.rToday >= 0 ? "+" : ""}${a.rToday.toFixed(2)}R`,
    `Open calls: ${a.open}`,
    `All time: expectancy ${a.expectancy.toFixed(3)}R over ${a.total} calls`].join("\n");
}
