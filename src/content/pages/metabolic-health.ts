/**
 * Metabolic Health: EXION section stack; dedicated hero, mechanism, and card art;
 * temporary EXION plates/icons.
 */
import {
  SERVICE_EXION_ICON,
  serviceSharedCreamPlate,
  serviceSharedDarkPlate,
  type ServicePageContent,
} from "@/content/pages/serviceTemplate";

const ICON = SERVICE_EXION_ICON;
const METABOLIC_HEALTH_ASSET = "/assets/treatments/metabolic-health";
/** Bump when replacing Metabolic Health rasters so next/image + browser drop stale caches. */
const METABOLIC_HEALTH_ASSETS_VERSION = "20260804-cards";

function metabolicHealthAsset(file: string) {
  return `${METABOLIC_HEALTH_ASSET}/${file}?v=${METABOLIC_HEALTH_ASSETS_VERSION}`;
}

export const metabolicHealthContent: ServicePageContent = {
  hero: {
    title: "Metabolic Health",
    titleEmphasis: "A bigger story.",
    titleEmphasisLines: ["A bigger story."],
    subhead: "Energy. Clarity. Strength that lasts.",
    intro:
      "Stubborn weight. Afternoon crashes. Cravings. Rising blood sugar. Changing cholesterol. A waistline that seems to have a mind of its own. Sometimes your body simply stops responding the way it used to. At Arc Wellness, we don't begin with restriction. We begin with understanding.",
    closingLine: "Weight may be part of the story. It isn't the whole story.",
    poweredByEyebrow: "Physician-guided care",
    poweredByIconSrc: `${ICON}/atom.svg`,
    synergyLine: "Physiology first. Plans that fit you.",
    imageSrc: metabolicHealthAsset("metabolic-health-hero.webp"),
    imageAlt:
      "Nutrient-dense foods and wellness reading on a sunlit ARC Wellness table beneath a softly lit metabolic health emblem",
  },
  pillars: [
    {
      iconSrc: `${ICON}/cell.svg`,
      title: "Glucose",
      body: "Blood sugar and insulin regulation shape how your body creates and uses energy.",
    },
    {
      iconSrc: `${ICON}/battery-energy.svg`,
      title: "Energy",
      body: "Crashes, cravings, and fatigue often signal a metabolism under strain.",
    },
    {
      iconSrc: `${ICON}/bicep.svg`,
      title: "Muscle",
      body: "Lean muscle supports glucose regulation, strength, and healthy aging.",
    },
    {
      iconSrc: `${ICON}/lotus.svg`,
      title: "Balance",
      body: "Hormones, inflammation, sleep, and stress all influence metabolic function.",
    },
  ],
  creamPlate: serviceSharedCreamPlate,
  mechanism: {
    titleLines: ["More than a", "number on", "the scale"],
    body: "Metabolic health is the way your body creates, uses, and stores energy, and it affects far more than weight. Through physician consultation and comprehensive laboratory testing, we look for the patterns behind what you're experiencing, then create a plan around your physiology, not a generic diet or program.",
    evaluationBullets: [
      "Glucose and insulin regulation",
      "Cholesterol and cardiovascular markers",
      "Inflammation, hormonal and thyroid health",
      "Nutrient status and body composition",
      "Nutrition, sleep, stress, and movement",
    ],
    imageSrc: metabolicHealthAsset("metabolic-health-mechanism.webp"),
    imageAlt:
      "Metabolic wellness still life with berries, greens, hydration, vials, a scale, measuring tape, and strength tools in warm golden light",
    imageAspectClass: "aspect-[3/2]",
    imageObjectClass: "object-cover object-center scale-[1.01]",
  },
  treatments: {
    title: "A plan around",
    titleEmphasis: "your physiology",
    intro: "Look deeper. Protect muscle. Change the trajectory.",
    cards: [
      {
        title: "Look Deeper",
        tagline: "Patterns before prescriptions.",
        body: "We look for the signals behind stubborn weight, crashes, cravings, and changing labs, so your plan matches what your body is actually doing.",
        bullets: [
          "Physician consultation and comprehensive labs",
          "Metabolic and hormonal context together",
          "Body composition, not scale alone",
          "A plan built for your physiology",
        ],
        imageSrc: metabolicHealthAsset("metabolic-health-card-look-deeper.webp"),
        imageAlt:
          "Physician reviewing a metabolic assessment chart with a patient in consultation",
      },
      {
        title: "Strength Matters",
        tagline: "Muscle is metabolic health.",
        body: "Muscle supports glucose regulation, metabolism, strength, mobility, and healthy aging, which is why preserving lean muscle is an important part of our approach, especially during weight loss.",
        bullets: [
          "Protect lean muscle during change",
          "Support strength and mobility",
          "GLP-1 therapy when medically appropriate",
          "Medication is one tool, not the whole plan",
        ],
        imageSrc: metabolicHealthAsset(
          "metabolic-health-card-strength-matters.webp",
        ),
        imageAlt:
          "Woman training with resistance bands in a calm Arc Wellness space",
      },
      {
        title: "Change the Trajectory",
        tagline: "Respond earlier. Live stronger.",
        body: "Metabolic changes often begin quietly, long before they become a diagnosis. Understanding those signals helps protect long-term health and function for the years ahead.",
        bullets: [
          "Recognize quiet early signals",
          "Protect long-term metabolic health",
          "Goal: live stronger, not only weigh less",
          "Healthier function for the years ahead",
        ],
        imageSrc: metabolicHealthAsset(
          "metabolic-health-card-change-trajectory.webp",
        ),
        imageAlt:
          "Personalized health plan on a desk as a patient walks toward bright daylight ahead",
      },
    ],
  },
  different: {
    title: "At Arc, the goal",
    titleEmphasis: "isn't simply less",
    intro:
      "It's to live stronger, healthier, and better, with a metabolism that supports the life you want.",
    backgroundSrc: serviceSharedDarkPlate.src,
    backgroundAlt: "",
    cards: [
      {
        iconSrc: `${ICON}/mind.svg`,
        title: "Understanding First",
        body: "We don't begin with restriction. We begin with understanding.",
      },
      {
        iconSrc: `${ICON}/arc-wordmark.svg`,
        title: "Whole Picture",
        body: "Labs, hormones, muscle, sleep, and stress, seen together.",
      },
      {
        iconSrc: `${ICON}/bicep.svg`,
        title: "Muscle Protected",
        body: "Preserve strength while improving metabolic health.",
      },
      {
        iconSrc: `${ICON}/sun.svg`,
        title: "Earlier Response",
        body: "Quiet signals addressed before they become diagnoses.",
      },
    ],
  },
  experience: {
    title: "Your metabolic",
    titleEmphasis: "path",
    steps: [
      {
        iconSrc: `${ICON}/chat.svg`,
        title: "Consult",
        body: "Share what you're experiencing, crashes, cravings, weight, labs.",
      },
      {
        iconSrc: `${ICON}/checklist.svg`,
        title: "Test",
        body: "Comprehensive evaluation to uncover the patterns underneath.",
      },
      {
        iconSrc: `${ICON}/consult-desk.svg`,
        title: "Plan",
        body: "A physiology-first strategy, not a generic program.",
      },
      {
        iconSrc: `${ICON}/bicep.svg`,
        title: "Strengthen",
        body: "Protect muscle while improving how your body uses energy.",
      },
      {
        iconSrc: `${ICON}/calendar-check.svg`,
        title: "Sustain",
        body: "Support lasting metabolic health for the years ahead.",
      },
    ],
  },
  closing: {
    supportingLine:
      "At Arc, the goal isn't simply to weigh less. It's to live stronger, healthier, and better.",
  },
};

export const metabolicHealthHero = metabolicHealthContent.hero;
