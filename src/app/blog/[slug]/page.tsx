import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArcMarketingShell } from "@/components/arc/ArcMarketingShell";
import { InsightDetailContent } from "@/components/arc/pages/InsightDetailContent";
import { getAllInsightSlugs, getInsightBySlug } from "@/lib/insightsQueries";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const BLOG_META_BY_SLUG: Record<string, { title: string; description: string }> = {
  "longevity-habits-that-compound": {
    title: "Longevity Habits That Compound Between Visits | Arc Wellness",
    description:
      "Sleep, recovery, and metabolic rhythm matter as much as any device or infusion. See how Arc Wellness helps St. Louis patients stack small wins over time.",
  },
  "pelvic-health-without-the-stigma": {
    title: "Pelvic Health Without the Stigma | Arc Wellness Blog",
    description:
      "Many patients wait years before asking about pelvic health. Here's how physician-led care at Arc Wellness makes that first conversation easier.",
  },
  "iv-support-for-busy-seasons": {
    title: "IV Support for Busy Seasons | Arc Wellness Blog",
    description:
      "See how nutrient therapy fits a demanding schedule, hydration, recovery, and physician oversight without a hospital visit. From Arc Wellness, St. Louis.",
  },
  "peptide-therapy-what-to-expect-first": {
    title: "Peptide Therapy: Your First Month Explained | Arc Wellness",
    description:
      "Labs, candidacy, check-ins, and how peptides fit alongside nutrition and recovery. What to expect in your first month of physician-led peptide therapy.",
  },
};

export function generateStaticParams() {
  return getAllInsightSlugs("blog").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const matchedMeta = BLOG_META_BY_SLUG[slug];
  if (matchedMeta) {
    return matchedMeta;
  }

  const entry = getInsightBySlug("blog", slug);
  if (!entry) return { title: "Blog | Arc Wellness" };
  return {
    title: `${entry.title} | Arc Wellness`,
    description: entry.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getInsightBySlug("blog", slug);
  if (!entry) notFound();

  return (
    <ArcMarketingShell>
      <InsightDetailContent entry={entry} />
    </ArcMarketingShell>
  );
}
