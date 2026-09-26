/**
 * The service worker falls back here when a page is requested with no network and nothing cached.
 * It was referenced by sw.ts but never existed, so the fallback itself 404'd — the one moment it had
 * a job to do.
 */
export const metadata = { title: "Offline" };

export default function Offline() {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <h1 className="text-xl font-semibold tracking-tight">No connection</h1>
      <p className="mt-2 text-sm text-slate-400">
        This page needs the server, and the server cannot be reached. Pages you have already opened stay
        available offline for a day.
      </p>
      <p className="mt-4 text-xs text-slate-500">
        Nothing is lost: calls are locked server-side at the bar close, so the record is unaffected by
        whether your phone could load it.
      </p>
    </div>
  );
}
