/**
 * Brain Health: EXION section stack; dedicated hero + temporary EXION plates/icons
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
const BRAIN_HEALTH_ASSET = "/assets/treatments/brain-health";
/** Bump when replacing Brain Health rasters so next/image + browser drop stale caches. */
const BRAIN_HEALTH_ASSETS_VERSION = "20260730-hero";

function brainHealthAsset(file: string) {
  return `${BRAIN_HEALTH_ASSET}/${file}?v=${BRAIN_HEALTH_ASSETS_VERSION}`;
}

export const brainHealthContent: ServicePageContent = {
  hero: {
    title: "Brain Health",
    titleEmphasis: "When your mind shifts.",
    titleEmphasisLines: ["When your", "mind shifts."],
    subhead: "Clarity. Focus. Presence restored.",
    intro:
      "You walk into a room and forget why. A familiar word suddenly feels just out of reach. Focus takes more effort. Mental energy fades faster than it used to. Maybe it's brain fog. Maybe it's stress, hormones, poor sleep, or something you can't quite name. At Arc Wellness, we don't dismiss those changes. We get curious about them.",
    closingLine: "The brain is part of the whole-body story.",
    poweredByEyebrow: "Physician-guided care",
    poweredByIconSrc: `${ICON}/atom.svg`,
    synergyLine: "Support today. Protect tomorrow.",
    imageSrc: brainHealthAsset("brain-health-hero.webp"),
    imageAlt:
      "Glowing anatomical brain sculpture on a marble table in a warm, sunlit ARC Wellness room",
    // Brain sits lower-right: anchor the zoom to the bottom-right so it lifts into the
    // empty right half instead of sitting low under the copy.
    imageObjectClass:
      "object-cover object-[82%_center] origin-[78%_100%] scale-[1.06] md:object-[70%_center] md:scale-[1.12] lg:object-[64%_center] lg:scale-[1.16]",
  },
  pillars: [
    {
      iconSrc: `${ICON}/brain.svg`,
      title: "Clarity",
      body: "Fog, forgotten words, and slower recall deserve a thoughtful look.",
    },
    {
      iconSrc: `${ICON}/mind.svg`,
      title: "Focus",
      body: "When attention takes more effort, we explore what may be influencing it.",
    },
    {
      iconSrc: `${ICON}/lotus.svg`,
      title: "Calm",
      body: "Stress, sleep, and mood often sit alongside cognitive changes.",
    },
    {
      iconSrc: `${ICON}/cell.svg`,
      title: "Connection",
      body: "Hormones, blood sugar, gut, and inflammation all speak to the brain.",
    },
  ],
  creamPlate: serviceSharedCreamPlate,
  mechanism: {
    titleLines: ["Your brain is", "connected to", "everything"],
    body: "Brain health doesn't begin and end with the brain. Hormones, blood sugar, inflammation, cardiovascular health, nutrient status, sleep, stress, and gut health can all influence the way you think, feel, focus, and function. Through physician consultation and comprehensive testing, we look for patterns, then create a personalized strategy for how your brain feels today and how we protect it for tomorrow.",
    evaluationBullets: [
      "Hormonal and metabolic health",
      "Inflammation and cardiovascular / vascular risk",
      "Nutrient status and gut health",
      "Sleep, stress, lifestyle, and family history",
    ],
    imageSrc: CLINIC_INTERIOR_IMAGES.hallwayAccentSeating,
    imageAlt: "Calm ARC Wellness interior for thoughtful care",
  },
  treatments: {
    title: "Support the brain.",
    titleEmphasis: "Strengthen the mind.",
    intro: "Personalized strategies, and advanced therapies when they fit.",
    cards: [
      {
        title: "Connected Systems",
        tagline: "Look beyond the obvious.",
        body: "Improving cognitive wellness often means looking beyond the brain alone. We evaluate the systems that influence how you think, feel, and stay present.",
        bullets: [
          "Hormones and metabolism",
          "Inflammation and vascular health",
          "Gut, nutrients, sleep, and stress",
          "A plan for today and tomorrow",
        ],
        imageSrc: CLINIC_INTERIOR_IMAGES.waitingRoomArmchairGoldArt,
        imageAlt: "Calm seating at ARC Wellness",
      },
      {
        title: "Personalized Support",
        tagline: "Nutrition. Lifestyle. Optimization.",
        body: "Your plan may include nutrition, supplementation, hormone or metabolic optimization, lifestyle strategies, and advanced therapies when appropriate.",
        bullets: [
          "Nutrition and supplementation",
          "Hormone or metabolic optimization",
          "Lifestyle strategies that stick",
          "Advanced therapies when indicated",
        ],
        imageSrc: CLINIC_INTERIOR_IMAGES.lobbyReceptionDeskProducts,
        imageAlt: "ARC Wellness care environment",
      },
      {
        title: "ExoMind™",
        tagline: "When it complements the plan.",
        body: "For some patients, technologies such as ExoMind™ may complement the broader plan by supporting areas associated with mood, focus, and emotional wellness.",
        bullets: [
          "Supports mood and focus pathways",
          "Complements whole-body care",
          "Used when clinically appropriate",
          "Brain health is more than memory",
        ],
        imageSrc: CLINIC_INTERIOR_IMAGES.ivTherapyReclinerRoom,
        imageAlt: "Supportive therapy environment at ARC Wellness",
      },
    ],
  },
  different: {
    title: "Protect what",
    titleEmphasis: "makes you, you",
    intro:
      "Your memories. Your clarity. Your independence. Your ability to connect, create, laugh, learn, and experience the people and moments that matter. Caring for your brain isn't something that has to begin later in life.",
    backgroundSrc: serviceSharedDarkPlate.src,
    backgroundAlt: "",
    cards: [
      {
        iconSrc: `${ICON}/mind.svg`,
        title: "We Get Curious",
        body: "Changes aren't dismissed. They're investigated with care.",
      },
      {
        iconSrc: `${ICON}/cell.svg`,
        title: "Whole-Body Story",
        body: "Hormones, metabolism, gut, sleep, and the brain together.",
      },
      {
        iconSrc: `${ICON}/lotus.svg`,
        title: "Engaged & Present",
        body: "Staying capable, connected, and fully present in your life.",
      },
      {
        iconSrc: `${ICON}/sun.svg`,
        title: "Protect Early",
        body: "The best time to protect your future is while you're living it.",
      },
    ],
  },
  experience: {
    title: "Your brain",
    titleEmphasis: "path",
    steps: [
      {
        iconSrc: `${ICON}/chat.svg`,
        title: "Listen",
        body: "Share the fog, the forgotten words, the fading mental energy.",
      },
      {
        iconSrc: `${ICON}/book.svg`,
        title: "Evaluate",
        body: "Testing and consultation to find patterns influencing cognition.",
      },
      {
        iconSrc: `${ICON}/meditation.svg`,
        title: "Personalize",
        body: "A strategy for how your brain feels today, and tomorrow.",
      },
      {
        iconSrc: `${ICON}/mind.svg`,
        title: "Support",
        body: "Nutrition, lifestyle, optimization, and therapies when appropriate.",
      },
      {
        iconSrc: `${ICON}/calendar-check.svg`,
        title: "Protect",
        body: "Ongoing care to stay engaged, capable, and present.",
      },
    ],
  },
  closing: {
    supportingLine:
      "The best time to protect your future is while you're living it.",
  },
};

export const brainHealthHero = brainHealthContent.hero;
