/**
 * Homepage narrative blocks, concentrated copy (see `documents/homepage-section-model-reference.md`).
 */

import { googleReviewerPhotoByAttribution } from "@/content/googleReviewerPhotos";
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
 * Fallback portrait when a Google reviewer photo is not on disk yet.
 * NOTE: never include the founder portrait here — it would render Dr. Jabbar
 * as if he were a patient in the Google-review cards.
 */
const testimonialPortraitFallback = images.heroMedia;

/**
 * Live Google reviews (5★) for Arc Wellness — St. Louis.
 * Attribution uses first name + last initial; quotes kept as published.
 * Profile photos: `npm run testimonials:google-photos` → googleReviewerPhotos.ts
 */
const testimonialCopyRows = [
  {
    attribution: "Imran S.",
    context: "",
    quote:
      "I just had my first Emface face lift treatment session at Arc Wellness and I already had such a great experience! The procedure was completely comfortable, relaxing, and much easier than I expected. The staff was professional, welcoming, and explained everything clearly before starting the treatment. Even after the first session, my skin felt tighter, fresher, and more lifted. I noticed a healthy glow and my face looked more refreshed and awake. I love that the treatment is non-invasive with no downtime at all. I’m really excited to continue the sessions and see the full results. Highly recommend Emface to anyone looking for a natural facial lift and rejuvenation!",
  },
  {
    attribution: "Sonya A.",
    context: "",
    quote:
      "Arc Wellness was recommended to me by a dear friend. After being introduced to the owners Jen and Danish I could tell it was going to be a beautiful experience. The Spa is beautiful and peaceful with an energy to match. Every interaction made me feel like I was their only client. I have been on a very difficult healing journey and because of Arc Wellness I have finally reached a place where I am ready to look forward. The way they tailor your wellness plan and the newest state of the art equipment and services they offer, have me exited for the next chapter in my healing journey. No matter your reason for visiting Arc Wellness, you are sure to be more than satisfied.",
  },
  {
    attribution: "Srinivasarao B.",
    context: "",
    quote:
      "My experience with ARC Wellness was truly beyond what I expected. From the moment I walked in, the staff made me feel comfortable and well-informed. Jennifer and Arina were especially outstanding—they took the time to explain every step in a way that was easy to understand and made sure I felt confident throughout the process. Jennifer and Arina’s professionalism, knowledge, and genuine care really set them apart. They made the entire experience feel personalized and supportive. I highly recommend ARC Wellness to anyone looking to improve both their physical and mental well-being.",
  },
  {
    attribution: "Khadijah Y.",
    context: "",
    quote:
      "I’ve been going to microneedling and I love this place so much. So clean, serene, and the staff are kind. Irena was my technician and she is always fun to talk to.",
  },
  {
    attribution: "Dauna B.",
    context: "",
    quote:
      "My experience with ARC Wellness was so much more than I expected. Their staff is very knowledgeable and explained everything to my understanding. With use of the Emsculpt I noticed a big difference in the tone of my sides, back and stomach. The Exomind helped with clarity and my moods. I highly recommend Arc Wellness for all your wellness needs.",
  },
  {
    attribution: "Sonya C.",
    context: "",
    quote:
      "I can not say enough about this team and program. I started with Arc about 3 months ago and i have lost almost 20 pounds and feel better then i have in years! I would give them 10 stars if I could!",
  },
  {
    attribution: "Justin C.",
    context: "",
    quote:
      "The staff is very friendly and knowledgeable. It’s such a beautiful and relaxing space. I’m excited to go back for my next treatment!",
  },
] as const;

export const homeTestimonials = testimonialCopyRows.map((row, i) => ({
  id: `testimonial-${String(i + 1).padStart(2, "0")}`,
  imageSrc:
    googleReviewerPhotoByAttribution[row.attribution] ?? testimonialPortraitFallback,
  imageAlt: `Google reviewer ${row.attribution}`,
  quote: row.quote,
  attribution: row.attribution,
  context: row.context,
}));
