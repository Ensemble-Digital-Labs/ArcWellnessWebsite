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
