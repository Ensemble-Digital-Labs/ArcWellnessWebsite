# St. Louis decoration imagery

Two buckets so you can pick the right asset for the layout:

| Folder | Use when |
|--------|----------|
| **`labeled/`** | Image includes **visible labels / signage / text** in-frame (still fine for mood boards or context where text reads as part of the scene). |
| **`unlabeled/`** | **Clean plates** — no labels; best for **overlays**, crops, floating cards, or comps where you add your own type. |

## File naming

Each folder has **`decoration-01.png` … `decoration-06.png`** (six slots). Rename to landmark-specific names when you know each shot (e.g. `gateway-arch.png`) and update **`src/content/stlouisDecoration.ts`**.

## URLs

- `/assets/location/st-louis/labeled/decoration-NN.png`
- `/assets/location/st-louis/unlabeled/decoration-NN.png`

## Code

**`src/content/stlouisDecoration.ts`**

- **`STL_LOUIS_LABELED_DECORATION`** — 6 paths under `labeled/`
- **`STL_LOUIS_UNLABELED_DECORATION`** — 6 paths under `unlabeled/`
- **`STL_DECORATION_IMAGES`** — all 12 (labeled block, then unlabeled); stable order for legacy use

## Alt text

Write specific descriptions from what’s actually in frame once filenames are semantic.
