import { CLINIC_INTERIOR_ALT, CLINIC_INTERIOR_IMAGES } from "@/content/clinicInteriorImages";
import { MEDICAL_SPA_NAMED_IMAGES } from "@/content/medicalSpaServiceImages";
import { RETAIL_IMAGES } from "@/content/retailImages";

export const aboutPage = {
  seo: {
    title: "About Arc Wellness | Physician-Led Wellness in St. Louis",
    description:
      "Mission, values, and founder story—whole-person wellness combining medical expertise, innovation, and restorative therapies.",
  },
  hero: {
    eyebrow: "Our story",
    title: "The Arc Toward",
    titleEmphasis: "Lifelong Vitality",
    paragraphs: [
      "Every movement begins with a moment of clarity—a question that refuses to be ignored.",
      "Arc Wellness began as a question Dr. Jabbar couldn’t stop asking: “Why do so many people who follow medical advice still feel unwell?”",
      "The answer, he realized, lay in patients’ willingness to heal—supported by guidance, care, and human connection.",
    ],
  },
  clinicTour: {
    eyebrow: "The space",
    title: "Designed for calm",
    titleEmphasis: "before care begins",
    slides: [
      {
        src: CLINIC_INTERIOR_IMAGES.heroExteriorSunset,
        alt: CLINIC_INTERIOR_ALT.heroExteriorSunset,
        label: "01 / Arrival",
        caption: "A calm entry point before you ever step inside.",
      },
      {
        src: CLINIC_INTERIOR_IMAGES.receptionBacklitLogoWall,
        alt: CLINIC_INTERIOR_ALT.receptionBacklitLogoWall,
        label: "02 / Reception",
        caption: "Your team greets you by name—not by appointment number.",
      },
      {
        src: CLINIC_INTERIOR_IMAGES.receptionFacadeWideSeating,
        alt: CLINIC_INTERIOR_ALT.receptionFacadeWideSeating,
        label: "03 / Welcome lounge",
        caption: "Gold accents, soft seating, and space to settle in.",
      },
      {
        src: CLINIC_INTERIOR_IMAGES.lobbyReceptionDeskProducts,
        alt: CLINIC_INTERIOR_ALT.lobbyReceptionDeskProducts,
        label: "04 / Front desk",
        caption: "Check-in, questions, and curated products within reach.",
      },
      {
        src: CLINIC_INTERIOR_IMAGES.receptionGreenWallSaltLampDoorway,
        alt: CLINIC_INTERIOR_ALT.receptionGreenWallSaltLampDoorway,
        label: "05 / Welcome console",
        caption: "Brochures, plants, and a doorway into quieter rooms.",
      },
      {
        src: CLINIC_INTERIOR_IMAGES.waitingRoomArmchairGoldArt,
        alt: CLINIC_INTERIOR_ALT.waitingRoomArmchairGoldArt,
        label: "06 / Waiting nook",
        caption: "A private moment before your consultation begins.",
      },
      {
        src: CLINIC_INTERIOR_IMAGES.consultationLounge,
        alt: CLINIC_INTERIOR_ALT.consultationLounge,
        label: "07 / Consultation lounge",
        caption: "Unhurried conversations in a quiet, residential setting.",
      },
      {
        src: CLINIC_INTERIOR_IMAGES.hallwayAccentSeating,
        alt: CLINIC_INTERIOR_ALT.hallwayAccentSeating,
        label: "08 / Welcome path",
        caption: "Warm light and intentional details from the moment you arrive.",
      },
      {
        src: CLINIC_INTERIOR_IMAGES.hallwayDaxxifyBannerWaveArt,
        alt: CLINIC_INTERIOR_ALT.hallwayDaxxifyBannerWaveArt,
        label: "09 / Main hallway",
        caption: "Calm corridors that connect every part of your visit.",
      },
      {
        src: CLINIC_INTERIOR_IMAGES.ivTherapyReclinerRoom,
        alt: CLINIC_INTERIOR_ALT.ivTherapyReclinerRoom,
        label: "10 / IV therapy lounge",
        caption: "Restorative infusions with natural light and privacy.",
      },
      {
        src: MEDICAL_SPA_NAMED_IMAGES.emsellaBtlChairRoom,
        alt: "ARC Wellness EmSella treatment room with BTL chair and forest-green walls",
        label: "11 / Pelvic wellness suite",
        caption: "FDA-cleared technology in a discreet, comfortable room.",
      },
      {
        src: MEDICAL_SPA_NAMED_IMAGES.emsculptNeoVanityRoomConsole,
        alt: "ARC Wellness EmSculpt Neo treatment room with BTL console and vanity lighting",
        label: "12 / Body sculpting room",
        caption: "Performance devices in a polished, clinical environment.",
      },
      {
        src: MEDICAL_SPA_NAMED_IMAGES.exomindPromotionalDisplayCounter,
        alt: "ARC Wellness ExoMind promotional display and treatment counter",
        label: "13 / Neuro wellness",
        caption: "Brain-health technology with the same calm design language.",
      },
      {
        src: RETAIL_IMAGES.injectionBarMenuDisplay,
        alt: "ARC Wellness injection bar menu display with treatment pricing",
        label: "14 / Injection bar",
        caption: "Transparent menus and physician-led aesthetic care.",
      },
      {
        src: CLINIC_INTERIOR_IMAGES.retailKneskoSkinProductDisplay,
        alt: CLINIC_INTERIOR_ALT.retailKneskoSkinProductDisplay,
        label: "15 / Curated skincare",
        caption: "Physician-selected KNESKO products to extend your results at home.",
      },
      {
        src: RETAIL_IMAGES.arcSupplementShelvingUnits,
        alt: "ARC Wellness supplement shelving with physician-curated wellness protocols",
        label: "16 / Wellness retail",
        caption: "Supplements and protocols chosen to support your plan.",
      },
      {
        src: CLINIC_INTERIOR_IMAGES.plantBonsaiWindowSill,
        alt: CLINIC_INTERIOR_ALT.plantBonsaiWindowSill,
        label: "17 / Restorative details",
        caption: "Small touches—plants, light, and calm—that add up to how you feel.",
      },
      {
        src: CLINIC_INTERIOR_IMAGES.heroReceptionInterior,
        alt: CLINIC_INTERIOR_ALT.heroReceptionInterior,
        label: "18 / The Arc experience",
        caption: "Every room designed so care feels intentional, not rushed.",
      },
    ],
  },
  mission: {
    title: "Our Mission",
    subtitle: "Vitality, powered by science and care",
    body: "Our goal is to bridge the gap between traditional medicine and transformative wellness—uniting medical expertise, modern innovation, and restorative therapies to deliver results that elevate your body, mind, and core.",
  },
  vision: {
    title: "Our Vision",
    subtitle: "Wellness that lasts a lifetime",
    body: "We aim to build a connected Arc community where every member is physically well, emotionally resilient, and mentally thriving.",
  },
  values: {
    eyebrow: "Our values",
    title: "The values that shape",
    titleEmphasis: "Arc Wellness",
    intro: "Our values shape every choice we make—from how we listen to how we treat.",
    items: [
      {
        title: "Prevention Over Reaction",
        body: "The best healthcare happens before you need it. By building resilience early, we help you develop a body and mind capable of weathering the years ahead.",
      },
      {
        title: "Integrity in Care",
        body: "We are medical professionals first. Every treatment and recommendation is rooted in ethics and evidence—we promise transparency about what you need and what you don’t.",
      },
      {
        title: "Innovation with Purpose",
        body: "We select high-performance tools that solve real problems—not gadgets for show. The goal is simple: use the best technology to help you feel better and stronger.",
      },
      {
        title: "Empowerment Through Knowledge",
        body: "We strip away jargon and invite you into the conversation. Informed patients make confident decisions through education and open dialogue.",
      },
      {
        title: "Compassion in Action",
        body: "Chronic pain, weight management, and pelvic health can feel vulnerable. From the first consultation to the last session, we help every client feel seen, heard, and supported.",
      },
    ],
  },
  founder: {
    title: "A Note From Our Founder",
    paragraphs: [
      "As a physician, I’ve dedicated my career to helping people manage their health—but I always knew there was more to offer than prescriptions and routine visits.",
      "Too often, I met patients living in quiet survival mode—physically depleted, mentally foggy, and disconnected from themselves. They weren’t simply unwell; they were experiencing a slow erosion of strength, vitality, and joy.",
      "That realization inspired Arc Wellness: a space designed to go beyond symptom relief and build lifelong resilience through science, technology, intention, and care.",
      "At Arc, we take a physician-guided, whole-person approach focused on prevention, function, and longevity—through treatments like Emsculpt Neo, Emsella, and ExoMind, alongside IV infusions, peptide therapy, and nutritional support.",
      "Thank you for trusting us with your journey. We’re honored to walk alongside you every step of the way.",
    ],
    signoff: "Dr. Danish A. Jabbar",
    role: "Founder & Medical Director, Arc Wellness",
  },
  differentiators: [
    {
      title: "Science with Soul",
      body: "Grounded in research and guided by compassion—you’re a person with a story, not a chart.",
    },
    {
      title: "Physician-Led Care",
      body: "Under Dr. Jabbar and our clinical team, your plan is designed, adjusted, and evolved for you.",
    },
    {
      title: "Whole-Person Healing",
      body: "We restore systems—physical, mental, and emotional—for results that last.",
    },
    {
      title: "Real Access, Real Results",
      body: "World-class treatments within reach—wellness that shouldn’t feel like a luxury.",
    },
  ],
} as const;
