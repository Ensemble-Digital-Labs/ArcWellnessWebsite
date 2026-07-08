/** USP stat strip, shared between homepage sections (moved from concerns to welcome per client review). */
export const HOME_USP_ITEMS = [
  { value: "12+", label: "Treatment Modalities" },
  { value: "FDA", label: "Cleared Technology" },
  { value: "0", label: "Membership Required" },
  { value: "Free", label: "Initial Consultation" },
] as const;

export const homeConcerns = {
  titleBefore: "Because",
  titleEmphasis: "every story is different.",
  intro:
    "Whether you're seeking renewed energy, healthier aging, greater confidence, or simply a place to begin, your journey starts with care designed around you.",
} as const;
