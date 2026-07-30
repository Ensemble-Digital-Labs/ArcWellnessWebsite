# longevity assets

| File | Used by |
|------|---------|
| `longevity-hero.png` | 4K master (editing only) |
| `longevity-hero.webp` | hero background — `longevityContent.hero.imageSrc` |

Card photography and cream/dark plates still reuse clinic interiors + EXION plates.

Bump `LONGEVITY_ASSETS_VERSION` in `src/content/pages/longevity.ts` when replacing a
raster under the same filename, or caches will serve the old image.

When more dedicated art is ready:
1. Place masters here
2. Run `npm run assets:webp`
3. Point `src/content/pages/longevity.ts` at the `.webp` paths
4. Bump the assets version query string
