/**
 * EmSculpt Neo landing content — EXION section stack, copy from client brief.
 * Hero under public/assets/treatments/emsculpt-neo; plates/icons still temporarily
 * reuse EXION assets.
 */

import { MEDICAL_SPA_NAMED_IMAGES } from "@/content/medicalSpaServiceImages";

const EXION_ICON = "/assets/treatments/exion/icons";
const EXION_ASSET = "/assets/treatments/exion";
const EMSCULPT_NEO_ASSET = "/assets/treatments/emsculpt-neo";
/** Bump when replacing EmSculpt Neo rasters so next/image + browser drop stale caches. */
const EMSCULPT_NEO_ASSETS_VERSION = "20260727-hero";

function emsculptNeoAsset(file: string) {
  return `${EMSCULPT_NEO_ASSET}/${file}?v=${EMSCULPT_NEO_ASSETS_VERSION}`;
}

export type EmsculptNeoIconItem = {
  iconSrc: string;
  title: string;
  body: string;
};

export type EmsculptNeoStat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type EmsculptNeoTreatmentCard = {
  eyebrow: string;
  title: string;
  tagline: string;
  body: string;
  bullets: readonly string[];
  imageSrc: string;
  imageAlt: string;
};

export const emsculptNeoHero = {
  title: "EMSCULPT NEO",
  titleEmphasis: "strength inside. sculpted outside.",
  titleEmphasisLines: ["strength inside.", "sculpted outside."],
  subhead: "Build muscle. Burn fat. Transform your body.",
  intro:
    "EMSCULPT NEO is a non-invasive body contouring technology that combines radiofrequency energy and high-intensity focused electromagnetic (HIFEM+) energy to build muscle and reduce fat — at the same time, in just 30 minutes.",
  closingLine: "Stronger muscles. Less fat. More confidence.",
  poweredByEyebrow: "Next-generation technology",
  poweredByIconSrc: `${EXION_ICON}/atom.svg`,
  synergyLine: "RF + HIFEM+ energy, working in synergy.",
  imageSrc: emsculptNeoAsset("emsculpt-neo-hero.webp"),
  imageAlt: "EmSculpt Neo treatment at ARC Wellness",
} as const;

export const emsculptNeoPillars: readonly EmsculptNeoIconItem[] = [
  {
    iconSrc: `${EXION_ICON}/magnet.svg`,
    title: "Build Muscle",
    body: "Strengthen and tone muscles with thousands of supramaximal contractions.",
  },
  {
    iconSrc: `${EXION_ICON}/sun.svg`,
    title: "Burn Fat",
    body: "Reduce stubborn fat in treated areas for a more sculpted appearance.",
  },
  {
    iconSrc: `${EXION_ICON}/lotus.svg`,
    title: "Contour",
    body: "Enhance your natural shape and achieve a more defined look.",
  },
  {
    iconSrc: `${EXION_ICON}/clock.svg`,
    title: "Save Time",
    body: "30 minutes. No downtime. Real results.",
  },
];

/** Temporary cream plate (EXION asset). */
export const emsculptNeoCreamPlate = {
  src: `${EXION_ASSET}/exion-pillars-background.webp`,
  alt: "",
} as const;

/** Bunny Stream library + video (unlisted embed; restrict domains in Bunny Security). */
const EMSCULPT_NEO_BUNNY_LIBRARY_ID = "710568";
const EMSCULPT_NEO_BUNNY_VIDEO_ID = "73b9a4ca-fd47-4159-8acf-a4662a50dc1d";
const EMSCULPT_NEO_BUNNY_EMBED_BASE = `https://player.mediadelivery.net/embed/${EMSCULPT_NEO_BUNNY_LIBRARY_ID}/${EMSCULPT_NEO_BUNNY_VIDEO_ID}`;

export const emsculptNeoMechanism = {
  titleLines: ["Real results", "beneath the", "surface."],
  body: "EMSCULPT NEO goes beyond surface-level changes — strengthening muscles and reducing fat for a leaner, stronger, more confident you.",
  stats: [
    {
      value: 25,
      prefix: "+",
      suffix: "%",
      label: "Average increase in muscle mass*",
    },
    {
      value: 30,
      prefix: "−",
      suffix: "%",
      label: "Average reduction in fat layer thickness*",
    },
    {
      value: 25,
      prefix: "+",
      suffix: "%",
      label: "Increase in abdominal muscle strength*",
    },
    {
      value: 24,
      prefix: "+",
      suffix: "%",
      label: "Improvement in overall body shape*",
    },
  ] as readonly EmsculptNeoStat[],
  /**
   * Stable Bunny embed (Player.js play/pause on scroll — do not swap src or the
   * iframe remounts and resets). `playerjs=true` enables the control bridge.
   */
  videoEmbedSrc: `${EMSCULPT_NEO_BUNNY_EMBED_BASE}?autoplay=false&loop=true&muted=true&preload=true&responsive=true&playerjs=true`,
  videoTitle: "EmSculpt Neo treatment at ARC Wellness",
} as const;

