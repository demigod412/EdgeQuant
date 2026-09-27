import { redirect } from "next/navigation";

/**
 * The screener moved to the landing page. Kept as a redirect because an installed PWA, a bookmark or a
 * shortcut may still point here.
 *
 * 307 rather than 308: a permanent redirect gets cached hard by installed PWAs, and if the layout ever
 * changes again that cache is not something you can reach in to clear.
 */
export default async function TokensMoved({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(await searchParams)) if (typeof v === "string") q.set(k, v);
  redirect(`/${q.size ? `?${q}` : ""}`);
}
