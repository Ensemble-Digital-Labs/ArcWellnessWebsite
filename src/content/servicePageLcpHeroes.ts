/**
 * Service-page LCP heroes warmed during homepage idle (see `ArcSitePreloader`).
 *
 * Curated: **one** first-viewport plate per service — not every section plate.
 * Start with EXION + Infusion; append other services as their templates ship.
 *
 * Paths must match what `next/image` requests on the service page (`sizes="100vw"`),
 * so the warmer uses `/_next/image` variants — not a separate raw URL.
 */

import { arc360Hero } from "@/content/pages/arc-360";
import { brainHealthHero } from "@/content/pages/brain-health";
import { clearRfHero } from "@/content/pages/clear-rf";
import { emsculptNeoHero } from "@/content/pages/emsculpt-neo";
import { emsellaHero } from "@/content/pages/emsella";
import { exionHero } from "@/content/pages/exion";
import { exomindHero } from "@/content/pages/exomind";
import { gutHealthHero } from "@/content/pages/gut-health";
import { hormoneHealthHero } from "@/content/pages/hormone-health";
import { infusionHero } from "@/content/pages/infusion";
import { longevityHero } from "@/content/pages/longevity";
import { medicalWeightLossHero } from "@/content/pages/medical-weight-loss";
import { metabolicHealthHero } from "@/content/pages/metabolic-health";
import { neuromodulatorsHero } from "@/content/pages/neuromodulators";
import { rfMicroneedlingHero } from "@/content/pages/rf-microneedling";

/** Idle-warmed service LCP backgrounds (homepage → service navigation). */
export const SERVICE_PAGE_LCP_HERO_SRCS: readonly string[] = [
  arc360Hero.imageSrc,
  exionHero.imageSrc,
  infusionHero.imageSrc,
  emsellaHero.imageSrc,
  emsculptNeoHero.imageSrc,
  exomindHero.imageSrc,
  hormoneHealthHero.imageSrc,
  brainHealthHero.imageSrc,
  gutHealthHero.imageSrc,
  longevityHero.imageSrc,
  metabolicHealthHero.imageSrc,
  medicalWeightLossHero.imageSrc,
  neuromodulatorsHero.imageSrc,
  rfMicroneedlingHero.imageSrc,
  clearRfHero.imageSrc,
];
