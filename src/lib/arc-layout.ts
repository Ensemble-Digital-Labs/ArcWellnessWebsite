/**
 * Default reading / hero column width (~1440px). Use on **inner** wrappers only so imagery
 * can stay full-bleed; avoid a global site “pill” (empty gutters on ultra-wide look odd).
 */
export const ARC_SITE_MAX_WIDTH_PX = 1440;

/** Inner content rail (hero column, etc.) — does not constrain the whole viewport. */
export const ARC_PAGE_RAIL_MAX = `max-w-[min(100%,${ARC_SITE_MAX_WIDTH_PX}px)] w-full`;

/**
 * Full-screen modals (clinic gallery, etc.) — above site header chrome (`z-[11002]` when menu open).
 */
export const ARC_FULLSCREEN_MODAL_Z_CLASS = "z-[12000]";

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
 * Site cream for every blur / feather / seam overlay (`--arc-cream` / `#f0e3d7`).
 * Do not use white, teal-muted, or cream-deep in gradient stops — keeps image handoffs consistent.
 */
export const ARC_CREAM_BLUR_GRADIENT_TOP =
  "bg-gradient-to-b from-arc-cream from-8% via-arc-cream/94 via-45% via-arc-cream/58 via-72% to-transparent";

export const ARC_CREAM_BLUR_GRADIENT_TOP_COMPACT =
  "bg-gradient-to-b from-arc-cream from-16% via-arc-cream/90 via-52% via-arc-cream/62 via-78% to-transparent";

export const ARC_CREAM_BLUR_GRADIENT_BOTTOM =
  "bg-gradient-to-t from-arc-cream from-10% via-arc-cream/92 via-38% via-arc-cream/68 via-62% to-transparent";

export const ARC_CREAM_BLUR_GRADIENT_BOTTOM_TALL =
  "bg-gradient-to-t from-arc-cream from-10% via-arc-cream/88 via-32% via-arc-cream/55 via-62% to-transparent";

export const ARC_CREAM_BLUR_GRADIENT_LEFT =
  "bg-gradient-to-r from-arc-cream from-0% via-arc-cream/90 via-42% to-transparent";

export const ARC_CREAM_BLUR_GRADIENT_RIGHT =
  "bg-gradient-to-l from-arc-cream from-0% via-arc-cream/90 via-42% to-transparent";

export const ARC_CREAM_BLUR_MASK_TOP =
  "[-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_58%,transparent_100%)] mask-image-[linear-gradient(to_bottom,black_0%,black_58%,transparent_100%)]";

export const ARC_CREAM_BLUR_MASK_TOP_COMPACT =
  "[-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_48%,transparent_100%)] mask-image-[linear-gradient(to_bottom,black_0%,black_48%,transparent_100%)]";

export const ARC_CREAM_BLUR_MASK_BOTTOM =
  "[-webkit-mask-image:linear-gradient(to_top,black_0%,black_45%,transparent_100%)] mask-image-[linear-gradient(to_top,black_0%,black_45%,transparent_100%)]";

export const ARC_CREAM_BLUR_MASK_SEAM_TOP =
  "[-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_45%,transparent_100%)] mask-image-[linear-gradient(to_bottom,black_0%,black_45%,transparent_100%)]";

/** Narrow top lip — softens a hard photo edge without pushing content down. */
export const ARC_CREAM_BLUR_GRADIENT_TOP_LIP =
  "bg-gradient-to-b from-arc-cream from-0% via-arc-cream/88 via-42% via-arc-cream/40 via-68% to-transparent";

export const ARC_CREAM_BLUR_MASK_TOP_LIP =
  "[-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_34%,transparent_100%)] mask-image-[linear-gradient(to_bottom,black_0%,black_34%,transparent_100%)]";

export const ARC_CREAM_BLUR_MASK_LEFT =
  "[-webkit-mask-image:linear-gradient(to_right,black_0%,black_78%,transparent_100%)] mask-image-[linear-gradient(to_right,black_0%,black_78%,transparent_100%)]";

