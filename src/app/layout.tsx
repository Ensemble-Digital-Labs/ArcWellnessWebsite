import type { Metadata } from "next";
import { Birthstone, DM_Sans, Playfair_Display, Radley } from "next/font/google";
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
  title: "ARC Wellness | Aesthetics, Wellness & Longevity",
  description:
    "Where aesthetics, wellness, and longevity converge. Elevated care for intentional results.",
};

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
      <body
        className="min-h-full bg-arc-cream text-arc-charcoal"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
