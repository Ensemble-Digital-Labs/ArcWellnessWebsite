import { SERVICE_EXION_ICON } from "@/content/pages/serviceTemplate";

const ICON = SERVICE_EXION_ICON;

export const programsPage = {
  seo: {
    title: "Arc Wellness Memberships | Consistent Care | Arc Wellness",
    description:
      "Invest in yourself with monthly Arc Wellness memberships. Bankable funds, monthly injections, and supplement savings—Radiance, Elevate, and Premier.",
  },
  hero: {
    eyebrow: "Arc Wellness Memberships",
    title: "Memberships",
    titleEmphasis: "and Programs",
    detail:
      "Arc Wellness memberships make it easier to stay consistent with your wellness routine while building funds toward the services and treatments you choose. Your monthly membership fee is fully bankable, so your investment remains available for future care.",
  },
  membershipsIntro: {
    title: "Choose Your Membership",
    closing: "Elevated care. Exclusive perks. Lasting results.",
  },
  memberships: [
    {
      id: "radiance",
      name: "Radiance",
      price: "$99",
      pricePeriod: "/mo",
      iconSrc: `${ICON}/sun.svg`,
      tagline:
        "A simple, flexible way to begin building a consistent wellness routine.",
      includes: [
        "100% of your monthly membership fee banked toward eligible Arc Wellness services",
        "One MICC injection each month",
        "5% off supplements",
      ],
      idealFor:
        "Patients who want to begin investing in their wellness while enjoying monthly support and added savings.",
    },
    {
      id: "elevate",
      name: "Elevate",
      price: "$149",
      pricePeriod: "/mo",
      iconSrc: `${ICON}/lotus.svg`,
      tagline:
        "More monthly support for energy, antioxidant protection, and whole-body wellness.",
      includes: [
        "100% of your monthly membership fee banked toward eligible Arc Wellness services",
        "One MICC injection each month",
        "One glutathione injection each month",
        "10% off supplements",
      ],
      idealFor:
        "Patients who want greater consistency, additional wellness support, and more value from their monthly membership.",
    },
    {
      id: "premier",
      name: "Premier",
      price: "$249",
      pricePeriod: "/mo",
      iconSrc: `${ICON}/person-sparkle.svg`,
      tagline:
        "Our most comprehensive membership for patients committed to making wellness part of their ongoing lifestyle.",
      includes: [
        "100% of your monthly membership fee banked toward eligible Arc Wellness services",
        "One MICC injection each month",
        "One glutathione injection each month",
        "One Vitamin D3 injection each month",
        "15% off supplements",
      ],
      idealFor:
        "Patients who want the highest level of monthly support, preferred savings, and greater flexibility to invest in future treatments.",
    },
  ],
  choice: {
    title: "Your Membership.",
    titleEmphasis: "Your Wellness. Your Choice.",
    body: "Unlike traditional memberships where unused benefits may disappear, your monthly membership funds are bankable. This allows you to build credit over time and apply those funds toward eligible services that support your personal goals.",
    closing:
      "Whether you are preparing for an aesthetic treatment, prioritizing energy and recovery, or simply creating a more consistent wellness routine, your membership gives you a structured way to invest in yourself each month.",
  },
  why: {
    title: "Why Become an",
    titleEmphasis: "Arc Wellness Member?",
    items: [
      {
        title: "Build Funds for Future Care",
        body: "Your monthly membership fee is deposited into your Arc Wellness account, allowing your balance to grow over time.",
      },
      {
        title: "Stay Consistent",
        body: "Monthly injections and supplement savings help you maintain supportive habits between appointments and treatments.",
      },
      {
        title: "Enjoy Member Savings",
        body: "Receive preferred pricing on professional-grade supplements, with greater savings available at each membership level.",
      },
      {
        title: "Create Your Own Path",
        body: "Your membership can grow with you as your wellness, aesthetic, and performance goals evolve.",
      },
    ],
  },
  faqs: [
    {
      id: "bankable",
      question: "What does '100% bankable funds' mean?",
      answer:
        "Your full monthly membership payment is placed into your Arc Wellness account and may be used toward eligible services and treatments.",
    },
    {
      id: "accumulate",
      question: "Do I have to use my funds every month?",
      answer:
        "No. Your funds can accumulate, allowing you to save toward future services or treatments.",
    },
    {
      id: "injections",
      question:
        "Are the monthly injections included in addition to my banked funds?",
      answer:
        "Yes. The injections listed within your membership tier are included as monthly membership benefits in addition to your banked funds.",
    },
    {
      id: "change-levels",
      question: "Can I change membership levels?",
      answer:
        "Membership changes may be available depending on your current agreement and account standing. Our team can help you determine which option best fits your needs.",
    },
    {
      id: "transfer",
      question: "Can membership funds be transferred or refunded?",
      answer:
        "Membership funds are generally intended for the enrolled member and are subject to the terms of the Arc Wellness membership agreement.",
    },
    {
      id: "start",
      question: "How do I get started?",
      answer:
        "Choose your preferred membership or speak with our team. We will help you complete enrollment and explain how to access your monthly benefits.",
    },
  ],
  terms: {
    title: "Membership Terms",
    body: "Membership benefits are subject to the terms of the Arc Wellness membership agreement. Banked funds may be applied only toward eligible services and products. Membership funds have no cash value and may not be redeemed for cash. Medical services, injections, and supplements are provided only when clinically appropriate. Individual results vary. Additional terms, exclusions, and cancellation policies may apply.",
  },
} as const;
