import "server-only";
import { getSecret, getSetting } from "./secrets";

/*
 * Telegram alerts. Free, instant, and the only practical way to see a 4-hour bar close at 3am.
 * Failures are swallowed on purpose: a missed message must never stop a call being written to the ledger.
 */
export interface AlertResult { ok: boolean; message: string }

async function config() {
  // Never let a missing setting or an unreachable database break the pipeline that writes the ledger.
  try { return { token: await getSecret("TELEGRAM_BOT_TOKEN"), chat: await getSetting<string>("telegramChatId", "") }; }
  catch { return { token: null, chat: "" }; }
}
export async function alertsEnabled() { const c = await config(); return Boolean(c.token && c.chat); }

export async function sendAlert(text: string): Promise<AlertResult> {
  const { token, chat } = await config();
  if (!token || !chat) return { ok: false, message: "Telegram is not configured (token or chat id missing)." };
  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST", headers: { "Content-Type": "application/json" }, cache: "no-store",
      body: JSON.stringify({ chat_id: chat, text, parse_mode: "HTML", disable_web_page_preview: true }),
    });
    const body = (await r.json()) as { ok?: boolean; description?: string };
    return body.ok ? { ok: true, message: "Sent" } : { ok: false, message: body.description ?? `HTTP ${r.status}` };
  } catch (e) { return { ok: false, message: (e as Error).message }; }
}
export { entryMessage, exitMessage, summaryMessage } from "./alertText";
