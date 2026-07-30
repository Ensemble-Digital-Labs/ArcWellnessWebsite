# clear-rf assets

| File | Used by |
|------|---------|
| `clear-rf-hero.png` | 4K master (editing only) |
| `clear-rf-hero.webp` | hero background — `clearRfContent.hero.imageSrc` |

Bump `CLEAR_RF_ASSETS_VERSION` in `src/content/pages/clear-rf.ts` when replacing a
raster under the same filename, or caches will serve the old image.

Card photography and cream/dark plates still reuse clinic interiors + EXION plates.

When more dedicated art is ready:
1. Place masters here
2. Run `npm run assets:webp`
3. Point `src/content/pages/clear-rf.ts` at the `.webp` paths
4. Bump the assets version query string
