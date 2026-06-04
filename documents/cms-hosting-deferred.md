# CMS / hosting work — deferred (not in repo)

**Status:** Reverted 2026-05-27. The live codebase uses the original **filesystem CMS** only (`data/insights-entries.json`, `public/assets/insights/uploads/`). See `documents/admin-insights-cms.md` for current setup.

This note records what was explored in chat and **not** kept, so it can be re-applied later if hosting is confirmed.

---

## 1. Committed local dev env (`local-envdev/`)

**Goal:** After `git clone`, `/admin/login` works without manually creating `.env.local`.

**Planned files:**
- `local-envdev/.env.local` — `ARC_ADMIN_USERNAME=admin`, `ARC_ADMIN_PASSWORD=admin`, `ARC_ADMIN_SESSION_SECRET=...`
- `local-envdev/README.md`
- `.gitignore` exception: `!local-envdev/.env.local`
- `next.config.ts` — `loadEnvConfig(path.join(cwd, "local-envdev"), true)` in development only

**Production:** Still requires host env vars; this folder was dev-only.

---

## 2. Netlify Blobs storage (production CMS)

**Problem:** On Netlify/serverless, filesystem writes are ephemeral — admin saves disappear after deploy.

**Planned approach:**
- `src/lib/insightsStorage/` — `filesystem` (local) vs `netlifyBlob` (when `NETLIFY=true` or `INSIGHTS_STORAGE=blob`)
- Dependency: `@netlify/blobs`
- Blob store `arc-insights`: key `entries` (JSON), `uploads/{filename}` (images)
- Public image route: `/api/insights-uploads/[filename]`
- Async `getInsightEntries()` / `saveInsightEntries()` across admin API and pages
- Seed blob from committed `data/insights-entries.json` on first read
- `netlify.toml` with `@netlify/plugin-nextjs`
- `revalidatePath` on save (unchanged)

**Netlify env vars required:**
| Variable | Purpose |
|----------|---------|
| `ARC_ADMIN_USERNAME` | Login |
| `ARC_ADMIN_PASSWORD` | Login |
| `ARC_ADMIN_SESSION_SECRET` | Session cookie signing |
| `INSIGHTS_STORAGE` | Optional `blob` (auto on Netlify) |

---

## 3. Hosting matrix (discussion)

| Host | CMS without extra work |
|------|-------------------------|
| **Local / VPS + Node** | Yes — filesystem mode |
| **Netlify** | Needs Blobs (or similar), not filesystem |
| **GoDaddy shared (cPanel)** | No — does not run Next.js API routes |
| **GoDaddy VPS + Node** | Yes — filesystem if disk persists |
| **Any host (future)** | Host-agnostic DB e.g. **Supabase** (Postgres + Storage) |

---

## 4. If re-implementing later

**Netlify-only:** Re-apply section 2 + Netlify env vars.

**Host-agnostic (Netlify, Vercel, VPS, etc.):** Prefer Supabase (or similar) instead of Netlify Blobs — one storage layer everywhere.

**Minimal dev UX:** Re-apply section 1 so clone → `pnpm dev` → `/admin/login` works with `admin` / `admin`.

---

## 5. Current behavior (after revert)

- Admin UI: `/admin/login`, `/admin/insights` (unchanged)
- Storage: `data/insights-entries.json` + local uploads folder
- Deploy: commit JSON/images to git, or use a server with persistent disk
- Env: create root `.env.local` manually (see `admin-insights-cms.md`)
