# Architecture

## Shape

One static page. No router, no data fetching, no state beyond the mobile drawer and two
scroll listeners. React is used for composition and a strict copy/markup separation, not
for interactivity the page does not have.

```
index.html → src/main.tsx → src/App.tsx → sections
                 │
                 ├── @fontsource-variable/plus-jakarta-sans (self-hosted, no CDN)
                 └── src/styles/index.css → tokens → base → layout → components → sections
```

### Layers

| Layer | Rule |
| --- | --- |
| `content/site.ts` | All copy, links and asset paths. No JSX, no logic |
| `components/sections/*` | Structure and semantics for one section. Reads `site`, owns no copy |
| `components/ui/*` | Small shared pieces used by more than one section |
| `components/layout/*` | Header and footer — the only stateful component is `SiteHeader` |
| `hooks/*` | Browser-side behaviour, isolated so sections stay declarative |
| `styles/*` | All visual values. Import order is load-bearing: tokens first |

`App.tsx` is deliberately thin — it is the page's table of contents, so section order can
be read at a glance and matched against `docs/content-map.md`.

### Why the CSS is plain

No CSS-in-JS and no utility framework: the page ships a single stylesheet with roughly a
hundred class names against a fixed token set. Class names are BEM-ish
(`block__element--modifier`), scoped by the section that owns them.

### Two behaviours worth knowing

**Scroll reveal** ([`useReveal`](../src/hooks/useReveal.ts)) — an IntersectionObserver adds
`.is-visible` once per element and unobserves it. `.reveal` is *only* hidden after the hook
puts `.js-reveal` on `<html>`, so without JavaScript (or with reduced motion) the page is
fully visible rather than blank.

**Mobile drawer** ([`SiteHeader`](../src/components/layout/SiteHeader.tsx)) — the backdrop
is rendered as a sibling of `<header>`, not a child. The header uses `backdrop-filter`,
which makes it the containing block for fixed-position descendants; a backdrop inside it
would only cover the header strip. The drawer itself is `position: absolute; top: 100%` on
the sticky header for the same reason.

## Build and deployment

```bash
pnpm build
```

Runs `vite build` into `dist/client`, then
[`scripts/prepare-sites-build.mjs`](../scripts/prepare-sites-build.mjs) copies the worker
and hosting manifest so the output matches what the Sites handoff expects:

```
dist/client/index.html      static site
dist/server/index.js        ← worker/index.js
dist/.openai/hosting.json   ← .openai/hosting.json
```

[`worker/index.js`](../worker/index.js) serves static assets and falls back to
`/index.html` for any HTML `GET`/`HEAD` that 404s, so deep links keep working.
[`tests/sites-worker.test.mjs`](../tests/sites-worker.test.mjs) covers that fallback.

**Do not** rename or remove `worker/index.js`, `scripts/prepare-sites-build.mjs`,
`tests/sites-worker.test.mjs` or `.openai/hosting.json` — the handoff depends on all four.

Images are served from `public/assets/` unhashed and unprocessed, so paths in `site.ts`
are stable and quotable. See [assets.md](assets.md).

## Verification

| Command | Catches |
| --- | --- |
| `pnpm typecheck` | Type and prop errors |
| `pnpm build` | Bundling, missing imports, Sites output shape |
| `pnpm test:sites` | Worker SPA fallback |
| `pnpm verify:page` | Runtime errors, broken images, missing `alt`, dangling `#anchors`, section order, horizontal overflow at three widths, the centring of the tablet step row, mobile drawer behaviour |

`verify-page.mjs` needs a running server. Point it elsewhere with
`BASE_URL=http://localhost:4173 pnpm verify:page` to check a production preview.
It writes desktop, tablet (900w) and mobile screenshots to `.playwright/shots/`
(gitignored) — the fastest way to review a visual change is to diff those.
