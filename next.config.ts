import type { NextConfig } from "next";
import path from "node:path";

/** Pin Turbopack to this app (not `C:\Users\...\package-lock.json` one level up). */
const appRoot = path.resolve(__dirname);

const nextConfig: NextConfig = {
  turbopack: {
    root: appRoot,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    /** Cache optimized variants at the CDN (Netlify image transform). */
    minimumCacheTTL: 60 * 60 * 24 * 365,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
