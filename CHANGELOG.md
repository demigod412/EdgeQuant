# Changelog

## 0.4.1 — the three history-based checks, via Helius
- **LP burn or lock** now resolves the pool's LP mint through Raydium's public pool API, then reads the LP
  supply and holders: burned outright, parked at an incinerator, or sitting in a known lock program all count
  as locked, and the largest live holder is reported separately because one wallet holding the pool can empty
  it alone. On launchpad curves (pump.fun, Moonshot) the liquidity is held by the program and nobody can
  withdraw it, which is a pass. On any other DEX the check names the DEX and stays **unknown** rather than
  guessing.
- **Deployer history** reads the asset's recorded creator, lists that wallet's other mints, and checks in one
  request which of them still have liquidity. Stated as a **proxy, on screen**: a dead mint may have been
  abandoned rather than drained, and the two are indistinguishable from outside. The detail says how many of
  the prior mints could actually be checked, so a thin sample is visible as one, and a deployer whose earlier
  mints never traded earns a caution rather than a pass.
- **Opening slots** walks the mint's signatures back to its first activity, takes the transactions in the
  first 60 slots, and sums the supply that moved into non-pool wallets. Reported as **timing, not collusion**:
  wallets buying in the same opening slots may be one operator or unrelated bots racing, and the earlier
  wording asserted "co-funded wallets" without ever checking how they were funded. It now says what it
  measured and that the rest is unchecked. The walk is capped, and a launch beyond the cap yields unknown
  rather than a share computed from partial history.
- Free-plan shaped: every call spaced under the 10/second limit, every walk capped, and running out of budget
  produces unknown, never a pass.

## 0.4.0 — token screener
- **New Token screener page and `npm run screen`.** Nine checks on a Solana mint, each a pure function of
  a normalised snapshot so it can be tested and, later, scored against what actually happened:
  · **mint authority** — renounced, or can more supply still be minted and dilute you
  · **freeze authority** — renounced, or can your account be frozen so you cannot sell at any price
  · **transfer rules** — Token-2022 transfer fees and transfer hooks, which tax or outright block an exit
  · **liquidity locked** — share of LP burned or locked, and whether one wallet holds enough to empty the pool
  · **liquidity depth** — whether the quoted price is a price you could actually get
  · **holder concentration** — top ten and largest single non-pool wallet, so you know who is ahead of you
  · **deployer history** — earlier mints from the same wallet and how many had their liquidity removed
  · **opening blocks** — share of supply taken in the first slots by co-funded wallets
  · **sell simulation** — a live quote in and straight back out, which is the only way to tell a honeypot
    from a token that merely reads clean
- **Sources:** Solana RPC for the authorities, Token-2022 extensions and holder distribution; DexScreener for
  pools, liquidity and volume; Jupiter for the sell quote. Each is optional and each failure is recorded.
- **A check that could not run counts as unknown, never as a pass.** A screen missing its critical checks
  grades **unproven**, which is deliberately not the same as safe — rounding a gap up to "clean" would defeat
  the entire exercise. Grades are avoid / unproven / caution / clear, and every screen shows which sources
  were unavailable.
- **There is no "probability this pumps", on purpose.** Everywhere else here a probability is earned:
  triple-barrier labels, a walk-forward split, calibration on held-out data, no call unless expected R is
  positive. A brand-new token has no price history and no comparable population at the moment you would have
  to act, so there is nothing to fit and such a number would have no derivation behind it. What is estimable
  at mint time is the opposite question — whether the token is *built* so it can take your money whatever the
  price does — and that is what this grades.
- **It keeps score instead.** Screens are append-only; a re-screen is a new row, so what was known at the
  time survives. Each is judged again after `SCREEN_SETTLE_HOURS` (default 24): was there still liquidity, did
  a sale still quote. The page shows the realised survival rate of each grade with the counts, so a thin sample
  is visible as one, and a calibrated survival probability is fitted only once 200 screens have settled — the
  same restraint as the signal models running as identity until 50 settled calls.
