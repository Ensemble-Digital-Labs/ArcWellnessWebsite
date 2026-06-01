import { images } from "@/content/site";

export type TreatmentCategoryId = "body" | "aesthetics" | "wellness";

export type TreatmentPage = {
  slug: string;
  title: string;
  tagline: string;
  category: TreatmentCategoryId;
  categoryLabel: string;
  imageSrc: string;
  imageAlt: string;
  intro: string;
  highlights?: readonly string[];
  sections: readonly {
    heading?: string;
    body?: string;
    bullets?: readonly string[];
  }[];
  faqs?: readonly { id: string; question: string; answer: string }[];
};

export const treatmentCategories: Record<
  TreatmentCategoryId,
  { label: string; description: string }
> = {
  body: {
    label: "Body & core",
    description: "FDA-cleared devices for strength, pelvic health, and body composition.",
  },
  aesthetics: {
    label: "Aesthetics & skin",
    description: "Injectables, skin remodeling, and elevated treatment experiences.",
  },
  wellness: {
    label: "Wellness therapies",
    description: "IV nutrients, peptides, and supplements integrated into your plan.",
  },
};

const img = images;

export const treatmentsHub = {
  seo: {
    title: "Treatments & Therapies | Arc Wellness St. Louis",
    description:
      "Physician-led plans combining FDA-cleared devices, IV therapy, peptides, aesthetics, and supplements.",
  },
  hero: {
    eyebrow: "Treatments",
    title: "Care designed for",
    titleEmphasis: "how you live",
    body: "From cognitive performance and pelvic health to body composition and skin—every modality is selected for clinical purpose and woven into one coherent plan.",
  },
} as const;

