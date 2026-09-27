import { describe, expect, it } from "vitest";
import { runChecks, LIMITS } from "@/lib/token/checks";
import { gradeScreen, survivalProbability, SURVIVAL_MIN_SETTLED } from "@/lib/token/score";
import { rateEntry, byClearance } from "@/lib/token/rating";
import { AUTO_PROBE_USD, sellProbe } from "@/lib/token/probe";
import { parseJupiterToken } from "@/lib/token/jupiterToken";
import { parseMintInput } from "@/lib/token/mintInput";
import { isPumpSwap, pumpswapLpMint } from "@/lib/token/pumpswap";
import { shouldSend, watchAlerts, watchMessage, type Observation } from "@/lib/token/watchRules";
import { POSITION_LAYOUTS, decodeLock, decodeSpread, lockSlice, spreadSlice, readU128LE, plausible, MAX_PLAUSIBLE_LIQUIDITY } from "@/lib/token/positionLayouts";
import { CHECKPOINT_HOURS, SETTLE_HOURS } from "@/lib/token/horizons";
import { parseRecent, selectCandidates, type Candidate } from "@/lib/token/discover";
import { MAX_HOLD_HOURS } from "@/lib/instruments";
import type { TokenSnapshot } from "@/lib/token/types";

/** A token with nothing wrong with it, as a baseline to break one thing at a time. */
const clean = (over: Partial<TokenSnapshot> = {}): TokenSnapshot => ({
  chain: "solana", mint: "So11111111111111111111111111111111111111112", symbol: "OK", name: "Fine",
  createdAt: new Date("2026-09-01"), observedAt: new Date("2026-09-26"),
  mintAuthority: null, mintAuthorityRenounced: true,
  freezeAuthority: null, freezeAuthorityRenounced: true,
  transferFeeBps: 0, hasTransferHook: false,
  liquidityUsd: 120_000, dexId: "raydium", lpUnchecked: null, lpWithdrawable: null, lpPositions: null, lpTopPositionShare: null, lpLockedShare: 1, lpTopHolderShare: 0,
  top10Share: 0.18, topHolderShare: 0.05, holderCount: 4200, concentrationUnchecked: null,
  deployer: "dep", deployerPriorMints: 3, deployerPriorRugs: 0, deployerChecked: 3, deployerUnchecked: null,
  deployerHoldShare: 0, deployerAttributedMints: null, deployerIdentifiedBy: "creator", launchpad: null,
  sniperBundleShare: 0.02, sniperWallets: 3, openingSlots: 60, openingUnchecked: null,
  sellQuote: { probeIn: 50, probeOut: 48.5 }, sellPriceImpact: 0.01, sellProbeUsd: 50,
  fdvUsd: 900_000, volume24hUsd: 300_000, buys24h: 900, sells24h: 800,
  ...over,
});
const find = (t: TokenSnapshot, id: string) => runChecks(t).find((c) => c.id === id)!;

describe("token checks", () => {
  it("clears a token with nothing wrong with it", () => {
    const g = gradeScreen(runChecks(clean()));
    expect(g.grade).toBe("clear");
    expect(g.hardFails).toEqual([]);
    expect(g.safety).toBe(100);
  });

  it("disqualifies a retained mint authority — supply can be inflated after you buy", () => {
    const g = gradeScreen(runChecks(clean({ mintAuthorityRenounced: false, mintAuthority: "Ev1L" })));
    expect(g.grade).toBe("avoid");
    expect(g.hardFails.map((c) => c.id)).toContain("mintAuthority");
    expect(find(clean({ mintAuthorityRenounced: false }), "mintAuthority").detail).toMatch(/minted at any time/);
  });

  it("disqualifies a retained freeze authority — your tokens can be made unsellable", () => {
    expect(gradeScreen(runChecks(clean({ freezeAuthorityRenounced: false }))).grade).toBe("avoid");
  });

  it("catches a honeypot: the buy quotes and the sale does not", () => {
    const c = find(clean({ sellQuote: { probeIn: 50, probeOut: 0 } }), "sellable");
    expect(c.verdict).toBe("fail");
    expect(c.detail).toMatch(/honeypot/);
  });

  it("catches an exit tax that a mint-account read would miss", () => {
    expect(find(clean({ sellQuote: { probeIn: 50, probeOut: 40 } }), "sellable").verdict).toBe("fail");
    expect(find(clean({ hasTransferHook: true }), "transferRules").verdict).toBe("fail");
    expect(find(clean({ transferFeeBps: 500 }), "transferRules").verdict).toBe("fail");
    expect(find(clean({ transferFeeBps: 30 }), "transferRules").verdict).toBe("warn");
  });

  it("disqualifies unlocked liquidity, and says so more sharply when one wallet holds the pool", () => {
    expect(find(clean({ lpLockedShare: 0.1 }), "lpLocked").verdict).toBe("fail");
    expect(find(clean({ lpLockedShare: 0.1, lpTopHolderShare: 0.8 }), "lpLocked").detail).toMatch(/unsellable at any price/);
  });

  it("grades concentration in steps rather than pass or fail", () => {
    expect(find(clean({ top10Share: 0.2 }), "concentration").verdict).toBe("pass");
    expect(find(clean({ top10Share: 0.3 }), "concentration").verdict).toBe("warn");
    expect(find(clean({ top10Share: 0.5 }), "concentration").verdict).toBe("fail");
    // One wallet is enough on its own, even with a tame top ten.
    expect(find(clean({ top10Share: 0.2, topHolderShare: 0.2 }), "concentration").verdict).toBe("fail");
  });

  it("treats a deployer's prior rug as disqualifying, and a first mint as merely unknown", () => {
    expect(find(clean({ deployerPriorRugs: 1, deployerPriorMints: 4 }), "deployerHistory").verdict).toBe("fail");
    expect(find(clean({ deployerPriorMints: 0, deployerPriorRugs: 0 }), "deployerHistory").verdict).toBe("warn");
  });

  it("flags an opening-block cluster that captured the float", () => {
    expect(find(clean({ sniperBundleShare: 0.05 }), "sniperBundle").verdict).toBe("pass");
    expect(find(clean({ sniperBundleShare: 0.1 }), "sniperBundle").verdict).toBe("warn");
    expect(find(clean({ sniperBundleShare: 0.4 }), "sniperBundle").verdict).toBe("fail");
  });

  it("never lets an unknown read as a pass", () => {
    // The single most important property: a screen that could not run is not a clean screen.
    const g = gradeScreen(runChecks(clean({ mintAuthorityRenounced: null, freezeAuthorityRenounced: null, sellQuote: null, lpLockedShare: null })));
    expect(g.grade).toBe("unproven");
    expect(g.unknownHard.map((c) => c.id).sort()).toEqual(["freezeAuthority", "lpLocked", "mintAuthority", "sellable"]);
    expect(g.safety).toBeLessThan(40);
    expect(g.headline).toMatch(/Not the same as safe/);
  });

  it("ranks avoid below unproven below caution below clear", () => {
    const grades = [
      gradeScreen(runChecks(clean({ mintAuthorityRenounced: false }))).grade,
      gradeScreen(runChecks(clean({ sellQuote: null }))).grade,
      gradeScreen(runChecks(clean({ liquidityUsd: 2_000 }))).grade,
      gradeScreen(runChecks(clean())).grade,
    ];
    expect(grades).toEqual(["avoid", "unproven", "caution", "clear"]);
  });

  it("thresholds are the documented ones", () => {
    expect(find(clean({ liquidityUsd: LIMITS.minLiquidityUsd }), "liquidityDepth").verdict).toBe("pass");
    expect(find(clean({ liquidityUsd: LIMITS.minLiquidityUsd - 1 }), "liquidityDepth").verdict).toBe("warn");
  });
});

