# Changelog

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
