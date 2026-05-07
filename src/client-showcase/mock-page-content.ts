import { Calendar, Headphones, HeartPulse, Shield, Sparkles } from "lucide-react";
import { EDITORIAL_SPA_IMAGES } from "@/content/editorialSpaImages";
import { PATIENT_EXPERIENCE_IMAGES } from "@/content/patientExperienceImages";
import { images } from "@/content/site";

export type WholeBodyCardData = {
  /** e.g. `01 / Skin & Surface` — mono label above the image */
  pillarLabel: string;
  title: string;
  bullets: readonly string[];
  /** Short italic line under the list */
  quote: string;
  imageSrc: string;
  /** Solid forest column (reference mock). */
  highlighted?: boolean;
  /** Peach pill on image (typically the highlighted pillar). */
  mostChosen?: boolean;
};

/** Split header above the five-pillar row (#services). */
export const wholeBodySectionHeading = {
  title: "Whole-body care, quietly orchestrated.",
  supporting:
    "Each pillar is led by a dedicated specialist and woven together by your lead clinician. You meet one team. You tell your story once.",
} as const;

export const wholeBodyCards: readonly WholeBodyCardData[] = [
  {
    pillarLabel: "01 / Aesthetic Optimization",
    title: "Aesthetic Optimization",
    bullets: ["Skin", "Face", "Body"],
    quote: "Refined, natural, unmistakably you.",
    imageSrc: EDITORIAL_SPA_IMAGES[0],
  },
  {
    pillarLabel: "02 / Internal Health",
    title: "Internal Health",
    bullets: ["Hormones", "Energy", "Metabolism"],
    quote: "Vitality you can feel—not guess.",
    imageSrc: EDITORIAL_SPA_IMAGES[1],
  },
  {
    pillarLabel: "03 / Functional Performance",
    title: "Functional Performance",
    bullets: ["Core", "Pelvic", "Posture"],
    quote: "Strong, stable, and aligned.",
    imageSrc: EDITORIAL_SPA_IMAGES[2],
    highlighted: true,
    mostChosen: true,
  },
  {
    pillarLabel: "04 / Mind & Mood",
    title: "Sharpen your mind",
    bullets: [
      "Cognitive performance",
      "Mood & resilience",
      "Focus & attention",
      "Evidence-informed therapeutic support",
    ],
    quote: "Quiet. Clear. Capable.",
    imageSrc: EDITORIAL_SPA_IMAGES[3],
  },
  {
    pillarLabel: "05 / The Long View",
    title: "Author your decades",
    bullets: [
      "Annual deep panels",
      "Genetic & epigenetic context",
      "Continuous biomarkers",
      "Concierge access",
    ],
    quote: "Built for the next forty.",
    imageSrc: PATIENT_EXPERIENCE_IMAGES[0],
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
  /** Section theme — affordability & fineness (client showcase About / #about). */
  eyebrow: "Balance of affordability & fineness",
  /** Alternating segments: even = plain, odd = rose-gold ink emphasis. Leading `\n` = line break (use `whitespace-pre-line` on h2). */
  headlineParts: ["Wellness,\nMade ", "Personal", "."] as const,
  paragraphs: [
    "We believe the finest care shouldn’t come with a cost that holds you back. Our approach pairs medical-grade treatments — peptides, infusions, curated supplements — with pricing designed for real, lasting wellness.",
    "Indulgent, yes. Exclusive? Never. This is self-care that honors both who you are and who you’re becoming.",
  ],
} as const;

/** Hero photography — reception / glass entry matches mock. */
export const mockHeroImage = images.heroMedia;

/** Full-bleed membership cohort band (`SplitPrefooterCTA`, `#book`). */
export const showcaseMembershipBandCopy = {
  eyebrow: "Begin your arc",
  headlineLine1: "The next decade",
  headlineLine2: "starts with",
  /** Italic emphasis line: `{italic}` + suffix renders as one block. */
  headlineItalicWord: "one",
  headlineAfterItalic: " quiet hour.",
  body:
    "A complimentary 30-minute call with our membership concierge. We'll listen first, then walk you through what an ARC Wellness plan would look like for your particular life.",
  yearDisplay: "'26",
  cohortLine: "Spring cohort · 14 spaces remaining",
  reserveLabel: "Reserve a call",
  memberLabel: "Become a member",
} as const;

/**
 * Dark band below concern marquee, above Who we are — science + beauty headline + three value cards.
 */
export const showcaseScienceBeautyBand = {
  eyebrow: "Medical aesthetics & wellness",
  /** Serif headline: plain white segments + one italic rose-gold emphasis. */
  headlineBefore: "Where science meets ",
  headlineEmphasis: "lasting",
  headlineAfter: " beauty.",
  subhead:
    "Exceptional wellness, designed for you — not for the few. Peptides, IV therapy, and curated supplements with transparent options so long-term care stays sustainable.",
  primaryCta: "Book a consultation",
  secondaryLabel: "View our programs",
  cards: [
    {
      index: "01",
      titleLead: "Doctor",
      titleTrail: "Led",
      description:
        "Physician judgment at every decision — calibrated to your goals, your timeline, and what you can sustain.",
    },
    {
      index: "02",
      titleLead: "Program",
      titleTrail: "Based",
      description:
        "Care sequenced as a plan, not a menu: aesthetics, wellness, and longevity woven into one coherent roadmap.",
    },
    {
      index: "03",
      titleLead: "Data",
      titleTrail: "Driven",
      description:
        "Labs, baselines, and follow-up that make progress visible — so adjustments are informed, not guessed.",
    },
  ],
} as const;

/** Patient quotes — client-showcase `#testimonials` (subset of tone from main `homeTestimonials`). */
export type ShowcaseTestimonialItem = {
  id: string;
  quote: string;
  attribution: string;
  context: string;
  imageSrc: string;
  imageAlt: string;
};

export const showcaseTestimonials: readonly ShowcaseTestimonialItem[] = [
  {
    id: "showcase-t1",
    attribution: "Sarah M.",
    context: "Aesthetic consultation",
    quote:
      "I wanted subtle refinement, not a different face. The plan was honest, unhurried, and the outcome still looks like me—just rested.",
    imageSrc: images.services[0],
    imageAlt: "Patient portrait",
  },
  {
    id: "showcase-t2",
    attribution: "James R.",
    context: "Wellness & longevity",
    quote:
      "Finally a place that treats how I feel and how I look as one conversation. Follow-up actually happens; I never feel rushed out the door.",
    imageSrc: images.services[1],
    imageAlt: "Patient portrait",
  },
  {
    id: "showcase-t3",
    attribution: "Elena K.",
    context: "Ongoing care",
    quote:
      "The space is calm, the explanations are clear, and I always know why we’re doing what we’re doing. That trust matters.",
    imageSrc: images.services[2],
    imageAlt: "Patient portrait",
  },
  {
    id: "showcase-t4",
    attribution: "Priya N.",
    context: "Skin health",
    quote:
      "They never oversell. If something isn’t right for my skin or my season of life, they say so—and the alternatives still feel elevated.",
    imageSrc: images.services[3],
    imageAlt: "Patient portrait",
  },
] as const;

export const showcaseTestimonialsHeading = {
  eyebrow: "Patient voices",
  title: "Stories from the studio",
  supporting:
    "Real words from people mapping aesthetics, vitality, and longevity in one continuous plan.",
} as const;

/** Full-bleed plate on collapsed carousel cards (`ShowcaseTestimonialsCarousel`) — no cream overlay on top. */
export const showcaseTestimonialCardAmbient =
  "/assets/decoration/background/ambient-01.png" as const;

/** FAQ — concise entries aligned with main-site `#faq` themes (edit with legal/clinical approval). */
export type ShowcaseFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const showcaseFaqHeading = {
  eyebrow: "Questions",
  title: "Answers, plainly.",
  supporting: "A few things patients ask before they book—clear timelines, clear expectations.",
} as const;

export const showcaseFaqItems: readonly ShowcaseFaqItem[] = [
  {
    id: "faq-first-visit",
    question: "What happens at the first visit?",
    answer:
      "We begin with a conversation about your goals, history, and day-to-day life. When it helps, we map next steps—labs, imaging, or treatment options—so you leave with clarity, not a generic checklist.",
  },
  {
    id: "faq-one-plan",
    question: "Can aesthetics and functional medicine be one plan?",
    answer:
      "Yes—that is how ARC is structured. Skin, vitality, and longevity are reviewed together so recommendations stay coherent and proportional to what you want.",
  },
  {
    id: "faq-book",
    question: "How do I book or reserve a call?",
    answer:
      "Use the booking links on this site or call the studio directly. We confirm timing, any forms, and what to expect before you arrive.",
  },
  {
    id: "faq-results",
    question: "How soon might I notice results?",
    answer:
      "It depends on the pathway. Some visits offer visible change quickly; others are measured over weeks or months. We set expectations up front so timelines feel honest.",
  },
  {
    id: "faq-membership",
    question: "Do you offer memberships or packages?",
    answer:
      "We offer continuity options for patients who want rhythm and priority access. Details are shared in consult so you can choose what fits your cadence.",
  },
] as const;

/** Infinite marquee under client-showcase hero — concerns / entry points. */
export const showcaseConcernMarqueeKeywords = [
  "Low Energy & Burnout",
  "Hormonal Imbalance & Weight Gain",
  "Poor Sleep & Recovery",
  "Aging Skin & Body Changes",
  "Brain Fog & Focus Issues",
] as const;
