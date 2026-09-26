"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, BookOpen, Calculator, FlaskConical, LineChart, Menu, NotebookPen, PieChart, Settings } from "lucide-react";
import { cn } from "./ui";

const TABS = [
  { href: "/", label: "Signals", icon: Activity },
  { href: "/portfolio", label: "Portfolio", icon: PieChart },
  { href: "/backtest", label: "Backtest", icon: FlaskConical },
  { href: "/accuracy", label: "Record", icon: LineChart },
  { href: "/journal", label: "Journal", icon: NotebookPen },
  { href: "/more", label: "More", icon: Menu },
];
const RAIL = [...TABS.slice(0, 4), { href: "/journal", label: "Journal", icon: NotebookPen }, { href: "/risk", label: "Risk sizing", icon: Calculator },
  { href: "/methodology", label: "Methodology", icon: BookOpen }, { href: "/settings", label: "Settings", icon: Settings }];
const on = (path: string, href: string) => (href === "/" ? path === "/" : path.startsWith(href));

export function BottomTabs() {
  const path = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t hairline bg-ink-950/90 backdrop-blur md:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
      <ul className="grid grid-cols-5">
        {TABS.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link href={href} className={cn("focus-ring flex flex-col items-center gap-0.5 py-2 text-[10px]", on(path, href) ? "text-edge" : "text-slate-400")}>
              <Icon size={18} />{label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function LeftRail() {
  const path = usePathname();
  return (
    <aside className="hidden w-56 shrink-0 border-r hairline px-3 py-6 md:block">
      <Link href="/" className="focus-ring mb-6 block px-2.5 text-lg font-semibold tracking-tight">EdgeQuant</Link>
      <ul className="space-y-0.5">
        {RAIL.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link href={href} className={cn("focus-ring flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm", on(path, href) ? "bg-edge/10 text-edge" : "text-slate-300 hover:bg-white/[0.04]")}>
              <Icon size={16} />{label}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-6 px-2.5 text-[10px] leading-relaxed text-slate-500">Measurement first. Probabilities, costs and a locked record — not signals to follow blindly.</p>
    </aside>
  );
}
