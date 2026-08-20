# Design system

Every value here is defined once in [`src/styles/tokens.css`](../src/styles/tokens.css).
Components reference the custom property, never the literal. If a value is needed that
is not listed here, add a token rather than a one-off.

Source of truth for the visual design: `aervigil-webpage-design/Aervigil Homepage.dc.html`.

## Colour

| Token | Value | Role |
| --- | --- | --- |
| `--c-navy` | `#093C5C` | Aer Navy. Primary ink, primary button, dark band top |
| `--c-deep` | `#071F2E` | Deepest navy. Demo band, footer, dark band bottom |
| `--c-cyan` | `#28ABE3` | Air Cyan. Links, eyebrows, accent button, city route |
| `--c-green` | `#4ACB78` | Vigil Green. Confirmation, fleet route, news rule |
| `--c-bg` | `#F5F8FA` | Page background |
| `--c-surface` | `#FFFFFF` | Cards, white bands |
| `--c-mist` | `#E7EEF2` | "How it works" band, hairlines |
| `--c-mint` | `#E4EFEB` | "Why ADAM" band, hero badge |
| `--c-ink-soft` | `#42586A` | Secondary ink (audience lists) |
| `--c-muted` | `#667984` | Body copy on light |
| `--c-muted-dark` | `#9FB4BF` | Body copy on dark |
| `--c-legal` | `#4A5E69` | Footer legal line |

Backgrounds use exactly three surfaces (coordinator decision, 2026-08-20): `mist`,
`mint` ("Eco Mist") and the Aer Navy dark bands. Light bands alternate mist/mint down
the page; `surface` (white) and `bg` are reserved for cards and the page shell, never
section bands. Homepage order: `bg` (hero) → dark gradient → `mist` → `mint` → `mist` →
`deep` → `mint` → `mist` → `mint` → dark gradient → footer.

### The route

The continuous navy → cyan → green gradient is the brand's signature device and appears
three times: the hero illustration, the "How it works" route
([`RouteLine`](../src/components/ui/RouteLine.tsx)), and the converging city/fleet routes
in the pilot section ([`RouteJunction`](../src/components/ui/RouteJunction.tsx)). Cyan is
always the city; green is always the fleet.

## Typography

Plus Jakarta Sans (variable, self-hosted via `@fontsource-variable`). Monospace
(`--font-mono`) is reserved for technical asides: figure captions, the demo disclaimer
and unpublished news placeholders.

Sizes are fluid — `clamp()` between a 380px and a 1240px viewport, so no separate
mobile type scale is needed.

| Token | Range | Used for |
| --- | --- | --- |
| `--fs-hero` | 44 → 76px | `h1` |
| `--fs-h2-lg` | 32 → 48px | Contact CTA heading |
| `--fs-h2` | 28 → 46px | Section headings |
| `--fs-h2-sm` | 24 → 34px | "How it works" |
| `--fs-h2-xs` | 22 → 28px | "News" |
| `--fs-lede` | 16 → 17px | Body / lede |
| `--fs-body` … `--fs-2xs` | 15 / 14 / 13 / 12px | Card and caption copy |

Headings use `letter-spacing: -0.02em` and `text-wrap: balance`; body copy uses
`text-wrap: pretty`. Numeric figures use `font-variant-numeric: tabular-nums`.

## Spacing and layout

- Container: `--container` 1240px, gutter `--gutter` 48px (20px below 768px).
- Section rhythm: `--section-y` 104px, dropping to 60px below 768px.
- Radii: 6px buttons and inner images, 10px cards and figures, 12px icon tiles, pill badges.
- Elevation is always a soft, downward, low-opacity navy shadow — see `--shadow-*`.

## Breakpoints

Three, expressed in `rem` so they respect the user's font size:

| Width | What changes |
| --- | --- |
| `≤ 75rem` (1200px) | "How it works" becomes a centred 3-up flex row, the route hides |
| `≤ 62rem` (992px) | Nav collapses to a drawer; two-column sections stack; hero art becomes a faded backdrop |
| `≤ 48rem` (768px) | Gutters and section rhythm tighten; problem stats stack; steps become a vertical spine |
| `≤ 34rem` (544px) | Audience cards stack their icon above the copy |

## Components

| Class | Notes |
| --- | --- |
| `.btn--primary` | Navy fill → cyan on hover. Header CTA, hero primary, pilot CTA |
| `.btn--ghost` | Navy outline → mist fill on hover. Hero secondary |
| `.btn--accent` | Cyan fill → green on hover. Demo (on dark) |
| (removed) | Gradient buttons were retired 2026-08-20 — one flat style everywhere; dark bands use `.btn--accent` |
| `.eyebrow` | Uppercase kicker, `0.22em` tracking. `--cyan` default, `--muted` on the mint band |
| `.section__title` | Section heading; `--lg` / `--sm` / `--xs` modifiers |
| `.advantage` | "Why ADAM" card: icon tile + numbered title + body |
| `.step` | Process step: circular badge, number, title, body |

## Motion

- `--dur-fast` 160ms for hover and state changes, `--dur-slow` 620ms for scroll reveals.
- `.reveal` fades and rises 18px once in view. It is applied to content blocks, never to
  a whole section, so a partially-visible section is never blank.
- Both route devices are solid gradient strokes with one brighter pulse travelling along
  them (`route-travel`). The pulse paths carry `pathLength="100"`, so the -100
  `stroke-dashoffset` cycle is exactly one dash period: the pulse leaves the far end as its
  next repeat enters at the start, and the loop has no visible snap-back. The hero badge dot
  pulses (`pulse-dot`).
- `prefers-reduced-motion: reduce` disables all of it and reveals content immediately.

## Accessibility

- One `h1`; every section is labelled via `aria-labelledby`.
- Landmarks: `header` banner, `main`, `footer` contentinfo. A skip link precedes the nav.
- `:focus-visible` gets a 3px cyan outline everywhere.
- Decorative images use `alt=""` plus `aria-hidden`; content images carry real
  descriptions. Icons that duplicate an adjacent label use `alt=""`.
- Reveal animation is progressive: `.reveal` is only hidden after JavaScript adds
  `.js-reveal` to `<html>`, so the page is fully readable without it.
- The mobile drawer sets `aria-expanded`, closes on `Escape` and on backdrop click, locks
  body scroll while open, and unlocks when the viewport returns to desktop.

`pnpm verify:page` asserts the structural half of this list on every run.
