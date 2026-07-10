/**
 * EXION v2 mockup curve geometry — 1440px design width, geometricPrecision rendering.
 * Used only by client-showcase wave separators (not production site).
 */

export const EXION_V2_CURVE_VIEWBOX = { width: 1440, height: 160 } as const;

/** Soft ripple between two cream sections (inner mock waves). */
export const EXION_V2_SOFT_CREAM_RIDGE =
  "M0,52 C240,28 480,68 720,44 C960,20 1200,58 1440,36 L1440,160 L0,160 Z";

/** Cream above / dark below — dramatic S-curve (treatments → why different). */
export const EXION_V2_CREAM_TO_DARK_DRAMATIC =
  "M0,0 L1440,0 L1440,32 C1280,118 1040,8 780,72 C520,128 280,18 0,96 Z";

/** Cream above / dark below — footer handoff (lighter curve). */
export const EXION_V2_CREAM_TO_DARK_SOFT =
  "M0,0 L1440,0 L1440,48 C1240,112 980,24 720,68 C460,112 220,32 0,88 Z";

/** Stroke path along the soft cream→dark lip. */
export const EXION_V2_CREAM_TO_DARK_SOFT_LIP =
  "M1440,48 C1240,112 980,24 720,68 C460,112 220,32 0,88";

/** Stroke path along the dramatic lip (for champagne glow). */
export const EXION_V2_CREAM_TO_DARK_DRAMATIC_LIP =
  "M1440,32 C1280,118 1040,8 780,72 C520,128 280,18 0,96";

export const EXION_V2_SOFT_CREAM_RIDGE_LIP =
  "M0,52 C240,28 480,68 720,44 C960,20 1200,58 1440,36";
