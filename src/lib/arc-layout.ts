/**
 * Default reading / hero column width (~1440px). Use on **inner** wrappers only so imagery
 * can stay full-bleed; avoid a global site “pill” (empty gutters on ultra-wide look odd).
 */
export const ARC_SITE_MAX_WIDTH_PX = 1440;

/** Inner content rail (hero column, etc.) — does not constrain the whole viewport. */
export const ARC_PAGE_RAIL_MAX = `max-w-[min(100%,${ARC_SITE_MAX_WIDTH_PX}px)] w-full`;

/**
 * Padding-top so copy clears the fixed wordmark (`h-32` → `lg:h-48`) with a **short** air gap (~4px)
 * under the logo — content can sit close to the top without overlapping.
 */
export const ARC_PINNED_CLEAR_BELOW_LOGO =
  "pt-[max(8.25rem,env(safe-area-inset-top))] sm:pt-[max(10.25rem,env(safe-area-inset-top))] md:pt-[max(11.25rem,env(safe-area-inset-top))] lg:pt-[max(12.25rem,env(safe-area-inset-top))]";

/**
 * Slightly tighter than **`ARC_PINNED_CLEAR_BELOW_LOGO`** — for full-width image galleries where the
 * first row should sit higher under the fixed wordmark (still clears the header + safe area).
 */
export const ARC_GALLERY_CLEAR_BELOW_LOGO =
  "pt-[max(6.75rem,env(safe-area-inset-top))] sm:pt-[max(8.5rem,env(safe-area-inset-top))] md:pt-[max(9.25rem,env(safe-area-inset-top))] lg:pt-[max(10rem,env(safe-area-inset-top))]";

/**
 * Optional Tailwind fragment for where one section meets the next (no border hairline).
 * Footer and other bands can merge this into `className`; change to e.g. `pt-6` if you want extra air.
 */
export const ARC_SECTION_SEAM_TOP = "";

/**
 * Frosted cream strip at pinned section entry — soft handoff from light sections above
 * (e.g. Welcome “Made Personal” → Founder). Use with scroll-scrubbed opacity.
 */
export const ARC_LIGHT_SECTION_TOP_BLEND_CLASS =
  "pointer-events-none absolute inset-x-0 top-0 z-[12] h-[min(22vh,9rem)] bg-gradient-to-b from-arc-cream via-arc-cream/85 to-transparent [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_48%,transparent_100%)] mask-image-[linear-gradient(to_bottom,black_0%,black_48%,transparent_100%)]";

/** Bottom feather on light pinned sections — eases into the next band without a hard cut. */
export const ARC_LIGHT_SECTION_BOTTOM_BLEND_CLASS =
  "pointer-events-none absolute inset-x-0 bottom-0 z-[18] h-[min(32vh,14rem)] bg-gradient-to-t from-arc-cream via-arc-cream/78 to-transparent backdrop-blur-[2px] supports-[backdrop-filter]:backdrop-blur-sm [-webkit-mask-image:linear-gradient(to_top,black_0%,black_55%,transparent_100%)] mask-image-[linear-gradient(to_top,black_0%,black_55%,transparent_100%)]";

/** Cream exit without blur — gallery → mission (keeps marble readable above the fold). */
export const ARC_LIGHT_SECTION_BOTTOM_BLEND_SOFT_CLASS =
  "pointer-events-none absolute inset-x-0 bottom-0 h-[min(26vh,11rem)] bg-gradient-to-t from-arc-cream from-30% via-arc-cream/88 to-transparent [-webkit-mask-image:linear-gradient(to_top,black_0%,black_52%,transparent_100%)] mask-image-[linear-gradient(to_top,black_0%,black_52%,transparent_100%)]";

/** Cream entry for mission after gallery — slightly taller, no blur. */
export const ARC_LIGHT_SECTION_TOP_BLEND_SOFT_CLASS =
  "pointer-events-none absolute inset-x-0 top-0 h-[min(18vh,8rem)] bg-gradient-to-b from-arc-cream via-arc-cream/92 to-transparent [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_50%,transparent_100%)] mask-image-[linear-gradient(to_bottom,black_0%,black_50%,transparent_100%)]";

/** Cream → cream-deep entry (vision → values on About). */
export const ARC_CREAM_DEEP_SECTION_TOP_BLEND_SOFT_CLASS =
  "pointer-events-none absolute inset-x-0 top-0 h-[min(20vh,9rem)] bg-gradient-to-b from-arc-cream via-arc-cream-deep/32 to-transparent [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_52%,transparent_100%)] mask-image-[linear-gradient(to_bottom,black_0%,black_52%,transparent_100%)]";

/** Teal-muted band entry — clinic gallery, mission, vision rhythm on About. */
export const ARC_MUTED_SECTION_TOP_BLEND_CLASS =
  "pointer-events-none absolute inset-x-0 top-0 z-[12] h-[min(22vh,9rem)] bg-gradient-to-b from-arc-teal-muted/30 via-arc-teal-muted/16 to-transparent [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_48%,transparent_100%)] mask-image-[linear-gradient(to_bottom,black_0%,black_48%,transparent_100%)]";

