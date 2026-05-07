/** Base path for this preview route — header nav and root-relative hash CTAs use it. */
export const LOGO_DEMO_V2_BASE = "/logodemov2" as const;

/**
 * Transparent v2 wordmark — compare with main site (`images.logo`, often v3/v4) and **`/logodemov1`** (v1).
 */
export const logoDemoV2 = {
  basePath: LOGO_DEMO_V2_BASE,
  logoSrc: "/assets/branding/arc-wellness-logo-v2.png",
  logoAlt: "ARC Wellness",
} as const;

/** Map homepage-style `/#section` hrefs onto this route — same idea as `logoDemoV1InternalHref`. */
export function logoDemoV2InternalHref(href: string): string {
  if (href.startsWith("/#")) {
    return `${LOGO_DEMO_V2_BASE}#${href.slice(2)}`;
  }
  return href;
}