describe("bugs found on the first live screen", () => {
  it("a classic SPL mint has no extensions, so transfer rules are a pass not an unknown", () => {
    // Fees and hooks are Token-2022 features; a classic mint answers this by construction. Reporting
    // "extensions not read" threw away a check that had already been answered.
    expect(find(clean({ transferFeeBps: 0, hasTransferHook: false }), "transferRules").verdict).toBe("pass");
    // Only a genuinely unread Token-2022 mint stays unknown.
    expect(find(clean({ transferFeeBps: null, hasTransferHook: null }), "transferRules").verdict).toBe("unknown");
  });

  it("does not claim 'first mint from this wallet' when the deployer was never identified", () => {
    // The old fallback used the mint authority as the deployer, so USDC screened as a first-time
    // launch. Nothing identified means unknown.
    const c = find(clean({ deployer: null, deployerPriorMints: null, deployerPriorRugs: null, deployerChecked: null }), "deployerHistory");
    expect(c.verdict).toBe("unknown");
    expect(c.detail).not.toMatch(/first mint/i);
  });

  it("still reports a genuine first launch as a caution", () => {
    const c = find(clean({ deployer: "dep", deployerPriorMints: 0, deployerPriorRugs: 0, deployerChecked: 0 }), "deployerHistory");
    expect(c.verdict).toBe("warn");
    expect(c.detail).toMatch(/[Ff]irst mint/);
  });
});

describe("the three history-based checks", () => {
  it("names the DEX when LP lock cannot be checked, rather than passing it", () => {
    const c = find(clean({ lpLockedShare: null, lpUnchecked: "LP lock is not checkable on orca." }), "lpLocked");
    expect(c.verdict).toBe("unknown");
    expect(c.hard).toBe(true);
    expect(c.detail).toBe("LP lock is not checkable on orca.");
  });

  it("treats a launchpad pool, whose liquidity nobody can withdraw, as locked", () => {
    expect(find(clean({ lpLockedShare: 1, lpTopHolderShare: 0 }), "lpLocked").verdict).toBe("pass");
  });

  it("describes dead prior launches as abandoned-or-drained, not as proven theft", () => {
    const c = find(clean({ deployerPriorMints: 6, deployerPriorRugs: 3, deployerChecked: 5 }), "deployerHistory");
    expect(c.verdict).toBe("fail");
    expect(c.detail).toMatch(/abandoned or drained/);
    // Says how many were actually checkable, so a thin sample is visible.
    expect(c.detail).toMatch(/3 of the 5/);
  });

  it("does not credit a deployer whose earlier mints never traded", () => {
    const c = find(clean({ deployerPriorMints: 4, deployerPriorRugs: 0, deployerChecked: 0 }), "deployerHistory");
    expect(c.verdict).toBe("warn");
    expect(c.detail).toMatch(/none of which ever traded/);
  });

  it("reports opening-slot timing without claiming the wallets are one operator", () => {
    const c = find(clean({ sniperBundleShare: 0.4, sniperWallets: 9, openingSlots: 60 }), "sniperBundle");
    expect(c.verdict).toBe("fail");
    expect(c.detail).toMatch(/9 wallets within the first 60 slots/);
    expect(c.detail).toMatch(/not checked/);
    // The old wording asserted collusion we never verified.
    expect(c.detail).not.toMatch(/co-funded/);
  });

  it("leaves the opening-slot check unknown when the launch is out of reach", () => {
    const c = find(clean({ sniperBundleShare: null }), "sniperBundle");
    expect(c.verdict).toBe("unknown");
  });
});

describe("survival probability", () => {
  it("is null until the ledger has enough settled screens", () => {
    const checks = runChecks(clean());
    expect(survivalProbability(checks, null)).toBeNull();
    expect(survivalProbability(checks, { intercept: 1, weights: { mintAuthority: 1 }, n: SURVIVAL_MIN_SETTLED - 1, horizonHours: 24 })).toBeNull();
  });

  it("is a probability once it is fitted", () => {
    const p = survivalProbability(runChecks(clean()), { intercept: -1, weights: { mintAuthority: 2, sellable: 2 }, n: SURVIVAL_MIN_SETTLED, horizonHours: 24 });
    expect(p).not.toBeNull();
    expect(p!).toBeGreaterThan(0);
    expect(p!).toBeLessThan(1);
  });
});

