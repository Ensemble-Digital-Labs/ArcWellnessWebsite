/**
 * ExoMind landing content — EXION section stack, ExoMind copy from client brief.
 * Hero under public/assets/treatments/exomind; plates/icons still temporarily
 * reuse EXION assets.
 */

const EXION_ICON = "/assets/treatments/exion/icons";
const EXION_ASSET = "/assets/treatments/exion";
const EXOMIND_ASSET = "/assets/treatments/exomind";
/** Bump when replacing ExoMind rasters so next/image + browser drop stale caches. */
const EXOMIND_ASSETS_VERSION = "20260730-target-card";

function exomindAsset(file: string) {
  return `${EXOMIND_ASSET}/${file}?v=${EXOMIND_ASSETS_VERSION}`;
}

export type ExoMindIconItem = {
  iconSrc: string;
  title: string;
  body: string;
};

export type ExoMindStat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type ExoMindTreatmentCard = {
  eyebrow: string;
  title: string;
  tagline: string;
  body: string;
  bullets: readonly string[];
  imageSrc: string;
  imageAlt: string;
};

export const exomindHero = {
  title: "EXOMIND",
  titleEmphasis: "Elevate your mind. Enhance your life.",
  titleEmphasisLines: ["Elevate your mind.", "Enhance your life."],
  subhead: "Focus. Clarity. Balance. All in 30 minutes.",
  intro:
    "EXOMIND is a non-invasive technology that uses transcranial magnetic stimulation (TMS) to improve cognitive performance, elevate mood, and reduce stress — naturally.",
  closingLine: "Better thinking. Better feeling. Better you.",
  poweredByEyebrow: "Next-generation TMS",
  poweredByIconSrc: `${EXION_ICON}/atom.svg`,
  synergyLine: "Safe. Non-invasive. Drug-free. Backed by science.",
  imageSrc: exomindAsset("exomind-hero.webp"),
  imageAlt: "ExoMind TMS treatment at ARC Wellness",
} as const;

export const exomindPillars: readonly ExoMindIconItem[] = [
  {
    iconSrc: `${EXION_ICON}/brain.svg`,
    title: "Sharper Focus",
    body: "Improve attention, memory, and mental clarity.",
  },
  {
    iconSrc: `${EXION_ICON}/lotus.svg`,
    title: "Stress Relief",
    body: "Reduce stress and anxiety with gentle neurostimulation.",
  },
  {
    iconSrc: `${EXION_ICON}/sun.svg`,
    title: "Elevated Mood",
    body: "Boost mood and emotional well-being.",
  },
  {
    iconSrc: `${EXION_ICON}/battery-energy.svg`,
    title: "More Energy",
    body: "Enhance mental energy and overall brain performance.",
  },
];

/** Temporary cream plate (EXION asset). */
export const exomindCreamPlate = {
  src: `${EXION_ASSET}/exion-pillars-background.webp`,
  alt: "",
} as const;

/** Temporary dark plate (EXION asset). */
export const exomindDarkPlate = {
  src: `${EXION_ASSET}/exion-different-background.webp`,
  alt: "",
} as const;

/** Bunny Stream library + video (unlisted embed; restrict domains in Bunny Security). */
const EXOMIND_BUNNY_LIBRARY_ID = "710568";
const EXOMIND_BUNNY_VIDEO_ID = "131b65ba-e119-4427-bd07-5a4454367c21";
const EXOMIND_BUNNY_EMBED_BASE = `https://player.mediadelivery.net/embed/${EXOMIND_BUNNY_LIBRARY_ID}/${EXOMIND_BUNNY_VIDEO_ID}`;

export const exomindMechanism = {
  titleLines: ["A better brain.", "Real results."],
  body: "Clinical studies show EXOMIND can improve cognitive function, mood, and quality of life — helping you think clearer, feel calmer, and perform at your best.",
  stats: [
    {
      value: 25,
      prefix: "+",
      suffix: "%",
      label: "Improvement in cognitive function*",
    },
    {
      value: 30,
      prefix: "−",
      suffix: "%",
      label: "Reduction in stress levels*",
    },
    {
      value: 24,
      prefix: "+",
      suffix: "%",
      label: "Improvement in focus & attention*",
    },
    {
      value: 19,
      prefix: "+",
      suffix: "%",
      label: "Better mood & emotional well-being*",
    },
  ] as readonly ExoMindStat[],
  /**
   * Stable Bunny embed (Player.js play/pause on scroll — do not swap src or the
   * iframe remounts and resets). `playerjs=true` enables the control bridge.
   */
  videoEmbedSrc: `${EXOMIND_BUNNY_EMBED_BASE}?autoplay=false&loop=true&muted=true&preload=true&responsive=true&playerjs=true`,
  videoTitle: "ExoMind treatment at ARC Wellness",
} as const;

