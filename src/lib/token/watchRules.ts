/*
 * When a holding is worth interrupting you for.
 *
 * The screener answers "should I buy this" before the fact. Nothing answered "is this still what I
 * bought", and the four-hour re-screen is the wrong instrument for it: a rug takes minutes.
 *
 * ── What is watched, and what deliberately is not ───────────────────────────────────────────────────
 * Watched: the two things that stop you getting your money out at all — the pool draining, and the sale
 * ceasing to quote — plus the exit becoming expensive, and the distribution shifting under you. All of
 * them are measurable, and all of them are facts rather than forecasts.
 *
 * Not watched as a judgement: the price. This tool does not forecast it, and alerting on a price move of
 * its own choosing would be exactly the kind of implied advice the rest of the app avoids. A drawdown
 * trigger exists only when YOU set a stop, in which case it is your rule being enforced mechanically,
 * which is a different thing entirely.
 *
 * Pure, so every threshold can be tested. The probes themselves cost nothing: pool data and a sell quote
 * both come from keyless APIs, which is what makes a five-minute cadence affordable.
 */

export const WATCH = {
  /** Liquidity below this share of what it was at entry: the pool is going. */
  liquidityDropShare: 0.35,
  /** Below this in absolute terms there is no market left, whatever it started at. */
  liquidityFloorUsd: 1_000,
  /** Round-trip cost this much worse than at entry, in percentage points. */
  exitCostRise: 0.10,
  /** Round-trip cost worse than this, however it started. */
  exitCostCeiling: 0.25,
  /** One wallet or position gaining this much share of supply since entry. */
  concentrationRise: 0.10,
  /** The same warning is not repeated inside this many hours unless it gets worse. */
  repeatAfterHours: 6,
  /**
   * How often holder concentration is re-read from the chain, in minutes.
   *
   * Everything else in the fast loop is keyless and therefore free, so it runs every few minutes. This
   * one costs three RPC calls per holding, and accumulation is not a thing that happens in five minutes
   * anyway — so it gets a slower cadence of its own rather than being left out or run at the fast rate.
   * At half-hourly it is a few hundred calls a day per position: affordable for a real portfolio.
   */
  chainProbeMinutes: 30,
} as const;

/**
 * A floor on how much this token moves in ordinary trading.
 *
 * Taken from the published net change over six and twenty-four hours. A NET move is necessarily smaller
 * than the range it travelled to get there, so this understates the real swing — which is the useful
 * direction: if your stop is inside even this, it is certainly inside the noise. A number that can only
 * err towards "your stop is fine" would be the wrong way round.
 */
export function noiseFloor(move6h: number | null | undefined, move24h: number | null | undefined): number | null {
  const xs = [move6h, move24h].filter((x): x is number => typeof x === "number" && Number.isFinite(x)).map(Math.abs);
  return xs.length ? Math.max(...xs) : null;
}

/**
 * Is a stop set inside the token's ordinary movement?
 *
 * The app does not choose the number. It says whether the number means anything, which is the same
 * stance it takes everywhere else: a stop inside the noise band is not protection, it is a guarantee of
 * being stopped out by a move that carried no information.
 */
export function stopVerdict(stopPct: number | null | undefined, noise: number | null): { inNoise: boolean; note: string | null } {
  if (stopPct == null) return { inNoise: false, note: null };
  if (noise == null) return { inNoise: false, note: null };
  if (stopPct <= noise) {
    return { inNoise: true,
      note: `This token has moved at least ${pct(noise)} in ordinary trading recently, so a ${pct(stopPct)} stop will fire on movement that carries no information. Widen it, or rely on the liquidity and exit alerts instead — they catch the failure that actually traps you, and they do it while there is still a bid.` };
  }
  return { inNoise: false, note: `Recent ordinary movement is at least ${pct(noise)}, so a ${pct(stopPct)} stop sits outside it.` };
}

/** Is this holding due a chain read? Never read one before counts as due. */
export function dueForChainProbe(lastAt: Date | null | undefined, now = new Date()): boolean {
  if (!lastAt) return true;
  return now.getTime() - lastAt.getTime() >= WATCH.chainProbeMinutes * 60_000;
}

export type Severity = "critical" | "warning";

export interface WatchAlert {
  /** Stable identity for the warning, so the same one is not sent every five minutes. */
  key: string;
  severity: Severity;
  line: string;
}

export interface Baseline {
  liquidityUsd: number | null;
  exitCost: number | null;
  topHolderShare: number | null;
  priceUsd: number | null;
}

export interface Observation {
  liquidityUsd: number | null;
  /** Null means no sell quote came back at all. */
  exitCost: number | null;
  sellQuoted: boolean;
  topHolderShare: number | null;
  priceUsd: number | null;
}

const pct = (x: number) => `${(x * 100).toFixed(1)}%`;
const usd = (x: number) => `$${Math.round(x).toLocaleString("en-US")}`;

