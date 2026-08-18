# Content map

Section-by-section mapping of the page. Copy lives in
[`src/content/site.ts`](../src/content/site.ts) and is taken verbatim from the approved
design, `aervigil-webpage-design/Aervigil Homepage.dc.html`, which in turn implements the
client copy brief in `_ref/Aervigil-website_TЗ.docx(1).md`.

To change wording, edit `site.ts`. Nothing else needs touching.

| # | `id` | Component | `site` key | Key assets |
| --- | --- | --- | --- | --- |
| 1 | `hero` | [HeroSection](../src/components/sections/HeroSection.tsx) | `site.hero` | `illustrations/hero-moving-lab.png` |
| 2 | `problem` | [ProblemSection](../src/components/sections/ProblemSection.tsx) | `site.problem` | `polluted-city.jpg` |
| 3 | `solution` | [SolutionSection](../src/components/sections/SolutionSection.tsx) | `site.solution` | `adam-hardware-closed.jpg` |
| 4 | `how` | [HowItWorksSection](../src/components/sections/HowItWorksSection.tsx) | `site.how` | `icons/process/01…05` |
| 5 | `why` | [WhyAdamSection](../src/components/sections/WhyAdamSection.tsx) | `site.why` | `icons/capabilities/*` |
| 6 | `demo` | [DemoSection](../src/components/sections/DemoSection.tsx) | `site.demo` | `adam-kyiv-illustrative-demo.png` |
| 7 | `network` | [NetworkSection](../src/components/sections/NetworkSection.tsx) | `site.network` | `icons/audiences/*-clean.png` |
| 8 | `company` | [CompanySection](../src/components/sections/CompanySection.tsx) | `site.company` | `eu-funded-light.png` |
| 9 | `news` | [NewsSection](../src/components/sections/NewsSection.tsx) | `site.news` | — |
| 10 | `contact` | [ContactSection](../src/components/sections/ContactSection.tsx) | `site.contact` | — |
| — | — | [SiteHeader](../src/components/layout/SiteHeader.tsx) | `site.nav`, `site.brand` | `adam-logo-color.svg` |
| — | — | [SiteFooter](../src/components/layout/SiteFooter.tsx) | `site.footer` | `adam-logo-white.svg`, `eu-funded-dark.png`, `illustrations/footer-skyline.png` |

`verify-page.mjs` asserts this order; changing it means updating `EXPECTED_SECTIONS` too.

## Navigation

Nav labels differ from section headings on purpose — they are shorter:

| Nav label | Target |
| --- | --- |
| Problem | `#problem` |
| Technology | `#solution` |
| Why ADAM | `#why` |
| Demo | `#demo` |
| Pilot | `#network` |
| Company | `#company` |
| News | `#news` |
| Start a conversation (CTA) | `#contact` |

The footer repeats a subset (Technology, Why ADAM, Demo, News) plus LinkedIn and Contact.

## Claims that carry compliance weight

These are the statements a lawyer or grant officer will read first. They are quoted from
the client brief; do not soften, sharpen or round them without a decision on record.

- **330K+ premature deaths / 95% exposed / 50K CSRD reporters / 5–10% coverage /
  €50,000–€150,000 per station / Directive 2024** — the problem statistics.
- **"Up to 96% accuracy on validated direct measurements"** and **"over 100,000
  measurements per vehicle per year"** — capability claims, stated as targets of a system
  in development.
- **"EN 15267-4 path"** — deliberately *targeting*, not certified. Never write "certified".
- **"CSRD-ready reports … ESRS E1/E2 compliant"** — product intent for the reporting workflow.
- **Funding line** — "ADAM received Horizon Europe / European Innovation Council support
  through a program for Ukrainian technology SMEs and startups", with the footer noting the
  acknowledgement wording is pending final grant-agreement text.

## Development-stage framing

ADAM is pre-launch. The page says so in four places, and all four should survive edits:

1. Hero badge — "Grant-backed development program · Team and pilot network now forming".
2. Hardware figure caption — "in development".
3. Demo disclaimer — "Illustrative demo with simulated data — not a live deployment or
   certified measurement result."
4. Footer legal line — "ADAM is a development program; demo content is illustrative."

## Placeholders to replace before launch

| Where | Current | Needs |
| --- | --- | --- |
| Contact CTA | `mailto:` with no recipient (as designed) | Real inbox address |
| Footer / nav LinkedIn | `https://www.linkedin.com/` | Real company profile |
| News | Two `[ upcoming: … ]` entries | Real posts, or hide the section |
| "All news →" | Links back to `#news` | Real news index once one exists |
| Demo CTA | `https://adam.aervigil.com` | Confirm the host is live before launch |
