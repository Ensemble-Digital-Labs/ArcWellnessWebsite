import type { InsightEntry, InsightKind } from "@/content/pages/insights";
import { getInsightEntries } from "@/lib/insightsStore";

export function getInsightBySlug(
  kind: InsightKind,
  slug: string,
): InsightEntry | undefined {
  return getInsightEntries().find((e) => e.kind === kind && e.slug === slug);
}

export function getAllInsightSlugs(kind: InsightKind): string[] {
  return getInsightEntries()
    .filter((e) => e.kind === kind)
    .map((e) => e.slug);
}

export function getInsightCounts(entries: readonly InsightEntry[] = getInsightEntries()) {
  return {
    all: entries.length,
    blog: entries.filter((e) => e.kind === "blog").length,
    caseStudy: entries.filter((e) => e.kind === "case-study").length,
  };
}
