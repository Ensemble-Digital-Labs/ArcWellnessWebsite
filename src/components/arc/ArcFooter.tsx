"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Accessibility, MessageCircle, Phone, Star } from "lucide-react";
import { ARC_SECTION_SEAM_TOP } from "@/lib/arc-layout";
import { cn } from "@/lib/utils";
import { IconFacebook, IconInstagram } from "@/components/arc/SocialIcons";
import { useArcFullscreenPin } from "@/lib/arcSectionPins";

/** Footer ambient plate — same asset family as site decoration (`public/assets/decoration/background/`). */
const FOOTER_AMBIENT_BG = "/assets/decoration/background/ambient-04.png" as const;

const footerLinkClass = cn(
  "text-white/88 transition-colors duration-200",
  "underline decoration-transparent underline-offset-[4px]",
  "hover:text-arc-teal hover:decoration-arc-teal/50",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/55 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
);

const legalLinkClass = cn(
  "text-white/55 transition-colors duration-200",
  "underline decoration-transparent underline-offset-2",
  "hover:text-white/90 hover:decoration-white/35",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
);

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

/** Placeholder — replace with production address. */
const FOOTER_ADDRESS = {
  line1: "Your Street Address, Suite 100",
  line2: "Your City, ST 00000",
} as const;

const FOOTER_HOURS = [
  "Mon–Fri: 9am – 5pm",
  "Sat: By appointment only",
] as const;

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

function SocialRow({ className }: { className?: string }) {
  const iconWrap =
    "rounded-full p-3 text-arc-champagne transition-colors hover:bg-white/10 hover:text-arc-champagne-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-champagne/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";
  return (
    <div className={cn("flex items-center justify-center gap-1 sm:gap-2", className)}>
      <a href="#" aria-label="Instagram" className={iconWrap}>
        <IconInstagram className="size-6" />
      </a>
      <a href="#" aria-label="Facebook" className={iconWrap}>
        <IconFacebook className="size-6" />
      </a>
      <a href="#" aria-label="TikTok" className={iconWrap}>
        <TikTokIcon className="size-6" />
      </a>
    </div>
  );
}

function StarRatingBlock() {
  return (
    <div className="flex flex-col items-center gap-1 text-center sm:flex-row sm:items-baseline sm:gap-3 md:items-start md:text-left">
      <p className="sr-only">Rated 5.0 out of 5 based on patient feedback.</p>
      <div className="flex items-baseline gap-2" aria-hidden>
        <span className="font-serif text-[2.85rem] font-light leading-none tracking-tight text-arc-champagne sm:text-[3.35rem] md:text-[3.65rem]">
          5.0
        </span>
        <div className="flex gap-0.5 pb-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-[1.05rem] fill-arc-champagne text-arc-champagne sm:size-[1.15rem]" strokeWidth={0} />
          ))}
        </div>
      </div>
      <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-white/55">
        Patient experience
      </span>
    </div>
  );
}

