import { Card, SectionTitle } from "@/components/ui";
export const metadata = { title: "Methodology" };
const F = ({ children }: { children: React.ReactNode }) => <pre className="num overflow-x-auto rounded-lg border hairline bg-black/30 p-3 text-[11px] leading-relaxed text-slate-300">{children}</pre>;

export default function Methodology() {
  return (
    <div className="space-y-4">
      <header><h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Methodology</h1>
        <p className="mt-1 max-w-2xl text-sm text-slate-400">Everything the app does, in the open. If a number here cannot be reproduced from the formulas below, treat it as a bug.</p></header>

      <Card><SectionTitle>What a call is</SectionTitle>
        <F>{`at each CLOSED bar:  entry = close,  stop = entry ∓ atrStop × ATR(14),  target = entry ± atrTarget × ATR(14)
outcome = whichever barrier the following bars touch first, or TIMEOUT after horizonBars
a bar that touches both barriers counts as a LOSS (pessimistic: the record can't flatter itself)
R = (exit − entry) ÷ |entry − stop| for longs, minus costs`}</F>
        <p>Only closed bars are used. A forming bar repaints, which would let the model see the future.</p></Card>

      <Card><SectionTitle>Features and model</SectionTitle>
        <F>{`trend      (close − SMA50) ÷ ATR          pullback  (20-bar high − close) ÷ ATR
momentum   (RSI14 − 50) ÷ 25                volRegime ATR ÷ its own long average
rangePos   position in the 20-bar range     bodyRatio (close − open) ÷ (high − low)
volumeZ    volume vs 20-bar average, in SDs

logistic regression, L2 shrinkage, 7 features — small on purpose
probability → Platt calibration fitted on held-out data only`}</F>
        <p>Every feature is scale-free, so one model serves BTC and EUR/USD alike.</p></Card>

      <Card><SectionTitle>Costs and the decision rule</SectionTitle>
        <F>{`cost per trade = feeBps + 2 × slipBps  (charged on entry notional)
expected R = p × rewardR − (1 − p) × 1 − costR
take only when expected R ≥ 0.02 — a signal without an edge after costs is not a trade`}</F>
        <p>Crypto defaults to 10 bps fees and 2–5 bps slippage; FX to 2–3 bps. Raise them in the database if your broker is worse: it is better to be pessimistic here than in the equity curve.</p></Card>

      <Card><SectionTitle>Walk-forward testing</SectionTitle>
        <F>{`fit on the first half → predict the next block → refit including it → repeat
every probability is produced by a model that never saw that sample
baselines: no-skill (base rate) for Brier, and "take every signal" for expectancy`}</F>
        <p>In-sample backtests can be made to look like anything. Only the walk-forward numbers are shown.</p></Card>

      <Card><SectionTitle>Sizing</SectionTitle>
        <F>{`units = risk budget ÷ |entry − stop|,  risk budget = account × riskPct
Kelly  f* = (p(b+1) − 1) ÷ b,  used at ¼ and capped by riskPct
caps: total open risk, and positions per market (correlated positions are one bet)`}</F></Card>

      <Card><SectionTitle>What this cannot do</SectionTitle>
        <p>It cannot promise profit. Markets change, edges decay, and costs are certain while returns are not. The app is built to
        tell you quickly and honestly when something is not working, which is the most valuable thing a trading tool can do.</p></Card>
      <Card><SectionTitle>Portfolio layer</SectionTitle>
        <F>{`score     = (0.6 × 30-bar return + 0.4 × 90-bar return) ÷ annualised volatility, ranked within each market
weights   = (1 ÷ vol) normalised, scaled so book vol ≈ target, capped per position and in total
breaker   = drawdown on the last 40 settled calls: ≥6R → half size, ≥10R → paused
auto-off  = a setup whose recent Brier is worse than the base rate is disabled until it recovers
carry     = funding rate × (24 ÷ interval) × 365, shown as APR`}</F>
        <p>Cross-sectional momentum and volatility targeting are the parts of this app with real evidence behind them. They work through selection and sizing, not through timing.</p></Card>
      <Card><SectionTitle>Validation</SectionTitle>
        <F>{`purge     drop training samples whose outcome window reaches into the test block
embargo   plus half a horizon of buffer after it
regimes   calm/wild × trend/chop; sessions London / New York / Asia`}</F>
        <p>Overlapping labels leak the future into training. Purging and the embargo make results lower and more believable.</p></Card>
    </div>
  );
}
