"use client";
import { useActionState } from "react";
import { saveRisk } from "./actions";
import { cn } from "@/components/ui";

const field = "focus-ring w-full rounded-lg border hairline bg-black/30 px-3 py-2 text-sm num";
export function RiskForm({ risk }: { risk: { accountSize: number; riskPctPerTrade: number; kellyFraction: number; maxOpenRisk: number; maxPerMarket: number } }) {
  const [state, action, pending] = useActionState(saveRisk, null as { ok: boolean; message: string } | null);
  const rows: [string, string, number, string][] = [
    ["accountSize", "Account size", risk.accountSize, "Total capital you trade with"],
    ["riskPct", "Risk per trade (%)", risk.riskPctPerTrade, "1% or less is normal; 2%+ is aggressive"],
    ["kelly", "Kelly fraction", risk.kellyFraction, "0.25 = quarter Kelly"],
    ["maxOpenRisk", "Max open risk (%)", risk.maxOpenRisk, "Total at risk across all open trades"],
    ["maxPerMarket", "Max positions per market", risk.maxPerMarket, "Correlated positions are really one bet"],
  ];
  return (
    <form action={action} className="space-y-3">
      {rows.map(([name, label, value, hint]) => (
        <label key={name} className="block">
          <span className="text-xs text-slate-400">{label}</span>
          <input name={name} type="number" step="any" defaultValue={value} className={field} />
          <span className="text-[11px] text-slate-500">{hint}</span>
        </label>
      ))}
      <button className="focus-ring rounded-lg border border-edge/40 px-3 py-2 text-sm text-edge hover:bg-edge/10" disabled={pending}>{pending ? "Saving…" : "Save"}</button>
      {state && <span className={cn("ml-2 text-xs", state.ok ? "text-edge" : "text-miss")}>{state.message}</span>}
    </form>
  );
}
