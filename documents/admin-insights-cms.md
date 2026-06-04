# Admin CMS — Insights (blogs & case studies)

Password-protected admin for managing posts shown on `/case-studies`, `/blog/[slug]`, and `/case-studies/[slug]`.

## Setup

1. Create `.env.local` in the project root (not committed):

```env
ARC_ADMIN_USERNAME=admin
ARC_ADMIN_PASSWORD=your-password-here
ARC_ADMIN_SESSION_SECRET=use-a-long-random-string-at-least-32-characters
```

**Local dev default:** username `admin` / password `admin` (set in `.env.local` — change before production).

2. Restart the dev server after adding env vars.

3. Open **`/admin/login`** and sign in.

4. Manage posts at **`/admin/insights`**.

## Feature images

On the edit form, use **Upload image** under **Feature image** (JPG, PNG, WebP, GIF — max 5 MB). Files save to **`public/assets/insights/uploads/`** and the path is filled in automatically. You can still paste an existing `/assets/...` path if you prefer.

## Storage

- Content is saved to **`data/insights-entries.json`**
- Commit that file to git when you want changes deployed, or copy it to your server after editing locally.
- On Vercel/serverless, the filesystem is ephemeral unless you use a persistent volume or migrate to a database later.

## Routes

| Route | Purpose |
|-------|---------|
| `/admin/login` | Admin sign-in |
| `/admin/insights` | List, create, edit, delete posts |
| `/api/admin/login` | Session cookie (POST) |
| `/api/admin/logout` | Sign out (POST) |
| `/api/admin/insights` | List (GET), create (POST) |
| `/api/admin/insights/[id]` | Update (PUT), delete (DELETE) |
| `/api/admin/upload` | Feature image upload (POST, multipart) |

All admin API routes require a valid session cookie.

---

**Hosting / production CMS:** Explored Netlify Blobs + committed `local-envdev/` — **reverted**; see [`cms-hosting-deferred.md`](./cms-hosting-deferred.md).
