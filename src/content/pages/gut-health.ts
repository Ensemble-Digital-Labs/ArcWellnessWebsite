/**
 * Gut Health — EXION section stack; temporary EXION plates/icons + clinic heroes.
 */
import { CLINIC_INTERIOR_IMAGES } from "@/content/clinicInteriorImages";
import {
  SERVICE_EXION_ICON,
  serviceSharedCreamPlate,
  serviceSharedDarkPlate,
  type ServicePageContent,
} from "@/content/pages/serviceTemplate";

const ICON = SERVICE_EXION_ICON;

export const gutHealthContent: ServicePageContent = {
  hero: {
    title: "Gut Health",
    titleEmphasis: "Are you listening?",
    titleEmphasisLines: ["Are you", "listening?"],
    subhead: "Digest. Absorb. Restore from within.",
    intro:
      "Bloating after meals. Unpredictable digestion. Food that suddenly doesn't agree with you. Fatigue, brain fog, skin changes, or simply feeling uncomfortable in your own body. Sometimes the symptoms are obvious. Sometimes they show up somewhere you never expected. At Arc Wellness, we look beyond the symptom to understand what your gut may be trying to tell us.",
    closingLine: "Because gut health is whole-body health.",
    poweredByEyebrow: "Physician-guided care",
    poweredByIconSrc: `${ICON}/atom.svg`,
    synergyLine: "Less guessing. More understanding.",
    imageSrc: CLINIC_INTERIOR_IMAGES.consultationLounge,
    imageAlt: "Consultation lounge at ARC Wellness for gut health evaluation",
  },
  pillars: [
    {
      iconSrc: `${ICON}/cell.svg`,
      title: "Digestion",
      body: "How you break down and absorb nutrients shapes how you feel every day.",
    },
    {
      iconSrc: `${ICON}/lotus.svg`,
      title: "Immunity",
      body: "Your gut supports immune function far beyond the digestive tract.",
    },
    {
      iconSrc: `${ICON}/brain.svg`,
      title: "Gut–Brain",
      body: "The gut communicates with the brain—mood, focus, and comfort included.",
    },
    {
      iconSrc: `${ICON}/sun.svg`,
      title: "Whole Body",
      body: "Metabolism, hormones, and inflammation all interact with gut health.",
    },
  ],
  creamPlate: serviceSharedCreamPlate,
  mechanism: {
    titleLines: ["Look beneath", "the surface"],
    body: "Instead of guessing which food to eliminate or which supplement to try next, we begin with understanding. Your physician-guided evaluation may include advanced testing—then we bring the pieces together into a personalized plan designed around what your body needs.",
    evaluationBullets: [
      "Digestive and microbiome health",
      "Food sensitivities",
      "Nutrient absorption",
      "Inflammation and intestinal function",
      "Gut–brain connections",
    ],
    imageSrc: CLINIC_INTERIOR_IMAGES.hallwayAccentSeating,
    imageAlt: "Calm clinic hallway at ARC Wellness",
  },
  treatments: {
    title: "Restore the",
    titleEmphasis: "foundation",
    intro: "More than digestion. A plan built from understanding.",
    cards: [
      {
        eyebrow: "Whole-body lens",
        title: "More Than Digestion",
        tagline: "Your gut plays a remarkable role.",
        body: "It influences how you digest and absorb nutrients, supports immune function, communicates with your brain, and interacts with metabolism, hormones, and inflammation. When that delicate environment becomes disrupted, the effects may reach far beyond your stomach.",
        bullets: [
          "Nutrient digestion and absorption",
          "Immune support",
          "Gut–brain communication",
          "Links to metabolism and hormones",
        ],
        imageSrc: CLINIC_INTERIOR_IMAGES.waitingRoomArmchairGoldArt,
        imageAlt: "Calm seating at ARC Wellness",
      },
      {
        eyebrow: "Evaluation",
        title: "Look Beneath",
        tagline: "Testing before guessing.",
        body: "Advanced, physician-guided evaluation helps us understand what your gut is signaling—so we stop cycling through random eliminations and supplements.",
        bullets: [
          "Microbiome and digestive health",
          "Sensitivities and absorption",
          "Inflammation and function",
          "A plan around your findings",
        ],
        imageSrc: CLINIC_INTERIOR_IMAGES.lobbyReceptionDeskProducts,
        imageAlt: "ARC Wellness care environment",
      },
      {
        eyebrow: "Outcome",
        title: "Start From Within",
        tagline: "Feeling better often begins here.",
        body: "Supporting gut health may involve nutrition, targeted supplementation, lifestyle changes, and medical treatment when appropriate. The goal isn't to spend your life avoiding food—it's to create an environment where your body can digest, absorb, restore, and function more effectively.",
        bullets: [
          "Nutrition and lifestyle support",
          "Targeted supplementation when indicated",
          "Medical treatment when appropriate",
          "Less guessing. More understanding.",
        ],
        imageSrc: CLINIC_INTERIOR_IMAGES.plantBonsaiWindowSill,
        imageAlt: "Quiet detail in the ARC Wellness clinic",
      },
    ],
  },
  different: {
    title: "Feeling better",
    titleEmphasis: "from within",
    intro:
      "Your gut doesn't exist in isolation. It is part of an interconnected system that influences how you feel, think, nourish, and function every day.",
    backgroundSrc: serviceSharedDarkPlate.src,
    backgroundAlt: "",
    cards: [
      {
        iconSrc: `${ICON}/mind.svg`,
        title: "Beyond Symptoms",
        body: "We look past the obvious to what your gut may be signaling.",
      },
      {
        iconSrc: `${ICON}/book.svg`,
        title: "Understanding First",
        body: "Evaluation before another round of guessing and eliminating.",
      },
      {
        iconSrc: `${ICON}/lotus.svg`,
        title: "Restore Function",
        body: "Create an internal environment that digests and absorbs well.",
      },
      {
        iconSrc: `${ICON}/sun.svg`,
        title: "Whole-Body Links",
        body: "Gut health connected to energy, skin, mood, and more.",
      },
    ],
  },
  experience: {
    title: "Your gut",
    titleEmphasis: "journey",
    steps: [
      {
        iconSrc: `${ICON}/chat.svg`,
        title: "Share",
        body: "Tell us what you're feeling—obvious or unexpected.",
      },
      {
        iconSrc: `${ICON}/book.svg`,
        title: "Evaluate",
        body: "Physician-guided testing to look beneath the surface.",
      },
      {
        iconSrc: `${ICON}/meditation.svg`,
        title: "Personalize",
        body: "A plan built around what your body actually needs.",
      },
      {
        iconSrc: `${ICON}/mind.svg`,
        title: "Restore",
        body: "Nutrition, support, and treatment when appropriate.",
      },
      {
        iconSrc: `${ICON}/calendar-check.svg`,
        title: "Rebuild",
        body: "Rebuilding from the foundation so you feel better from within.",
      },
    ],
  },
  closing: {
    supportingLine:
      "When we understand what's happening beneath the surface, we can begin rebuilding from the foundation.",
  },
};

export const gutHealthHero = gutHealthContent.hero;
