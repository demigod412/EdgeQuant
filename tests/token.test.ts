import { describe, expect, it } from "vitest";
import { runChecks, LIMITS } from "@/lib/token/checks";
import { gradeScreen, survivalProbability, SURVIVAL_MIN_SETTLED } from "@/lib/token/score";
import { sellProbe } from "@/lib/token/probe";
import { parseMintInput } from "@/lib/token/mintInput";
import { isPumpSwap, pumpswapLpMint } from "@/lib/token/pumpswap";
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
  liquidityUsd: 120_000, dexId: "raydium", lpUnchecked: null, lpLockedShare: 1, lpTopHolderShare: 0,
  top10Share: 0.18, topHolderShare: 0.05, holderCount: 4200,
  deployer: "dep", deployerPriorMints: 3, deployerPriorRugs: 0, deployerChecked: 3, deployerUnchecked: null,
  sniperBundleShare: 0.02, sniperWallets: 3, openingSlots: 60, openingUnchecked: null,
  sellQuote: { probeIn: 50, probeOut: 48.5 }, sellPriceImpact: 0.01,
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
    expect(c.detail).toMatch(/First mint from this wallet/);
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
    expect(find(clean({ deployerPriorMints: null, deployerPriorRugs: null }), "deployerHistory").detail).toMatch(/not traced/);
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
