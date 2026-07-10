import { siteMeta } from "@/content/siteMeta";
import { exionV2Assets } from "@/client-showcase/exion-v2/exion-v2-assets";
import { EXION_V2_MOCK } from "@/client-showcase/exion-v2/exion-v2-tokens";

/** @deprecated Use EXION_V2_MOCK.dark — mock-only token */
export const EXION_V2_DARK = EXION_V2_MOCK.dark;

export const exionV2Content = {
  bookingUrl: siteMeta.bookingUrl,
  hero: {
    titleLead: "EXION,",
    titleEmphasis: "refinement at every layer.",
    eyebrow: "SCIENCE. ENERGY. RESULTS THAT LAST.",
    body:
      "EXION is a next-generation technology that combines radiofrequency and targeted ultrasound to stimulate collagen, improve skin quality, and restore structure—without needles or downtime.",
    modelImage: exionV2Assets.hero.model,
    deviceImage: exionV2Assets.hero.device,
    background: exionV2Assets.hero.background,
    energyLeft: exionV2Assets.hero.energyLeft,
    energyRight: exionV2Assets.hero.energyRight,
    callout: {
      eyebrowLines: ["POWERED BY", "NEXT-GENERATION", "TECHNOLOGY"],
      titleLines: ["RF + Targeted Ultrasound", "Working in Synergy"],
    },
    pillars: [
      {
        icon: "stimulate" as const,
        label: "Stimulate",
        descriptionLines: ["Activate natural", "collagen and", "elastin production"],
      },
      {
        icon: "rebuild" as const,
        label: "Rebuild",
        descriptionLines: ["Strengthen skin", "structure and", "improve resilience"],
      },
      {
        icon: "renew" as const,
        label: "Renew",
        descriptionLines: ["Revive tone, texture,", "and radiance from", "within"],
      },
      {
        icon: "refine" as const,
        label: "Refine",
        descriptionLines: ["Reveal smoother,", "firmer, more", "confident skin"],
      },
    ],
    marquee: "+ STRONGER SKIN. SMOOTHER TEXTURE. GREATER CONFIDENCE.",
  },
  stats: {
    headline: "Beautiful skin begins beneath the surface.",
    body:
      "EXION works from the inside out, targeting the layers where collagen, elastin, and hyaluronic acid are produced, so improvements look natural, not overdone.",
    background: exionV2Assets.stats.background,
    faceImage: exionV2Assets.stats.face,
    gridOverlay: exionV2Assets.stats.gridOverlay,
    metrics: [
      { value: "+27%", label: "Average increase in collagen production" },
      { value: "+23%", label: "Improvement in skin elasticity" },
      { value: "+31%", label: "Boost in natural hyaluronic acid levels" },
      { value: "+28%", label: "Visible improvement in skin texture" },
    ],
  },
  treatments: {
    headline: "Three transformative treatments.",
    subhead: "ONE PLATFORM, THREE WAYS TO RENEW.",
    cards: [
      {
        title: "EMFACE®",
        tagline: "Lift. Tone. Confidence.",
        body:
          "Synchronized radiofrequency and HIFES™ technology treat facial skin and muscles in one session for a lifted, toned appearance.",
        image: exionV2Assets.cards.emface,
        bullets: [
          "Non-invasive facial lifting and toning",
          "Simultaneous skin and muscle treatment",
          "No needles and minimal downtime",
          "Natural-looking, refreshed results",
        ],
      },
      {
        title: "RF MICRONEEDLING",
        tagline: "Build. Tighten. Renew.",
        body:
          "Fractional RF microneedling targets acne scars, deep wrinkles, and stretch marks with less discomfort than standard microneedling.",
        image: exionV2Assets.cards.microneedling,
        bullets: [
          "Improves acne scars and deep lines",
          "Stimulates collagen at controlled depths",
          "More comfortable than traditional microneedling",
          "Progressive results over a treatment series",
        ],
      },
      {
        title: "CLEAR LASER RESURFACING",
        tagline: "Correct. Refine. Reveal.",
        body:
          "EXION Clear RF clears active acne and improves skin clarity with precise energy delivery for clearer, smoother skin.",
        image: exionV2Assets.cards.clearLaser,
        bullets: [
          "Targets active acne and congestion",
          "Improves overall skin clarity",
          "Non-invasive with little downtime",
          "Ideal for ongoing skin maintenance",
        ],
      },
    ],
  },
  whyDifferent: {
    headline: "Why EXION is different.",
    body:
      "Dual-energy technology delivers controlled thermal and ultrasound stimulation to fibroblasts, the cells responsible for collagen, elastin, and hyaluronic acid, with precision that protects the skin surface.",
    background: exionV2Assets.whyDifferent.background,
    features: [
      {
        icon: "dualEnergy" as const,
        title: "Dual-energy technology",
        body: "Combines radiofrequency and ultrasound for comprehensive dermal renewal.",
      },
      {
        icon: "fibroblasts" as const,
        title: "Targets fibroblasts",
        body: "Stimulates the cells that produce collagen, elastin, and hyaluronic acid.",
      },
      {
        icon: "precise" as const,
        title: "Precise & controlled",
        body: "Energy is delivered at calibrated depths for consistent, predictable results.",
      },
      {
        icon: "safe" as const,
        title: "Safe & effective",
        body: "Non-invasive protocols designed for comfort with minimal recovery time.",
      },
    ],
  },
  experience: {
    headline: "The EXION experience.",
    background: exionV2Assets.experience.background,
    steps: [
      { icon: "consultation" as const, title: "Consultation", body: "We assess your skin, goals, and lifestyle to determine the right EXION protocol." },
      { icon: "plan" as const, title: "Personalized plan", body: "Your provider designs a treatment sequence tailored to your concerns and timeline." },
      { icon: "treatment" as const, title: "Comfortable treatments", body: "Sessions are non-invasive with little to no downtime, so you can return to your day." },
      { icon: "results" as const, title: "Visible results", body: "Improvements build progressively as collagen, elastin, and HA levels increase." },
      { icon: "maintain" as const, title: "Maintain & enhance", body: "Seasonal touch-ups and complementary care keep your results refined over time." },
    ],
  },
  results: {
    headline: "Real results. Refined confidence.",
    body: "See the difference advanced technology can make.",
    disclaimer: "*Individual results may vary.",
    pairs: exionV2Assets.results,
  },
  cta: {
    headline: "Your best skin. Starts within.",
    body: "Discover the power of EXION and experience refinement at every layer.",
    subtext: "Let's build your plan for stronger, smoother, more radiant skin.",
    button: "Schedule your consultation",
    background: exionV2Assets.cta.background,
    profileArt: exionV2Assets.icons.ctaProfile,
    energyTrail: exionV2Assets.decorative.ctaTrail,
  },
  decorative: exionV2Assets.decorative,
  experienceIconsRow: exionV2Assets.decorative.experienceIconsRow,
} as const;
