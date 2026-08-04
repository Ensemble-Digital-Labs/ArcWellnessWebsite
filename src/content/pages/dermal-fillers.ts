/**
 * Dermal Fillers: EXION / ServiceTemplate section stack; client brief copy.
 * Lives at `/treatments/rha` (existing slug) until a dedicated fillers asset kit ships.
 */
import { CLINIC_INTERIOR_IMAGES } from "@/content/clinicInteriorImages";
import {
  SERVICE_EXION_ICON,
  serviceSharedCreamPlate,
  serviceSharedDarkPlate,
  type ServicePageContent,
} from "@/content/pages/serviceTemplate";

const ICON = SERVICE_EXION_ICON;
const NEUROMODULATORS_ASSET = "/assets/treatments/neuromodulators";
/** Bump when replacing dermal filler rasters so next/image + browser drop stale caches. */
const DERMAL_FILLERS_ASSETS_VERSION = "20260804-launch";

function fillerAsset(file: string) {
  return `${NEUROMODULATORS_ASSET}/${file}?v=${DERMAL_FILLERS_ASSETS_VERSION}`;
}

export const dermalFillersContent: ServicePageContent = {
  hero: {
    title: "Dermal Fillers",
    titleEmphasis: "Restore. Support. Enhance.",
    titleEmphasisLines: ["Restore. Support.", "Enhance."],
    subhead:
      "Natural-looking volume restoration designed to complement your features—not change them.",
    intro:
      "As we age, we lose more than collagen. We gradually lose bone support, facial fat, collagen, elastin, and hydration. These changes can cause the cheeks to flatten, under-eyes to hollow, lips to thin, and the jawline to lose definition. Dermal fillers are designed to replace that lost structural support—restoring balance, contour, and youthful proportions while preserving the features that make you uniquely you.",
    closingLine: "You should look refreshed—not different.",
    poweredByEyebrow: "Physician-guided care",
    poweredByIconSrc: `${ICON}/atom.svg`,
    synergyLine: "Thoughtful restoration—not transformation.",
    imageSrc: fillerAsset("neuromodulators-hero.webp"),
    imageAlt:
      "Physician-guided facial aesthetic consultation and treatment at ARC Wellness",
    imageObjectClass:
      "object-cover object-[72%_35%] sm:object-[65%_40%] lg:object-center",
  },
  pillars: [
    {
      iconSrc: `${ICON}/shield-check.svg`,
      title: "Bone",
      body: "Facial bones naturally lose volume and support over time.",
    },
    {
      iconSrc: `${ICON}/droplet.svg`,
      title: "Fat",
      body: "Protective fat pads shrink and shift downward.",
    },
    {
      iconSrc: `${ICON}/cell.svg`,
      title: "Collagen",
      body: "The skin becomes thinner and less resilient.",
    },
    {
      iconSrc: `${ICON}/lotus.svg`,
      title: "Hydration",
      body: "Hyaluronic acid decreases, leading to drier, less supple skin.",
    },
  ],
  creamPlate: serviceSharedCreamPlate,
  mechanism: {
    titleLines: ["Aging happens", "in layers"],
    body: "Wrinkles are only part of the story. Facial aging occurs because multiple structures beneath the skin change over time. When bone, fat, collagen, and hydration change together, the face can appear tired, hollow, or less defined. Most modern fillers are made from hyaluronic acid (HA)—a naturally occurring substance that attracts water and provides hydration, structure, and support. When carefully placed by an experienced medical provider, fillers restore youthful contours while maintaining natural facial movement and expression.",
    evaluationBullets: [
      "Facial bones lose volume and support",
      "Protective fat pads shrink and shift",
      "Collagen thins; skin becomes less resilient",
      "Hyaluronic acid declines; skin feels less supple",
      "Dermal fillers restore support where it has been lost",
    ],
    imageSrc: CLINIC_INTERIOR_IMAGES.consultationLounge,
    imageAlt: "Thoughtful consultation environment at ARC Wellness",
  },
  treatments: {
    title: "What fillers can",
    titleEmphasis: "improve",
    intro:
      "Subtle, carefully placed restoration for balance, contour, and harmony—without looking overdone.",
    cards: [
      {
        title: "Common Treatment Areas",
        tagline: "Support where time has changed.",
        body: "Fillers can restore cheek volume, define the jawline, soften smile and marionette lines, refresh under-eyes, enhance lips, improve chin projection, and support overall facial symmetry.",
        bullets: [
          "Cheeks, temples, and under-eyes",
          "Lips, chin, and jawline",
          "Smile lines and marionette lines",
          "Pre-jowl sulcus and facial balance",
        ],
        imageSrc: CLINIC_INTERIOR_IMAGES.waitingRoomArmchairGoldArt,
        imageAlt: "Calm seating at ARC Wellness",
      },
      {
        title: "Why Patients Choose Fillers",
        tagline: "Immediate. Natural. Minimal downtime.",
        body: "Most improvements are visible immediately following treatment. Subtle enhancements preserve facial expression and individuality, and most patients return to normal activities the same day.",
        bullets: [
          "Immediate visible improvement",
          "Natural appearance that still looks like you",
          "Minimal downtime for most patients",
          "Results often last 6–18 months depending on product and area",
        ],
        imageSrc: CLINIC_INTERIOR_IMAGES.lobbyReceptionDeskProducts,
        imageAlt: "ARC Wellness care environment",
      },
      {
        title: "Not Every Face Needs Filler",
        tagline: "The right plan—not more product.",
        body: "One of the most common misconceptions in aesthetics is that every sign of aging should be treated with filler. Volume loss is only one piece of facial aging. Sometimes skin laxity responds better to RF Microneedling. Sometimes EMFACE can restore muscle support. Sometimes collagen stimulation through EXION is the better first step. And sometimes nutrition, sleep, and hormone health are contributing more than patients realize.",
        bullets: [
          "RF Microneedling for skin laxity",
          "EMFACE for muscle support and lift",
          "EXION for collagen stimulation",
          "Lifestyle and longevity factors when they matter most",
        ],
        imageSrc: CLINIC_INTERIOR_IMAGES.hallwayAccentSeating,
        imageAlt: "Clinical pathway environment at ARC Wellness",
      },
    ],
  },
  different: {
    title: "Why Arc takes a",
    titleEmphasis: "different approach",
    intro:
      "We don't believe more filler creates better results. Our goal is thoughtful restoration—not transformation. Every treatment begins with a comprehensive facial assessment.",
    backgroundSrc: serviceSharedDarkPlate.src,
    backgroundAlt: "",
    cards: [
      {
        iconSrc: `${ICON}/target-rings.svg`,
        title: "Facial Balance",
        body: "We evaluate how every feature works together—not isolated wrinkles alone.",
      },
      {
        iconSrc: `${ICON}/checklist.svg`,
        title: "Full Assessment",
        body: "Proportions, bone structure, volume loss, skin quality, muscle activity, and long-term aging patterns.",
      },
      {
        iconSrc: `${ICON}/book.svg`,
        title: "Right Tool First",
        body: "Sometimes filler is best. Sometimes RF, EMFACE, or EXION is the better first step.",
      },
      {
        iconSrc: `${ICON}/cycle-sparkle.svg`,
        title: "Strategic Combinations",
        body: "The most natural results often come from combining treatments—not relying on filler alone.",
      },
      {
        iconSrc: `${ICON}/person-sparkle.svg`,
        title: "Still You",
        body: "Restore what time has changed. Not create someone new.",
      },
      {
        iconSrc: `${ICON}/shield-plus.svg`,
        title: "Fillers vs Biostimulators",
        body: "HA fillers replace volume now; biostimulators build collagen gradually for longer remodeling.",
      },
    ],
  },
  experience: {
    title: "Your treatment",
    titleEmphasis: "experience",
    steps: [
      {
        iconSrc: `${ICON}/chat.svg`,
        title: "Consultation",
        body: "We discuss your goals and perform a comprehensive facial assessment.",
      },
      {
        iconSrc: `${ICON}/checklist.svg`,
        title: "Personalized Plan",
        body: "Every injection plan is customized based on your anatomy—not trends.",
      },
      {
        iconSrc: `${ICON}/face-device.svg`,
        title: "Precision Placement",
        body: "Advanced injection techniques help maximize safety while creating natural, balanced results.",
      },
      {
        iconSrc: `${ICON}/calendar-check.svg`,
        title: "Follow-Up",
        body: "We reassess your results and make small refinements when appropriate.",
      },
      {
        iconSrc: `${ICON}/cycle-sparkle.svg`,
        title: "Maintenance",
        body: "Because aging is ongoing, periodic touch-ups help maintain a refreshed appearance over time.",
      },
    ],
  },
  closing: {
    supportingLine:
      "Beautiful results begin with balance. At Arc Wellness, filler isn't about changing your face—it's about restoring the structure, support, and confidence that naturally evolve over time.",
  },
};

export const dermalFillersHero = dermalFillersContent.hero;
