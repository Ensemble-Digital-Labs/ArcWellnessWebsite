/**
 * EMFACE: EXION / ServiceTemplate section stack; client brief copy.
 * Hero + card art under public/assets/treatments/emface.
 */
import {
  SERVICE_EXION_ICON,
  serviceSharedCreamPlate,
  serviceSharedDarkPlate,
  type ServicePageContent,
} from "@/content/pages/serviceTemplate";

const ICON = SERVICE_EXION_ICON;
const EMFACE_ASSET = "/assets/treatments/emface";
/** Bump when replacing EMFACE rasters so next/image + browser drop stale caches. */
const EMFACE_ASSETS_VERSION = "20260804-hero";

/** Bunny Stream library + video (unlisted embed; restrict domains in Bunny Security). */
const EMFACE_BUNNY_LIBRARY_ID = "710568";
const EMFACE_BUNNY_VIDEO_ID = "9d68453d-ae34-468d-ad58-c10ad25610d5";
const EMFACE_BUNNY_EMBED_BASE = `https://player.mediadelivery.net/embed/${EMFACE_BUNNY_LIBRARY_ID}/${EMFACE_BUNNY_VIDEO_ID}`;

function emfaceAsset(file: string) {
  return `${EMFACE_ASSET}/${file}?v=${EMFACE_ASSETS_VERSION}`;
}

export const emfaceContent: ServicePageContent = {
  hero: {
    title: "EMFACE",
    titleEmphasis: "Lift. Tone. Restore.",
    titleEmphasisLines: ["Lift. Tone. Restore."],
    subhead:
      "The needle-free facial rejuvenation treatment that works with your body's own muscles—not against them.",
    intro:
      "EMFACE is the first non-invasive facial treatment that simultaneously strengthens the muscles that support your face while stimulating collagen and elastin deep within the skin. Instead of simply treating wrinkles, EMFACE restores the natural foundation of a youthful face—creating subtle lifting, improved definition, smoother skin, and healthier aging.",
    closingLine: "No needles. No surgery. No downtime.",
    poweredByEyebrow: "Powered by RF + HIFES™",
    poweredByIconSrc: `${ICON}/battery-energy.svg`,
    synergyLine: "Physical therapy for your face—with collagen production at the same time.",
    imageSrc: emfaceAsset("emface-hero.webp"),
    imageAlt:
      "EMFACE applicator delivering synchronized RF and HIFES facial treatment at ARC Wellness",
    imageObjectClass:
      "object-cover object-[70%_35%] sm:object-[60%_40%] lg:object-center",
    copyMaxClass: "md:max-w-2xl",
  },
  pillars: [
    {
      iconSrc: `${ICON}/bicep.svg`,
      title: "Lift",
      body: "Strengthens facial elevator muscles to naturally lift the cheeks and brows.",
      iconClassName: "origin-center scale-[1.4]",
    },
    {
      iconSrc: `${ICON}/cell.svg`,
      title: "Tighten",
      body: "Stimulates new collagen and elastin for firmer, tighter skin.",
    },
    {
      iconSrc: `${ICON}/lotus.svg`,
      title: "Smooth",
      body: "Softens fine lines and wrinkles by improving skin quality—not freezing expression.",
    },
    {
      iconSrc: `${ICON}/person-sparkle.svg`,
      title: "Restore",
      body: "Enhances natural facial contours while preserving the ability to smile, laugh, and express yourself.",
      iconClassName: "origin-center scale-[1.35]",
    },
  ],
  creamPlate: serviceSharedCreamPlate,
  mechanism: {
    titleLines: ["Beauty starts", "beneath the", "surface"],
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
    /**
     * Bunny Stream embed for the mechanism column (muted loop).
     * Domain allowlist is managed in Bunny Security.
     */
    videoEmbedSrc: `${EMFACE_BUNNY_EMBED_BASE}?autoplay=true&loop=true&muted=true&preload=true&responsive=true`,
    videoTitle: "EMFACE treatment at ARC Wellness",
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
        imageSrc: emfaceAsset("emface-card-facial-concerns.webp"),
        imageAlt:
          "Facial map of EMFACE concerns—forehead, crow's feet, cheeks, and jawline",
        imageObjectClass: "object-[center_32%]",
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
        imageSrc: emfaceAsset("emface-card-why-patients-love.webp"),
        imageAlt: "Comfortable needle-free EMFACE facial session at ARC Wellness",
        imageObjectClass: "object-[center_38%]",
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
        imageSrc: emfaceAsset("emface-card-why-arc-chooses.webp"),
        imageAlt:
          "Natural lift and definition that still looks like you after EMFACE",
        imageObjectClass: "object-[center_28%]",
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
        iconClassName: "origin-center scale-[1.7]",
      },
      {
        iconSrc: `${ICON}/person-sparkle.svg`,
        title: "Natural Looking",
        body: "You still look like you—just refreshed, healthier, and more lifted.",
        iconClassName: "origin-center scale-[1.4]",
      },
      {
        iconSrc: `${ICON}/cell.svg`,
        title: "Builds Over Time",
        body: "Your own collagen, elastin, and muscle keep improving for weeks after treatment.",
        iconClassName: "origin-center scale-[1.1]",
      },
      {
        iconSrc: `${ICON}/meditation.svg`,
        title: "Comfortable",
        body: "A warm facial sensation with gentle muscle contractions—about 20 minutes.",
        iconClassName: "origin-center scale-[1.05]",
      },
      {
        iconSrc: `${ICON}/bicep.svg`,
        title: "Muscle + Skin",
        body: "Strengthens facial support while improving skin quality in the same session.",
        iconClassName: "origin-center scale-[1.45]",
      },
      {
        iconSrc: `${ICON}/sun.svg`,
        title: "Expression Preserved",
        body: "Lift and definition without freezing the face or chasing a different look.",
        iconClassName: "origin-center scale-[1.35]",
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
        iconClassName: "origin-center scale-[1.45]",
      },
      {
        iconSrc: `${ICON}/checklist.svg`,
        title: "Personalized Plan",
        body: "Most patients benefit from four treatments once weekly, with maintenance to preserve results.",
        iconClassName: "origin-center scale-[1.45]",
      },
      {
        iconSrc: `${ICON}/face-device.svg`,
        title: "Comfortable Treatment",
        body: "Relax while synchronized RF and HIFES™ stimulate collagen and strengthen facial muscles.",
        iconClassName: "origin-center scale-[1.4]",
      },
      {
        iconSrc: `${ICON}/sun.svg`,
        title: "Progressive Improvement",
        body: "Many notice changes within several weeks, with continued enhancement as collagen remodels.",
        iconClassName: "origin-center scale-[1.4]",
      },
      {
        iconSrc: `${ICON}/calendar-check.svg`,
        title: "Maintain & Enhance",
        body: "Annual or semiannual maintenance helps support ongoing collagen production and muscle tone.",
        iconClassName: "origin-center scale-[1.45]",
      },
    ],
  },
  closing: {
    supportingLine:
      "Stronger. Lifted. Naturally you. Discover how strengthening the foundation beneath your skin can create natural-looking rejuvenation without needles, surgery, or downtime.",
  },
};

export const emfaceHero = emfaceContent.hero;
