# Content map

Section-by-section mapping of the site (homepage plus `/solutions`). Copy lives in
[`src/content/site.ts`](../src/content/site.ts) and is taken verbatim from the approved
design, `aervigil-webpage-design/Aervigil Homepage.dc.html`, which in turn implements the
client copy brief in `_ref/Aervigil-website_TЗ_1(4).md` (revision 1(4); the earlier
revision is kept as `_ref/Aervigil-website_TЗ.docx(1).md`).

To change wording, edit `site.ts`. Nothing else needs touching.

| # | `id` | Component | `site` key | Key assets |
| --- | --- | --- | --- | --- |
| 1 | `hero` | [HeroSection](../src/components/sections/HeroSection.tsx) | `site.hero` | `illustrations/hero-moving-lab.png` |
| 2 | `problem` | [ProblemSection](../src/components/sections/ProblemSection.tsx) | `site.problem` | `polluted-city.jpg` |
| 3 | `solution` | [SolutionSection](../src/components/sections/SolutionSection.tsx) | `site.solution` | `adam-hardware-closed.jpg` |
| 4 | `how` | [HowItWorksSection](../src/components/sections/HowItWorksSection.tsx) | `site.how` | `icons/process/01…05` |
| 5 | `why` | [WhyAdamSection](../src/components/sections/WhyAdamSection.tsx) | `site.why` | `icons/capabilities/*` |
| 6 | `demo` | [DemoSection](../src/components/sections/DemoSection.tsx) | `site.demo` | `adam-kyiv-illustrative-demo.png` |
| 7 | `network` | [NetworkSection](../src/components/sections/NetworkSection.tsx) | `site.network` (teaser cards; full text on `/solutions`) | `icons/audiences/*-clean.png` |
| 8 | `company` | [CompanySection](../src/components/sections/CompanySection.tsx) | `site.company` | `eu-funded-light.png` |
| 9 | `team` | [TeamSection](../src/components/sections/TeamSection.tsx) | `site.team` | `team/*.webp` |
| 10 | `news` | [NewsSection](../src/components/sections/NewsSection.tsx) | `site.news` | — |
| 11 | `contact` | [ContactSection](../src/components/sections/ContactSection.tsx) | `site.contact` | — |
| — | — | [SiteHeader](../src/components/layout/SiteHeader.tsx) | `site.nav`, `site.brand` | `adam-logo-color.svg` |
| — | — | [SiteFooter](../src/components/layout/SiteFooter.tsx) | `site.footer` | `adam-logo-white.svg`, `eu-funded-dark.png`, `illustrations/footer-skyline.png` |

`verify-page.mjs` asserts this order; changing it means updating `EXPECTED_SECTIONS` too.


## /technology (disconnected)

The page is not part of the build: `App.tsx` no longer routes `/technology` and
`src/styles/index.css` no longer imports `technology.css`, so the `Technology` nav and
footer links point at the homepage `#solution` anchor instead. Source, copy
(`site.technology`) and styles are kept so it can be reconnected. Because both hosts
rewrite unknown paths to `index.html`, `/technology` would otherwise answer 200 with the
homepage, so it is redirected to `/` — temporarily (307) in
[`vercel.json`](../vercel.json) and `DISCONNECTED_ROUTES` in
[`worker/index.js`](../worker/index.js). The mapping below describes the page as it stood
when it was live.

[TechnologyPage](../src/components/pages/TechnologyPage.tsx) is one continuous
measurement chain with exactly three anchored sections. Page copy and interface labels
come from `site.technology`; the console and analytics graphics are rendered as native
HTML/CSS so they stay crisp and responsive.

| # | `id` | Layer | Band | Key asset / graphic |
| --- | --- | --- | --- | --- |
| 1 | `hardware` | Capture | Cloud | `illustrations/ADAM ass(1).JPG` engineering render |
| 2 | `software` | See | Aer Navy | Illustrative city console with simulated data |
| 3 | `analytics` | Understand | Eco Mist | Validation-to-evidence signal graphic |

