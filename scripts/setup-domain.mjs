#!/usr/bin/env node
// Idempotent Cloudflare DNS setup for the Vercel-hosted homepage.
//
// Token resolution order: CLOUDFLARE_API_TOKEN, then --token-file, then the
// default path below. The default lives under the user's home directory rather
// than in a session scratchpad, so it survives across sessions and machines
// reboots, and is outside every git repo. The token is never logged, and never
// passed as a CLI argument (process arguments are readable by other processes).
//
//   node scripts/setup-domain.mjs            # plan only, default token path
//   node scripts/setup-domain.mjs --apply    # write
//
// Records not declared in DESIRED are left completely alone — in particular the
// zone's `MX -> smtp.google.com` (Google Workspace). The script asserts the MX
// set is byte-identical before and after, and exits non-zero if it moved.

import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";

const API = "https://api.cloudflare.com/client/v4";
const ZONE = "aervigil.com";
const DEFAULT_TOKEN_PATH = path.join(homedir(), ".claude", "secrets", "cloudflare.token");

// Vercel's documented apex target, and the CNAME target for subdomains.
// `proxied: false` is mandatory: Cloudflare's proxy in front of Vercel breaks
// certificate issuance and produces redirect loops.
const DESIRED = [
  { type: "A", name: ZONE, content: "76.76.21.21", proxied: false, comment: "apex -> Vercel aervigil-web" },
  { type: "CNAME", name: `www.${ZONE}`, content: "cname.vercel-dns.com", proxied: false, comment: "www -> Vercel (redirects to apex)" },
];

const args = process.argv.slice(2);
const apply = args.includes("--apply");
const tokenFileIdx = args.indexOf("--token-file");

// Operator mistakes get a one-line message, not a stack trace.
function fail(message) {
  console.error(`error: ${message}`);
  process.exit(1);
}

function readTokenFile(file, { required }) {
  try {
    return readFileSync(file, "utf8").trim();
  } catch {
    if (required) fail(`cannot read token file: ${file}`);
    return null;
  }
}

function loadToken() {
  const fromEnv = process.env.CLOUDFLARE_API_TOKEN?.trim();
  if (fromEnv) return fromEnv;

  if (tokenFileIdx !== -1) {
    const explicit = args[tokenFileIdx + 1];
    if (!explicit) fail("--token-file needs a path");
    return readTokenFile(explicit, { required: true });
  }

  const fromDefault = readTokenFile(DEFAULT_TOKEN_PATH, { required: false });
  if (fromDefault) return fromDefault;

  fail(
    `no token found. Provide one of:\n` +
      `  - CLOUDFLARE_API_TOKEN in the environment\n` +
      `  - --token-file <path>\n` +
      `  - a token at the default path: ${DEFAULT_TOKEN_PATH}`,
  );
}

const token = loadToken();
if (!token) fail("token is empty.");

async function cf(path, init = {}) {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.success === false) {
    // Surface Cloudflare's own error text, which never contains the token.
    const errs = (body.errors ?? []).map((e) => `${e.code} ${e.message}`).join("; ");
    throw new Error(`${init.method ?? "GET"} ${path} -> HTTP ${res.status}${errs ? ` (${errs})` : ""}`);
  }
  return body.result;
}

const mxFingerprint = (records) =>
  records
    .filter((r) => r.type === "MX")
    .map((r) => `${r.name} ${r.priority} ${r.content}`)
    .sort()
    .join("\n");

// Resolving the zone by name needs `Zone:Read`, which a DNS-only token does not
// have. Prefer an explicitly supplied id so the token can stay scoped to just
// `Zone:DNS:Edit`. The zone id is not a secret — it is shown on the domain's
// Overview page in the dashboard.
async function resolveZoneId() {
  const zoneIdIdx = args.indexOf("--zone-id");
  const explicit = zoneIdIdx !== -1 ? args[zoneIdIdx + 1] : process.env.CLOUDFLARE_ZONE_ID;
  if (explicit) {
    if (!/^[0-9a-f]{32}$/.test(explicit)) fail(`--zone-id must be 32 hex characters, got ${explicit.length} chars`);
    return explicit;
  }
  const zones = await cf(`/zones?name=${encodeURIComponent(ZONE)}`);
  if (zones.length === 1) return zones[0].id;
  fail(
    `could not resolve the zone id for ${ZONE} (the token returned ${zones.length} zones).\n` +
      `  A token with only Zone:DNS:Edit cannot list zones, which is normal.\n` +
      `  Pass it explicitly: --zone-id <32 hex chars>, or set CLOUDFLARE_ZONE_ID.\n` +
      `  Find it on the domain's Overview page in the Cloudflare dashboard, under API.`,
  );
}

const zoneId = await resolveZoneId();
console.log(`zone ${ZONE} (${zoneId})`);

const existing = await cf(`/zones/${zoneId}/dns_records?per_page=500`);
const mxBefore = mxFingerprint(existing);
console.log(`${existing.length} existing records; MX entries preserved:\n${mxBefore || "  (none)"}\n`);

const plan = [];
for (const want of DESIRED) {
  const match = existing.find((r) => r.type === want.type && r.name === want.name);
  if (!match) {
    plan.push({ action: "create", want });
  } else if (match.content !== want.content || match.proxied !== want.proxied) {
    plan.push({ action: "update", want, id: match.id, from: `${match.content} proxied=${match.proxied}` });
  } else {
    plan.push({ action: "unchanged", want });
  }
}

for (const p of plan) {
  const target = `${p.want.type} ${p.want.name} -> ${p.want.content} proxied=${p.want.proxied}`;
  if (p.action === "unchanged") console.log(`  ok       ${target}`);
  else if (p.action === "create") console.log(`  CREATE   ${target}`);
  else console.log(`  UPDATE   ${target}  (was ${p.from})`);
}

const writes = plan.filter((p) => p.action !== "unchanged");
if (writes.length === 0) {
  console.log("\nNothing to do — DNS already matches.");
  process.exit(0);
}
if (!apply) {
  console.log(`\n${writes.length} change(s) planned. Re-run with --apply to write them.`);
  process.exit(0);
}

for (const p of writes) {
  const payload = { ...p.want, ttl: 1 }; // ttl 1 == "automatic"
  if (p.action === "create") {
    await cf(`/zones/${zoneId}/dns_records`, { method: "POST", body: JSON.stringify(payload) });
    console.log(`  created  ${p.want.type} ${p.want.name}`);
  } else {
    await cf(`/zones/${zoneId}/dns_records/${p.id}`, { method: "PUT", body: JSON.stringify(payload) });
    console.log(`  updated  ${p.want.type} ${p.want.name}`);
  }
}

const after = await cf(`/zones/${zoneId}/dns_records?per_page=500`);
const mxAfter = mxFingerprint(after);
if (mxAfter !== mxBefore) {
  console.error(`\nFAIL: MX records changed.\nbefore:\n${mxBefore}\nafter:\n${mxAfter}`);
  process.exit(1);
}
console.log("\nDone. MX records verified unchanged.");
