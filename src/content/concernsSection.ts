/**
 * Concerns pinned section, panel photography + section plate.
 * See `public/assets/sections/concerns/README.md`.
 */

/** Bump when panel art changes, busts browser + `next/image` optimizer cache. */
export const CONCERNS_ASSETS_VERSION = "20260713-webp";

function concernsAssetPath(path: string): string {
  return `${path}?v=${CONCERNS_ASSETS_VERSION}`;
}

export const CONCERNS_SECTION_BG = concernsAssetPath(
  "/assets/sections/concerns/concerns-section-background.webp",
);

export const CONCERNS_PANEL_IMAGES = {
  wakeRefreshed: concernsAssetPath(
    "/assets/sections/concerns/concern-wake-refreshed.webp",
  ),
  thinkClearly: concernsAssetPath(
    "/assets/sections/concerns/concern-think-clearly.webp",
  ),
  moveFreely: concernsAssetPath(
    "/assets/sections/concerns/concern-move-freely.webp",
  ),
  feelConfident: concernsAssetPath(
    "/assets/sections/concerns/concern-feel-confident.webp",
  ),
  liveFully: concernsAssetPath(
    "/assets/sections/concerns/concern-live-fully.webp",
  ),
  ageWithPurpose: concernsAssetPath(
    "/assets/sections/concerns/concern-age-with-purpose.webp",
  ),
} as const;

/** Six aspiration cards, client photography set (Jul 2026). */
export const CONCERN_PANELS = [
  {
    title: "Wake refreshed.",
    tagline: "Restorative sleep and calm mornings that carry through your day.",
    image: CONCERNS_PANEL_IMAGES.wakeRefreshed,
  },
  {
    title: "Think clearly.",
    tagline: "Sharper focus for the work, and life, that matters most.",
    image: CONCERNS_PANEL_IMAGES.thinkClearly,
  },
  {
    title: "Move freely.",
    tagline: "Strength, mobility, and energy for the adventures ahead.",
    image: CONCERNS_PANEL_IMAGES.moveFreely,
  },
  {
    title: "Feel confident.",
    tagline: "Natural refinement that lets your best self show.",
    image: CONCERNS_PANEL_IMAGES.feelConfident,
  },
  {
    title: "Live fully.",
    tagline: "Connection, joy, and presence in the moments that count.",
    image: CONCERNS_PANEL_IMAGES.liveFully,
  },
  {
    title: "Age with purpose.",
    tagline: "Vitality and intention through every chapter of life.",
    image: CONCERNS_PANEL_IMAGES.ageWithPurpose,
  },
] as const;