export const allTreatments: readonly TreatmentPage[] = [
  {
    slug: "overview",
    title: "Treatment Overview",
    tagline: "One plan, many modalities",
    category: "body",
    categoryLabel: "Overview",
    imageSrc: img.heroMedia,
    imageAlt: "ARC Wellness reception",
    intro:
      "Arc Wellness combines medical expertise with personalized wellness—non-invasive treatments for weight management, pelvic health, cognitive performance, aesthetics, and restorative therapies guided by your goals.",
    highlights: [
      "Free consultation to start",
      "Physician review before treatment",
      "Financing via PatientFi, Cherry, and in-house options",
    ],
    sections: [
      {
        heading: "How we plan your care",
        body: "We begin with conversation and measurement, then build a plan that may combine device therapies, infusions, peptides, and aesthetics—adjusted as your body responds.",
      },
    ],
  },
  {
    slug: "exomind",
    title: "ExoMind",
    tagline: "Reconnect your mind to its natural harmony",
    category: "body",
    categoryLabel: "Neuromodulation",
    imageSrc: img.whoWeAre,
    imageAlt: "Consultation at ARC Wellness",
    intro:
      "ExoMind uses Transcranial Magnetic Stimulation (TMS) to deliver measured magnetic pulses that activate key neural pathways and support healthier brain function—non-invasive and drug-free.",
    highlights: [
      "Mental clarity without relying on medications",
      "Sessions under 30 minutes",
      "Walk in, walk out—resume daily activities",
    ],
    sections: [
      {
        heading: "Who can benefit",
        body: "Anyone seeking mental clarity, emotional balance, or cognitive renewal. ExoMind may also support symptoms related to ADHD, OCD, and depression—discuss suitability with your provider.",
      },
      {
        heading: "What you may notice",
        bullets: [
          "Relief from stress, anxiety, or emotional imbalance",
          "Improved focus, memory, and productivity",
          "Restored energy and mental clarity",
        ],
      },
      {
        heading: "Beyond everyday benefits",
        body: "By stimulating areas linked to reward and decision-making, ExoMind can help reduce cravings and emotional eating. The same gentle recalibration may support how the brain perceives and manages pain.",
      },
    ],
    faqs: [
      {
        id: "what",
        question: "What is ExoMind?",
        answer:
          "A non-invasive, drug-free TMS therapy designed to support symptoms of depression and related conditions. FDA-cleared technology stimulates areas of the brain involved in emotional regulation and cognitive function.",
      },
      {
        id: "feel",
        question: "What does a session feel like?",
        answer:
          "You may feel a tapping or tingling sensation, often compared to a head massage. Most patients find it comfortable; sessions are typically under 30 minutes.",
      },
      {
        id: "sessions",
        question: "How many sessions are required?",
        answer:
          "A course of TMS traditionally requires multiple treatments. Your physician will recommend a schedule based on your goals and response.",
      },
    ],
  },
  {
    slug: "emsella",
    title: "EmSella",
    tagline: "Pelvic floor wellness without surgery",
    category: "body",
    categoryLabel: "Pelvic health",
    imageSrc: img.services[1],
    imageAlt: "Wellness treatment at ARC",
    intro:
      "EmSella is an FDA-cleared HIFEM chair that strengthens pelvic floor muscles—supporting continence, postpartum recovery, and core stability with no downtime.",
    sections: [
      {
        heading: "Who it helps",
        bullets: [
          "Pelvic floor weakness or incontinence",
          "Postpartum core recovery",
          "Core strength paired with functional movement",
        ],
      },
      {
        heading: "What to expect",
        body: "You remain fully clothed during treatment. Sessions are comfortable for most patients and fit easily into a busy schedule. Your provider will recommend a series based on your goals.",
      },
    ],
  },
  {
    slug: "emsculpt-neo",
    title: "EmSculpt Neo",
    tagline: "Reduce fat and build muscle—non-invasively",
    category: "body",
    categoryLabel: "Body contouring",
    imageSrc: img.services[1],
    imageAlt: "Body contouring session",
    intro:
      "EmSculpt Neo combines radiofrequency heating with high-intensity electromagnetic energy to reduce fat and build muscle simultaneously—the first non-invasive treatment to do both.",
    highlights: ["No pain, sweat, or downtime", "~30 minutes per session", "Often 4 weekly sessions"],
    sections: [
      {
        heading: "How it works",
        bullets: [
          "HIFEM: supramaximal contractions to strengthen targeted muscle",
          "RF heating: helps eliminate fat cells while supporting definition",
        ],
      },
      {
        heading: "Treatment areas",
        body: "Abdomen, buttocks, thighs, arms, calves, and pelvic floor—your plan is tailored to your anatomy and goals.",
      },
      {
        heading: "Who can benefit",
        bullets: [
          "Stubborn fat that resists diet and exercise",
          "Muscle tone and definition without surgery",
          "Fitness plateaus and postpartum core re-strengthening",
        ],
      },
      {
        heading: "Results",
        body: "Some patients notice changes within weeks; optimal results often appear 2–3 months after completing the series. Maintenance and lifestyle support prolong outcomes.",
      },
    ],
    faqs: [
      {
        id: "sessions",
        question: "How many sessions will I need?",
        answer: "Most patients benefit from a series of four sessions, once per week. Your provider may recommend additional treatments based on your goals.",
      },
      {
        id: "downtime",
        question: "Is there downtime?",
        answer: "No. You can return to work, exercise, or daily activities immediately after your session.",
      },
      {
        id: "insurance",
        question: "Is it covered by insurance?",
        answer: "EmSculpt Neo is elective body contouring and is not covered by insurance. Arc Wellness offers packages and financing options.",
      },
    ],
  },
  {
    slug: "emface",
    title: "EmFace",
    tagline: "Facial toning and lift—without needles",
    category: "body",
    categoryLabel: "Facial device",
    imageSrc: img.services[0],
    imageAlt: "Facial aesthetic treatment",
    intro:
      "EmFace combines synchronized RF and HIFES technology to lift, tone, and smooth facial tissue—supporting natural-looking refinement with zero downtime.",
    sections: [
      {
        body: "Ideal for patients seeking subtle lift and muscle tone in the mid-face and jawline as part of a broader aesthetics plan. Your physician will pair EmFace with injectables or skincare when appropriate.",
      },
    ],
  },
  {
    slug: "exion",
    title: "Exion",
    tagline: "Skin remodeling with precision",
    category: "aesthetics",
    categoryLabel: "Skin technology",
    imageSrc: img.services[0],
    imageAlt: "Skin treatment",
    intro:
      "Exion delivers fractional RF and targeted energy for skin tightening, texture, and rejuvenation—integrated into physician-led aesthetic planning at Arc.",
    sections: [
      {
        body: "Treatment depth and settings are chosen for your skin type and goals. Expect a personalized series with clear timelines for recovery and results.",
      },
    ],
  },
  {
    slug: "daxxify",
    title: "Daxxify",
    tagline: "Long-lasting neuromodulator",
    category: "aesthetics",
    categoryLabel: "Injectables",
    imageSrc: img.services[0],
    imageAlt: "Aesthetic consultation",
    intro:
      "Daxxify is a peptide-powered neuromodulator offering extended smoothness for frown lines and expression areas—administered with conservative, natural movement in mind.",
    sections: [
      {
        body: "Your injector maps dosage and placement to your anatomy and expression habits. We prioritize refreshed appearance, not frozen features.",
      },
    ],
  },
  {
    slug: "rha",
    title: "RHA Fillers",
    tagline: "Resilient hyaluronic acid for natural movement",
    category: "aesthetics",
    categoryLabel: "Injectables",
    imageSrc: img.services[0],
    imageAlt: "Facial aesthetics",
    intro:
      "RHA (Resilient Hyaluronic Acid) fillers adapt to dynamic facial movement—ideal for lips, lines, and volume restoration that looks natural in motion and at rest.",
    sections: [
      {
        body: "Each session includes candid discussion of proportions, recovery, and how fillers complement your overall wellness and skin health plan.",
      },
    ],
  },
  {
    slug: "knesko",
    title: "Knesko",
    tagline: "Luxury treatment masks & skincare",
    category: "aesthetics",
    categoryLabel: "Skincare",
    imageSrc: img.investBanner,
    imageAlt: "ARC Wellness lounge",
    intro:
      "Knesko brings gemstone-infused masks and professional skincare rituals to Arc—elevating in-office treatments and home care between visits.",
    sections: [
      {
        body: "Pair Knesko experiences with facials, injectables, or recovery days for amplified calm and glow. Your provider recommends products aligned with your skin goals.",
      },
    ],
  },
  {
    slug: "nutrient-therapy",
    title: "Nutrient Therapy",
    tagline: "IV infusions tailored to your goals",
    category: "wellness",
    categoryLabel: "IV therapy",
    imageSrc: img.membershipCohortHero,
    imageAlt: "Biometric consultation room",
    intro:
      "Physician-designed IV protocols support energy, immunity, recovery, and hydration—dosage-monitored and quality-verified, integrated with labs and lifestyle.",
    sections: [
      {
        body: "After your consult, we select formulations aligned with how you feel and what you’re working toward—never a one-size-fits-all drip.",
      },
    ],
  },
  {
    slug: "peptide-therapy",
    title: "Peptide Therapy",
    tagline: "Protocol-based metabolic and recovery support",
    category: "wellness",
    categoryLabel: "Peptides",
    imageSrc: img.membershipCohortHero,
    imageAlt: "Clinical wellness consultation",
    intro:
      "Peptide protocols at Arc are evidence-informed and personalized—supporting metabolism, recovery, and vitality as part of a whole-person plan, not a standalone trend.",
    sections: [
      {
        body: "Your provider reviews history, goals, and monitoring needs before recommending peptides. We emphasize sustainable cadence and honest expectations.",
      },
    ],
  },
  {
    slug: "supplements",
    title: "Supplements",
    tagline: "Quality-verified nutritional support",
    category: "wellness",
    categoryLabel: "Nutrition",
    imageSrc: img.heroBg,
    imageAlt: "ARC Wellness exterior",
    intro:
      "Curated supplements make long-term wellness sustainable—not exclusive. We recommend products that complement your labs, diet, and treatment plan.",
    sections: [
      {
        body: "Because taking care of yourself shouldn’t feel like a luxury. Our team helps you choose what’s worth your investment—and what isn’t.",
      },
    ],
  },
];

export function getTreatmentBySlug(slug: string): TreatmentPage | undefined {
  return allTreatments.find((t) => t.slug === slug);
}

export function getAllTreatmentSlugs(): string[] {
  return allTreatments.map((t) => t.slug);
}
