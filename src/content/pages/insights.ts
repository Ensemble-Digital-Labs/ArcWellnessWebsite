export type InsightKind = "blog" | "case-study";

export type InsightEntry = {
  id: string;
  kind: InsightKind;
  slug: string;
  title: string;
  excerpt: string;
  /** Display date e.g. "19 May 2026" */
  publishedAt: string;
  imageSrc: string;
  imageAlt: string;
  /** Detail page body paragraphs */
  body: readonly string[];
};

export const insightsPage = {
  seo: {
    title: "Patient Stories & Case Studies | Arc Wellness, St. Louis",
    description:
      "Real patient stories and outcomes from Arc Wellness in St. Louis, covering EmSculpt Neo, Daxxify, peptide therapy, and more. Results vary by patient.",
  },
  hero: {
    eyebrow: "Insights",
    title: "Stories &",
    titleEmphasis: "perspectives",
    body: "Real outcomes, thoughtful education, and the science behind our approach, written for patients who want clarity, not jargon.",
  },
  feed: {
    masthead: "Insights",
    subtitle:
      "Tracking the ideas that support whole-body wellness, across patient stories, clinical perspective, and everyday care.",
  },
} as const;

export function insightHref(entry: Pick<InsightEntry, "kind" | "slug">): string {
  return entry.kind === "blog" ? `/blog/${entry.slug}` : `/case-studies/${entry.slug}`;
}

/** @deprecated Use insightsPage, kept for existing imports */
export const caseStudiesPage = {
  seo: insightsPage.seo,
  hero: insightsPage.hero,
  comingSoon: {
    title: "New articles on the way",
    body: "We’re preparing case studies and blog posts from our clinical team. Check back soon, or book a consult to hear how we personalize care today.",
  },
} as const;