export function ArcFooter() {
  const rootRef = useRef<HTMLElement>(null);
  useArcFullscreenPin(rootRef);
  const year = new Date().getFullYear();

  return (
    <footer
      ref={rootRef}
      id="contact"
      className={cn(ARC_SECTION_SEAM_TOP, "relative flex min-h-[100dvh] flex-col overflow-hidden bg-arc-charcoal")}
    >
      <div className="border-b border-arc-charcoal/10 bg-[#ebe8e2]/90 py-2.5 overflow-hidden">
        <div className="animate-arc-marquee gap-10 whitespace-nowrap font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-arc-charcoal/50">
          {[0, 1].map((dup) => (
            <span key={dup} className="inline-flex gap-10 pr-10">
              {marqueeItems.map((t) => (
                <span key={`${dup}-${t}`}>
                  {t} <span className="text-arc-champagne">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-zinc-950 text-white">
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <Image
            src={FOOTER_AMBIENT_BG}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        <div className="relative z-[1] mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 pt-24 md:px-10 md:pt-32 lg:px-12 lg:pt-36">
          {/* Tier 1 — address | brand | contact */}
          <div className="grid gap-14 md:grid-cols-3 md:items-start md:gap-10 lg:gap-14">
            <div className="order-2 flex flex-col gap-1.5 text-center md:order-1 md:text-left">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-white/55 [text-shadow:0_1px_2px_rgba(0,0,0,0.65)] sm:text-[0.8125rem]">
                Visit
              </span>
              <address className="not-italic">
                <p className="font-sans text-base leading-relaxed text-white/92 [text-shadow:0_1px_3px_rgba(0,0,0,0.75)] md:text-lg">
                  {FOOTER_ADDRESS.line1}
                </p>
                <p className="font-sans text-base leading-relaxed text-white/92 [text-shadow:0_1px_3px_rgba(0,0,0,0.75)] md:text-lg">
                  {FOOTER_ADDRESS.line2}
                </p>
              </address>
            </div>

            <div className="order-1 flex flex-col items-center justify-center text-center md:order-2">
              <p className="max-w-[32ch] font-serif text-lg italic leading-snug text-[#f7f4ef]/92 [text-shadow:0_2px_12px_rgba(0,0,0,0.8)] sm:text-xl md:text-2xl md:leading-relaxed">
                Elevated care, extraordinary results — a life well-lived.
              </p>
            </div>

            <div className="order-3 flex flex-col items-center text-center md:items-end md:text-right">
              <div>
                <span className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-white/55 [text-shadow:0_1px_2px_rgba(0,0,0,0.65)] sm:text-[0.8125rem]">
                  Contact
                </span>
                <a
                  href="tel:+15555551234"
                  className="mt-2 flex min-h-[48px] items-center justify-center gap-2.5 font-sans text-base font-medium text-white/92 transition-colors [text-shadow:0_1px_3px_rgba(0,0,0,0.75)] hover:text-arc-teal md:justify-end md:text-lg"
                >
                  <Phone className="size-5 shrink-0 text-arc-champagne md:size-[1.35rem]" aria-hidden />
                  (555) 555-1234
                </a>
                <ul className="mt-2 space-y-1.5 font-sans text-sm leading-relaxed text-white/78 [text-shadow:0_1px_2px_rgba(0,0,0,0.7)] md:text-base">
                  {FOOTER_HOURS.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="my-14 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent md:my-16" aria-hidden />

          {/* Sitemap-style columns */}
          <nav className="grid grid-cols-2 gap-x-8 gap-y-9 sm:grid-cols-4" aria-label="Footer sitemap">
            {Object.entries(footerLinks).map(([heading, items]) => (
              <div key={heading}>
                <p className="mb-3.5 font-sans text-xs font-semibold uppercase tracking-[0.28em] text-white/60 [text-shadow:0_1px_2px_rgba(0,0,0,0.65)] sm:text-[0.8125rem]">
                  {heading}
                </p>
                <ul className="space-y-2.5 font-sans text-sm leading-snug md:text-base">
                  {items.map((item) => (
                    <li key={item}>
                      <Link href="#" className={footerLinkClass}>
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="my-14 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent md:my-16" aria-hidden />
        </div>

        {/* Tier 2 — full-width rail: rating flush left, social/legal centered, CTA flush right */}
        <div className="relative z-[1] w-full px-5 pb-14 pt-2 sm:px-8 md:px-12 md:pb-16 lg:px-16 xl:px-20">
          <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center md:gap-6 lg:gap-10">
            <div className="flex justify-center md:justify-start">
              <StarRatingBlock />
            </div>

            <div className="flex flex-col items-center gap-5 justify-self-center">
              <SocialRow />
              <p className="max-w-[min(100%,36rem)] text-center font-sans text-[10px] font-medium uppercase leading-relaxed tracking-[0.14em] text-white/60 [text-shadow:0_1px_2px_rgba(0,0,0,0.65)] sm:max-w-none sm:text-xs sm:tracking-[0.18em] md:text-[0.8125rem]">
                <span>© {year} ARC Wellness</span>
                <span className="mx-1.5 text-white/30" aria-hidden>
                  |
                </span>
                <span>All rights reserved</span>
                <span className="mx-1.5 text-white/30" aria-hidden>
                  |
                </span>
                <Link href="#" className={legalLinkClass}>
                  Sitemap
                </Link>
                <span className="mx-1.5 text-white/30" aria-hidden>
                  |
                </span>
                <Link href="#" className={legalLinkClass}>
                  Privacy
                </Link>
                <span className="mx-1.5 text-white/30" aria-hidden>
                  |
                </span>
                <Link href="#" className={legalLinkClass}>
                  Terms
                </Link>
                <span className="mx-1.5 text-white/30" aria-hidden>
                  |
                </span>
                <Link href="#" className={legalLinkClass}>
                  Accessibility
                </Link>
                <span className="mx-1.5 text-white/30" aria-hidden>
                  |
                </span>
                <button type="button" className={cn(legalLinkClass, "cursor-pointer border-0 bg-transparent p-0")} onClick={scrollMainToTop}>
                  Back to top
                </button>
              </p>
            </div>

            <div className="flex flex-col items-center text-center md:items-end md:justify-self-end md:text-right">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-white/55 [text-shadow:0_1px_2px_rgba(0,0,0,0.65)] sm:text-[0.8125rem]">
                New patients
              </p>
              <Link
                href="#book"
                className="mt-4 inline-block font-serif text-xl italic text-arc-champagne [text-shadow:0_2px_14px_rgba(0,0,0,0.75)] transition-colors hover:text-arc-champagne-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-champagne/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 sm:text-2xl md:text-[1.75rem]"
              >
                Schedule your consultation
              </Link>
            </div>
          </div>
        </div>

        {/* Accessibility / compliance strip */}
        <div className="relative z-[1] mt-auto border-t border-white/10 bg-arc-charcoal text-white">
          <div className="relative mx-auto flex max-w-5xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:gap-6 sm:px-6 md:px-10">
            <a
              href="#main"
              className="order-2 flex size-11 shrink-0 items-center justify-center self-center rounded-full bg-zinc-600 text-white transition-colors hover:bg-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-champagne/60 focus-visible:ring-offset-2 focus-visible:ring-offset-arc-charcoal sm:order-1 sm:self-auto"
              aria-label="Skip to main content"
            >
              <Accessibility className="size-5" aria-hidden />
            </a>

            <p className="order-1 flex-1 text-center font-sans text-[10px] leading-relaxed text-white/78 sm:order-2 sm:text-[11px] md:px-4">
              ARC Wellness is committed to digital accessibility and to providing an inclusive experience for every guest.
              If you have difficulty using this site or need assistance, please contact us — we will be glad to help.
            </p>

            <Link
              href="#book"
              className="order-3 flex size-11 shrink-0 items-center justify-center self-center rounded-full bg-arc-champagne text-arc-charcoal shadow-[0_2px_12px_rgba(0,0,0,0.25)] transition-colors hover:bg-arc-champagne-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-arc-charcoal sm:self-auto"
              aria-label="Book an appointment"
            >
              <MessageCircle className="size-5" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
