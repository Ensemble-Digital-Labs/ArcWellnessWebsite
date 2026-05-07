/** Palette for the client-showcase mock homepage (forest + sage + warm neutrals). */
export const showcaseDesign = {
  forest: "#1e3328",
  /** Pillar highlight card (whole-body row) — aligned to quiet-luxury mock */
  pillarForest: "#2d4739",
  /** “Most chosen” pill on featured pillar */
  pillarPeach: "#e6a88a",
  /** Slightly cooler cream than `beige` for dense card rows */
  pillarSurface: "#f7f5f0",
  sage: "#a8b89a",
  sageHover: "#96a68a",
  sageMuted: "#8a9b7e",
  sageOutline: "#6b7d62",
  utilityBar: "#ebeae8",
  beige: "#f2efe8",
  white: "#ffffff",
} as const;

/**
 * Rose-gold text emphasis aligned with main site (`--arc-rose-gold` / `--arc-rose-gold-ink`).
 * Use `ink` on cream/beige/white; `bright` on dark photography or forest panels.
 */
export const showcaseRoseClass = {
  ink: "text-arc-rose-gold-ink [text-shadow:0_1px_2px_rgba(255,255,255,0.45),0.015em_0_0_color-mix(in_srgb,currentColor_28%,transparent),-0.015em_0_0_color-mix(in_srgb,currentColor_28%,transparent)]",
  bright:
    "text-arc-rose-gold [text-shadow:0_2px_22px_rgba(0,0,0,0.55),0_0_44px_var(--arc-rose-gold-glow),0.02em_0_0_color-mix(in_srgb,currentColor_35%,transparent),-0.02em_0_0_color-mix(in_srgb,currentColor_35%,transparent)]",
  /** Ink tone on dark photography — deeper rose without champagne glow (vs `bright`). */
  deep:
    "text-arc-rose-gold-ink [text-shadow:0_2px_22px_rgba(0,0,0,0.58),0_0_32px_rgba(143,83,70,0.35),0.015em_0_0_color-mix(in_srgb,currentColor_30%,transparent),-0.015em_0_0_color-mix(in_srgb,currentColor_30%,transparent)]",
} as const;
