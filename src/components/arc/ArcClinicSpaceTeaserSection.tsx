"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ClinicCarouselSlide } from "@/components/arc/ArcClinicCarouselSection";
import { ClinicGalleryOverlay } from "@/components/arc/clinic-gallery/ClinicGalleryOverlay";
import {
  ARC_HEADLINE_TITLE_EMPHASIS_DARK_CLASS,
  ARC_SPLIT_HEADLINE_SERIF_CLASS,
  TitleEmphasis,
} from "@/components/arc/TitleEmphasis";
import { ARC_LOCOMOTIVE_READY_EVENT } from "@/lib/locomotive";
import { bindArcEnterOnceProgress } from "@/lib/arcEnterOnceScroll";
import { ARC_PAGE_RAIL_MAX } from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type ArcClinicSpaceTeaserSectionProps = {
  id?: string;
  title: string;
  titleEmphasis?: string;
  slides: readonly ClinicCarouselSlide[];
  ctaPrimary?: string;
  ctaSecondary?: string;
  className?: string;
};

/** Large concentric arcs anchored bottom-right — only the upper-left quadrant shows (Cardinal-style bleed). */
function ClinicCornerArcCta({
  label,
  ctaPrimary,
  ctaSecondary,
  motionStyle,
  buttonRef,
  onClick,
}: {
  label: string;
  ctaPrimary: string;
  ctaSecondary: string;
  motionStyle: React.CSSProperties;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  onClick: () => void;
}) {
  return (
    <div
      className="pointer-events-auto absolute bottom-0 right-0 z-20 size-[min(70vw,20rem)] sm:size-[min(68vw,30rem)] md:size-[min(52vw,36rem)]"
      style={motionStyle}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={onClick}
        aria-label={label}
        className={cn(
          "group relative block size-full cursor-pointer overflow-visible text-left",
          "transition-transform duration-500 ease-out",
          "hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-rose-gold/55 focus-visible:ring-offset-2 focus-visible:ring-offset-arc-charcoal",
        )}
      >
        <svg
          viewBox="0 0 400 400"
          className="pointer-events-none absolute bottom-0 right-0 size-[200%] origin-bottom-right"
          aria-hidden
          focusable="false"
        >
          <circle
            cx="400"
            cy="400"
            r="330"
            fill="none"
            stroke="currentColor"
            strokeWidth="32"
            className="text-arc-rose-gold/55 transition-colors duration-300 group-hover:text-arc-rose-gold/75"
          />
          <circle
            cx="400"
            cy="400"
            r="252"
            fill="none"
            stroke="currentColor"
            strokeWidth="26"
            className="text-arc-rose-gold/90 transition-colors duration-300 group-hover:text-arc-rose-gold"
          />
          <circle
            cx="400"
            cy="400"
            r="194"
            className="fill-arc-rose-gold/12 transition-[fill] duration-300 group-hover:fill-arc-rose-gold/22"
          />
        </svg>

        {/* Sit in the visible ring band — upper-left quadrant of the corner arcs */}
        <span className="pointer-events-none absolute left-[50%] top-[62%] z-10 flex w-[min(15rem,62%)] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 text-center sm:top-[64%] sm:w-[min(16.5rem,58%)] sm:gap-2.5 md:top-[65%] lg:w-[min(18rem,55%)]">
          <span className="font-sans text-[clamp(0.8125rem,2.4vw,1rem)] font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 [text-shadow:0_1px_18px_rgba(0,0,0,0.55)] group-hover:text-arc-rose-gold-hover">
            {ctaPrimary}
          </span>
          {ctaSecondary ? (
            <span className="font-serif text-[clamp(1.45rem,4.8vw,2.25rem)] italic leading-[1.12] text-arc-rose-gold transition-colors duration-300 [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] group-hover:text-arc-rose-gold-hover">
              {ctaSecondary}
            </span>
          ) : null}
        </span>
      </button>
    </div>
  );
}

