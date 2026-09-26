import type { Bar } from "./features";

/*
 * How a call is actually traded: the entry style, then the management rule.
 * Both change results, so both are simulated bar by bar and measured — never assumed.
 *
 * Pessimistic throughout: within a bar the stop is checked before the target, because a single OHLC bar
 * cannot tell us which came first. A backtest that assumes otherwise flatters itself.
 */
export type EntryStyle = "market" | "limit" | "stop";
export type ManageMode = "plain" | "breakeven" | "partial" | "trail";
export const ENTRY_STYLES: EntryStyle[] = ["market", "limit", "stop"];
export const MANAGE_MODES: ManageMode[] = ["plain", "breakeven", "partial", "trail"];
export const ENTRY_LABEL: Record<EntryStyle, string> = { market: "Market at bar close", limit: "Buy/sell limit (better price)", stop: "Stop entry (confirmation)" };
export const MANAGE_LABEL: Record<ManageMode, string> = { plain: "Stop and target only", breakeven: "Stop to breakeven at +1R", partial: "Half off at +1R, rest to target", trail: "ATR trail after +1R" };

export interface PlanConfig { entry: EntryStyle; manage: ManageMode; offsetAtr?: number; fillBars?: number; trailAtr?: number }
export const DEFAULT_PLAN: Required<PlanConfig> = { entry: "market", manage: "plain", offsetAtr: 0.5, fillBars: 3, trailAtr: 1 };

export interface OrderPlan { style: EntryStyle; orderPrice: number; stop: number; target: number; rr: number }

/** The prices to place: a market fill at the close, or a limit below / stop above it (mirrored for shorts). */
export function orderPlan(side: "LONG" | "SHORT", close: number, atrValue: number, atrStop: number, atrTarget: number, cfg: PlanConfig): OrderPlan {
  const dir = side === "LONG" ? 1 : -1, off = (cfg.offsetAtr ?? DEFAULT_PLAN.offsetAtr) * atrValue;
  const orderPrice = cfg.entry === "market" ? close : cfg.entry === "limit" ? close - dir * off : close + dir * off;
  return { style: cfg.entry, orderPrice, stop: orderPrice - dir * atrStop * atrValue, target: orderPrice + dir * atrTarget * atrValue, rr: atrTarget / atrStop };
}

export interface PlanResult { filled: boolean; fillIndex?: number; entry?: number; exitIndex?: number; exitPrice?: number; rMultiple?: number; outcome?: "WON" | "LOST" | "TIMEOUT" | "UNFILLED" }

/**
 * Walk the bars after a signal: wait for the fill (limit/stop orders may never fill), then apply the
 * management rule until a barrier or the time limit ends the trade. R is gross; costs are charged by the caller.
 */
export function simulatePlan(bars: Bar[], from: number, side: "LONG" | "SHORT", plan: OrderPlan, horizon: number, cfg: PlanConfig = DEFAULT_PLAN): PlanResult | null {
  const dir = side === "LONG" ? 1 : -1, fillBars = cfg.fillBars ?? DEFAULT_PLAN.fillBars;
  let fill = -1;
  if (plan.style === "market") fill = from - 1;                                  // filled at the signal bar's close
  else {
    for (let i = from; i < Math.min(bars.length, from + fillBars); i++) {
      const b = bars[i];
      const touched = plan.style === "limit" ? (side === "LONG" ? b.low <= plan.orderPrice : b.high >= plan.orderPrice)
                                             : (side === "LONG" ? b.high >= plan.orderPrice : b.low <= plan.orderPrice);
      if (touched) { fill = i; break; }
    }
    if (fill < 0) {
      if (from + fillBars > bars.length) return null;                            // still waiting: not scorable yet
      return { filled: false, outcome: "UNFILLED", rMultiple: 0 };
    }
  }

  const entry = plan.orderPrice, risk = Math.abs(entry - plan.stop);
  if (!(risk > 0)) return null;
  const start = fill + 1, end = start + horizon - 1, last = Math.min(end, bars.length - 1);

  let stop = plan.stop, booked = 0, size = 1, best = entry;
  const rOf = (price: number) => (dir * (price - entry)) / risk;
  for (let i = start; i <= last; i++) {
    const b = bars[i];
    const hitStop = side === "LONG" ? b.low <= stop : b.high >= stop;
    const hitTarget = side === "LONG" ? b.high >= plan.target : b.low <= plan.target;
    if (hitStop) return { filled: true, fillIndex: fill, entry, exitIndex: i, exitPrice: stop, rMultiple: booked + size * rOf(stop), outcome: booked > 0 && booked + size * rOf(stop) > 0 ? "WON" : "LOST" };
    if (hitTarget) return { filled: true, fillIndex: fill, entry, exitIndex: i, exitPrice: plan.target, rMultiple: booked + size * rOf(plan.target), outcome: "WON" };
    // management, evaluated on the bar's extreme in our favour
    const favour = side === "LONG" ? b.high : b.low;
    best = side === "LONG" ? Math.max(best, favour) : Math.min(best, favour);
    const reached1R = rOf(favour) >= 1;
    if (cfg.manage === "breakeven" && reached1R) stop = side === "LONG" ? Math.max(stop, entry) : Math.min(stop, entry);
    if (cfg.manage === "partial" && reached1R && size === 1) { booked = 0.5 * 1; size = 0.5; stop = entry; }   // half off at +1R, rest risk-free
    if (cfg.manage === "trail" && reached1R) {
      const trail = best - dir * (cfg.trailAtr ?? DEFAULT_PLAN.trailAtr) * risk;
      stop = side === "LONG" ? Math.max(stop, trail) : Math.min(stop, trail);
    }
  }
  if (end > bars.length - 1) return null;                    // still running: the bars needed are not here yet
  const close = bars[end].close;
  return { filled: true, fillIndex: fill, entry, exitIndex: end, exitPrice: close, rMultiple: booked + size * rOf(close), outcome: "TIMEOUT" };
}

/** Costs in R, charged on the entry notional (and on both halves when taking partials). */
export const costInR = (entry: number, stop: number, costBps: number, legs = 1) => {
  const risk = Math.abs(entry - stop);
  return risk > 0 ? (legs * entry * costBps) / 10_000 / risk : 0;
};
