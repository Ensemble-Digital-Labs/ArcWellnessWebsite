import { brainHealthContent, brainHealthHero } from "@/content/pages/brain-health";
import { gutHealthContent, gutHealthHero } from "@/content/pages/gut-health";
import {
  hormoneHealthContent,
  hormoneHealthHero,
} from "@/content/pages/hormone-health";
import { longevityContent, longevityHero } from "@/content/pages/longevity";
import {
  medicalWeightLossContent,
  medicalWeightLossHero,
} from "@/content/pages/medical-weight-loss";
import {
  metabolicHealthContent,
  metabolicHealthHero,
} from "@/content/pages/metabolic-health";
import type { ServiceHero, ServicePageContent } from "@/content/pages/serviceTemplate";

const SERVICE_TEMPLATE_BY_SLUG: Record<
  string,
  { content: ServicePageContent; hero: ServiceHero }
> = {
  "hormone-health": { content: hormoneHealthContent, hero: hormoneHealthHero },
  "metabolic-health": {
    content: metabolicHealthContent,
    hero: metabolicHealthHero,
  },
  "gut-health": { content: gutHealthContent, hero: gutHealthHero },
  "brain-health": { content: brainHealthContent, hero: brainHealthHero },
  longevity: { content: longevityContent, hero: longevityHero },
  "medical-weight-loss": {
    content: medicalWeightLossContent,
    hero: medicalWeightLossHero,
  },
};

export function getServiceTemplateBySlug(slug: string) {
  return SERVICE_TEMPLATE_BY_SLUG[slug];
}

export const SERVICE_TEMPLATE_SLUGS = Object.keys(SERVICE_TEMPLATE_BY_SLUG);
