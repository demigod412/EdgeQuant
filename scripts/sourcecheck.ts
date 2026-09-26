/** Check the price sources without touching the database: cd /var/www/edgequant && npm run sourcecheck */
import { sourceFor } from "../src/lib/data/provider";

(async () => {
  for (const market of ["CRYPTO", "FX"] as const) {
    const src = await sourceFor(market);
    if (!src) { console.log(`${market}: no source — FX needs a free Twelve Data key (Settings or TWELVE_DATA_KEY)`); continue; }
    const t = await src.test();
    console.log(`${market}: ${t.ok ? "OK  " : "FAIL"} ${t.message}`);
    if (!t.ok) continue;
    const sym = market === "CRYPTO" ? "BTCUSDT" : "EUR/USD";
    for (const tf of ["4h", "1d"] as const) {
      try { const bars = await src.candles(sym, tf, 50); const last = bars.at(-1);
        console.log(`   ${sym} ${tf}: ${bars.length} closed bars, last ${last ? new Date(last.openTime).toISOString() : "-"} close ${last?.close}`); }
      catch (e) { console.log(`   ${sym} ${tf}: ${(e as Error).message}`); }
    }
  }
})().catch((e) => { console.error(e); process.exit(1); });
