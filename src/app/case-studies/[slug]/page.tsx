import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArcMarketingShell } from "@/components/arc/ArcMarketingShell";
import { InsightDetailContent } from "@/components/arc/pages/InsightDetailContent";
import { getAllInsightSlugs, getInsightBySlug } from "@/lib/insightsQueries";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllInsightSlugs("case-study").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
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
