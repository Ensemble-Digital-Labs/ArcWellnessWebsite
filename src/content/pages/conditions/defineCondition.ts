import {
  CONDITION_HERO_IMAGE_ALT,
  CONDITION_HERO_IMAGE_SRC,
  CONDITION_HERO_OBJECT_CLASS,
} from "@/content/pages/conditions/assets";
import type { ConditionPageContent } from "@/content/pages/conditions/types";
import {
  serviceSharedCreamPlate,
  serviceSharedDarkPlate,
} from "@/content/pages/serviceTemplate";

type ConditionInput = Omit<
  ConditionPageContent,
  "creamPlateSrc" | "darkPlateSrc" | "hero"
> & {
  hero: Omit<
    ConditionPageContent["hero"],
    "imageSrc" | "imageAlt" | "imageObjectClass"
  > & {
    imageSrc?: string;
    imageAlt?: string;
    imageObjectClass?: string;
  };
};

/** Shared plates + shared hero for every condition page. */
export function defineCondition(input: ConditionInput): ConditionPageContent {
  return {
    ...input,
    hero: {
      ...input.hero,
      imageSrc: input.hero.imageSrc ?? CONDITION_HERO_IMAGE_SRC,
      imageAlt: input.hero.imageAlt ?? CONDITION_HERO_IMAGE_ALT,
      imageObjectClass:
        input.hero.imageObjectClass ?? CONDITION_HERO_OBJECT_CLASS,
    },
    creamPlateSrc: serviceSharedCreamPlate.src,
    darkPlateSrc: serviceSharedDarkPlate.src,
  };
}