export function ArcClinicSpaceTeaserSection({
  id,
  title,
  titleEmphasis,
  slides,
  ctaPrimary = "Click here",
  ctaSecondary = "to see our space",
  className,
}: ArcClinicSpaceTeaserSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const ctaAriaLabel = ctaSecondary ? `${ctaPrimary} ${ctaSecondary}` : ctaPrimary;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setProgress(1);
      return;
    }

    let dispose: (() => void) | null = null;
    let cancelled = false;

    const setup = () => {
      if (cancelled) return;
      const section = sectionRef.current;
      if (!section) return;
      dispose = bindArcEnterOnceProgress({
        trigger: section,
        onProgress: setProgress,
        playIfVisibleOnLoad: true,
      });
    };

    const onReady = () => queueMicrotask(setup);
    window.addEventListener(ARC_LOCOMOTIVE_READY_EVENT, onReady as EventListener);
    if ((window as unknown as { locomotiveScroll?: unknown }).locomotiveScroll) onReady();
    const fallback = window.setTimeout(() => {
      if (!cancelled && dispose === null) setup();
    }, 1800);

    return () => {
      cancelled = true;
      window.removeEventListener(ARC_LOCOMOTIVE_READY_EVENT, onReady as EventListener);
      window.clearTimeout(fallback);
      dispose?.();
    };
  }, [reduceMotion]);

  const p = reduceMotion ? 1 : progress;
  const titleMotion = {
    opacity: Math.min(1, 0.7 + p * 0.3),
    transform: `translate3d(0, ${22 - p * 22}px, 0)`,
  };
  const buttonReveal = Math.min(1, Math.max(0, (p - 0.28) / 0.72));
  const buttonMotion = {
    opacity: buttonReveal,
    transform: `translate3d(0, ${24 - buttonReveal * 24}px, 0) scale(${0.92 + buttonReveal * 0.08})`,
  };

  const handleCloseGallery = () => {
    setGalleryOpen(false);
    requestAnimationFrame(() => openButtonRef.current?.focus());
  };

  return (
    <>
      <section
        ref={sectionRef}
        id={id}
        className={cn(
          "relative overflow-hidden bg-arc-charcoal py-20 text-white sm:py-24 md:py-28",
          className,
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-arc-charcoal via-arc-charcoal/95 to-arc-charcoal/90"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(78,196,176,0.35), transparent 45%), radial-gradient(circle at 80% 70%, rgba(201,150,78,0.2), transparent 40%)",
          }}
          aria-hidden
        />

        <ClinicCornerArcCta
          label={ctaAriaLabel}
          ctaPrimary={ctaPrimary}
          ctaSecondary={ctaSecondary}
          motionStyle={buttonMotion}
          buttonRef={openButtonRef}
          onClick={() => setGalleryOpen(true)}
        />

        <div className={cn("pointer-events-none relative z-30 mx-auto px-6 sm:px-10 md:px-12", ARC_PAGE_RAIL_MAX)}>
          <div className="relative max-w-3xl pb-[min(42vw,11.5rem)] sm:max-w-2xl sm:pb-[min(36vw,12rem)] md:max-w-[min(100%,34rem)] md:pb-20 lg:pb-16">
            <h2
              className={cn(
                "pointer-events-auto max-w-none pb-[0.14em] text-white will-change-transform",
                "max-md:[text-shadow:0_2px_28px_rgba(0,0,0,0.75)]",
                ARC_SPLIT_HEADLINE_SERIF_CLASS,
              )}
              style={titleMotion}
            >
              <span className="block text-white">{title}</span>
              {titleEmphasis ? (
                <>
                  <span className="mt-1 block text-white md:hidden">{titleEmphasis}</span>
                  <TitleEmphasis
                    className={cn(
                      ARC_HEADLINE_TITLE_EMPHASIS_DARK_CLASS,
                      "mt-1 hidden leading-[1.04] md:block sm:mt-1.5",
                    )}
                  >
                    {titleEmphasis}
                  </TitleEmphasis>
                </>
              ) : null}
            </h2>
          </div>
        </div>
      </section>

      <ClinicGalleryOverlay
        open={galleryOpen}
        onClose={handleCloseGallery}
        slides={slides}
        reduceMotion={reduceMotion}
      />
    </>
  );
}
