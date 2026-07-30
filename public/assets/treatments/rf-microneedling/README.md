# rf-microneedling assets

| File | Used by |
|------|---------|
| `rf-microneedling-hero.png` | 4K master (editing only) |
| `rf-microneedling-hero.webp` | hero background — `rfMicroneedlingContent.hero.imageSrc` |

Bump `RF_MICRONEEDLING_ASSETS_VERSION` in `src/content/pages/rf-microneedling.ts`
when replacing a raster under the same filename, or caches will serve the old image.

Card photography and cream/dark plates still reuse clinic interiors + EXION plates.

When more dedicated art is ready:
1. Place masters here
2. Run `npm run assets:webp`
3. Point `src/content/pages/rf-microneedling.ts` at the `.webp` paths
4. Bump the assets version query string
