/**
 * Non–location-specific decorative art (textures, abstract, mood backgrounds).
 * See `public/assets/decoration/background/README.md`.
 */
export const BACKGROUND_DECORATION_IMAGES = [
  "/assets/decoration/background/ambient-01.png",
  "/assets/decoration/background/ambient-02.png",
  "/assets/decoration/background/ambient-03.png",
  "/assets/decoration/background/ambient-04.png",
] as const;

export type BackgroundDecorationSrc = (typeof BACKGROUND_DECORATION_IMAGES)[number];
