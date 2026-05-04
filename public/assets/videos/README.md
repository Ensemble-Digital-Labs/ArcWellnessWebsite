# Video clips

`.mov` files in **`hero/`**, **`environment/`**, **`treatments/`**, and **`lifestyle/`** are **not committed** to Git (GitHub’s per-file size limit). Paths are still defined in **`src/content/site.ts`** as `/assets/videos/...`.

**Local dev:** add the `.mov` files in the folders named in `site.ts` (or swap to hosted URLs / compressed MP4 in code later).

**Deploy:** upload assets with your host, use **Git LFS** for large binaries, or serve from a CDN.
