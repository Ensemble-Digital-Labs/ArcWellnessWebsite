# longevity assets

| File | Used by |
|------|---------|
| `longevity-hero.png` / `.webp` | hero |
| `longevity-mechanism.png` / `.webp` | mechanism |
| `longevity-card-built-today.png` / `.webp` | treatments card 1 |
| `longevity-card-beyond-disease.png` / `.webp` | treatments card 2 |
| `longevity-card-whole-person-care.png` / `.webp` | treatments card 3 |

Cream/dark plates still reuse shared EXION plates.

Bump `LONGEVITY_ASSETS_VERSION` in `src/content/pages/longevity.ts` when
replacing a raster under the same filename, or caches will serve the old image.
