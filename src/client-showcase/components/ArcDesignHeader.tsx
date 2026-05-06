"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { images } from "@/content/site";
import { CLIENT_SHOWCASE_BASE } from "@/client-showcase/content";
import { showcaseDesign } from "@/client-showcase/design-tokens";
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
  /** Same destination as services grid in this one-page mock. */
  { label: "Conditions / Concerns", hash: "#services" },
  { label: "Patients", hash: "#patients" },
  { label: "Shop", hash: "#shop" },
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
            <Link href={hrefFor("#services")} className="hover:text-arc-charcoal">
              Specials &amp; events
            </Link>
            <Link href={hrefFor("#book")} className="hover:text-arc-charcoal">
              ARC Society membership
            </Link>
          </div>
          <div className="flex items-center justify-center gap-3 sm:justify-end">
            <a
              href="tel:+19495555279"
              className="whitespace-nowrap font-sans text-xs font-medium text-arc-charcoal sm:text-sm"
            >
              (949) 555-ARCW
            </a>
            <Link
              href={hrefFor("#book")}
              className="rounded-md px-4 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-arc-charcoal shadow-sm transition-colors hover:opacity-95 sm:text-[11px]"
              style={{ backgroundColor: showcaseDesign.sage }}
            >
              Book here
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="border-b border-arc-charcoal/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8 lg:py-4">
          <Link href={CLIENT_SHOWCASE_BASE} className="relative block h-9 w-[8rem] shrink-0 sm:h-10 sm:w-[9rem]" onClick={() => setOpen(false)}>
            <Image src={images.logo} alt="ARC Wellness" fill className="object-contain object-left" sizes="150px" priority />
          </Link>

          <nav className="hidden flex-1 justify-center gap-5 lg:flex xl:gap-7" aria-label="Primary">
            {MAIN_LINKS.map((item) => (
              <Link
                key={item.label}
                href={hrefFor(item.hash)}
                className="inline-flex items-center gap-0.5 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-arc-charcoal/85 transition-colors hover:text-arc-charcoal xl:text-xs"
              >
                {item.label}
                <ChevronDown className="size-3.5 opacity-50" strokeWidth={2} aria-hidden />
              </Link>
            ))}
          </nav>

          <div className="hidden items-center lg:flex">
            <Link
              href={hrefFor("#book")}
              className="rounded-md border-2 bg-transparent px-5 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors hover:bg-arc-charcoal/[0.04]"
              style={{ borderColor: showcaseDesign.sageOutline, color: showcaseDesign.sageOutline }}
            >
              Book now
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md border border-arc-charcoal/15 text-arc-charcoal lg:hidden"
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
                className="block rounded-md px-3 py-3 font-sans text-sm font-medium text-arc-charcoal hover:bg-arc-charcoal/[0.04]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link
              href={hrefFor("#book")}
              className="block rounded-md border-2 py-3 text-center font-sans text-sm font-semibold uppercase tracking-wide"
              style={{ borderColor: showcaseDesign.sageOutline, color: showcaseDesign.sageOutline }}
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
