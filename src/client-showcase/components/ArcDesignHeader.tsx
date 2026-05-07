"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { images } from "@/content/site";
import { CLIENT_SHOWCASE_BASE } from "@/client-showcase/content";
import { showcaseDesign, showcaseRoseClass } from "@/client-showcase/design-tokens";
import { showcaseBookCtaClass } from "@/client-showcase/showcase-book-cta";
import { IconFacebook, IconInstagram } from "@/components/arc/SocialIcons";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
    </svg>
  );
}

function hrefFor(hash: string) {
  return `${CLIENT_SHOWCASE_BASE}${hash}`;
}

const MAIN_LINKS = [
  { label: "About", hash: "#about" },
  { label: "Services", hash: "#services" },
  { label: "Your path", hash: "#path" },
  { label: "Testimonials", hash: "#testimonials" },
  { label: "FAQ", hash: "#faq" },
  { label: "Contact", hash: "#contact" },
] as const;

const iconClass =
  "text-arc-charcoal/70 transition-colors hover:text-arc-charcoal size-[18px] sm:size-5";

export function ArcDesignHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
      <div className="border-b border-arc-charcoal/10" style={{ backgroundColor: showcaseDesign.utilityBar }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-y-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 sm:justify-start">
            <a href="#" aria-label="Instagram" className={iconClass}>
              <IconInstagram className="size-5" />
            </a>
            <a href="#" aria-label="Facebook" className={iconClass}>
              <IconFacebook className="size-5" />
            </a>
            <a href="#" aria-label="TikTok" className={iconClass}>
              <TikTokIcon className="size-5" />
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-arc-charcoal/75 sm:gap-8 sm:text-[11px]">
            <Link href={hrefFor("#services")} className="transition-colors hover:text-arc-rose-gold-ink">
              Specials &amp; events
            </Link>
            <Link href={hrefFor("#book")} className="transition-colors hover:text-arc-rose-gold-ink">
              ARC Society membership
            </Link>
          </div>
          <div className="flex items-center justify-center gap-3 sm:justify-end">
            <a
              href="tel:+19495555279"
              className="whitespace-nowrap font-sans text-xs font-medium text-arc-rose-gold-ink sm:text-sm"
            >
              (949) 555-ARCW
            </a>
            <Link
              href={hrefFor("#contact")}
              className={showcaseBookCtaClass("light", "px-4 py-2 sm:px-6 sm:py-3")}
            >
              Patient portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div
        className="border-b border-arc-charcoal/10"
        style={{
          backgroundImage: "url('/assets/decoration/background/ambient-02.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-5 sm:px-6 sm:py-[1.375rem] lg:px-8 lg:py-7">
          <Link
            href={CLIENT_SHOWCASE_BASE}
            className="relative block h-9 w-[8rem] shrink-0 overflow-visible sm:h-10 sm:w-[9rem]"
            onClick={() => setOpen(false)}
          >
            {/* Keep clickable area as the original nav slot; render a larger transparent logo that can overflow visually. */}
            <span className="pointer-events-none absolute left-0 top-1/2 block h-24 w-[20rem] -translate-y-1/2 sm:h-28 sm:w-[24rem] lg:h-32 lg:w-[28rem]">
              <Image
                src={images.logo}
                alt="ARC Wellness"
                fill
                className="object-contain object-left"
                sizes="(min-width: 1024px) 448px, (min-width: 640px) 384px, 320px"
                priority
              />
            </span>
          </Link>

          <nav className="hidden flex-1 justify-center gap-5 lg:flex xl:gap-7" aria-label="Primary">
            {MAIN_LINKS.map((item) => (
              <Link
                key={item.label}
                href={hrefFor(item.hash)}
                className="inline-flex items-center gap-0.5 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-white/92 drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)] transition-colors hover:text-arc-rose-gold xl:text-xs"
              >
                {item.label}
                <ChevronDown className="size-3.5 opacity-80" strokeWidth={2} aria-hidden />
              </Link>
            ))}
          </nav>

          <div className="hidden items-center lg:flex">
            <Link href={hrefFor("#book")} className={showcaseBookCtaClass("dark", "px-5 py-2")}>
              Book now
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md border border-white/65 bg-black/10 text-white shadow-[0_1px_6px_rgba(0,0,0,0.35)] lg:hidden"
            aria-expanded={open}
            aria-controls="arc-design-mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id="arc-design-mobile-nav"
        className={cn("border-b border-arc-charcoal/10 bg-white lg:hidden", open ? "block" : "hidden")}
      >
        <ul className="mx-auto max-w-6xl space-y-1 px-4 py-3">
          {MAIN_LINKS.map((item) => (
            <li key={item.label}>
              <Link
                href={hrefFor(item.hash)}
                className="block rounded-md px-3 py-3 font-sans text-sm font-medium text-arc-charcoal transition-colors hover:bg-arc-rose-gold/12 hover:text-arc-rose-gold-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link
              href={hrefFor("#book")}
              className={cn(
                showcaseBookCtaClass("light", "w-full max-w-none justify-center py-3 text-sm tracking-[0.14em]"),
              )}
              onClick={() => setOpen(false)}
            >
              Book now
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
