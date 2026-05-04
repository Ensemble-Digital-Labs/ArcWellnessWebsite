import type { Metadata } from "next";
import { Birthstone, DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

/** Signature script for emphasized words inside headings (pair with Playfair body). */
const birthstone = Birthstone({
  weight: "400",
  variable: "--font-birthstone",
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
      className={`${playfair.variable} ${dmSans.variable} ${birthstone.variable} h-full antialiased`}
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
