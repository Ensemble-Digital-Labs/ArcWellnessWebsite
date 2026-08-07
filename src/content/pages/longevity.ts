/**
 * Longevity: EXION section stack; dedicated hero, mechanism, and card art;
 * temporary EXION plates/icons.
 */
import {
  SERVICE_EXION_ICON,
  serviceSharedCreamPlate,
  serviceSharedDarkPlate,
  type ServicePageContent,
} from "@/content/pages/serviceTemplate";

const ICON = SERVICE_EXION_ICON;
const LONGEVITY_ASSET = "/assets/treatments/longevity";
/** Bump when replacing Longevity rasters so next/image + browser drop stale caches. */
const LONGEVITY_ASSETS_VERSION = "20260804-cards";

function longevityAsset(file: string) {
  return `${LONGEVITY_ASSET}/${file}?v=${LONGEVITY_ASSETS_VERSION}`;
}

export const longevityContent: ServicePageContent = {
  hero: {
    title: "Longevity",
    titleEmphasis: "Living well, longer.",
    titleEmphasisLines: ["Living well, longer."],
    subhead: "Strength. Clarity. Independence.",
    intro:
      "It isn't about living forever. It's about living well for as long as possible: to move through life with strength, clarity, and independence. To remain present for the people you love. To keep experiencing, contributing, exploring, and participating fully in the life you've built. At Arc Wellness, longevity isn't simply about adding years to your life. It's about protecting your ability to truly live them.",
    closingLine: "Not just lifespan. Healthspan.",
    poweredByEyebrow: "Physician-guided care",
    poweredByIconSrc: `${ICON}/atom.svg`,
    synergyLine: "Understand today. Protect tomorrow.",
    imageSrc: longevityAsset("longevity-hero.webp"),
    imageAlt:
      "Sculpted infinity form with a golden tree of life on a marble table in a warm, sunlit ARC Wellness room",
  },
  pillars: [
    {
      iconSrc: `${ICON}/bicep.svg`,
      title: "Strength",
      body: "Muscle to keep you strong, mobile, and independent.",
    },
    {
      iconSrc: `${ICON}/cell.svg`,
      title: "Metabolism",
      body: "A resilient metabolism that supports healthy aging.",
    },
    {
      iconSrc: `${ICON}/brain.svg`,
      title: "Clarity",
      body: "A healthy brain to preserve connection and presence.",
    },
    {
      iconSrc: `${ICON}/lotus.svg`,
      title: "Independence",
      body: "A body capable of carrying you through the life you still want.",
    },
  ],
  creamPlate: serviceSharedCreamPlate,
  mechanism: {
    titleLines: ["Look beyond", "\"normal.\""],
    body: "Traditional healthcare often asks: Do you have disease? Longevity medicine asks another important question: How well are you functioning, and how do we protect it? Through physician-guided evaluation and comprehensive testing, we look deeper into the markers that influence how you age, not to chase perfection, but to recognize change earlier and make informed decisions before those changes begin limiting your life.",
    evaluationBullets: [
      "Metabolic health, hormones, and cardiovascular function",
      "Brain health, muscle, and inflammation",
      "Nutrition, sleep, movement, and genetics",
      "Risk recognition earlier, before function is limited",
    ],
    imageSrc: longevityAsset("longevity-mechanism.webp"),
    imageAlt:
      "Physician and patient reviewing longevity markers together on a tablet in consultation",
    imageAspectClass: "aspect-[3/2]",
    imageObjectClass: "object-cover object-center scale-[1.01]",
  },
  treatments: {
    title: "Protect what keeps",
    titleEmphasis: "you independent",
    intro: "Your future health is being built today.",
    cards: [
      {
        title: "Built Today",
        tagline: "How we age isn't one thing.",
        body: "Metabolic health, hormones, cardiovascular function, brain health, muscle, inflammation, nutrition, sleep, movement, and genetics all become part of the story. Some factors we inherit. Many we can influence.",
        bullets: [
          "Understand where health stands today",
          "Identify opportunities early",
          "Influence what can be influenced",
          "Strategy for the years ahead",
        ],
        imageSrc: longevityAsset("longevity-card-built-today.webp"),
        imageAlt:
          "Longevity planning still life with nutrition, strength tools, supplements, and a personal strategy notebook",
        imageObjectClass: "object-[center_68%]",
      },
      {
        title: "Beyond Disease",
        tagline: "How well are you functioning?",
        body: "We look deeper into the markers that influence aging to better understand risk, recognize change earlier, and make informed decisions about your health.",
        bullets: [
          "Function, not only disease screening",
          "Comprehensive physician-guided testing",
          "Earlier recognition of change",
          "Informed decisions before limits set in",
        ],
        imageSrc: longevityAsset("longevity-card-beyond-disease.webp"),
        imageAlt:
          "Physician reviewing functional health markers with a patient on a tablet",
        imageObjectClass: "object-[center_72%]",
      },
      {
        title: "Whole-Person Care",
        tagline: "Healthy aging isn't one treatment.",
        body: "Your longevity plan may bring together nutrition, movement, hormone and metabolic optimization, supplementation, preventive strategies, and advanced therapies based on what your body needs.",
        bullets: [
          "Nutrition and movement",
          "Hormone and metabolic optimization",
          "Supplementation and prevention",
          "Advanced therapies when appropriate",
        ],
        imageSrc: longevityAsset("longevity-card-whole-person-care.webp"),
        imageAlt:
          "Whole-person longevity care—nutrition, movement, supplementation, and advanced therapies",
        imageObjectClass: "object-[center_70%]",
      },
    ],
  },
  different: {
    title: "Don't just",
    titleEmphasis: "add years",
    intro:
      "Imagine growing older without automatically surrendering the things that make life yours: moving independently, preparing a meal, traveling if you choose, getting down on the floor with a grandchild and getting back up.",
    backgroundSrc: serviceSharedDarkPlate.src,
    backgroundAlt: "",
    cards: [
      {
        iconSrc: `${ICON}/bicep.svg`,
        title: "Stay Strong",
        body: "Muscle and mobility that keep daily life yours.",
        iconClassName: "origin-center scale-[1.45]",
      },
      {
        iconSrc: `${ICON}/brain.svg`,
        title: "Stay Clear",
        body: "Clarity and connection with the people you love.",
        iconClassName: "origin-center scale-[1.45]",
      },
      {
        iconSrc: `${ICON}/lotus.svg`,
        title: "Stay Independent",
        body: "Driving, cooking, traveling, playing on your terms.",
        iconClassName: "origin-center scale-[1.45]",
      },
      {
        iconSrc: `${ICON}/sun.svg`,
        title: "Stay Present",
        body: "Making plans because you still expect to be part of them.",
        iconClassName: "origin-center scale-[1.45]",
      },
    ],
  },
  experience: {
    title: "Your longevity",
    titleEmphasis: "path",
    steps: [
      {
        iconSrc: `${ICON}/chat.svg`,
        title: "Consult",
        body: "Share the life you want to keep living, and what concerns you.",
      },
      {
        iconSrc: `${ICON}/consult-desk.svg`,
        title: "Evaluate",
        body: "Physician-guided testing beyond \"normal\" alone.",
      },
      {
        iconSrc: `${ICON}/meditation.svg`,
        title: "Strategize",
        body: "A plan for healthspan, not only lifespan.",
      },
      {
        iconSrc: `${ICON}/mind.svg`,
        title: "Optimize",
        body: "Nutrition, movement, hormones, metabolism, and more.",
      },
      {
        iconSrc: `${ICON}/shield-check.svg`,
        title: "Protect",
        body: "Ongoing care so you keep living the life you've built.",
        iconClassName: "origin-center scale-[1.7]",
      },
    ],
  },
  closing: {
    supportingLine:
      "Not simply being here longer. Being well enough to keep living the life you've built.",
  },
};

export const longevityHero = longevityContent.hero;
