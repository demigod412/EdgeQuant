# EdgeQuant

A measurement-first trading lab for **crypto and forex**: calibrated probabilities, honest costs, a locked and
settled record, walk-forward backtests, position sizing and a trade journal. It does not place trades, it is not
financial advice, and it cannot promise profit. What it can do is tell you quickly and honestly whether something works.

Same shape as PitchEdge and EdgeArena: Next.js + Postgres, one process per job, deployed by `setup-lightsail.sh`.

---

## What it does

| Page | What it is for |
|---|---|
| **Signals** | Open calls: entry, stop, target, probability, expected R after costs, and the size your rules allow |
| **Backtest** | Walk-forward results per setup: expectancy, drawdown, Brier vs a no-skill forecaster |
| **Record** | Every settled call, scored. Calibration, expectancy, drawdown, results per setup |
| **Journal** | Your own trades, and what it costs you when you break your plan |
| **Risk sizing** | Account size, risk per trade, quarter-Kelly, exposure and correlation caps |
| **Portfolio** | Ranked universe, volatility-targeted weights, risk state and funding carry |
| **Token screener** | What can be checked on a Solana token before you buy: authorities, liquidity, distribution, and whether it can actually be sold |
| **Methodology** | Every formula, in the open |

**Entry styles and management rules** are chosen per setup and compared on the Backtest page: 3 entry styles
(market, limit, stop) × 4 management rules (plain, breakeven, partial, ATR trail), scored over the same signals.
Set the winner on a setup with `entryStyle` and `manageMode`.

**Telegram alerts:** create a bot with @BotFather, get your chat id from @userinfobot, paste both into Settings.
You then get the full order ticket when a call is made, the R result when it closes, and a daily summary.

**Token screener — what it is and is not.** It grades *avoidable risk*: supply that can still be inflated,
accounts that can be frozen, liquidity that can be withdrawn, a transfer hook or fee that taxes or blocks your
exit, a float already held by the opening-block cluster, and a live sell quote to separate a honeypot from a
token that merely looks fine. Those are properties of the contract and the distribution, readable now.

It deliberately does **not** output a "probability this pumps". Everywhere else in this app a probability is
earned — triple-barrier labels, a walk-forward split, calibration on held-out data, and no call unless expected
R is positive. A brand-new token has no price history and no comparable population at the moment you would have
to act, so there is nothing to fit, and any such number would have no derivation behind it.

What the screener does instead is keep score. Every screen is recorded append-only, judged again after
`SCREEN_SETTLE_HOURS` (default 24) — was there still liquidity, did a sale still quote — and the Token screener
page shows the realised survival rate of each grade. A calibrated survival probability is fitted once 200 screens
have settled, and is absent until then, the same way the signal models run as identity until 50 settled calls.

A check that could not run counts as **unknown**, never as a pass. A screen missing its critical checks grades
"unproven", which is not the same as safe. Clearing every check is not a reason to buy: it means only that the
ways of losing which can be checked have been checked.

**How a call works:** at each closed bar, entry = close, stop = ±1 ATR, target = ±1.5 ATR (per setup). Whichever
barrier the following bars touch first decides the outcome; a bar touching both counts as a loss. R is measured
after fees, spread and slippage.

---

## Deploy (same server, new subdomain)

**1. DNS:** add an A record, e.g. `quant` → your Lightsail IP (grey cloud in Cloudflare for now).

**2. Put the code on GitHub**, then on the server:
```bash
cd ~ && rm -rf /tmp/eq && unzip -q edgequant-v0.1.0.zip -d /tmp/eq
mkdir -p ~/EdgeQuant && rsync -a /tmp/eq/edgequant/ ~/EdgeQuant/
cd ~/EdgeQuant && git init -b main && git add -A && git commit -m "EdgeQuant v0.1.0"
git remote add origin https://github.com/<you>/EdgeQuant.git && git push -u origin main
```

**3. Install:**
```bash
cd ~/EdgeQuant && sudo bash ./setup-lightsail.sh
```
Domain `quant.<your-domain>` · www **n** · app name **edgequant** · source: press Enter · API key: leave blank
(crypto needs none) · PIN: choose one · port: accept the suggestion.

**4. First run** (a few minutes: it pulls ~1,600 bars per instrument, fits models, then makes its first calls):
```bash
cd /var/www/edgequant && sudo -u ubuntu npm run ingest
cd /var/www/edgequant && sudo -u ubuntu npm run backtest
```

**5. Cloudflare:** switch the record to orange.

---

## Everyday commands

```bash
cd /var/www/edgequant && sudo -u ubuntu npm run ingest      # candles → refit → new calls → settle resolved ones
cd /var/www/edgequant && sudo -u ubuntu npm run backtest    # walk-forward per setup, stored for the Backtest page
cd /var/www/edgequant && sudo -u ubuntu npm run sourcecheck # are the price feeds reachable?
cd /var/www/edgequant && sudo -u ubuntu npm run selfcheck    # ledger invariants (add -- --demo for an end-to-end run)

# Token screener: screen a Solana mint, or judge the screens past their horizon
cd /var/www/edgequant && sudo -u ubuntu npm run screen -- <mint>
cd /var/www/edgequant && sudo -u ubuntu npm run screen -- --settle
sudo journalctl -u edgequant -f                             # app log
tail -f /var/log/edgequant-cron.log                         # scheduled jobs
```
Scheduled: full cycle every 2 hours (own process), settle every hour, new calls every hour.

## Keys and settings

Crypto (Binance or Bybit) needs **no key**. FX needs a free **Twelve Data** key: Settings → unlock with your PIN → paste → Save.
A key in `.env` always beats one saved in Settings:
```bash
sudo sed -i "s|^TWELVE_DATA_KEY=.*|TWELVE_DATA_KEY=your_key|" /var/www/edgequant/.env
sudo systemctl restart edgequant
```

| `.env` line | What it does |
|---|---|
| `TWELVE_DATA_KEY=` | FX price data |
| `SOURCE_DELAY_MS=400` | spacing between price requests |
| `PREDICTION_MIN_EDGE_R=0.02` | minimum expected R after costs before a call is made |
| `SETTINGS_PIN=` / `CRON_SECRET=` | Settings PIN · protects the scheduled-job URLs |

Costs per instrument (fees and slippage in basis points) live in the `Instrument` table and are deliberately pessimistic.
If your broker is worse, raise them: better to be pessimistic there than in the equity curve.

## Reading the results honestly

- **Brier below the no-skill line** is the minimum bar. Above it, the probabilities carry no information.
- **Expectancy after costs** is the only "profit" number that means anything, and it needs a few hundred trades.
- **Timeouts are not wins.** They are counted separately and still carry their R.
- **A backtest is a hypothesis, not income.** Edges decay; costs never do.
- Most retail accounts lose money. Size so that a ten-loss run is survivable, because it will happen.
