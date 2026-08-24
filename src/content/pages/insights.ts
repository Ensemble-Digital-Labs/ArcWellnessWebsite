export type InsightKind = "blog" | "case-study";

/** Checklist of short lines (foundation habits, red flags, etc.). */
export type InsightBulletList = {
  style: "bullets";
  items: readonly string[];
};

/** Labeled cards — symptom groups, lab meanings, pillars. */
export type InsightCardList = {
  style: "cards";
  items: readonly {
    label: string;
    /** Prose, or bullet lines under the label. */
    body: string | readonly string[];
  }[];
};

export type InsightFaqItem = {
  question: string;
  answer: string;
};

/** Two-column compare (e.g. acute vs chronic inflammation). */
export type InsightCompareList = {
  style: "compare";
  leftTitle: string;
  rightTitle: string;
  rows: readonly {
    label: string;
    left: string;
    right: string;
  }[];
};

export type InsightSectionList =
  | InsightBulletList
  | InsightCardList
  | InsightCompareList;

/**
 * One cream-plate teaching act on a typed blog.
 * Prefer 2–4 sections per post — not one plate per Word heading.
 */
export type InsightSectionImage = {
  src: string;
  alt: string;
};

export type InsightArticleSection = {
  title: string;
  body: readonly string[];
  /** Optional pull-quote / emphasis under the gold rule. */
  callout?: string;
  list?: InsightSectionList;
  /** Optional figure after body / before list. */
  image?: InsightSectionImage;
  /** Optional multi-image gallery (e.g. habit photos). */
  images?: readonly InsightSectionImage[];
  /** Prose after a list (wrap-up for that act). */
  closing?: readonly string[];
};

/**
 * Authored blog structure (condition-page discipline).
 * When present, the detail page uses this instead of guessing from `body`.
 */
export type InsightArticle = {
  /** Lead paragraphs after the hero (no extra H2, or titled “Overview”). */
  overview: readonly string[];
  /** Optional figure at the top of the overview plate (directly under the hero). */
  overviewImage?: InsightSectionImage;
  /** Optional gold-pill line in the hero (conditions-style). */
  closingLine?: string;
  /** Optional emphasis line under overview prose. */
  overviewCallout?: string;
  sections: readonly InsightArticleSection[];
  perspective: {
    title: string;
    body: readonly string[];
    /** Closing invitation under perspective prose (dark plate). */
    cta?: {
      lead: string;
      body?: string;
      /** Button label; falls back to article.primaryCtaLabel / “Book a consultation”. */
      label?: string;
    };
  };
  /** Optional accordion FAQ before continue-path. */
  faq?: {
    title: string;
    items: readonly InsightFaqItem[];
  };
  /** Educational disclaimer under FAQ / before continue-path. */
  disclaimer?: string;
  /** Overrides the first continue-path CTA label. */
  primaryCtaLabel?: string;
};

export type InsightEntry = {
  id: string;
  kind: InsightKind;
  slug: string;
  title: string;
  /**
   * Optional hero line breaks (display only). Falls back to `title` as one block.
   * Example: ["Could It Be Insulin Resistance?", "Early Signs and Symptoms to Watch For"]
   */
  titleLines?: readonly string[];
  excerpt: string;
  /** Display date e.g. "19 May 2026" */
  publishedAt: string;
  imageSrc: string;
  imageAlt: string;
  /**
   * Flat paragraphs — required for admin CMS + legacy posts.
   * Keep in sync with `article` when both exist (flatten for search/admin).
   */
  body: readonly string[];
  /** Typed detail layout; omit on legacy Word-import posts. */
  article?: InsightArticle;
  /**
   * CMS SEO metadata (not shown in the published body).
   * Falls back to `title` / `excerpt` when omitted.
   */
  seo?: {
    title?: string;
    description?: string;
    /** JSON-LD Article `headline` when it should differ from the meta title. */
    schemaHeadline?: string;
    /** JSON-LD / Open Graph image path when it should differ from `imageSrc`. */
    schemaImage?: string;
    focusKeyword?: string;
    secondaryKeywords?: readonly string[];
  };
};

/** Flatten a typed article back to paragraphs (admin / legacy tools). */
export function flattenInsightArticle(article: InsightArticle): string[] {
  const out: string[] = [...article.overview];
  if (article.overviewCallout) out.push(article.overviewCallout);
  for (const section of article.sections) {
    out.push(section.title);
    out.push(...section.body);
    if (section.callout) out.push(section.callout);
    if (section.list?.style === "bullets") {
      out.push(...section.list.items);
    } else if (section.list?.style === "cards") {
      for (const item of section.list.items) {
        const body = Array.isArray(item.body)
          ? item.body.join("; ")
          : item.body;
        out.push(body ? `${item.label}: ${body}` : item.label);
      }
    } else if (section.list?.style === "compare") {
      out.push(section.list.leftTitle, section.list.rightTitle);
      for (const row of section.list.rows) {
        out.push(row.label, row.left, row.right);
      }
    }
    if (section.closing?.length) out.push(...section.closing);
  }
  out.push(article.perspective.title, ...article.perspective.body);
  if (article.perspective.cta) {
    out.push(article.perspective.cta.lead);
    if (article.perspective.cta.body) out.push(article.perspective.cta.body);
    if (article.perspective.cta.label) out.push(article.perspective.cta.label);
  }
  if (article.faq) {
    out.push(article.faq.title);
    for (const item of article.faq.items) {
      out.push(item.question, item.answer);
    }
  }
  if (article.disclaimer) out.push(article.disclaimer);
  return out;
}

export const insightsPage = {
  seo: {
    title: "Education | Arc Wellness Library, St. Louis",
    description:
      "Clinical insights and wellness education from Arc Wellness in St. Louis — metabolic health, hormones, inflammation, recovery, and more.",
  },
  hero: {
    eyebrow: "Education",
    title: "Stories &",
    titleEmphasis: "perspectives",
    body: "Real outcomes, thoughtful education, and the science behind our approach, written for patients who want clarity, not jargon.",
  },
  feed: {
    masthead: "Education",
  },
} as const;

export function insightHref(entry: Pick<InsightEntry, "kind" | "slug">): string {
  return `/blogs/${entry.slug}`;
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
