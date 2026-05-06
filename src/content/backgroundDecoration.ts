/**
 * Non–location-specific decorative art (textures, abstract, mood backgrounds).
 * See `public/assets/decoration/background/README.md`.
 */
export const BACKGROUND_DECORATION_IMAGES = [
  "/assets/decoration/background/ambient-01.png",
  "/assets/decoration/background/ambient-02.png",
  "/assets/decoration/background/ambient-03.png",
  "/assets/decoration/background/ambient-04.png",
  "/assets/decoration/background/ambient-05.png",
  "/assets/decoration/background/ambient-06.png",
  "/assets/decoration/background/ambient-07.png",
  "/assets/decoration/background/ambient-08.png",
] as const;

/** Full-bleed plate under `#founder` immersive stack (visible as editorial hero fades into detail copy). */
export const FOUNDER_SECTION_AMBIENT_SRC =
  "/assets/decoration/background/founder-section-ambient.png" as const;

/** Full-bleed art behind `#path` sticky intro only (per-step backgrounds can be wired separately later). */
export const PATH_SECTION_INTRO_BACKGROUND_SRC =
  "/assets/sections/your-path/path-intro-background.png" as const;

export type BackgroundDecorationSrc = (typeof BACKGROUND_DECORATION_IMAGES)[number];
