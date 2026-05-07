/** Base path for this preview route — header nav and root-relative hash CTAs use it. */
export const LOGO_DEMO_V3_BASE = "/logodemov3" as const;

/**
 * Med spa / v4 transparent wordmark — compare with **`/logodemov1`** (v1), **`/logodemov2`** (v2), and main **`images.logo`**.
 */
export const logoDemoV3 = {
  basePath: LOGO_DEMO_V3_BASE,
  logoSrc: "/assets/branding/arc-wellness-logo-v4.png",
  logoAlt: "ARC Wellness",
} as const;

/** Map homepage-style `/#section` hrefs onto this route. */
export function logoDemoV3InternalHref(href: string): string {
  if (href.startsWith("/#")) {
    return `${LOGO_DEMO_V3_BASE}#${href.slice(2)}`;
  }
  return href;
}
