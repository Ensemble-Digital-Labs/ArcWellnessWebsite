import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArcMarketingShell } from "@/components/arc/ArcMarketingShell";
import { InsightDetailContent } from "@/components/arc/pages/InsightDetailContent";
import type { InsightEntry } from "@/content/pages/insights";
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

const PUBLISHER_LOGO = `${SITE_URL}/assets/branding/arc-wellness-logo-transparent-gold.webp`;

/** Display dates like "11 Aug 2026" → ISO date for schema. */
function publishedAtToIso(publishedAt: string): string | undefined {
  const parsed = Date.parse(publishedAt);
  if (Number.isNaN(parsed)) return undefined;
  return new Date(parsed).toISOString().slice(0, 10);
}

function absoluteAssetUrl(src: string): string {
  const path = src.split("?")[0] ?? src;
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function buildBlogJsonLd(entry: InsightEntry) {
  const pageUrl = `${SITE_URL}/blogs/${entry.slug}`;
  const description =
    entry.seo?.description?.trim() || entry.excerpt;
  const headline =
    entry.seo?.schemaHeadline?.trim() ||
    entry.seo?.title?.replace(/\s*\|\s*Arc Wellness(?:,\s*STL)?\s*$/i, "").trim() ||
    entry.title;
  const date = publishedAtToIso(entry.publishedAt);
  const imageSrc = entry.seo?.schemaImage?.trim() || entry.imageSrc;
  const image = imageSrc ? absoluteAssetUrl(imageSrc) : undefined;

  const article: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    author: {
      "@type": "Organization",
      name: "Arc Wellness",
      url: `${SITE_URL}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: "Arc Wellness",
      logo: {
        "@type": "ImageObject",
        url: PUBLISHER_LOGO,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };
  if (image) article.image = image;
  if (date) {
    article.datePublished = date;
    article.dateModified = date;
  }

  const schemas: Record<string, unknown>[] = [article];

  const faqItems = entry.article?.faq?.items;
  if (faqItems?.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
            .replace(/\*\*([^*]+)\*\*/g, "$1")
            .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"),
        },
      })),
    });
  }

  return schemas;
}

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

  const jsonLd = buildBlogJsonLd(entry);

  return (
    <ArcMarketingShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <InsightDetailContent entry={entry} />
    </ArcMarketingShell>
  );
}
