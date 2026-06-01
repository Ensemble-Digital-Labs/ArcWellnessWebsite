"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { images } from "@/content/site";
import { primaryNav, siteMeta } from "@/content/siteMeta";
import { cn } from "@/lib/utils";

export function ArcInnerHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[100] border-b border-arc-charcoal/8 bg-arc-cream/92 backdrop-blur-md supports-[backdrop-filter]:bg-arc-cream/85">
      <div className="border-b border-arc-teal/10 bg-arc-teal-muted/35">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2 font-sans text-xs text-arc-charcoal/75 sm:px-6 lg:px-8">
          <a href={`tel:${siteMeta.phoneTel}`} className="hover:text-arc-teal-ink">
            {siteMeta.phone}
          </a>
          <a href={`mailto:${siteMeta.email}`} className="hover:text-arc-teal-ink">
            {siteMeta.email}
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8 lg:py-4">
        <Link
          href="/"
          className="relative block h-10 w-[8.5rem] shrink-0 sm:h-11 sm:w-[9.5rem]"
          onClick={() => setOpen(false)}
        >
          <Image
            src={images.logo}
            alt={siteMeta.brand}
            fill
            className="object-contain object-left"
            sizes="160px"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-6" aria-label="Primary">
          {primaryNav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-sans text-[13px] font-medium transition-colors xl:text-sm",
                  active ? "text-arc-teal-ink" : "text-arc-charcoal/80 hover:text-arc-teal-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/book"
            className="hidden rounded-full bg-arc-teal px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-[0_4px_20px_rgba(78,196,176,0.35)] transition-[filter,transform] hover:brightness-105 sm:inline-flex sm:text-[13px]"
          >
            Book now
          </Link>
          <button
            type="button"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-arc-charcoal/12 bg-white/60 text-arc-charcoal lg:hidden"
            aria-expanded={open}
            aria-controls="arc-mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id="arc-mobile-nav"
        className={cn(
          "border-t border-arc-charcoal/8 bg-arc-cream lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6" aria-label="Mobile">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 font-sans text-base font-medium text-arc-charcoal hover:bg-arc-teal-muted/50"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/book"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-arc-teal px-4 py-3 text-center font-sans text-sm font-semibold uppercase tracking-[0.12em] text-white"
          >
            Book now
          </Link>
        </nav>
      </div>
    </header>
  );
}
