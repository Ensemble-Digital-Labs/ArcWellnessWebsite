/**
 * Homepage narrative blocks, concentrated copy (see `documents/homepage-section-model-reference.md`).
 */

import { images } from "@/content/site";
import { siteMeta } from "@/content/siteMeta";

export const homeMicro1 = {
  headlineBefore: "Intentional care,",
  headlineEmphasis: "every step",
  headlineAfter: "",
  uspLine:
    "Aesthetics, wellness, and longevity, designed as one continuous journey in St. Louis.",
  linkHref: "/#about",
  linkLabel: "Explore the practice",
} as const;

/** Edit name, role, and copy with final approved credentials. Photo: `images.founderPortrait` in `site.ts`. */
export const homeFounder = {
  headline: "Dr. Danish Jabbar",
  headlineEmphasisWord: "Dr. Danish",
  headlineEmphasisWord2: "Jabbar",
  roleTitle: "Founder & lead physician",
  letterParagraphs: [
    "Medicine gave me the privilege of caring for people. Experience taught me that good medicine is about more than treating disease.",
    "For more than 20 years, I've cared for patients through many stages of life. I'm proud of the medicine I've practiced, but I've also seen its limitations. Too many people were surviving instead of thriving. They deserved more than another prescription or another referral. They deserved the time to ask questions, the opportunity to look deeper, and the freedom to explore every option that could improve how they lived, not just how long they lived.",
    "That led me to ask a simple question: What if healthcare looked different?",
    "What if we had the time to truly understand the whole person? What if we could connect the pieces instead of treating them one at a time? What if we could use every tool available, not just prescriptions, to help people feel better, function better, and live better?",
    "Those questions became the foundation for Arc.",
  ] as const,
  closingLine: "Medicine saved lives. I wanted to help people truly live them.",
} as const;

export const homeWelcome = {
  headline: "Wellness. Made Personal.",
  headlineEmphasisWord: "Made Personal",
  paragraphs: [
    "Personalized care starts long before your first treatment.",
    "It starts with understanding.",
    "Before recommendations are made, we take the time to understand your health, your goals, your lifestyle, and the life you're building. From there, your Blueprint begins to take shape, a thoughtful plan designed specifically for you and refined as your health evolves.",
    "Because every recommendation should have a purpose.",
    "And every person deserves a Blueprint.",
  ],
} as const;

export const homePathIntro = {
  lead: "Your story starts here.",
  ctaLabel: "Let's begin",
  ctaHref: siteMeta.bookingUrl,
} as const;

/** Hero secondary CTA — full page route (no in-page `#path` scroll). */
export const homeHeroSecondaryCta = {
  label: "See How it Works",
  href: "/about",
} as const;

export const homeTrustStrip = {
  items: [
    "Evidence-informed protocols",
    "Transparent treatment plans",
    "Space designed for calm",
  ] as const,
} as const;

export const homeMicro2 = {
  eyebrow: "Why ARC",
  headlineBefore: "Results",
  headlineEmphasis: "you can feel",
  headlineAfter: "without losing yourself.",
  uspLine: "Natural-looking refinement, measurable wellness markers, and a team that respects your timeline.",
  linkHref: "/about",
  linkLabel: "Our approach",
} as const;

export const homeInvestSupport =
  "Reserve a private consult to map aesthetics, vitality, and longevity goals in one cohesive plan.";

export const homeInvestCtaLabel = "Reserve your Consultation";

export const homeInvestSignoff = {
  preamble: "We look forward to meeting you",
  name: "Dr. Jabbar",
} as const;

/** FAQ category labels for `#faq` tabs, keys must match `homeFaqByCategory`. */
export const homeFaqCategories = {
  general: "Getting started",
  booking: "Scheduling & results",
  membership: "Memberships",
} as const;

export type HomeFaqCategory = keyof typeof homeFaqCategories;

export type HomeFaqItem = {
  id: string;
  question: string;
  answer: string;
};

