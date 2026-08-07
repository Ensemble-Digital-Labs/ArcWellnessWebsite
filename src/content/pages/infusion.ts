/**
 * Infusion Therapy landing content — EXION section stack, infusion copy.
 * Card imagery under public/assets/treatments/infusion-therapy; plates/icons
 * still temporarily reuse EXION assets.
 */

const EXION_ICON = "/assets/treatments/exion/icons";
const EXION_ASSET = "/assets/treatments/exion";
const INFUSION_ASSET = "/assets/treatments/infusion-therapy";
/** Bump when replacing infusion rasters so next/image + browser drop stale caches. */
const INFUSION_ASSETS_VERSION = "20260727-lowered";

function infusionAsset(file: string) {
  return `${INFUSION_ASSET}/${file}?v=${INFUSION_ASSETS_VERSION}`;
}

export type InfusionIconItem = {
  iconSrc: string;
  title: string;
  body: string;
  iconClassName?: string;
};

export type InfusionStat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type InfusionTreatmentCard = {
  eyebrow: string;
  title: string;
  tagline: string;
  body: string;
  bullets: readonly string[];
  imageSrc: string;
  imageAlt: string;
};

export const infusionHero = {
  title: "Infusion Therapy",
  titleEmphasis: "Nourish. Restore. Thrive.",
  titleEmphasisLines: ["Nourish. Restore.", "Thrive."],
  subhead: "Hydration. Immunity. Energy that lasts.",
  intro:
    "IV therapies deliver vitamins, minerals, and essential nutrients directly into your bloodstream for maximum absorption — supporting energy, immunity, hydration, and overall wellness.",
  closingLine: "Feel better. Perform better. Live better.",
  poweredByEyebrow: "Physician-guided care",
  poweredByIconSrc: `${EXION_ICON}/atom.svg`,
  synergyLine: "Custom infusions. Meaningful results.",
  imageSrc: infusionAsset("infusion-hero.webp"),
  imageAlt:
    "Patient receiving IV infusion therapy at ARC Wellness, with ARC WELLNESS IV bag visible",
} as const;

export const infusionPillars: readonly InfusionIconItem[] = [
  {
    iconSrc: `${EXION_ICON}/sun.svg`,
    title: "Instant Absorption",
    body: "Nutrients delivered directly into the bloodstream for maximum uptake.",
  },
  {
    iconSrc: `${EXION_ICON}/cell.svg`,
    title: "Immune Support",
    body: "Strengthen resilience with targeted vitamins and antioxidants.",
  },
  {
    iconSrc: `${EXION_ICON}/lotus.svg`,
    title: "Hydration & Detox",
    body: "Replenish fluids and support the body’s natural cleansing pathways.",
  },
  {
    iconSrc: `${EXION_ICON}/battery-energy.svg`,
    title: "Energy Boost",
    body: "Restore vitality when fatigue, stress, or recovery demand more.",
  },
];

/** Temporary cream plate (EXION asset). */
export const infusionCreamPlate = {
  src: `${EXION_ASSET}/exion-pillars-background.webp`,
  alt: "",
} as const;

/** Temporary dark plate (EXION asset). */
export const infusionDarkPlate = {
  src: `${EXION_ASSET}/exion-different-background.webp`,
  alt: "",
} as const;

export const infusionMechanism = {
  titleLines: ["Real nutrients.", "Real results."],
  body: "IV therapy delivers what your body needs — when oral supplements aren’t enough — for deeper hydration, steadier energy, and support you can feel.",
  stats: [
    { value: 30, prefix: "+", suffix: "%", label: "Increase in energy levels*" },
    { value: 25, prefix: "+", suffix: "%", label: "Improvement in hydration*" },
    { value: 20, prefix: "+", suffix: "%", label: "Stronger immune response*" },
    { value: 15, prefix: "+", suffix: "%", label: "Improved mental clarity & focus*" },
  ] as readonly InfusionStat[],
  imageSrc: infusionAsset("infusion-mechanism-drip.webp"),
  imageAlt: "Close-up of an IV drip chamber delivering nutrients",
} as const;

