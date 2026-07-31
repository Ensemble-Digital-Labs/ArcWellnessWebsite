/**
 * Condition landing pages — short EXION-adjacent stack:
 * hero → imagine (cream) → optional extras (cream) → discover (dark) →
 * optional philosophy / related → Invest CTA → footer.
 */

export type ConditionRecommendedService = {
  label: string;
  /** Live treatment/condition route when available. */
  href?: string;
  /** Optional supporting line under the label (grouped discover lists). */
  body?: string;
};

export type ConditionServiceGroup = {
  heading?: string;
  services: readonly ConditionRecommendedService[];
};

export type ConditionBulletGroup = {
  heading: string;
  items: readonly string[];
};

export type ConditionNarrativeSection = {
  title: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
  bulletGroups?: readonly ConditionBulletGroup[];
};

export type ConditionPageContent = {
  slug: string;
  seo: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    subhead: string;
    paragraphs: readonly string[];
    closingLine?: string;
    imageSrc: string;
    imageAlt: string;
    imageObjectClass?: string;
  };
  /** Cream / orange-yellow plate — aspirational narrative. */
  imagine: ConditionNarrativeSection;
  /** Extra cream narrative acts between imagine and discover. */
  extras?: readonly ConditionNarrativeSection[];
  /** Dark plate — recommended services with golden type. */
  discover: {
    title: string;
    intro: string;
    /** Flat service list (most conditions). */
    services?: readonly ConditionRecommendedService[];
    /** Grouped service lists (hormones, aesthetics, longevity). */
    groups?: readonly ConditionServiceGroup[];
  };
  /** Optional clinical / legal note under discover. */
  disclaimer?: string;
  /** Optional closing philosophy (cream). */
  philosophy?: ConditionNarrativeSection;
  /** Optional related condition links. */
  related?: {
    title: string;
    intro?: string;
    items: readonly { label: string; href?: string }[];
  };
  creamPlateSrc: string;
  darkPlateSrc: string;
  closing?: {
    supportingLine?: string;
  };
};
