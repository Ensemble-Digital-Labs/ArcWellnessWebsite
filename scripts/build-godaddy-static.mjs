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
 */

import { spawnSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const excludeRoot = path.join(root, ".godaddy-exclude");
const moved = [];

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
    NODE_ENV: "production",
  });

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
