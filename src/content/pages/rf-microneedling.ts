/**
 * RF Microneedling: EXION section stack; dedicated hero + temporary EXION plates/icons
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
const RF_MICRONEEDLING_ASSET = "/assets/treatments/rf-microneedling";
/** Bump when replacing RF Microneedling rasters so next/image + browser drop stale caches. */
const RF_MICRONEEDLING_ASSETS_VERSION = "20260730-hero";

function rfMicroneedlingAsset(file: string) {
  return `${RF_MICRONEEDLING_ASSET}/${file}?v=${RF_MICRONEEDLING_ASSETS_VERSION}`;
}

export const rfMicroneedlingContent: ServicePageContent = {
  hero: {
    title: "RF Microneedling",
    titleEmphasis: "Renew what time has changed.",
    titleEmphasisLines: ["Renew what", "time has changed."],
    subhead: "Collagen. Texture. Strength from within.",
    intro:
      "Skin changes slowly. Collagen declines. Texture becomes less smooth. Fine lines settle in. Skin begins to feel a little less firm, and scars or imperfections may become more noticeable. RF Microneedling works beneath the surface to encourage something your skin already knows how to do: renew itself.",
    closingLine: "Your skin. Just stronger.",
    poweredByEyebrow: "Physician-guided care",
    poweredByIconSrc: `${ICON}/atom.svg`,
    synergyLine: "Stimulate. Remodel. Rebuild.",
    imageSrc: rfMicroneedlingAsset("rf-microneedling-hero.webp"),
    imageAlt:
      "Patient reclining with eyes closed while an RF microneedling handpiece treats the cheek",
  },
  pillars: [
    {
      iconSrc: `${ICON}/cell.svg`,
      title: "Collagen",
      body: "Controlled stimulation that encourages new collagen and elastin from within.",
    },
    {
      iconSrc: `${ICON}/magnet.svg`,
      title: "Precision",
      body: "Microneedling paired with radiofrequency energy in targeted skin layers.",
    },
    {
      iconSrc: `${ICON}/lotus.svg`,
      title: "Renewal",
      body: "Supporting change beneath the surface, not only what you see on top.",
    },
    {
      iconSrc: `${ICON}/sun.svg`,
      title: "Strength",
      body: "Skin that gradually looks smoother, firmer, healthier, and refreshed.",
    },
  ],
  creamPlate: serviceSharedCreamPlate,
  mechanism: {
    titleLines: ["Collagen,", "reawakened."],
    body: "RF Microneedling combines precision microneedling with radiofrequency energy delivered into targeted layers of the skin. This controlled stimulation activates the body's natural healing response, encouraging new collagen and elastin, the building blocks that help skin look firmer, smoother, and more resilient. Rather than simply treating what you see on the surface, we're supporting change from within the skin itself.",
    evaluationBullets: [
      "Fine lines and wrinkles",
      "Skin laxity and crepey texture",
      "Uneven texture and enlarged pores",
      "Acne scars and overall skin quality",
    ],
    imageSrc: CLINIC_INTERIOR_IMAGES.hallwayAccentSeating,
    imageAlt: "Thoughtful clinical environment at ARC Wellness",
  },
  treatments: {
    title: "One treatment.",
    titleEmphasis: "Many possibilities",
    intro: "Customized for face and body where renewed firmness and texture are desired.",
    cards: [
      {
        title: "Custom Concerns",
        tagline: "Your skin. Your plan.",
        body: "RF Microneedling can be customized to improve fine lines and wrinkles, skin laxity, uneven texture, acne scars, enlarged pores, crepey skin, and overall skin quality.",
        bullets: [
          "Fine lines and wrinkles",
          "Laxity and crepey skin",
          "Texture, pores, and scars",
          "Overall skin quality",
        ],
        imageSrc: CLINIC_INTERIOR_IMAGES.consultationLounge,
        imageAlt: "Consultation lounge at ARC Wellness",
      },
      {
        title: "Face and Body",
        tagline: "Beyond the jawline.",
        body: "Because skin concerns don't stop at the jawline, treatment can be used on areas of the face and body where renewed firmness and texture are desired.",
        bullets: [
          "Face and body options",
          "Firmness where you want it",
          "Texture renewal beyond the face",
          "Plan matched to your concerns",
        ],
        imageSrc: CLINIC_INTERIOR_IMAGES.lobbyReceptionDeskProducts,
        imageAlt: "ARC Wellness care environment",
      },
      {
        title: "Results That Evolve",
        tagline: "Not overnight. Over time.",
        body: "RF Microneedling isn't about creating an overnight transformation. As your skin produces new collagen and remodels existing tissue, improvements continue to develop over the weeks and months that follow treatment.",
        bullets: [
          "Collagen builds after treatment",
          "Remodeling continues for weeks",
          "Smoother, firmer, healthier look",
          "Your features stay yours",
        ],
        imageSrc: CLINIC_INTERIOR_IMAGES.plantBonsaiWindowSill,
        imageAlt: "Quiet detail in the ARC Wellness clinic",
      },
    ],
  },
  different: {
    title: "Don't cover it.",
    titleEmphasis: "Rebuild it.",
    intro:
      "Beautiful skin isn't defined by perfection. It's skin that looks healthy. Feels strong. Reflects light beautifully. And gives you the confidence to wear less, cover less, and simply enjoy it more.",
    backgroundSrc: serviceSharedDarkPlate.src,
    backgroundAlt: "",
    cards: [
      {
        iconSrc: `${ICON}/cell.svg`,
        title: "Rebuild",
        body: "Support collagen and elastin instead of only covering the surface.",
      },
      {
        iconSrc: `${ICON}/lotus.svg`,
        title: "Healthy",
        body: "Skin that looks healthy and feels strong.",
      },
      {
        iconSrc: `${ICON}/sun.svg`,
        title: "Light",
        body: "Texture that reflects light more beautifully.",
      },
      {
        iconSrc: `${ICON}/mind.svg`,
        title: "Confidence",
        body: "Wear less. Cover less. Enjoy your skin more.",
      },
      {
        iconSrc: `${ICON}/magnet.svg`,
        title: "From Within",
        body: "Change that starts beneath the surface.",
      },
      {
        iconSrc: `${ICON}/calendar-check.svg`,
        title: "Over Time",
        body: "Results that continue to evolve after your visit.",
      },
    ],
  },
  experience: {
    title: "Your RF Microneedling",
    titleEmphasis: "journey",
    steps: [
      {
        iconSrc: `${ICON}/chat.svg`,
        title: "Consult",
        body: "Share texture, firmness, scars, and the skin you want to rebuild.",
      },
      {
        iconSrc: `${ICON}/book.svg`,
        title: "Map",
        body: "Customize depth and energy to your concerns and areas.",
      },
      {
        iconSrc: `${ICON}/face-device.svg`,
        title: "Treat",
        body: "Precision microneedling with radiofrequency in targeted layers.",
      },
      {
        iconSrc: `${ICON}/cell.svg`,
        title: "Remodel",
        body: "Collagen and elastin continue building in the weeks after.",
      },
      {
        iconSrc: `${ICON}/calendar-check.svg`,
        title: "Strengthen",
        body: "Skin that looks smoother, firmer, and more like itself.",
      },
    ],
  },
  closing: {
    supportingLine:
      "Because sometimes the most beautiful transformation is helping your skin become better at being skin.",
  },
};

export const rfMicroneedlingHero = rfMicroneedlingContent.hero;
