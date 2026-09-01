import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://arcwellness.net";

/** Required for `output: "export"` (GoDaddy static build). */
export const dynamic = "force-static";

/**
 * Crawl rules for marketing pages. Admin, APIs, and internal demos stay out of
 * search indexes; privacy/terms use page-level `noindex` so they remain crawlable.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/client-showcase/",
          "/logodemov1/",
          "/logodemov2/",
          "/logodemov3/",
          "/sphere-demo/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