- New `SOLANA_RPC_URL` and `SELL_PROBE_USD` settings. Without an RPC the authority and distribution checks
  report unknown rather than passing.
- Fix: six bottom tabs were laid out in a five-column grid, so the last one wrapped onto its own row.

## 0.3.0 — portfolio layer, risk controls, cleaner validation
- **Portfolio page.** The whole universe is ranked by risk-adjusted momentum (60% 30-bar, 40% 90-bar return, divided by volatility), within each market. The top slots are held, the bottom flagged to avoid. Cross-sectional momentum is the effect with the strongest out-of-sample record behind it, and it does not depend on timing any single instrument.
- **Volatility targeting.** Each held instrument gets the same risk rather than the same money, scaled so the book targets a volatility, capped per position and capped in total. Correlation is measured and reported as "effective independent bets" — five positions at 0.9 correlation are barely more than one.
- **Circuit breaker.** Half size after a 6R drawdown, paused after 10R. It feeds the size on every call and the Telegram alert says so.
- **Auto-disable.** A setup whose recent calls stop beating a no-skill forecaster is switched off automatically, and switched back on if it recovers.
- **Carry watch.** Perpetual funding is collected per crypto instrument and shown as an APR. Funding is a cash flow, not a forecast — the one edge here that needs no prediction — with the execution risks stated plainly.
- **Purged walk-forward.** Training samples whose outcome window overlaps the test block are dropped, plus an embargo. Overlapping labels leak the future and inflate results; this makes the backtest less flattering and more honest.
- **Regime and session labels** (calm/wild × trend/chop, London/New York/Asia) for filtering and for splitting results.

## 0.2.0 — order tickets, entry styles, management rules, Telegram alerts
- **Order ticket on every call**: entry (or limit / stop order price), stop, take profit, risk:reward, size in units, cash at risk, management rule and how long the call is valid — with a Copy button.
- **Three entry styles, all measured**: market at bar close, buy/sell limit half an ATR better, or a stop entry half an ATR beyond the close for confirmation. Limit and stop orders can miss the fill; unfilled signals are counted as zero-R non-trades rather than quietly dropped.
- **Four management rules, all measured**: stop and target only, stop to breakeven at +1R, half off at +1R with the rest risk-free, or an ATR trail after +1R. Partials pay two sets of costs, which is charged.
- **Comparison grid on the Backtest page**: all 12 combinations scored over the *same* signals, best highlighted, so the choice is evidence rather than preference.
- **Telegram alerts**: entry alert with the full ticket the moment a call is locked, exit alert with the R after costs when it resolves, and a daily summary. Bot token and chat id in Settings, with a test button. Alerts can never block the ledger: a failed send is ignored.
- Calls now store their entry style, management rule and risk:reward, and settle through the same simulation used in the backtest.

## 0.1.0 — first build
- **Data:** Binance or Bybit for crypto (no key), Twelve Data for FX (free key). Closed bars only; history is never rewritten.
- **Setups:** trend pullback (long and short), range breakout, oversold snapback. Each is one rule, one horizon, one barrier pair.
- **Labelling:** triple-barrier — target, stop or time limit — with a bar touching both barriers counted as a loss.
- **Model:** 7 scale-free features, logistic regression with L2 shrinkage, Platt calibration fitted on held-out data.
- **Decision rule:** expected R = p × reward − (1 − p) − costs; nothing is called unless that is positive.
- **Walk-forward backtests** with fees, spread and slippage, stored per setup, with a no-skill baseline.
- **Locked ledger:** one call per instrument, setup and bar; settled from the bars that followed; never edited.
- **Record page:** Brier and log loss vs no-skill, calibration buckets, expectancy, drawdown, results per setup.
- **Risk sizing:** risk per trade, quarter Kelly, open-risk and correlation caps, feeding the size shown on every call.
- **Journal:** log your own trades and compare kept-plan against broken-plan results.
- **Access code** (30-minute idle lock, 5-minute lockout after 5 wrong tries) and a PIN-protected Settings page.
