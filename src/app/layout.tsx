import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { JetBrains_Mono } from "next/font/google";
import { cookies, headers } from "next/headers";
import "./globals.css";
import { BottomTabs, LeftRail } from "@/components/Nav";
import { Disclaimer } from "@/components/Disclaimer";
import { InstallPrompt } from "@/components/InstallPrompt";
import { UnlockScreen } from "@/components/UnlockScreen";
import { getSetting } from "@/lib/secrets";
import { ACCESS_COOKIE, IDLE_MINUTES, isOpenPath, readToken } from "@/lib/access";
import { secretFor } from "@/lib/accessSecret";

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  title: { default: "EdgeQuant — measured trading", template: "%s · EdgeQuant" },
  description: "Calibrated probabilities, honest costs and a locked record for crypto and FX setups. A measurement tool, not advice.",
  applicationName: "EdgeQuant",
  appleWebApp: { capable: true, title: "EdgeQuant", statusBarStyle: "black-translucent" },
  icons: { icon: "/icons/icon-192.png", apple: "/icons/apple-touch-icon.png" },
};
export const viewport: Viewport = { themeColor: "#0B1220", width: "device-width", initialScale: 1, viewportFit: "cover" };
export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Access gate: every page except Settings needs the code, if one is set.
  let locked = false;
  try {
    const stored = await getSetting<{ salt: string; hash: string } | null>("accessCode", null);
    if (stored) {
      const path = (await headers()).get("x-pathname") ?? "/";
      const t = await readToken((await cookies()).get(ACCESS_COOKIE)?.value, secretFor(stored));
      locked = !t.valid && !isOpenPath(path);
    }
  } catch { /* database down: leave the app open rather than locking everyone out */ }

  return (
    <html lang="en" className={`${GeistSans.variable} ${mono.variable}`}>
      <body className="min-h-dvh bg-ink-950 text-slate-100 antialiased">
        {locked ? <UnlockScreen minutes={IDLE_MINUTES} /> : (
          <>
            <div className="flex">
              <LeftRail />
              <div className="min-w-0 flex-1 pb-20 md:pb-8">
                <main className="mx-auto max-w-5xl px-4 pt-5 md:px-8 md:pt-8">{children}</main>
                <Disclaimer />
              </div>
            </div>
            <BottomTabs />
            <InstallPrompt />
          </>
        )}
      </body>
    </html>
  );
}
