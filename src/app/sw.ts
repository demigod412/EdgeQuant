/// <reference lib="webworker" />
import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { NetworkFirst, NetworkOnly, Serwist, ExpirationPlugin } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig { __SW_MANIFEST: (PrecacheEntry | string)[] | undefined }
}
declare const self: ServiceWorkerGlobalScope;

/*
 * Offline plan:
 *  - precache the app shell (build manifest) + /~offline
 *  - the read-only pages: NetworkFirst, so a bad connection shows the last version instead of nothing
 *  - /settings and /api/*: NetworkOnly — never cached, keys never touch the SW
 *
 * Two things here were inherited from PitchEdge and were wrong for this app: the matcher listed
 * /fixtures, /match, /league, /scanner and /top — none of which exist here — so no page was ever
 * cached, and the 3-second timeout was short enough that a slow database query could serve a stale
 * page in place of the live one. On a trading tool that is worse than waiting, so the timeout is
 * longer and cached pages expire in a day rather than three.
 */
const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    { matcher: ({ url }) => url.pathname.startsWith("/api/") || url.pathname.startsWith("/settings"), handler: new NetworkOnly() },
    {
      matcher: ({ request, url }) => request.mode === "navigate"
        && (url.pathname === "/" || /^\/(portfolio|backtest|accuracy|journal|risk|methodology|more|tokens)/.test(url.pathname)),
      handler: new NetworkFirst({
        cacheName: "pages",
        networkTimeoutSeconds: 8,
        plugins: [new ExpirationPlugin({ maxEntries: 40, maxAgeSeconds: 24 * 3600 })],
      }),
    },
    ...defaultCache,
  ],
  fallbacks: { entries: [{ url: "/~offline", matcher: ({ request }) => request.destination === "document" }] },
});
serwist.addEventListeners();
