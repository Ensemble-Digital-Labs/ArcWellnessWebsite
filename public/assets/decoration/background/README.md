# Background decoration

General-purpose **non–St. Louis** art: abstract textures, ambient mood, or layers behind content—not city landmark photography.

| File | Notes |
|------|--------|
| `ambient-03-light.webp` | Homepage / clinic marble plate. **2026-08-04:** runtime WebP resized to 1920×1080 (~99 KB). HD master kept as `ambient-03-light--hd-master.webp`. |
| `ambient-01.png` … `ambient-04.png` | Original darker plates — rollback only (`BACKGROUND_DECORATION_DARK_IMAGES`). |
| `welcome-copy-stage-cream.png` | Welcome / about **copy-phase** full-bleed — cream / fabric / portrait mood (see `ArcWelcomeSplitSection.tsx` → `WELCOME_COPY_STAGE_BG`). |
| `about-copy-stage--previous.png` | Prior copy-stage art (kept for rollback). |
| `founder-section-ambient.png` | Founder immersive stack — full-bleed under editorial hero; visible in detail-copy phase (`FOUNDER_SECTION_AMBIENT_SRC`). |
| `ambient-05.png` … `ambient-08.png` | Additional mood / editorial ambient art (2026-05-04 import). |
| `ambient-09.png` / `ambient-09.webp` | **2026-07-11** — cream silk / satin folds; sage botanical corner sprigs with gold outlines (portrait-friendly). Wired: **Your Path intro** (`PATH_SECTION_INTRO_BACKGROUND_SRC` → `#path`). |
| `ambient-10.png` / `ambient-10.webp` | **2026-07-11** — same botanical + cream palette as `ambient-09`, landscape / wide crop. *Asset-only — not wired in code yet.* |

**URL pattern:** `/assets/decoration/background/ambient-NN.webp` (runtime); PNG/JPEG masters kept on disk for editing.

**Code:** `src/content/backgroundDecoration.ts` → `BACKGROUND_DECORATION_IMAGES` (import the array or index by position). Slot **09** powers the homepage **Your Path** intro (`PATH_SECTION_INTRO_BACKGROUND_SRC`); slot **10** is asset-only.
