# Assets

Everything under `public/assets/` is served verbatim at the same path used in
[`src/content/site.ts`](../src/content/site.ts). Files are not hashed or processed by
Vite, so paths stay stable and can be quoted in decks and grant reports.

## Layout

`public/assets/` is grouped by the page that renders the asset. An asset used on more
than one page lives with the landing page:

```
public/assets/
  home/            Every image the homepage renders
    brand/         Logo marks — header and footer, so on all three pages
    icons/         process/ (How it works), capabilities/ (Why ADAM), audiences/ (Pilot)
  technology/      /technology only
```

`/solutions` has no images of its own: it reuses the `home/icons/audiences/` set.

Everything the site does not ship lives outside `public/` in `unused-assets/`, mirroring
where it came from:

```
unused-assets/
  public/assets/                    Dropped from the deploy (eu-funded-dark, logos/)
  design-assets/                    Brand lockups and generated icon/illustration masters
  aervigil-webpage-design/          Design-canvas bundle, screenshots and uploads
```

These are provenance, not dead weight — keep them, but nothing under `unused-assets/`
is served. If an asset stops being used, move it there rather than leaving it to ship.

## Inventory

| File | Used by | Provenance |
| --- | --- | --- |
| `home/brand/adam-logo-color.svg` | Header | Official brand mark |
| `home/brand/adam-logo-white.svg` | Footer | Official brand mark |
| `home/adam-hardware-closed.webp` | Solution figure | **Real hardware** — studio render of the enclosure prototype |
| `home/adam-kyiv-illustrative-demo.webp` | Demo | **Illustrative** — simulated data, must stay labelled |
| `home/polluted-city.webp` | Problem backdrop | Stock photography, decorative |
| `home/eu-funded-light.webp` | Company, footer | **Official EU funding emblem** — do not recolour, crop or restyle |
| `home/hero-moving-lab.webp` | Hero | Concept illustration |
| `home/footer-skyline.webp` | Footer | Decorative illustration |
| `home/og-cover.jpg` | Open Graph card only | Cropped from the hero master |
| `home/icons/process/01…05` | How it works | Generated process icons |
| `home/icons/capabilities/*` (4 WebP, 2 SVG) | Why ADAM | Generated capability icons |
| `home/icons/audiences/*-clean.webp` | Pilot | Generated audience illustrations (the `-clean` variants; the earlier busier versions were dropped) |
| `technology/adam-sensing-unit-render.webp` | Technology → Hardware | Engineering render — hardware in development |

## Rules

- **Concept and demo imagery must stay labelled.** The hardware figure carries an
  "in development" status, and the demo carries the simulated-data disclaimer. Both are
  compliance-relevant, not decoration — see [content-map.md](content-map.md).
- **The EU emblem is used as supplied.** Light version on light backgrounds, dark on dark.
- **Decorative images take `alt=""`** and are hidden from assistive tech; content images
  take a real description. `pnpm verify:page` fails if any `img` has no `alt` at all.
- **Below-the-fold images use `loading="lazy"`.** The hero image is eagerly loaded and
  preloaded from `index.html`, since it is the largest contentful paint.

## Image weight

Every raster asset ships as WebP, re-encoded from its master at twice the largest size it
is ever laid out at. Together they weigh **327 KB**, down from 11 MB of PNG and JPEG
masters — the icons alone were 4.7 MB to paint about 20 KB of pixels.

```bash
pnpm optimize:images
```

[`scripts/optimize-images.mjs`](../scripts/optimize-images.mjs) drives ffmpeg, holds the
target width and quality for each asset, and moves the master it read into
`unused-assets/public/assets/` mirroring its old path. It is re-runnable: once a master
is archived it stays the source, so tuning a quality setting never re-encodes an
already-encoded WebP. Run it after adding or replacing a master, then run
`pnpm verify:page` — that check fails on any image that does not load.

Widths follow the CSS, so changing a display size means changing the script too:

| Asset | Encoded at | Rendered at |
| --- | --- | --- |
| `home/hero-moving-lab.webp` | 1670w, q78 | full-bleed, the LCP element |
| `home/icons/process/*` | 128w, q85 | 56 × 56 px (`.step__icon`) |
| `home/icons/capabilities/*` | 128w, q85 | 44 × 44 px (`.advantage__icon img`) |
| `home/icons/audiences/*` | 288w, q85 | 136 × 136 px (`.audience__icon`) |
| `home/footer-skyline.webp` | 1200w, q45 | full-bleed at 14% opacity, 55% brightness |
| `home/eu-funded-light.webp` | 512w, q88 | 52px tall — scaled only, never recoloured or cropped |

`home/og-cover.jpg` is the exception: social crawlers are unreliable with WebP, so the
Open Graph card is a 1200 × 630 JPEG cropped from the hero master.

## The hero roof unit

Regenerated 2026-08-18 so the roof-mounted unit matches the real enclosure in
`adam-hardware-closed.jpg`. The earlier illustration carried a generic boxy pod with a
cylindrical dome on top — a different object, not just a different detail. The current
image has the correct silhouette: a low wedge, flat vertical front face sweeping up and
over in one continuous curve to a low tail, no dome, a circular intake port low on the
front face, and short vertical louvre slots above and outboard of it.

Not carried over: the `ADAM` wordmark on the top surface. The unit renders about 190px
wide at 1440w, so the wordmark would be sub-pixel — left off deliberately.

The pre-regeneration original is preserved at
`unused-assets/aervigil-webpage-design/assets/illustrations/hero-moving-lab.png`; the
generated file is also kept at
`unused-assets/design-assets/generated/illustrations/hero-moving-lab-adam-enclosure.png`.

If it needs regenerating again, the prompt is: keep the composition of the existing
illustration exactly — white electric compact SUV, elevated three-quarter front view,
near-white background, faint line-art city map, cyan signal arcs, blue-to-green route
ribbon, soft studio light — and render the roof unit to match `adam-hardware-closed.jpg`
per the silhouette described above, mounted on black crossbars with the flat face forward.
