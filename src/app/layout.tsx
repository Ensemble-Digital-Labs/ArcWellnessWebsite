import type { Metadata } from "next";
import { Birthstone, DM_Sans, Playfair_Display, Radley } from "next/font/google";
import {
  StaticExportGoogleTagManagerHead,
  StaticExportGoogleTagManagerNoscript,
} from "@/components/analytics/GoogleTagManager";
import { ArcRouteTransition } from "@/components/arc/ArcRouteTransition";
import "./globals.css";

/**
 * Signature-script font selector for emphasized heading words.
 * Flip to "radley" to swap the whole site from the Birthstone script to Radley italic.
 */
const EMPHASIS_FONT: "birthstone" | "radley" = "radley";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  /** Include heavy weights so `font-extrabold` / `font-black` on CTAs actually differ from `font-bold`. */
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  /** Ensure bold CTAs / buttons use real 700, not synthesized fallback. */
  weight: ["400", "500", "600", "700"],
});

/** Signature script for emphasized words inside headings (pair with Playfair body). */
const birthstone = Birthstone({
  weight: "400",
  variable: "--font-birthstone",
  subsets: ["latin"],
  display: "swap",
});

/** Alternative emphasis face — Radley italic (softer serif script feel). */
const radley = Radley({
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-radley",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arcwellness.net"),
  title: "Arc Wellness | Enhance Your Wellness Today",
  description:
    "Discover cutting-edge, personalized wellness treatments including body sculpting, cognitive renewal, and vitamin therapy at Arc Wellness in St. Louis.",
  applicationName: "Arc Wellness",
  // File-convention icons in `src/app/` (favicon.ico, icon.svg/png, apple-icon.png)
  // apply site-wide; themeColor helps browser chrome / installed shortcuts.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F0E3D7" },
    { media: "(prefers-color-scheme: dark)", color: "#83D0BB" },
  ],
  appleWebApp: {
    title: "Arc Wellness",
    statusBarStyle: "default",
  },
};

/**
 * Pre-paint gate for the homepage intro preloader (see `ArcSitePreloader`).
 * Runs synchronously before first paint so the overlay only shows on the FIRST
 * homepage load per tab — a refresh (flag already set) never flashes the splash.
 * Skips entirely under reduced-motion. A failsafe timeout clears the flag/attr
 * so JS/hydration stalls can never trap the user behind the overlay.
 */
const ARC_INTRO_PREPAINT_SCRIPT = `(function(){try{var d=document.documentElement;var p=location.pathname;if(p!=="/"&&p!=="")return;if(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;if(sessionStorage.getItem("arc-intro-seen")==="1")return;sessionStorage.setItem("arc-intro-seen","1");d.setAttribute("data-arc-intro","active");window.setTimeout(function(){if(d.getAttribute("data-arc-intro"))d.removeAttribute("data-arc-intro");},6000);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-emphasis-font={EMPHASIS_FONT}
      className={`${playfair.variable} ${dmSans.variable} ${birthstone.variable} ${radley.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <StaticExportGoogleTagManagerHead />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body
        className="min-h-full bg-arc-cream text-arc-charcoal"
        suppressHydrationWarning
      >
        <StaticExportGoogleTagManagerNoscript />
        <script dangerouslySetInnerHTML={{ __html: ARC_INTRO_PREPAINT_SCRIPT }} />
        <ArcRouteTransition>{children}</ArcRouteTransition>
      </body>
    </html>
  );
}
