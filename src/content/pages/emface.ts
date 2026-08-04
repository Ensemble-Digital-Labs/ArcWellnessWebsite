/**
 * EMFACE: EXION / ServiceTemplate section stack; client brief copy.
 * Photos reuse medical-spa EmFace assets until a dedicated treatments/emface kit ships.
 */
import { MEDICAL_SPA_NAMED_IMAGES } from "@/content/medicalSpaServiceImages";
import {
  SERVICE_EXION_ICON,
  serviceSharedCreamPlate,
  serviceSharedDarkPlate,
  type ServicePageContent,
} from "@/content/pages/serviceTemplate";

const ICON = SERVICE_EXION_ICON;
/** Bump when replacing EMFACE rasters so next/image + browser drop stale caches. */
const EMFACE_ASSETS_VERSION = "20260804-launch";

function withVersion(src: string) {
  return `${src}?v=${EMFACE_ASSETS_VERSION}`;
}

export const emfaceContent: ServicePageContent = {
  hero: {
    title: "EMFACE",
    titleEmphasis: "Lift. Tone. Restore.",
    titleEmphasisLines: ["Lift. Tone.", "Restore."],
    subhead:
      "The needle-free facial rejuvenation treatment that works with your body's own muscles—not against them.",
    intro:
      "EMFACE is the first non-invasive facial treatment that simultaneously strengthens the muscles that support your face while stimulating collagen and elastin deep within the skin. Instead of simply treating wrinkles, EMFACE restores the natural foundation of a youthful face—creating subtle lifting, improved definition, smoother skin, and healthier aging.",
    closingLine: "No needles. No surgery. No downtime.",
    poweredByEyebrow: "Powered by RF + HIFES™",
    poweredByIconSrc: `${ICON}/atom.svg`,
    synergyLine: "Physical therapy for your face—with collagen production at the same time.",
    imageSrc: withVersion(MEDICAL_SPA_NAMED_IMAGES.emfaceForeheadRedLightTreatment),
    imageAlt:
      "EMFACE forehead applicator delivering synchronized RF and HIFES facial treatment at ARC Wellness",
    imageObjectClass:
      "object-cover object-[70%_35%] sm:object-[60%_40%] lg:object-center",
  },
  pillars: [
    {
      iconSrc: `${ICON}/person-sparkle.svg`,
      title: "Lift",
      body: "Strengthens facial elevator muscles to naturally lift the cheeks and brows.",
    },
    {
      iconSrc: `${ICON}/magnet.svg`,
      title: "Tighten",
      body: "Stimulates new collagen and elastin for firmer, tighter skin.",
    },
    {
      iconSrc: `${ICON}/lotus.svg`,
      title: "Smooth",
      body: "Softens fine lines and wrinkles by improving skin quality—not freezing expression.",
    },
    {
      iconSrc: `${ICON}/cycle-sparkle.svg`,
      title: "Restore",
      body: "Enhances natural facial contours while preserving the ability to smile, laugh, and express yourself.",
    },
  ],
  creamPlate: serviceSharedCreamPlate,
  mechanism: {
    titleLines: ["Beauty starts", "beneath the surface"],
    body: "EMFACE delivers controlled radiofrequency heat into the dermis while HIFES™ technology contracts facial muscles thousands of times during treatment. Together these energies help increase collagen and elastin production, strengthen facial muscles, improve circulation, enhance facial definition, and support healthier aging.",
    stats: [
      {
        value: 37,
        prefix: "+",
        suffix: "%",
        label: "Increase in collagen*",
      },
      {
        value: 30,
        prefix: "+",
        suffix: "%",
        label: "Increase in facial muscle tone*",
      },
      {
        value: 26,
        prefix: "+",
        suffix: "%",
        label: "Reduction in wrinkles*",
      },
      {
        value: 23,
        prefix: "+",
        suffix: "%",
        label: "Improvement in lifting effect*",
      },
    ],
    imageSrc: withVersion(MEDICAL_SPA_NAMED_IMAGES.emfaceCheekApplicatorTreatment),
    imageAlt:
      "EMFACE cheek applicator treatment supporting lift and contour at ARC Wellness",
    imageObjectClass: "object-cover object-[55%_40%] sm:object-center",
    imageAspectClass: "aspect-[4/3] sm:aspect-[3/2]",
  },
  treatments: {
    title: "What can EMFACE",
    titleEmphasis: "treat?",
    intro:
      "Designed for natural lift, smoother skin, and healthier facial aging—without needles.",
    cards: [
      {
        title: "Facial Concerns",
        tagline: "Where support meets skin quality.",
        body: "EMFACE is designed for the areas where facial aging shows as both muscle support and skin quality begin to change.",
        bullets: [
          "Forehead lines and frown lines",
          "Crow's feet and drooping brows",
          "Flattening cheeks and mild jowling",
          "Loss of facial definition and skin laxity",
          "Early signs of aging",
        ],
        imageSrc: withVersion(
          MEDICAL_SPA_NAMED_IMAGES.emfaceBtlConsoleFacialTreatment,
        ),
        imageAlt: "EMFACE BTL console and facial treatment at ARC Wellness",
      },
      {
        title: "Why Patients Love It",
        tagline: "Needle-free. Natural. Comfortable.",
        body: "Most patients describe treatment as a warm facial combined with gentle muscle contractions—about 20 minutes, with no recovery time afterward.",
        bullets: [
          "Completely needle-free—no injections or anesthesia",
          "Natural-looking results that still look like you",
          "Improvements continue developing for weeks after treatment",
          "Comfortable sessions of approximately 20 minutes",
        ],
        imageSrc: withVersion(
          MEDICAL_SPA_NAMED_IMAGES.emfaceForeheadRedLightTreatment,
        ),
        imageAlt: "Comfortable EMFACE facial session at ARC Wellness",
      },
      {
        title: "Why Arc Chooses EMFACE",
        tagline: "Enhance—not change—who you are.",
        body: "At Arc Wellness, we believe facial rejuvenation should enhance—not change—who you are. EMFACE aligns with our philosophy of restoring health before chasing perfection. Rather than masking aging, we strengthen the structures that naturally support a youthful appearance.",
        bullets: [
          "Restore the foundation beneath the skin",
          "Preserve natural expression",
          "Support healthier aging over time",
          "Look like the healthiest version of yourself",
        ],
        imageSrc: withVersion(
          MEDICAL_SPA_NAMED_IMAGES.emfaceCheekApplicatorTreatment,
        ),
        imageAlt: "Physician-guided EMFACE care at ARC Wellness",
      },
    ],
  },
  different: {
    title: "What makes EMFACE",
    titleEmphasis: "different?",
    intro:
      "Unlike treatments that focus only on the skin or temporarily relax muscles, EMFACE treats both the skin and the facial support system—synchronized RF plus HIFES™.",
    backgroundSrc: serviceSharedDarkPlate.src,
    backgroundAlt: "",
    cards: [
      {
        iconSrc: `${ICON}/shield-check.svg`,
        title: "Needle-Free",
        body: "No injections. No anesthesia. No recovery time.",
      },
      {
        iconSrc: `${ICON}/person-sparkle.svg`,
        title: "Natural Looking",
        body: "You still look like you—just refreshed, healthier, and more lifted.",
      },
      {
        iconSrc: `${ICON}/cell.svg`,
        title: "Builds Over Time",
        body: "Your own collagen, elastin, and muscle keep improving for weeks after treatment.",
      },
      {
        iconSrc: `${ICON}/lotus.svg`,
        title: "Comfortable",
        body: "A warm facial sensation with gentle muscle contractions—about 20 minutes.",
      },
      {
        iconSrc: `${ICON}/bicep.svg`,
        title: "Muscle + Skin",
        body: "Strengthens facial support while improving skin quality in the same session.",
      },
      {
        iconSrc: `${ICON}/face-device.svg`,
        title: "Expression Preserved",
        body: "Lift and definition without freezing the face or chasing a different look.",
      },
    ],
  },
  experience: {
    title: "The EMFACE",
    titleEmphasis: "experience",
    steps: [
      {
        iconSrc: `${ICON}/chat.svg`,
        title: "Consultation",
        body: "We evaluate facial anatomy, skin quality, muscle tone, and your aesthetic goals.",
      },
      {
        iconSrc: `${ICON}/checklist.svg`,
        title: "Personalized Plan",
        body: "Most patients benefit from four treatments once weekly, with maintenance to preserve results.",
      },
      {
        iconSrc: `${ICON}/face-device.svg`,
        title: "Comfortable Treatment",
        body: "Relax while synchronized RF and HIFES™ stimulate collagen and strengthen facial muscles.",
      },
      {
        iconSrc: `${ICON}/sun.svg`,
        title: "Progressive Improvement",
        body: "Many notice changes within several weeks, with continued enhancement as collagen remodels.",
      },
      {
        iconSrc: `${ICON}/calendar-check.svg`,
        title: "Maintain & Enhance",
        body: "Annual or semiannual maintenance helps support ongoing collagen production and muscle tone.",
      },
    ],
  },
  closing: {
    supportingLine:
      "Stronger. Lifted. Naturally you. Discover how strengthening the foundation beneath your skin can create natural-looking rejuvenation without needles, surgery, or downtime.",
  },
};

export const emfaceHero = emfaceContent.hero;
