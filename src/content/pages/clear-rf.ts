/**
 * Clear RF: EXION section stack; dedicated hero + temporary EXION plates/icons
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
const CLEAR_RF_ASSET = "/assets/treatments/clear-rf";
/** Bump when replacing Clear RF rasters so next/image + browser drop stale caches. */
const CLEAR_RF_ASSETS_VERSION = "20260730-hero";

function clearRfAsset(file: string) {
  return `${CLEAR_RF_ASSET}/${file}?v=${CLEAR_RF_ASSETS_VERSION}`;
}

export const clearRfContent: ServicePageContent = {
  hero: {
    title: "Clear RF",
    titleEmphasis: "Clearer. Smoother. Healthier-looking skin.",
    titleEmphasisLines: ["Clearer. Smoother.", "Healthier-looking skin."],
    subhead: "Tone. Texture. Clarity that shows.",
    intro:
      "Sometimes it isn't one thing. It's the uneven tone. The visible pores. The redness. The texture that catches the light differently than it used to. The lingering marks that makeup never quite seems to hide. You may not want to change your face at all. You simply want better skin.",
    closingLine: "Beautifully healthy.",
    poweredByEyebrow: "Physician-guided care",
    poweredByIconSrc: `${ICON}/atom.svg`,
    synergyLine: "Refine the surface. Renew beneath it.",
    imageSrc: clearRfAsset("clear-rf-hero.webp"),
    imageAlt:
      "Clinician guiding a radiofrequency handpiece along a relaxed patient's cheek in a warm treatment room",
  },
  pillars: [
    {
      iconSrc: `${ICON}/sun.svg`,
      title: "Tone",
      body: "More even tone and less of the unevenness makeup tries to hide.",
    },
    {
      iconSrc: `${ICON}/lotus.svg`,
      title: "Texture",
      body: "Smoother surface quality that catches the light more kindly.",
    },
    {
      iconSrc: `${ICON}/cell.svg`,
      title: "Clarity",
      body: "Refined pores, less redness, and a clearer, fresher appearance.",
    },
    {
      iconSrc: `${ICON}/mind.svg`,
      title: "Ease",
      body: "Skin that looks beautiful before the makeup ever goes on.",
    },
  ],
  creamPlate: serviceSharedCreamPlate,
  mechanism: {
    titleLines: ["Refine the surface.", "Renew beneath it."],
    body: "Clear RF uses controlled radiofrequency energy to target skin concerns while supporting the natural renewal process below the surface. Treatments can be customized to address uneven tone and texture, enlarged pores, redness, acne and acne-related concerns, fine lines, uneven pigmentation, and overall skin quality. The goal is not to make your skin look treated. It's to make it look healthy.",
    evaluationBullets: [
      "Uneven skin tone and texture",
      "Enlarged pores and redness",
      "Acne and acne-related concerns",
      "Fine lines, pigmentation, and overall quality",
    ],
    imageSrc: CLINIC_INTERIOR_IMAGES.hallwayAccentSeating,
    imageAlt: "Thoughtful clinical environment at ARC Wellness",
  },
  treatments: {
    title: "Skin that looks better",
    titleEmphasis: "without trying so hard",
    intro: "Designed for the details that collectively change how your skin looks and feels.",
    cards: [
      {
        title: "The Details",
        tagline: "Little things. Big difference.",
        body: "Clear RF is designed for the details, the little things that collectively change the way your skin looks and feels: smoother texture, more even tone, refined pores, and a clearer, fresher appearance.",
        bullets: [
          "Smoother texture",
          "More even tone",
          "Refined pores",
          "Clearer, fresher appearance",
        ],
        imageSrc: CLINIC_INTERIOR_IMAGES.consultationLounge,
        imageAlt: "Consultation lounge at ARC Wellness",
      },
      {
        title: "Intentional Care",
        tagline: "Not everything. The right things.",
        body: "At Arc Wellness, aesthetic care isn't about erasing every line, pore, or imperfection. It's about understanding what bothers you and choosing treatments intentionally. Clear RF may be used alone or in a broader skin rejuvenation plan.",
        bullets: [
          "Understand what bothers you",
          "Choose treatments with intention",
          "Stand alone or layered with other tech",
          "The right things, not everything",
        ],
        imageSrc: CLINIC_INTERIOR_IMAGES.waitingRoomArmchairGoldArt,
        imageAlt: "Calm seating at ARC Wellness",
      },
      {
        title: "Let Your Skin Show",
        tagline: "Less covering. More confidence.",
        body: "Less covering. Less correcting. Less thinking about what you'd like to hide. More confidence in the skin that's already yours. Beautiful skin doesn't have to look flawless. It should look beautifully healthy.",
        bullets: [
          "Less covering and correcting",
          "Confidence in your own skin",
          "Healthy over flawless",
          "Skin that shows before makeup",
        ],
        imageSrc: CLINIC_INTERIOR_IMAGES.lobbyReceptionDeskProducts,
        imageAlt: "ARC Wellness care environment",
      },
    ],
  },
  different: {
    title: "Your skin doesn't",
    titleEmphasis: "need to be perfect.",
    intro:
      "Because great skin isn't usually the result of doing everything. It's the result of doing the right things.",
    backgroundSrc: serviceSharedDarkPlate.src,
    backgroundAlt: "",
    cards: [
      {
        iconSrc: `${ICON}/sun.svg`,
        title: "Even Tone",
        body: "Address uneven tone without chasing perfection.",
      },
      {
        iconSrc: `${ICON}/lotus.svg`,
        title: "Smoother Feel",
        body: "Texture that feels kinder to the touch and the light.",
      },
      {
        iconSrc: `${ICON}/cell.svg`,
        title: "Refined Pores",
        body: "Visible pores that look more refined over time.",
      },
      {
        iconSrc: `${ICON}/magnet.svg`,
        title: "Less Redness",
        body: "Support for redness and acne-related concerns.",
      },
      {
        iconSrc: `${ICON}/book.svg`,
        title: "Layered Plans",
        body: "Alone or alongside other rejuvenation technologies.",
      },
      {
        iconSrc: `${ICON}/mind.svg`,
        title: "Healthy Look",
        body: "Treated to look healthy, not to look treated.",
      },
    ],
  },
  experience: {
    title: "Your Clear RF",
    titleEmphasis: "path",
    steps: [
      {
        iconSrc: `${ICON}/chat.svg`,
        title: "Listen",
        body: "Share tone, pores, redness, marks, and what makeup can't hide.",
      },
      {
        iconSrc: `${ICON}/book.svg`,
        title: "Choose",
        body: "Decide whether Clear RF stands alone or layers into a broader plan.",
      },
      {
        iconSrc: `${ICON}/face-device.svg`,
        title: "Treat",
        body: "Controlled radiofrequency tailored to your skin concerns.",
      },
      {
        iconSrc: `${ICON}/lotus.svg`,
        title: "Refine",
        body: "Tone, texture, and clarity continue to improve with care.",
      },
      {
        iconSrc: `${ICON}/calendar-check.svg`,
        title: "Show",
        body: "Skin you're happier to show, with less covering and correcting.",
      },
    ],
  },
  closing: {
    supportingLine:
      "Because beautiful skin doesn't have to look flawless. It should look beautifully healthy.",
  },
};

export const clearRfHero = clearRfContent.hero;
