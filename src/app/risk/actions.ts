"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

export async function saveRisk(_prev: unknown, fd: FormData) {
  const num = (k: string, min: number, max: number, dflt: number) => Math.min(max, Math.max(min, Number(fd.get(k)) || dflt));
  await prisma.riskProfile.upsert({
    where: { id: "default" },
    update: { accountSize: num("accountSize", 1, 1e9, 1000), riskPctPerTrade: num("riskPct", 0.05, 5, 1), kellyFraction: num("kelly", 0.05, 1, 0.25), maxOpenRisk: num("maxOpenRisk", 0.1, 20, 3), maxPerMarket: Math.round(num("maxPerMarket", 1, 10, 3)) },
    create: { id: "default", accountSize: num("accountSize", 1, 1e9, 1000), riskPctPerTrade: num("riskPct", 0.05, 5, 1), kellyFraction: num("kelly", 0.05, 1, 0.25), maxOpenRisk: num("maxOpenRisk", 0.1, 20, 3), maxPerMarket: Math.round(num("maxPerMarket", 1, 10, 3)) },
  });
  revalidatePath("/risk"); revalidatePath("/");
  return { ok: true, message: "Saved" };
}
