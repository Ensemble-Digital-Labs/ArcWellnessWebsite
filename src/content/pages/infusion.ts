/**
 * Infusion Therapy landing content — EXION section stack, infusion copy.
 * Imagery/icons temporarily reuse EXION assets until infusion kit is ready.
 */

const EXION_ICON = "/assets/treatments/exion/icons";
const EXION_ASSET = "/assets/treatments/exion";

export type InfusionIconItem = {
  iconSrc: string;
  title: string;
  body: string;
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
  /** Temporary stand-in — swap when infusion hero WebP is ready. */
  imageSrc: `${EXION_ASSET}/exion-hero-diverse-patient-4k.webp`,
  imageAlt: "Infusion therapy at ARC Wellness",
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
  /** Temporary still — swap for infusion media / video later. */
  imageSrc: "/assets/sections/clinic-interiors/iv-therapy-recliner-room.webp",
  imageAlt: "IV therapy recliner room at ARC Wellness",
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
      imageSrc: `${EXION_ASSET}/exion-card-emface-device-4k.webp`,
      imageAlt: "Infusion therapy at ARC Wellness",
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
      imageSrc: `${EXION_ASSET}/exion-card-rf-microneedling-4k.webp`,
      imageAlt: "Infusion therapy at ARC Wellness",
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
      imageSrc: `${EXION_ASSET}/exion-card-clear-laser-resurfacing-4k.webp`,
      imageAlt: "Infusion therapy at ARC Wellness",
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
      imageSrc: `${EXION_ASSET}/exion-card-emface-device-4k.webp`,
      imageAlt: "Infusion therapy at ARC Wellness",
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
      imageSrc: `${EXION_ASSET}/exion-card-rf-microneedling-4k.webp`,
      imageAlt: "Infusion therapy at ARC Wellness",
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
      imageSrc: `${EXION_ASSET}/exion-card-clear-laser-resurfacing-4k.webp`,
      imageAlt: "Infusion therapy at ARC Wellness",
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
      iconSrc: `${EXION_ICON}/book.svg`,
      title: "Your Infusion",
      body: "A personalized blend prepared for your session.",
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
