/**
 * Supplements: EXION / ServiceTemplate section stack; client brief copy.
 * Route: `/treatments/supplements`
 * Hero + card art under public/assets/treatments/supplements; mechanism still reuses retail display.
 */
import { RETAIL_IMAGES } from "@/content/retailImages";
import {
  SERVICE_EXION_ICON,
  serviceSharedCreamPlate,
  serviceSharedDarkPlate,
  type ServicePageContent,
} from "@/content/pages/serviceTemplate";

const ICON = SERVICE_EXION_ICON;
const SUPPLEMENTS_ASSET = "/assets/treatments/supplements";
/** Bump when replacing supplement rasters so next/image + browser drop stale caches. */
const SUPPLEMENTS_ASSETS_VERSION = "20260804-hero";

function withVersion(src: string) {
  return `${src}?v=${SUPPLEMENTS_ASSETS_VERSION}`;
}

function supplementsAsset(file: string) {
  return `${SUPPLEMENTS_ASSET}/${file}?v=${SUPPLEMENTS_ASSETS_VERSION}`;
}

export const supplementsContent: ServicePageContent = {
  hero: {
    title: "Supplements",
    titleEmphasis: "Personalized Nutrition for Lifelong Health",
    titleEmphasisLines: ["Personalized Nutrition", "for Lifelong Health."],
    subhead:
      "The right supplement isn't the most popular one. It's the one your body actually needs.",
    intro:
      "Walk into any pharmacy and you'll find hundreds of bottles promising more energy, better sleep, stronger immunity, improved memory, healthier joints, and longer life. The challenge isn't finding supplements—it's knowing which ones are appropriate for you. At Arc Wellness, we don't believe in one-size-fits-all supplementation. We believe the best results come from understanding your biology first—and then building a personalized plan designed around your unique needs, health goals, and stage of life.",
    closingLine: "Your supplement plan should be as personalized as your fingerprint.",
    poweredByEyebrow: "Physician-guided care",
    poweredByIconSrc: `${ICON}/atom.svg`,
    synergyLine: "Precision over popularity—every recommendation with intention.",
    imageSrc: supplementsAsset("supplements-hero.webp"),
    imageAlt:
      "Personalized professional-grade supplements curated for your biology at ARC Wellness",
    imageObjectClass:
      "object-cover object-[55%_40%] sm:object-[50%_45%] lg:object-center",
    copyMaxClass: "md:max-w-2xl",
    copyGapClass: "mt-2.5 sm:mt-3",
    closingPillClass: "mt-4 sm:mt-5",
    shellClass:
      "min-h-[min(100dvh,34rem)] sm:min-h-[min(100dvh,38rem)] md:min-h-[min(85dvh,40rem)]",
  },
  pillars: [
    {
      iconSrc: `${ICON}/capsule-leaf.svg`,
      title: "Modern Gaps",
      body: "Nutrient-depleted soils and processed foods can leave even careful diets short.",
      iconClassName: "origin-center scale-[1.7]",
    },
    {
      iconSrc: `${ICON}/sleep.svg?v=zoom`,
      title: "Stress & Sleep",
      body: "Chronic stress and poor sleep change how your body uses what you eat.",
    },
    {
      iconSrc: `${ICON}/droplet.svg`,
      title: "Absorption",
      body: "Digestion, medications, and toxins influence what your body can actually use.",
    },
    {
      iconSrc: `${ICON}/clock.svg`,
      title: "Life Stage",
      body: "Hormonal shifts and aging reshape nutritional needs over every decade.",
    },
  ],
  creamPlate: serviceSharedCreamPlate,
  mechanism: {
    titleLines: ["One Body.", "One Blueprint."],
    body: "No two patients have the same biology. Two people with identical symptoms may require completely different nutritional support. Even with an excellent diet, modern life presents challenges our bodies weren't designed to navigate alone. Thoughtfully selected supplements can help fill nutritional gaps, support normal physiology, and optimize long-term health when used as part of a comprehensive wellness plan.",
    evaluationBullets: [
      "Laboratory testing and medical history",
      "Lifestyle, nutrition, and current medications",
      "Hormone balance, digestive health, and inflammation",
      "Genetics when appropriate, plus your personal health goals",
      "Recommendations made only after we understand your biology",
    ],
    imageSrc: withVersion(RETAIL_IMAGES.foundationSupplementProtocolDisplay),
    imageAlt:
      "Foundation supplement protocol display at ARC Wellness",
    imageAspectClass: "aspect-[3/2]",
    imageObjectClass: "object-cover object-center",
  },
  treatments: {
    title: "Supplement smarter,",
    titleEmphasis: "not harder",
    intro:
      "More isn't better. Every recommendation should have a purpose—and support a measurable health objective.",
    cards: [
      {
        eyebrow: "Philosophy",
        title: "More Isn't Better",
        tagline: "Recommend better—not more.",
        body: "One of the biggest misconceptions in wellness is that taking more supplements automatically leads to better health. Unnecessary supplementation may increase cost, duplicate ingredients, or interfere with medications and other nutrients.",
        bullets: [
          "Every supplement should have a purpose",
          "Avoid duplicate or conflicting ingredients",
          "Support measurable health objectives",
          "Refine the plan as your body changes",
        ],
        imageSrc: supplementsAsset("supplements-card-more-isnt-better.webp"),
        imageAlt:
          "Purposeful, physician-guided supplements—better recommendations, not more bottles",
        imageObjectClass: "object-[center_48%]",
      },
      {
        eyebrow: "Standards",
        title: "Quality Matters",
        tagline: "Professional-grade, not trend-driven.",
        body: "Not all supplements are created equal. Differences in sourcing, purity, manufacturing, absorption, and third-party testing can significantly impact effectiveness. We select trusted manufacturers committed to quality and transparency.",
        bullets: [
          "Ingredient sourcing and purity standards",
          "Evidence-informed formulations",
          "Third-party testing where it matters",
          "Recommended because we believe in the quality",
        ],
        imageSrc: supplementsAsset("supplements-card-quality-matters.webp"),
        imageAlt:
          "Professional-grade formulations with purity, sourcing, and quality standards",
        imageObjectClass: "object-[center_42%]",
      },
      {
        eyebrow: "Whole plan",
        title: "Bigger Picture",
        tagline: "One piece of your Blueprint.",
        body: "Supplements don't replace healthy habits—they support them. At Arc Wellness, supplementation sits alongside nutrition, movement, sleep, stress management, hormone optimization, metabolic health, advanced therapies, and longevity planning.",
        bullets: [
          "Lifestyle remains the foundation",
          "Personalized Blueprint, not isolated bottles",
          "Aligns with labs, goals, and stage of life",
          "Strengthens—not substitutes—daily habits",
        ],
        imageSrc: supplementsAsset("supplements-card-bigger-picture.webp"),
        imageAlt:
          "Supplements as one piece of a whole Blueprint—nutrition, movement, sleep, and personalized planning",
        imageObjectClass: "object-[center_50%]",
      },
    ],
  },
  different: {
    title: "What we may",
    titleEmphasis: "support",
    intro:
      "Depending on your individual needs, your personalized supplement plan may help support these areas of health.",
    backgroundSrc: serviceSharedDarkPlate.src,
    backgroundAlt: "",
    cards: [
      {
        iconSrc: `${ICON}/cell.svg`,
        title: "Cellular Health",
        body: "Supporting healthy cellular function and resilience.",
        iconClassName: "origin-center scale-[1.4]",
      },
      {
        iconSrc: `${ICON}/battery-energy.svg`,
        title: "Energy",
        body: "Optimizing the nutrients involved in energy metabolism.",
        iconClassName: "origin-center scale-[1.15]",
      },
      {
        iconSrc: `${ICON}/brain.svg`,
        title: "Brain Health",
        body: "Supporting focus, memory, and cognitive performance.",
        iconClassName: "origin-center scale-[1.45]",
      },
      {
        iconSrc: `${ICON}/shield-plus.svg`,
        title: "Immune Function",
        body: "Helping maintain a healthy immune response.",
        iconClassName: "origin-center scale-[2.25]",
      },
      {
        iconSrc: `${ICON}/molecule.svg`,
        title: "Gut Health",
        body: "Supporting digestion, absorption, and a balanced microbiome.",
        iconClassName: "origin-center scale-[1.45]",
      },
      {
        iconSrc: `${ICON}/cycle-sparkle.svg`,
        title: "Hormonal Health",
        body: "Targeted nutritional support for healthy hormone function.",
        iconClassName: "origin-center scale-[1.35]",
      },
      {
        iconSrc: `${ICON}/bicep.svg`,
        title: "Bone & Muscle",
        body: "Helping maintain strength, mobility, and healthy aging.",
        iconClassName: "origin-center scale-[1.45]",
      },
      {
        iconSrc: `${ICON}/droplet.svg`,
        title: "Heart & Circulation",
        body: "Supporting heart health and healthy circulation.",
        iconClassName: "origin-center scale-[1.55]",
      },
      {
        iconSrc: `${ICON}/meditation.svg`,
        title: "Recovery",
        body: "Helping your body recover from exercise, stress, and daily life.",
        iconClassName: "origin-center scale-[1.4]",
      },
      {
        iconSrc: `${ICON}/lotus.svg`,
        title: "Healthy Aging",
        body: "Supporting vitality and longevity throughout every decade.",
        iconClassName: "origin-center scale-[1.25]",
      },
    ],
  },
  experience: {
    title: "Our approach to",
    titleEmphasis: "supplementation",
    steps: [
      {
        iconSrc: `${ICON}/chat.svg`,
        title: "Understand Your Health",
        body: "We begin with a comprehensive review of your health history, symptoms, lifestyle, and goals.",
        iconClassName: "origin-center scale-[1.45]",
      },
      {
        iconSrc: `${ICON}/checklist.svg`,
        title: "Identify Opportunities",
        body: "Advanced laboratory testing helps uncover nutritional gaps, metabolic patterns, inflammation, and other influencing factors.",
        iconClassName: "origin-center scale-[1.45]",
      },
      {
        iconSrc: `${ICON}/consult-desk.svg`,
        title: "Create Your Plan",
        body: "Your provider develops a supplement strategy tailored specifically to your biology.",
        iconClassName: "origin-center scale-[1.45]",
      },
      {
        iconSrc: `${ICON}/calendar-check.svg`,
        title: "Monitor & Adjust",
        body: "As your health changes, your plan evolves—we refine it, rather than keep you on the same products forever.",
        iconClassName: "origin-center scale-[1.45]",
      },
    ],
  },
  closing: {
    supportingLine:
      "Discover how personalized supplementation and physician-guided care can support your health—for today and every decade ahead.",
  },
};

export const supplementsHero = supplementsContent.hero;
