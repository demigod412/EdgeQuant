import { prisma } from "@/lib/db";
import { getSetting, listSecretStatus } from "@/lib/secrets";
import { isAdmin } from "./actions";
import { AccessCodeForm, SettingsForm, UnlockPin } from "./forms";
import { Card, SectionTitle } from "@/components/ui";

export const dynamic = "force-dynamic";
export const metadata = { title: "Settings" };

export default async function Settings() {
  const admin = await isAdmin();
  const [instruments, cryptoSource, secrets, codeSet, telegramChatId] = await Promise.all([
    prisma.instrument.findMany({ orderBy: [{ market: "asc" }, { display: "asc" }] }),
    getSetting<string>("cryptoSource", "binance"),
    listSecretStatus(),
    getSetting<unknown>("accessCode", null).then((x) => x != null),
    getSetting<string>("telegramChatId", ""),
  ]);
  return (
    <div className="space-y-4">
      <header><h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Settings</h1>
        <p className="mt-1 max-w-2xl text-sm text-slate-400">Crypto data needs no key. FX needs a free Twelve Data key (800 requests a day). Keys stay on the server; pages read only the database.</p></header>
      <Card>
        <SectionTitle aside={admin ? "unlocked" : "locked"}>Data and instruments</SectionTitle>
        {admin
          ? <SettingsForm cryptoSource={cryptoSource} secrets={secrets} instruments={instruments.map((i) => ({ id: i.id, display: i.display, market: i.market, enabled: i.enabled, venue: i.venue }))} telegramChatId={telegramChatId} />
          : <UnlockPin />}
      </Card>
      <Card>
        <SectionTitle aside={codeSet ? "set" : "not set"}>Access code</SectionTitle>
        {admin ? <AccessCodeForm isSet={codeSet} /> : <p className="text-xs text-slate-400">Unlock with your PIN above to set or change the access code.</p>}
      </Card>
    </div>
  );
}
