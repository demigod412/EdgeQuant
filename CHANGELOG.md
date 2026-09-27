# Changelog

## 0.13.0 — a tenth check, break-even, and plain verdicts

### The queue to sell is now a check, and its favourable case counts
`sellPressure`, weight **10** — above concentration, because concentration measures the *share* those
wallets hold and says nothing about what that share is worth against the market it would hit. A token can
pass at 20% held and still have five times the pool sitting above you.

The good case is a real **pass**, not a neutral absence of findings: while sellable value is below what is
locked, the top of the queue realises less by selling than it gave up, so for now it gains nothing by
leaving. That is the one genuinely reassuring reading in the whole screener — and it is credited as such.

Scores rescale, because the total is computed from whatever checks are present rather than fixed at 100.
The saturated figure that was 66 is now 69. Stored screens keep their own weights, which is why checks
are stored with the screen instead of recomputed from history.

### The cap it has to reach
Not `locked ÷ share`. Locked liquidity is itself priced in dollars and grows as the token does — a pool's
value scales with the square root of the price — so solving `cap·s = L₀·√(cap/cap₀)` gives
**`cap = L₀² / (s² · cap₀)`**. The naive form understates it, and the gap widens the further away
break-even is, which is exactly when the number is being relied on.

Shown as both the cap and the distance: *"the cap would have to reach about $52.1K — 9% above the present
$48K — before dumping realised more than was given up."* Under 70% of the way there it reads as
comfortable; nearer than that it says the alignment expires on the next leg up.

### A creator appearing as a third-party holder
Your point, and it was right. **An empty deployer wallet is not reassurance** — a creator who means to
sell rarely does it from the wallet that deployed; they show up as an ordinary holder. That reading now
says so outright, points at the ten-largest figure as the one that matters *whoever those wallets belong
to*, and where an opening-block cluster took a real share of supply, names it as the closest available
tell.

### Positive or negative, in words
Every queue reading now carries its sense and is labelled **in your favour** / **against you** / **for
context**. The rating card gained an **In its favour** list beside what is against it — a page of only
negatives reads as a verdict when it is really a list of open questions.

And each holding carries a verdict: **Keep holding**, **Trim it**, or **Sell out**, with the reasoning.
Built only from structural facts — can you still sell, is the pool still there, is the queue worsening —
and never from the price, because "the price fell" is not a reason this tool is entitled to give. A stop
firing is labelled as *your* rule rather than a finding about the token.

### Meteora DLMM: still not covered, and why
Three attempts at its `PositionV2` layout from the program source and published IDLs all came up empty,
and its positions are variable-sized, so a `dataSize` filter cannot target them either. It continues to
report as unmeasured, which is true. Unblocking it needs the verbatim field list — nothing else.

## 0.12.0 — the queue to sell

Your idea, with the one correction it needed. What the top holders **paid** is not on chain, so their
profit is not computable — a metric calling it profit would be inventing the most important number in it.
What *is* computable, from figures already in every snapshot:

- **Sellable value against the pool.** The ten largest wallets' holdings in dollars, against the pool they
  would be selling into. *"$420k against a $38k pool — 11× the market they would be selling into. They
  cannot all get out at these prices, and whoever moves first takes most of what is there."* This is the
  one that decides whether **you** can get out, and it needs no assumption about anyone's intent.
- **Sellable against irrevocably committed** — your original idea, stated honestly. *"$12k of liquidity
  can never be withdrawn, against $420k those wallets can still sell: 35× more extractable than is
  genuinely committed."* Carried with the caveat wherever it appears: locked LP is not necessarily theirs
  (on a curve launch it comes from buyers), so it is an asymmetry of incentives, not evidence of a plan.
- **What the deployer alone holds**, against the pool. A deployer sitting on more than the pool is severe
  whatever their record.
- **Exitable size.** *"A position up to about $2,500 leaves this pool deep enough for its quoted exit to
  mean something."* The number you actually needed.

**No check among the nine noticed any of this.** Holder concentration measures the *share* those wallets
hold; it says nothing about what that share is worth against the market it would hit. A token can pass
concentration at 20% and still have five times the pool sitting above you.

Shown on every screen card as "The queue to sell", on each holding recomputed live from the latest cap,
and as a compact `11× overhang` on the shortlist. A crowded queue now keeps a token out of `strong`, and
a severe one out of `medium`.

Also: a test fixture was itself an inconsistent token — an $900k cap with a $30k pool and 18%
concentration is a crowded exit, and the new check was right to refuse to call it clean.

## 0.11.1 — the liquidity alarm was firing on price falls

A pool's dollar value falls when the token falls, with nothing withdrawn. In a constant-product pool the
quote reserve scales with the square root of the price, so value ∝ √price:

| price falls | dollar liquidity falls, with nothing withdrawn |
| --- | --- |
| 25% | 13% |
| 50% | 29% |
| **58%** | **35%** |
| 75% | 50% |

The 35% threshold was being applied to raw dollar liquidity, so **a 58% price decline announced "someone
is taking the pool out"** — a false alarm on the most consequential alert in the app, and precisely the
thing that teaches you to ignore alerts.