export const infusionTreatments = {
  title: "Our most popular",
  titleEmphasis: "infusions",
  intro: "One platform of care. Six ways to replenish.",
  cards: [
    {
      eyebrow: "Hydration",
      title: "The Hydrator",
      tagline: "Replenish. Restore. Revive.",
      body: "Foundational fluids and electrolytes to restore hydration when your body needs it most.",
      bullets: [
        "Supports rapid rehydration",
        "Replenishes essential electrolytes",
        "Helps ease fatigue from depletion",
        "Ideal after travel, heat, or exertion",
      ],
      imageSrc: infusionAsset("infusion-card-hydrator.webp"),
      imageAlt: "The Hydrator IV infusion — fluids and electrolytes",
    },
    {
      eyebrow: "Immunity",
      title: "Immune Support",
      tagline: "Defend. Strengthen. Protect.",
      body: "A targeted blend designed to reinforce immune resilience and antioxidant defense.",
      bullets: [
        "Supports immune function",
        "Antioxidant-rich formula",
        "Helps during seasonal stress",
        "Physician-guided dosing",
      ],
      imageSrc: infusionAsset("infusion-card-immune-support.webp"),
      imageAlt: "Immune Support IV infusion",
    },
    {
      eyebrow: "Vitality",
      title: "Energy Boost",
      tagline: "Fuel. Focus. Perform.",
      body: "Nutrients that support cellular energy so you can feel sharper and more sustained.",
      bullets: [
        "Supports steady energy",
        "Helps combat daily fatigue",
        "Complements an active lifestyle",
        "Customizable to your goals",
      ],
      imageSrc: infusionAsset("infusion-card-energy-boost.webp"),
      imageAlt: "Energy Boost IV infusion",
    },
    {
      eyebrow: "Cognition",
      title: "Focus & Clarity",
      tagline: "Clear. Calm. Sharp.",
      body: "Formulated to support mental clarity, focus, and cognitive performance.",
      bullets: [
        "Supports mental clarity",
        "Helps with focus under demand",
        "Complements recovery protocols",
        "Guided by your care team",
      ],
      imageSrc: infusionAsset("infusion-card-focus-clarity.webp"),
      imageAlt: "Focus & Clarity IV infusion",
    },
    {
      eyebrow: "Renewal",
      title: "Detox & Renew",
      tagline: "Cleanse. Reset. Renew.",
      body: "Support for the body’s natural detox pathways and a refreshed sense of balance.",
      bullets: [
        "Supports detox pathways",
        "Antioxidant support",
        "Helps you feel reset",
        "Paired with medical oversight",
      ],
      imageSrc: infusionAsset("infusion-card-detox-renew.webp"),
      imageAlt: "Detox & Renew IV infusion",
    },
    {
      eyebrow: "Radiance",
      title: "Beauty Glow",
      tagline: "Nourish. Glow. Radiate.",
      body: "Nutrients that support skin vitality from within for a healthier, more radiant look.",
      bullets: [
        "Supports skin vitality",
        "Nourishes from within",
        "Complements aesthetic care",
        "Personalized to your needs",
      ],
      imageSrc: infusionAsset("infusion-card-beauty-glow.webp"),
      imageAlt: "Beauty Glow IV infusion",
    },
  ] as readonly InfusionTreatmentCard[],
} as const;

/** Maps to EXION “Why different” — Who Can Benefit. */
export const infusionDifferent = {
  title: "Who can",
  titleEmphasis: "benefit?",
  intro:
    "Infusion therapy is for people who want deeper support than oral supplements alone — whether you are recovering, performing, traveling, or simply ready to feel your best.",
  backgroundSrc: `${EXION_ASSET}/exion-different-background.webp`,
  backgroundAlt: "",
  cards: [
    {
      iconSrc: `${EXION_ICON}/mind.svg`,
      title: "Feel Tired or Drained",
      body: "When fatigue lingers, targeted nutrients can help restore what oral intake may miss.",
    },
    {
      iconSrc: `${EXION_ICON}/cell.svg`,
      title: "Support Your Immune System",
      body: "Strengthen resilience through physician-guided vitamins and antioxidants.",
    },
    {
      iconSrc: `${EXION_ICON}/battery-energy.svg`,
      title: "Love Fitness & Recovery",
      body: "Rehydrate and replenish after training so recovery feels more complete.",
    },
    {
      iconSrc: `${EXION_ICON}/sun.svg`,
      title: "Travel Often",
      body: "Offset travel stress, dehydration, and schedule disruption with restorative infusions.",
    },
    {
      iconSrc: `${EXION_ICON}/brain.svg`,
      title: "Manage Stress & Overwhelm",
      body: "Support calm energy and clarity when life demands more than your baseline.",
    },
    {
      iconSrc: `${EXION_ICON}/lotus.svg`,
      title: "Look & Feel Your Best",
      body: "Nourish from within for vitality that shows in how you feel — and how you glow.",
    },
  ] as readonly InfusionIconItem[],
} as const;

export const infusionExperience = {
  title: "The Infusion",
  titleEmphasis: "experience",
  steps: [
    {
      iconSrc: `${EXION_ICON}/chat.svg`,
      title: "Consultation",
      body: "We listen to your goals and review what your body needs.",
    },
    {
      iconSrc: `${EXION_ICON}/droplet.svg`,
      title: "Your Infusion",
      body: "A personalized blend prepared for your session.",
      iconClassName: "origin-center scale-[1.7]",
    },
    {
      iconSrc: `${EXION_ICON}/meditation.svg`,
      title: "Relax & Replenish",
      body: "Settle in while nutrients deliver — simple, comfortable, effective.",
    },
    {
      iconSrc: `${EXION_ICON}/mind.svg`,
      title: "Feel the Difference",
      body: "Many notice a lift in energy, hydration, and clarity.",
    },
    {
      iconSrc: `${EXION_ICON}/calendar-check.svg`,
      title: "Lasting Benefits",
      body: "Ongoing care helps maintain the results that matter to you.",
    },
  ] as readonly InfusionIconItem[],
} as const;

export const infusionClosing = {
  supportingLine:
    "Fuel your body. Elevate your life — personalized infusions at ARC Wellness.",
} as const;
