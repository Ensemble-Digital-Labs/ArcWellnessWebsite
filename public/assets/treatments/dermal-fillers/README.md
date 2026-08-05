# dermal-fillers assets

| File | Used by |
|------|---------|
| `dermal-fillers-hero.png` / `.webp` | hero |
| `dermal-fillers-mechanism.png` / `.webp` | mechanism |
| `dermal-fillers-card-treatment-areas.png` / `.webp` | treatments card 1 |
| `dermal-fillers-card-why-patients-choose.png` / `.webp` | treatments card 2 |
| `dermal-fillers-card-not-every-face.png` / `.webp` | treatments card 3 |

Cream/dark plates still reuse shared EXION plates.

Bump `DERMAL_FILLERS_ASSETS_VERSION` in `src/content/pages/dermal-fillers.ts` when
replacing a raster under the same filename, or caches will serve the old image.
