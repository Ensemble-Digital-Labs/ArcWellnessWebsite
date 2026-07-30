# metabolic-health assets

| File | Used by |
|------|---------|
| `metabolic-health-hero.png` | 4K master (editing only) |
| `metabolic-health-hero.webp` | hero background — `metabolicHealthContent.hero.imageSrc` |

Card photography and cream/dark plates still reuse clinic interiors + EXION plates.

Bump `METABOLIC_HEALTH_ASSETS_VERSION` in `src/content/pages/metabolic-health.ts` when
replacing a raster under the same filename, or caches will serve the old image.

When more dedicated art is ready:
1. Place masters here
2. Run `npm run assets:webp`
3. Point `src/content/pages/metabolic-health.ts` at the `.webp` paths
4. Bump the assets version query string
