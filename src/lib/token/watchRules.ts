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
 * Everything worth saying about a holding right now, worst first.
 *
 * A missing measurement never raises an alert: an API that failed is not a pool that drained, and
 * crying wolf on an outage is how a warning system gets ignored.
 */
export function watchAlerts(
  obs: Observation,
  base: Baseline,
  opts: { stopLossPct?: number | null } = {},
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
  } else if (obs.liquidityUsd != null && base.liquidityUsd && obs.liquidityUsd < base.liquidityUsd * (1 - WATCH.liquidityDropShare)) {
    const gone = 1 - obs.liquidityUsd / base.liquidityUsd;
    out.push({ key: "liquidity-drop", severity: "critical",
      line: `Liquidity is down ${pct(gone)} since you opened: ${usd(base.liquidityUsd)} → ${usd(obs.liquidityUsd)}. Someone is taking the pool out.` });
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

/** The message body, for Telegram. */
export function watchMessage(a: { symbol: string | null; mint: string; sizeUsd: number; alerts: WatchAlert[] }) {
  const worst = a.alerts[0]?.severity === "critical" ? "⚠️ <b>Act now</b>" : "<b>Worth a look</b>";
  return [
    `${worst} — ${a.symbol ?? "token"} (${usd(a.sizeUsd)} position)`,
    ...a.alerts.map((x) => `· ${x.line}`),
    `<code>${a.mint}</code>`,
  ].join("\n");
}
