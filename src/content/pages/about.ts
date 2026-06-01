import { CLINIC_INTERIOR_ALT, CLINIC_INTERIOR_IMAGES } from "@/content/clinicInteriorImages";
import { images } from "@/content/site";

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
        src: CLINIC_INTERIOR_IMAGES.receptionBacklitLogoWall,
        alt: CLINIC_INTERIOR_ALT.receptionBacklitLogoWall,
        label: "01 / Reception",
        caption: "Your team greets you by name—not by appointment number.",
      },
      {
        src: CLINIC_INTERIOR_IMAGES.consultationLounge,
        alt: CLINIC_INTERIOR_ALT.consultationLounge,
        label: "02 / Consultation lounge",
        caption: "Unhurried conversations in a quiet, residential setting.",
      },
      {
        src: CLINIC_INTERIOR_IMAGES.hallwayAccentSeating,
        alt: CLINIC_INTERIOR_ALT.hallwayAccentSeating,
        label: "03 / Welcome path",
        caption: "Warm light and intentional details from the moment you arrive.",
      },
      {
        src: CLINIC_INTERIOR_IMAGES.hallwayDaxxifyBannerWaveArt,
        alt: CLINIC_INTERIOR_ALT.hallwayDaxxifyBannerWaveArt,
        label: "04 / Main hallway",
        caption: "Calm corridors that connect every part of your visit.",
      },
      {
        src: CLINIC_INTERIOR_IMAGES.ivTherapyReclinerRoom,
        alt: CLINIC_INTERIOR_ALT.ivTherapyReclinerRoom,
        label: "05 / Therapy lounge",
        caption: "IV and restorative therapies with natural light and privacy.",
      },
      {
        src: CLINIC_INTERIOR_IMAGES.retailKneskoSkinProductDisplay,
        alt: CLINIC_INTERIOR_ALT.retailKneskoSkinProductDisplay,
        label: "06 / Curated skincare",
        caption: "Physician-selected products to extend your results at home.",
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
  stats: {
    eyebrow: "By the numbers",
    title: "Whole-person care",
    titleEmphasis: "under one roof",
    items: [
      {
        value: "12+",
        label: "Modalities in one plan",
        caption: "Devices, infusions, aesthetics, and supplements—woven together by your clinical team.",
        imageSrc: images.services[1],
        imageAlt: "Body contouring session at ARC Wellness",
      },
      {
        value: "3",
        label: "Care pillars",
        caption: "Body & core, aesthetics & skin, and wellness therapies—each pathway physician-guided.",
        imageSrc: images.membershipCohortHero,
        imageAlt: "Biometric consultation room",
      },
      {
        value: "1",
        label: "Physician-led team",
        caption: "Dr. Jabbar and our clinicians design, adjust, and evolve your plan with you.",
        imageSrc: images.founderPortrait,
        imageAlt: "Dr. Danish Jabbar, Founder & Medical Director",
      },
    ],
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
