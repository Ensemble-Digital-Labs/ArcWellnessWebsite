"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ClinicCarouselSlide } from "@/components/arc/ArcClinicCarouselSection";
import { ClinicGalleryOverlay } from "@/components/arc/clinic-gallery/ClinicGalleryOverlay";
import { TitleEmphasis } from "@/components/arc/TitleEmphasis";
import { ARC_LOCOMOTIVE_READY_EVENT } from "@/lib/locomotive";
import { bindArcEnterOnceProgress } from "@/lib/arcEnterOnceScroll";
import { ARC_PAGE_RAIL_MAX } from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type ArcClinicSpaceTeaserSectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  titleEmphasis?: string;
  slides: readonly ClinicCarouselSlide[];
  ctaLabel?: string;
  className?: string;
};

export function ArcClinicSpaceTeaserSection({
  id,
  eyebrow = "The space",
  title,
  titleEmphasis,
  slides,
  ctaLabel = "Explore the clinic",
  className,
}: ArcClinicSpaceTeaserSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);

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
        playIfVisibleOnLoad: false,
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
  const eyebrowMotion = {
    opacity: Math.min(1, 0.55 + p * 0.45),
    transform: `translate3d(${-18 + p * 18}px, 0, 0)`,
  };
  const titleMotion = {
    opacity: Math.min(1, 0.7 + p * 0.3),
    transform: `translate3d(0, ${22 - p * 22}px, 0)`,
  };
  const buttonMotion = {
    opacity: Math.min(1, Math.max(0, (p - 0.35) * 1.8)),
    transform: `translate3d(0, ${16 - Math.max(0, (p - 0.35) / 0.65) * 16}px, 0) scale(${0.96 + Math.max(0, (p - 0.35) / 0.65) * 0.04})`,
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
          "relative overflow-hidden bg-arc-charcoal py-24 text-white sm:py-28 md:py-32",
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

        <div className={cn("relative z-10 mx-auto px-6 sm:px-10 md:px-12", ARC_PAGE_RAIL_MAX)}>
          {eyebrow ? (
            <p
              className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-arc-teal will-change-transform"
              style={eyebrowMotion}
            >
              {eyebrow}
            </p>
          ) : null}

          <h2
            className="mt-4 max-w-[16ch] font-serif text-3xl font-semibold tracking-tight will-change-transform sm:text-4xl md:text-[2.75rem] md:leading-[1.08]"
            style={titleMotion}
          >
            {title}
            {titleEmphasis ? (
              <>
                {" "}
                <TitleEmphasis className="text-[1.06em] text-arc-rose-gold">
                  {titleEmphasis}
                </TitleEmphasis>
              </>
            ) : null}
          </h2>

          <div className="mt-10 sm:mt-12" style={buttonMotion}>
            <button
              ref={openButtonRef}
              type="button"
              onClick={() => setGalleryOpen(true)}
              className={cn(
                "inline-flex min-h-[56px] min-w-[min(100%,18rem)] items-center justify-center rounded-full",
                "border border-white/30 bg-white/10 px-10 py-4 sm:min-w-[20rem] sm:px-12 sm:py-5",
                "font-sans text-sm font-bold uppercase tracking-[0.22em] text-white",
                "shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-sm",
                "transition-[background-color,border-color,transform] duration-300",
                "hover:border-arc-teal/55 hover:bg-arc-teal/20 hover:shadow-[0_24px_56px_rgba(40,122,109,0.25)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/55 focus-visible:ring-offset-2 focus-visible:ring-offset-arc-charcoal",
              )}
            >
              {ctaLabel}
            </button>
            <p className="mt-4 max-w-md font-sans text-sm text-white/45">
              Opens a full-screen gallery — drag through our St. Louis clinic and hover each photo
              for its story.
            </p>
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
