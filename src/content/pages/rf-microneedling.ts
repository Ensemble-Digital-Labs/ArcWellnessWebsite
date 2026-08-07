/**
 * RF Microneedling: EXION section stack; dedicated hero, mechanism, and card art;
 * temporary EXION plates/icons.
 */
import {
  SERVICE_EXION_ICON,
  serviceSharedCreamPlate,
  serviceSharedDarkPlate,
  type ServicePageContent,
} from "@/content/pages/serviceTemplate";

const ICON = SERVICE_EXION_ICON;
const RF_MICRONEEDLING_ASSET = "/assets/treatments/rf-microneedling";
/** Bump when replacing RF Microneedling rasters so next/image + browser drop stale caches. */
const RF_MICRONEEDLING_ASSETS_VERSION = "20260804-cards";

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
    poweredByIconSrc: `${ICON}/consult-desk.svg`,
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
      iconClassName: "origin-center scale-[0.92]",
    },
    {
      iconSrc: `${ICON}/target-rings.svg`,
      title: "Precision",
      body: "Microneedling paired with radiofrequency energy in targeted skin layers.",
      iconClassName: "origin-center scale-[1.15]",
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
      iconClassName: "origin-center scale-[1.35]",
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
    imageSrc: rfMicroneedlingAsset("rf-microneedling-mechanism.webp"),
    imageAlt:
      "RF microneedling handpiece delivering energy into the cheek to stimulate collagen from within",
    imageAspectClass: "aspect-[3/2]",
    imageObjectClass: "object-cover object-[center_38%] scale-[1.01]",
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
        imageSrc: rfMicroneedlingAsset(
          "rf-microneedling-card-custom-concerns.webp",
        ),
        imageAlt:
          "Provider customizing RF microneedling treatment to the patient's skin concerns",
        imageObjectClass: "object-[center_40%]",
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
        imageSrc: rfMicroneedlingAsset(
          "rf-microneedling-card-face-and-body.webp",
        ),
        imageAlt:
          "RF microneedling mapped across face, neck, and shoulder—beyond the jawline",
        imageObjectClass: "object-[center_42%]",
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
        imageSrc: rfMicroneedlingAsset(
          "rf-microneedling-card-results-evolve.webp",
        ),
        imageAlt:
          "Collagen remodeling continues after RF microneedling for smoother, firmer skin over time",
        imageObjectClass: "object-[center_32%]",
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
        iconClassName: "origin-center scale-[1.1]",
      },
      {
        iconSrc: `${ICON}/lotus.svg`,
        title: "Healthy",
        body: "Skin that looks healthy and feels strong.",
        iconClassName: "origin-center scale-[1.45]",
      },
      {
        iconSrc: `${ICON}/sun.svg`,
        title: "Light",
        body: "Texture that reflects light more beautifully.",
        iconClassName: "origin-center scale-[1.35]",
      },
      {
        iconSrc: `${ICON}/person-sparkle.svg`,
        title: "Confidence",
        body: "Wear less. Cover less. Enjoy your skin more.",
        iconClassName: "origin-center scale-[1.4]",
      },
      {
        iconSrc: `${ICON}/atom.svg`,
        title: "From Within",
        body: "Change that starts beneath the surface.",
        iconClassName: "origin-center scale-[1.35]",
      },
      {
        iconSrc: `${ICON}/clock.svg`,
        title: "Over Time",
        body: "Results that continue to evolve after your visit.",
        iconClassName: "origin-center scale-[1.4]",
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
        iconClassName: "origin-center scale-[1.45]",
      },
      {
        iconSrc: `${ICON}/target-rings.svg`,
        title: "Map",
        body: "Customize depth and energy to your concerns and areas.",
        iconClassName: "origin-center scale-[1.4]",
      },
      {
        iconSrc: `${ICON}/face-device.svg`,
        title: "Treat",
        body: "Precision microneedling with radiofrequency in targeted layers.",
        iconClassName: "origin-center scale-[1.4]",
      },
      {
        iconSrc: `${ICON}/cell.svg`,
        title: "Remodel",
        body: "Collagen and elastin continue building in the weeks after.",
        iconClassName: "origin-center scale-[1.1]",
      },
      {
        iconSrc: `${ICON}/person-sparkle.svg`,
        title: "Strengthen",
        body: "Skin that looks smoother, firmer, and more like itself.",
        iconClassName: "origin-center scale-[1.4]",
      },
    ],
  },
  closing: {
    supportingLine:
      "Because sometimes the most beautiful transformation is helping your skin become better at being skin.",
  },
};

export const rfMicroneedlingHero = rfMicroneedlingContent.hero;
