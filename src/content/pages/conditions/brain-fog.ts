import { defineCondition } from "@/content/pages/conditions/defineCondition";
import { conditionServices } from "@/content/pages/conditions/serviceLinks";
import type { ConditionPageContent } from "@/content/pages/conditions/types";

/**
 * Brain Fog condition page — short stack from client brief.
 * Hero uses the shared conditions plate (all condition pages share one hero).
 */
export const brainFogContent: ConditionPageContent = defineCondition({
  slug: "brain-fog",
  seo: {
    title: "Brain Fog | Conditions | Arc Wellness",
    description:
      "Brain fog can leave you frustrated and wondering if this is simply part of getting older. At Arc Wellness, we help uncover what's driving it and build a personalized path back to clarity.",
  },
  hero: {
    title: "Brain Fog",
    subhead: "When Your Mind Doesn't Feel Like It Used To",
    paragraphs: [
      "You've walked into a room and forgotten why. Lost your train of thought mid-conversation. Read the same paragraph three times without remembering what it said.",
      "Brain fog can leave you feeling frustrated, overwhelmed, and wondering if this is simply part of getting older.",
      "We don't believe you should have to settle for \"this is just normal.\"",
      "Brain fog is often a sign that one or more systems in the body aren't functioning optimally, and understanding why is the first step toward restoring clarity.",
    ],
    closingLine: "Clarity is possible. Let's find what's behind the fog.",
  },
  imagine: {
    title: "Imagine Feeling Like Yourself Again",
    paragraphs: [
      "Mental clarity affects every part of life, from your confidence at work to your relationships, energy, and overall well-being. You deserve more than temporary fixes or being told your symptoms are simply part of aging.",
      "At Arc Wellness, our goal is to help you better understand your health, uncover what's possible, and create a personalized path toward feeling your best.",
    ],
  },
  discover: {
    title: "Discover What's Possible",
    intro:
      "Explore the services that may become part of your personalized Arc Blueprint.",
    services: conditionServices(
      "Brain Health",
      "Hormone Health",
      "Gut Health",
      "Medical Weight Loss",
      "IV Infusions",
      "Peptide Therapy",
      "Supplements",
      "ExoMind®",
    ),
  },
  closing: {
    supportingLine:
      "Ready to understand what's behind the fog? Start with a conversation.",
  },
});