/**
 * How much liquidity a pool should have lost from the price move alone.
 *
 * A pool's dollar value falls when the token falls, with nothing withdrawn: in a constant-product pool
 * the quote reserve scales with the square root of the price, so value ∝ √price. A 58% price fall takes
 * 35% of the dollar liquidity with it on its own.
 *
 * That matters because the naive comparison — dollar liquidity against dollar liquidity — announces
 * "someone is taking the pool out" on an ordinary decline. It is the most important alert here, and an
 * alert that fires on price moves is one you learn to ignore.
 *
 * Exact for constant product; indicative for a concentrated pool, whose value moves with the price in a
 * shape that depends on where the ranges sit. The threshold is applied to the SHORTFALL against this
 * expectation, so the approximation costs sensitivity rather than raising false alarms.
 */
export function expectedLiquidity(baseLiquidity: number, basePrice: number, nowPrice: number): number {
  if (!(basePrice > 0) || !(nowPrice > 0)) return baseLiquidity;
  return baseLiquidity * Math.sqrt(nowPrice / basePrice);
}

/**
 * Liquidity actually withdrawn, as a share, net of what the price explains. Null when it cannot be told.
 *
 * Returns 0 rather than a negative number when the pool is deeper than expected: "more liquidity than
 * the price implies" is not a withdrawal, and a negative figure would only invite arithmetic on it.
 */
export function withdrawnShare(obs: Observation, base: Baseline): number | null {
  if (obs.liquidityUsd == null || !base.liquidityUsd) return null;
  const expected = base.priceUsd && obs.priceUsd
    ? expectedLiquidity(base.liquidityUsd, base.priceUsd, obs.priceUsd)
    : base.liquidityUsd;
  if (!(expected > 0)) return null;
  return Math.max(0, 1 - obs.liquidityUsd / expected);
}

/**
 * Everything worth saying about a holding right now, worst first.
 *
 * A missing measurement never raises an alert: an API that failed is not a pool that drained, and
 * crying wolf on an outage is how a warning system gets ignored.
 */
export function watchAlerts(
  obs: Observation,
  base: Baseline,
  opts: { stopLossPct?: number | null; maxHoldHours?: number | null; heldHours?: number | null } = {},
): WatchAlert[] {
  const out: WatchAlert[] = [];

  // ---- the two ways you cannot get out at all ---------------------------------------------------
  if (!obs.sellQuoted) {
    out.push({ key: "exit-blocked", severity: "critical",
      line: "A sale no longer quotes at your size. That is the honeypot shape: you can be holding something you cannot sell." });
  }
  if (obs.liquidityUsd != null && obs.liquidityUsd < WATCH.liquidityFloorUsd) {
    out.push({ key: "liquidity-gone", severity: "critical",
      line: `Liquidity is ${usd(obs.liquidityUsd)} — there is effectively no market left to sell into.` });
  } else {
    /*
     * Withdrawal, not repricing. Measured against what the price move alone accounts for, so a decline
     * does not get announced as a rug — see expectedLiquidity. Where no price is available on either
     * side this falls back to the raw comparison and says so, because a possible withdrawal is still
     * worth raising; it just cannot be distinguished from a fall.
     */
    const withdrawn = withdrawnShare(obs, base);
    const priced = base.priceUsd != null && obs.priceUsd != null;
    if (withdrawn != null && withdrawn > WATCH.liquidityDropShare) {
      out.push({ key: "liquidity-drop", severity: "critical",
        line: priced
          ? `Liquidity is ${pct(withdrawn)} below what the price move accounts for: ${usd(base.liquidityUsd!)} → ${usd(obs.liquidityUsd!)} while the price moved ${pct(obs.priceUsd! / base.priceUsd! - 1)}. That gap is liquidity being withdrawn, not the token repricing.`
          : `Liquidity is down ${pct(withdrawn)} since you opened: ${usd(base.liquidityUsd!)} → ${usd(obs.liquidityUsd!)}. No price was available to tell a withdrawal from a decline, so treat it as the former until you can see which.` });
    }
  }

  // ---- the exit getting expensive ---------------------------------------------------------------
  if (obs.exitCost != null) {
    if (obs.exitCost > WATCH.exitCostCeiling) {
      out.push({ key: "exit-costly", severity: "warning",
        line: `Getting out now costs ${pct(obs.exitCost)} of the position at your size.` });
    } else if (base.exitCost != null && obs.exitCost - base.exitCost > WATCH.exitCostRise) {
      out.push({ key: "exit-worse", severity: "warning",
        line: `Your exit has got more expensive: ${pct(base.exitCost)} at entry, ${pct(obs.exitCost)} now.` });
    }
  }

  // ---- the distribution shifting under you -------------------------------------------------------
  if (obs.topHolderShare != null && base.topHolderShare != null
      && obs.topHolderShare - base.topHolderShare > WATCH.concentrationRise) {
    out.push({ key: "concentration-rise", severity: "warning",
      line: `The largest holder has gone from ${pct(base.topHolderShare)} to ${pct(obs.topHolderShare)} of supply — someone is accumulating ahead of you in the queue to sell.` });
  }

  // ---- your stop, not ours ----------------------------------------------------------------------
  // Only fires because you set a number. The app has no opinion on where the price should be.
  if (opts.stopLossPct != null && obs.priceUsd != null && base.priceUsd) {
    const fall = 1 - obs.priceUsd / base.priceUsd;
    if (fall >= opts.stopLossPct) {
      out.push({ key: "stop-loss", severity: "critical",
        line: `Down ${pct(fall)} from your entry, past the ${pct(opts.stopLossPct)} stop you set.` });
    }
  }

  /*
   * A time stop, which for a new token is arguably a better rule than any price level: "this has not
   * worked in N hours" is mechanical, needs no forecast, and matches the discipline the rest of the app
   * already holds itself to — nothing on the trading side is held past six hours, and a memecoin has not
   * earned more patience than a BTC scalp.
   *
   * Like the price stop, it exists only because you set a number.
   */
  if (opts.maxHoldHours != null && opts.heldHours != null && opts.heldHours >= opts.maxHoldHours) {
    out.push({ key: "time-stop", severity: "critical",
      line: `Held ${opts.heldHours.toFixed(1)} hours, past the ${opts.maxHoldHours}-hour limit you set. Nothing is wrong with it; you decided in advance that this is when you stop waiting.` });
  }

  const rank = { critical: 0, warning: 1 } as const;
  return out.sort((a, b) => rank[a.severity] - rank[b.severity]);
}

