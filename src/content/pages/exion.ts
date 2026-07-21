import { MEDICAL_SPA_NAMED_IMAGES } from "@/content/medicalSpaServiceImages";

/**
 * Bespoke EXION landing content — translated from the demo Exion page
 * (arcwelness-service-demo.netlify.app/exion) into structured, on-brand
 * sections rendered by `ExionTreatmentContent`. Copy mirrors the demo;
 * numeric stats are sourced from ARC's own EXION treatment copy.
 */

/** Custom hand-drawn gold line-art emblems (see public/assets/treatments/exion/icons). */
const EXION_ICON = "/assets/treatments/exion/icons";
const EXION_ASSET = "/assets/treatments/exion";

export type ExionIconItem = {
  iconSrc: string;
  title: string;
  body: string;
};

export const exionHero = {
  eyebrow: "Skin Rejuvenation",
  title: "EXION",
  titleEmphasis: "refinement at every layer.",
  titleEmphasisLines: ["refinement at", "every layer."],
  subhead: "Science. Energy. Results that last.",
  intro:
    "EXION is a next-generation technology that combines radiofrequency and targeted ultrasound to stimulate collagen, improve skin quality, and restore structure — without needles or downtime.",
  poweredByEyebrow: "Powered by next-generation technology",
  poweredByIconSrc: `${EXION_ICON}/atom.svg`,
  synergyLine: "Targeted ultrasound + RF, working in synergy.",
  closingLine: "Stronger skin. Smoother texture. Greater confidence.",
  /** Full-bleed hero background (4K master + WebP under public/assets/treatments/exion). */
  imageSrc: `${EXION_ASSET}/exion-hero-treatment-4k.webp`,
  imageAlt: "EXION radiofrequency and ultrasound facial treatment at ARC Wellness",
} as const;

export const exionPillars: readonly ExionIconItem[] = [
  {
    iconSrc: `${EXION_ICON}/magnet.svg`,
    title: "Stimulate",
    body: "Activate natural collagen and elastin production.",
  },
  {
    iconSrc: `${EXION_ICON}/cell.svg`,
    title: "Rebuild",
    body: "Strengthen skin structure and improve resilience.",
  },
  {
    iconSrc: `${EXION_ICON}/lotus.svg`,
    title: "Renew",
    body: "Refine tone, texture, and radiance from within.",
  },
  {
    iconSrc: `${EXION_ICON}/sun.svg`,
    title: "Restore",
    body: "Reveal smoother, firmer, more confident skin.",
  },
];

/** Decorative cream plate behind pillars → mechanism → treatments (curve to curve). */
export const exionPillarsBackground = {
  /** Serve as-is (unoptimized) — Next/AVIF recompress washes this plate too white. */
  src: `${EXION_ASSET}/exion-pillars-background.webp`,
  alt: "",
} as const;

export type ExionStat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export const exionMechanism = {
  titleLines: ["Beautiful skin", "begins beneath", "the surface"],
  body: "EXION delivers controlled thermal energy deep into the skin, activating fibroblasts and stimulating collagen and elastin production — where true renewal happens.",
  stats: [
    { value: 27, prefix: "+", suffix: "%", label: "Average increase in collagen production" },
    { value: 23, prefix: "+", suffix: "%", label: "Improvement in skin elasticity" },
    { value: 31, prefix: "+", suffix: "%", label: "Increase in hyaluronic acid" },
    { value: 28, prefix: "+", suffix: "%", label: "Improvement in overall skin texture and tone" },
  ] as readonly ExionStat[],
  imageSrc: MEDICAL_SPA_NAMED_IMAGES.emfaceCheekApplicatorTreatment,
  imageAlt: "Woman with refined, healthy skin after an EXION treatment at ARC Wellness",
} as const;

export type ExionTreatmentCard = {
  eyebrow: string;
  title: string;
  tagline: string;
  body: string;
  bullets: readonly string[];
  imageSrc: string;
  imageAlt: string;
};