Withdrawal is now measured as the **shortfall against what the price move accounts for**, and the message
says which it is: *"liquidity is 31% below what the price move accounts for … that gap is liquidity being
withdrawn, not the token repricing."* Where no price is available on either side it falls back to the raw
comparison and says so, because a possible withdrawal is still worth raising — it just cannot be
distinguished from a decline. The holdings row reads "31% of liquidity withdrawn" or "liquidity intact"
instead of a dollar drift with the same ambiguity.

The relationship is exact for constant product and indicative for a concentrated pool, whose value tracks
the price in a shape that depends on where the ranges sit. The threshold applies to the shortfall, so the
approximation costs sensitivity rather than creating false alarms. The absolute floor is untouched: below
$1,000 there is no market, however it got there.

## 0.11.0 — a time stop, and telling you when a price stop is meaningless

Two additions on the weakest trigger the watcher has.

### The app tells you whether your stop means anything
It still does not choose the number &mdash; it says whether the number you chose can work. When you open a
holding, the token's own recent movement is recorded, and a stop set inside it is called out immediately:
*"this token has moved at least 44% in ordinary trading recently, so a 25% stop will fire on movement that
carries no information."* The same note shows on the holding.

The movement figure is a **net** change over six and twenty-four hours, which is necessarily smaller than
the range travelled to get there. So it understates the noise &mdash; the useful direction, since a
warning that could only err towards "your stop is fine" would be backwards.

### A time stop
*"This has not worked in six hours"* needs no forecast, which for a new token makes it a stronger rule
than any price level. Set it in hours alongside the price stop; the holding shows time held against the
limit. Its alert says plainly that nothing is wrong with the token &mdash; you decided in advance when to
stop waiting, and that is a different kind of exit.

### And what the honest recommendation actually is
Neither stop is your protection, and the form now says so. **A rug leaves no bid to sell into**: by the
time the price is down far enough to trip a stop because someone pulled the pool, the sale will not quote.
The liquidity and exit-quote alerts fire *before* that, while a market still exists, which is the whole
reason this watches the pool rather than the price. Sizing is what survives the rest.

For a number: below about 30% a price stop fires on ordinary movement for most new tokens, so ~50% as a
*this is probably dead* marker is more defensible than anything tighter. The time stop is the one worth
relying on.

## 0.10.2 — market cap then, and market cap now

A screen was a verdict with no scale attached. Whether a token cleared its checks at a $40k cap or a $40m
one is most of what the verdict means in practice, and neither figure was recorded or shown.

- **Every screen records the market cap it was taken at**, and each card says so.
- **Holdings show the cap when you logged it against the cap at the last scan**, with the move between
  them, refreshed on every five-minute probe. Each probe stores it too, so the series is there.
- **The shortlist shows the same pair** — screened cap versus live cap.

"Now" costs one request for the whole page: DexScreener takes 30 mints at a time, so a present-value
column is a single keyless call rather than one per row.

Two deliberate choices. Market cap is preferred where DexScreener publishes one and **fully diluted value
is the fallback**, which errs towards the larger number — the other way round would flatter a token with
a big locked allocation. And the move is coloured but **not interpreted**: a cap being up is not this app
saying the token is good, and a cap being down is not it saying to sell. No alert fires on it, for the
same reason nothing else here forecasts a price.

## 0.10.1 — holder concentration in the watch loop, on its own cadence

The fast loop could not see who was accumulating, because that needs the chain and everything else in it
is keyless. Leaving it to the four-hourly re-screen was too slow; running it every five minutes would
have been three RPC calls per holding per pass.

So it has a cadence of its own: **every 30 minutes**, roughly 144 calls a day per position, which a real
portfolio can carry. Somebody quietly building a position is not a five-minute event, so the slower rate
costs nothing in practice.

Between reads the last figure is **carried forward** rather than blanked. The condition it describes is
still true, and alert de-duplication is what keeps a standing warning from becoming a stream of them —
which is the same reason the repeat window exists at all. The top-holder share now shows on each holding
as soon as it is known, and `npm run watch` reports how many chain reads a pass actually made.

## 0.10.0 — it watches what you hold, and tells you when to act

The screener answered "should I buy this". Nothing answered "is what I bought still what I bought", and
the four-hourly re-screen is the wrong instrument for it, because a rug takes minutes.

### Holdings
Record the mint, **the size you actually hold**, and optionally a stop. Opening one takes a full screen at
that size, which becomes the baseline every later probe is compared against.

The size is the substance rather than a detail. `SELL_PROBE_USD` was one global number, so the exit cost
shown for every token answered the same question — somebody's $50 trade — instead of the right question
for each position. Each holding is now priced at its own size, because price impact scales with it.

### A fast loop that costs nothing
Open holdings are probed **every five minutes**, and deliberately only through keyless sources: pool depth
from DexScreener and a live sell quote from Jupiter. No RPC, so the cadence is affordable however many
positions you have. The four-hourly re-screen still does the chain-level work and still feeds the record;
these two loops have different jobs and different budgets.

Each probe is stored, so drift is visible rather than inferred.

### Alerts, on facts
Telegram, through the plumbing that was already there. What triggers, in order of severity:

- **A sale stops quoting at your size** — the honeypot shape, arriving after you bought.
- **Liquidity below $1,000**, or **down more than 35% from entry** — someone is taking the pool out.
- **The exit above 25%**, or **10 points worse than at entry**.
- **A stop you set** being passed. Only ever because you supplied a number: the app has no opinion on
  where a price should go, and alerting on a price move of its own choosing would be the implied advice
  the rest of it avoids.

Three things the rules get right on purpose. Comparison is against **entry**, not the last check, or a
slow drain would never trip a threshold. A **failed request raises nothing** — an API that did not answer
is not a pool that drained, and crying wolf on an outage is how a warning system gets ignored. And the
same warning is **not repeated** inside six hours unless it escalates, because silence is what makes the
interruptions worth reading.

Also: `npm run watch` probes now instead of waiting for the tick, and the landing page leads with what
you are holding, since an open position is the only thing on it that is time-critical.

## 0.9.2 — Raydium CLMM and Meteora DAMM v2 liquidity, decoded from verified layouts

Every offset below was computed by hand from the program's **verbatim struct definition**, fetched from
its own source. That mattered: asked for the DAMM v2 offsets directly, a summary returned 168/184/200,
which is inconsistent with the field list it gave in the same answer — the correct values are 152/168/184.
A summarised layout is not a layout.

- **Raydium CLMM** — `PersonalPositionState`: `pool_id` at 41, `liquidity` at 81, account 281 bytes
  (`8+1+32+32+4+4+16+16+16+8+8 + 24×3 + 64`). Borsh, so there is no alignment padding to allow for.
  Reports position concentration, same as Orca.
- **Meteora DAMM v2** — and this one answers the lock question properly rather than by proxy. Its
  positions track `unlocked_liquidity`, `vested_liquidity` and `permanent_locked_liquidity` separately
  (152 / 168 / 184, account 408), so a DAMM v2 pool now gets a genuine locked share and can **pass** the
  check instead of only warning. Vested liquidity counts as **withdrawable, not locked**: it unlocks on a
  schedule, and crediting a pool for a restriction that expires is the same error as treating an unknown
  as a pass.
- **Meteora DLMM is deliberately still absent.** Its positions allocate more per-bin data as they grow,
  so the accounts are variable-sized and a `dataSize` filter cannot target them reliably — and no
  verbatim struct was available to compute offsets from. It reports as unmeasured, which is true.

**A guard against my own arithmetic.** The decoders live in `positionLayouts.ts`, apart from the RPC, so
they can be tested against synthetic buffers — and every decoded value must fall below a plausibility
ceiling of 2¹⁰⁰. Real pool liquidity is far below it; bytes read from a wrong offset are effectively
uniform across the u128 range and clear it almost always. A wrong layout therefore returns *unmeasured*
rather than a confident number, which is the only acceptable failure mode for this check.

## 0.9.1 — measuring a concentrated pool instead of shrugging at it

- **The shortlist's mint addresses are copyable.** A shortlist you have to leave in order to act on is
  half a feature.
- **Orca Whirlpool liquidity is now measured position by position.** "There is no LP token to lock" was
  true but incomplete: the risk an LP lock protects against is someone withdrawing the liquidity under
  you, and in a concentrated pool that is still measurable. One `getProgramAccounts` call, filtered to
  the pool and sliced to the liquidity field alone, gives every position's size — so a pool now reports
  how many positions hold it and what share sits in the largest.

  One position holding more than half the pool now **fails the check outright**, because one owner
  removing most of the market you would be selling into is exactly what an LP lock exists to prevent.

  The asymmetry is deliberate and stated in the wording: several positions can share one owner, so a
  high share is trustworthy evidence that one actor could pull the pool, while a low share is **not**
  evidence that nobody can. A well-spread pool therefore warns; it never passes.

- **Only verified layouts are decoded.** The offsets come from the Whirlpool program's own source
  (`Position` is 216 bytes, `whirlpool` at 8, `liquidity` at 72). Raydium CLMM and Meteora DLMM are
  absent from that table rather than guessed at — an unverified decoder produces numbers instead of
  errors, and a confident wrong number is worse than an honest unknown.

## 0.9.0 — a strong/medium/weak verdict, and the screener as the landing page

### "Not checkable on orca" was the wrong answer to the wrong question
Orca Whirlpools, Raydium CLMM and Meteora DLMM hold liquidity as **individual positions, not as a pooled
LP token**. There is no LP to burn or lock, so asking whether it is locked has no answer — and saying
"not checkable" implied a gap in our tooling when it is a property of the pool.

DexScreener carries the architecture in each pair's `labels` (`wp`, `CLMM`, `DLMM`, `DYN2`), so the pool
is now classified rather than shrugged at, and the honest statement is both truer and more useful: *this
liquidity can be withdrawn, position by position, by whoever owns each position.* That is a warning about
withdrawable liquidity, not a critical check that failed to run — which also means coverage rises and the
score starts discriminating. Raydium's own `type` field is a second chance at the same call.

