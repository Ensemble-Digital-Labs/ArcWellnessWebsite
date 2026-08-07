/**
 * Neuromodulators: EXION section stack; dedicated hero, mechanism, and card art;
 * temporary EXION plates/icons.
 */
import {
  SERVICE_EXION_ICON,
  serviceSharedCreamPlate,
  serviceSharedDarkPlate,
  type ServicePageContent,
} from "@/content/pages/serviceTemplate";

const ICON = SERVICE_EXION_ICON;
const NEUROMODULATORS_ASSET = "/assets/treatments/neuromodulators";
/** Bump when replacing Neuromodulators rasters so next/image + browser drop stale caches. */
const NEUROMODULATORS_ASSETS_VERSION = "20260804-cards";

function neuromodulatorsAsset(file: string) {
  return `${NEUROMODULATORS_ASSET}/${file}?v=${NEUROMODULATORS_ASSETS_VERSION}`;
}

export const neuromodulatorsContent: ServicePageContent = {
  hero: {
    title: "Neuromodulators",
    titleEmphasis: "Still you. Just refreshed.",
    titleEmphasisLines: ["Still you.", "Just refreshed."],
    subhead: "Soften. Preserve. Stay you.",
    intro:
      "Your face tells your story. Every smile, laugh, squint, and expression becomes part of it. Over time, those repeated movements can leave lines that remain even after the expression has passed. Neuromodulators, including DAXXIFY®, soften the appearance of dynamic lines while preserving what matters most: you still look like you.",
    closingLine: "You still look like you.",
    poweredByEyebrow: "Physician-guided care",
    poweredByIconSrc: `${ICON}/atom.svg`,
    synergyLine: "Thoughtful placement. Intentional dosing.",
    imageSrc: neuromodulatorsAsset("neuromodulators-hero.webp"),
    imageAlt:
      "Practitioner administering a neuromodulator injection to a relaxed patient under soft golden light",
  },
  pillars: [
    {
      iconSrc: `${ICON}/lotus.svg`,
      title: "Soften",
      body: "Dynamic lines between the brows, across the forehead, and around the eyes can ease without erasing you.",
    },
    {
      iconSrc: `${ICON}/face-device.svg`,
      title: "Expression",
      body: "The goal is never a frozen forehead. It is a smoother look that still moves with you.",
    },
    {
      iconSrc: `${ICON}/target-rings.svg`,
      title: "Placement",
      body: "Thoughtful placement and intentional dosing shaped around your facial movement and goals.",
    },
    {
      iconSrc: `${ICON}/person-sparkle.svg`,
      title: "Still You",
      body: "People may notice you look rested. They should not immediately know why.",
    },
  ],
  creamPlate: serviceSharedCreamPlate,
  mechanism: {
    titleLines: ["Soften the lines.", "Keep the expression."],
    body: "Neuromodulators work by temporarily relaxing targeted facial muscles responsible for expression lines. Treatment can beautifully soften frown lines between the brows, forehead lines, crow's feet, and other areas of facial tension and movement. The goal isn't a frozen forehead or an expressionless face. It's thoughtful placement and intentional dosing designed to create a smoother, rested appearance that still moves naturally with you.",
    evaluationBullets: [
      "Frown lines between the brows",
      "Forehead lines",
      "Crow's feet",
      "Other areas of facial tension and movement",
    ],
    imageSrc: neuromodulatorsAsset("neuromodulators-mechanism.webp"),
    imageAlt:
      "Practitioner assessing brow and expression lines before neuromodulator treatment",
    imageAspectClass: "aspect-[3/2]",
    imageObjectClass: "object-cover object-[center_28%] scale-[1.01]",
  },
  treatments: {
    title: "A more thoughtful",
    titleEmphasis: "approach",
    intro: "Injectables aren't about changing your face. They're about knowing when, and where, to stop.",
    cards: [
      {
        title: "Keep the Expression",
        tagline: "Soften. Don't freeze.",
        body: "Treatment softens dynamic lines while preserving natural movement, so your face still tells your story, only a little more refreshed.",
        bullets: [
          "Targets muscles behind expression lines",
          "Customized areas based on your face",
          "Smoother, rested appearance",
          "Natural movement preserved",
        ],
        imageSrc: neuromodulatorsAsset(
          "neuromodulators-card-keep-expression.webp",
        ),
        imageAlt:
          "Naturally refreshed expression that still moves with you",
        imageObjectClass: "object-[center_28%]",
      },
      {
        title: "Thoughtful Injectables",
        tagline: "Structure. Symmetry. Goals.",
        body: "At Arc Wellness, we consider your facial structure, natural movement, symmetry, and personal goals before recommending treatment. Sometimes that means treating less. Sometimes it means combining treatments. And sometimes it means deciding you don't need something at all.",
        bullets: [
          "Facial structure and movement assessed",
          "Sometimes treating less is better",
          "Combine only when it serves you",
          "Knowing when to stop",
        ],
        imageSrc: neuromodulatorsAsset(
          "neuromodulators-card-thoughtful-injectables.webp",
        ),
        imageAlt:
          "Provider reviewing facial structure and goals with a patient before injectables",
        imageObjectClass: "object-[center_40%]",
      },
      {
        title: "Why DAXXIFY®",
        tagline: "Peptide-powered longevity.",
        body: "DAXXIFY® is a peptide-powered neuromodulator designed to temporarily improve the appearance of moderate to severe expression lines, with results that may last longer than many traditional neuromodulators for some patients. That can mean beautifully softened lines with more time between treatments.",
        bullets: [
          "Peptide-powered formulation",
          "May last longer for some patients",
          "Customized to your facial movement",
          "Matched to your desired result",
        ],
        imageSrc: neuromodulatorsAsset(
          "neuromodulators-card-why-daxxify.webp",
        ),
        imageAlt:
          "Precise neuromodulator treatment softens expression lines with intentional placement",
        imageObjectClass: "object-[center_45%]",
      },
    ],
  },
  different: {
    title: "Look rested.",
    titleEmphasis: "Not different.",
    intro:
      "The best injectable treatment shouldn't announce itself. People may notice that you look rested. Refreshed. Maybe a little brighter. They shouldn't immediately know why.",
    backgroundSrc: serviceSharedDarkPlate.src,
    backgroundAlt: "",
    cards: [
      {
        iconSrc: `${ICON}/sleep.svg?v=zoom`,
        title: "Rested",
        body: "A softer look that reads as well-rested, not overdone.",
        iconClassName: "origin-center scale-[1.45]",
      },
      {
        iconSrc: `${ICON}/sun.svg`,
        title: "Refreshed",
        body: "Maybe a little brighter, without changing who you are.",
        iconClassName: "origin-center scale-[1.35]",
      },
      {
        iconSrc: `${ICON}/lotus.svg`,
        title: "Subtle",
        body: "The best work shouldn't announce itself.",
        iconClassName: "origin-center scale-[1.3]",
      },
      {
        iconSrc: `${ICON}/person-sparkle.svg`,
        title: "Recognizable",
        body: "Confidence comes from still recognizing yourself.",
        iconClassName: "origin-center scale-[1.4]",
      },
      {
        iconSrc: `${ICON}/target-rings.svg`,
        title: "Intentional",
        body: "Placement and dosing shaped around your goals.",
        iconClassName: "origin-center scale-[1.4]",
      },
      {
        iconSrc: `${ICON}/molecule.svg`,
        title: "DAXXIFY® Option",
        body: "Longer intervals between treatments for some patients.",
        iconClassName: "origin-center scale-[1.45]",
      },
    ],
  },
  experience: {
    title: "Your neuromodulator",
    titleEmphasis: "visit",
    steps: [
      {
        iconSrc: `${ICON}/chat.svg`,
        title: "Listen",
        body: "Share what you see, what bothers you, and what you want to keep.",
        iconClassName: "origin-center scale-[1.45]",
      },
      {
        iconSrc: `${ICON}/consult-desk.svg`,
        title: "Assess",
        body: "Facial structure, movement, symmetry, and goals guide the plan.",
        iconClassName: "origin-center scale-[1.4]",
      },
      {
        iconSrc: `${ICON}/target-rings.svg`,
        title: "Place",
        body: "Thoughtful placement with intentional dosing.",
        iconClassName: "origin-center scale-[1.45]",
      },
      {
        iconSrc: `${ICON}/lotus.svg`,
        title: "Soften",
        body: "Dynamic lines ease while expression stays yours.",
        iconClassName: "origin-center scale-[1.35]",
      },
      {
        iconSrc: `${ICON}/calendar-check.svg`,
        title: "Return",
        body: "A maintenance rhythm matched to how your face responds.",
        iconClassName: "origin-center scale-[1.45]",
      },
    ],
  },
  closing: {
    supportingLine:
      "Because confidence doesn't come from changing your face. It comes from still recognizing yourself in it.",
  },
};

export const neuromodulatorsHero = neuromodulatorsContent.hero;