describe("bugs found on the second live screen", () => {
  it("does not ask for a circular quote when the screened token is the probe currency", () => {
    const usdc = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
    // Jupiter refuses input === output outright ("not allowed to be equal"), which surfaced as a bare
    // HTTP 400 and cost the honeypot check on any token used as a quote currency.
    expect(sellProbe(usdc).via).not.toBe(usdc);
    expect(sellProbe("SomeMemeMint111111111111111111111111111111").via).toBe(usdc);
  });

  it("measures the round trip as a ratio, so the probe currency's units do not matter", () => {
    const small = find(clean({ sellQuote: { probeIn: 50e6, probeOut: 48.5e6 } }), "sellable");
    const large = find(clean({ sellQuote: { probeIn: 0.25e9, probeOut: 0.2425e9 } }), "sellable");
    expect(small.verdict).toBe("pass");
    expect(large.verdict).toBe("pass");
  });

  it("gives the real reason a history check could not run, not a blanket 'needs a key'", () => {
    // The user had a working key; saying otherwise sent the hunt in the wrong direction. These two
    // checks are unavailable for reasons that are facts about the token, and they should say which.
    const dep = find(clean({
      deployerPriorMints: null, deployerPriorRugs: null,
      deployerUnchecked: "no creator recorded on this mint, so the deployer is unknown",
    }), "deployerHistory");
    expect(dep.verdict).toBe("unknown");
    expect(dep.detail).toContain("no creator recorded");

    const open = find(clean({
      sniperBundleShare: null,
      openingUnchecked: "more than 6000 transactions, so the launch is out of reach",
    }), "sniperBundle");
    expect(open.verdict).toBe("unknown");
    expect(open.detail).toContain("out of reach");
  });

  it("still falls back to a plain message when no reason was recorded", () => {
    expect(find(clean({ deployerPriorMints: null, deployerPriorRugs: null }), "deployerHistory").detail).toMatch(/not identified/);
    expect(find(clean({ sniperBundleShare: null }), "sniperBundle").detail).toMatch(/not traced/);
  });
});

describe("what people actually paste into the screener", () => {
  const ok = (s: string) => { const r = parseMintInput(s); return r.ok ? r.mint : `REJECTED: ${r.message}`; };
  const USDC = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

  it("takes a bare mint, with or without stray whitespace", () => {
    expect(ok(USDC)).toBe(USDC);
    expect(ok(`  ${USDC}\n`)).toBe(USDC);
  });

  it("pulls the mint out of a pasted link", () => {
    expect(ok(`https://pump.fun/coin/${USDC}`)).toBe(USDC);
    expect(ok(`https://solscan.io/token/${USDC}`)).toBe(USDC);
    expect(ok(`https://birdeye.so/token/${USDC}?chain=solana`)).toBe(USDC);
  });

  it("refuses a DexScreener link rather than screening the pool it names", () => {
    // The pool address is valid base58, so accepting it would screen the wrong thing silently.
    const r = parseMintInput(`https://dexscreener.com/solana/${USDC}`);
    expect(r.ok).toBe(false);
    expect(r.ok === false && r.message).toMatch(/pool address/i);
  });

  it("names the mistake instead of saying only that it is not a mint", () => {
    expect(ok("0x2170Ed0880ac9A755fd29B2688956BD959F933F8")).toMatch(/Ethereum or BSC/);
    expect(ok("EPjFW…TDt1v")).toMatch(/abbreviated/);
    expect(ok("EPjFWdd5Aufq")).toMatch(/12 characters/);
    expect(ok("")).toMatch(/Paste a Solana mint/);
  });
});

describe("the score saturates when the same checks are unavailable", () => {
  /*
   * Five different tokens screened on the free tier all came back 66/100, because lpLocked (16),
   * sniperBundle (10) and deployerHistory (8) were unknown on every one of them: 100 - 34 = 66. The
   * score was reporting the data tier, not the token. Coverage is what makes that legible.
   */
  const blind = (over: Partial<TokenSnapshot> = {}) => clean({
    lpLockedShare: null, lpUnchecked: "LP lock is not checkable on pumpswap.",
    sniperBundleShare: null, openingUnchecked: "launch out of reach",
    deployerPriorMints: null, deployerPriorRugs: null, deployerUnchecked: "no creator recorded",
    ...over,
  });

  it("gives two unrelated tokens the same score when the same checks cannot run", () => {
    const a = gradeScreen(runChecks(blind({ liquidityUsd: 328_386, top10Share: 0.217, topHolderShare: 0.084 })));
    const b = gradeScreen(runChecks(blind({ liquidityUsd: 1_911_123, top10Share: 0.149, topHolderShare: 0.027 })));
    expect(a.safety).toBe(b.safety);
    expect(a.safety).toBe(66);
  });

  it("reports coverage so a 66 of that kind is distinguishable from a 66 with findings", () => {
    const g = gradeScreen(runChecks(blind()));
    expect(g.counts).toEqual({ pass: 6, warn: 0, fail: 0, unknown: 3 });
    expect(g.coverage).toBeCloseTo(0.66, 2);
    expect(g.grade).toBe("unproven");

    const full = gradeScreen(runChecks(clean()));
    expect(full.coverage).toBe(1);
    expect(full.safety).toBe(100);
  });

  it("does not let a high score on partial data reach 'clear'", () => {
    // lpLocked is a hard check, so an unreadable one keeps the verdict at unproven however clean the rest is.
    expect(gradeScreen(runChecks(blind())).grade).not.toBe("clear");
  });
});