The Hardware section keeps the EN 15267-4 wording explicitly at *targeting* and labels
the unit as in development. The Software interface is disclosed as illustrative and
simulated. Forecasting and street-level simulation remain development goals.

## /solutions

[SolutionsPage](../src/components/pages/SolutionsPage.tsx) renders the three market
sectors from the brief as colour bands, threaded by the vertical
[RouteSpine](../src/components/ui/RouteSpine.tsx). Page chrome (intro, labels, CTA)
comes from `site.solutions`; each band's full challenge/solution text comes from
`site.network.audiences` — the same objects that feed the homepage teaser cards, so
teasers and full text can never drift apart. Band anchors match the audience ids:

| `id` | Sector | Band | Cases |
| --- | --- | --- | --- |
| `cities` | B2G | mint | Municipalities & City Administrations |
| `industry` | B2B | mist | Industrial Enterprises & Logistics; Real Estate Developers |
| `citizens` | B2C | dark navy | Citizens |

Routing is a pathname check in [App.tsx](../src/App.tsx) — no router dependency. Both
Vercel (`vercel.json` rewrites) and the Sites worker fall back to `index.html`, so the
clean `/solutions` URL works everywhere.

## Navigation

Nav labels differ from section headings on purpose — they are shorter. Hrefs are
root-relative (`/#problem`) so they resolve from both pages:

| Nav label | Target |
| --- | --- |
| Problem | `/#problem` |
| Solution | `/technology` |
| Why ADAM | `/#why` |
| Applications | `/solutions` |
| In Action | `/#demo` |
| About | `/#company` |
| News | `/#news` |
| Start a conversation (CTA) | `mailto:contact@aervigil.com` |

The footer repeats the same seven labels plus the brochure, and a Connect group with
the contact email and LinkedIn. Labels renamed on team feedback, 2026-09-21.

## Claims that carry compliance weight

These are the statements a lawyer or grant officer will read first. They are quoted from
the client brief; do not soften, sharpen or round them without a decision on record.

- **330K+ premature deaths / 95% exposed / 50K CSRD reporters / Directive 2024 /
  5–10% coverage / €50,000–€150,000 per station** — the problem statistics, quoted
  verbatim from brief revision 1(4) in that order.
- **"Up to 96% accuracy on validated direct measurements"** and **"over 100,000
  measurements per vehicle per year"** — capability claims, stated as targets of a system
  in development.
- **"EN 15267-4 certification"** — the heading is the client's wording from brief revision
  1(4); the body must keep saying *targeting*, because nothing is certified yet. Never write
  that ADAM *is* certified. Flagged for the team: heading and body pull in opposite
  directions and a lawyer may want the heading softened back to "EN 15267-4 path".
- **"CSRD-ready reports … ESRS E1/E2 compliant"** — product intent for the reporting workflow.
- **Funding line** — "ADAM received Horizon Europe / European Innovation Council support
  through a program for Ukrainian technology SMEs and startups", with the footer noting the
  acknowledgement wording is pending final grant-agreement text.

## Development-stage framing

ADAM is pre-launch. The page says so in four places, and all four should survive edits:

1. Hero badge — "Grant-backed development program". (The "Team and pilot network now
   forming" half was cut on coordinator feedback, 2026-08-20 — it read as unserious to
   investors. The forming note survives in the company section.)
2. Hardware figure caption — "in development".
3. Demo disclaimer — "Illustrative demo with simulated data — not a live deployment or
   certified measurement result."
4. Footer legal line — "ADAM is a development program; demo content is illustrative."

## Placeholders to replace before launch

| Where | Current | Needs |
| --- | --- | --- |
| News | Two `[ upcoming: … ]` entries | Real posts, or hide the section |
| "All news →" | Links back to `#news` | Real news index once one exists |
| Demo CTA | `https://adam.aervigil.com` | Confirm the host is live before launch |
