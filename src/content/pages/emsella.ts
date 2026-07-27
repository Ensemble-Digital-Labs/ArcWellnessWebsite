/**
 * EmSella landing content — EXION section stack, copy from client brief.
 * Icons temporarily reuse EXION SVGs; swap for EmSella-specific emblems later.
 */

import { MEDICAL_SPA_NAMED_IMAGES } from "@/content/medicalSpaServiceImages";

const EXION_ICON = "/assets/treatments/exion/icons";
const EXION_ASSET = "/assets/treatments/exion";
const EMSELLA_ASSET = "/assets/treatments/emsella";
/** Bump when replacing EmSella rasters so next/image + browser drop stale caches. */
const EMSELLA_ASSETS_VERSION = "20260727-hero";

function emsellaAsset(file: string) {
  return `${EMSELLA_ASSET}/${file}?v=${EMSELLA_ASSETS_VERSION}`;
}

export type EmsellaIconItem = {
  iconSrc: string;
  title: string;
  body: string;
};

export type EmsellaStat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type EmsellaTreatmentCard = {
  eyebrow: string;
  title: string;
  tagline: string;
  body: string;
  bullets: readonly string[];
  imageSrc: string;
  imageAlt: string;
};

export const emsellaHero = {
  title: "EMSELLA",
  titleEmphasis: "Stronger where it matters most.",
  titleEmphasisLines: ["Stronger where it", "matters most."],
  subhead: "Pelvic strength. Core support. Confidence restored.",
  intro:
    "EMSELLA uses high-intensity focused electromagnetic (HIFEM) technology to strengthen pelvic floor muscles in about 28 minutes — fully clothed, non-invasive, and with no downtime.",
  closingLine: "28 minutes once a week. Stronger today. Stronger for tomorrow.",
  poweredByEyebrow: "Powered by HIFEM®",
  poweredByIconSrc: `${EXION_ICON}/atom.svg`,
  synergyLine: "Non-invasive. No downtime. Real strength from within.",
  imageSrc: emsellaAsset("emsella-hero.webp"),
  imageAlt: "EmSella treatment chair and console at ARC Wellness",
} as const;

/** Temporary EXION icons — replace with EmSella SVGs later. */
export const emsellaPillars: readonly EmsellaIconItem[] = [
  {
    iconSrc: `${EXION_ICON}/magnet.svg`,
    title: "Core Support",
    body: "Strengthens the pelvic floor muscles that support your core from within.",
  },
  {
    iconSrc: `${EXION_ICON}/lotus.svg`,
    title: "Intimacy & Confidence",
    body: "Supports intimacy, sensation, and confidence at every stage of life.",
  },
  {
    iconSrc: `${EXION_ICON}/mind.svg`,
    title: "Core & Posture",
    body: "Helps stabilize the core for better posture and everyday movement.",
  },
  {
    iconSrc: `${EXION_ICON}/battery-energy.svg`,
    title: "After Life’s Changes",
    body: "Restores strength after pregnancy, prostate care, or natural aging.",
  },
];

export const emsellaCreamPlate = {
  src: `${EXION_ASSET}/exion-pillars-background.webp`,
  alt: "",
} as const;

/** Bunny Stream library + video (unlisted embed; restrict domains in Bunny Security). */
const EMSELLA_BUNNY_LIBRARY_ID = "710568";
const EMSELLA_BUNNY_VIDEO_ID = "73b9a4ca-fd47-4159-8acf-a4662a50dc1d";
const EMSELLA_BUNNY_EMBED_BASE = `https://player.mediadelivery.net/embed/${EMSELLA_BUNNY_LIBRARY_ID}/${EMSELLA_BUNNY_VIDEO_ID}`;

export const emsellaMechanism = {
  titleLines: ["The power of", "HIFEM®"],
  body: "High-intensity focused electromagnetic energy triggers thousands of deep pelvic floor contractions in a single session — far beyond what most people can achieve with Kegels alone.",
  stats: [
    {
      value: 28,
      prefix: "",
      suffix: " min",
      label: "Per comfortable, fully clothed session*",
    },
    {
      value: 11000,
      prefix: "",
      suffix: "+",
      label: "Supramaximal contractions per session*",
    },
    {
      value: 6,
      prefix: "",
      suffix: "",
      label: "Typical sessions in a full treatment plan*",
    },
    {
      value: 0,
      prefix: "",
      suffix: "",
      label: "Downtime — walk in, walk out*",
    },
  ] as readonly EmsellaStat[],
  /**
   * Stable Bunny embed (Player.js play/pause on scroll — do not swap src or the
   * iframe remounts and resets). `playerjs=true` enables the control bridge.
   */
  videoEmbedSrc: `${EMSELLA_BUNNY_EMBED_BASE}?autoplay=false&loop=true&muted=true&preload=true&responsive=true&playerjs=true`,
  videoTitle: "EmSella treatment at ARC Wellness",
} as const;