/** FAQ entries grouped by tab, edit copy with final legal/clinical approval. */
export const homeFaqByCategory: Record<HomeFaqCategory, readonly HomeFaqItem[]> = {
  general: [
    {
      id: "first-visit",
      question: "What happens at the first visit?",
      answer:
        "We begin with a conversation about your goals, history, and day-to-day life. When it helps, we map next steps, labs, imaging, or treatment options, so you leave with clarity, not a generic checklist.",
    },
    {
      id: "combine-care",
      question: "Can aesthetics and functional medicine be one plan?",
      answer:
        "Yes, that is how ARC is structured. Skin, vitality, and longevity are reviewed together so recommendations stay coherent and proportional to what you want.",
    },
  ],
  booking: [
    {
      id: "booking",
      question: "How do I book or reserve a call?",
      answer:
        "Use the booking links on this site or call the studio directly. We confirm timing, any forms, and what to expect before you arrive.",
    },
    {
      id: "timeline",
      question: "How soon might I notice results?",
      answer:
        "It depends on the pathway. Some visits offer visible change quickly; others are measured over weeks or months. We set expectations up front so timelines feel honest.",
    },
  ],
  membership: [
    {
      id: "memberships",
      question: "Do you offer memberships or packages?",
      answer:
        "We offer continuity options for patients who want rhythm and priority access. Details are shared in consult so you can choose what fits your cadence.",
    },
  ],
};

/**
 * Portrait pool for review cards — mint wall hero until real patient photos exist.
 * NOTE: never include the founder portrait here — it would render Dr. Jabbar
 * as if he were a patient in the Google-review cards.
 */
const testimonialPortraitPool = [images.heroMedia] as const;

