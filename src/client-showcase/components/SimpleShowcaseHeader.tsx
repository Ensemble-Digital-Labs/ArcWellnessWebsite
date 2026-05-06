"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { images } from "@/content/site";
import { CLIENT_SHOWCASE_BASE } from "@/client-showcase/content";

/** Primary CTA — deep green reads close to many clinical / spa brand headers. */
const HEADER_ACCENT = "#1B3022";

const MAIN_NAV = [
  { label: "About us", hash: "#about" },
  { label: "What we treat", hash: "#concerns" },
  { label: "Services", hash: "#services" },
  { label: "Your path", hash: "#path" },
  { label: "Resources", hash: "#journal" },
  { label: "Contact", hash: "#contact" },
] as const;

const MOBILE_NAV = [...MAIN_NAV, { label: "Book visit", hash: "#book" } as const];

function hrefFor(hash: string) {
  return `${CLIENT_SHOWCASE_BASE}${hash}`;
}

const SHOWCASE_EMAIL = "hello@arcwellness.com";

export function SimpleShowcaseHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Tier 1 — utility strip (Vida-style: phone, email, book, portal) */}
      <div className="border-b border-arc-charcoal/10 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-6 sm:gap-y-1 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-sans text-xs text-arc-charcoal/80 sm:text-[13px]">
            <a href="tel:+15555551234" className="whitespace-nowrap hover:text-arc-teal-ink">
              (555) 555-1234
            </a>
            <span className="hidden text-arc-charcoal/25 sm:inline" aria-hidden>
              |
            </span>
            <a href={`mailto:${SHOWCASE_EMAIL}`} className="whitespace-nowrap hover:text-arc-teal-ink">
              {SHOWCASE_EMAIL}
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-5">
            <Link
              href={hrefFor("#book")}
              className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-arc-charcoal hover:text-arc-teal-ink sm:text-[13px]"
            >
              Book appointment
            </Link>
            <Link
              href={hrefFor("#contact")}
              className="inline-flex items-center gap-1 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-arc-charcoal/75 hover:text-arc-teal-ink sm:text-[13px]"
            >
              Patient portal
              <ArrowRight className="size-3" strokeWidth={2} aria-hidden />
            </Link>
          </div>
        </div>
      </div>

      {/* Tier 2 — logo + primary navigation */}
      <div className="border-b border-arc-charcoal/10 bg-arc-cream/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8 lg:py-4">
          <Link
            href={CLIENT_SHOWCASE_BASE}
            className="relative block h-9 w-[7.25rem] shrink-0 sm:h-10 sm:w-[8rem]"
            onClick={() => setOpen(false)}
          >
            <Image src={images.logo} alt="ARC Wellness" fill className="object-contain object-left" sizes="140px" priority />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex xl:gap-7" aria-label="Primary">
            {MAIN_NAV.map((item) => (
              <Link
                key={item.hash}
                href={hrefFor(item.hash)}
                className="font-sans text-[13px] font-medium text-arc-charcoal/88 transition-colors hover:text-arc-teal-ink xl:text-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={hrefFor("#book")}
              className="hidden rounded-full px-4 py-2 font-sans text-xs font-semibold text-white shadow-sm transition-[filter,transform] hover:brightness-110 sm:inline-flex sm:text-sm lg:px-5 lg:py-2.5"
              style={{ backgroundColor: HEADER_ACCENT }}
            >
              Book a consultation
            </Link>
            <Link
              href={hrefFor("#book")}
              className="inline-flex rounded-full px-3 py-2 font-sans text-[11px] font-semibold text-white shadow-sm sm:hidden"
              style={{ backgroundColor: HEADER_ACCENT }}
            >
              Book
            </Link>
            <button
              type="button"
              className={cn(
                "inline-flex size-10 items-center justify-center rounded-full border border-arc-charcoal/12 bg-white text-arc-charcoal lg:hidden",
              )}
              aria-expanded={open}
              aria-controls="showcase-mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
            </button>
          </div>
        </div>
      </div>

      <div
        id="showcase-mobile-nav"
        className={cn("border-b border-arc-charcoal/10 bg-arc-cream lg:hidden", open ? "block" : "hidden")}
      >
        <ul className="mx-auto max-w-6xl space-y-0.5 px-4 py-3 sm:px-6">
          {MOBILE_NAV.map((item) => (
            <li key={`${item.label}-${item.hash}`}>
              <Link
                href={hrefFor(item.hash)}
                className="block rounded-lg px-3 py-3 font-sans text-[15px] text-arc-charcoal hover:bg-black/[0.04]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
