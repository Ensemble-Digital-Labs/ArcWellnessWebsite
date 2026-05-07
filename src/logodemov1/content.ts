/** Base path for this preview route — header nav and root-relative hash CTAs use it. */
export const LOGO_DEMO_V1_BASE = "/logodemov1" as const;

/**
 * Alternate wordmark for side-by-side comparison with the main homepage (`images.logo` → v3).
 * Swap the path when you add a dedicated demo asset under `public/assets/branding/`.
 */
export const logoDemoV1 = {
  basePath: LOGO_DEMO_V1_BASE,
  logoSrc: "/assets/branding/arc-wellness-logo-v1.png",
  logoAlt: "ARC Wellness",
} as const;

/** Map homepage-style `/#section` hrefs onto this route — same idea as `showcaseInternalHref`. */
export function logoDemoV1InternalHref(href: string): string {
  if (href.startsWith("/#")) {
    return `${LOGO_DEMO_V1_BASE}#${href.slice(2)}`;
  }
  return href;
}
