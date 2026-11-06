import type { InsightEntry } from "@/content/pages/insights";

/** Parse display dates like "09 Oct 2026" for newest-first ordering. */
export function insightPublishedAtMs(publishedAt: string): number {
  const parsed = Date.parse(publishedAt);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function sortInsightEntriesLatestFirst(
  entries: readonly InsightEntry[],
): InsightEntry[] {
  return [...entries].sort((a, b) => {
    const diff = insightPublishedAtMs(b.publishedAt) - insightPublishedAtMs(a.publishedAt);
    if (diff !== 0) return diff;
    return a.title.localeCompare(b.title);
  });
}