export const ARC_CREAM_BLUR_MASK_RIGHT =
  "[-webkit-mask-image:linear-gradient(to_left,black_0%,black_78%,transparent_100%)] mask-image-[linear-gradient(to_left,black_0%,black_78%,transparent_100%)]";

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

/** Cream → cream-deep entry (vision → values on About) — blur tint stays arc-cream. */
export const ARC_CREAM_DEEP_SECTION_TOP_BLEND_SOFT_CLASS =
  "pointer-events-none absolute inset-x-0 top-0 h-[min(20vh,9rem)] bg-gradient-to-b from-arc-cream via-arc-cream/88 to-transparent [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_52%,transparent_100%)] mask-image-[linear-gradient(to_bottom,black_0%,black_52%,transparent_100%)]";

/** Muted-band entry — same cream blur as light sections (section fill may still be teal-muted). */
export const ARC_MUTED_SECTION_TOP_BLEND_CLASS = ARC_LIGHT_SECTION_TOP_BLEND_CLASS;

/** Muted-band exit — same cream blur as light sections. */
export const ARC_MUTED_SECTION_BOTTOM_BLEND_CLASS = ARC_LIGHT_SECTION_BOTTOM_BLEND_CLASS;

/** Gentle overlap when the next section continues the same surface tone. */
export const ARC_SECTION_SEAM_OVERLAP_SM_CLASS =
  "-mt-[min(7vh,3.5rem)] pt-[min(7vh,3.5rem)]";

/** Same overlap on lg+ only — avoids covering mobile gallery thumbs / bottom UI. */
export const ARC_SECTION_SEAM_OVERLAP_SM_LG_CLASS =
  "max-lg:mt-0 max-lg:pt-0 lg:-mt-[min(7vh,3.5rem)] lg:pt-[min(7vh,3.5rem)]";

/** Overlap pull when the next section’s top seam sits under the previous band. */
export const ARC_SECTION_SEAM_OVERLAP_CLASS =
  "-mt-[min(10vh,5rem)] pt-[min(10vh,5rem)]";

/** Matched pair — Home founder ↕ whole-body handoff (tight, symmetric, no overlap). */
export const ARC_HOME_FOUNDER_BOTTOM_SEAM_SOFT_CLASS =
  "pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[min(10vh,4.5rem)] bg-gradient-to-t from-arc-cream from-40% via-arc-cream/75 via-70% to-transparent [-webkit-mask-image:linear-gradient(to_top,black_0%,black_30%,transparent_100%)] mask-image-[linear-gradient(to_top,black_0%,black_30%,transparent_100%)]";

/**
 * Soft cream lip on the teal founder card edges (matches the section top-seam look).
 * Absolute children of the rounded card shell — sit under copy (`z-[5]` vs content `z-10`).
 */
export const ARC_HOME_FOUNDER_CARD_EDGE_LEFT_CLASS =
  "pointer-events-none absolute inset-y-0 left-0 z-[5] w-[min(3.25rem,9%)] bg-gradient-to-r from-arc-cream from-35% via-arc-cream/70 via-68% to-transparent [-webkit-mask-image:linear-gradient(to_right,black_0%,black_28%,transparent_100%)] mask-image-[linear-gradient(to_right,black_0%,black_28%,transparent_100%)]";

export const ARC_HOME_FOUNDER_CARD_EDGE_RIGHT_CLASS =
  "pointer-events-none absolute inset-y-0 right-0 z-[5] w-[min(3.25rem,9%)] bg-gradient-to-l from-arc-cream from-35% via-arc-cream/70 via-68% to-transparent [-webkit-mask-image:linear-gradient(to_left,black_0%,black_28%,transparent_100%)] mask-image-[linear-gradient(to_left,black_0%,black_28%,transparent_100%)]";

/** Bottom lip — same soft cream recipe as the section top seam (taller so it reads clearly). */
export const ARC_HOME_FOUNDER_CARD_EDGE_BOTTOM_CLASS =
  "pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[min(10vh,4.5rem)] bg-gradient-to-t from-arc-cream from-40% via-arc-cream/75 via-70% to-transparent [-webkit-mask-image:linear-gradient(to_top,black_0%,black_30%,transparent_100%)] mask-image-[linear-gradient(to_top,black_0%,black_30%,transparent_100%)]";

