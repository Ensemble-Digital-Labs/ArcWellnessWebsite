# neuromodulators assets

| File | Used by |
|------|---------|
| `neuromodulators-hero.png` / `.webp` | hero |
| `neuromodulators-mechanism.png` / `.webp` | mechanism |
| `neuromodulators-card-keep-expression.png` / `.webp` | treatments card 1 |
| `neuromodulators-card-thoughtful-injectables.png` / `.webp` | treatments card 2 |
| `neuromodulators-card-why-daxxify.png` / `.webp` | treatments card 3 |

Cream/dark plates still reuse shared EXION plates.

Bump `NEUROMODULATORS_ASSETS_VERSION` in `src/content/pages/neuromodulators.ts` when
replacing a raster under the same filename, or caches will serve the old image.
