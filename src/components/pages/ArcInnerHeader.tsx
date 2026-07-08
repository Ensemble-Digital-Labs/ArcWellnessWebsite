"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { images } from "@/content/site";
import { siteMeta } from "@/content/siteMeta";
import { ArcNavDrawerMenu } from "@/components/arc/ArcNavDrawerMenu";
import { ArcNavDrawerBookCta } from "@/components/arc/ArcNavDrawerBookCta";
import { ArcNavDrawerTopBar } from "@/components/arc/ArcNavDrawerTopBar";
import { cn } from "@/lib/utils";

function useCanHover() {
  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return canHover;
}

export function ArcInnerHeader() {
  const [open, setOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const canHover = useCanHover();
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-[100] border-b border-arc-charcoal/8 bg-arc-cream/92 backdrop-blur-md supports-[backdrop-filter]:bg-arc-cream/85">
        <div className="border-b border-arc-teal/10 bg-arc-teal-muted/35">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2 font-sans text-xs text-arc-charcoal/75 sm:px-6 lg:px-8">
            <a href={`tel:${siteMeta.phoneTel}`} className="hover:text-arc-teal">
              {siteMeta.phone}
            </a>
            <a href={`mailto:${siteMeta.email}`} className="hover:text-arc-teal">
              {siteMeta.email}
            </a>
          </div>
        </div>

        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8 lg:py-4">
          <Link
            href="/"
            className="relative block h-10 w-[8.5rem] shrink-0 sm:h-11 sm:w-[9.5rem]"
            onClick={closeMenu}
          >
            <Image
              src={images.logo}
              alt={siteMeta.brand}
              fill
              className="arc-header-logo object-contain object-left"
              sizes="160px"
              priority
            />
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-arc-charcoal/12 bg-white/60 text-arc-charcoal"
              aria-expanded={open}
              aria-controls="arc-inner-nav-drawer"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-[1000] bg-black/55 transition-opacity",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeMenu();
        }}
      />

      <nav
        id="arc-inner-nav-drawer"
        className={cn(
          "fixed inset-y-0 right-0 z-[1001] flex max-h-[100dvh] w-full max-w-[min(100vw,28rem)] flex-col bg-arc-cream text-arc-charcoal shadow-[-12px_0_40px_rgba(0,0,0,0.12)] transition-transform duration-300 sm:max-w-[min(100vw,32rem)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
        aria-label="Site navigation"
        inert={!open}
      >
        <ArcNavDrawerTopBar>
          <ArcNavDrawerBookCta closeMenu={closeMenu} />
        </ArcNavDrawerTopBar>

        <div className="arc-scroll-subtle relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-8 pb-12 pt-2 sm:px-10 sm:pt-4">
          <ArcNavDrawerMenu
            closeMenu={closeMenu}
            reducedMotion={reducedMotion}
            menuOpen={open}
            canHover={canHover}
          />
        </div>
      </nav>
    </>
  );
}
