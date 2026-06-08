# Background decoration

General-purpose **non–St. Louis** art: abstract textures, ambient mood, or layers behind content—not city landmark photography.

| File | Notes |
|------|--------|
| `ambient-01-light.png` … `ambient-04-light.png` | **Default** light-tone plates for slots 01–04 (`BACKGROUND_DECORATION_IMAGES[0]`…`[3]`). |
| `ambient-01.png` … `ambient-04.png` | Original darker plates — rollback only (`BACKGROUND_DECORATION_DARK_IMAGES`). |
| `welcome-copy-stage-cream.png` | Welcome / about **copy-phase** full-bleed — cream / fabric / portrait mood (see `ArcWelcomeSplitSection.tsx` → `WELCOME_COPY_STAGE_BG`). |
| `about-copy-stage--previous.png` | Prior copy-stage art (kept for rollback). |
| `founder-section-ambient.png` | Founder immersive stack — full-bleed under editorial hero; visible in detail-copy phase (`FOUNDER_SECTION_AMBIENT_SRC`). |
| `ambient-05.png` … `ambient-08.png` | Additional mood / editorial ambient art (2026-05-04 import). |

**URL pattern:** `/assets/decoration/background/ambient-NN.png`

**Code:** `src/content/backgroundDecoration.ts` → `BACKGROUND_DECORATION_IMAGES` (import the array or index by position).
