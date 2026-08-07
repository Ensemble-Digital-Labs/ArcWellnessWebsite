# arc-360 assets

Serves the Arc 360 concierge membership page at `/treatments`
(`src/components/arc/pages/Arc360PageContent.tsx`).

| File | Used by |
|------|---------|
| `arc-360-hero.png` | 4K master (editing only) |
| `arc-360-hero.webp` | hero background — `arc360Content.hero.imageSrc` |
| `arc-360-connected.png` | master for connected section photo |
| `arc-360-connected.webp` | “Your health is connected” — `arc360Content.connected.imageSrc` |

The hero art is an **abstract plate**, not a photo: cream/gold marbling with teal
veining and a deliberately open centre. The hero copy is centre-aligned over that
open area, so the desktop scrim is kept light (`from-arc-cream/25`) and the crop is
pinned to `object-center` via `hero.imageObjectClass`. If this is ever swapped for a
photograph with an off-centre subject, revisit both.

Bump `ARC_360_ASSETS_VERSION` in `src/content/pages/arc-360.ts` when replacing a
raster under the same filename, or caches will serve the old image.

Section plates still reuse the shared EXION cream/dark plates, and icons come from
`/assets/treatments/exion/icons`.

When more dedicated art is ready:
1. Place masters here
2. Run `npm run assets:webp`
3. Point `src/content/pages/arc-360.ts` at the `.webp` paths
4. Bump the assets version query string
