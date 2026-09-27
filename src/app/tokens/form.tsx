"use client";
import { useActionState, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { addHolding, removeScreen, screen, stopWatching, type ScreenState } from "./actions";
import { cn } from "@/components/ui";

const input = "focus-ring w-full rounded-lg border hairline bg-black/30 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600";
const btn = "focus-ring rounded-lg border border-edge/40 px-3 py-1.5 text-sm text-edge hover:bg-edge/10 disabled:opacity-50";

/** Start watching a position, at the size you actually hold. */
export function HoldingForm() {
  const [s, act, pending] = useActionState<ScreenState, FormData>(addHolding, null);
  const router = useRouter();
  useEffect(() => { if (s?.ok) router.refresh(); }, [s, router]);
  return (
    <form action={act} className="space-y-2">
      <div className="flex flex-wrap items-end gap-2">
        <label className="min-w-0 flex-1 text-xs text-slate-400">Mint address
          <input name="mint" autoComplete="off" spellCheck={false} placeholder="the token you are holding" className={cn(input, "num")} />
        </label>
        <label className="text-xs text-slate-400">Size ($)
          <input name="sizeUsd" inputMode="decimal" placeholder="500" className={cn(input, "num w-24")} />
        </label>
        <label className="text-xs text-slate-400">Stop (%)
          <input name="stopLossPct" inputMode="decimal" placeholder="50" className={cn(input, "num w-20")} />
        </label>
        <label className="text-xs text-slate-400">Time (h)
          <input name="maxHoldHours" inputMode="decimal" placeholder="6" className={cn(input, "num w-20")} />
        </label>
        <button className={btn} disabled={pending}>{pending ? "Screening…" : "Watch"}</button>
      </div>
      {s && <p role="status" className={cn("text-xs", s.ok ? "text-edge" : "text-miss")}>{s.message}</p>}
      <p className="text-[11px] leading-relaxed text-slate-500">
        Checked every few minutes against what was true when you opened it, and you are messaged when the
        pool drains, a sale stops quoting, or your exit gets materially worse. The size matters: price
        impact scales with it, so this prices <em>your</em> exit rather than a $50 one.
      </p>
      <p className="text-[11px] leading-relaxed text-slate-500">
        Both stops are optional and both are <em>your</em> rules &mdash; nothing here has an opinion on
        where a price should go. A <b className="text-slate-300">price stop under about 30% will fire on
        ordinary movement</b> for most new tokens, and you will be told if the one you set sits inside
        this token&rsquo;s own recent range. The <b className="text-slate-300">time stop</b> is the
        stronger of the two: &ldquo;this has not worked in six hours&rdquo; needs no forecast. Neither is
        your real protection &mdash; a rug leaves no bid to sell into, so the liquidity and exit alerts
        are what catch the failure that traps you, and sizing is what survives it.
      </p>
    </form>
  );
}

/** Stop watching. The screens stay in the record; only the watching ends. */
export function StopWatchingButton({ id }: { id: string }) {
  const [busy, start] = useTransition();
  const router = useRouter();
  return (
    <button type="button" disabled={busy}
      className="focus-ring rounded-md border hairline px-1.5 py-0.5 text-[11px] text-slate-400 hover:text-miss disabled:opacity-50"
      onClick={() => start(async () => { await stopWatching(id); router.refresh(); })}>
      {busy ? "Closing…" : "Close"}
    </button>
  );
}

/** Removing one screen. Says what it did, because hiding and deleting are not the same thing. */
export function RemoveButton({ id }: { id: string }) {
  const [busy, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);
  const router = useRouter();
  if (msg) return <span className="text-[11px] text-slate-500">{msg}</span>;
  return (
    <button type="button" disabled={busy}
      className="focus-ring rounded-md border hairline px-1.5 py-0.5 text-[11px] text-slate-400 hover:text-miss disabled:opacity-50"
      onClick={() => start(async () => { const r = await removeScreen(id); setMsg(r.message); router.refresh(); })}>
      {busy ? "Removing…" : "Remove"}
    </button>
  );
}

export function ScreenForm() {
  const [s, act, pending] = useActionState<ScreenState, FormData>(screen, null);
  const router = useRouter();
  // A completed screen is a new row in the list below it.
  useEffect(() => { if (s) router.refresh(); }, [s, router]);
  return (
    <form action={act} className="space-y-2">
      <div className="flex flex-wrap items-end gap-2">
        <label className="min-w-0 flex-1 text-xs text-slate-400">Solana mint address
          <input name="mint" autoComplete="off" spellCheck={false} placeholder="e.g. EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" className={cn(input, "num")} />
        </label>
        <button className={btn} disabled={pending}>{pending ? "Screening…" : "Screen"}</button>
      </div>
      {s && <p role="status" className={cn("text-xs", s.ok ? "text-edge" : "text-miss")}>{s.message}</p>}
      <p className="text-[11px] leading-relaxed text-slate-500">
        Reads the mint account, the pools and a live sell quote. Takes a few seconds — the verdict is
        complete when it finishes, and you never wait to act on it. The result is also re-checked later,
        at one hour, six hours and a day, so the screener&rsquo;s own record can be judged against what
        actually happened.
      </p>
      <p className="text-[11px] leading-relaxed text-slate-500">
        The mint address is Solana&rsquo;s equivalent of a contract address: base58, 32–44 characters, no{" "}
        <span className="num">0x</span>. A link from pump.fun, Birdeye, Solscan or Jupiter works too — the
        address is pulled out of it. Not a DexScreener link, though: that one names the <em>pool</em>, and
        its address looks just like a token&rsquo;s. Copy the token address from the panel beside the chart.
      </p>
    </form>
  );
}
