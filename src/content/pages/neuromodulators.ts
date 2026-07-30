/**
 * Neuromodulators: EXION section stack; dedicated hero + temporary EXION plates/icons
 * and clinic-interior card photography.
 */
import { CLINIC_INTERIOR_IMAGES } from "@/content/clinicInteriorImages";
import {
  SERVICE_EXION_ICON,
  serviceSharedCreamPlate,
  serviceSharedDarkPlate,
  type ServicePageContent,
} from "@/content/pages/serviceTemplate";

const ICON = SERVICE_EXION_ICON;
const NEUROMODULATORS_ASSET = "/assets/treatments/neuromodulators";
/** Bump when replacing Neuromodulators rasters so next/image + browser drop stale caches. */
const NEUROMODULATORS_ASSETS_VERSION = "20260730-hero";

function neuromodulatorsAsset(file: string) {
  return `${NEUROMODULATORS_ASSET}/${file}?v=${NEUROMODULATORS_ASSETS_VERSION}`;
}

export const neuromodulatorsContent: ServicePageContent = {
  hero: {
    title: "Neuromodulators",
    titleEmphasis: "Still you. Just a little more refreshed.",
    titleEmphasisLines: ["Still you.", "Just a little more refreshed."],
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
      iconSrc: `${ICON}/meditation.svg`,
      title: "Placement",
      body: "Thoughtful placement and intentional dosing shaped around your facial movement and goals.",
    },
    {
      iconSrc: `${ICON}/sun.svg`,
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
    imageSrc: CLINIC_INTERIOR_IMAGES.waitingRoomArmchairGoldArt,
    imageAlt: "Calm seating at ARC Wellness for aesthetics consultations",
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
        imageSrc: CLINIC_INTERIOR_IMAGES.consultationLounge,
        imageAlt: "Consultation lounge at ARC Wellness",
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
        imageSrc: CLINIC_INTERIOR_IMAGES.lobbyReceptionDeskProducts,
        imageAlt: "ARC Wellness care environment",
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
        imageSrc: CLINIC_INTERIOR_IMAGES.hallwayDaxxifyBannerWaveArt,
        imageAlt: "DAXXIFY® presence in the ARC Wellness clinic",
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
        iconSrc: `${ICON}/lotus.svg`,
        title: "Rested",
        body: "A softer look that reads as well-rested, not overdone.",
      },
      {
        iconSrc: `${ICON}/sun.svg`,
        title: "Refreshed",
        body: "Maybe a little brighter, without changing who you are.",
      },
      {
        iconSrc: `${ICON}/mind.svg`,
        title: "Subtle",
        body: "The best work shouldn't announce itself.",
      },
      {
        iconSrc: `${ICON}/chat.svg`,
        title: "Recognizable",
        body: "Confidence comes from still recognizing yourself.",
      },
      {
        iconSrc: `${ICON}/meditation.svg`,
        title: "Intentional",
        body: "Placement and dosing shaped around your goals.",
      },
      {
        iconSrc: `${ICON}/atom.svg`,
        title: "DAXXIFY® Option",
        body: "Longer intervals between treatments for some patients.",
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
      },
      {
        iconSrc: `${ICON}/book.svg`,
        title: "Assess",
        body: "Facial structure, movement, symmetry, and goals guide the plan.",
      },
      {
        iconSrc: `${ICON}/meditation.svg`,
        title: "Place",
        body: "Thoughtful placement with intentional dosing.",
      },
      {
        iconSrc: `${ICON}/lotus.svg`,
        title: "Soften",
        body: "Dynamic lines ease while expression stays yours.",
      },
      {
        iconSrc: `${ICON}/calendar-check.svg`,
        title: "Return",
        body: "A maintenance rhythm matched to how your face responds.",
      },
    ],
  },
  closing: {
    supportingLine:
      "Because confidence doesn't come from changing your face. It comes from still recognizing yourself in it.",
  },
};

export const neuromodulatorsHero = neuromodulatorsContent.hero;
