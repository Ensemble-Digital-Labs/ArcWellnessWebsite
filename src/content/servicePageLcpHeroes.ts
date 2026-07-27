/**
 * Service-page LCP heroes warmed during homepage idle (see `ArcSitePreloader`).
 *
 * Curated: **one** first-viewport plate per service — not every section plate.
 * Start with EXION + Infusion; append other services as their templates ship.
 *
 * Paths must match what `next/image` requests on the service page (`sizes="100vw"`),
 * so the warmer uses `/_next/image` variants — not a separate raw URL.
 */

import { emsculptNeoHero } from "@/content/pages/emsculpt-neo";
import { emsellaHero } from "@/content/pages/emsella";
import { exionHero } from "@/content/pages/exion";
import { exomindHero } from "@/content/pages/exomind";
import { infusionHero } from "@/content/pages/infusion";

/** Idle-warmed service LCP backgrounds (homepage → service navigation). */
export const SERVICE_PAGE_LCP_HERO_SRCS: readonly string[] = [
  exionHero.imageSrc,
  infusionHero.imageSrc,
  emsellaHero.imageSrc,
  emsculptNeoHero.imageSrc,
  exomindHero.imageSrc,
];
