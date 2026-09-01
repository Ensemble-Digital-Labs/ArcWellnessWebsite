#!/usr/bin/env node
/**
 * Build a static Apache-ready export for GoDaddy cPanel.
 *
 * Output:
 *   out/                                      — static site
 *   deploy/godaddy/arcwellness-net-cpanel.zip — extract into public_html/arcwellness.net
 *
 * Admin UI + API routes require a Node runtime (Netlify). They are temporarily
 * moved out of src/app during this build so `output: "export"` can succeed.
 *
 * GTM: Next.js cannot place the noscript iframe immediately after <body>
 * (Search Console requirement). We inject official snippets into every HTML
 * file after the Next export, matching the Netlify edge-function approach.
 */

import { spawnSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const excludeRoot = path.join(root, ".godaddy-exclude");
const moved = [];

const GTM_ID = (process.env.NEXT_PUBLIC_GTM_ID || "GTM-P5JNDDHR").trim();

function gtmHeadSnippet(gtmId) {
  return `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');</script>
<!-- End Google Tag Manager -->`;
}

function gtmBodyNoscriptSnippet(gtmId) {
  return `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`;
}

/** Strip any prior GTM so we can place a single official copy in the right spots. */
function stripExistingGtm(html) {
  return html
    .replace(/<!-- Google Tag Manager -->[\s\S]*?<!-- End Google Tag Manager -->/g, "")
    .replace(
      /<!-- Google Tag Manager \(noscript\) -->[\s\S]*?<!-- End Google Tag Manager \(noscript\) -->/g,
      "",
    )
    .replace(/<script[^>]*id=["']google-tag-manager["'][^>]*>[\s\S]*?<\/script>/gi, "")
    // React layout GTM (no HTML comments / no script id)
    .replace(
      /<script[^>]*>\s*\(function\(w,d,s,l,i\)\{w\[l\]=w\[l\]\|\|\[\];w\[l\]\.push\(\{'gtm\.start':[\s\S]*?googletagmanager\.com\/gtm\.js[\s\S]*?<\/script>/gi,
      "",
    )
    .replace(
      /<noscript>\s*<iframe[^>]*googletagmanager\.com\/ns\.html[^>]*>\s*<\/iframe>\s*<\/noscript>/gi,
      "",
    );
}

/**
 * Search Console GTM verification needs:
 * - head snippet as early as possible in <head>
 * - noscript immediately after <body> (nothing but HTML comments between)
 */
function injectOfficialGtm(html, gtmId) {
  if (!gtmId) return html;
  let next = stripExistingGtm(html);
  const { head, body } = {
    head: gtmHeadSnippet(gtmId),
    body: gtmBodyNoscriptSnippet(gtmId),
  };

  if (!next.includes("<!-- Google Tag Manager -->")) {
    const withHead = next.replace(/<head([^>]*)>/i, `<head$1>${head}`);
    if (withHead === next) {
      throw new Error("Could not find <head> to inject GTM");
    }
    next = withHead;
  }

  const withBody = next.replace(/<body([^>]*)>/i, `<body$1>${body}`);
  if (withBody === next) {
    throw new Error("Could not find <body> to inject GTM noscript");
  }
  return withBody;
}

function walkHtmlFiles(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walkHtmlFiles(full, out);
    else if (name.endsWith(".html")) out.push(full);
  }
  return out;
}

function injectGtmIntoOutDir(outDir, gtmId) {
  const files = walkHtmlFiles(outDir);
  let count = 0;
  for (const file of files) {
    const raw = readFileSync(file, "utf8");
    if (!raw.includes("<body")) continue;
    const updated = injectOfficialGtm(raw, gtmId);
    writeFileSync(file, updated);
    count += 1;
  }
  console.log(`Injected official GTM (${gtmId}) into ${count} HTML files`);

  const home = path.join(outDir, "index.html");
  if (existsSync(home)) {
    const html = readFileSync(home, "utf8");
    const okHead = /<head[^>]*>\s*<!-- Google Tag Manager -->/.test(html);
    const okBody =
      /<body[^>]*>\s*<!-- Google Tag Manager \(noscript\) -->[\s\S]{0,80}?googletagmanager\.com\/ns\.html\?id=GTM-/.test(
        html,
      );
    if (!okHead || !okBody) {
      throw new Error(
        `GTM Search Console placement check failed (head=${okHead}, body=${okBody})`,
      );
    }
    console.log("Verified homepage GTM placement for Search Console");
  }
}

function moveAside(relPath) {
  const from = path.join(root, relPath);
  if (!existsSync(from)) return;
  const to = path.join(excludeRoot, path.basename(relPath));
  mkdirSync(excludeRoot, { recursive: true });
  if (existsSync(to)) rmSync(to, { recursive: true, force: true });
  renameSync(from, to);
  moved.push({ from, to });
  console.log(`Moved aside for static export: ${relPath}`);
}

function restoreMoved() {
  for (const { from, to } of moved.reverse()) {
    if (!existsSync(to)) continue;
    if (existsSync(from)) rmSync(from, { recursive: true, force: true });
    mkdirSync(path.dirname(from), { recursive: true });
    renameSync(to, from);
    console.log(`Restored: ${path.relative(root, from)}`);
  }
  if (existsSync(excludeRoot)) {
    try {
      rmSync(excludeRoot, { recursive: true, force: true });
    } catch {
      /* ignore */
    }
  }
}

function run(cmd, args, env = {}) {
  const result = spawnSync(cmd, args, {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, ...env },
    shell: process.platform === "win32",
  });
  if (result.status !== 0) {
    throw new Error(`${cmd} ${args.join(" ")} failed with code ${result.status}`);
  }
}

try {
  console.log("=== GoDaddy static export ===");
  moveAside("src/app/admin");
  moveAside("src/app/api");

  const outDir = path.join(root, "out");
  if (existsSync(outDir)) rmSync(outDir, { recursive: true, force: true });

  run("npx", ["next", "build"], {
    GODADDY_STATIC: "1",
    NEXT_PUBLIC_STATIC_EXPORT: "1",
    NEXT_PUBLIC_SITE_URL: "https://arcwellness.net",
    NEXT_PUBLIC_GTM_ID: GTM_ID,
    NODE_ENV: "production",
  });

  injectGtmIntoOutDir(outDir, GTM_ID);

  const htaccessSrc = path.join(root, "deploy/godaddy/.htaccess");
  const htaccessDest = path.join(outDir, ".htaccess");
  if (!existsSync(htaccessSrc)) {
    throw new Error("Missing deploy/godaddy/.htaccess");
  }
  copyFileSync(htaccessSrc, htaccessDest);

  writeFileSync(
    path.join(outDir, "DEPLOY.txt"),
    [
      "Arc Wellness — GoDaddy cPanel deploy",
      "====================================",
      "",
      "1. In cPanel File Manager, open: public_html/arcwellness.net",
      "2. Upload this zip (or extract locally and upload all files).",
      "3. Extract so that index.html and .htaccess sit DIRECTLY in",
      "   public_html/arcwellness.net/  (not inside a nested out/ folder).",
      "4. Confirm DNS: arcwellness.net (and www) point at this hosting.",
      "5. In cPanel → Domains / Addon Domains, document root should be",
      "   public_html/arcwellness.net",
      "6. Enable SSL (AutoSSL / Let's Encrypt) for arcwellness.net + www.",
      "",
      "Canonical URL: https://arcwellness.net",
      "  (.htaccess redirects http + www → https://arcwellness.net)",
      "",
      `GTM: official snippets for ${GTM_ID} are injected first-in-<head>`,
      "  and immediately after <body> (Search Console verification).",
      "  Verifying account must have Publish/Admin on that GTM container.",
      "",
      "NOTE: /admin and /api/admin are NOT included. Those need Node",
      "hosting (e.g. the existing Netlify deploy). Blog content in this",
      "build is frozen from data/insights-entries.json at build time.",
      "",
    ].join("\n"),
  );

  // Free disk before zipping — `.next` is large and not needed in the artifact.
  const nextDir = path.join(root, ".next");
  if (existsSync(nextDir)) {
    console.log("Removing .next to free disk space before zip…");
    rmSync(nextDir, { recursive: true, force: true });
  }

  const zipPath = path.join(root, "deploy/godaddy/arcwellness-net-cpanel.zip");
  console.log("Creating zip…");
  rmSync(zipPath, { force: true });
  const zipCreate = spawnSync(
    "zip",
    ["-r", "-9", "-q", zipPath, ".", "-x", "*.DS_Store"],
    { cwd: outDir, stdio: "inherit" },
  );
  if (zipCreate.status !== 0) {
    throw new Error("zip failed — is the zip CLI installed?");
  }

  console.log("");
  console.log("Done.");
  console.log(`  Static files: ${outDir}`);
  console.log(`  Upload zip:   ${zipPath}`);
  console.log("  Extract into: public_html/arcwellness.net");
} catch (err) {
  console.error(err instanceof Error ? err.message : err);
  process.exitCode = 1;
} finally {
  restoreMoved();
}
