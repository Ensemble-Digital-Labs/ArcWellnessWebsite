# rf-microneedling assets

| File | Used by |
|------|---------|
| `rf-microneedling-hero.png` / `.webp` | hero |
| `rf-microneedling-mechanism.png` / `.webp` | mechanism |
| `rf-microneedling-card-custom-concerns.png` / `.webp` | treatments card 1 |
| `rf-microneedling-card-face-and-body.png` / `.webp` | treatments card 2 |
| `rf-microneedling-card-results-evolve.png` / `.webp` | treatments card 3 |

Cream/dark plates still reuse shared EXION plates.

Bump `RF_MICRONEEDLING_ASSETS_VERSION` in `src/content/pages/rf-microneedling.ts` when
replacing a raster under the same filename, or caches will serve the old image.