describe("PumpSwap LP mint derivation", () => {
  /*
   * "On PumpSwap" is not "LP burned": withdraw works on every PumpSwap pool and anyone can create one,
   * so the pool's LP mint has to be found and measured. These vectors pin the derivation, because a
   * wrong address would resolve to a mint that does not exist — and the supply-zero branch of the
   * measurement would read that as "all of it was burned", a false pass on the check that matters most.
   */
  it("derives deterministically from the pool address", () => {
    const a = pumpswapLpMint("Ez1nMRUJNUmJcWCcmkjvpdqjnjeXHpvvhnLWjnKfCkBu");
    const b = pumpswapLpMint("Ez1nMRUJNUmJcWCcmkjvpdqjnjeXHpvvhnLWjnKfCkBu");
    expect(a).toBe(b);
    expect(a).toMatch(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/);
    expect(a).not.toBe("Ez1nMRUJNUmJcWCcmkjvpdqjnjeXHpvvhnLWjnKfCkBu");
  });

  it("gives different pools different LP mints", () => {
    expect(pumpswapLpMint("Ez1nMRUJNUmJcWCcmkjvpdqjnjeXHpvvhnLWjnKfCkBu"))
      .not.toBe(pumpswapLpMint("So11111111111111111111111111111111111111112"));
  });

  it("returns null rather than throwing on a non-key", () => {
    expect(pumpswapLpMint("not-a-pubkey")).toBeNull();
    expect(pumpswapLpMint("")).toBeNull();
  });

  it("recognises the DEX ids DexScreener uses", () => {
    expect(isPumpSwap("pumpswap")).toBe(true);
    expect(isPumpSwap("PumpSwap")).toBe(true);
    expect(isPumpSwap("raydium")).toBe(false);
    expect(isPumpSwap("pumpfun")).toBe(false); // the bonding curve, handled separately
  });
});

describe("settlement horizons", () => {
  it("keeps every checkpoint strictly inside the final horizon", () => {
    // A checkpoint at or past the final horizon would be recorded twice and mean nothing.
    for (const h of CHECKPOINT_HOURS) {
      expect(h).toBeGreaterThan(0);
      expect(h).toBeLessThan(SETTLE_HOURS);
    }
  });

  it("checks inside the longest hold the app allows", () => {
    // Six hours is the ceiling on a position, so survival has to be measured at or before it —
    // otherwise the only recorded ground truth is about a day the trade was never open for.
    expect(Math.min(...CHECKPOINT_HOURS)).toBeLessThanOrEqual(MAX_HOLD_HOURS);
    expect(CHECKPOINT_HOURS.some((h) => h <= MAX_HOLD_HOURS)).toBe(true);
  });

  it("orders the checkpoints", () => {
    expect([...CHECKPOINT_HOURS].sort((a, b) => a - b)).toEqual(CHECKPOINT_HOURS);
  });
});

describe("choosing what to auto-screen", () => {
  const cand = (over: Partial<Candidate> = {}): Candidate => ({
    mint: "So11111111111111111111111111111111111111112", symbol: "X", name: "X",
    liquidityUsd: 50_000, firstPoolAt: new Date("2026-09-26T20:00:00Z"), holderCount: 100, ...over,
  });
  const now = new Date("2026-09-26T21:00:00Z");
  const pick = (cs: Candidate[], extra = {}) => selectCandidates(cs, { now, recentlyScreened: new Set(), ...extra });

  it("takes the deepest liquidity first, so the survival answers carry information", () => {
    const r = pick([cand({ mint: "A".repeat(32), liquidityUsd: 9_000 }), cand({ mint: "B".repeat(32), liquidityUsd: 90_000 })], { limit: 1 });
    expect(r.take.map((c) => c.liquidityUsd)).toEqual([90_000]);
  });

  it("treats unknown liquidity as a skip, never as passing", () => {
    // A feed that renames a field must cost a filter, not let something through unchecked.
    const r = pick([cand({ liquidityUsd: null })]);
    expect(r.take).toHaveLength(0);
    expect(r.skipped["liquidity unknown"]).toBe(1);
  });

  it("skips the illiquid, the stale and the recently screened, and says which", () => {
    const mine = "C".repeat(32);
    const r = selectCandidates([
      cand({ mint: "D".repeat(32), liquidityUsd: 100 }),
      cand({ mint: "E".repeat(32), firstPoolAt: new Date("2026-09-20T00:00:00Z") }),
      cand({ mint: mine }),
    ], { now, recentlyScreened: new Set([mine]) });
    expect(r.take).toHaveLength(0);
    expect(r.skipped).toEqual({ "too illiquid": 1, "too old": 1, "screened recently": 1 });
  });

  it("honours the run limit, which is what bounds the RPC bill", () => {
    const many = Array.from({ length: 30 }, (_, i) => cand({ mint: `m${i}`.padEnd(32, "x") }));
    const r = pick(many, { limit: 5 });
    expect(r.take).toHaveLength(5);
    expect(r.skipped["over the run limit"]).toBe(25);
  });

  it("keeps a candidate with no first-pool time rather than guessing its age", () => {
    expect(pick([cand({ firstPoolAt: null })]).take).toHaveLength(1);
  });

  it("reads the feed defensively and ignores anything that is not a mint", () => {
    const rows = parseRecent([
      { id: "So11111111111111111111111111111111111111112", symbol: "SOL", liquidity: 1_000 },
      { id: "0xdeadbeef" }, { symbol: "no id" }, null, "nonsense",
    ]);
    expect(rows).toHaveLength(1);
    expect(rows[0].symbol).toBe("SOL");
    expect(rows[0].liquidityUsd).toBe(1_000);
  });

  it("survives a feed shape it does not recognise", () => {
    expect(parseRecent({})).toEqual([]);
    expect(parseRecent(null)).toEqual([]);
  });
});

