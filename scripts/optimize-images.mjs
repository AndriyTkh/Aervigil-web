/**
 * Re-encodes the raster assets under `public/assets/` to WebP at the size each one is
 * actually displayed at, and archives the masters under `unused-assets/`.
 *
 * The site ships static files straight out of `public/`, so there is no bundler step to
 * resize images for us. This script is the resize step: run it whenever a master image
 * changes, then commit both the WebP and the archived original.
 *
 * Requires ffmpeg on PATH (libwebp encoder).
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, renameSync, statSync } from "node:fs";
import path from "node:path";

/**
 * `width` is twice the largest CSS size the asset is ever laid out at, so it stays sharp
 * on 2x displays without shipping more pixels than that. `quality` is libwebp's 0-100
 * scale; flat generated icons survive lower settings than photographic art.
 */
const ASSETS = [
  // Hero art is the LCP element: full-bleed, never upscaled past its native width.
  { file: "home/hero-moving-lab.png", width: 1670, quality: 78 },
  { file: "home/polluted-city.jpg", width: 1024, quality: 72 },
  { file: "home/adam-hardware-closed.jpg", width: 1400, quality: 80 },
  { file: "home/adam-kyiv-illustrative-demo.png", width: 1600, quality: 80 },
  // Decorative, drawn at 14% opacity and 55% brightness behind the footer — detail is
  // invisible here, so it takes the lowest settings of the set.
  { file: "home/footer-skyline.png", width: 1200, quality: 45 },
  // The EU emblem is scaled, never recoloured or cropped; it is line art on flat colour,
  // so it gets the highest quality of the set despite being the smallest.
  { file: "home/eu-funded-light.png", width: 512, quality: 88 },
  { file: "technology/adam-sensing-unit-render.jpg", width: 1600, quality: 80 },
];

// Icon sets: every file in the directory shares one display size.
const ICON_SETS = [
  { dir: "home/icons/process", width: 128, quality: 85 },      // .step__icon — 3.5rem
  { dir: "home/icons/capabilities", width: 128, quality: 85 }, // .advantage__icon img — 2.75rem
  { dir: "home/icons/audiences", width: 288, quality: 85 },    // .audience__icon — 8.5rem
];

const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC = path.join(ROOT, "public/assets");
const ARCHIVE = path.join(ROOT, "unused-assets/public/assets");

const ffprobe = (file, entries) =>
  execFileSync("ffprobe", [
    "-v", "error", "-select_streams", "v:0",
    "-show_entries", `stream=${entries}`, "-of", "csv=p=0", file,
  ]).toString().trim().split(",");

function optimize({ file, width, quality }) {
  const archived = path.join(ARCHIVE, file);
  // Re-runnable: once a master has been archived it stays the source of truth, so tuning
  // a quality setting never re-encodes an already-encoded WebP.
  const source = existsSync(archived) ? archived : path.join(PUBLIC, file);
  const target = path.join(PUBLIC, file).replace(/\.(png|jpe?g)$/i, ".webp");
  const [sourceWidth, pixelFormat] = ffprobe(source, "width,pix_fmt");

  // Never upscale: a master narrower than its slot is as good as it is going to get.
  const scaleWidth = Math.min(width, Number(sourceWidth));
  // Alpha has to be carried through explicitly — libwebp defaults to dropping it.
  const hasAlpha = /a/.test(pixelFormat.replace(/^yuv|^gbr/, ""));

  execFileSync("ffmpeg", [
    "-hide_banner", "-loglevel", "error", "-y", "-i", source,
    "-vf", `scale=${scaleWidth}:-2:flags=lanczos`,
    "-pix_fmt", hasAlpha ? "yuva420p" : "yuv420p",
    "-quality", String(quality),
    target,
  ]);

  if (source !== archived) {
    mkdirSync(path.dirname(archived), { recursive: true });
    renameSync(source, archived);
  }

  const before = statSync(archived).size;
  const after = statSync(target).size;
  return { file, before, after, scaleWidth };
}

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

const { globSync } = await import("node:fs");
const targets = [
  ...ASSETS,
  ...ICON_SETS.flatMap(({ dir, width, quality }) =>
    globSync(path.join(PUBLIC, dir, "*.{png,jpg,jpeg}"))
      .concat(globSync(path.join(ARCHIVE, dir, "*.{png,jpg,jpeg}")))
      .map((absolute) => ({
        file: path.relative(absolute.startsWith(ARCHIVE) ? ARCHIVE : PUBLIC, absolute).split(path.sep).join("/"),
        width,
        quality,
      })),
  ),
];

let before = 0;
let after = 0;
for (const target of targets) {
  const result = optimize(target);
  before += result.before;
  after += result.after;
  console.log(`${result.file.padEnd(52)} ${String(result.scaleWidth).padStart(5)}w  ${kb(result.before).padStart(9)} -> ${kb(result.after).padStart(8)}`);
}
console.log(`\ntotal ${kb(before)} -> ${kb(after)} (${(100 - (after / before) * 100).toFixed(1)}% smaller)`);