/** Maps to EXION treatment cards — How EXOMIND Works. */
export const exomindTreatments = {
  title: "How EXOMIND",
  titleEmphasis: "works?",
  intro:
    "EXOMIND uses advanced transcranial magnetic stimulation (TMS) to safely activate key areas of the brain. These magnetic pulses help improve communication between brain cells, supporting better focus, mood, memory and mental performance—without medication or downtime.",
  cards: [
    {
      eyebrow: "Step one",
      title: "Targeted Stimulation",
      tagline: "Reach. Activate. Engage.",
      body: "Gentle magnetic pulses reach the brain areas responsible for focus, mood, and cognitive performance.",
      bullets: [
        "Non-invasive TMS delivery",
        "Targets key cognitive regions",
        "Comfortable, controlled sessions",
        "No medication required",
      ],
      imageSrc: exomindAsset("exomind-card-targeted-stimulation.webp"),
      imageAlt: "ExoMind Targeted Stimulation — TMS delivery",
    },
    {
      eyebrow: "Step two",
      title: "Neural Communication",
      tagline: "Connect. Strengthen. Sync.",
      body: "Stimulation strengthens communication between brain cells so pathways work more efficiently together.",
      bullets: [
        "Supports healthier neural pathways",
        "Encourages adaptive connectivity",
        "Builds on your brain’s plasticity",
        "Science-backed mechanism",
      ],
      imageSrc: exomindAsset("exomind-card-neural-communication.webp"),
      imageAlt: "ExoMind Neural Communication — brain pathway stimulation",
    },
    {
      eyebrow: "Step three",
      title: "Optimized Performance",
      tagline: "Sharper. Calmer. Clearer.",
      body: "As pathways strengthen, many people notice sharper thinking, steadier mood, and lower stress.",
      bullets: [
        "Supports focus and clarity",
        "Helps ease mental fatigue",
        "Encourages emotional balance",
        "Complements daily performance",
      ],
      imageSrc: exomindAsset("exomind-card-optimized-performance.webp"),
      imageAlt: "ExoMind Optimized Performance — sharper focus and clarity",
    },
    {
      eyebrow: "Step four",
      title: "Lasting Benefits",
      tagline: "Consistent. Cumulative. Enduring.",
      body: "Regular sessions help reinforce improvements so clarity and calm can become your new baseline.",
      bullets: [
        "Builds with a guided plan",
        "Supports lasting mental resilience",
        "Fits into a 30-minute visit",
        "Paired with physician oversight",
      ],
      imageSrc: exomindAsset("exomind-card-lasting-benefits.webp"),
      imageAlt: "ExoMind Lasting Benefits — cumulative cognitive wellness",
    },
  ] as readonly ExoMindTreatmentCard[],
} as const;

/** Maps to EXION “Why different” — Who Can Benefit. */
export const exomindDifferent = {
  title: "Who can",
  titleEmphasis: "benefit?",
  intro:
    "EXOMIND is ideal for anyone looking to optimize mental performance and emotional well-being — without invasive procedures or medication.",
  backgroundSrc: `${EXION_ASSET}/exion-different-background.webp`,
  backgroundAlt: "",
  cards: [
    {
      iconSrc: `${EXION_ICON}/mind.svg`,
      title: "Professionals & High Performers",
      body: "Sharpen focus, productivity, and mental clarity when demand is high.",
    },
    {
      iconSrc: `${EXION_ICON}/book.svg`,
      title: "Students",
      body: "Support memory, concentration, and learning when every hour counts.",
    },
    {
      iconSrc: `${EXION_ICON}/lotus.svg`,
      title: "Stress or Anxiety",
      body: "Find more balance, calm, and resilience when life feels overwhelming.",
    },
    {
      iconSrc: `${EXION_ICON}/sun.svg`,
      title: "Mood Support",
      body: "Support mood and emotional well-being with drug-free care.",
    },
    {
      iconSrc: `${EXION_ICON}/brain-front.svg`,
      title: "Mental Optimization",
      body: "Stay sharp, focused, and energized — whatever your goals.",
    },
  ] as readonly ExoMindIconItem[],
} as const;

export const exomindExperience = {
  title: "The EXOMIND",
  titleEmphasis: "experience",
  steps: [
    {
      iconSrc: `${EXION_ICON}/chat.svg`,
      title: "Consultation",
      body: "Discuss your goals and create a personalized plan.",
    },
    {
      iconSrc: `${EXION_ICON}/meditation.svg`,
      title: "Your Treatment",
      body: "Relax in a comfortable suite while we prepare your session.",
    },
    {
      iconSrc: `${EXION_ICON}/clock.svg`,
      title: "30 Minutes",
      body: "A painless, non-invasive, and relaxing session.",
    },
    {
      iconSrc: `${EXION_ICON}/mind.svg`,
      title: "Feel the Difference",
      body: "Leave feeling refreshed, clearer, and recharged.",
    },
    {
      iconSrc: `${EXION_ICON}/calendar-check.svg`,
      title: "Lasting Results",
      body: "Consistent sessions help lock in lasting benefits.",
    },
  ] as readonly ExoMindIconItem[],
} as const;

export const exomindClosing = {
  supportingLine:
    "Unlock your brain’s potential with EXOMIND at ARC Wellness.",
} as const;