export const emsculptNeoTreatments = {
  title: "Three transformative",
  titleEmphasis: "treatments",
  intro: "One platform. Three ways to transform.",
  cards: [
    {
      eyebrow: "HIFEM+",
      title: "Build Muscle",
      tagline: "Tone. Strengthen. Sculpt.",
      body: "HIFEM+ energy triggers thousands of supramaximal contractions to build lean muscle where you want definition most.",
      bullets: [
        "Builds lean muscle",
        "Improves strength and performance",
        "Enhances core definition",
        "Non-invasive, no downtime",
      ],
      imageSrc: MEDICAL_SPA_NAMED_IMAGES.emsculptNeoAbdominalTreatmentMale,
      imageAlt: "EmSculpt Neo muscle-building treatment",
    },
    {
      eyebrow: "Radiofrequency",
      title: "Burn Fat",
      tagline: "Reduce. Refine. Rejuvenate.",
      body: "RF energy heats fat cells to reduce fat layer thickness and refine body contour — comfortably and effectively.",
      bullets: [
        "Targets stubborn fat",
        "Reduces fat layer thickness",
        "Improves body contour",
        "Comfortable and effective",
      ],
      imageSrc: MEDICAL_SPA_NAMED_IMAGES.emsculptNeoArmTreatmentLifestyle,
      imageAlt: "EmSculpt Neo fat-reduction treatment",
    },
    {
      eyebrow: "Combined",
      title: "Build + Burn",
      tagline: "Strength and sculpt. Together.",
      body: "The dual-action platform builds muscle and reduces fat simultaneously for maximum results in minimum time.",
      bullets: [
        "Builds muscle and reduces fat together",
        "Enhances tone and definition",
        "Transforms your body",
        "30-minute treatment",
      ],
      imageSrc: MEDICAL_SPA_NAMED_IMAGES.emsculptNeoConsoleCloseup,
      imageAlt: "EmSculpt Neo console at ARC Wellness",
    },
  ] as readonly EmsculptNeoTreatmentCard[],
} as const;

export const emsculptNeoDifferent = {
  title: "Why EMSCULPT NEO is",
  titleEmphasis: "different.",
  intro:
    "EMSCULPT NEO is the only non-invasive technology that combines RF and HIFEM+ energy in one platform to build muscle and reduce fat simultaneously — delivering results you can see and feel.",
  backgroundSrc: `${EXION_ASSET}/exion-different-background.webp`,
  backgroundAlt: "",
  cards: [
    {
      iconSrc: `${EXION_ICON}/atom.svg`,
      title: "Dual-Action Technology",
      body: "RF + HIFEM+ energy work together simultaneously.",
    },
    {
      iconSrc: `${EXION_ICON}/magnet.svg`,
      title: "Build Muscle",
      body: "Stimulates thousands of supramaximal contractions.",
    },
    {
      iconSrc: `${EXION_ICON}/sun.svg`,
      title: "Burn Fat",
      body: "Targets and reduces stubborn fat.",
    },
    {
      iconSrc: `${EXION_ICON}/clock.svg`,
      title: "Efficient & Effective",
      body: "Maximum results in 30 minutes with no downtime.",
    },
    {
      iconSrc: `${EXION_ICON}/lotus.svg`,
      title: "Safe & Comfortable",
      body: "Non-invasive with no disruption to daily life.",
    },
  ] as readonly EmsculptNeoIconItem[],
} as const;

export const emsculptNeoExperience = {
  title: "The EMSCULPT NEO",
  titleEmphasis: "experience",
  steps: [
    {
      iconSrc: `${EXION_ICON}/chat.svg`,
      title: "Consultation",
      body: "We listen to your goals and create a plan tailored to you.",
    },
    {
      iconSrc: `${EXION_ICON}/book.svg`,
      title: "Personalized Plan",
      body: "Your treatment plan is customized to target your unique needs.",
    },
    {
      iconSrc: `${EXION_ICON}/meditation.svg`,
      title: "Comfortable Treatment",
      body: "Relax during your 30-minute session — no downtime required.",
    },
    {
      iconSrc: `${EXION_ICON}/mind.svg`,
      title: "Visible Results",
      body: "Noticeable improvements in muscle tone, fat reduction, and body contour.",
    },
    {
      iconSrc: `${EXION_ICON}/calendar-check.svg`,
      title: "Maintain & Enhance",
      body: "Ongoing treatments help you maintain your results and continue to evolve.",
    },
  ] as readonly EmsculptNeoIconItem[],
} as const;

export const emsculptNeoClosing = {
  supportingLine:
    "Discover the power of EMSCULPT NEO at ARC Wellness — stronger inside, sculpted outside.",
} as const;
