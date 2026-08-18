# Assets

Everything under `public/assets/` is served verbatim at the same path used in
[`src/content/site.ts`](../src/content/site.ts). Files are not hashed or processed by
Vite, so paths stay stable and can be quoted in decks and grant reports.

Originals live in `aervigil-webpage-design/assets/` (the approved design bundle) and
`design-assets/generated/` (generated icons and illustrations). `public/` holds only what
the page actually references — if an asset stops being used, remove it from `public/`
rather than leaving it to ship.

## Inventory

| File | Used by | Provenance |
| --- | --- | --- |
| `adam-logo-color.svg` | Header | Official brand mark |
| `adam-logo-white.svg` | Footer | Official brand mark |
| `adam-hardware-closed.jpg` | Solution figure | **Real hardware** — studio render of the enclosure prototype |
| `adam-kyiv-illustrative-demo.png` | Demo | **Illustrative** — simulated data, must stay labelled |
| `polluted-city.jpg` | Problem backdrop | Stock photography, decorative |
| `eu-funded-light.png` / `eu-funded-dark.png` | Company, footer | **Official EU funding emblem** — do not recolour, crop or restyle |
| `illustrations/hero-moving-lab.png` | Hero | Concept illustration |
| `illustrations/footer-skyline.png` | Footer | Decorative illustration |
| `icons/process/01…05` | How it works | Generated process icons |
| `icons/capabilities/*` (4 PNG, 2 SVG) | Why ADAM | Generated capability icons |
| `icons/audiences/*-clean.png` | Pilot | Generated audience illustrations (the `-clean` variants; the earlier busier versions were dropped) |

## Rules

- **Concept and demo imagery must stay labelled.** The hardware figure carries an
  "in development" status, and the demo carries the simulated-data disclaimer. Both are
  compliance-relevant, not decoration — see [content-map.md](content-map.md).
- **The EU emblem is used as supplied.** Light version on light backgrounds, dark on dark.
- **Decorative images take `alt=""`** and are hidden from assistive tech; content images
  take a real description. `pnpm verify:page` fails if any `img` has no `alt` at all.
- **Below-the-fold images use `loading="lazy"`.** The hero image is eagerly loaded and
  preloaded from `index.html`, since it is the largest contentful paint.

## Known issue: image weight

The bundle is roughly **9.9 MB of images**, and the icons are the bulk of it:

| Asset | On disk | Rendered at |
| --- | --- | --- |
| `illustrations/hero-moving-lab.png` | 2.1 MB | up to 1440px wide |
| `illustrations/footer-skyline.png` | 1.1 MB | full-bleed backdrop at 14% opacity |
| `adam-kyiv-illustrative-demo.png` | 1.1 MB | ~600px wide |
| `icons/process/01-partner-fleet.png` | 858 KB | **56 × 56 px** |
| `icons/process/04-city-map.png` | 787 KB | **56 × 56 px** |
| `icons/capabilities/*.png` | 220–361 KB each | **44 × 44 px** |
| `icons/audiences/*-clean.png` | ~300 KB each | 150 × 150 px |

Every icon is a ~1254px PNG scaled down in the browser: roughly 4 MB delivered to paint
about 20 KB of pixels. Lazy loading keeps it off the critical path, but it still costs
mobile visitors real bandwidth.

The fix is a one-off downscale-and-re-encode pass — target 2× the rendered size and
prefer WebP with a PNG fallback only where transparency matters:

```bash
pnpm add -D sharp
```

Then resize each icon to 112px (process), 88px (capabilities) and 300px (audiences),
re-encode the three large illustrations to WebP at ~1600px, and re-run
`pnpm verify:page` to confirm nothing broke. Expect the page to drop from ~9.4 MB to
under 1 MB. This has not been done yet — the source images are the originals as supplied,
and re-encoding brand assets is a decision for the owner, not a build-time default.

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
`aervigil-webpage-design/assets/illustrations/hero-moving-lab.png`; the generated file is
also kept at `design-assets/generated/illustrations/hero-moving-lab-adam-enclosure.png`.

If it needs regenerating again, the prompt is: keep the composition of the existing
illustration exactly — white electric compact SUV, elevated three-quarter front view,
near-white background, faint line-art city map, cyan signal arcs, blue-to-green route
ribbon, soft studio light — and render the roof unit to match `adam-hardware-closed.jpg`
per the silhouette described above, mounted on black crossbars with the flat face forward.
