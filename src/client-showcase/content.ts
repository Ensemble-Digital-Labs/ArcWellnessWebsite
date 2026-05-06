import { PATH_STEP_IMAGE_SRC } from "@/content/backgroundDecoration";

/** Base path for in-app anchor links from the showcase header. */
export const CLIENT_SHOWCASE_BASE = "/client-showcase" as const;

/** Map homepage hash links (`/#section`) to the showcase route. */
export function showcaseInternalHref(href: string): string {
  if (href.startsWith("/#")) {
    return `${CLIENT_SHOWCASE_BASE}#${href.slice(2)}`;
  }
  return href;
}

export const showcaseConcernPanels = [
  {
    title: "Low Energy & Burnout",
    image: "/assets/sections/concerns/concern-low-energy-burnout.png",
    blurb:
      "We connect sleep, stress, hormones, and nutrition so fatigue is understood as a pattern—not dismissed as “just busy.”",
  },
  {
    title: "Hormonal Imbalance & Weight Gain",
    image: "/assets/sections/concerns/concern-hormonal-imbalance-weight-gain.png",
    blurb:
      "Metabolic and hormonal insight paired with lifestyle support, aimed at sustainable change rather than quick fixes.",
  },
  {
    title: "Poor Sleep & Recovery",
    image: "/assets/sections/concerns/concern-poor-sleep-recovery.png",
    blurb:
      "From circadian rhythm to stress load, we map what blocks restorative sleep and recovery in your real life.",
  },
  {
    title: "Aging Skin & Body Changes",
    image: "/assets/sections/concerns/concern-aging-skin-body-changes.png",
    blurb:
      "Evidence-based aesthetics and longevity-aligned care, tuned to how you want to look and feel over time.",
  },
  {
    title: "Brain Fog & Focus Issues",
    image: "/assets/sections/concerns/concern-brain-fog-focus-issues.png",
    blurb:
      "Whole-person assessment to clarify cognition—nutrition, sleep, hormones, and stress—before jumping to stimulants alone.",
  },
] as const;

export const showcasePathSteps = [
  {
    numeral: "I.",
    title: "Listen",
    stepMeta: "STEP 01 · 90 MINUTES",
    description:
      "A conversation, not an intake. We ask about your sleep, your work, your weeks. Patterns surface before any test does.",
    imageSrc: PATH_STEP_IMAGE_SRC.listen,
    imageAlt: "Listen — first step of the ARC wellness journey",
    contentOnLeft: false,
  },
  {
    numeral: "II.",
    title: "Measure",
    stepMeta: "STEP 02 · TWO VISITS",
    description:
      "Comprehensive panels, body composition, cognitive assessments. We capture the numbers that matter — and the ones most clinics miss.",
    imageSrc: PATH_STEP_IMAGE_SRC.measure,
    imageAlt: "Measure — assessments and diagnostics",
    contentOnLeft: true,
  },
  {
    numeral: "III.",
    title: "Author",
    stepMeta: "STEP 03 · ONE WEEK",
    description:
      "Your team meets — without you in the room — and writes a plan in five chapters: surface, shape, foundation, mind, and the long view.",
    imageSrc: PATH_STEP_IMAGE_SRC.author,
    imageAlt: "Author — your personalized care plan",
    contentOnLeft: false,
  },
  {
    numeral: "IV.",
    title: "Practice",
    stepMeta: "STEP 04 · ONGOING",
    description:
      "We meet monthly. Treatments, coaching, refinements — kept small enough to actually do, long enough to actually work.",
    imageSrc: PATH_STEP_IMAGE_SRC.practice,
    imageAlt: "Practice — ongoing care and coaching",
    contentOnLeft: true,
  },
  {
    numeral: "V.",
    title: "Revise",
    stepMeta: "STEP 05 · EACH SEASON",
    description:
      "Every quarter we re-measure and rewrite. The plan ages with you, in pencil, never in stone.",
    imageSrc: PATH_STEP_IMAGE_SRC.revise,
    imageAlt: "Revise — seasonal plan updates",
    contentOnLeft: false,
  },
] as const;

export const showcaseUspStats = [
  { value: "12+", label: "Treatment Modalities" },
  { value: "FDA", label: "Cleared Technology" },
  { value: "0", label: "Membership Required" },
  { value: "Free", label: "Initial Consultation" },
] as const;
