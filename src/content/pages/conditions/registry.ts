import { brainFogContent } from "@/content/pages/conditions/brain-fog";
import { CONDITION_CATALOG_AESTHETICS } from "@/content/pages/conditions/catalog-aesthetics";
import { CONDITION_CATALOG_BODY } from "@/content/pages/conditions/catalog-body";
import { CONDITION_CATALOG_MIND } from "@/content/pages/conditions/catalog-mind";
import { CONDITION_CATALOG_PELVIC } from "@/content/pages/conditions/catalog-pelvic";
import type { ConditionPageContent } from "@/content/pages/conditions/types";

const CONDITION_PAGES: readonly ConditionPageContent[] = [
  brainFogContent,
  ...CONDITION_CATALOG_MIND,
  ...CONDITION_CATALOG_BODY,
  ...CONDITION_CATALOG_PELVIC,
  ...CONDITION_CATALOG_AESTHETICS,
];

export function getAllConditionSlugs(): string[] {
  return CONDITION_PAGES.map((page) => page.slug);
}

export function getConditionBySlug(
  slug: string,
): ConditionPageContent | undefined {
  return CONDITION_PAGES.find((page) => page.slug === slug);
}
