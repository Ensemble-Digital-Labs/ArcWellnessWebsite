# Section imagery (`/assets/sections/…`)

Drop **production** photography and graphics here, then point `src/content/site.ts` (or section props) at the public URL, e.g. `/assets/sections/welcome/consultation-hero.jpg`.

| Folder | Homepage / component | Notes |
|--------|----------------------|--------|
| `micro-primary/` | First **micro USP** strip (post-hero, optional) | Usually type-only; use for texture, soft gradient still, or brand mark if you add a visual later. |
| `micro-secondary/` | Second **“Why ARC”** micro strip | Same as above—optional. |
| `welcome/` | **Welcome split** (`ArcWelcomeSplitSection`) | Main column/side image; can match `who-we-are` or a dedicated welcome shot. |
| `trust-strip/` | **Trust row** | Optional icons or partner marks—currently copy-only in UI. |
| `founder/` | **Dr. Danish Jabbar** — professional (`physician-professional-01`…`05`) + smiling (`physician-smiling-01`…`06`) | **`founderPortraits.ts`**; **`site.ts`** uses **professional-01** for `founderPortrait` by default. |
| `who-we-are/` | About / consultation imagery | Referenced as `images.whoWeAre`; may mirror Welcome until asset splits. |
| `whole-body/` | **Services / pillars** card art | `images.services[]` thumbnails (homepage pillars). |
| `medical-spa-services/` | **Service modality** photography (spa treatments, clinical scenes) | **`medicalSpaServiceImages.ts`** — extend service pages / grids beyond pillar art. |
| `patient-experience/` | **Model / lifestyle** — clients & activities in the med-spa | **`patientExperienceImages.ts`** (`patient-experience-01`…`16`); not the same as service shot list. |
| `editorial-spa/` | **Editorial / aesthetic** — mood imagery to highlight services | **`editorialSpaImages.ts`** (`editorial-spa-01`…`05`) |
| `your-path/` | **Patient journey** steps | Optional per-step art if you move beyond icons. |
| `invest-cta/` | **Invest** full-bleed band | Prefer a dedicated asset vs reusing hero lobby when ready. |

Files are served from the site root: **`/assets/sections/<folder>/<file>`**.
