import type { NextConfig } from "next";
import os from "node:os";
import path from "node:path";

/** Pin Turbopack to this app (not `C:\Users\...\package-lock.json` one level up). */
const appRoot = path.resolve(__dirname);

/** iPhone / LAN dev — Next.js blocks `/_next/*` unless the host IP is allowlisted. */
function getDevLanOrigins(): string[] {
  const hosts = new Set<string>(["localhost", "127.0.0.1"]);
  for (const ifaces of Object.values(os.networkInterfaces())) {
    if (!ifaces) continue;
    for (const iface of ifaces) {
      if (iface.family === "IPv4" && !iface.internal) {
        hosts.add(iface.address);
      }
    }
  }
  return [...hosts];
}

const nextConfig: NextConfig = {
  allowedDevOrigins: getDevLanOrigins(),
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
    formats: ["image/webp"],
    /**
     * Next 16 defaults to `qualities: [75]` only — any other `quality={…}` on
     * `<Image>` is clamped to 75. Allow sharper encodes for heroes / full-bleed.
     * AVIF omitted: at equivalent quality it often looks softer/painterly on photos.
     */
    qualities: [60, 72, 75, 82, 88, 92, 95, 100],
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
      {
        source: "/treatments/nutrient-therapy",
        destination: "/treatments/infusion-therapy",
        permanent: true,
      },
      {
        source: "/treatments/daxxify",
        destination: "/treatments/neuromodulators",
        permanent: true,
      },
      {
        source: "/treatments/rha",
        destination: "/treatments/dermal-fillers",
        permanent: true,
      },
      {
        source: "/case-studies",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/case-studies/:slug",
        destination: "/blogs/:slug",
        permanent: true,
      },
      {
        source: "/blog/insulin-resistance-signs-symptoms",
        destination: "/blogs/insulin-resistance-signs-symptoms",
        permanent: true,
      },
      {
        source: "/blogs/could-it-be-insulin-resistance",
        destination: "/blogs/insulin-resistance-signs-symptoms",
        permanent: true,
      },
      {
        source: "/case-studies/could-it-be-insulin-resistance",
        destination: "/blogs/insulin-resistance-signs-symptoms",
        permanent: true,
      },
      {
        source: "/blogs/hormones-through-the-decades",
        destination: "/blogs/hormones-through-the-decades-st-louis-mo",
        permanent: true,
      },
      {
        source: "/blog/hormones-through-the-decades",
        destination: "/blogs/hormones-through-the-decades-st-louis-mo",
        permanent: true,
      },
      {
        source: "/case-studies/hormones-through-the-decades",
        destination: "/blogs/hormones-through-the-decades-st-louis-mo",
        permanent: true,
      },
      {
        source: "/blogs/how-hormones-change-with-age",
        destination: "/blogs/hormones-through-the-decades-st-louis-mo",
        permanent: true,
      },
      {
        source: "/blog/how-hormones-change-with-age",
        destination: "/blogs/hormones-through-the-decades-st-louis-mo",
        permanent: true,
      },
      {
        source: "/blogs/inflammation-your-bodys-built-in-alarm-system",
        destination: "/blogs/understanding-chronic-inflammation",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