export const ARC_HOME_WHOLE_BODY_TOP_SEAM_SOFT_CLASS =
  "pointer-events-none absolute inset-x-0 top-0 z-20 h-[min(6vh,2.75rem)] bg-gradient-to-b from-arc-cream from-38% via-arc-cream/72 via-80% to-transparent [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_22%,transparent_100%)] mask-image-[linear-gradient(to_bottom,black_0%,black_22%,transparent_100%)]";

/** Matched pair — Home whole-body ↕ path intro (cream exit, cream entry over marble). */
export const ARC_HOME_WHOLE_BODY_BOTTOM_SEAM_SOFT_CLASS = ARC_HOME_FOUNDER_BOTTOM_SEAM_SOFT_CLASS;

export const ARC_HOME_PATH_TOP_SEAM_SOFT_CLASS =
  "pointer-events-none absolute inset-x-0 top-0 z-20 h-[min(6vh,2.75rem)] bg-gradient-to-b from-arc-cream from-38% via-arc-cream/72 via-80% to-transparent [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_22%,transparent_100%)] mask-image-[linear-gradient(to_bottom,black_0%,black_22%,transparent_100%)]";

/** Matched pair — Home path intro ↕ path steps (marble → cream). Taller than default seams. */
export const ARC_HOME_PATH_BOTTOM_SEAM_SOFT_CLASS =
  `pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[min(18vh,8.5rem)] ${ARC_CREAM_BLUR_GRADIENT_BOTTOM_TALL} ${ARC_CREAM_BLUR_MASK_BOTTOM}`;

export const ARC_HOME_PATH_STEPS_TOP_SEAM_SOFT_CLASS =
  `pointer-events-none absolute inset-x-0 top-0 z-20 h-[min(10vh,4.75rem)] ${ARC_CREAM_BLUR_GRADIENT_TOP} ${ARC_CREAM_BLUR_MASK_SEAM_TOP}`;

/** Desktop path steps — cream handoff on tab column only; photography stays full height. */
export const ARC_HOME_PATH_STEPS_TOP_SEAM_DESKTOP_LEFT_CLASS =
  `pointer-events-none absolute left-0 top-0 z-20 w-1/2 h-[min(10vh,4.75rem)] ${ARC_CREAM_BLUR_GRADIENT_TOP} ${ARC_CREAM_BLUR_MASK_SEAM_TOP}`;

/** Pull steps band up over path intro exit so the handoff has no visible hairline. */
export const ARC_HOME_PATH_STEPS_TOP_OVERLAP_CLASS =
  "-mt-[min(6vh,3rem)] pt-[min(6vh,3rem)] md:-mt-[min(8vh,3.75rem)] md:pt-[min(8vh,3.75rem)]";

/** Matched pair — Home path steps ↕ testimonials (cream on cream). */
export const ARC_HOME_PATH_STEPS_BOTTOM_SEAM_SOFT_CLASS =
  "pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[min(5vh,2.5rem)] bg-gradient-to-t from-arc-cream from-35% via-arc-cream/70 via-75% to-transparent [-webkit-mask-image:linear-gradient(to_top,black_0%,black_25%,transparent_100%)] mask-image-[linear-gradient(to_top,black_0%,black_25%,transparent_100%)]";

/**
 * Desktop path steps — bottom cream lip on the photography column only
 * (keeps step tab copy sharp; no wash over Revise / last-row text).
 */
export const ARC_HOME_PATH_STEPS_BOTTOM_SEAM_DESKTOP_RIGHT_CLASS =
  "pointer-events-none absolute bottom-0 right-0 z-20 w-1/2 h-[min(6vh,3rem)] bg-gradient-to-t from-arc-cream from-35% via-arc-cream/70 via-75% to-transparent [-webkit-mask-image:linear-gradient(to_top,black_0%,black_25%,transparent_100%)] mask-image-[linear-gradient(to_top,black_0%,black_25%,transparent_100%)]";


