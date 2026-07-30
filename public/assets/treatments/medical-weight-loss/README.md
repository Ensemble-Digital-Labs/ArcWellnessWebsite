# medical-weight-loss assets

| File | Used by |
|------|---------|
| `medical-weight-loss-hero.png` | 4K master (editing only) |
| `medical-weight-loss-hero.webp` | hero background — `medicalWeightLossContent.hero.imageSrc` |

Card photography and cream/dark plates still reuse clinic interiors + EXION plates.

Bump `MEDICAL_WEIGHT_LOSS_ASSETS_VERSION` in `src/content/pages/medical-weight-loss.ts`
when replacing a raster under the same filename, or caches will serve the old image.

When more dedicated art is ready:
1. Place masters here
2. Run `npm run assets:webp`
3. Point `src/content/pages/medical-weight-loss.ts` at the `.webp` paths
4. Bump the assets version query string