describe("the sell probe is a size, and the size is part of the answer", () => {
  it("scales the probe amount with the dollar figure asked for", () => {
    expect(sellProbe("SomeMemeMint111111111111111111111111111111", 50).amount).toBe(50e6);
    expect(sellProbe("SomeMemeMint111111111111111111111111111111", 500).amount).toBe(500e6);
  });

  it("reports the size it used, so a cost figure is never sizeless", () => {
    expect(sellProbe("SomeMemeMint111111111111111111111111111111", 500).usd).toBe(500);
    // Screening USDC routes through wrapped SOL, but the dollar figure asked for is still what it says.
    expect(sellProbe("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", 500).usd).toBe(500);
  });

  it("states the size in the check detail", () => {
    // "round-trips at 2% cost" is not a fact about a token until you know what was being sold.
    const c = find(clean({ sellQuote: { probeIn: 500e6, probeOut: 490e6 }, sellProbeUsd: 500 }), "sellable");
    expect(c.detail).toContain("$500");
  });

  it("says a thin pool is thin rather than implying a trap", () => {
    const c = find(clean({ sellQuote: { probeIn: 500e6, probeOut: 495e6 }, sellPriceImpact: 0.3, sellProbeUsd: 500 }), "sellable");
    expect(c.verdict).toBe("warn");
    expect(c.detail).toMatch(/thin for that size/);
  });

  it("keeps the automatic probe fixed so the survival record stays comparable", () => {
    // A probe that followed SELL_PROBE_USD would make rows mean different things, and a large probe
    // against the small pools discovery finds would fail on arithmetic rather than on findings.
    expect(AUTO_PROBE_USD).toBe(50);
  });
});