/**
 * Reusable top-edge feather for full-bleed photography — arc-cream blur at section handoffs.
 * Use on heroes, path step panels, and any image that must melt into the band above.
 */
export const ARC_IMAGE_TOP_BORDER_FEATHER_CLASS =
  `pointer-events-none absolute inset-x-0 top-0 z-[4] h-[min(18vh,8.5rem)] ${ARC_CREAM_BLUR_GRADIENT_TOP} backdrop-blur-[3px] supports-[backdrop-filter]:backdrop-blur-lg ${ARC_CREAM_BLUR_MASK_TOP}`;

/** Compact top feather — shorter image blocks (mobile cards, teasers). */
export const ARC_IMAGE_TOP_BORDER_FEATHER_COMPACT_CLASS =
  `pointer-events-none absolute inset-x-0 top-0 z-[4] h-[min(5.5rem,26%)] ${ARC_CREAM_BLUR_GRADIENT_TOP_COMPACT} backdrop-blur-[2px] supports-[backdrop-filter]:backdrop-blur-md ${ARC_CREAM_BLUR_MASK_TOP_COMPACT}`;

/** Narrow top lip — full-bleed panels; cream blur only at the edge (not a tall wash). */
export const ARC_IMAGE_TOP_BORDER_FEATHER_LIP_CLASS =
  `pointer-events-none absolute inset-x-0 top-0 z-[4] h-[min(6vh,3.25rem)] ${ARC_CREAM_BLUR_GRADIENT_TOP_LIP} backdrop-blur-[2px] supports-[backdrop-filter]:backdrop-blur-sm ${ARC_CREAM_BLUR_MASK_TOP_LIP}`;

/** Cream feather above services showcase nav — blends photo into the in-flow tab bar. */
export const ARC_SERVICES_SHOWCASE_NAV_TOP_FEATHER_CLASS =
  `pointer-events-none absolute inset-x-0 bottom-full z-[1] h-[min(7vh,3.75rem)] ${ARC_CREAM_BLUR_GRADIENT_BOTTOM} backdrop-blur-[2px] supports-[backdrop-filter]:backdrop-blur-sm ${ARC_CREAM_BLUR_MASK_BOTTOM}`;

/** Reusable left-edge feather for full-bleed photography — arc-cream vertical split. */
export const ARC_IMAGE_LEFT_BORDER_FEATHER_CLASS =
  `pointer-events-none absolute inset-y-0 -left-px z-[3] w-[min(7rem,18%)] ${ARC_CREAM_BLUR_GRADIENT_LEFT} ${ARC_CREAM_BLUR_MASK_LEFT}`;

/** Reusable right-edge feather — marble / copy column into photography. */
export const ARC_IMAGE_RIGHT_BORDER_FEATHER_CLASS =
  `pointer-events-none absolute inset-y-0 -right-px z-[3] w-[min(7rem,18%)] ${ARC_CREAM_BLUR_GRADIENT_RIGHT} ${ARC_CREAM_BLUR_MASK_RIGHT}`;

/** Wider paired feathers for founder-style marble ↔ portrait splits (both sides of seam). */
export const ARC_FOUNDER_SPLIT_PORTRAIT_FEATHER_CLASS =
  `pointer-events-none absolute inset-y-0 -left-px z-[4] w-[min(11rem,26%)] ${ARC_CREAM_BLUR_GRADIENT_LEFT} backdrop-blur-[2px] supports-[backdrop-filter]:backdrop-blur-sm ${ARC_CREAM_BLUR_MASK_LEFT}`;

export const ARC_FOUNDER_SPLIT_MARBLE_FEATHER_CLASS =
  `pointer-events-none absolute inset-y-0 -right-px z-[4] w-[min(11rem,26%)] ${ARC_CREAM_BLUR_GRADIENT_RIGHT} backdrop-blur-[2px] supports-[backdrop-filter]:backdrop-blur-sm ${ARC_CREAM_BLUR_MASK_RIGHT}`;