/**
 * Should this alert actually be sent, given what was last sent?
 *
 * Silence is the default when nothing changed. A warning repeats only after the cooling-off period, and
 * an escalation to critical always goes out — the whole point is to interrupt you when it matters, which
 * means not interrupting you when it does not.
 */
export function shouldSend(
  alert: WatchAlert,
  last: { key: string | null; at: Date | null; severity?: Severity | null },
  now = new Date(),
): boolean {
  if (!last.key || !last.at) return true;
  if (last.key !== alert.key) return true;
  if (alert.severity === "critical" && last.severity === "warning") return true;
  return now.getTime() - last.at.getTime() >= WATCH.repeatAfterHours * 3600_000;
}

export type Action = "exit" | "reduce" | "hold";

/**
 * What the measurements say to do about a position you are already in.
 *
 * Built only from structural facts: can you still sell, is the pool still there, is the queue above you
 * getting worse. Deliberately NOT from the price — the app does not forecast one, and "the price fell"
 * is not a reason this tool is entitled to give. So this answers "can I still get out, and is that
 * getting harder", which is a narrower question than "should I sell" and the only one it can answer
 * honestly. The wording says as much.
 */
export function positionVerdict(
  alerts: WatchAlert[],
  opts: { queueLevel?: "severe" | "warn" | "ok" | "unknown"; withdrawn?: number | null; exitCost?: number | null },
): { action: Action; line: string } {
  const critical = alerts.filter((a) => a.severity === "critical");
  if (critical.length) {
    const own = critical.some((a) => a.key === "stop-loss" || a.key === "time-stop");
    const structural = critical.filter((a) => a.key !== "stop-loss" && a.key !== "time-stop");
    if (structural.length) {
      return { action: "exit",
        line: `Get out if you still can. ${structural[0].line} This is about the exit closing, not about the price.` };
    }
    return { action: "exit",
      line: own ? `${critical[0].line} Your rule, not a finding about the token — nothing structural has changed.` : critical[0].line };
  }

  const gettingWorse = (opts.withdrawn != null && opts.withdrawn > 0.1)
    || opts.queueLevel === "severe"
    || (opts.exitCost != null && opts.exitCost > 0.15);
  if (gettingWorse) {
    return { action: "reduce",
      line: "Your exit is getting worse rather than the token going wrong. Nothing here disqualifies it, but the room to leave is shrinking, so a smaller position is easier to get out of than this one." };
  }
  if (alerts.length) {
    return { action: "hold",
      line: "Worth reading, nothing urgent. The pool is intact and a sale still quotes at your size." };
  }
  return { action: "hold",
    line: "Nothing structural has changed since you opened it: the pool is intact, a sale still quotes at your size, and no one has moved ahead of you. This says nothing about where the price is going." };
}

/** The message body, for Telegram. */
export function watchMessage(a: { symbol: string | null; mint: string; sizeUsd: number; alerts: WatchAlert[] }) {
  const worst = a.alerts[0]?.severity === "critical" ? "⚠️ <b>Act now</b>" : "<b>Worth a look</b>";
  return [
    `${worst} — ${a.symbol ?? "token"} (${usd(a.sizeUsd)} position)`,
    ...a.alerts.map((x) => `· ${x.line}`),
    `<code>${a.mint}</code>`,
  ].join("\n");
}
