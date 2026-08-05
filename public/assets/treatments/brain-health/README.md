# brain-health assets

| File | Used by |
|------|---------|
| `brain-health-hero.png` / `.webp` | hero |
| `brain-health-mechanism.png` / `.webp` | mechanism |
| `brain-health-card-connected-systems.png` / `.webp` | treatments card 1 |
| `brain-health-card-personalized-support.png` / `.webp` | treatments card 2 |

ExoMind card reuses `/assets/treatments/exomind/exomind-card-targeted-stimulation.webp`.
Cream/dark plates still reuse shared EXION plates.

Bump `BRAIN_HEALTH_ASSETS_VERSION` in `src/content/pages/brain-health.ts` when
replacing a raster under the same filename, or caches will serve the old image.
