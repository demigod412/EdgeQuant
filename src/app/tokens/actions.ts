"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { screenToken } from "@/lib/token/ledger";
import { parseMintInput } from "@/lib/token/mintInput";

export type ScreenState = { ok: boolean; message: string } | null;

/**
 * Start watching a position.
 *
 * The size is required and is the point: every sell simulation for this holding is priced at it, so the
 * exit cost you are shown is yours rather than a $50 stranger's.
 */
export async function addHolding(_: ScreenState, fd: FormData): Promise<ScreenState> {
  const parsed = parseMintInput(String(fd.get("mint") ?? ""));
  if (!parsed.ok) return { ok: false, message: parsed.message };
  const sizeUsd = Number(fd.get("sizeUsd"));
  if (!Number.isFinite(sizeUsd) || sizeUsd <= 0) return { ok: false, message: "Enter the position size in dollars." };
  const stopRaw = String(fd.get("stopLossPct") ?? "").trim();
  const stopPct = stopRaw ? Number(stopRaw) / 100 : null;
  if (stopRaw && (!Number.isFinite(stopPct!) || stopPct! <= 0 || stopPct! >= 1)) {
    return { ok: false, message: "A stop is a percentage between 1 and 99, or blank for none." };
  }
  try {
    const { openHolding } = await import("@/lib/token/holdings");
    const r = await openHolding(prisma, { mint: parsed.mint, sizeUsd, stopLossPct: stopPct });
    revalidatePath("/");
    return { ok: r.ok, message: r.message };
  } catch (e) {
    return { ok: false, message: `Could not start watching it: ${(e as Error).message}` };
  }
}

export async function stopWatching(id: string): Promise<{ ok: boolean; message: string }> {
  const { closeHolding } = await import("@/lib/token/holdings");
  const r = await closeHolding(prisma, id);
  revalidatePath("/");
  return r;
}

/**
 * Take a screen off the list.
 *
 * Deliberately two behaviours, because "delete" and "tidy up" are different needs and only one of them
 * is safe:
 *
 *   - Nothing learned from it yet (no checkpoint, no settled outcome) — deleted outright. A mistyped
 *     address, a pool address, a duplicate run: these are not observations and the record loses nothing.
 *   - Something HAS been observed — hidden from the list, kept in the record. A survival rate whose
 *     failures you can delete is not a record of anything, and the grades only ever become evidence
 *     because the outcomes are all still there. The message says which happened.
 */
export async function removeScreen(id: string): Promise<{ ok: boolean; message: string }> {
  const row = await prisma.tokenScreen.findUnique({
    where: { id },
    select: { id: true, symbol: true, settledAt: true, checkpoints: true },
  });
  if (!row) return { ok: false, message: "That screen no longer exists." };

  const observed = !!row.settledAt || (Array.isArray(row.checkpoints) && row.checkpoints.length > 0);
  const what = row.symbol ?? "the screen";
  if (observed) {
    await prisma.tokenScreen.update({ where: { id }, data: { hiddenAt: new Date() } });
    revalidatePath("/");
    return { ok: true, message: `${what} hidden. Its outcome stays in the record — that is what makes the grades mean anything.` };
  }
  await prisma.tokenScreen.delete({ where: { id } });
  revalidatePath("/");
  return { ok: true, message: `${what} deleted. Nothing had been observed from it yet, so the record is unaffected.` };
}

export async function screen(_: ScreenState, fd: FormData): Promise<ScreenState> {
  // Rejected here rather than sent to an RPC as a guess — but rejected with the reason, since "that is
  // not a mint address" left you to work out which of several ordinary mistakes you had made.
  const parsed = parseMintInput(String(fd.get("mint") ?? ""));
  if (!parsed.ok) return { ok: false, message: parsed.message };
  const mint = parsed.mint;
  try {
    const { grade, errors } = await screenToken(prisma, mint);
    return { ok: grade.grade !== "avoid", message: `${grade.headline}${errors.length ? ` (${errors.length} source${errors.length === 1 ? "" : "s"} unavailable)` : ""}` };
  } catch (e) {
    return { ok: false, message: `Screen failed: ${(e as Error).message}` };
  }
}
