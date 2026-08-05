# clear-rf assets

| File | Used by |
|------|---------|
| `clear-rf-hero.png` / `.webp` | hero |
| `clear-rf-card-the-details.png` / `.webp` | treatments card 1 |
| `clear-rf-card-intentional-care.png` / `.webp` | treatments card 2 |
| `clear-rf-card-let-skin-show.png` / `.webp` | treatments card 3 |

Mechanism uses Bunny Stream video (not a local raster).
Cream/dark plates still reuse shared EXION plates.

Bump `CLEAR_RF_ASSETS_VERSION` in `src/content/pages/clear-rf.ts` when
replacing a raster under the same filename, or caches will serve the old image.
