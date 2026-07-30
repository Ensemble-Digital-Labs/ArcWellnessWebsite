/**
 * Hormone Health: EXION section stack; dedicated hero + temporary EXION plates/icons
 * and clinic-interior card photography.
 */
import { CLINIC_INTERIOR_IMAGES } from "@/content/clinicInteriorImages";
import {
  SERVICE_EXION_ICON,
  serviceSharedCreamPlate,
  serviceSharedDarkPlate,
  type ServicePageContent,
} from "@/content/pages/serviceTemplate";

const ICON = SERVICE_EXION_ICON;
const HORMONE_HEALTH_ASSET = "/assets/treatments/hormone-health";
/** Bump when replacing Hormone Health rasters so next/image + browser drop stale caches. */
const HORMONE_HEALTH_ASSETS_VERSION = "20260730-hero";

function hormoneHealthAsset(file: string) {
  return `${HORMONE_HEALTH_ASSET}/${file}?v=${HORMONE_HEALTH_ASSETS_VERSION}`;
}

export const hormoneHealthContent: ServicePageContent = {
  hero: {
    title: "Hormone Health",
    titleEmphasis: "Feel like yourself again.",
    titleEmphasisLines: ["Feel like", "yourself again."],
    subhead: "Balance. Clarity. Vitality restored.",
    intro:
      "Your energy has changed. Sleep isn't the same. Your body responds differently. Maybe your mood, focus, weight, strength, or desire feels unfamiliar. You know something has shifted, even if you've been told everything looks \"normal.\" At Arc Wellness, we listen to what your body is telling you.",
    closingLine: "Hormone health isn't about chasing a number.",
    poweredByEyebrow: "Physician-guided care",
    poweredByIconSrc: `${ICON}/atom.svg`,
    synergyLine: "Your story. Your labs. Your plan.",
    imageSrc: hormoneHealthAsset("hormone-health-hero.webp"),
    imageAlt:
      "Woman resting calmly in a sunlit ARC Wellness lounge chair as warm golden light flows through her",
  },
  pillars: [
    {
      iconSrc: `${ICON}/battery-energy.svg`,
      title: "Energy",
      body: "When hormones shift, fatigue and afternoon crashes often follow.",
    },
    {
      iconSrc: `${ICON}/lotus.svg`,
      title: "Sleep",
      body: "Restorative sleep is one of the first places imbalance shows up.",
    },
    {
      iconSrc: `${ICON}/mind.svg`,
      title: "Mood & Focus",
      body: "Cognition, motivation, and emotional steadiness are tightly linked to hormones.",
    },
    {
      iconSrc: `${ICON}/cell.svg`,
      title: "Strength",
      body: "Muscle, bone, metabolism, and desire all respond when hormones change.",
    },
  ],
  creamPlate: serviceSharedCreamPlate,
  mechanism: {
    titleLines: ["Hormones influence", "more than", "you think"],
    body: "Hormones are woven into nearly every part of how you feel and function, from energy, metabolism, and sleep to cognition, muscle, bone, mood, and sexual wellness. Our approach combines your story, comprehensive laboratory testing, and physician-guided evaluation to understand the bigger picture, not simply one number on a lab report.",
    evaluationBullets: [
      "Your symptoms, history, and goals, not a single lab value",
      "Comprehensive laboratory testing with physician interpretation",
      "Thyroid, metabolic health, nutrients, inflammation, and cardiovascular markers when relevant",
      "A plan designed to restore balance, function, and quality of life",
    ],
    imageSrc: CLINIC_INTERIOR_IMAGES.hallwayAccentSeating,
    imageAlt: "ARC Wellness hallway seating: thoughtful, unhurried care",
  },
  treatments: {
    title: "Care shaped",
    titleEmphasis: "for you",
    intro: "Women, men, and the systems that surround hormones, each deserves a precise lens.",
    cards: [
      {
        eyebrow: "For women",
        title: "Perimenopause & Menopause",
        tagline: "Your body is changing. Your care should too.",
        body: "Perimenopause and menopause can bring changes that reach far beyond hot flashes, brain fog, interrupted sleep, shifting weight, mood, energy, muscle, skin, and intimacy. When appropriate, bioidentical hormone replacement therapy may become part of a personalized plan.",
        bullets: [
          "Symptoms understood in full context",
          "Hormones, history, and goals reviewed together",
          "Bioidentical HRT when medically appropriate",
          "Menopause is a transition, not your identity",
        ],
        imageSrc: CLINIC_INTERIOR_IMAGES.waitingRoomArmchairGoldArt,
        imageAlt: "Calm waiting room at ARC Wellness",
      },
      {
        eyebrow: "For men",
        title: "Men's Hormone Health",
        tagline: "When \"slowing down\" doesn't feel like you.",
        body: "Hormonal changes in men often happen quietly, less energy, longer recovery, decreased strength, shifts in body composition, motivation, focus, libido, or performance. We evaluate testosterone alongside the broader hormonal and metabolic picture.",
        bullets: [
          "Testosterone in metabolic context",
          "Personalized plans when treatment is appropriate",
          "Careful monitoring over time",
          "Move forward stronger, not turn back the clock",
        ],
        imageSrc: CLINIC_INTERIOR_IMAGES.lobbyReceptionDeskProducts,
        imageAlt: "ARC Wellness lobby and care environment",
      },
      {
        eyebrow: "Whole-body lens",
        title: "Beyond the Basics",
        tagline: "Because hormones don't work alone.",
        body: "Hormone health is connected to the rest of you. Evaluation may explore thyroid function, metabolic health, nutrient status, inflammation, cardiovascular risk, and other markers influencing how you feel.",
        bullets: [
          "Thyroid and metabolic health",
          "Nutrient status and inflammation",
          "Cardiovascular and related markers",
          "One symptom can have many causes",
        ],
        imageSrc: CLINIC_INTERIOR_IMAGES.plantBonsaiWindowSill,
        imageAlt: "Quiet detail in the ARC Wellness clinic",
      },
    ],
  },
  different: {
    title: "What could feeling",
    titleEmphasis: "better look like?",
    intro:
      "Hormone optimization isn't about becoming someone you used to be. It's about supporting who you are becoming.",
    backgroundSrc: serviceSharedDarkPlate.src,
    backgroundAlt: "",
    cards: [
      {
        iconSrc: `${ICON}/lotus.svg`,
        title: "Restorative Sleep",
        body: "More restorative sleep that helps you wake ready for the day.",
      },
      {
        iconSrc: `${ICON}/brain.svg`,
        title: "Clearer Thinking",
        body: "Sharper focus and mental clarity when fog begins to lift.",
      },
      {
        iconSrc: `${ICON}/battery-energy.svg`,
        title: "Steadier Energy",
        body: "Energy that feels more even, not borrowed from caffeine alone.",
      },
      {
        iconSrc: `${ICON}/magnet.svg`,
        title: "Strength & Composition",
        body: "Improved strength and body composition that support how you live.",
      },
      {
        iconSrc: `${ICON}/mind.svg`,
        title: "Confidence & Connection",
        body: "Greater confidence and connection in the relationships that matter.",
      },
      {
        iconSrc: `${ICON}/sun.svg`,
        title: "At Home in Your Body",
        body: "Feeling comfortable in your body again.",
      },
    ],
  },
  experience: {
    title: "The hormone",
    titleEmphasis: "journey",
    steps: [
      {
        iconSrc: `${ICON}/chat.svg`,
        title: "Listen",
        body: "You simply need to know that something feels different. We start there.",
      },
      {
        iconSrc: `${ICON}/book.svg`,
        title: "Evaluate",
        body: "Story, labs, and physician-guided evaluation uncover what your body needs.",
      },
      {
        iconSrc: `${ICON}/meditation.svg`,
        title: "Personalize",
        body: "A plan built around balance, function, and quality of life, not a single number.",
      },
      {
        iconSrc: `${ICON}/mind.svg`,
        title: "Monitor",
        body: "Care continues with thoughtful follow-up as your body responds.",
      },
      {
        iconSrc: `${ICON}/calendar-check.svg`,
        title: "Feel Better",
        body: "Understanding changes everything, and feeling better can follow.",
      },
    ],
  },
  closing: {
    supportingLine:
      "You don't need to arrive knowing which hormone is low. That's our job to uncover.",
  },
};

export const hormoneHealthHero = hormoneHealthContent.hero;
