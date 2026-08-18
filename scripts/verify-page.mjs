#!/usr/bin/env node
/**
 * Playwright smoke check for the homepage.
 *
 * Verifies the things a build cannot: no runtime errors, no broken images,
 * every in-page anchor resolves, the section order matches the design, and the
 * mobile drawer opens and closes. Writes reference screenshots to
 * `.playwright/shots/` (desktop + mobile, per section and full page).
 *
 *   pnpm dev            # in one terminal
 *   pnpm verify:page    # in another
 *
 * Override the target with BASE_URL=http://localhost:4173 (e.g. against a preview build).
 */
import { chromium } from "@playwright/test";
import { mkdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SHOTS = path.join(ROOT, ".playwright", "shots");
const BASE_URL = process.env.BASE_URL ?? "http://localhost:5173";

/** Section ids in the order the design specifies. */
const EXPECTED_SECTIONS = [
  "hero",
  "problem",
  "solution",
  "how",
  "why",
  "demo",
  "network",
  "company",
  "news",
  "contact",
];

const failures = [];
const fail = (message) => failures.push(message);

/**
 * Scrolls to the bottom in viewport steps so `loading="lazy"` images start
 * fetching, waits for every one of them to settle, then returns to the top.
 */
async function scrollThrough(target) {
  await target.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 120));
    }
  });
  await target
    .waitForFunction(() => Array.from(document.images).every((img) => img.complete), null, {
      timeout: 20000,
    })
    .catch(() => fail("images were still loading after 20s"));
  await target.evaluate(() => window.scrollTo(0, 0));
  await target.waitForLoadState("networkidle");
}

rmSync(SHOTS, { recursive: true, force: true });
mkdirSync(SHOTS, { recursive: true });

const browser = await chromium.launch();

// ---------------------------------------------------------------- desktop --
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const consoleErrors = [];
page.on("console", (msg) => msg.type() === "error" && consoleErrors.push(msg.text()));
page.on("pageerror", (error) => consoleErrors.push(String(error)));
page.on("requestfailed", (request) =>
  consoleErrors.push(`request failed: ${request.url()} (${request.failure()?.errorText})`),
);

await page.goto(BASE_URL, { waitUntil: "networkidle" });
// Reveal animations are scroll-driven; force them so screenshots are stable.
await page.evaluate(() =>
  document.querySelectorAll(".reveal").forEach((node) => node.classList.add("is-visible")),
);
// Walk the page so `loading="lazy"` images actually fetch before we check them.
await scrollThrough(page);
await page.waitForTimeout(300);

// 1. Section presence and order.
const sectionIds = await page.$$eval("[id]", (nodes) =>
  nodes.filter((n) => ["HEADER", "SECTION"].includes(n.tagName)).map((n) => n.id),
);
for (const id of EXPECTED_SECTIONS) {
  if (!sectionIds.includes(id)) fail(`missing section #${id}`);
}
const ordered = sectionIds.filter((id) => EXPECTED_SECTIONS.includes(id));
if (ordered.join(",") !== EXPECTED_SECTIONS.join(",")) {
  fail(`section order is ${ordered.join(" → ")}, expected ${EXPECTED_SECTIONS.join(" → ")}`);
}

// 2. Broken images.
const brokenImages = await page.$$eval("img", (imgs) =>
  imgs.filter((img) => !img.complete || img.naturalWidth === 0).map((img) => img.getAttribute("src")),
);
brokenImages.forEach((src) => fail(`image failed to load: ${src}`));

// 3. Images must carry an alt attribute (empty alt is fine for decorative art).
const missingAlt = await page.$$eval("img", (imgs) =>
  imgs.filter((img) => !img.hasAttribute("alt")).map((img) => img.getAttribute("src")),
);
missingAlt.forEach((src) => fail(`image missing alt attribute: ${src}`));

// 4. Every in-page anchor resolves to an element.
const danglingAnchors = await page.$$eval("a[href^='#']", (links) =>
  links
    .map((link) => link.getAttribute("href"))
    .filter((href) => href && href.length > 1 && !document.querySelector(href)),
);
[...new Set(danglingAnchors)].forEach((href) => fail(`anchor points at missing target: ${href}`));

// 5. Landmarks and a single h1.
const h1Count = await page.locator("h1").count();
if (h1Count !== 1) fail(`expected exactly one <h1>, found ${h1Count}`);
for (const [label, selector] of [
  ["banner", "header.site-header"],
  ["main", "main"],
  ["contentinfo", "footer.site-footer"],
]) {
  if ((await page.locator(selector).count()) !== 1) fail(`missing ${label} landmark (${selector})`);
}

// 6. No horizontal overflow.
const overflow = await page.evaluate(
  () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
);
if (overflow > 1) fail(`page scrolls horizontally by ${overflow}px at 1440w`);

