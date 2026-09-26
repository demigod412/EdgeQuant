"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { rMultiple } from "@/lib/model/barriers";

/** Log a trade you actually took, and close it later. The gap between plan and behaviour is the point. */
export async function logTrade(_prev: unknown, fd: FormData) {
  try {
    const instrumentId = String(fd.get("instrumentId") ?? "");
    const entry = Number(fd.get("entry")), stop = Number(fd.get("stop")), size = Number(fd.get("sizeUnits"));
    if (!instrumentId || !(entry > 0) || !(stop > 0) || entry === stop) return { ok: false, message: "Entry, stop and instrument are required." };
    await prisma.trade.create({ data: {
      instrumentId, side: fd.get("side") === "SHORT" ? "SHORT" : "LONG", openedAt: new Date(String(fd.get("openedAt") || new Date().toISOString().slice(0, 16))),
      entry, stop, target: Number(fd.get("target")) || null, sizeUnits: size || 0, riskAmount: Math.abs(entry - stop) * (size || 0),
      reason: String(fd.get("reason") ?? "").slice(0, 400) || null, followedPlan: fd.get("followedPlan") === "on",
    } });
    revalidatePath("/journal");
    return { ok: true, message: "Trade logged" };
  } catch (e) { return { ok: false, message: (e as Error).message }; }
}

export async function closeTrade(_prev: unknown, fd: FormData) {
  try {
    const id = String(fd.get("id")), exit = Number(fd.get("exit"));
    const t = await prisma.trade.findUnique({ where: { id }, include: { instrument: true } });
    if (!t || !(exit > 0)) return { ok: false, message: "Exit price required." };
    const r = rMultiple(t.side, t.entry, t.stop, exit, t.instrument.feeBps + 2 * t.instrument.slipBps);
    await prisma.trade.update({ where: { id }, data: { exit, closedAt: new Date(), rMultiple: r,
      followedPlan: fd.get("followedPlan") === "on", mistakes: String(fd.get("mistakes") ?? "").slice(0, 400) || null } });
    revalidatePath("/journal");
    return { ok: true, message: `Closed at ${r.toFixed(2)}R` };
  } catch (e) { return { ok: false, message: (e as Error).message }; }
}
