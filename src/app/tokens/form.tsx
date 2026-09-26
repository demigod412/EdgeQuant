"use client";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { screen, type ScreenState } from "./actions";
import { cn } from "@/components/ui";

const input = "focus-ring w-full rounded-lg border hairline bg-black/30 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600";
const btn = "focus-ring rounded-lg border border-edge/40 px-3 py-1.5 text-sm text-edge hover:bg-edge/10 disabled:opacity-50";

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
        Reads the mint account, the pools and a live sell quote. Takes a few seconds. The result is
        recorded and judged again after the horizon, whatever it said today.
      </p>
    </form>
  );
}
