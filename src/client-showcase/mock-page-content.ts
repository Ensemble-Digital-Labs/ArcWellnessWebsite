import type { LucideIcon } from "lucide-react";
import { Calendar, Headphones, HeartPulse, Shield, Sparkles } from "lucide-react";
import { EDITORIAL_SPA_IMAGES } from "@/content/editorialSpaImages";
import { PATIENT_EXPERIENCE_IMAGES } from "@/content/patientExperienceImages";
import { images } from "@/content/site";

export type WholeBodyCardData = {
  title: string;
  bullets: readonly string[];
  summary: string;
  imageSrc: string;
  Icon: LucideIcon;
  highlighted?: boolean;
};

export const wholeBodyCards: readonly WholeBodyCardData[] = [
  {
    title: "Rejuvenate Your Appearance",
    bullets: [
      "Injectables & skin-quality treatments",
      "Body contouring & tightening",
      "Personalized aesthetic roadmaps",
    ],
    summary: "Natural-looking refinement with physician-led judgment.",
    imageSrc: EDITORIAL_SPA_IMAGES[0],
    Icon: Sparkles,
  },
  {
    title: "Restore Your Vitality",
    bullets: [
      "Hormone & metabolic insight",
      "Energy, sleep, and stress patterns",
      "IV, peptide, and integrative options when appropriate",
    ],
    summary: "Whole-person data—not isolated symptoms.",
    imageSrc: EDITORIAL_SPA_IMAGES[1],
    Icon: HeartPulse,
  },
  {
    title: "Strengthen Your Foundation",
    bullets: [
      "Labs and baselines that actually explain the story",
      "Lifestyle coaching you can sustain",
      "Clear sequencing between aesthetics and wellness",
    ],
    summary: "The plan stays coherent as your life changes.",
    imageSrc: EDITORIAL_SPA_IMAGES[2],
    Icon: Shield,
    highlighted: true,
  },
  {
    title: "Refine Your Rhythm",
    bullets: [
      "Monthly touchpoints and accountability",
      "Small adjustments instead of dramatic swings",
      "Honest pacing when less is more",
    ],
    summary: "Partnership that respects real calendars.",
    imageSrc: EDITORIAL_SPA_IMAGES[3],
    Icon: Calendar,
  },
  {
    title: "Experience Elevated Care",
    bullets: [
      "A calm, private environment",
      "Transparent options and pricing context",
      "Follow-up that doesn’t disappear after checkout",
    ],
    summary: "Details matter—from arrival to follow-through.",
    imageSrc: PATIENT_EXPERIENCE_IMAGES[0],
    Icon: Headphones,
  },
] as const;

export const processTimelineSteps = [
  {
    step: 1,
    title: "Consultation",
    description: "We listen first—goals, history, and the pace that fits your life.",
    Icon: Calendar,
  },
  {
    step: 2,
    title: "Treatment",
    description: "Evidence-informed options with clear expectations and recovery context.",
    Icon: HeartPulse,
  },
  {
    step: 3,
    title: "Monitoring",
    description: "Objective markers and check-ins so progress stays visible.",
    Icon: Shield,
  },
  {
    step: 4,
    title: "Adjustment",
    description: "Fine-tuning as seasons, stress, and priorities shift.",
    Icon: Sparkles,
  },
  {
    step: 5,
    title: "Ongoing Support",
    description: "Continuity—not a one-off visit. We stay in the story with you.",
    Icon: Headphones,
  },
] as const;

export const heroCopy = {
  headline: "Where Aesthetics, Wellness, and Longevity Converge.",
  subhead:
    "ARC Wellness pairs functional medicine, advanced aesthetics, and lifestyle coaching into one intentional plan—written for a single patient: you.",
} as const;

/** Editorial hero (Arcwell-style): grid overlay, corner mastheads, quote, pill CTA + studio line. */
export const editorialHeroCopy = {
  topLeftLine1: "N° 001 / THE HOMEPAGE",
  topLeftLine2: "LONGEVITY BY DESIGN",
  topRightVol: "VOL. VII SPRING '26",
  quote: "To age is a privilege. To age well, a practice.",
  headlineLead: "A quieter way to age ",
  headlineItalic: "beautifully",
  headlineTrail: ", on purpose.",
  body: "ARC Wellness is a clinical sanctuary in the Presidio — pairing functional medicine, advanced aesthetics, and lifestyle coaching into a single, decade-by-decade plan written for one patient: you.",
  ctaLabel: "Begin your arc",
  videoLine: "Inside the studio",
  videoDuration: "2:14",
} as const;

/** Full-bleed editorial hero — exterior / dusk architecture reads closer to reference art. */
export const editorialHeroImage = images.heroBg;

export const whoWeAreCopy = {
  eyebrow: "Who we are",
  headline: "Care That’s Intentional. Results That Last.",
  paragraphs: [
    "We believe the finest outcomes come from clarity—not pressure. Every recommendation is weighed against your goals, your timeline, and what you’re willing to sustain.",
    "From first consult through long-term follow-up, you get physician-led judgment, transparent options, and a team that respects both ambition and restraint.",
    "This is elevated care without the noise: calm spaces, honest conversations, and a roadmap that ages with you.",
  ],
} as const;

/** Hero photography — reception / glass entry matches mock. */
export const mockHeroImage = images.heroMedia;
