import type { InsightEntry, InsightKind } from "@/content/pages/insights";
import { getInsightEntries } from "@/lib/insightsStore";

export function getInsightBySlug(
  kind: InsightKind,
  slug: string,
): InsightEntry | undefined {
  return getInsightEntries().find((e) => e.kind === kind && e.slug === slug);
}

/** Any published insight by slug (blog or desk post) under `/blogs/[slug]`. */
export function getInsightEntryBySlug(slug: string): InsightEntry | undefined {
  return getInsightEntries().find((e) => e.slug === slug);
}

export function getAllInsightSlugs(kind?: InsightKind): string[] {
  const entries = getInsightEntries();
  return (kind ? entries.filter((e) => e.kind === kind) : entries).map((e) => e.slug);
}

export function getInsightCounts(entries: readonly InsightEntry[] = getInsightEntries()) {
  return {
    all: entries.length,
    blog: entries.filter((e) => e.kind === "blog").length,
    caseStudy: entries.filter((e) => e.kind === "case-study").length,
  };
}
