/**
 * Shared assets for all condition landings.
 * Every condition hero uses the same plate until/unless the brand asks for per-condition art.
 */

/** Bump when replacing the shared conditions hero raster. */
export const CONDITIONS_ASSETS_VERSION = "20260730-shared-hero";

export const CONDITION_HERO_IMAGE_SRC =
  `/assets/conditions/conditions-hero.webp?v=${CONDITIONS_ASSETS_VERSION}` as const;

export const CONDITION_HERO_IMAGE_ALT =
  "Abstract glowing gold ribbons on a soft sage field" as const;

/** Calm abstract plate — center crop works for left-aligned hero copy. */
export const CONDITION_HERO_OBJECT_CLASS =
  "object-cover object-center" as const;
