/**
 * Arc 360: membership-based concierge wellness page served at `/treatments`.
 *
 * Uses the EXION service-page visual system (cream/dark plates + wave seams) but
 * its own section shape — the decades ladder and "what are we protecting" acts
 * do not map onto `ServicePageContent`, so this page has a dedicated type.
 *
 * Temporary clinic-interior hero + EXION plates/icons until dedicated Arc 360
 * assets ship.
 */
import {
  SERVICE_EXION_ICON,
  serviceSharedCreamPlate,
  serviceSharedDarkPlate,
} from "@/content/pages/serviceTemplate";

const ICON = SERVICE_EXION_ICON;
const ARC_360_ASSET = "/assets/treatments/arc-360";
/** Bump when replacing Arc 360 rasters so next/image + browser drop stale caches. */
const ARC_360_ASSETS_VERSION = "20260803-connected";

function arc360Asset(file: string) {
  return `${ARC_360_ASSET}/${file}?v=${ARC_360_ASSETS_VERSION}`;
}

export type Arc360IconItem = {
  iconSrc: string;
  title: string;
  body: string;
};

export type Arc360DecadeStep = {
  /** Age band, e.g. "30s". */
  age: string;
  title: string;
  bullets: readonly string[];
  closingLine: string;
};

export type Arc360ProtectItem = {
  iconSrc: string;
  title: string;
  facets: readonly string[];
};

export type Arc360BlueprintCard = {
  title: string;
  tagline: string;
  body: string;
};

export type Arc360Content = {
  seo: { title: string; description: string };
  hero: {
    title: string;
    titleEmphasisLines: readonly string[];
    subhead: string;
    intro: string;
    closingLine: string;
    jumpLabel: string;
    jumpHref: string;
    imageSrc: string;
    imageAlt: string;
    imageObjectClass?: string;
  };
  connected: {
    titleLines: readonly string[];
    body: string;
    bullets: readonly string[];
    pullQuote: readonly string[];
    imageSrc: string;
    imageAlt: string;
  };
  pillars: readonly Arc360IconItem[];
  blueprint: {
    title: string;
    titleEmphasis: string;
    intro: string;
    body: string;
    closingLine: string;
    cards: readonly Arc360BlueprintCard[];
  };
  decades: {
    title: string;
    titleEmphasis: string;
    intro: string;
    backgroundSrc: string;
    steps: readonly Arc360DecadeStep[];
  };
  protecting: {
    title: string;
    titleEmphasis: string;
    items: readonly Arc360ProtectItem[];
  };
  relationship: {
    title: string;
    titleEmphasis: string;
    intro: string;
    body: string;
    triad: readonly Arc360IconItem[];
    closingLines: readonly string[];
  };
  creamPlate: { src: string; alt: string };
  closing: { supportingLine: string };
};

