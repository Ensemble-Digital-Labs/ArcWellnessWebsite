# Background decoration

General-purpose **non–St. Louis** art: abstract textures, ambient mood, or layers behind content—not city landmark photography.

| File | Notes |
|------|--------|
| `ambient-01.png` | First slot (migrated from an earlier STL mis-file); use as subtle background / overlay. |
| `ambient-02.png` … `ambient-04.png` | Ambient / mood layers; **rename** (e.g. `marble-soft.png`) when you know each look. |
| `welcome-copy-stage-cream.png` | Welcome / about **copy-phase** full-bleed — cream / fabric / portrait mood (see `ArcWelcomeSplitSection.tsx` → `WELCOME_COPY_STAGE_BG`). |
| `about-copy-stage--previous.png` | Prior copy-stage art (kept for rollback). |
| `founder-section-ambient.png` | Founder immersive stack — full-bleed under editorial hero; visible in detail-copy phase (`FOUNDER_SECTION_AMBIENT_SRC`). |
| `ambient-05.png` … `ambient-08.png` | Additional mood / editorial ambient art (2026-05-04 import). |

**URL pattern:** `/assets/decoration/background/ambient-NN.png`

**Code:** `src/content/backgroundDecoration.ts` → `BACKGROUND_DECORATION_IMAGES` (import the array or index by position).
