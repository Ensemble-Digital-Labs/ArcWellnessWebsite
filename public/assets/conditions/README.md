# Shared conditions hero

All `/conditions/[slug]` pages use **one** full-bleed hero:

| File | Role |
|---|---|
| `conditions-hero.png` | Master / edit source |
| `conditions-hero.webp` | Runtime (referenced via `CONDITION_HERO_IMAGE_SRC`) |

Bump `CONDITIONS_ASSETS_VERSION` in `src/content/pages/conditions/assets.ts` after replacing the raster.
