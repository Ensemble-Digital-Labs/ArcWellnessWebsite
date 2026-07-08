import type { NextConfig } from "next";
import path from "node:path";

/** Pin Turbopack to this app (not `C:\Users\...\package-lock.json` one level up). */
const appRoot = path.resolve(__dirname);

const nextConfig: NextConfig = {
  turbopack: {
    root: appRoot,
  },
  /** Keep heavy native / 3D deps out of the Netlify server handler zip. */
  serverExternalPackages: ["three", "gsap", "sharp", "exceljs"],
  /**
   * Admin API routes read `data/*.json` and write uploads under `public/assets/insights/uploads`.
   * Without excludes, `fs` + `path.join(process.cwd(), "public", ...)` traces all of `public/assets`
   * (~hundreds of MB) into `___netlify-server-handler` and deploy fails.
   */
  outputFileTracingExcludes: {
    "/*": [
      "public/assets/**",
      "public/assets/videos/**",
      "scripts/**",
      "documents/**",
      "design/**",
      ".cursor/**",
      "extraction tool/**",
      "learning/**",
      "local-envdev/**",
      "*.xlsx",
      "*.xls",
    ],
    "/api/admin/**": ["scripts/**", "*.xlsx", "*.xls"],
  },
  outputFileTracingIncludes: {
    "/api/admin/**": ["data/**"],
    "/admin/**": ["data/**"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    /** Cache optimized variants at the CDN (Netlify image transform). */
    minimumCacheTTL: 60 * 60 * 24 * 365,
    /** Local `/public` assets — omit `search` so `?v=` cache-bust query strings are allowed. */
    localPatterns: [
      {
        pathname: "/assets/**",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/book",
        destination: "https://booking.mangomint.com/892312",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
