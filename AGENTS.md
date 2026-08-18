# Agent instructions

Marketing homepage for **ADAM by AerVigil**. Start with [README.md](README.md); the
deeper detail lives in [docs/](docs/).

## Working rules

- Run the dev server yourself and check the result in the browser. Do not hand the user
  server-start instructions for something you can run.
- Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`,
  `scripts/prepare-sites-build.mjs` and `tests/sites-worker.test.mjs` intact — the Sites
  handoff depends on all four. Before a handoff run `pnpm build` and `pnpm test:sites`;
  the build must leave `dist/client/index.html`, `dist/server/index.js` and
  `dist/.openai/hosting.json`.
- After any visual change, run `pnpm verify:page` with the dev server up and look at the
  screenshots it writes to `.playwright/shots/`.
- When the user gives durable prototype-specific design feedback, preferences or
  decisions, record them here.

## Where things go

- **Copy** → [`src/content/site.ts`](src/content/site.ts). Never inline strings in JSX.
- **Colour, type, spacing, elevation** → [`src/styles/tokens.css`](src/styles/tokens.css).
  Never hardcode a hex or a px size in a component stylesheet; add a token instead.
- **Section layout** → `src/styles/sections.css`, keyed to the section's own class block.
- **A new section** → a component in `src/components/sections/`, added to `App.tsx`, its
  `id` added to `EXPECTED_SECTIONS` in `scripts/verify-page.mjs`, and a row added to
  `docs/content-map.md`.

## Homepage decisions

- React, TypeScript and Vite. No CSS framework, no CSS-in-JS, no router.
- `aervigil-webpage-design/Aervigil Homepage.dc.html` is the visual source of truth for
  layout, density, spacing, colour, typography and hierarchy. `_ref/Aervigil-website_TЗ.docx(1).md`
  is the source for structure and text.
- AerVigil is the public masterbrand; ADAM is always "ADAM by AerVigil".
- Plus Jakarta Sans, Aer Navy `#093C5C`, Air Cyan `#28ABE3`, Vigil Green `#4ACB78`.
- Use the supplied real hardware and official funding assets. Concept and demo imagery
  must stay labelled as illustrative.
- The continuous blue-to-green route is the page's signature device — keep it. Cyan is
  always the city, green is always the fleet.
- ADAM is pre-launch. The four development-stage disclosures listed in
  [docs/content-map.md](docs/content-map.md) must survive copy edits, and EN 15267-4 is
  always a target, never a certification.
