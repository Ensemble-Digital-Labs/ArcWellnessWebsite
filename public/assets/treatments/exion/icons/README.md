# EXION line-art emblems

Hand-drawn **gold line-art SVG** emblems used on the bespoke EXION treatment
page (`/treatments/exion`). Each file had its baked-in full-canvas background
square stripped, so the gold artwork sits transparently on cream or the dark
"Why EXION is different" band.

Referenced from `src/content/pages/exion.ts` via `EXION_ICON` and rendered by
`EmblemIcon` in `src/components/arc/pages/ExionTreatmentContent.tsx`
(`next/image` with `unoptimized`, so the SVG is served as-is).

## Where each icon is used

| File                 | Section        | Slot                  |
| -------------------- | -------------- | --------------------- |
| `magnet.svg`         | Hero pillars   | Stimulate             |
| `cell.svg`           | Hero pillars   | Rebuild               |
| `lotus.svg`          | Hero pillars   | Renew                 |
| `sun.svg`            | Hero pillars   | Restore               |
| `atom.svg`           | Hero + why     | Powered-by badge + Targets Fibroblasts |
| `battery-energy.svg` | Why different  | Dual-Energy Technology |
| `face-device.svg`    | Why different  | Precise & Controlled  |
| `clock.svg`          | Why different  | Safe & Effective      |
| `chat.svg`           | The experience | Consultation          |
| `book.svg`           | The experience | Personalized Plan     |
| `meditation.svg`     | The experience | Comfortable Treatment |
| `mind.svg`           | The experience | Visible Results       |
| `calendar-check.svg` | The experience | Maintain & Enhance    |

## Available but currently unused

`brain.svg`, `brain-front.svg`, `consult-desk.svg` — kept here as spares for
future sections.

## Notes

- These are **vector** SVGs, so they stay SVG (the WebP rule applies only to
  raster imagery).
- To re-add a solid background, wrap the artwork in a `<rect>` — the originals
  shipped with a `#F9F9F9`/`#000000` full-canvas background path that was removed.
