# metabolic-health assets

| File | Used by |
|------|---------|
| `metabolic-health-hero.png` / `.webp` | hero — `hero.imageSrc` |
| `metabolic-health-mechanism.png` / `.webp` | mechanism — `mechanism.imageSrc` |
| `metabolic-health-card-look-deeper.png` / `.webp` | treatments card 1 |
| `metabolic-health-card-strength-matters.png` / `.webp` | treatments card 2 |
| `metabolic-health-card-change-trajectory.png` / `.webp` | treatments card 3 |

Cream/dark plates still reuse shared EXION plates.

Bump `METABOLIC_HEALTH_ASSETS_VERSION` in `src/content/pages/metabolic-health.ts` when
replacing a raster under the same filename, or caches will serve the old image.