export const arc360Content: Arc360Content = {
  seo: {
    title: "Arc 360 | Membership-Based Concierge Wellness | Arc Wellness",
    description:
      "Functional wellness, traditional medicine, and longevity-focused care brought together. Arc 360 pairs comprehensive testing with an ongoing physician relationship and a personalized Arc Blueprint.",
  },
  hero: {
    title: "Arc 360",
    titleEmphasisLines: ["A 360° view of your health."],
    subhead: "Functional. Traditional. Longevity-focused.",
    intro:
      "Arc 360 is designed for people who want more from their healthcare: more time, more understanding, more personalized guidance, and an ongoing relationship with a physician who knows your health beyond a single visit. We look at where you are today, what may need attention now, and how we can support the health, strength, clarity, and independence you want to preserve for the decades ahead.",
    closingLine: "Before we decide what to do, we take the time to understand you.",
    jumpLabel: "Browse every pathway",
    jumpHref: "#treatments-index",
    imageSrc: arc360Asset("arc-360-hero.webp"),
    imageAlt:
      "Soft cream and gold marbled artwork with teal veining, framing an open centre",
    // Abstract plate, not a photo: keep it centred so the open middle stays behind the copy.
    imageObjectClass: "object-cover object-center",
  },
  connected: {
    titleLines: ["Your health", "is connected."],
    body: "Hormones influence metabolism. The gut communicates with the brain. Muscle affects metabolic health. Sleep influences hormones. Nutrition touches nearly everything. Your health is not a collection of unrelated symptoms or laboratory values. It is one interconnected story. Arc 360 brings those pieces together through comprehensive testing, thoughtful physician evaluation, and meaningful conversation.",
    bullets: [
      "Hormones influence metabolism",
      "The gut communicates with the brain",
      "Muscle affects metabolic health",
      "Sleep influences hormones",
      "Nutrition touches nearly everything",
    ],
    pullQuote: [
      "Sometimes the right question is: why is this happening?",
      "And sometimes the right answer is: let's treat it.",
      "At Arc Wellness, we believe there is room for both.",
    ],
    imageSrc: arc360Asset("arc-360-connected.webp"),
    imageAlt: "Whole-body health systems connected through Arc 360 care",
  },
  pillars: [
    {
      iconSrc: `${ICON}/book.svg`,
      title: "Functional",
      body: "Look deeper, recognize patterns, and ask why something is happening.",
    },
    {
      iconSrc: `${ICON}/checklist.svg`,
      title: "Traditional",
      body: "Proven diagnostic and treatment tools when medical care is needed.",
    },
    {
      iconSrc: `${ICON}/clock.svg`,
      title: "Longevity",
      body: "What can we do today to protect the way you want to live tomorrow?",
    },
    {
      iconSrc: `${ICON}/chat.svg`,
      title: "Relationship",
      body: "An ongoing physician partnership, not a single appointment.",
    },
  ],
  blueprint: {
    title: "Your Arc",
    titleEmphasis: "Blueprint",
    intro: "Discover. Understand. Build.",
    body: "Your journey begins with discovery. We listen to your story, explore your concerns and goals, and use comprehensive laboratory testing to look deeper into your health. Then we connect the findings. Your physician helps you understand not simply what is high or low, but what it means, how the pieces relate, and what we can do about it. From there, we create your personalized Arc Blueprint.",
    closingLine: "Not one philosophy. Not one protocol. The right tools for you.",
    cards: [
      {
        title: "Nutrition & Lifestyle",
        tagline: "The daily foundation.",
        body: "How you eat, move, sleep, and recover shapes nearly every marker we measure.",
      },
      {
        title: "Hormone & Metabolic",
        tagline: "Restore the signal.",
        body: "Optimization guided by your labs, your symptoms, and how you actually feel.",
      },
      {
        title: "Supplements & Nutrients",
        tagline: "Targeted support.",
        body: "Physician-selected nutrient support based on what your testing shows you need.",
      },
      {
        title: "Preventive Strategies",
        tagline: "Ahead of the problem.",
        body: "Acting on early signals so today's shift does not become tomorrow's limitation.",
      },
      {
        title: "Advanced Therapies",
        tagline: "When more is warranted.",
        body: "Peptides, IV nutrients, and device-based therapies layered in where they help.",
      },
      {
        title: "Traditional Medicine",
        tagline: "When appropriate.",
        body: "Established diagnostics and treatment, used without hesitation when they are the right tool.",
      },
    ],
  },
  decades: {
    title: "Supporting you through",
    titleEmphasis: "the decades",
    intro:
      "Your health changes. Your needs change. Your care should evolve with you. Arc 360 is designed to support you through each chapter of life, treating what needs attention today while thoughtfully guiding your health for what comes next.",
    backgroundSrc: serviceSharedDarkPlate.src,
    steps: [
      {
        age: "30s",
        title: "Build the Foundation",
        bullets: [
          "Understand your baseline",
          "Strengthen metabolic health",
          "Build and protect muscle",
          "Create healthy patterns early",
        ],
        closingLine: "Build today for the decades ahead.",
      },
      {
        age: "40s",
        title: "Understand the Change",
        bullets: [
          "Recognize hormonal and metabolic shifts",
          "Protect cardiovascular health",
          "Prioritize strength, sleep, and cognition",
          "Respond to changes before they become limitations",
        ],
        closingLine: "Understand what is changing, and why.",
      },
      {
        age: "50s",
        title: "Protect What Matters",
        bullets: [
          "Preserve muscle and bone",
          "Optimize hormonal and metabolic health",
          "Protect brain and cardiovascular function",
          "Strengthen the foundation for healthy aging",
        ],
        closingLine: "Protect today what you'll depend on tomorrow.",
      },
      {
        age: "60s",
        title: "Preserve Strength & Function",
        bullets: [
          "Maintain strength and mobility",
          "Support cognitive health",
          "Protect metabolic and cardiovascular resilience",
          "Prioritize balance, function, and independence",
        ],
        closingLine: "Stay strong. Stay capable. Stay engaged.",
      },
      {
        age: "70s & beyond",
        title: "Live with Independence",
        bullets: [
          "Preserve mobility and cognition",
          "Maintain strength and confidence",
          "Support independence in everyday life",
          "Continue participating fully in the life you've built",
        ],
        closingLine:
          "The goal was never simply to get here. It's to be well enough to enjoy being here.",
      },
    ],
  },
  protecting: {
    title: "What are we",
    titleEmphasis: "protecting?",
    items: [
      {
        iconSrc: `${ICON}/bicep.svg?v=zoom`,
        title: "Strength",
        facets: ["Muscle", "Bone", "Mobility"],
      },
      {
        iconSrc: `${ICON}/battery-energy.svg`,
        title: "Metabolic Health",
        facets: ["Energy", "Glucose", "Body composition"],
      },
      {
        iconSrc: `${ICON}/cell.svg`,
        title: "Heart Health",
        facets: ["Cardiovascular", "Vascular", "Prevention"],
      },
      {
        iconSrc: `${ICON}/brain.svg`,
        title: "Brain Health",
        facets: ["Cognition", "Clarity", "Connection"],
      },
      {
        iconSrc: `${ICON}/person-sparkle.svg`,
        title: "Independence",
        facets: ["Function", "Capability", "Quality of life"],
      },
    ],
  },
  relationship: {
    title: "More than",
    titleEmphasis: "a visit",
    intro: "An ongoing relationship.",
    body: "Health is not static, and your care should not be either. Arc 360 is a membership-based concierge wellness model built around continuity. We follow your progress, revisit meaningful markers, adjust your Blueprint, and pay attention as your body and priorities change. Over time, your physician and wellness team come to know your history, your patterns, your goals, and what matters most to you. You are not expected to navigate every new chapter alone.",
    triad: [
      {
        iconSrc: `${ICON}/lotus.svg`,
        title: "Wellness",
        body: "Functional wellness helps us look deeper, recognize patterns, and ask why.",
      },
      {
        iconSrc: `${ICON}/consult-desk.svg`,
        title: "Medicine",
        body: "Traditional medicine gives us proven diagnostic and treatment tools when medical care is needed.",
      },
      {
        iconSrc: `${ICON}/clock.svg`,
        title: "Longevity",
        body: "Longevity-focused care asks what we can do today to protect the way you want to live tomorrow.",
      },
    ],
    closingLines: [
      "You do not need to know which test you need.",
      "You do not need to know which treatment to choose.",
      "You do not even need to know exactly where to begin.",
      "That's what Arc 360 is designed to discover.",
    ],
  },
  creamPlate: serviceSharedCreamPlate,
  closing: {
    supportingLine:
      "Understanding where you are. Recognizing what deserves attention. Knowing what you can influence. And we'll start there, together.",
  },
};

export const arc360Hero = arc360Content.hero;