export const emsellaTreatments = {
  title: "Strength that supports",
  titleEmphasis: "every day",
  intro: "One chair. Deep contractions. Lasting foundation.",
  cards: [
    {
      eyebrow: "Technology",
      title: "The Power of HIFEM®",
      tagline: "Deep. Precise. Effective.",
      body: "HIFEM energy engages the entire pelvic floor with thousands of perfect contractions — the kind most people can’t reliably recreate on their own.",
      bullets: [
        "Targets deep pelvic floor muscles",
        "Equivalent to thousands of Kegels",
        "Comfortable, seated treatment",
        "FDA-cleared technology",
      ],
      imageSrc: MEDICAL_SPA_NAMED_IMAGES.emsellaBtlChairRoom,
      imageAlt: "EmSella BTL chair in treatment room",
    },
    {
      eyebrow: "Session",
      title: "28 Minutes That Matter",
      tagline: "Sit. Strengthen. Go.",
      body: "Each visit fits easily into your week — remain fully clothed, relax in the chair, and return to your day with no recovery time.",
      bullets: [
        "About 28 minutes per session",
        "Fully clothed throughout",
        "No surgery or downtime",
        "Easy to schedule and sustain",
      ],
      imageSrc: MEDICAL_SPA_NAMED_IMAGES.emsellaChairPatientLifestyle,
      imageAlt: "EmSella lifestyle treatment session",
    },
    {
      eyebrow: "Outcome",
      title: "Inside-Out Strength",
      tagline: "Support. Stability. Confidence.",
      body: "Stronger pelvic floor support can mean fewer leaks, steadier core control, and more confidence in movement and intimacy.",
      bullets: [
        "Supports bladder control",
        "Improves core stability",
        "Enhances confidence day to day",
        "Helps through life’s changes",
      ],
      imageSrc: MEDICAL_SPA_NAMED_IMAGES.emsellaBtlChairRoom,
      imageAlt: "EmSella care environment at ARC Wellness",
    },
  ] as readonly EmsellaTreatmentCard[],
} as const;

export const emsellaDifferent = {
  title: "Who it’s",
  titleEmphasis: "for",
  intro:
    "EMSELLA is for anyone who wants to feel strong, confident, and in control of their body — at every stage. Strength from the inside out.",
  backgroundSrc: `${EXION_ASSET}/exion-different-background.webp`,
  backgroundAlt: "",
  cards: [
    {
      iconSrc: `${EXION_ICON}/lotus.svg`,
      title: "Bladder Control",
      body: "For leaks, urgency, or frequency that interrupt daily life.",
    },
    {
      iconSrc: `${EXION_ICON}/sun.svg`,
      title: "Postpartum Support",
      body: "Restore pelvic strength after pregnancy and delivery.",
    },
    {
      iconSrc: `${EXION_ICON}/mind.svg`,
      title: "Intimacy & Wellness",
      body: "Support sexual wellness, sensation, and confidence.",
    },
    {
      iconSrc: `${EXION_ICON}/magnet.svg`,
      title: "Core Stability",
      body: "Strengthen the foundation that supports posture and movement.",
    },
    {
      iconSrc: `${EXION_ICON}/battery-energy.svg`,
      title: "Life’s Changes",
      body: "Rebuild after aging, prostate care, or hormonal shifts.",
    },
  ] as readonly EmsellaIconItem[],
} as const;

export const emsellaExperience = {
  title: "The EMSELLA",
  titleEmphasis: "experience",
  steps: [
    {
      iconSrc: `${EXION_ICON}/chat.svg`,
      title: "Consultation",
      body: "We listen to your goals and review what support you need.",
    },
    {
      iconSrc: `${EXION_ICON}/book.svg`,
      title: "Your Plan",
      body: "A personalized series tailored to your pelvic health goals.",
    },
    {
      iconSrc: `${EXION_ICON}/meditation.svg`,
      title: "Your Session",
      body: "Sit comfortably, fully clothed, for about 28 minutes.",
    },
    {
      iconSrc: `${EXION_ICON}/mind.svg`,
      title: "Feel the Difference",
      body: "Many notice steadier control and confidence as strength builds.",
    },
    {
      iconSrc: `${EXION_ICON}/calendar-check.svg`,
      title: "Maintain Strength",
      body: "Ongoing sessions help protect the results that matter most.",
    },
  ] as readonly EmsellaIconItem[],
} as const;

export const emsellaClosing = {
  supportingLine:
    "Stronger today. Stronger for tomorrow — discover EMSELLA at ARC Wellness.",
} as const;
