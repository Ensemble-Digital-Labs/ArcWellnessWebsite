import type { MetadataRoute } from "next";
import { insightHref } from "@/content/pages/insights";
import { getAllTreatmentSlugs } from "@/content/pages/treatments";
import { getInsightEntries } from "@/lib/insightsStore";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://arcwellness.netlify.app";

/** Public marketing routes for search engines (excludes admin + dev demos). */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/treatments`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/aesthetics`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/programs`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/financing`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/book`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/case-studies`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const treatmentRoutes: MetadataRoute.Sitemap = getAllTreatmentSlugs().map(
    (slug) => ({
      url: `${SITE_URL}/treatments/${slug}`,
      changeFrequency: "monthly" as const,
      priority: slug === "overview" ? 0.85 : 0.75,
      lastModified: now,
    }),
  );

  const insightRoutes: MetadataRoute.Sitemap = getInsightEntries().map(
    (entry) => ({
      url: `${SITE_URL}${insightHref(entry)}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      lastModified: now,
    }),
  );

  return [...staticRoutes, ...treatmentRoutes, ...insightRoutes];
}