/** Teal-muted band exit — feathers marble/ambient into the next muted block. */
export const ARC_MUTED_SECTION_BOTTOM_BLEND_CLASS =
  "pointer-events-none absolute inset-x-0 bottom-0 z-[18] h-[min(28vh,11rem)] bg-gradient-to-t from-arc-teal-muted/30 via-arc-teal-muted/10 via-[40%] to-transparent [-webkit-mask-image:linear-gradient(to_top,black_0%,black_58%,transparent_100%)] mask-image-[linear-gradient(to_top,black_0%,black_58%,transparent_100%)]";

/** Gentle overlap when the next section continues the same surface tone. */
export const ARC_SECTION_SEAM_OVERLAP_SM_CLASS =
  "-mt-[min(7vh,3.5rem)] pt-[min(7vh,3.5rem)]";

/** Overlap pull when the next section’s top seam sits under the previous band. */
export const ARC_SECTION_SEAM_OVERLAP_CLASS =
  "-mt-[min(10vh,5rem)] pt-[min(10vh,5rem)]";

/** Matched pair — Home founder ↕ whole-body handoff (tight, symmetric, no overlap). */
export const ARC_HOME_FOUNDER_BOTTOM_SEAM_SOFT_CLASS =
  "pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[min(6vh,2.75rem)] bg-gradient-to-t from-arc-cream from-38% via-arc-cream/72 via-80% to-transparent [-webkit-mask-image:linear-gradient(to_top,black_0%,black_22%,transparent_100%)] mask-image-[linear-gradient(to_top,black_0%,black_22%,transparent_100%)]";

export const ARC_HOME_WHOLE_BODY_TOP_SEAM_SOFT_CLASS =
  "pointer-events-none absolute inset-x-0 top-0 z-20 h-[min(6vh,2.75rem)] bg-gradient-to-b from-arc-cream from-38% via-arc-cream/72 via-80% to-transparent [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_22%,transparent_100%)] mask-image-[linear-gradient(to_bottom,black_0%,black_22%,transparent_100%)]";

/** Matched pair — Home whole-body ↕ path intro (cream exit, teal-muted entry). */
export const ARC_HOME_WHOLE_BODY_BOTTOM_SEAM_SOFT_CLASS = ARC_HOME_FOUNDER_BOTTOM_SEAM_SOFT_CLASS;

export const ARC_HOME_PATH_TOP_SEAM_SOFT_CLASS =
  "pointer-events-none absolute inset-x-0 top-0 z-20 h-[min(6vh,2.75rem)] bg-gradient-to-b from-arc-teal-muted from-38% via-arc-teal-muted/72 via-80% to-transparent [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_22%,transparent_100%)] mask-image-[linear-gradient(to_bottom,black_0%,black_22%,transparent_100%)]";

/** Matched pair — Home path intro ↕ path steps (muted exit, cream entry). */
export const ARC_HOME_PATH_BOTTOM_SEAM_SOFT_CLASS =
  "pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[min(6vh,2.75rem)] bg-gradient-to-t from-arc-teal-muted from-38% via-arc-teal-muted/72 via-80% to-transparent [-webkit-mask-image:linear-gradient(to_top,black_0%,black_22%,transparent_100%)] mask-image-[linear-gradient(to_top,black_0%,black_22%,transparent_100%)]";

export const ARC_HOME_PATH_STEPS_TOP_SEAM_SOFT_CLASS = ARC_HOME_WHOLE_BODY_TOP_SEAM_SOFT_CLASS;

/** Matched pair — Home path steps ↕ testimonials (cream on cream). */
export const ARC_HOME_PATH_STEPS_BOTTOM_SEAM_SOFT_CLASS = ARC_HOME_FOUNDER_BOTTOM_SEAM_SOFT_CLASS;

export const ARC_HOME_TESTIMONIALS_TOP_SEAM_SOFT_CLASS = ARC_HOME_WHOLE_BODY_TOP_SEAM_SOFT_CLASS;

/** Matched pair — Home testimonials ↕ invest CTA (cream into hero photo). */
export const ARC_HOME_TESTIMONIALS_BOTTOM_SEAM_SOFT_CLASS = ARC_HOME_FOUNDER_BOTTOM_SEAM_SOFT_CLASS;

export const ARC_HOME_INVEST_TOP_SEAM_SOFT_CLASS =
  "pointer-events-none absolute inset-x-0 top-0 z-20 h-[min(6vh,2.75rem)] bg-gradient-to-b from-arc-cream from-32% via-arc-cream/88 via-76% to-transparent [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_28%,transparent_100%)] mask-image-[linear-gradient(to_bottom,black_0%,black_28%,transparent_100%)]";

/** Matched pair — Home concerns ↕ wellness intro (cream ambient into lounge photo). */
export const ARC_HOME_CONCERNS_BOTTOM_SEAM_SOFT_CLASS = ARC_HOME_FOUNDER_BOTTOM_SEAM_SOFT_CLASS;

export const ARC_HOME_WELLNESS_TOP_SEAM_SOFT_CLASS = ARC_HOME_WHOLE_BODY_TOP_SEAM_SOFT_CLASS;
