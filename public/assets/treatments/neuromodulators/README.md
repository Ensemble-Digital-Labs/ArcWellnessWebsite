# neuromodulators assets

| File | Used by |
|------|---------|
| `neuromodulators-hero.png` | 4K master (editing only) |
| `neuromodulators-hero.webp` | hero background — `neuromodulatorsContent.hero.imageSrc` |

Bump `NEUROMODULATORS_ASSETS_VERSION` in `src/content/pages/neuromodulators.ts` when
replacing a raster under the same filename, or caches will serve the old image.

Card photography and cream/dark plates still reuse clinic interiors + EXION plates.

When more dedicated art is ready:
1. Place masters here
2. Run `npm run assets:webp`
3. Point `src/content/pages/neuromodulators.ts` at the `.webp` paths
4. Bump any assets version query string
