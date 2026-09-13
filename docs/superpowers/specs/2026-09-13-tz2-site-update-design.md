# TZ_2 site update — design

Date: 2026-09-13. Branch: `redesign/claude-design-v2`.

Source of truth for this round: `_ref/Aervigil-website_TЗ_2.md` (converted from
`Aervigil-website_TЗ_2.docx`, received 2026-09-13), plus the team chat of 2026-09-08…12.

## What changed in the brief

TZ_2 is revision 1(4) plus exactly two additions:

1. **Our Mission & Vision** — full copy. Mission is the hero triad plus the partner-fleet
   paragraph. Vision opens "You can't fix what you can't measure", states European cities are
   "up to 90% blind" to real air quality, and closes on district-by-district coverage growth
   and reducing mortality.
2. **Team roster** — nine people with Ukrainian job titles. Three carry an asterisk; the
   asterisk marks a correction in the document, not an employment status.

Everything else in TZ_2 matches revision 1(4) verbatim.

## Decisions taken with the client (2026-09-13)

- **Who we are** becomes its own page, `/company`, not an expanded homepage band.
- **Team** shows the top three only: Serhii Tkhorenko (CEO), Olha Tkhorenko (CCO),
  Oksana Rudyk (CTO). Cards template a portrait slot; real photos are being requested.
  The remaining staff are covered by one summary line, never named.
- **`/technology` is scrapped, not reconnected.** The existing page was an abandoned design
  experiment. Component, styles and copy are deleted and the page is rebuilt.
- **Navigation stays flat.** `/solutions` already proves the pattern: no dropdown submenus,
  no in-page section switcher. Subsections are plain anchors reachable by deep link.
- Both new pages follow the homepage and `/solutions` design language — existing tokens,
  the three approved surfaces, and the cyan-to-green route device.
- Work order is cheapest change first, with a screenshot preview after each step.

## Nav

Labels are already correct and do not change:
Problem · Technology · Why ADAM · Solutions · See It in Action · Who we are · News.

Only two hrefs change:

| Label | Was | Becomes |
| --- | --- | --- |
| Technology | `/#solution` | `/technology` |
| Who we are | `/#company` | `/company` |

The chat suggestion to rename Technology → "Solution" and Solutions → "Applications" was
superseded by the client's own label list and is not implemented.

## 1. Logo and header lockup

The supplied `ADAM by AerVigil logo horizontal color/white.svg` carry their wordmark as
paths. They are **reference only**: the site keeps rendering the sign asset plus an HTML
"ADAM / by AerVigil" lockup, per the standing decision in `AGENTS.md`.

- `.brand__logo` height 2.25rem → 3rem.
- `.brand__product` 1.125rem → 1.5rem; `.brand__company` 0.6875rem → 0.8125rem; letter
  spacing retuned so the HTML lockup reads at the proportions of the supplied horizontal
  logo.
- Compare the sign path data in the new horizontal files against
  `public/assets/adam-sign.svg`. If the artwork differs, re-export a sign-only crop for both
  the colour and white variants; if identical, keep the current assets.
- Footer lockup scales to match the header.

## 2. `/technology`, rebuilt

Delete `src/components/pages/TechnologyPage.tsx`, `src/styles/technology.css` and the
`site.technology` block. Remove the disconnection plumbing: the `/technology(/.*)?` redirect
in `vercel.json` and the `DISCONNECTED_ROUTES` entry in `worker/index.js`.

The new page mirrors `SolutionsPage`: an intro section, then colour bands threaded by
`RouteSpine`, then a closing CTA band. Anchors are deep-linkable.

| Band | `id` | Surface | Content (TZ_2) |
| --- | --- | --- | --- |
| Hardware | `hardware` | Mist | The nine hardware bullets as a method grid (method → what it measures); the operating-principle paragraph; EN 15267-4 stated as *targeting*; the engineering render, labelled in development |
| Software | `software` | Aer Navy | The seven platform bullets as feature cards; device mock disclosed as illustrative |
| AI engine | `ai-engine` | Eco Mist | "Over 100,000 measurements per vehicle per year" lead, then steps 01 Data Validation, 02 City Analysis, 03 Forecasting, 04 Recommendations & Optimization |

"Data analytics" from the old page is renamed **AI engine** to match the brief.

## 3. `/company`

Same skeleton as `/technology`.

| Band | `id` | Content |
| --- | --- | --- |
| Mission & Vision | `mission` | TZ_2 Mission and Vision copy, verbatim |
| Team | `team` | Three portrait cards with placeholder slots; one summary line for the wider team |
| Backed By | `backed` | EU funding logo and the existing acknowledgement line |
| Partners | `partners` | Short forward-looking note; no logos until partners exist |

The homepage `#company` band is reduced to a teaser that links here.

## 4. Plumbing

- `App.tsx` pathname check gains `/technology` and `/company`.
- `EXPECTED_SECTIONS` in `scripts/verify-page.mjs` updated for both pages.
- `docs/content-map.md`: rewrite the `/technology` block, add `/company`, update the nav table.
- `AGENTS.md`: delete the "Technology page decisions (page currently disconnected)" block and
  record the decisions above.

## Compliance guardrails (unchanged)

EN 15267-4 stays *targeting*, never certified. Demo and console imagery stay labelled
illustrative. The hardware render stays "in development". The problem statistics keep the
brief's wording and order. Forecasting and street-level simulation remain development goals.

## Build order

1. Logo sizing and the two nav hrefs — screenshot, review.
2. `/technology` rebuild — screenshot, review.
3. `/company` — screenshot, review.
4. Plumbing, docs, `pnpm build` + `pnpm test:sites` + `pnpm verify:page`.

## Open items

- Team portraits for the three leads, and confirmation of their English job titles.
- Whether `/company` or `/who-we-are` is the preferred URL (default: `/company`, matching the
  existing section id).