Pool types that genuinely are not implemented now name themselves ("LP lock is not implemented for
meteora dyn2 pools") instead of reporting the DEX name as though it were the reason. And the sentence
"LP lock is not checkable on Raydium did not return an LP mint for this pool" is gone.

### Strong, medium, weak
A single verdict per screen, in `src/lib/token/rating.ts`, with what is holding it back and what would
change it — including the things you control.

It rates **how completely the avoidable risk has been ruled out, and how cheap the exit is at the size
you trade**. It is not a ranking of upside: no check contains any information about where a price goes,
and every verdict says so in its own words, because a three-level rating is exactly the sort of thing
that gets read as a recommendation once the reasoning scrolls off the screen.

- **avoid** — a disqualifying check failed. `wouldRaise` says "nothing", because a hard finding is not a
  threshold to be tuned around.
- **weak** — a critical check could not be run, something is failing, the exit is expensive, or the pool
  is thin relative to your position. Unknown is not the same as fine.
- **medium** — nothing disqualifying and nothing failing, with the remaining reservations listed.
- **strong** — every check ran, none is wrong, and the exit is cheap in a pool far deeper than your
  position. The most the tool can say.

Two of the inputs depend on **your position size**, which is why five tokens with identical scores were
never equivalent: a pool 3× your position is a different trade from one 60× it, and only the sell
simulation notices. Where a position is too large for a pool, the rating says what size would not be.

### The screener is the landing page
`/` is the screener; the calls moved to `/signals`; `/tokens` redirects (307, not 308 — a permanent
redirect gets cached hard by installed PWAs). Navigation, manifest shortcuts and the service-worker
matcher all follow.

**New: a "Best risk clearance" shortlist** on the landing page — the best-cleared tokens screened in the
last 24 hours, one row per mint, ranked by rating and then by cheaper exit. Deliberately **not** ranked by
liquidity, volume or price change: those look like upside and are not, and sorting on them would turn a
risk list into an implied buy list. Each row shows the size it was rated at, because an automatic screen
uses $50 and a token that exits cheaply at $50 may not at yours.

## 0.8.2 — the record counts tokens, not repeated screens of the same token

Re-screening every four hours means one mint contributes many rows, and the record was treating those as
independent outcomes. Forty tokens screened five times each would have read as two hundred observations,
the 200-token threshold would have been reached with a fraction of the evidence it represents, and every
survival rate would have looked far better supported than it was. It is the same error as evaluating a
model on correlated samples — which is the mistake this whole application is arranged to avoid.

So every rate is now computed from the **earliest settled screen of each mint**: the one made before the
outcome was known, and therefore the only one that was ever a prediction. Checkpoints are counted once
per mint and hour. `SURVIVAL_MIN_SETTLED` counts distinct tokens. The raw row count is still reported
alongside, as `screens` — it shows how much work has been done, which is not the same thing as how much
evidence exists, and the UI now says which is which.

## 0.8.1 — three bugs the first fresh-token screens exposed

Screening genuinely new tokens for the first time, rather than established ones, showed up three faults.
The first had been producing false findings since the screener was written.

- **Fix: pool balances were being reported as whales.** `getTokenLargestAccounts` returns token ACCOUNT
  addresses; the pool list from DexScreener holds PAIR addresses. Those are different kinds of address,
  so the exclusion could never match and the pool was simply ranked as the biggest holder. On an
  established token it barely showed — a pool holding a few percent looks like a plausible wallet — but
  on a new token, where the curve holds nearly the whole supply, it reported *"Top 10 hold 100.0%,
  largest single wallet 100.0%"* about tokens where nothing was wrong. Each account's owner is now
  resolved and excluded by that. Where an owner cannot be attributed, or a single unattributed account
  holds more than half the supply on a token with a live market, concentration reports **unknown** with
  the reason: the list of AMM authorities will never be complete, and an unrecognised pool must not be
  presented as a finding about the distribution.
- **Fix: the grade ladder ignored non-disqualifying failures entirely.** It ran hard fails → avoid,
  unknown-hard → unproven, warnings → caution, else clear. A soft failure appeared nowhere, so a token
  whose only problem was a failing check graded `caution` on the strength of its *warnings* — or `clear`
  if it had none — and the headline read "No disqualifying findings" directly above a FAIL in the list.
  A failure is a failure; only whether it disqualifies on its own was ever in question.
- **Fix: "$0 in the pool" next to a working sell quote.** DexScreener does not index a pool the instant
  it opens, and reported zero for tokens Jupiter had already priced at several thousand dollars. Its
  figure is used when DexScreener has none, from the same lookup that already provides the deployer.

## 0.8.0 — a second look every four hours, and a deployer we can usually name

### Re-screening on its own schedule
One number was doing two jobs. Discovery needs a *long* window before spending a new-candidate slot on
something already screened, because the recent feed returns the same tokens for hours and a short window
would have it re-screening yesterday's finds instead of looking at today's. Watching a token you may be
holding needs a *short* one.

So they are separate now, with separate budgets: `TOKEN_DISCOVER_SKIP_HOURS` stays at 24, and
`TOKEN_RESCREEN_HOURS` is **4**. Each discover run first re-screens up to six tracked tokens that have
not been looked at in four hours, longest-unseen first, then goes looking for new ones. Neither can
starve the other.

This is what makes the exit signals real rather than theoretical. A screen is a snapshot and a snapshot
cannot show a trend; two screens of the same mint can — liquidity falling, the round trip getting more
expensive, one wallet growing. Tokens graded `avoid` are skipped (the verdict is in) and watching stops
after 48 hours, so it does not grow without bound as the ledger fills.

### The deployer, from Jupiter where the chain records none
Our deployer lookup reads the `creators` entry off the asset, and plenty of mints record none — which is
why every screen said *"no creator recorded on this mint"*. Jupiter indexes a `dev` field for the same
mints, and that closes the gap.

What is taken from it, and what is deliberately not:

- **`dev`** — the deployer's address. An identity, used as the starting point for our own measurements.
- **`audit.devMints`** — how many mints are attributed to that wallet. A *count with no outcomes*: it
  cannot say whether any of them still trade, which is the part that matters. Reported as a warning about
  missing information, never as a clean record. It also fixes a wrong claim: the check used to say "first
  mint from this wallet" whenever the creator index returned nothing, which with a count available is
  simply false.
- **Not the mint and freeze authorities**, which we read off the mint account ourselves. A second-hand
  copy of a fact we already hold is only a way to be wrong.
- **Not `organicScore`** — an unexplained number, and importing someone else's judgement as though it
  were a measurement is what the rest of this app exists to avoid.

**And a new signal that is entirely our own measurement: what the deployer still holds.** One RPC call
for the wallet's balance in this mint against the supply. A deployer sitting on more than 15% now fails
the check outright regardless of their record, because that supply can be sold into whatever bid exists;
above 5% it warns. Null when unreadable, never zero — "we could not tell" and "they hold nothing" are
opposite conclusions. The check also states which source named the deployer, since one is a chain record
and the other is an index's attribution.

## 0.7.1 — a cost figure without its size is not a measurement

Raising `SELL_PROBE_USD` to a real position size exposed two problems with having one global probe.

- **Automatic screens now use a fixed size of their own.** Discovery finds pools of a few thousand
  dollars, and a $500 probe against a $5,000 pool is a tenth of the pool: it would breach the price-impact
  threshold on almost everything and fill the survival record with rejections that are arithmetic rather
  than findings. It would also make rows incomparable, since the figures would drift with whatever
  `SELL_PROBE_USD` happened to be that week. `TOKEN_AUTO_PROBE_USD` is separate and fixed; the record
  needs comparable measurements, your buy decision needs your size, and those are different needs.
- **Every screen records the size it was measured at, and every verdict states it.** "Round-trips at 2%
  cost" is not a fact about a token until you know what was being sold — the same token round-trips at
  0.4% for $50 and far worse for $5,000. A thin pool is now also described as thin for that size, rather
  than with wording that implied a tax or a trap.

## 0.7.0 — the record fills itself, and the list can be tidied without editing the record

### Automatic screening
Twice an hour, screen whatever has just become tradeable. At a handful of hand-typed mints the 200
settled screens a survival model needs were months away, which meant the grades would never have become
evidence of anything.

On the source, since it is the part that decides whether the record is worth having: **DexScreener has no
public new-pairs endpoint.** Its documented feeds are latest token *profiles* and paid *boosts*, both of
which select for tokens whose promoters spent money — exactly the wrong sample, and it would have biased
the survival record towards whatever promoted tokens do. Jupiter's recent-tokens feed is ordered by
**first pool creation**, which is the event that matters: the moment a token becomes tradeable is the
moment a screen is meaningful. No key, same host as the sell-simulation quotes.

The selection rules are pure and tested: deepest liquidity first, a floor under it, a maximum age, no
re-screening a mint inside a day, and a per-run cap. Unknown liquidity counts as a skip rather than a
pass — a feed that renames a field should cost us a filter, not let something through unchecked.

Cost is bounded by two numbers, `TOKEN_DISCOVER_LIMIT` and the cron interval. At the defaults (8 per run,
twice an hour) that is about 400 screens a day and comfortably inside a free Helius month.

Automatic screens are marked `source: "auto"` and the list shows yours by default, because a few hundred
rows a day would otherwise bury them. `npm run discover` runs a pass by hand.

### Removing a screen
Two behaviours, because "delete this mistake" and "tidy my list" are different needs and only one of them
is safe:

- **Nothing observed yet** — no checkpoint, no settled outcome — the row is deleted outright. A mistyped
  address, a pool address pasted by accident, a duplicate run: these are not observations and the record
  loses nothing.
- **Something has been observed** — the screen is hidden from the list and kept in the record.

That distinction is the point rather than a compromise. A survival rate whose failures can be deleted is
not a record of anything, and the grades only ever stop being my opinion because every outcome is still
there. The button says which of the two happened, and the hidden count is shown with a note that those
screens still count.

## 0.6.1 — the 24-hour wait was never going to end

- **Fix: nothing scheduled ever settled a token screen.** `settleScreens` was reachable only by running
  `npm run screen -- --settle` by hand — the cron `settle` job settled trading signals and left screens
  alone. So the horizon never arrived on its own, the screener's record would have stayed empty
  permanently, and the survival model it is meant to earn could never have been fitted. It now runs in
  the cron `settle` job, in the default cron job, and in `npm run ingest`.
- **Checkpoints at 1h and 6h, not only 24h.** Twenty-four hours answers "did this rug", which is the
  right question for the screener's record and the wrong one for a position held for two hours: a token
  can survive the day and still have been unsellable at the moment you wanted out. Since nothing in this
  app is now held longer than `MAX_HOLD_HOURS`, survival is recorded at one and six hours as well. Those
  land within the hour, which matters a great deal when the record needs hundreds of screens before it
  can say anything. Tests assert every checkpoint falls inside the final horizon and at least one inside
  the longest permitted hold.
- **Said plainly in the UI that the verdict is immediate.** The screen result is complete the moment it
  finishes; the horizon is about grading the screener, not about whether you may act on a result. That
  was never stated, and "settles after 24h" on the form read as though it were a waiting period.

## 0.6.0 — day trading, and an empty board that explains itself

### PumpSwap LP locks are now measured, not waved through
Verified against pump-fun/pump-public-docs and the PumpSwap IDL: every pool has its own Token-2022 LP
mint at the PDA `["pool_lp_mint", pool]` under program `pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA`, so
the same burn-and-concentration arithmetic already used for Raydium applies once that address is derived.

The tempting shortcut would have been to pass every PumpSwap pool, since pump.fun's canonical migration
pool burns its LP. That would have been wrong and dangerous: `withdraw` works identically on *every*
PumpSwap pool and anyone can create one, so a non-canonical pool can be drained. Each pool is measured.

The derivation carries a deliberate fail-safe. A burned LP mint still exists on chain with a supply of
zero, so an *absent* mint means the derivation is wrong — not that the LP was burned. Missing reports
unchecked, because the supply-zero branch would otherwise conclude "all of it was burned": a false pass
on the single most consequential check in the screener. Wrong data must fail towards unknown.

Also: a Raydium pool with no LP mint is usually a concentrated-liquidity pool, which has no LP token at
all — liquidity sits in individual positions that each owner can withdraw. It now says that instead of
"Raydium did not return an LP mint". And the sentence that read "LP lock is not checkable on Raydium did
not return an LP mint for this pool" is fixed; the template assumed the reason was always a DEX name.

### Retuned for day trading and scalping, with a six-hour ceiling
The shipped setups were 4h bars on 12–18 bar horizons — two to three days — and a daily one on six bars,
which is six days. Every setup now runs on 1h bars (day trading, 4–6 hour barriers) or 15m bars (scalps,
2–3 hours), and `MAX_HOLD_HOURS = 6` is asserted by a test rather than merely intended, because a
horizon is one number away from quietly becoming a swing trade again. Three scalp setups were added,
reusing the hourly rules by reference so a fix cannot drift between them. 15m and 1h bars are now
ingested, and the provider timeframe maps cover them.

Expect *fewer* calls, not more. Costs are a fixed toll per round trip while the target shrinks with the
bar, so the same 10–15bps eats a far larger share of a 15m ATR than a 4h one. Candidates pricing out
with negative edge is the arithmetic being honest.

**Fix: `ensureSeeds` only synced a setup's name and description**, so changing a timeframe in code left
existing rows on the old one and the change silently did nothing — the same shape of bug as a league
allowlist that was never wired up. Timeframe, side, barriers and horizon are all synced now.

### An empty Signals board now accounts for itself
"No open calls" and "nothing is working" looked identical. Every candidate that gets far enough to be
priced is now recorded with the scan, and the page shows the ten closest with the model's probability,
the expected R after costs, and whether each is tradeable, positive-but-below-floor, or not worth
taking — plus the tally of why the rest were passed over. Strength is shown as a probability *and* an
edge, deliberately: a 65% chance of 0.5R is a losing trade and 45% of 2R is a good one, so a probability
on its own is not a recommendation.

## 0.5.6 — why every screen scored the same

- **The score was reporting the data tier, not the token.** Five unrelated tokens all came back 66/100,
  and the arithmetic says why: the weights sum to 100, and `lpLocked` (16) + `sniperBundle` (10) +
  `deployerHistory` (8) were unknown on every one of them. 100 − 34 = 66, every time, whatever the token
  was. As a buy threshold that is false precision. The grade now carries `coverage` — the share of the
  weight that could actually be evaluated — and `counts` by verdict, and each card says plainly that with
  n checks unavailable the total is mostly a measure of what could be read. A test pins the 66 so the
  saturation cannot quietly return.
- **The full mint address, with a copy button.** It was abbreviated to `777XNv…o777`, which is useless
  the moment you want to act on the result.

## 0.5.5 — "made 0, skipped 40" now says why

- **Skip reasons, and the best edge anything came close with.** No open calls is the normal state most of
  the time, but a bare count gave no way to tell a working pipeline waiting for a setup from a broken
  one. `generateSignals` now returns a `why` breakdown — rule not met, edge below the floor, not enough
  history, no fitted model, already called on this bar — plus `bestEdge`, the closest any candidate came.
  An edge of -0.4R means nothing was remotely tradeable; -0.01R against a 0.02R floor means the next bar
  could fire. Three of those paths were not previously counted at all, so they were missing from both
  `made` and `skipped`.
- **Fix: the FX source test reported FAILED on a working key.** It fetched a `1h` bar, a timeframe the app
  never ingests, and on a weekend with the FX market shut that came back empty — printing
  `Twelve Data FAILED — 0 bars` thirty seconds before the real sync pulled 996 bars per pair. It tests
  on 4h now, and an empty weekend answer says the market is closed rather than implying a bad key.

## 0.5.4 — "That is not a Solana mint address" was not enough to act on

- **Named reasons instead of one blanket refusal.** The form checked base58 and 32–44 characters and, on
  failure, said only that the input was not a mint address — leaving you to work out which ordinary
  mistake you had made. It now says: this is an Ethereum or BSC address and the screener is Solana-only;
  this address is abbreviated in the middle, so use the copy button; this is 12 characters where 32 to 44
  are needed. `src/lib/token/mintInput.ts`, with tests for each case.
- **A pasted link works.** pump.fun, Birdeye, Solscan and Jupiter all carry the mint in the URL, and
  pasting the page you were looking at is the obvious thing to do, so the address is extracted from it.
- **A DexScreener link is refused on purpose.** Its URL names the *pool*, whose address is valid base58
  and indistinguishable from a token's, so accepting it would have screened the wrong thing and said
  nothing. It now tells you where the token address is on that page instead.
- **And if a pool address is pasted directly**, which no format check can catch, the screen now says the
  address has no mint account and is therefore not a token — rather than reporting no authorities, no
  supply and no holders as though those were findings about a token.

## 0.5.3 — pace Twelve Data to the plan it is on

- **Fix: the first FX sync would have looked like a hang.** Requests were spaced 400ms apart for every
  source, but Twelve Data's free plan allows 8 a minute. Five pairs across two timeframes is ten requests
  inside five seconds, so most would be answered `429` and then wait out a 31-second retry each. A source
  can now declare its own minimum spacing (`minSpacingMs`), Twelve Data sets 8 seconds, and the ingest
  takes whichever is longer. `TWELVE_DATA_SPACING_MS` overrides it if you upgrade the plan.

## 0.5.2 — the reason there were no candles

- **Fix: the default crypto source is blocked from most cloud IPs.** `api.binance.com` answers a great
  many hosting ranges with HTTP 451 ("Service unavailable from a restricted location"), and Bybit answers
  the same addresses with a CloudFront 403. A server that could reach neither had no crypto source at
  all, stored no candles, and so emptied Signals, Portfolio, Backtest and Record together — the app
  working exactly as written, fetching nothing. The default is now
  `data-api.binance.vision`, Binance's own market-data-only endpoint: no key, no account, identical
  klines response, and not under that restriction. `BINANCE_BASE_URL` and `BYBIT_BASE_URL` override it
  and are both documented in `.env.example` now.

This was the actual cause of the empty pages reported in 0.5.0, which I had put down to the missing seed
file. The instruments were already there — `ensureSeeds` creates them on every ingest — so the seed was a
real bug but not this one. What was missing was every single candle, and nothing in the app said so until
`npm run diagnose` pinged the sources from the server itself.

## 0.5.1 — a deploy that shipped nothing and called it success

- **Fix: `update` reported success after a failed pull.** The rsync deploy path ran
  `git -C "$SRC" pull --ff-only || true`, so a pull that could not merge was swallowed; rsync then
  copied the *unchanged* tree, the build and restart went ahead, and the script printed
  "Updated and restarted". The new code was fetched and never checked out, so the running app stayed on
  the previous version while the log said otherwise. It now stops, says nothing was deployed, and prints
  the two commands that resolve the usual causes.
- **Fix: a `chmod +x` blocked every update.** `setup-lightsail.sh` was tracked as mode 100644, so making
  it executable on the server — which you must do to run it — left a permanent unstaged mode change that
  `git pull --ff-only` refused to merge past. It is tracked as 100755 now, which is what it always should
  have been. (`git config core.fileMode false` clears it in a clone that already has the change.)

## 0.5.0 — it looked like the wrong app, and every page was empty

Three complaints, and all of them traced back to the same thing: EdgeQuant was scaffolded from PitchEdge
and inherited files that were never adapted. None of this was visible from the code that had been
written for EdgeQuant; it was in the parts nobody had looked at since the copy.

**A crypto mark of its own.** The four PNGs in `public/icons` were byte-for-byte PitchEdge's, so an
installed EdgeQuant showed the football icon on the home screen. There is now a block outline with a
rising candle sequence in it, drawn in the app's own palette, with `public/icons/icon.svg` as the source
of truth and `npm run icons` to rasterise it. The manifest went with it: it described "calibrated
football probabilities", filed itself under `sports`, and offered shortcuts to `/scanner/safe` and
"Today" — neither of which is a route in this app.

**Fix: no instruments, so no anything.** `prisma/seed.ts` was referenced by `package.json` and by the
installer but had never been written, so `npm run db:seed` failed and a fresh install had no Instrument
rows. Everything in this app hangs off those rows — with nothing to track there is nothing to sync, so
no candles, so no setups to fit, so no calls, so nothing on Signals, Portfolio, Backtest or Record, and
an empty instrument list in Settings. The FX pairs in particular are now seeded whether or not a Twelve
Data key exists, because Settings needs something to point a key at. The seed also runs on `update`, so
an install that predates it is repaired rather than left as it was.

**Fix: the installer was still PitchEdge's.** It asked for an API-Sports key, wrote `API_SPORTS_KEY` and
`PREDICTION_LOCK_MINUTES` into `.env`, and asked for neither of the keys this app actually uses — which
is why the Helius URL had to be added by hand. Worse, the first data sync was gated on that API-Sports
key being non-empty, so on EdgeQuant it never fired and a new install sat with no prices until the first
cron run. It now asks for a Twelve Data key and a Solana RPC URL, writes those, and always starts the
first sync: crypto needs no key at all.

**New: `npm run diagnose`.** Every page here is downstream of the one before it, so an empty page is
almost never a broken page — it is the first missing link. This walks the chain in order (instruments →
candles → fitted setups → calls → screens), names where it stops, and prints the command that fills it.
It also pings each price source *from the server*, because Binance answers some cloud IP ranges with
HTTP 451 and that would otherwise read as an app fault.

**Fix: the service worker cached routes that do not exist.** Its matcher listed `/fixtures`, `/match`,
`/league`, `/scanner` and `/top`, so none of EdgeQuant's pages were ever cached, and its offline
fallback pointed at `/~offline`, which had never been created — the one moment it had a job to do. Both
fixed, and the network timeout went from 3s to 8s: these pages query the database on every request, and
3 seconds was short enough to serve a stale page in place of the live one. On a trading tool that is
worse than waiting, so cached pages now expire in a day rather than three.

Also: the local dev database in `docker-compose.yml` was named `pitchedge` and did not match the
`DATABASE_URL` in `.env.example`, so `npm run db:up` needed hand-editing before it was any use.

## 0.4.3 — the second live screen: an honest reason for every check that could not run

- **Fix: the sell simulation asked for a circular quote.** The round trip always went through USDC, so
  screening USDC itself asked Jupiter for USDC → USDC. Jupiter refuses that outright
  (`CIRCULAR_ARBITRAGE_IS_DISABLED`), and it reached the report as a bare `HTTP 400`. The probe now switches
  to wrapped SOL when the screened mint is the quote currency. Only the ratio of the two quotes is used, so
  the currency and its units cancel — which is also why the quote amounts are no longer called `inUsd` /
  `outUsd`: they are base units of whichever currency was probed, and the old names invited a wrong reading.
  The choice lives in `src/lib/token/probe.ts` on its own, with tests, because it is the part that was wrong.
- **Fix: a failed quote said only "HTTP 400".** Jupiter states its refusals in the response body, and
  discarding it sent the diagnosis in the wrong direction for a full round trip. The body is now part of the
  error. A sell side that refuses to quote still counts as the honeypot signal it is, but its reason is
  carried into the report as well, so a routing outage is not silently read as a trap.
- **Fix: two checks blamed a missing Helius key when the key was working.** "Needs a Helius key" was printed
  whenever the deployer or the opening blocks could not be established, regardless of why. Both now give the
  actual reason, and each is a fact about the token rather than a fault in the setup:
  *no creator recorded on this mint*, *more than N transactions so the launch is out of reach*, *no
  transactions in the opening slots*, *supply could not be read*. This is the same treatment `lpUnchecked`
  already had, plumbed through `deployerUnchecked` and `openingUnchecked`.

Both remaining "unknown" results on an established token like USDC are now correctly labelled: it records no
creator, and its launch is millions of transactions beyond the signature walk. Neither is fixable, and
neither is a fault — they are limits of screening a token that is not the kind this tool is for.

## 0.4.2 — four bugs the first live screen exposed
- **Fix: the sell simulation never ran.** Jupiter's v6 host (`quote-api.jup.ag`) no longer resolves, so every
  screen failed it with a bare "fetch failed" — losing the one check that can tell a honeypot from a token
  that merely reads clean. Now on `lite-api.jup.ag/swap/v1`, the current keyless tier, same response shape.
- **Fix: transfer rules reported "extensions not read" for classic SPL tokens.** Transfer fees and hooks are
  Token-2022 features and cannot exist on a classic mint, so the owning program already answers the question.
  A classic mint now passes on the facts instead of throwing away a check it had answered.
- **Fix: the deployer check claimed "first mint from this wallet" when no deployer had been identified.** The
  lookup fell back to the first *authority* if the asset had no creator — which is the mint authority, a
  different thing. On USDC that resolved to Circle's authority, found nothing indexed under it, and reported
  the largest stablecoin on Solana as a first-time launch. Only a real creator entry counts now; otherwise the
  check reads unknown, which is true. A wrong answer is worse than no answer.
- **Fix: "holder list unavailable" on tokens with millions of accounts.** `getTokenLargestAccounts` is refused
  above a certain account count. It now says so — normal for a major token, not for a new one — rather than a
  message that reads like a broken key and sends you looking in the wrong place.
- The package called itself `pitchedge`, so every npm script announced the wrong app.

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
