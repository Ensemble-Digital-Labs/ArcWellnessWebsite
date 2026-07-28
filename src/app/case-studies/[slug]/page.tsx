import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArcMarketingShell } from "@/components/arc/ArcMarketingShell";
import { InsightDetailContent } from "@/components/arc/pages/InsightDetailContent";
import { getAllInsightSlugs, getInsightBySlug } from "@/lib/insightsQueries";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const CASE_STUDY_META_BY_SLUG: Record<string, { title: string; description: string }> = {
  "strength-after-setback": {
    title: "Returning to Strength After a Demanding Season | Arc Wellness",
    description:
      "A real patient story on rebuilding core strength and confidence with EmSculpt Neo and structured follow-up at Arc Wellness. Shared with permission.",
  },
  "subtle-aesthetic-refinement": {
    title: "Subtle Refinement: Looking Rested, Not Done | Arc Wellness",
    description:
      "A Daxxify and skin-health case study with conservative dosing and follow-up photography, built around a patient's public-facing role. Results vary.",
  },
};

export function generateStaticParams() {
  return getAllInsightSlugs("case-study").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const matchedMeta = CASE_STUDY_META_BY_SLUG[slug];
  if (matchedMeta) {
    return matchedMeta;
  }

  const entry = getInsightBySlug("case-study", slug);
  if (!entry) return { title: "Case study | Arc Wellness" };
  return {
    title: `${entry.title} | Arc Wellness`,
    description: entry.excerpt,
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getInsightBySlug("case-study", slug);
  if (!entry) notFound();

  return (
    <ArcMarketingShell>
      <InsightDetailContent entry={entry} />
    </ArcMarketingShell>
  );
}
