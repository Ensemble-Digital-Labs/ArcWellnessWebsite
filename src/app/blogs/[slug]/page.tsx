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
  "https://arcwellness.net";

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

function plainTextFromCms(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

function buildBlogJsonLd(entry: InsightEntry) {
  const pageUrl = `${SITE_URL}/blogs/${entry.slug}`;
  const metaDescription =
    entry.seo?.description?.trim() || entry.excerpt;
  const description =
    entry.seo?.schemaDescription?.trim() || metaDescription;
  const headline =
    entry.seo?.schemaHeadline?.trim() ||
    entry.seo?.title
      ?.replace(/\s*\|\s*Arc Wellness(?:,\s*STL)?\s*$/i, "")
      .trim() ||
    entry.title;
  const date = publishedAtToIso(entry.publishedAt);
  const imageSrc = entry.seo?.schemaImage?.trim() || entry.imageSrc;
  const image = imageSrc ? absoluteAssetUrl(imageSrc) : undefined;
  const specialty = entry.seo?.medicalSpecialty?.trim();
  const condition = entry.seo?.medicalCondition?.trim();
  const isMedical = Boolean(specialty || condition);
  const authorName = entry.seo?.authorName?.trim();
  const authorUrlRaw = entry.seo?.authorUrl?.trim() || "/about";
  const authorUrl = absoluteAssetUrl(authorUrlRaw);

  const article: Record<string, unknown> = {
    "@type": isMedical ? ["MedicalWebPage", "Article"] : "BlogPosting",
    "@id": `${pageUrl}#article`,
    headline,
    description,
    url: pageUrl,
    inLanguage: "en-US",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    publisher: {
      "@type": isMedical ? "MedicalClinic" : "Organization",
      name: "Arc Wellness",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: PUBLISHER_LOGO,
      },
    },
  };

  if (authorName) {
    const person = {
      "@type": "Person",
      name: authorName,
      jobTitle: "Physician",
      url: authorUrl,
    };
    article.author = person;
    article.reviewedBy = {
      "@type": "Person",
      name: authorName,
      url: authorUrl,
    };
  } else {
    article.author = {
      "@type": "Organization",
      name: "Arc Wellness",
      url: SITE_URL,
    };
  }

  if (image) article.image = image;
  if (date) {
    article.datePublished = date;
    article.dateModified = date;
    if (isMedical) article.lastReviewed = date;
  }
  if (specialty) article.specialty = specialty;
  if (isMedical) {
    article.medicalAudience = {
      "@type": "MedicalAudience",
      audienceType: "Patient",
    };
  }
  const schemaAbout = entry.seo?.schemaAbout?.filter((item) => item.name?.trim());
  if (schemaAbout?.length) {
    article.about = schemaAbout.map((item) => ({
      "@type": item.type?.trim() || "Thing",
      name: item.name.trim(),
    }));
  } else if (condition) {
    article.about = {
      "@type": "MedicalCondition",
      name: condition,
    };
  }

  const graph: Record<string, unknown>[] = [
    article,
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${SITE_URL}/blogs`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: entry.title,
          item: pageUrl,
        },
      ],
    },
  ];

  const faqItems = entry.article?.faq?.items;
  if (faqItems?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: plainTextFromCms(item.answer),
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

/** Article detail under the `/blogs` hub (blogs + desk posts). */
export function generateStaticParams() {
  return getAllInsightSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getInsightEntryBySlug(slug);
  if (!entry) return { title: "Education | Arc Wellness" };
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
