"use client";
import { useActionState, useState, useTransition } from "react";
import { lockNow, saveAccessCode } from "@/app/unlock/actions";
import { saveSettings, testAlert, testSources, unlockSettings } from "./actions";
import { cn } from "@/components/ui";

const field = "focus-ring w-full rounded-lg border hairline bg-black/30 px-3 py-2 text-sm";
const btn = "focus-ring rounded-lg border hairline px-3 py-2 text-sm text-slate-200 hover:border-edge/40 hover:text-edge disabled:opacity-50";

export function UnlockPin() {
  const [state, action, pending] = useActionState(unlockSettings, null as { ok: boolean; message: string } | null);
  return (
    <form action={action} className="flex flex-wrap items-center gap-2">
      <input name="pin" type="password" inputMode="numeric" placeholder="Settings PIN" className={cn(field, "num max-w-[12rem]")} />
      <button className={btn} disabled={pending}>Unlock</button>
      {state && <span className={cn("text-xs", state.ok ? "text-edge" : "text-miss")}>{state.message}</span>}
    </form>
  );
}

export function SettingsForm({ cryptoSource, secrets, instruments, telegramChatId }: {
  cryptoSource: string; secrets: Record<string, string>; telegramChatId: string;
  instruments: { id: string; display: string; market: string; venue: string; enabled: boolean }[];
}) {
  const [state, action, pending] = useActionState(saveSettings, null as { ok: boolean; message: string } | null);
  const [test, setTest] = useState<string | null>(null);
  const [testing, startTest] = useTransition();
  const byMarket = ["CRYPTO", "FX"] as const;
  return (
    <form action={action} className="space-y-4">
      <label className="block max-w-sm"><span className="text-xs text-slate-400">Crypto source</span>
        <select name="cryptoSource" defaultValue={cryptoSource} className={field}>
          <option value="binance" className="bg-ink-950">Binance (no key)</option>
          <option value="bybit" className="bg-ink-950">Bybit (no key)</option>
        </select></label>
      <label className="block max-w-sm"><span className="text-xs text-slate-400">Twelve Data key — free, needed for FX {secrets.TWELVE_DATA_KEY !== "none" && <em className="text-edge">({secrets.TWELVE_DATA_KEY === "env" ? "set in env (wins)" : "saved"})</em>}</span>
        <input name="TWELVE_DATA_KEY" type="password" placeholder="paste to replace" className={field} /></label>
      <fieldset className="rounded-xl border hairline p-3">
        <legend className="px-1 text-xs text-slate-400">Telegram alerts (entry, exit, daily summary)</legend>
        <label className="block max-w-sm"><span className="text-xs text-slate-400">Bot token {secrets.TELEGRAM_BOT_TOKEN !== "none" && <em className="text-edge">(saved)</em>}</span>
          <input name="TELEGRAM_BOT_TOKEN" type="password" placeholder="from @BotFather" className={field} /></label>
        <label className="mt-2 block max-w-sm"><span className="text-xs text-slate-400">Chat id</span>
          <input name="telegramChatId" defaultValue={telegramChatId} placeholder="from @userinfobot" className={field} /></label>
      </fieldset>
      <fieldset>
        <legend className="mb-1 text-xs text-slate-400">Instruments to track</legend>
        {/*
          An empty list here is not "no pairs available" — the pairs are compiled into the app. It means
          nothing has been written to the database yet, which also empties every other page, so say so
          with the command that fixes it rather than showing four blank rows.
        */}
        {instruments.length === 0 ? (
          <p className="text-xs text-slate-400">
            No instruments in the database yet, which is why the rest of the app is empty too: with
            nothing to track there is nothing to sync, fit or price. Seed them on the server with{" "}
            <code className="num rounded bg-black/40 px-1 text-ice">npm run db:seed</code>, then{" "}
            <code className="num rounded bg-black/40 px-1 text-ice">npm run diagnose</code> to see what
            is still missing.
          </p>
        ) : byMarket.map((m) => {
          const rows = instruments.filter((i) => i.market === m);
          return (
            <div key={m} className="mb-2">
              <div className="text-[11px] uppercase tracking-wide text-slate-500">{m === "CRYPTO" ? "Crypto" : "Forex"}</div>
              <div className="flex flex-wrap gap-3 text-sm">
                {rows.length === 0
                  ? <span className="text-xs text-slate-500">none seeded — run <code className="num">npm run db:seed</code></span>
                  : rows.map((i) => (
                    <label key={i.id} className="flex items-center gap-1.5">
                      <input type="checkbox" name="instrument" value={i.id} defaultChecked={i.enabled} className="accent-edge" />{i.display}
                    </label>
                  ))}
              </div>
              {m === "FX" && rows.length > 0 && secrets.TWELVE_DATA_KEY === "none" && (
                <p className="mt-1 text-[11px] text-amber">These are listed but cannot sync until a Twelve Data key is saved above.</p>
              )}
            </div>
          );
        })}
      </fieldset>
      <div className="flex flex-wrap items-center gap-2">
        <button className={btn} disabled={pending}>{pending ? "Saving…" : "Save"}</button>
        <button type="button" className={btn} disabled={testing} onClick={() => startTest(async () => setTest((await testSources()).message))}>
          {testing ? "Testing…" : "Test data sources"}
        </button>
        <button type="button" className={btn} disabled={testing} onClick={() => startTest(async () => setTest((await testAlert()).message))}>
          Send test alert
        </button>
        {state && <span className={cn("text-xs", state.ok ? "text-edge" : "text-miss")}>{state.message}</span>}
      </div>
      {test && <p className="num text-[11px] text-slate-400">{test}</p>}
    </form>
  );
}

export function AccessCodeForm({ isSet }: { isSet: boolean }) {
  const [code, setCode] = useState("");
  const [s, setS] = useState<{ ok: boolean; message: string } | null>(null);
  const [pending, start] = useTransition();
  const run = (fn: () => Promise<{ ok: boolean; message: string }>) => start(async () => { setS(await fn()); setCode(""); });
  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-400">
        {isSet ? "An access code is set: everyone is asked for it before seeing predictions, and the app locks again after 30 minutes of inactivity. Settings always stays reachable with your PIN."
          : "No access code: anyone with the link can see the app. Set one to keep it private."}
      </p>
      <div className="flex flex-wrap gap-2">
        <input value={code} onChange={(e) => setCode(e.target.value)} type="text" autoComplete="off" placeholder={isSet ? "New code (4–32 characters)" : "Access code (4–32 characters)"}
          className="focus-ring min-w-0 flex-1 rounded-lg border hairline bg-black/30 px-3 py-2 text-sm text-slate-100" />
        <button className={btn} disabled={pending || code.trim().length < 4} onClick={() => run(() => saveAccessCode(code))}>{isSet ? "Change code" : "Set code"}</button>
        {isSet && <button className={btn} disabled={pending} onClick={() => run(() => saveAccessCode(null))}>Remove code</button>}
        {isSet && <button className={btn} disabled={pending} onClick={() => run(lockNow)}>Lock this device now</button>}
      </div>
      {s && <p className={cn("text-xs", s.ok ? "text-edge" : "text-miss")}>{s.message}</p>}
    </div>
  );
}