// 7. Screenshots, per section and full page.
await page.screenshot({ path: path.join(SHOTS, "desktop-full.png"), fullPage: true });
for (const id of EXPECTED_SECTIONS) {
  await page
    .locator(`#${id}`)
    .screenshot({ path: path.join(SHOTS, `desktop-${id}.png`) })
    .catch(() => fail(`could not screenshot #${id}`));
}
await page
  .locator("footer.site-footer")
  .screenshot({ path: path.join(SHOTS, "desktop-footer.png") })
  .catch(() => {});

// ----------------------------------------------------------------- tablet --
// 900w sits inside the 48–75rem band, where "How it works" is a centred 3-up
// flex row and the pilot junction has already collapsed to a rule.
const tablet = await browser.newPage({ viewport: { width: 900, height: 1200 } });
tablet.on("pageerror", (error) => consoleErrors.push(`tablet: ${error}`));
await tablet.goto(BASE_URL, { waitUntil: "networkidle" });
await tablet.evaluate(() =>
  document.querySelectorAll(".reveal").forEach((node) => node.classList.add("is-visible")),
);
await scrollThrough(tablet);
await tablet.waitForTimeout(300);

const tabletOverflow = await tablet.evaluate(
  () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
);
if (tabletOverflow > 1) fail(`page scrolls horizontally by ${tabletOverflow}px at 900w`);

// The orphan row must be centred, not flush left: compare the row's own
// bounding box against the track it sits in.
const orphanOffset = await tablet.evaluate(() => {
  const steps = Array.from(document.querySelectorAll(".how__steps .step"));
  if (steps.length === 0) return null;
  const track = document.querySelector(".how__steps").getBoundingClientRect();
  const boxes = steps.map((step) => step.getBoundingClientRect());
  const lastTop = Math.max(...boxes.map((box) => Math.round(box.top)));
  const lastRow = boxes.filter((box) => Math.round(box.top) === lastTop);
  if (lastRow.length === boxes.length) return 0; // single row, nothing to centre
  const left = Math.min(...lastRow.map((box) => box.left)) - track.left;
  const right = track.right - Math.max(...lastRow.map((box) => box.right));
  return Math.round(Math.abs(left - right));
});
if (orphanOffset === null) fail("no steps found at 900w");
else if (orphanOffset > 4) fail(`last step row is off-centre by ${orphanOffset}px at 900w`);

await tablet.screenshot({ path: path.join(SHOTS, "tablet-full.png"), fullPage: true });
for (const id of ["problem", "how", "network"]) {
  await tablet
    .locator(`#${id}`)
    .screenshot({ path: path.join(SHOTS, `tablet-${id}.png`) })
    .catch(() => fail(`could not screenshot #${id} at 900w`));
}

// ----------------------------------------------------------------- mobile --
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
mobile.on("pageerror", (error) => consoleErrors.push(`mobile: ${error}`));
await mobile.goto(BASE_URL, { waitUntil: "networkidle" });
await mobile.evaluate(() =>
  document.querySelectorAll(".reveal").forEach((node) => node.classList.add("is-visible")),
);
await scrollThrough(mobile);
await mobile.waitForTimeout(300);

const mobileOverflow = await mobile.evaluate(
  () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
);
if (mobileOverflow > 1) fail(`page scrolls horizontally by ${mobileOverflow}px at 390w`);

// Mobile drawer: opens, exposes the nav, closes again.
const toggle = mobile.locator(".menu-toggle");
if ((await toggle.count()) !== 1) {
  fail("menu toggle is not rendered at 390w");
} else {
  await toggle.click();
  await mobile.waitForTimeout(250);
  if ((await mobile.locator(".site-nav.is-open").count()) !== 1) fail("menu did not open");
  if ((await toggle.getAttribute("aria-expanded")) !== "true") {
    fail("menu toggle did not set aria-expanded=true");
  }
  await mobile.screenshot({ path: path.join(SHOTS, "mobile-menu.png") });

  await mobile.keyboard.press("Escape");
  await mobile.waitForTimeout(250);
  if ((await mobile.locator(".site-nav.is-open").count()) !== 0) fail("Escape did not close menu");
  if ((await mobile.evaluate(() => document.body.style.overflow)) === "hidden") {
    fail("body scroll stayed locked after the menu closed");
  }
}

await mobile.screenshot({ path: path.join(SHOTS, "mobile-full.png"), fullPage: true });
for (const id of EXPECTED_SECTIONS) {
  await mobile
    .locator(`#${id}`)
    .screenshot({ path: path.join(SHOTS, `mobile-${id}.png`) })
    .catch(() => {});
}

consoleErrors.forEach((error) => fail(`console: ${error}`));

await browser.close();

if (failures.length > 0) {
  console.error(`\n✗ ${failures.length} problem(s) found:`);
  failures.forEach((message) => console.error(`  - ${message}`));
  process.exit(1);
}

console.log(`✓ homepage verified at ${BASE_URL}; screenshots in .playwright/shots/`);
