# hormone-health assets

| File | Used by |
|------|---------|
| `hormone-health-hero.png` | 4K master (editing only) |
| `hormone-health-hero.webp` | hero background — `hormoneHealthContent.hero.imageSrc` |

Bump `HORMONE_HEALTH_ASSETS_VERSION` in `src/content/pages/hormone-health.ts` when
replacing a raster under the same filename, or caches will serve the old image.

Card photography and cream/dark plates still reuse clinic interiors + EXION plates.

When more dedicated art is ready:
1. Place masters here
2. Run `npm run assets:webp`
3. Point `src/content/pages/hormone-health.ts` at the `.webp` paths
4. Bump any assets version query string