/** Path step image top — mobile stacked cards. */
export const ARC_HOME_PATH_STEP_IMAGE_TOP_FEATHER_CLASS =
  ARC_IMAGE_TOP_BORDER_FEATHER_COMPACT_CLASS;

/** Path step image top — desktop: narrow cream lip + blur (no tall wash). */
export const ARC_HOME_PATH_STEP_IMAGE_TOP_FEATHER_DESKTOP_CLASS =
  ARC_IMAGE_TOP_BORDER_FEATHER_LIP_CLASS;

/** Soft cream fade at the vertical split between step tabs and image (desktop). Wider band so
 *  the cream cards and the photo blend gradually (no backdrop-blur — blur at the grid seam
 *  caused a visible hairline; a broader cream gradient softens the two-color split instead). */
export const ARC_HOME_PATH_STEP_IMAGE_LEFT_FEATHER_CLASS =
  `pointer-events-none absolute inset-y-0 -left-px z-[3] w-[min(15rem,38%)] ${ARC_CREAM_BLUR_GRADIENT_LEFT} ${ARC_CREAM_BLUR_MASK_LEFT}`;

export const ARC_HOME_TESTIMONIALS_TOP_SEAM_SOFT_CLASS = ARC_HOME_WHOLE_BODY_TOP_SEAM_SOFT_CLASS;

/** Matched pair — Home testimonials ↕ invest CTA (cream into hero photo). */
export const ARC_HOME_TESTIMONIALS_BOTTOM_SEAM_SOFT_CLASS = ARC_HOME_FOUNDER_BOTTOM_SEAM_SOFT_CLASS;

export const ARC_HOME_INVEST_TOP_SEAM_SOFT_CLASS =
  "pointer-events-none absolute inset-x-0 top-0 z-20 h-[min(6vh,2.75rem)] bg-gradient-to-b from-arc-cream from-32% via-arc-cream/88 via-76% to-transparent [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_28%,transparent_100%)] mask-image-[linear-gradient(to_bottom,black_0%,black_28%,transparent_100%)]";

/** Matched pair — Home concerns ↕ wellness intro (cream ambient into lounge photo). */
export const ARC_HOME_CONCERNS_BOTTOM_SEAM_SOFT_CLASS = ARC_HOME_FOUNDER_BOTTOM_SEAM_SOFT_CLASS;

export const ARC_HOME_WELLNESS_TOP_SEAM_SOFT_CLASS = ARC_HOME_WHOLE_BODY_TOP_SEAM_SOFT_CLASS;

/**
 * CLINIC_SPACE marble plate — light center (marble reads clear), minimal edge tint only.
 * Pair with `ARC_MARBLE_AMBIENT_*_SEAM_CLASS` for stronger top/bottom section handoffs.
 */
export const ARC_MARBLE_AMBIENT_WASH_CLASS =
  "absolute inset-0 bg-gradient-to-b from-arc-cream/5 from-0% via-arc-cream/0 via-50% to-arc-cream/5 to-100%";

/** Top feather when a marble band meets the previous cream section. */
export const ARC_MARBLE_AMBIENT_TOP_SEAM_CLASS =
  "absolute inset-x-0 top-0 z-[2] h-[min(24vh,11rem)] bg-gradient-to-b from-arc-cream from-18% via-arc-cream/62 via-58% to-transparent";

/** Bottom feather when a marble band hands off to the next section. */
export const ARC_MARBLE_AMBIENT_BOTTOM_SEAM_CLASS =
  "absolute inset-x-0 bottom-0 z-[2] h-[min(26vh,12rem)] bg-gradient-to-t from-arc-cream from-18% via-arc-cream/62 via-58% to-transparent";

/** Shorter bottom feather for dense mobile layouts (clinic gallery teaser). */
export const ARC_MARBLE_AMBIENT_BOTTOM_SEAM_COMPACT_CLASS =
  "absolute inset-x-0 bottom-0 z-[2] h-24 bg-gradient-to-t from-arc-cream from-22% via-arc-cream/58 via-62% to-transparent max-lg:h-20 lg:h-[min(26vh,12rem)]";
