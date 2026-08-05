# medical-weight-loss assets

| File | Used by |
|------|---------|
| `medical-weight-loss-hero.png` / `.webp` | hero |
| `medical-weight-loss-mechanism.png` / `.webp` | mechanism |
| `medical-weight-loss-card-understand-why.png` / `.webp` | treatments card 1 |
| `medical-weight-loss-card-glp1-beyond.png` / `.webp` | treatments card 2 |
| `medical-weight-loss-card-protect-muscle.png` / `.webp` | treatments card 3 |

Cream/dark plates still reuse shared EXION plates.

Bump `MEDICAL_WEIGHT_LOSS_ASSETS_VERSION` in `src/content/pages/medical-weight-loss.ts` when
replacing a raster under the same filename, or caches will serve the old image.
