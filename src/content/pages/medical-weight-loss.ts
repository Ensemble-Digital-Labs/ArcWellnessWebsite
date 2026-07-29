/**
 * Medical Weight Loss — EXION section stack; temporary EXION plates/icons + clinic heroes.
 */
import { CLINIC_INTERIOR_IMAGES } from "@/content/clinicInteriorImages";
import {
  SERVICE_EXION_ICON,
  serviceSharedCreamPlate,
  serviceSharedDarkPlate,
  type ServicePageContent,
} from "@/content/pages/serviceTemplate";

const ICON = SERVICE_EXION_ICON;

export const medicalWeightLossContent: ServicePageContent = {
  hero: {
    title: "Weight Loss",
    titleEmphasis: "More than the scale.",
    titleEmphasisLines: ["More than", "the scale."],
    subhead: "Understand. Strengthen. Keep the health.",
    intro:
      "You've tried eating less. Cutting carbs. Exercising more. Starting over on Monday. And maybe those things worked once—but your body doesn't respond the way it used to. At Arc Wellness, we don't see weight as a simple equation of calories in and calories out. We look at what's happening underneath it.",
    closingLine: "The medication isn't the program.",
    poweredByEyebrow: "Physician-guided care",
    poweredByIconSrc: `${ICON}/atom.svg`,
    synergyLine: "Lose weight. Keep strength. Gain health.",
    imageSrc: CLINIC_INTERIOR_IMAGES.consultationLounge,
    imageAlt:
      "Consultation lounge at ARC Wellness for medical weight loss evaluation",
  },
  pillars: [
    {
      iconSrc: `${ICON}/mind.svg`,
      title: "Understand",
      body: "Hormones, insulin, muscle, sleep, and stress shape how weight responds.",
    },
    {
      iconSrc: `${ICON}/cell.svg`,
      title: "Intention",
      body: "GLP-1 and other tools used with purpose—inside a fuller plan.",
    },
    {
      iconSrc: `${ICON}/magnet.svg`,
      title: "Muscle",
      body: "Protect lean mass so you get stronger, not only smaller.",
    },
    {
      iconSrc: `${ICON}/sun.svg`,
      title: "Composition",
      body: "A healthier body composition that supports the life you want.",
    },
  ],
  creamPlate: serviceSharedCreamPlate,
  mechanism: {
    titleLines: ["Understand", "the why"],
    body: "Hormones change. Insulin resistance develops. Muscle mass declines. Sleep, stress, inflammation, medications, and aging can all influence the way your body stores and uses energy. That's why your weight-loss journey begins with more than a prescription—through physician-guided evaluation and laboratory testing that look at the factors making weight loss more difficult.",
    evaluationBullets: [
      "Hormonal and metabolic contributors",
      "Insulin resistance and body composition",
      "Sleep, stress, inflammation, and medications",
      "A plan around your body, health, and goals",
    ],
    imageSrc: CLINIC_INTERIOR_IMAGES.hallwayAccentSeating,
    imageAlt: "Thoughtful clinical environment at ARC Wellness",
  },
  treatments: {
    title: "Medication with",
    titleEmphasis: "intention",
    intro: "Powerful tools. A stronger program around them.",
    cards: [
      {
        eyebrow: "Why first",
        title: "Understand the Why",
        tagline: "More than a prescription.",
        body: "We look at the factors that may be making weight loss more difficult—then build a plan around your body, your health, and your goals.",
        bullets: [
          "Physician-guided evaluation and labs",
          "Hormones, insulin, and muscle considered",
          "Sleep, stress, and inflammation in view",
          "A plan matched to your physiology",
        ],
        imageSrc: CLINIC_INTERIOR_IMAGES.waitingRoomArmchairGoldArt,
        imageAlt: "Calm seating at ARC Wellness",
      },
      {
        eyebrow: "Tools",
        title: "GLP-1 & Beyond",
        tagline: "When medically appropriate.",
        body: "GLP-1 and other weight-loss medications can be powerful tools. At Arc, medical weight loss may also include nutrition guidance, metabolic and hormone optimization, body composition monitoring, supplementation, movement, and strategies to preserve lean muscle.",
        bullets: [
          "GLP-1 when medically appropriate",
          "Nutrition and metabolic support",
          "Body composition monitoring",
          "Medication is one tool within the plan",
        ],
        imageSrc: CLINIC_INTERIOR_IMAGES.lobbyReceptionDeskProducts,
        imageAlt: "ARC Wellness care environment",
      },
      {
        eyebrow: "Outcome",
        title: "Protect the Muscle",
        tagline: "Change the composition.",
        body: "The scale only tells part of the story. Muscle supports metabolism, blood sugar regulation, strength, mobility, bone health, and long-term independence. Our focus isn't simply on becoming smaller—it's on creating a healthier, stronger body composition.",
        bullets: [
          "Preserve lean muscle during loss",
          "Support strength and mobility",
          "Healthier composition, not only size",
          "Health you keep after the weight comes off",
        ],
        imageSrc: CLINIC_INTERIOR_IMAGES.plantBonsaiWindowSill,
        imageAlt: "Quiet detail in the ARC Wellness clinic",
      },
    ],
  },
  different: {
    title: "Lose the weight.",
    titleEmphasis: "Gain something bigger.",
    intro:
      "More energy. More confidence. Better movement. Improved metabolic health. A body that feels easier to live in—and a deeper understanding of what your body needs to stay well after the weight comes off.",
    backgroundSrc: serviceSharedDarkPlate.src,
    backgroundAlt: "",
    cards: [
      {
        iconSrc: `${ICON}/battery-energy.svg`,
        title: "More Energy",
        body: "A body that fuels your day—not one that fights it.",
      },
      {
        iconSrc: `${ICON}/mind.svg`,
        title: "More Confidence",
        body: "Feeling at home in a stronger, healthier composition.",
      },
      {
        iconSrc: `${ICON}/magnet.svg`,
        title: "Better Movement",
        body: "Strength and mobility that support independence.",
      },
      {
        iconSrc: `${ICON}/cell.svg`,
        title: "Metabolic Health",
        body: "Improved metabolic markers alongside the scale.",
      },
      {
        iconSrc: `${ICON}/lotus.svg`,
        title: "Easier Living",
        body: "A body that feels easier to live in day to day.",
      },
      {
        iconSrc: `${ICON}/sun.svg`,
        title: "What Comes Next",
        body: "Reaching a number isn't where the journey ends.",
      },
    ],
  },
  experience: {
    title: "Your weight-loss",
    titleEmphasis: "journey",
    steps: [
      {
        iconSrc: `${ICON}/chat.svg`,
        title: "Consult",
        body: "Share what's worked, what hasn't, and how your body feels now.",
      },
      {
        iconSrc: `${ICON}/book.svg`,
        title: "Evaluate",
        body: "Labs and physician insight into the \"why\" underneath.",
      },
      {
        iconSrc: `${ICON}/meditation.svg`,
        title: "Plan",
        body: "Medication with intention—inside a fuller program.",
      },
      {
        iconSrc: `${ICON}/mind.svg`,
        title: "Protect",
        body: "Preserve lean muscle while composition improves.",
      },
      {
        iconSrc: `${ICON}/calendar-check.svg`,
        title: "Sustain",
        body: "Keep the health you gain after the weight comes off.",
      },
    ],
  },
  closing: {
    supportingLine:
      "Because reaching a number on the scale isn't where the journey ends. It's what your healthier body allows you to do next.",
  },
};

export const medicalWeightLossHero = medicalWeightLossContent.hero;