/** Dummy copy, replace with real patient stories when available. */
const testimonialCopyRows = [
  {
    attribution: "Sarah M.",
    context: "Aesthetic consultation",
    quote:
      "I wanted subtle refinement, not a different face. The plan was honest, unhurried, and the outcome still looks like me, just rested.",
  },
  {
    attribution: "James R.",
    context: "Wellness & longevity",
    quote:
      "Finally a place that treats how I feel and how I look as one conversation. Follow-up actually happens; I never feel rushed out the door.",
  },
  {
    attribution: "Elena K.",
    context: "Ongoing care",
    quote:
      "The space is calm, the explanations are clear, and I always know why we’re doing what we’re doing. That trust matters.",
  },
  {
    attribution: "Priya N.",
    context: "Skin health",
    quote:
      "They never oversell. If something isn’t right for my skin or my season of life, they say so, and the alternatives still feel elevated.",
  },
  {
    attribution: "Daniel T.",
    context: "First visit",
    quote:
      "I expected clinical coldness. Instead it felt quiet, respectful, and organized. I left with a plan I could actually follow.",
  },
  {
    attribution: "Olivia H.",
    context: "Neuromodulators",
    quote:
      "Natural movement was non-negotiable for me. The approach was conservative in the best way:I look refreshed, not ‘done.’",
  },
  {
    attribution: "Marcus W.",
    context: "Vitality program",
    quote:
      "Labs and lifestyle finally sit in the same conversation. I’m not bouncing between disconnected appointments anymore.",
  },
  {
    attribution: "Amira F.",
    context: "Body contouring",
    quote:
      "Clear timelines, clear expectations. I always knew what recovery would feel like and what results were realistic.",
  },
  {
    attribution: "Chris L.",
    context: "Men’s aesthetics",
    quote:
      "No judgment, no hype, just straightforward guidance. The team treats this like healthcare with an eye for detail.",
  },
  {
    attribution: "Nina P.",
    context: "Long-term patient",
    quote:
      "Year two still feels like partnership. Adjustments are small, intentional, and never rushed.",
  },
  {
    attribution: "Jordan K.",
    context: "Preventive focus",
    quote:
      "I came in curious about longevity, not chasing trends. The roadmap felt evidence-informed and calm.",
  },
  {
    attribution: "Taylor S.",
    context: "Laser & texture",
    quote:
      "They paced treatments around my schedule and my skin’s tolerance. Nothing felt aggressive for the sake of drama.",
  },
  {
    attribution: "Riley B.",
    context: "Consultation only",
    quote:
      "Even when I wasn’t ready to book, the consult was worth it, clear options, no pressure, real education.",
  },
  {
    attribution: "Casey D.",
    context: "Recovery support",
    quote:
      "Check-ins were consistent. Questions got answered quickly. That mattered more than I expected.",
  },
  {
    attribution: "Morgan A.",
    context: "Combination plan",
    quote:
      "Skin, energy, and confidence were treated as one story, not three separate upsells.",
  },
  {
    attribution: "Alexis V.",
    context: "Evening appointments",
    quote:
      "As someone with a packed calendar, the flexibility and punctuality here is a relief.",
  },
  {
    attribution: "Quinn E.",
    context: "Sensitive skin",
    quote:
      "They listened to my history and built from there. No cookie-cutter protocol, just thoughtful steps.",
  },
  {
    attribution: "Jamie C.",
    context: "Referral",
    quote:
      "A friend sent me here after years of ‘maybe later.’ I wish I’d come sooner, the tone of care is different.",
  },
  {
    attribution: "Reese T.",
    context: "Microneedling",
    quote:
      "Healing was explained in plain language. I knew what to expect day by day, no mystery, no anxiety spiral.",
  },
  {
    attribution: "Blake M.",
    context: "Traveling patient",
    quote:
      "I’m not local, and they still made continuity workable. Virtual check-ins kept the plan coherent.",
  },
  {
    attribution: "Skylar J.",
    context: "Postpartum",
    quote:
      "I needed patience and realism, not promises. The team met me where I was and built from there.",
  },
  {
    attribution: "Drew P.",
    context: "Peels & tone",
    quote:
      "Progress was incremental in the best way, my skin looks brighter without looking ‘treated.’",
  },
  {
    attribution: "Harper G.",
    context: "Budget clarity",
    quote:
      "Options were tiered honestly. I never felt pushed toward the most expensive path as the only answer.",
  },
  {
    attribution: "Avery N.",
    context: "Anxiety-friendly",
    quote:
      "They noticed when I was tense and slowed down. Small thing, huge difference in how safe it felt.",
  },
  {
    attribution: "Cameron Y.",
    context: "Athlete",
    quote:
      "Recovery guidance respected my training schedule. Nothing reckless, just smart timing.",
  },
  {
    attribution: "Sidney F.",
    context: "Second opinion",
    quote:
      "I came for a second read on a plan elsewhere. The contrast in thoroughness was obvious.",
  },
  {
    attribution: "Rowan I.",
    context: "Minimalist goals",
    quote:
      "I asked for the smallest effective steps. They didn’t treat that like a compromise, just a design constraint.",
  },
  {
    attribution: "Parker O.",
    context: "Sun damage",
    quote:
      "Prevention and repair were both on the table. I finally understand what my skin actually needs seasonally.",
  },
  {
    attribution: "Sage U.",
    context: "Confidence",
    quote:
      "It’s not vanity, it’s alignment. They never made me feel silly for caring about how I present.",
  },
  {
    attribution: "Lane H.",
    context: "Follow-through",
    quote:
      "The hardest part of wellness is consistency. The rhythm here makes showing up easier.",
  },
  {
    attribution: "Kendall W.",
    context: "New to aesthetics",
    quote:
      "I started from zero knowledge. Education-first care made the whole category feel less intimidating.",
  },
] as const;

export const homeTestimonials = testimonialCopyRows.map((row, i) => ({
  id: `testimonial-${String(i + 1).padStart(2, "0")}`,
  imageSrc: testimonialPortraitPool[i % testimonialPortraitPool.length],
  imageAlt: `ARC Wellness patient, ${row.attribution}`,
  quote: row.quote,
  attribution: row.attribution,
  context: row.context,
}));