describe("the deployer, once Jupiter can name them", () => {
  it("does not call it a first launch when mints are attributed but untraceable", () => {
    // The old wording said "first mint from this wallet" whenever no mints came back from the creator
    // index. With a count available from elsewhere, that claim is simply false.
    const c = find(clean({ deployerPriorMints: 0, deployerPriorRugs: 0, deployerChecked: 0, deployerAttributedMints: 14 }), "deployerHistory");
    expect(c.verdict).toBe("warn");
    expect(c.detail).toMatch(/14 mints are attributed/);
    expect(c.detail).not.toMatch(/[Ff]irst mint/);
  });

  it("fails a deployer sitting on a large slice of supply, however clean their record", () => {
    const c = find(clean({ deployerHoldShare: 0.22 }), "deployerHistory");
    expect(c.verdict).toBe("fail");
    expect(c.hard).toBe(true);
    expect(c.detail).toMatch(/22\.0% of supply/);
  });

  it("warns on a moderate holding without calling it disqualifying", () => {
    expect(find(clean({ deployerHoldShare: 0.08 }), "deployerHistory").verdict).toBe("warn");
    expect(find(clean({ deployerHoldShare: 0.01 }), "deployerHistory").verdict).toBe("pass");
  });

  it("says when the holding could not be read rather than treating it as nothing", () => {
    const c = find(clean({ deployerHoldShare: null }), "deployerHistory");
    expect(c.detail).toMatch(/could not be read/);
  });

  it("discloses when the deployer came from an index rather than the chain", () => {
    const viaJup = find(clean({ deployerIdentifiedBy: "jupiter" }), "deployerHistory");
    expect(viaJup.detail).toMatch(/Jupiter's index/);
    expect(find(clean({ deployerIdentifiedBy: "creator" }), "deployerHistory").detail).not.toMatch(/Jupiter/);
  });

  it("reads the token record without trusting its authority fields", () => {
    // Authorities are read off the mint account ourselves; a second-hand copy of a fact we hold is only
    // a way to be wrong. Only identity and the mint count are taken from here.
    const t = parseJupiterToken([{ id: "m", dev: "devwallet", launchpad: "pump.fun", holderCount: 42,
      audit: { devMints: 3, devBalancePercentage: 9 }, mintAuthority: "someone", organicScore: 88 }], "m");
    expect(t).toEqual({ dev: "devwallet", devMints: 3, launchpad: "pump.fun", holderCount: 42, liquidity: null });
  });

  it("returns null when the feed has no record of the mint", () => {
    expect(parseJupiterToken([{ id: "other" }], "m")).toBeNull();
    expect(parseJupiterToken([], "m")).toBeNull();
    expect(parseJupiterToken(null, "m")).toBeNull();
  });
});

describe("bugs the first fresh-token screens exposed", () => {
  it("never grades a token clear while a check is failing", () => {
    /*
     * The ladder was: hard fails -> avoid, unknown hard -> unproven, warns -> caution, else clear.
     * A soft failure appeared nowhere in it, so a token whose only problem was a failing concentration
     * check graded "clear" when it had no warnings, and the headline read "No disqualifying findings"
     * directly above a FAIL in the list.
     */
    const g = gradeScreen(runChecks(clean({ top10Share: 0.9, topHolderShare: 0.8 })));
    expect(g.softFails.map((c) => c.id)).toEqual(["concentration"]);
    expect(g.grade).toBe("caution");
    expect(g.grade).not.toBe("clear");
    expect(g.headline).toMatch(/check fails/);
    expect(g.headline).not.toMatch(/No disqualifying findings/);
    expect(g.headline).not.toMatch(/All checks cleared/);
  });

  it("still says nothing-disqualifying when only warnings are present", () => {
    const g = gradeScreen(runChecks(clean({ liquidityUsd: 9_000 })));
    expect(g.grade).toBe("caution");
    expect(g.softFails).toEqual([]);
    expect(g.headline).toMatch(/No disqualifying findings/);
  });

  it("reports concentration as unknown, not as a whale, when a pool cannot be identified", () => {
    // Pool exclusion compared token-account addresses against pair addresses, which can never match, so
    // a new token whose curve holds the supply was reported as "largest single wallet 100.0%".
    const c = find(clean({
      top10Share: null, topHolderShare: null,
      concentrationUnchecked: "the largest account holds 99.8% and could not be matched to a known pool",
    }), "concentration");
    expect(c.verdict).toBe("unknown");
    expect(c.detail).toMatch(/could not be matched to a known pool/);
  });

  it("counts a single holder as one holder", () => {
    expect(find(clean({ holderCount: 1 }), "concentration").detail).toMatch(/1 holder\./);
    expect(find(clean({ holderCount: 2 }), "concentration").detail).toMatch(/2 holders\./);
  });

  it("takes Jupiter's liquidity when DexScreener has not indexed the pool", () => {
    // DexScreener reported $0 for tokens Jupiter had already priced in the thousands, and "$0 in the
    // pool" alongside a working sell quote is self-contradictory.
    const t = parseJupiterToken([{ id: "m", liquidity: 5888.69 }], "m");
    expect(t?.liquidity).toBe(5888.69);
  });
});

describe("the record counts tokens, not repeated screens of the same token", () => {
  /*
   * Watching re-screens a mint every few hours, so one token contributes many rows. Treating those as
   * independent outcomes would overstate the evidence badly — forty tokens screened five times each is
   * forty observations dressed up as two hundred — and every survival rate would look far better
   * supported than it is. These tests describe the deduplication, using the shape screenRecord builds.
   */
  type Row = { mint: string; grade: string; survived: boolean; failureKind: string | null };
  const dedupe = (rows: Row[]) => {
    const first = new Map<string, Row>();
    for (const r of rows) if (!first.has(r.mint)) first.set(r.mint, r);
    return [...first.values()];
  };

  it("collapses repeats to the earliest screen of each mint", () => {
    const rows: Row[] = [
      { mint: "A", grade: "caution", survived: false, failureKind: "rug" },
      { mint: "A", grade: "avoid", survived: false, failureKind: "rug" },
      { mint: "A", grade: "avoid", survived: false, failureKind: "rug" },
      { mint: "B", grade: "clear", survived: true, failureKind: null },
    ];
    const kept = dedupe(rows);
    expect(kept).toHaveLength(2);
    // The earliest screen is the only one that was made before the outcome was known.
    expect(kept.find((r) => r.mint === "A")?.grade).toBe("caution");
  });

  it("does not let one token's repeats dominate a grade's survival rate", () => {
    const rows: Row[] = [
      ...Array.from({ length: 9 }, () => ({ mint: "A", grade: "clear", survived: false, failureKind: "rug" })),
      { mint: "B", grade: "clear", survived: true, failureKind: null },
    ];
    // Counting rows: 1 of 10 survived, a 10% rate off what is really two tokens.
    const naive = rows.filter((r) => r.survived).length / rows.length;
    const kept = dedupe(rows);
    const honest = kept.filter((r) => r.survived).length / kept.length;
    expect(naive).toBeCloseTo(0.1, 5);
    expect(honest).toBeCloseTo(0.5, 5);
    expect(kept).toHaveLength(2);
  });

  it("counts a checkpoint once per mint and hour", () => {
    const seen = new Set<string>();
    const obs = [["A", 1], ["A", 1], ["A", 6], ["B", 1]] as [string, number][];
    const counted = obs.filter(([m, h]) => { const k = `${m}@${h}`; if (seen.has(k)) return false; seen.add(k); return true; });
    expect(counted).toHaveLength(3);
  });

  it("still requires distinct tokens, not screens, for a survival model", () => {
    expect(SURVIVAL_MIN_SETTLED).toBe(200);
    // Below the threshold there is no number at all, whatever the row count says.
    expect(survivalProbability([], { intercept: 0, weights: {}, n: 199, horizonHours: 24 })).toBeNull();
  });
});

describe("the strong / medium / weak rating", () => {
  const rate = (over: Partial<TokenSnapshot> = {}) => {
    const t = clean({ sellProbeUsd: 500, liquidityUsd: 500 * 60, sellQuote: { probeIn: 500e6, probeOut: 495e6 }, sellPriceImpact: 0.01, ...over });
    const checks = runChecks(t);
    return rateEntry(checks, gradeScreen(checks), t);
  };

  it("rates a fully checked, cheap-to-exit token strong", () => {
    const r = rate();
    expect(r.rating).toBe("strong");
    expect(r.holdingBack).toEqual([]);
    // Even at its best it must not imply anything about price.
    expect(r.verdict).toMatch(/says nothing about where the price goes/);
  });

  it("never rates strong while a critical check is unknown", () => {
    // This is the whole point: unknown is not fine, and a tidy score must not paper over it.
    const r = rate({ lpLockedShare: null, lpUnchecked: "LP holders could not be read" });
    expect(r.rating).toBe("weak");
    expect(r.verdict).toMatch(/Unknown is not the same as fine/);
    expect(r.wouldRaise.join(" ")).toMatch(/re-screen/);
  });

  it("drops to avoid on a disqualifying finding and refuses to be tuned around", () => {
    const r = rate({ mintAuthorityRenounced: false, mintAuthority: "someone" });
    expect(r.rating).toBe("avoid");
    expect(r.verdict).toMatch(/Do not buy/);
    expect(r.wouldRaise.join(" ")).toMatch(/not a threshold to be tuned around/);
  });

  it("rates on the exit at YOUR size, not the token in the abstract", () => {
    // Same token, same checks: only the position size differs. A pool 3x your position is not the same
    // trade as one 60x it, and no check other than the sell simulation notices.
    const big = rate({ sellProbeUsd: 10_000, liquidityUsd: 30_000 });
    expect(big.rating).toBe("weak");
    expect(big.depthMultiple).toBeCloseTo(3, 1);
    expect(big.holdingBack.join(" ")).toMatch(/you are a large part of the market/);
    expect(big.wouldRaise.join(" ")).toMatch(/A position nearer \$2000/);
  });

  it("calls an expensive exit out as a cost you pay twice", () => {
    const r = rate({ sellQuote: { probeIn: 500e6, probeOut: 440e6 } });
    expect(r.rating).toBe("weak");
    expect(r.holdingBack.join(" ")).toMatch(/Getting out costs 12\.0%/);
  });

  it("treats a missing sell quote as the most important gap", () => {
    const r = rate({ sellQuote: null, sellPriceImpact: null });
    expect(r.rating).toBe("weak");
    expect(r.holdingBack.join(" ")).toMatch(/exit is unproven/);
  });

  it("ranks by clearance then cheaper exit, and never by anything resembling upside", () => {
    const rows = [
      { rating: "medium" as const, exitCost: 0.01 },
      { rating: "strong" as const, exitCost: 0.02 },
      { rating: "strong" as const, exitCost: 0.005 },
      { rating: "avoid" as const, exitCost: 0.001 },
    ];
    expect([...rows].sort(byClearance).map((r) => `${r.rating}:${r.exitCost}`))
      .toEqual(["strong:0.005", "strong:0.02", "medium:0.01", "avoid:0.001"]);
  });
});

describe("liquidity that cannot be locked, versus liquidity we failed to check", () => {
  it("warns that concentrated liquidity is withdrawable rather than reporting unknown", () => {
    // "LP lock is not checkable on orca" implied a gap in our tooling. There is no LP token in a
    // whirlpool at all, and the useful statement is that each position owner can pull their share.
    const c = find(clean({ lpLockedShare: null, lpWithdrawable: "This is a orca WP pool: liquidity is held as individual positions." }), "lpLocked");
    expect(c.verdict).toBe("warn");
    expect(c.detail).toMatch(/individual positions/);
  });

  it("still reports unknown when the pool type is one we have not implemented", () => {
    const c = find(clean({ lpLockedShare: null, lpWithdrawable: null, lpUnchecked: "LP lock is not implemented for meteora dyn2 pools" }), "lpLocked");
    expect(c.verdict).toBe("unknown");
    expect(c.hard).toBe(true);
  });
});

describe("concentrated pools, measured rather than shrugged at", () => {
  const conc = (over: Partial<TokenSnapshot> = {}) => clean({
    lpLockedShare: null,
    lpWithdrawable: "This is a orca WP pool: liquidity is held as individual positions, not as a pooled LP token, so there is nothing to burn or lock.",
    ...over,
  });

  it("fails when one position holds most of the pool", () => {
    // Exactly the risk an LP lock exists to prevent, arriving by a different route.
    const c = find(conc({ lpPositions: 12, lpTopPositionShare: 0.71 }), "lpLocked");
    expect(c.verdict).toBe("fail");
    expect(c.hard).toBe(true);
    expect(c.detail).toMatch(/71\.0% of the pool/);
  });

  it("warns, and says the figure is a floor, when one position is merely large", () => {
    const c = find(conc({ lpPositions: 30, lpTopPositionShare: 0.31 }), "lpLocked");
    expect(c.verdict).toBe("warn");
    expect(c.detail).toMatch(/floor on how concentrated/);
  });

  it("refuses to call a well-spread pool safe, because positions can share an owner", () => {
    const c = find(conc({ lpPositions: 400, lpTopPositionShare: 0.04 }), "lpLocked");
    expect(c.verdict).toBe("warn");
    expect(c.verdict).not.toBe("pass");
    expect(c.detail).toMatch(/not evidence that nobody can withdraw/);
  });

  it("says the split could not be measured when the pool type has no verified layout", () => {
    const c = find(conc({ lpPositions: null, lpTopPositionShare: null }), "lpLocked");
    expect(c.verdict).toBe("warn");
    expect(c.detail).toMatch(/individual positions/);
  });

  it("keeps a measured concentrated pool out of a strong rating", () => {
    const t = conc({ lpPositions: 400, lpTopPositionShare: 0.04, sellProbeUsd: 500, liquidityUsd: 500 * 80 });
    const checks = runChecks(t);
    const r = rateEntry(checks, gradeScreen(checks), t);
    expect(r.rating).not.toBe("strong");
    expect(r.holdingBack.join(" ")).toMatch(/Liquidity locked/);
  });
});

describe("decoding position accounts", () => {
  /*
   * The most consequential arithmetic in the screener: it decides the liquidity-lock verdict, and a
   * wrong offset would yield a confident number rather than an error. Every offset here was computed
   * by hand from the program's verbatim struct, and these tests exercise the guard that catches it
   * being wrong anyway.
   */
  const u128 = (v: bigint) => { const b = Buffer.alloc(16); b.writeBigUInt64LE(v & ((1n << 64n) - 1n), 0); b.writeBigUInt64LE(v >> 64n, 8); return b; };

  it("reads a little-endian u128 across both halves", () => {
    expect(readU128LE(u128(0n))).toBe(0n);
    expect(readU128LE(u128(12345n))).toBe(12345n);
    expect(readU128LE(u128((1n << 64n) + 7n))).toBe((1n << 64n) + 7n);
  });

  it("measures concentration across Orca positions", () => {
    const L = POSITION_LAYOUTS.wp;
    const spread = decodeSpread([u128(700n), u128(200n), u128(100n)], L);
    expect(spread).toEqual({ positions: 3, topShare: 0.7, name: "Orca Whirlpool" });
  });

  it("refuses to measure when the bytes do not look like liquidity", () => {
    // What a wrong offset actually yields: pubkey bytes, effectively uniform across the u128 range.
    const garbage = Buffer.from("f".repeat(32), "hex");
    expect(decodeSpread([garbage], POSITION_LAYOUTS.wp)).toBeNull();
    expect(plausible(MAX_PLAUSIBLE_LIQUIDITY)).toBe(false);
    expect(plausible(MAX_PLAUSIBLE_LIQUIDITY - 1n)).toBe(true);
  });

  it("returns null for closed positions rather than claiming a spread", () => {
    expect(decodeSpread([u128(0n), u128(0n)], POSITION_LAYOUTS.wp)).toBeNull();
    expect(decodeSpread([], POSITION_LAYOUTS.wp)).toBeNull();
  });

  it("slices only the bytes each read needs", () => {
    expect(spreadSlice(POSITION_LAYOUTS.wp)).toEqual({ offset: 72, length: 16 });
    expect(spreadSlice(POSITION_LAYOUTS.clmm)).toEqual({ offset: 81, length: 16 });
    // unlocked(152) through permanent(184)+16
    expect(lockSlice(POSITION_LAYOUTS.dyn2)).toEqual({ offset: 152, length: 48 });
  });

  it("computes a real lock share for DAMM v2, counting vested as withdrawable", () => {
    const L = POSITION_LAYOUTS.dyn2;
    // Two positions: [unlocked, vested, permanent]
    const pos = (u: bigint, v: bigint, p: bigint) => Buffer.concat([u128(u), u128(v), u128(p)]);
    const m = decodeLock([pos(100n, 0n, 700n), pos(50n, 150n, 0n)], L);
    // total 1000, permanent 700 -> 70% locked. Vested is not locked: it unlocks on a schedule.
    expect(m?.lockedShare).toBe(0.7);
    // Largest withdrawable position is 50+150 = 200 of 1000.
    expect(m?.topHolderShare).toBe(0.2);
    expect(m?.positions).toBe(2);
  });

  it("does not credit vested liquidity as locked", () => {
    const pos = (u: bigint, v: bigint, p: bigint) => Buffer.concat([u128(u), u128(v), u128(p)]);
    const m = decodeLock([pos(0n, 1000n, 0n)], POSITION_LAYOUTS.dyn2);
    expect(m?.lockedShare).toBe(0);
    expect(m?.topHolderShare).toBe(1);
  });

  it("rejects a lock read whose bytes are implausible", () => {
    const bad = Buffer.concat([Buffer.from("f".repeat(32), "hex"), Buffer.alloc(32)]);
    expect(decodeLock([bad], POSITION_LAYOUTS.dyn2)).toBeNull();
  });

  it("keeps every layout's offsets inside its account size", () => {
    for (const [label, L] of Object.entries(POSITION_LAYOUTS)) {
      expect(L.poolOffset + 32, `${label} pool field`).toBeLessThanOrEqual(L.size);
      if (L.liqOffset) expect(L.liqOffset + 16, `${label} liquidity field`).toBeLessThanOrEqual(L.size);
      if (L.locked) for (const [k, off] of Object.entries(L.locked)) {
        expect(off + 16, `${label} ${k}`).toBeLessThanOrEqual(L.size);
      }
      // A layout must give one or the other, or it can measure nothing.
      expect(!!L.liqOffset || !!L.locked, `${label} has no decodable field`).toBe(true);
    }
  });

  it("leaves Meteora DLMM out, because its accounts are variable-sized", () => {
    // Positions allocate more per-bin data as they grow, so a dataSize filter cannot target them and
    // no verbatim struct was available to compute offsets from. Absent is the honest state.
    expect(POSITION_LAYOUTS.dlmm).toBeUndefined();
  });
});

describe("watching a holding", () => {
  const base = { liquidityUsd: 100_000, exitCost: 0.02, topHolderShare: 0.08, priceUsd: 1 };
  const obs = (over: Partial<Observation> = {}): Observation =>
    ({ liquidityUsd: 100_000, exitCost: 0.02, sellQuoted: true, topHolderShare: 0.08, priceUsd: 1, ...over });
  const keys = (o: Observation, opts = {}) => watchAlerts(o, base, opts).map((a) => a.key);

  it("says nothing when nothing has changed", () => {
    // Silence is the default. A warning system that fires on noise gets ignored, which makes it worse
    // than no warning system.
    expect(watchAlerts(obs(), base)).toEqual([]);
  });

  it("raises the two ways out first, and marks them critical", () => {
    expect(keys(obs({ sellQuoted: false }))).toContain("exit-blocked");
    expect(watchAlerts(obs({ sellQuoted: false }), base)[0].severity).toBe("critical");
    expect(keys(obs({ liquidityUsd: 400 }))).toContain("liquidity-gone");
  });

  it("catches a draining pool against entry, not against the last check", () => {
    // Against the previous probe a slow drain never trips a threshold; against entry it does.
    expect(keys(obs({ liquidityUsd: 60_000 }))).toContain("liquidity-drop");
    expect(keys(obs({ liquidityUsd: 80_000 }))).not.toContain("liquidity-drop");
  });

  it("does not raise the alarm because a request failed", () => {
    // An API that did not answer is not a pool that drained.
    expect(watchAlerts(obs({ liquidityUsd: null, exitCost: null }), base)).toEqual([]);
  });

  it("flags an exit that got materially worse, and one that is simply bad", () => {
    expect(keys(obs({ exitCost: 0.14 }))).toContain("exit-worse");
    expect(keys(obs({ exitCost: 0.4 }))).toContain("exit-costly");
    expect(keys(obs({ exitCost: 0.05 }))).toEqual([]);
  });

  it("only mentions price when you set a stop, and never otherwise", () => {
    // The app has no opinion on price. This trigger exists because the user supplied a number.
    expect(keys(obs({ priceUsd: 0.4 }))).toEqual([]);
    expect(keys(obs({ priceUsd: 0.4 }), { stopLossPct: 0.5 })).toContain("stop-loss");
    expect(keys(obs({ priceUsd: 0.7 }), { stopLossPct: 0.5 })).not.toContain("stop-loss");
  });

  it("does not repeat the same warning every few minutes", () => {
    const a = { key: "liquidity-drop", severity: "critical" as const, line: "x" };
    const now = new Date("2026-09-27T12:00:00Z");
    const justSent = { key: "liquidity-drop", at: new Date("2026-09-27T11:30:00Z"), severity: "critical" as const };
    expect(shouldSend(a, justSent, now)).toBe(false);
    expect(shouldSend(a, { ...justSent, at: new Date("2026-09-27T05:00:00Z") }, now)).toBe(true);
    expect(shouldSend(a, { key: null, at: null }, now)).toBe(true);
  });

  it("always sends an escalation from warning to critical", () => {
    const worse = { key: "liquidity-drop", severity: "critical" as const, line: "x" };
    const now = new Date("2026-09-27T12:00:00Z");
    const sentMildly = { key: "liquidity-drop", at: new Date("2026-09-27T11:59:00Z"), severity: "warning" as const };
    expect(shouldSend(worse, sentMildly, now)).toBe(true);
  });

  it("leads the message with whether to act", () => {
    const m = watchMessage({ symbol: "WIF", mint: "abc", sizeUsd: 500, alerts: watchAlerts(obs({ sellQuoted: false }), base) });
    expect(m).toMatch(/Act now/);
    expect(m).toMatch(/\$500 position/);
    expect(m).toContain("abc");
  });
});
