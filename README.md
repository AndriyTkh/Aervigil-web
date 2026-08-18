# AerVigil — ADAM homepage

Marketing homepage for **ADAM by AerVigil**, a mobile AI-driven air quality monitoring
system that turns partner vehicle fleets into a network of street-level sensors.

Single page, static build. React + TypeScript + Vite, no runtime dependencies beyond React.

## Quick start

```bash
pnpm install
```

```bash
pnpm dev
```

Opens on <http://localhost:5173>.

## Scripts

| Script | What it does |
| --- | --- |
| `pnpm dev` | Vite dev server on port 5173 |
| `pnpm build` | Production build → `dist/client`, then prepares the Sites bundle |
| `pnpm preview` | Serves the production build locally |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm test:sites` | Node test for the Cloudflare-style worker in `worker/` |
| `pnpm verify:page` | Playwright smoke check + screenshots (needs `pnpm dev` running) |

## Layout

```
src/
  App.tsx                  Section order for the whole page
  main.tsx                 React root, font + stylesheet imports
  content/site.ts          Every string, link and asset path on the page
  components/
    layout/                SiteHeader (nav + mobile drawer), SiteFooter
    sections/              One component per page section, in page order
    ui/                    Eyebrow, Highlight, RouteLine, RouteJunction
  hooks/                   useReveal (scroll reveal), useScrolled (header state)
  styles/                  tokens → base → layout → components → sections
public/assets/             Images, icons and illustrations served as-is
scripts/                   Build helper + Playwright verification
worker/                    Static-asset worker with SPA fallback
tests/                     Worker test
docs/                      Design system, content map, architecture, assets
aervigil-webpage-design/   The approved Claude design — visual source of truth
_ref/                      Original client copy brief (TЗ)
```

Copy never lives in JSX — it lives in [`src/content/site.ts`](src/content/site.ts).
Colours, type sizes and spacing never live in component files — they live in
[`src/styles/tokens.css`](src/styles/tokens.css).

## Documentation

- [docs/design-system.md](docs/design-system.md) — tokens, type scale, components, breakpoints
- [docs/content-map.md](docs/content-map.md) — section-by-section copy and asset mapping
- [docs/architecture.md](docs/architecture.md) — app structure, build, deployment, verification
- [docs/assets.md](docs/assets.md) — asset inventory and provenance (what is real, what is illustrative)
- [AGENTS.md](AGENTS.md) — durable project decisions for coding agents

## Verifying a change

```bash
pnpm typecheck && pnpm build && pnpm test:sites
```

With the dev server running, add the visual pass:

```bash
pnpm verify:page
```

It fails on runtime errors, broken images, missing `alt`, dangling in-page anchors,
wrong section order, horizontal overflow, and a mobile drawer that does not open or
close. Screenshots land in `.playwright/shots/` (desktop and mobile, per section).
