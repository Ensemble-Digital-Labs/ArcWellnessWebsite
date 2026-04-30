"use client";

import Link from "next/link";
import { useRef } from "react";
import { MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconFacebook, IconInstagram } from "@/components/arc/SocialIcons";
import { useArcFullscreenPin } from "@/lib/arcSectionPins";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
    </svg>
  );
}

const footerLinks = {
  About: ["Our Story", "Providers", "Care Philosophy"],
  Services: ["Aesthetics", "Wellness", "Longevity", "Membership"],
  Patients: ["New Patients", "Forms", "FAQs"],
  Shop: ["Gift Cards", "Skincare", "Supplements"],
};

const marqueeItems = [
  "Elevated care",
  "Extraordinary results",
  "A life well-lived",
  "ARC Wellness",
];

function scrollMainToTop() {
  const ls = (window as unknown as { locomotiveScroll?: { lenisInstance?: { scrollTo: (n: number, o?: object) => void }; LenisInstance?: { scrollTo: (n: number, o?: object) => void } } }).locomotiveScroll;
  const lenis = ls?.lenisInstance ?? ls?.LenisInstance;
  if (lenis?.scrollTo) {
    try {
      lenis.scrollTo(0, { duration: 1.1 });
      return;
    } catch {
      /* fall through */
    }
  }
  const main = document.querySelector("#main");
  if (main) {
    try {
      main.scrollTo({ top: 0, behavior: "smooth" });
      return;
    } catch {
      /* fall through */
    }
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function ArcFooter() {
  const rootRef = useRef<HTMLElement>(null);
  useArcFullscreenPin(rootRef);

  return (
    <footer
      ref={rootRef}
      id="contact"
      className={cn(
        "relative flex min-h-[100dvh] flex-col overflow-hidden border-t border-arc-cream-deep bg-arc-cream text-arc-charcoal",
      )}
    >
      <div className="border-b border-arc-teal/15 bg-arc-white/60 py-3 overflow-hidden">
        <div className="animate-arc-marquee gap-10 whitespace-nowrap font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-arc-charcoal/60">
          {[0, 1].map((dup) => (
            <span key={dup} className="inline-flex gap-10 pr-10">
              {marqueeItems.map((t) => (
                <span key={`${dup}-${t}`}>
                  {t} <span className="text-arc-teal">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between px-6 py-14 md:px-12 lg:px-16">
        <div className="mx-auto grid w-full max-w-6xl flex-1 gap-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <p className="font-serif text-2xl tracking-widest text-arc-charcoal">ARC WELLNESS</p>
            <p className="mt-4 max-w-sm font-sans text-sm leading-relaxed text-arc-charcoal/80">
              Elevated care. Extraordinary results. A life well-lived.
            </p>
            <p className="mt-6 font-sans text-xs text-arc-charcoal/55">
              © {new Date().getFullYear()} ARC Wellness. All rights reserved.
            </p>
          </div>

          {Object.entries(footerLinks).map(([heading, items]) => (
            <div key={heading}>
              <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-widest text-arc-charcoal">
                {heading}
              </p>
              <ul className="space-y-2 font-sans text-sm text-arc-charcoal/75">
                {items.map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:text-arc-teal">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-1">
            <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-widest text-arc-charcoal">
              Stay connected
            </p>
            <div className="flex gap-3 text-arc-teal">
              <a href="#" aria-label="Instagram">
                <IconInstagram className="size-5" />
              </a>
              <a href="#" aria-label="Facebook">
                <IconFacebook className="size-5" />
              </a>
              <a href="#" aria-label="TikTok">
                <TikTokIcon className="size-5" />
              </a>
            </div>
            <Link
              href="#book"
              className="mt-6 inline-block bg-arc-teal px-6 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-arc-teal-hover"
            >
              Book Here
            </Link>
            <a
              href="tel:+15555551234"
              className="mt-4 flex items-center gap-2 font-sans text-sm font-medium text-arc-charcoal"
            >
              <Phone className="size-4 text-arc-teal" />
              (555) 555-1234
            </a>
            <p className="mt-3 flex items-start gap-2 font-sans text-xs text-arc-charcoal/70">
              <MapPin className="mt-0.5 size-4 shrink-0 text-arc-teal" />
              Your City, ST — coming soon
            </p>
          </div>
        </div>

        <div className="mx-auto mt-12 flex w-full max-w-6xl flex-wrap items-center justify-center gap-6 border-t border-arc-cream-deep pt-8 font-sans text-[11px] text-arc-charcoal/55 md:justify-between">
          <Link href="#" className="hover:text-arc-teal">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-arc-teal">
            Terms of Use
          </Link>
          <button type="button" className="hover:text-arc-teal" onClick={scrollMainToTop}>
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
