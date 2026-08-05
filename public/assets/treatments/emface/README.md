# emface assets

| File | Used by |
|------|---------|
| `emface-hero.png` / `.webp` | hero — `emfaceContent.hero.imageSrc` |
| `emface-card-facial-concerns.png` / `.webp` | treatments card 1 |
| `emface-card-why-patients-love.png` / `.webp` | treatments card 2 |
| `emface-card-why-arc-chooses.png` / `.webp` | treatments card 3 |

Mechanism uses Bunny Stream video.
Cream/dark plates still reuse shared EXION plates.

Bump `EMFACE_ASSETS_VERSION` in `src/content/pages/emface.ts` when
replacing a raster under the same filename, or caches will serve the old image.
