# Concerns section assets

Pinned “Because every story is different.” aspiration cards + full-bleed section plate.

| File | Card |
|------|------|
| `concerns-section-background.webp` | Full-bleed section plate |
| `concern-wake-refreshed.webp` | Wake refreshed. |
| `concern-think-clearly.webp` | Think clearly. |
| `concern-move-freely.webp` | Move freely. |
| `concern-feel-confident.webp` | Feel confident. |
| `concern-live-fully.webp` | Live fully. |
| `concern-age-with-purpose.webp` | Age with purpose. |

**Jul 2026 client lifestyle set:** PNG masters live here under the names above; each has a matching `.webp` for production. Drop new masters in this folder (not repo root), then run `npm run assets:webp`.

Legacy problem-state panels (`concern-low-energy-burnout.png`, etc.) and `concern-*--previous.*` are rollback only. **Site code uses `.webp`.**

**Code:** `src/content/concernsSection.ts` → `CONCERN_PANELS`, `CONCERNS_SECTION_BG`.

**URL pattern:** `/assets/sections/concerns/<filename>.webp`

After adding PNG masters, run `npm run assets:webp`.
