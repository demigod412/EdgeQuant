import Link from "next/link";
export const metadata = { title: "More" };
const links = [
  ["/portfolio", "Portfolio", "Ranked universe, volatility-targeted weights, risk state and carry"],
  ["/risk", "Risk sizing", "Account size, risk per trade, Kelly fraction and exposure caps"],
  ["/journal", "Journal", "Log your own trades and compare them with the plan"],
  ["/backtest", "Backtests", "Walk-forward results per setup, with costs"],
  ["/methodology", "Methodology", "Every formula the app uses"],
  ["/settings", "Settings", "Data source, keys, access code"],
];
export default function More() {
  return (
    <ul className="space-y-2">
      {links.map(([h, t, d]) => (
        <li key={h}><Link href={h} className="focus-ring glass block p-4"><div className="text-sm font-medium">{t}</div><div className="text-xs text-slate-400">{d}</div></Link></li>
      ))}
    </ul>
  );
}
