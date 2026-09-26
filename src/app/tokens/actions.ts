"use server";
import { prisma } from "@/lib/db";
import { screenToken } from "@/lib/token/ledger";

export type ScreenState = { ok: boolean; message: string } | null;

/** Base58, 32–44 chars: a Solana mint. Rejected here rather than sent to an RPC as a guess. */
const MINT = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

export async function screen(_: ScreenState, fd: FormData): Promise<ScreenState> {
  const mint = String(fd.get("mint") ?? "").trim();
  if (!MINT.test(mint)) return { ok: false, message: "That is not a Solana mint address." };
  try {
    const { grade, errors } = await screenToken(prisma, mint);
    return { ok: grade.grade !== "avoid", message: `${grade.headline}${errors.length ? ` (${errors.length} source${errors.length === 1 ? "" : "s"} unavailable)` : ""}` };
  } catch (e) {
    return { ok: false, message: `Screen failed: ${(e as Error).message}` };
  }
}
