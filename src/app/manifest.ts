import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "EdgeQuant",
    short_name: "EdgeQuant",
    description: "Calibrated crypto and FX setups with honest costs, a locked record, and a Solana token screener.",
    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    theme_color: "#0B1220",
    background_color: "#070B14",
    categories: ["finance", "productivity"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Token screener", url: "/" },
      { name: "Open calls", url: "/signals" },
      { name: "Record", url: "/accuracy" },
    ],
  };
}
