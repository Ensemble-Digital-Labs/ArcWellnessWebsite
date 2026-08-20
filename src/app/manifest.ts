import type { MetadataRoute } from "next";

/** Required for `output: "export"` (GoDaddy static build). */
export const dynamic = "force-static";

/** Web app manifest — Android / “Add to Home Screen” icons for every route. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Arc Wellness",
    short_name: "Arc Wellness",
    description:
      "Personalized wellness treatments including body sculpting, cognitive renewal, and vitamin therapy in St. Louis.",
    start_url: "/",
    display: "browser",
    background_color: "#F0E3D7",
    theme_color: "#83D0BB",
    icons: [
      {
        src: "/assets/branding/favicons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/assets/branding/favicons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/assets/branding/favicons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
