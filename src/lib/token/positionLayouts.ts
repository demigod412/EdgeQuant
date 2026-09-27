/*
 * Decoding position accounts.
 *
 * Separate from helius.ts, which is server-only, so the offset arithmetic and the guards against a wrong
 * layout can be tested against synthetic buffers. That arithmetic is the most consequential code in the
 * screener: it decides the liquidity-lock verdict, and a wrong offset would produce a confident number
 * rather than an error.
 */

/*
 * Where a pool's liquidity CAN be measured, position by position.
 *
 * "There is no LP token to lock" is true but incomplete. The risk an LP lock protects against is that
 * someone withdraws the liquidity under you, and in a position-based pool that risk is still measurable:
 * if one position holds most of the pool, whoever owns it can pull most of the pool. Meteora's DAMM v2
 * goes further and tracks permanently locked liquidity per position, so there the real question — how
 * much of this can never be withdrawn — has a direct answer.
 *
 * ── Only layouts read off the program's own source go in here ──────────────────────────────────────
 * Every offset below was computed by hand from the verbatim struct definition, not from a summary. An
 * unverified decoder produces numbers rather than errors, and a confident wrong number on the
 * liquidity-lock check is the most expensive mistake this tool could make.
 *
 * Meteora DLMM is deliberately absent. Its positions allocate more per-bin data as they grow, so the
 * accounts are variable-sized and a dataSize filter cannot target them reliably — and no verbatim
 * struct was available to compute offsets from. It reports as unmeasured, which is true.
 */
export interface PositionLayout {
  program: string;
  /** Account size, for the dataSize filter. */
  size: number;
  /** Offset of the pool pubkey, for the memcmp filter. */
  poolOffset: number;
  name: string;
  /** A single u128 liquidity field: concentration only. */
  liqOffset?: number;
  /** Separate liquidity states, which give a genuine lock figure rather than just concentration. */
  locked?: { unlocked: number; vested: number; permanent: number };
}

export const POSITION_LAYOUTS: Record<string, PositionLayout> = {
  /*
   * orca-so/whirlpools — programs/whirlpool/src/state/position.rs
   *   LEN = 8 + 136 + 72 = 216
   *   8 whirlpool(32) 40 position_mint(32) 72 liquidity(u128)
   */
  wp: { program: "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc", size: 216, poolOffset: 8, liqOffset: 72, name: "Orca Whirlpool" },

  /*
   * raydium-io/raydium-clmm — programs/amm/src/states/personal_position.rs, PersonalPositionState
   *   8 bump(1) 9 nft_mint(32) 41 pool_id(32) 73 tick_lower(4) 77 tick_upper(4) 81 liquidity(u128)
   *   LEN = 8+1+32+32+4+4+16+16+16+8+8 + PositionRewardInfo::LEN(24) * REWARD_NUM(3) + 64 = 281
   * Borsh, not zero-copy, so there is no alignment padding to account for.
   */
  clmm: { program: "CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK", size: 281, poolOffset: 41, liqOffset: 81, name: "Raydium CLMM" },

  /*
   * MeteoraAg/damm-v2 — programs/cp-amm/src/state/position.rs, Position
   *   8 pool(32) 40 nft_mint(32) 72 fee_a_checkpoint(32) 104 fee_b_checkpoint(32)
   *   136 fee_a_pending(8) 144 fee_b_pending(8)
   *   152 unlocked_liquidity(u128) 168 vested_liquidity(u128) 184 permanent_locked_liquidity(u128)
   *   const_assert_eq!(Position::INIT_SPACE, 400) → account is 8 + 400 = 408
   * zero_copy/repr(C): the first u128 sits at struct offset 144, a multiple of 16, so no padding is
   * inserted ahead of it and the borsh-style arithmetic above holds.
   */
  dyn2: {
    program: "cpamdpZCGKUy5JxQXB4dcpGPiikHawvSWAd6mEn1sGG", size: 408, poolOffset: 8, name: "Meteora DAMM v2",
    locked: { unlocked: 152, vested: 168, permanent: 184 },
  },
};

/** Little-endian u128 out of a 16-byte buffer. */
export function readU128LE(buf: Buffer, at = 0): bigint {
  return buf.readBigUInt64LE(at) + (buf.readBigUInt64LE(at + 8) << 64n);
}

/**
 * A ceiling on what a real liquidity value looks like.
 *
 * The last line of defence against a wrong offset. Pool liquidity lives far below this; bytes read from
 * the wrong place are effectively uniform across the whole u128 range, so they clear it almost always.
 * Anything above it means the layout is wrong, and the measurement is discarded rather than reported.
 */
export const MAX_PLAUSIBLE_LIQUIDITY = 1n << 100n;
export const plausible = (...xs: bigint[]) => xs.every((x) => x < MAX_PLAUSIBLE_LIQUIDITY);

/** Which bytes a concentration read needs. */
export const spreadSlice = (L: PositionLayout) => ({ offset: L.liqOffset!, length: 16 });

/** Which bytes a lock read needs: one span covering all three liquidity states. */
export function lockSlice(L: PositionLayout) {
  const o = L.locked!;
  const first = Math.min(o.unlocked, o.vested, o.permanent);
  const last = Math.max(o.unlocked, o.vested, o.permanent) + 16;
  return { offset: first, length: last - first };
}

/**
 * Concentration from raw position slices: how much of the pool sits in its largest position.
 *
 * Null rather than a number whenever the data does not look like liquidity — a wrong offset must not be
 * able to produce a confident figure.
 */
export function decodeSpread(bufs: Buffer[], L: PositionLayout): { positions: number; topShare: number; name: string } | null {
  if (!L.liqOffset || !bufs.length) return null;
  let total = 0n, top = 0n;
  for (const buf of bufs) {
    if (buf.length < 16) return null;
    const liq = readU128LE(buf);
    if (!plausible(liq)) return null;
    total += liq;
    if (liq > top) top = liq;
  }
  // Positions all at zero liquidity are closed ones: nothing to measure and nothing to claim.
  if (total === 0n) return null;
  return { positions: bufs.length, topShare: Number((top * 10_000n) / total) / 10_000, name: L.name };
}

/**
 * A real lock figure from DAMM v2 position slices.
 *
 * Vested liquidity counts as withdrawable, not locked: it unlocks on a schedule, and crediting the pool
 * for a restriction that expires would be the same error as treating an unknown as a pass.
 */
export function decodeLock(bufs: Buffer[], L: PositionLayout): { lockedShare: number; topHolderShare: number; positions: number; name: string } | null {
  if (!L.locked || !bufs.length) return null;
  const o = L.locked;
  const { offset: base, length } = lockSlice(L);
  let total = 0n, permanent = 0n, topLive = 0n;
  for (const buf of bufs) {
    if (buf.length < length) return null;
    const u = readU128LE(buf, o.unlocked - base);
    const v = readU128LE(buf, o.vested - base);
    const p = readU128LE(buf, o.permanent - base);
    if (!plausible(u, v, p)) return null;
    total += u + v + p;
    permanent += p;
    const live = u + v;
    if (live > topLive) topLive = live;
  }
  if (total === 0n) return null;
  const share = (x: bigint) => Number((x * 10_000n) / total) / 10_000;
  return { lockedShare: share(permanent), topHolderShare: share(topLive), positions: bufs.length, name: L.name };
}
