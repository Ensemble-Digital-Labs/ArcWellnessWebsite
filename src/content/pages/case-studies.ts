/** Re-exports — canonical insights content lives in `insights.ts`. */
export {
  caseStudiesPage,
  insightHref,
  insightsPage,
  type InsightEntry,
  type InsightKind,
} from "@/content/pages/insights";

export { getAllInsightSlugs, getInsightBySlug, getInsightCounts } from "@/lib/insightsQueries";
export { getInsightEntries } from "@/lib/insightsStore";
