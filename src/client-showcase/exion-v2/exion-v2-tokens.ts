/**
 * EXION v2 mockup-only design tokens.
 * Do not import outside `src/client-showcase/exion-v2/` or `/client-showcase/exion-v2` route.
 */
export const EXION_V2_MOCK = {
  cream: "#F0E3D7",
  creamDeep: "#E4D5C8",
  dark: "#141414",
  charcoal: "#2C2C2C",
  champagne: "#C5A878",
  champagneDeep: "#B8956A",
  champagneGlow: "rgba(197, 168, 120, 0.45)",
  tealInk: "#458872",
  /** Hero clinical-luxury gradient (mock §1) */
  heroGradient:
    "linear-gradient(128deg, #F7EFE4 0%, #EDDCC8 38%, #E2CDB5 68%, #F0E3D7 100%)",
} as const;

/** Public URL root — mock assets only; never referenced from production pages. */
export const EXION_V2_ASSET_ROOT = "/assets/client-showcase/exion-v2";