export const exionTreatments = {
  title: "Three transformative",
  titleEmphasis: "treatments",
  intro: "One platform. Three ways to renew.",
  cards: [
    {
      eyebrow: "Facial toning",
      title: "EMFACE",
      tagline: "Lift. Tone. Confidence.",
      body: "Non-invasive facial muscle toning lifts and strengthens the underlying muscles to improve definition and soften the appearance of fine lines.",
      bullets: [
        "Lifts and tones facial muscles",
        "Improves definition and contour",
        "Reduces fine lines and wrinkles",
        "No needles, no downtime",
      ],
      imageSrc: MEDICAL_SPA_NAMED_IMAGES.emfaceCheekApplicatorTreatment,
      imageAlt: "EMFACE facial muscle toning applicator at ARC Wellness",
    },
    {
      eyebrow: "Collagen renewal",
      title: "RF Microneedling",
      tagline: "Build. Tighten. Renew.",
      body: "Targets the deeper layers of the skin to stimulate collagen, tighten tissue, and improve overall skin quality.",
      bullets: [
        "Improves fine lines and scars",
        "Tightens and firms lax skin",
        "Refines texture and minimizes pores",
        "Enhances overall skin tone",
      ],
      imageSrc: MEDICAL_SPA_NAMED_IMAGES.emfaceForeheadRedLightTreatment,
      imageAlt: "EXION RF microneedling skin treatment at ARC Wellness",
    },
    {
      eyebrow: "Surface resurfacing",
      title: "Clear Laser Resurfacing",
      tagline: "Smooth. Brighten. Resurface.",
      body: "Precisely renews damaged surface layers of skin to reveal a smoother, brighter, more even complexion.",
      bullets: [
        "Improves sun damage and pigmentation",
        "Smooths fine lines and uneven texture",
        "Enhances clarity and radiance",
        "Improves healthy skin renewal",
      ],
      imageSrc: MEDICAL_SPA_NAMED_IMAGES.emfaceBtlConsoleFacialTreatment,
      imageAlt: "EXION laser resurfacing treatment at ARC Wellness",
    },
  ] as readonly ExionTreatmentCard[],
} as const;

export const exionDifferent = {
  title: "Why EXION is",
  titleEmphasis: "different?",
  intro:
    "EXION combines the power of radiofrequency and targeted ultrasound in one platform for deeper, more effective, and longer-lasting results — without disrupting the surface of your skin.",
  /** Dark gold-wave backdrop for this section (WebP under public/assets/treatments/exion). */
  backgroundSrc: `${EXION_ASSET}/exion-different-background.webp`,
  backgroundAlt: "",
  cards: [
    {
      iconSrc: `${EXION_ICON}/battery-energy.svg`,
      title: "Dual-Energy Technology",
      body: "RF and targeted ultrasound work together to reach multiple depths of the skin for comprehensive rejuvenation.",
    },
    {
      iconSrc: `${EXION_ICON}/atom.svg`,
      title: "Targets Fibroblasts",
      body: "Stimulates the skin's structural cells to increase collagen, elastin, and hyaluronic acid production.",
    },
    {
      iconSrc: `${EXION_ICON}/face-device.svg`,
      title: "Precise & Controlled",
      body: "Delivers energy in measured, controlled ways, exactly where the skin needs it most.",
    },
    {
      iconSrc: `${EXION_ICON}/clock.svg`,
      title: "Safe & Effective",
      body: "Non-invasive treatments with no needles, no surgery, and little to no downtime.",
    },
  ] as readonly ExionIconItem[],
} as const;

export const exionExperience = {
  title: "The EXION",
  titleEmphasis: "experience",
  steps: [
    {
      iconSrc: `${EXION_ICON}/chat.svg`,
      title: "Consultation",
      body: "We listen to your skin goals and evaluate your skin.",
    },
    {
      iconSrc: `${EXION_ICON}/book.svg`,
      title: "Personalized Plan",
      body: "Your treatment plan is tailored to your unique needs.",
    },
    {
      iconSrc: `${EXION_ICON}/meditation.svg`,
      title: "Comfortable Treatment",
      body: "Advanced technology delivers powerful results with ease.",
    },
    {
      iconSrc: `${EXION_ICON}/mind.svg`,
      title: "Visible Results",
      body: "Noticeable improvement in tone, texture, and firmness.",
    },
    {
      iconSrc: `${EXION_ICON}/calendar-check.svg`,
      title: "Maintain & Enhance",
      body: "Ongoing treatments help maintain your best results.",
    },
  ] as readonly ExionIconItem[],
} as const;

export const exionResults = {
  title: "Real results.",
  titleEmphasis: "Refined confidence.",
  intro: "See the difference advanced technology can make.",
  disclaimer: "*Individual results may vary.",
  cards: [
    { label: "EXION Result 1", caption: "Improved firmness and facial contour*" },
    { label: "EXION Result 2", caption: "Refined texture and smoother skin*" },
    { label: "EXION Result 3", caption: "Brighter, healthier-looking skin*" },
  ],
} as const;

export const exionClosing = {
  title: "Your best skin",
  titleEmphasis: "starts within.",
  support: "Discover the power of EXION and experience refinement at every layer.",
  supportingLine:
    "Let's build your plan for stronger, smoother, more radiant skin — refinement at every layer.",
} as const;
