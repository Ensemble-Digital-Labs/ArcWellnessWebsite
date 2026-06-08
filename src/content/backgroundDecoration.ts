/**
 * Non–location-specific decorative art (textures, abstract, mood backgrounds).
 * See `public/assets/decoration/background/README.md`.
 */
export const BACKGROUND_DECORATION_IMAGES = [
  "/assets/decoration/background/ambient-01-light.png",
  "/assets/decoration/background/ambient-02-light.png",
  "/assets/decoration/background/ambient-03-light.png",
  "/assets/decoration/background/ambient-04-light.png",
  "/assets/decoration/background/ambient-05.png",
  "/assets/decoration/background/ambient-06.png",
  "/assets/decoration/background/ambient-07.png",
  "/assets/decoration/background/ambient-08.png",
] as const;

/** Original darker-tone plates for slots 01–04 (kept for rollback). */
export const BACKGROUND_DECORATION_DARK_IMAGES = [
  "/assets/decoration/background/ambient-01.png",
  "/assets/decoration/background/ambient-02.png",
  "/assets/decoration/background/ambient-03.png",
  "/assets/decoration/background/ambient-04.png",
] as const;

/** @deprecated Use `BACKGROUND_DECORATION_IMAGES[0]` … `[3]` — light plates are now default. */
export const BACKGROUND_DECORATION_LIGHT_IMAGES = [
  BACKGROUND_DECORATION_IMAGES[0],
  BACKGROUND_DECORATION_IMAGES[1],
  BACKGROUND_DECORATION_IMAGES[2],
  BACKGROUND_DECORATION_IMAGES[3],
] as const;

/** Hero underlay — persistent plate behind scroll-expand photography. */
export const HERO_AMBIENT_BG = BACKGROUND_DECORATION_IMAGES[2]!;

/** Footer + services band ambient plate. */
export const FOOTER_AMBIENT_BG = BACKGROUND_DECORATION_IMAGES[3]!;

/** Insights / case-studies hub masthead + feed plate (`ambient-02-light`). */
export const INSIGHTS_FEED_AMBIENT_SRC = BACKGROUND_DECORATION_IMAGES[1]!;

/** About hero — full-bleed marble plate (`ambient-01-light`). */
export const ABOUT_HERO_COPY_AMBIENT_IMAGES = [
  BACKGROUND_DECORATION_IMAGES[0],
] as const;

/** About clinic tour teaser — light mint/teal plate (`#about-clinic`). */
export const CLINIC_SPACE_TEASER_AMBIENT_SRC = BACKGROUND_DECORATION_IMAGES[2]!;

/** Full-bleed plate under `#founder` immersive stack (visible as editorial hero fades into detail copy). */
export const FOUNDER_SECTION_AMBIENT_SRC =
  "/assets/decoration/background/founder-section-ambient.png" as const;

/** Welcome “Wellness. Made Personal.” copy-phase plate — light cream / fabric / portrait. */
export const WELCOME_COPY_STAGE_BG =
  "/assets/decoration/background/welcome-copy-stage-cream.png" as const;

/** Prior dark copy-stage art — rollback only. */
export const WELCOME_COPY_STAGE_BG_DARK =
  "/assets/decoration/background/about-copy-stage--previous.png" as const;

/** Full-bleed plate behind `#testimonials` (sphere + carousel). See `public/assets/sections/testimonials/`. */
export const TESTIMONIALS_SECTION_BACKGROUND_SRC =
  "/assets/sections/testimonials/testimonials-background.png?v=20260607-light" as const;

/** Prior bronze abstract plate — rollback only. */
export const TESTIMONIALS_SECTION_BACKGROUND_PREVIOUS_SRC =
  "/assets/sections/testimonials/testimonials-background--previous.png" as const;

/** Full-bleed art behind `#path` sticky intro only (per-step backgrounds can be wired separately later). */
export const PATH_SECTION_INTRO_BACKGROUND_SRC =
  "/assets/sections/your-path/path-intro-background.png" as const;

/** Photography for each journey step panel in `#path` (after intro). See `public/assets/sections/your-path/steps/`. */
export const PATH_STEP_IMAGE_SRC = {
  listen: "/assets/sections/your-path/steps/listen.png",
  measure: "/assets/sections/your-path/steps/measure.png",
  author: "/assets/sections/your-path/steps/author.png",
  practice: "/assets/sections/your-path/steps/practice.png",
  revise: "/assets/sections/your-path/steps/revise.png",
} as const;

export type BackgroundDecorationSrc = (typeof BACKGROUND_DECORATION_IMAGES)[number];
