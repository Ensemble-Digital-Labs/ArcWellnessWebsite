# supplements assets

| File | Used by |
|------|---------|
| `supplements-hero.png` / `.webp` | hero |
| `supplements-card-more-isnt-better.png` / `.webp` | treatments card 1 |
| `supplements-card-quality-matters.png` / `.webp` | treatments card 2 |
| `supplements-card-bigger-picture.png` / `.webp` | treatments card 3 |

Mechanism still temporarily reuses retail protocol display photography.
Cream/dark plates still reuse shared EXION plates.

Bump `SUPPLEMENTS_ASSETS_VERSION` in `src/content/pages/supplements.ts` when
replacing a raster under the same filename, or caches will serve the old image.
