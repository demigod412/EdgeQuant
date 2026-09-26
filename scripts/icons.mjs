/**
 * Rasterise public/icons/icon.svg into the PNGs the manifest and Apple need:
 *   npm run icons
 *
 * Committed as PNGs so neither the build nor the server needs sharp; this script is only for
 * regenerating them after an edit to the SVG.
 *
 * The maskable variant is a different drawing, not a resize: Android crops it to an arbitrary shape,
 * so the tile bleeds to the edges and the glyph is pulled into the inner safe zone.
 */
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const DIR = new URL("../public/icons/", import.meta.url);
const svg = await readFile(new URL("icon.svg", DIR), "utf8");

/** Square-crop the rounded tile away and scale the glyph in, for Android's mask. */
const maskable = svg
  .replace('<rect width="512" height="512" rx="112" fill="url(#tile)"/>', '<rect width="512" height="512" fill="url(#tile)"/>')
  .replace('<g id="glyph">', '<g id="glyph" transform="translate(256 256) scale(0.76) translate(-256 -256)">');

/** Apple does not round the corners for you either way, but it does composite on black if there is alpha. */
const png = (source, size) => sharp(Buffer.from(source)).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

for (const [name, source, size] of [
  ["icon-192.png", svg, 192],
  ["icon-512.png", svg, 512],
  ["maskable-512.png", maskable, 512],
  ["apple-touch-icon.png", svg, 180],
]) {
  await writeFile(new URL(name, DIR), await png(source, size));
  console.log(`wrote ${name} (${size}px)`);
}
