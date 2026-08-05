/**
 * Dermal Fillers: EXION / ServiceTemplate section stack; client brief copy.
 * Route: `/treatments/dermal-fillers` (legacy `/treatments/rha` redirects here).
 * Hero, mechanism, and card art under public/assets/treatments/dermal-fillers.
 */
import {
  SERVICE_EXION_ICON,
  serviceSharedCreamPlate,
  serviceSharedDarkPlate,
  type ServicePageContent,
} from "@/content/pages/serviceTemplate";

const ICON = SERVICE_EXION_ICON;
const DERMAL_FILLERS_ASSET = "/assets/treatments/dermal-fillers";
/** Bump when replacing dermal filler rasters so next/image + browser drop stale caches. */
const DERMAL_FILLERS_ASSETS_VERSION = "20260804-hero";

function dermalFillersAsset(file: string) {
  return `${DERMAL_FILLERS_ASSET}/${file}?v=${DERMAL_FILLERS_ASSETS_VERSION}`;
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
    imageSrc: dermalFillersAsset("dermal-fillers-hero.webp"),
    imageAlt:
      "Physician-guided dermal filler treatment restoring natural facial support at ARC Wellness",
    imageObjectClass:
      "object-cover object-[72%_35%] sm:object-[65%_40%] lg:object-center",
    copyMaxClass: "md:max-w-2xl",
  },
  pillars: [
    {
      iconSrc: `${ICON}/dumbbell.svg`,
      title: "Bone",
      body: "Facial bones naturally lose volume and support over time.",
      iconClassName: "origin-center scale-[2.45] object-center translate-y-[8%]",
    },
    {
      iconSrc: `${ICON}/waist-contour.svg`,
      title: "Fat",
      body: "Protective fat pads shrink and shift downward.",
      iconClassName:
        "origin-center scale-[2.35] object-center translate-x-[2%] translate-y-[8%]",
    },
    {
      iconSrc: `${ICON}/cell.svg`,
      title: "Collagen",
      body: "The skin becomes thinner and less resilient.",
    },
    {
      iconSrc: `${ICON}/droplet.svg`,
      title: "Hydration",
      body: "Hyaluronic acid decreases, leading to drier, less supple skin.",
      iconClassName: "origin-center scale-[1.55]",
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
    imageSrc: dermalFillersAsset("dermal-fillers-mechanism.webp"),
    imageAlt:
      "Provider assessing facial support layers—bone, fat, collagen, and hydration—before dermal filler placement",
    imageAspectClass: "aspect-[3/2]",
    imageObjectClass: "object-cover object-[center_32%] scale-[1.01]",
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
        imageSrc: dermalFillersAsset(
          "dermal-fillers-card-treatment-areas.webp",
        ),
        imageAlt:
          "Facial map highlighting common filler areas—cheeks, under-eyes, lips, chin, and jawline",
        imageObjectClass: "object-[center_32%]",
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
        imageSrc: dermalFillersAsset(
          "dermal-fillers-card-why-patients-choose.webp",
        ),
        imageAlt:
          "Naturally refreshed appearance after thoughtful dermal filler treatment",
        imageObjectClass: "object-[center_28%]",
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
        imageSrc: dermalFillersAsset(
          "dermal-fillers-card-not-every-face.webp",
        ),
        imageAlt:
          "Provider reviewing a facial plan with a patient—choosing the right approach, not more product",
        imageObjectClass: "object-[center_40%]",
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
        iconClassName: "origin-center scale-[1.4]",
      },
      {
        iconSrc: `${ICON}/consult-desk.svg`,
        title: "Full Assessment",
        body: "Proportions, bone structure, volume loss, skin quality, muscle activity, and long-term aging patterns.",
        iconClassName: "origin-center scale-[1.4]",
      },
      {
        iconSrc: `${ICON}/checklist.svg`,
        title: "Right Tool First",
        body: "Sometimes filler is best. Sometimes RF, EMFACE, or EXION is the better first step.",
        iconClassName: "origin-center scale-[1.45]",
      },
      {
        iconSrc: `${ICON}/cycle-sparkle.svg`,
        title: "Strategic Combinations",
        body: "The most natural results often come from combining treatments—not relying on filler alone.",
        iconClassName: "origin-center scale-[1.35]",
      },
      {
        iconSrc: `${ICON}/person-sparkle.svg`,
        title: "Still You",
        body: "Restore what time has changed. Not create someone new.",
        iconClassName: "origin-center scale-[1.4]",
      },
      {
        iconSrc: `${ICON}/molecule.svg`,
        title: "Fillers vs Biostimulators",
        body: "HA fillers replace volume now; biostimulators build collagen gradually for longer remodeling.",
        iconClassName: "origin-center scale-[1.45]",
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
        iconClassName: "origin-center scale-[1.45]",
      },
      {
        iconSrc: `${ICON}/checklist.svg`,
        title: "Personalized Plan",
        body: "Every injection plan is customized based on your anatomy—not trends.",
        iconClassName: "origin-center scale-[1.45]",
      },
      {
        iconSrc: `${ICON}/target-rings.svg`,
        title: "Precision Placement",
        body: "Advanced injection techniques help maximize safety while creating natural, balanced results.",
        iconClassName: "origin-center scale-[1.45]",
      },
      {
        iconSrc: `${ICON}/calendar-check.svg`,
        title: "Follow-Up",
        body: "We reassess your results and make small refinements when appropriate.",
        iconClassName: "origin-center scale-[1.45]",
      },
      {
        iconSrc: `${ICON}/cycle-sparkle.svg`,
        title: "Maintenance",
        body: "Because aging is ongoing, periodic touch-ups help maintain a refreshed appearance over time.",
        iconClassName: "origin-center scale-[1.4]",
      },
    ],
  },
  closing: {
    supportingLine:
      "Beautiful results begin with balance. At Arc Wellness, filler isn't about changing your face—it's about restoring the structure, support, and confidence that naturally evolve over time.",
  },
};

export const dermalFillersHero = dermalFillersContent.hero;
