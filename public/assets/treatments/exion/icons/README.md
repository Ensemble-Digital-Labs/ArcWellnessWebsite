# EXION line-art emblems

**Do not use / do not re-add:** `smile.svg` (simple smiley face). Prefer
`person-sparkle`, `lotus`, or `face-device` instead.

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

## Arc 360 pillars (`/treatments`)

| File | Slot |
| --- | --- |
| `book.svg` | Functional (look deeper / understand why) |
| `checklist.svg` | Traditional (proven clinical tools) |
| `clock.svg` | Longevity |
| `chat.svg` | Relationship |

`checklist.svg` promoted from `icon/` (square 1254 canvas). Prefer square
gold canvases here — landscape dumps (e.g. `shield-plus.svg` 1536×1024) look
undersized next to clock/chat under `object-contain`.

## Arc 360 “What are we protecting?”

| File | Slot |
| --- | --- |
| `bicep.svg` | Strength (muscle / mobility; squared from landscape staging) |
| `battery-energy.svg` | Metabolic Health |
| `cell.svg` | Heart Health (temporary until a heart emblem exists) |
| `brain.svg` | Brain Health |
| `person-sparkle.svg` | Independence (function / capability) |


## Notes

- These are **vector** SVGs, so they stay SVG (the WebP rule applies only to
  raster imagery).
- To re-add a solid background, wrap the artwork in a `<rect>` — the originals
  shipped with a `#F9F9F9`/`#000000` full-canvas background path that was removed.
