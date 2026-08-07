/**
 * Peptide Therapy: EXION / ServiceTemplate section stack; client brief copy.
 * Route: `/treatments/peptide-therapy`
 * Hero, mechanism, and card art under public/assets/treatments/peptide-therapy.
 */
import {
  SERVICE_EXION_ICON,
  serviceSharedCreamPlate,
  serviceSharedDarkPlate,
  type ServicePageContent,
} from "@/content/pages/serviceTemplate";

const ICON = SERVICE_EXION_ICON;
const PEPTIDE_THERAPY_ASSET = "/assets/treatments/peptide-therapy";
/** Bump when replacing peptide rasters so next/image + browser drop stale caches. */
const PEPTIDE_ASSETS_VERSION = "20260804-hero";

function peptideTherapyAsset(file: string) {
  return `${PEPTIDE_THERAPY_ASSET}/${file}?v=${PEPTIDE_ASSETS_VERSION}`;
}

export const peptideTherapyContent: ServicePageContent = {
  hero: {
    title: "Peptide Therapy",
    titleEmphasis: "Precision Medicine.",
    titleEmphasisLines: ["Precision Medicine."],
    subhead: "Small molecules. Powerful communication. Personalized care.",
    intro:
      "Your body is constantly communicating. Every second, tiny biological messengers tell your cells when to heal, grow, repair, recover, burn fat, build muscle, regulate inflammation, and maintain healthy function. These messengers are called peptides. As we age—or as our bodies experience stress, illness, injury, or chronic inflammation—these signaling pathways can become less efficient. Peptide therapy helps support your body's natural communication systems, encouraging healthier function rather than simply masking symptoms. At Arc Wellness, peptide therapy is always personalized, physician-guided, and designed to support your long-term health goals.",
    closingLine: "Because your biology is unique. Your treatment should be too.",
    poweredByEyebrow: "Physician-guided care",
    poweredByIconSrc: `${ICON}/atom.svg`,
    synergyLine: "Support healthy physiology—not chase quick fixes.",
    imageSrc: peptideTherapyAsset("peptide-therapy-hero.webp"),
    imageAlt:
      "Physician-guided peptide therapy supporting cellular signaling and personalized care at ARC Wellness",
    imageObjectClass:
      "object-cover object-[82%_40%] sm:object-[65%_45%] lg:object-center",
    copyMaxClass: "md:max-w-2xl",
    copyGapClass: "mt-2 sm:mt-2.5",
    closingPillClass: "mt-4 sm:mt-5",
    compact: true,
  },
  pillars: [
    {
      iconSrc: `${ICON}/clock.svg`,
      title: "Age & Change",
      body: "Signaling pathways can become less efficient as we age and life demands stack up.",
    },
    {
      iconSrc: `${ICON}/sleep.svg?v=zoom`,
      title: "Stress & Sleep",
      body: "Stress and poor sleep interfere with the body's natural healing conversations.",
    },
    {
      iconSrc: `${ICON}/cell.svg`,
      title: "Inflammation",
      body: "Chronic inflammation and injury can disrupt the messages cells need to repair.",
    },
    {
      iconSrc: `${ICON}/battery-energy.svg`,
      title: "Metabolism",
      body: "Hormonal shifts and metabolic dysfunction can quiet the signals that keep you thriving.",
    },
  ],
  creamPlate: serviceSharedCreamPlate,
  mechanism: {
    titleLines: ["What are peptides?"],
    body: "Peptides are short chains of amino acids—the building blocks of proteins. Think of them as text messages sent between your cells. Each peptide carries a specific instruction. Rather than replacing what your body does naturally, peptides help encourage normal biological processes already built into your physiology. Imagine every cell has a mailbox—when the right message reaches the right cell, that cell knows exactly what to do.",
    evaluationBullets: [
      "Repair tissue and reduce inflammation",
      "Build collagen and maintain muscle",
      "Improve recovery, metabolism, and sleep",
      "Support cognitive function and healthy aging",
      "Physician guidance based on history, labs, hormones, lifestyle, and goals",
    ],
    imageSrc: peptideTherapyAsset("peptide-therapy-mechanism.webp"),
    imageAlt:
      "Peptide vials with glowing cellular-signal pathways—short messages that guide repair, recovery, and healthy aging",
    imageAspectClass: "aspect-[3/2]",
    imageObjectClass: "object-cover object-[center_55%] scale-[1.01]",
  },
  treatments: {
    title: "A smarter approach",
    titleEmphasis: "to wellness",
    intro:
      "Rather than focusing on one symptom at a time, peptide therapy may support multiple systems—always as part of a personalized plan.",
    cards: [
      {
        eyebrow: "Guidance",
        title: "Physician-Led",
        tagline: "Never one size fits all.",
        body: "Not every peptide is appropriate for every patient. Choosing the right therapy requires understanding your medical history, medications, laboratory testing, hormone balance, lifestyle, and personal goals.",
        bullets: [
          "Medical history and current medications",
          "Laboratory testing and hormone balance",
          "Lifestyle and personal goals reviewed together",
          "Every recommendation part of a comprehensive plan",
        ],
        imageSrc: peptideTherapyAsset(
          "peptide-therapy-card-physician-led.webp",
        ),
        imageAlt:
          "Physician reviewing history, labs, and goals with a patient before recommending peptides",
        imageObjectClass: "object-[center_40%]",
      },
      {
        eyebrow: "Philosophy",
        title: "Support Physiology",
        tagline: "Not quick fixes.",
        body: "We don't use peptides to chase trends or miracles. We use them to support healthy physiology—one tool within a larger blueprint of nutrition, movement, sleep, stress management, hormone optimization, advanced therapies, and personalized labs.",
        bullets: [
          "Evidence-informed, physician-guided care",
          "Part of your broader Arc Blueprint",
          "Feel better today—and build healthier decades",
          "Biology first, then the right support",
        ],
        imageSrc: peptideTherapyAsset(
          "peptide-therapy-card-support-physiology.webp",
        ),
        imageAlt:
          "Purposeful peptide and wellness support—planned, not trend-driven",
        imageObjectClass: "object-[center_55%]",
      },
      {
        eyebrow: "Who it may help",
        title: "Where Support Fits",
        tagline: "Goals, not guesswork.",
        body: "Depending on the peptide selected, therapy may support patients seeking help with healthy aging, recovery, performance, weight management, sleep, skin, joints, inflammation, cognition, and longevity optimization.",
        bullets: [
          "Healthy aging and longevity",
          "Recovery, performance, and joint support",
          "Weight, muscle, and metabolic goals",
          "Sleep, skin, inflammation, and cognition",
        ],
        imageSrc: peptideTherapyAsset(
          "peptide-therapy-card-where-support-fits.webp",
        ),
        imageAlt:
          "Peptide support alongside movement, nutrition, and a personalized plan",
        imageObjectClass: "object-[center_58%]",
      },
    ],
  },
  different: {
    title: "What peptides may",
    titleEmphasis: "support",
    intro:
      "Depending on the peptide selected, treatment may help support these systems throughout the body.",
    backgroundSrc: serviceSharedDarkPlate.src,
    backgroundAlt: "",
    cards: [
      {
        iconSrc: `${ICON}/bicep.svg`,
        title: "Recovery & Repair",
        body: "Healthy tissue healing, joint support, and exercise recovery.",
        iconClassName: "origin-center scale-[1.45]",
      },
      {
        iconSrc: `${ICON}/lotus.svg`,
        title: "Healthy Aging",
        body: "Cellular repair, collagen production, skin quality, and body composition.",
        iconClassName: "origin-center scale-[1.25]",
      },
      {
        iconSrc: `${ICON}/battery-energy.svg`,
        title: "Metabolic Health",
        body: "Weight management, blood sugar regulation, energy, and muscle preservation.",
        iconClassName: "origin-center scale-[1.1]",
      },
      {
        iconSrc: `${ICON}/brain.svg`,
        title: "Cognitive Wellness",
        body: "Focus, mental clarity, brain health, and stress resilience.",
        iconClassName: "origin-center scale-[1.5]",
      },
      {
        iconSrc: `${ICON}/sleep.svg?v=zoom`,
        title: "Sleep & Recovery",
        body: "Restorative sleep and healthy growth hormone signaling.",
        iconClassName: "origin-center scale-[1.55]",
      },
      {
        iconSrc: `${ICON}/shield-plus.svg`,
        title: "Immune Support",
        body: "Balanced inflammatory response, cellular repair, and general wellness.",
        iconClassName: "origin-center scale-[2.45]",
      },
    ],
  },
  experience: {
    title: "Your peptide",
    titleEmphasis: "path",
    steps: [
      {
        iconSrc: `${ICON}/chat.svg`,
        title: "Comprehensive Evaluation",
        body: "We review your health history, goals, and whether peptide therapy may be appropriate for you.",
        iconClassName: "origin-center scale-[1.45]",
      },
      {
        iconSrc: `${ICON}/checklist.svg`,
        title: "Labs & Context",
        body: "Laboratory testing, medications, hormones, and lifestyle inform what support you actually need.",
        iconClassName: "origin-center scale-[1.45]",
      },
      {
        iconSrc: `${ICON}/consult-desk.svg`,
        title: "Personalized Plan",
        body: "Your provider selects peptides and delivery methods tailored specifically to your biology.",
        iconClassName: "origin-center scale-[1.45]",
      },
      {
        iconSrc: `${ICON}/calendar-check.svg`,
        title: "Monitor & Refine",
        body: "As your health evolves, your plan evolves—guided care, not a fixed forever protocol.",
        iconClassName: "origin-center scale-[1.45]",
      },
    ],
  },
  closing: {
    supportingLine:
      "Schedule your peptide consultation—a personalized plan built around your biology, your goals, and healthier decades ahead.",
  },
};

export const peptideTherapyHero = peptideTherapyContent.hero;
