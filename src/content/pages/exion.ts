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
  imageSrc: `${EXION_ASSET}/exion-hero-diverse-patient-4k.webp`,
  imageAlt: "EXION facial treatment with diverse patient at ARC Wellness",
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

/** Bunny Stream library + video (unlisted embed; restrict domains in Bunny Security). */
const EXION_BUNNY_LIBRARY_ID = "710568";
const EXION_BUNNY_VIDEO_ID = "5fbd5594-ac2f-4472-8c54-94513a9e3abc";
const EXION_BUNNY_EMBED_BASE = `https://player.mediadelivery.net/embed/${EXION_BUNNY_LIBRARY_ID}/${EXION_BUNNY_VIDEO_ID}`;

export const exionMechanism = {
  titleLines: ["Beautiful skin", "begins beneath", "the surface"],
  body: "EXION delivers controlled thermal energy deep into the skin, activating fibroblasts and stimulating collagen and elastin production — where true renewal happens.",
  stats: [
    { value: 27, prefix: "+", suffix: "%", label: "Average increase in collagen production" },
    { value: 23, prefix: "+", suffix: "%", label: "Improvement in skin elasticity" },
    { value: 31, prefix: "+", suffix: "%", label: "Increase in hyaluronic acid" },
    { value: 28, prefix: "+", suffix: "%", label: "Improvement in overall skin texture and tone" },
  ] as readonly ExionStat[],
  /**
   * Stable Bunny embed (Player.js play/pause on scroll — do not swap src or the
   * iframe remounts and resets). `playerjs=true` enables the control bridge.
   */
  videoEmbedSrc: `${EXION_BUNNY_EMBED_BASE}?autoplay=false&loop=true&muted=true&preload=true&responsive=true&playerjs=true`,
  videoTitle: "EXION treatment sizzle at ARC Wellness",
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
      imageSrc: `${EXION_ASSET}/exion-card-emface-device-4k.webp`,
      imageAlt: "EMFACE facial muscle toning device at ARC Wellness",
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
      imageSrc: `${EXION_ASSET}/exion-card-rf-microneedling-4k.webp`,
      imageAlt: "EXION RF microneedling handpiece at ARC Wellness",
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
      imageSrc: `${EXION_ASSET}/exion-card-clear-laser-resurfacing-4k.webp`,
      imageAlt: "EXION Clear Laser resurfacing handpiece at ARC Wellness",
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
  slides: [
    {
      src: `${EXION_ASSET}/results/exion-ba-cheek-female-040.webp`,
      alt: "EXION before and after — female cheek, refined texture and contour",
    },
    {
      src: `${EXION_ASSET}/results/exion-ba-cheek-female-004.webp`,
      alt: "EXION before and after — female cheek, smoother skin texture",
    },
    {
      src: `${EXION_ASSET}/results/exion-ba-forehead-male-022.webp`,
      alt: "EXION before and after — male forehead, clearer smoother skin",
    },
    {
      src: `${EXION_ASSET}/results/exion-ba-face-male-112.webp`,
      alt: "EXION Clear RF before and after — male face",
    },
    {
      src: `${EXION_ASSET}/results/exion-ba-face-male-113.webp`,
      alt: "EXION Clear RF before and after — male face, refined results",
    },
  ],
} as const;

export const exionClosing = {
  title: "Your best skin",
  titleEmphasis: "starts within.",
  support: "Discover the power of EXION and experience refinement at every layer.",
  supportingLine:
    "Let's build your plan for stronger, smoother, more radiant skin — refinement at every layer.",
} as const;
