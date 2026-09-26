"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { setSecret, setSetting, SECRET_NAMES, type SecretName } from "@/lib/secrets";
import { prisma } from "@/lib/db";
import { sourceFor } from "@/lib/data/provider";

const PIN_COOKIE = "eq_admin";
export async function unlockSettings(_prev: unknown, fd: FormData) {
  const pin = String(fd.get("pin") ?? "");
  if (!process.env.SETTINGS_PIN || pin !== process.env.SETTINGS_PIN) return { ok: false, message: "Wrong PIN." };
  (await cookies()).set(PIN_COOKIE, "1", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 3600 });
  revalidatePath("/settings");
  return { ok: true, message: "Unlocked for an hour." };
}
export const isAdmin = async () => (await cookies()).get(PIN_COOKIE)?.value === "1";

export async function saveSettings(_prev: unknown, fd: FormData) {
  if (!(await isAdmin())) return { ok: false, message: "Unlock with your PIN first." };
  for (const name of SECRET_NAMES) {
    const v = String(fd.get(name) ?? "").trim();
    if (v) await setSecret(name as SecretName, v);
  }
  await setSetting("cryptoSource", fd.get("cryptoSource") === "bybit" ? "bybit" : "binance");
  const chat = String(fd.get("telegramChatId") ?? "").trim();
  if (chat) await setSetting("telegramChatId", chat);
  const enabled = new Set((fd.getAll("instrument") as string[]).map(String));
  const all = await prisma.instrument.findMany({ select: { id: true } });
  for (const i of all) await prisma.instrument.update({ where: { id: i.id }, data: { enabled: enabled.has(i.id) } });
  revalidatePath("/settings"); revalidatePath("/");
  return { ok: true, message: "Saved. Run a sync to pick up the change." };
}

export async function testAlert() {
  if (!(await isAdmin())) return { ok: false, message: "Unlock with your PIN first." };
  const { sendAlert } = await import("@/lib/alerts");
  const r = await sendAlert("<b>EdgeQuant</b> test alert — entry and exit notifications are working.");
  return r;
}

export async function testSources() {
  if (!(await isAdmin())) return { ok: false, message: "Unlock with your PIN first." };
  const out: string[] = [];
  for (const market of ["CRYPTO", "FX"] as const) {
    const src = await sourceFor(market);
    if (!src) { out.push(`${market}: no source (FX needs a Twelve Data key)`); continue; }
    const t = await src.test();
    out.push(`${market}: ${t.message}`);
  }
  return { ok: true, message: out.join(" · ") };
}
