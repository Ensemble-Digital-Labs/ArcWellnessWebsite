import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArcMarketingShell } from "@/components/arc/ArcMarketingShell";
import { InsightDetailContent } from "@/components/arc/pages/InsightDetailContent";
import {
  getAllInsightSlugs,
  getInsightEntryBySlug,
} from "@/lib/insightsQueries";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://arcwellness.netlify.app";

/** Article detail under the `/blogs` hub (blogs + desk posts). */
export function generateStaticParams() {
  return getAllInsightSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getInsightEntryBySlug(slug);
  if (!entry) return { title: "From the Arc Desk | Arc Wellness" };
  const title =
    entry.seo?.title?.trim() || `${entry.title} | Arc Wellness`;
  const description =
    entry.seo?.description?.trim() || entry.excerpt;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/blogs/${slug}` },
  };
}

export default async function BlogsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getInsightEntryBySlug(slug);
  if (!entry) notFound();

  return (
    <ArcMarketingShell>
      <InsightDetailContent entry={entry} />
    </ArcMarketingShell>
  );
}
