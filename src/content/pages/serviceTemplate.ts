/**
 * Shared content shape for EXION-template service pages
 * (Restore & Optimize programs and future migrations).
 */

export type ServiceIconItem = {
  iconSrc: string;
  title: string;
  body: string;
};

export type ServiceStat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type ServiceTreatmentCard = {
  eyebrow?: string;
  title: string;
  tagline: string;
  body: string;
  bullets: readonly string[];
  imageSrc: string;
  imageAlt: string;
};

export type ServiceHero = {
  title: string;
  titleEmphasis: string;
  titleEmphasisLines: readonly [string] | readonly [string, string];
  subhead: string;
  intro: string;
  closingLine: string;
  poweredByEyebrow: string;
  poweredByIconSrc: string;
  synergyLine: string;
  imageSrc: string;
  imageAlt: string;
  /** Optional object-position override for the hero photo. */
  imageObjectClass?: string;
};

export type ServiceMechanism = {
  titleLines: readonly string[];
  body: string;
  /** Optional count-up stats (device pages). Omit for narrative program pages. */
  stats?: readonly ServiceStat[];
  /** Optional evaluation / look-deeper bullets (program pages). */
  evaluationBullets?: readonly string[];
  imageSrc?: string;
  imageAlt?: string;
  /** Optional object-fit/position for the mechanism photo. */
  imageObjectClass?: string;
  /** Optional aspect-ratio utilities for the mechanism photo frame. */
  imageAspectClass?: string;
  videoEmbedSrc?: string;
  videoTitle?: string;
};

export type ServiceTreatments = {
  title: string;
  titleEmphasis: string;
  intro: string;
  cards: readonly ServiceTreatmentCard[];
};

export type ServiceDifferent = {
  title: string;
  titleEmphasis: string;
  intro: string;
  backgroundSrc: string;
  backgroundAlt: string;
  cards: readonly ServiceIconItem[];
};

export type ServiceExperience = {
  title: string;
  titleEmphasis: string;
  steps: readonly ServiceIconItem[];
};

export type ServiceClosing = {
  supportingLine: string;
};

export type ServicePageContent = {
  hero: ServiceHero;
  pillars: readonly ServiceIconItem[];
  creamPlate: { src: string; alt: string };
  mechanism: ServiceMechanism;
  treatments: ServiceTreatments;
  different: ServiceDifferent;
  experience: ServiceExperience;
  closing: ServiceClosing;
};

/** Shared temporary EXION plates / icons until dedicated assets ship. */
export const SERVICE_EXION_ICON = "/assets/treatments/exion/icons";
export const SERVICE_EXION_ASSET = "/assets/treatments/exion";

export const serviceSharedCreamPlate = {
  src: `${SERVICE_EXION_ASSET}/exion-pillars-background.webp`,
  alt: "",
} as const;

export const serviceSharedDarkPlate = {
  src: `${SERVICE_EXION_ASSET}/exion-different-background.webp`,
  alt: "",
} as const;
