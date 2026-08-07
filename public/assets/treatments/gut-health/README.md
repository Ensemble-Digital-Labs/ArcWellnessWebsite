# gut-health assets

| File | Used by |
|------|---------|
| `gut-health-hero.png` / `.webp` | hero |
| `gut-health-mechanism.png` / `.webp` | mechanism |
| `gut-health-card-more-than-digestion.png` / `.webp` | treatments card 1 |
| `gut-health-card-look-beneath.png` / `.webp` | treatments card 2 |
| `gut-health-card-start-from-within.png` / `.webp` | treatments card 3 |

Cream/dark plates still reuse shared EXION plates.

Bump `GUT_HEALTH_ASSETS_VERSION` in `src/content/pages/gut-health.ts` when
replacing a raster under the same filename, or caches will serve the old image.
