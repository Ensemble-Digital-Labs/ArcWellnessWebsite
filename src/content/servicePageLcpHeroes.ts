/**
 * Service + condition LCP heroes warmed during homepage idle (see `ArcSitePreloader`).
 *
 * Curated: **one** first-viewport plate per service — not every section plate.
 * Conditions share a single hero plate (`CONDITION_HERO_IMAGE_SRC`), so one entry
 * covers every `/conditions/[slug]` landing.
 *
 * Also warms the three site-wide section plates (silk / cream-gold / dark teal)
 * used across Contact, Financing, service cream+dark acts, and conditions.
 *
 * Paths must match what `next/image` requests on the destination page (`sizes="100vw"`),
 * so the warmer uses `/_next/image` variants — not a separate raw URL.
 */

import { arc360Content, arc360Hero } from "@/content/pages/arc-360";
import { brainHealthHero } from "@/content/pages/brain-health";
import { clearRfHero } from "@/content/pages/clear-rf";
import { CONDITION_HERO_IMAGE_SRC } from "@/content/pages/conditions/assets";
import { dermalFillersHero } from "@/content/pages/dermal-fillers";
import { emfaceHero } from "@/content/pages/emface";
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
import { peptideTherapyHero } from "@/content/pages/peptide-therapy";
import { rfMicroneedlingHero } from "@/content/pages/rf-microneedling";
import {
  serviceSharedCreamPlate,
  serviceSharedDarkPlate,
} from "@/content/pages/serviceTemplate";
import { supplementsHero } from "@/content/pages/supplements";
import { images } from "@/content/site";

/**
 * Site-wide plates reused on many routes (Contact silk hero, service cream/dark
 * acts, Financing). Warm once on homepage idle.
 *
 * - Silk blanket → Contact / Financing / About / path intro
 * - Cream-gold marble → service cream plates + Contact reach-out
 * - Dark teal + gold trails → service dark acts / “why different”
 * - Arc 360 connected plate → Treatments “Your health is connected”
 */
export const SHARED_SITE_BACKGROUND_SRCS: readonly string[] = [
  images.aboutHeroMedia,
  serviceSharedCreamPlate.src,
  serviceSharedDarkPlate.src,
  /** Arc 360 / Treatments — “Your health is connected” lifestyle plate. */
  arc360Content.connected.imageSrc,
];

/** Idle-warmed service + shared condition LCP backgrounds (homepage → inner nav). */
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
  emfaceHero.imageSrc,
  dermalFillersHero.imageSrc,
  supplementsHero.imageSrc,
  peptideTherapyHero.imageSrc,
  CONDITION_HERO_IMAGE_SRC,
];
