# Scroll chapters — design intent (recorded request)

**Recorded:** User confirmed this is the direction they want for the site.

## Goal

Treat the homepage as a sequence of **locked / pinned sections** so that **scroll progress** can drive motion in each chapter—similar to the **hero** experience:

- **Image movement** (e.g. panning, Ken Burns–style drift, reveals).
- **Typography motion** tied to scroll (drift, staggered opacity, separation of lines).
- **One viewport-height “beat” of scroll** per pinned block where animations read clearly before the next section.

This is **not** generic fade-in-once reveals only; the intent is **scrubbed, hero-grade choreography** section by section as you scroll.

## Implementation direction (project reality)

- **Scroll container:** `#main` (Locomotive / ensemble pattern).
- **Mechanism:** GSAP **ScrollTrigger** with **`scroller: #main`**, **`pin: true`**, **`scrub`** (smooth follow), **`onUpdate` → progress** — same family as **`ScrollExpandHero`** and **`ScrollChapterIntroSection`**.
- **Reduced motion:** Respect **`prefers-reduced-motion`** with static fallbacks (no scrub trap).

## Progress so far

- **Hero:** `ScrollExpandHero` — pin + scrub; media expansion + title motion.
- **First post-hero chapter:** `ScrollChapterIntroSection` — pin + scrub; side image pan + headline/body drift + accent rule (`id="chapters"` on home).

## Next steps (when designing further sections)

- Add **dedicated components** per major chapter (or shared hooks like a thin **`useArcPinnedScrub`** wrapper) so each section’s progress maps to its own layout (columns, masks, video, etc.).
- Keep **`site.ts`** (or section-specific content modules) as the place for **copy + asset paths**.
- Avoid stacking **`data-scroll-section`** GSAP reveals on the same elements that are already **scrub-animated** (two systems fighting).

This file is the **handoff anchor** when continuing section-by-section design.
