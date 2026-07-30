# brain-health assets

| File | Used by |
|------|---------|
| `brain-health-hero.png` | 4K master (editing only) |
| `brain-health-hero.webp` | hero background — `brainHealthContent.hero.imageSrc` |

Card photography and cream/dark plates still reuse clinic interiors + EXION plates.

Bump `BRAIN_HEALTH_ASSETS_VERSION` in `src/content/pages/brain-health.ts` when
replacing a raster under the same filename, or caches will serve the old image.

When more dedicated art is ready:
1. Place masters here
2. Run `npm run assets:webp`
3. Point `src/content/pages/brain-health.ts` at the `.webp` paths
4. Bump the assets version query string
