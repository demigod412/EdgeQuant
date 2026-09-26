"use client";
import { useActionState } from "react";
import { closeTrade, logTrade } from "./actions";
import { Card, SectionTitle, cn } from "@/components/ui";

const field = "focus-ring w-full rounded-lg border hairline bg-black/30 px-3 py-2 text-sm num";
const btn = "focus-ring rounded-lg border border-edge/40 px-3 py-2 text-sm text-edge hover:bg-edge/10";

export function JournalForms({ instruments, open }: { instruments: { id: string; display: string }[]; open: { id: string; label: string }[] }) {
  const [logState, logAction, logPending] = useActionState(logTrade, null as { ok: boolean; message: string } | null);
  const [closeState, closeAction, closePending] = useActionState(closeTrade, null as { ok: boolean; message: string } | null);
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <SectionTitle>Log a trade</SectionTitle>
        <form action={logAction} className="grid grid-cols-2 gap-2">
          <label className="col-span-2 block"><span className="text-xs text-slate-400">Instrument</span>
            <select name="instrumentId" className={field}>{instruments.map((i) => <option key={i.id} value={i.id} className="bg-ink-950">{i.display}</option>)}</select></label>
          <label className="block"><span className="text-xs text-slate-400">Side</span>
            <select name="side" className={field}><option className="bg-ink-950">LONG</option><option className="bg-ink-950">SHORT</option></select></label>
          <label className="block"><span className="text-xs text-slate-400">Opened</span><input name="openedAt" type="datetime-local" className={field} /></label>
          <label className="block"><span className="text-xs text-slate-400">Entry</span><input name="entry" type="number" step="any" className={field} /></label>
          <label className="block"><span className="text-xs text-slate-400">Stop</span><input name="stop" type="number" step="any" className={field} /></label>
          <label className="block"><span className="text-xs text-slate-400">Target (optional)</span><input name="target" type="number" step="any" className={field} /></label>
          <label className="block"><span className="text-xs text-slate-400">Size (units)</span><input name="sizeUnits" type="number" step="any" className={field} /></label>
          <label className="col-span-2 block"><span className="text-xs text-slate-400">Why this trade?</span><input name="reason" className={field} placeholder="setup, level, what you expected" /></label>
          <label className="col-span-2 flex items-center gap-2 text-sm text-slate-300"><input name="followedPlan" type="checkbox" defaultChecked className="accent-edge" />Entered exactly as planned</label>
          <div className="col-span-2"><button className={btn} disabled={logPending}>{logPending ? "Saving…" : "Log trade"}</button>
            {logState && <span className={cn("ml-2 text-xs", logState.ok ? "text-edge" : "text-miss")}>{logState.message}</span>}</div>
        </form>
      </Card>
      <Card>
        <SectionTitle aside={`${open.length} open`}>Close a trade</SectionTitle>
        {open.length === 0 ? <p className="text-sm text-slate-400">No open trades logged.</p> : (
          <form action={closeAction} className="space-y-2">
            <label className="block"><span className="text-xs text-slate-400">Trade</span>
              <select name="id" className={field}>{open.map((o) => <option key={o.id} value={o.id} className="bg-ink-950">{o.label}</option>)}</select></label>
            <label className="block"><span className="text-xs text-slate-400">Exit price</span><input name="exit" type="number" step="any" className={field} /></label>
            <label className="block"><span className="text-xs text-slate-400">Anything you did wrong?</span><input name="mistakes" className={field} placeholder="moved stop, sized up, chased" /></label>
            <label className="flex items-center gap-2 text-sm text-slate-300"><input name="followedPlan" type="checkbox" defaultChecked className="accent-edge" />Managed it as planned</label>
            <button className={btn} disabled={closePending}>{closePending ? "Saving…" : "Close trade"}</button>
            {closeState && <span className={cn("ml-2 text-xs", closeState.ok ? "text-edge" : "text-miss")}>{closeState.message}</span>}
          </form>
        )}
      </Card>
    </div>
  );
}
