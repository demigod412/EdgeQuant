/** Position sizing and portfolio risk. This is the part that actually moves the needle. */
export interface RiskInput { accountSize: number; riskPct: number; entry: number; stop: number; kellyFraction?: number; p?: number; rewardR?: number }

/** Units to trade so that a stop-out loses exactly riskPct of the account, optionally scaled by fractional Kelly. */
export function sizePosition(i: RiskInput) {
  const risk = Math.abs(i.entry - i.stop);
  const cashRisk = (i.accountSize * i.riskPct) / 100;
  if (!(risk > 0) || !(cashRisk > 0)) return { units: 0, cashRisk: 0, kelly: 0, scaled: 0, notional: 0 };
  const b = i.rewardR ?? 1.5, p = i.p ?? 0;
  const kelly = p > 0 ? Math.max(0, (p * (b + 1) - 1) / b) : 0;          // full Kelly fraction of bankroll
  const scaled = Math.min(1, kelly * (i.kellyFraction ?? 0.25));          // quarter Kelly by default
  const use = p > 0 ? Math.min(cashRisk, i.accountSize * scaled) : cashRisk;
  return { units: use / risk, cashRisk: use, kelly, scaled, notional: (use / risk) * i.entry };
}

/** Would this new position break the open-risk or correlation caps? */
export function checkLimits(open: { market: string; riskPct: number }[], next: { market: string; riskPct: number }, caps: { maxOpenRisk: number; maxPerMarket: number }) {
  const openRisk = open.reduce((s, o) => s + o.riskPct, 0);
  const sameMarket = open.filter((o) => o.market === next.market).length;
  const reasons: string[] = [];
  if (openRisk + next.riskPct > caps.maxOpenRisk) reasons.push(`total open risk would be ${(openRisk + next.riskPct).toFixed(1)}% (cap ${caps.maxOpenRisk}%)`);
  if (sameMarket >= caps.maxPerMarket) reasons.push(`already ${sameMarket} open in ${next.market} (cap ${caps.maxPerMarket}) — correlated positions are one bet`);
  return { ok: reasons.length === 0, reasons, openRisk };
}

/** Plain-language read of a run of results, for the journal page. */
export function streakNote(rs: number[]) {
  let worst = 0, run = 0;
  for (const r of rs) { run = r < 0 ? run + 1 : 0; worst = Math.max(worst, run); }
  return { longestLosingRun: worst, wins: rs.filter((r) => r > 0).length, losses: rs.filter((r) => r <= 0).length };
}
