import {
  Armchair,
  BatteryLow,
  CloudFog,
  Flower2,
  Gem,
  Heart,
  HeartHandshake,
  HeartPulse,
  Leaf,
  Microscope,
  Moon,
  Shuffle,
  ShieldCheck,
  Sprout,
  Sun,
  Target,
  TreePine,
  Waves,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { MEDICAL_SPA_NAMED_IMAGES } from "@/content/medicalSpaServiceImages";

/**
 * Bespoke ExoMind landing content — translated from the client's ExoMind infographic
 * into structured, responsive, on-brand sections (see `ExoMindTreatmentContent`).
 */

export type ExoMindIconItem = { icon: LucideIcon; label: string };

export const exomindHero = {
  eyebrow: "Neuromodulation",
  title: "ExoMind",
  subhead: "Supporting your brain. Through every phase.",
  intro:
    "ExoMind uses safe, non-invasive neurostimulation to support brain activity and encourage neuroplasticity — the brain's ability to adapt, reorganize, and form new, healthier connections.",
  badge: {
    lines: ["Safe.", "Non-invasive.", "Transformative."],
    note: "Work with your brain — not against it.",
  },
  imageSrc: MEDICAL_SPA_NAMED_IMAGES.exomindBtlConsoleTreatmentBed,
  imageAlt: "ExoMind BTL neurostimulation console and treatment bed at ARC Wellness",
} as const;

export const exomindBenefitPills: readonly ExoMindIconItem[] = [
  { icon: Waves, label: "Calm" },
  { icon: Target, label: "Focus" },
  { icon: Sun, label: "Clarity" },
  { icon: Flower2, label: "Resilience" },
  { icon: Gem, label: "Confidence" },
];

export const exomindWhatIs = {
  title: "What is",
  titleEmphasis: "ExoMind?",
  body: "ExoMind is an advanced technology that uses targeted electromagnetic stimulation to activate key areas of the brain involved in focus, mood, memory, and overall cognitive performance.",
  features: [
    { icon: ShieldCheck, title: "Drug-Free", body: "No medication. No downtime." },
    { icon: Microscope, title: "Science-Backed", body: "Clinically studied technology." },
    { icon: Armchair, title: "Comfortable", body: "Relax, unwind, and restore." },
    { icon: HeartHandshake, title: "Real Support", body: "For how you think, feel, and live." },
  ],
} as const;

export type ExoMindDecadeTier = {
  icon: LucideIcon;
  range: string;
  theme: string;
  body: string;
  supports: readonly string[];
  note: string;
};

export const exomindDecades = {
  title: "Supporting you through",
  titleEmphasis: "the decades",
  intro: "Supporting brain health at every age. For every season of life.",
  tiers: [
    {
      icon: Sprout,
      range: "20s & 30s",
      theme: "Foundation & Focus",
      body: "Build a strong foundation for your future by supporting focus, balance, and emotional well-being.",
      supports: [
        "Focus, motivation & mental clarity",
        "Emotional balance & stress resilience",
        "Better sleep & nervous system regulation",
      ],
      note: "Helping you stay grounded, focused, and future-ready.",
    },
    {
      icon: Sun,
      range: "40s",
      theme: "Clarity & Adaptability",
      body: "Life brings change. Your brain can too. Support mental clarity, emotional balance, and overall adaptability.",
      supports: [
        "Mental clarity & focus",
        "Emotional steadiness & reduced stress",
        "Cognitive performance & memory",
        "Restful sleep & nervous system balance",
      ],
      note: "Supporting clarity, balance, and brain health through change.",
    },
    {
      icon: TreePine,
      range: "50s & Beyond",
      theme: "Resilience & Vitality",
      body: "Stay sharp, independent, and resilient as you continue to pursue what matters most in your life.",
      supports: [
        "Cognitive function & memory",
        "Motivation & mental drive",
        "Emotional resilience & calm",
        "Confidence & connection",
      ],
      note: "Helping you stay sharp, resilient, and connected — for life.",
    },
  ] as readonly ExoMindDecadeTier[],
} as const;

export const exomindNeuroplasticity = {
  title: "The power of",
  titleEmphasis: "neuroplasticity",
  lede: "Your brain is not fixed. It is adaptable.",
  body: "Neuroplasticity is your brain's ability to adapt, reorganize, and strengthen connections. Hormonal changes, stress, inflammation, and poor sleep can impact these pathways.",
  center: {
    words: ["Hope.", "Possibility.", "Adaptability."],
    body: "Your brain has the ability to heal, adapt, and thrive.",
  },
  helpsTitle: "ExoMind helps support:",
  helps: [
    { icon: Waves, label: "Overwhelm" },
    { icon: HeartPulse, label: "Anxiety" },
    { icon: CloudFog, label: "Brain Fog" },
    { icon: BatteryLow, label: "Mental Fatigue" },
    { icon: Moon, label: "Poor Sleep" },
  ],
  networkTitle: "Supports healthier brain network activity & neuroplasticity:",
  network: [
    { icon: Wind, label: "Calm Regulation" },
    { icon: Target, label: "Focus Pathways" },
    { icon: Leaf, label: "Healthy Stress Responses" },
    { icon: Shuffle, label: "Cognitive Flexibility" },
    { icon: Heart, label: "Emotional Resilience" },
  ],
} as const;

export const exomindClosing = {
  title: "You deserve to feel like",
  titleEmphasis: "you again.",
  words: "Calm. Clear. Confident. Connected.",
  support: "We're here to support you — through every phase of life.",
  ctaLabel: "Book a consultation",
} as const;

export const exomindDisclaimer =
  "ExoMind is a wellness technology, not intended to treat, cure, or diagnose any condition. Ask our team how ExoMind can support your unique needs.";
