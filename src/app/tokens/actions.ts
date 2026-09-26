"use server";
import { prisma } from "@/lib/db";
import { screenToken } from "@/lib/token/ledger";
import { parseMintInput } from "@/lib/token/mintInput";

export type ScreenState = { ok: boolean; message: string } | null;

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
