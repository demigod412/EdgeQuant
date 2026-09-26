"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { screenToken } from "@/lib/token/ledger";
import { parseMintInput } from "@/lib/token/mintInput";

export type ScreenState = { ok: boolean; message: string } | null;

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
    revalidatePath("/tokens");
    return { ok: true, message: `${what} hidden. Its outcome stays in the record — that is what makes the grades mean anything.` };
  }
  await prisma.tokenScreen.delete({ where: { id } });
  revalidatePath("/tokens");
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
