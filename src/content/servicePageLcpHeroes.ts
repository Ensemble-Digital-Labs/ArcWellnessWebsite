/**
 * Service-page LCP heroes warmed during homepage idle (see `ArcSitePreloader`).
 *
 * Curated: **one** first-viewport plate per service — not every section plate.
 * Start with EXION; append other services as their templates ship.
 *
 * Paths must match what `next/image` requests on the service page (`sizes="100vw"`),
 * so the warmer uses `/_next/image` variants — not a separate raw URL.
 */

import { exionHero } from "@/content/pages/exion";

/** Idle-warmed service LCP backgrounds (homepage → service navigation). */
export const SERVICE_PAGE_LCP_HERO_SRCS: readonly string[] = [
  exionHero.imageSrc,
];
