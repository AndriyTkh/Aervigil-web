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

## Deployment

- Hosted on Vercel project `aervigil-web` (scope `andriytkhs-projects`), git-connected to
  this repo. The production branch is the repo default, `redesign/claude-design-v2`, so a
  push to it deploys to production. `vercel.json` sets `outputDirectory` to `dist/client`
  to match the vite `outDir` — plain `dist` serves nothing.
- `adam.aervigil.com` belongs to a **separate** Vercel project, `adam-frontend`. Leave it
  alone.
- DNS for `aervigil.com` lives on Cloudflare and is managed by
  [`scripts/setup-domain.mjs`](scripts/setup-domain.mjs) (idempotent; plans by default,
  writes with `--apply`). It reads a Cloudflare API token from `CLOUDFLARE_API_TOKEN`,
  `--token-file <path>`, or `~/.claude/secrets/cloudflare.token` — the last is the
  persistent location, deliberately outside the repo and outside any session scratchpad.
  The token needs only `Zone:DNS:Edit` on `aervigil.com`.
- **Never** accept Vercel's suggestion to change the domain's nameservers to
  `ns1/ns2.vercel-dns.com`. The zone carries `MX -> smtp.google.com` (Google Workspace)
  and the `adam` records; delegating to Vercel drops both. Use the apex A record instead,
  and keep Vercel-facing records **grey-cloud / DNS-only** — Cloudflare's proxy in front
  of Vercel breaks cert issuance and loops redirects. `setup-domain.mjs` enforces
  `proxied: false` and asserts the MX set is unchanged after every run.

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

## Technology page decisions (page currently disconnected)

- `/technology` is not routed or styled in the build; the component, copy and CSS are kept
  for a future reconnect. The decisions below apply if it is brought back.
- `/technology` has exactly three anchored product sections: Hardware, Software and Data
  analytics. The page intro belongs to Hardware rather than adding a fourth section.
- `public/assets/illustrations/ADAM ass(1).JPG` is the primary Hardware visual and must
  remain described as an engineering render of hardware in development.
- The supplied three-column screenshot is a graphics reference only. The Technology page
  uses its own vertical measurement-chain layout, carrying the homepage cyan-to-green route
  from capture through software to analytics.
