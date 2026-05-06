"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArcStandardCta } from "@/components/arc/ArcStandardCta";
import { ARC_LOCOMOTIVE_READY_EVENT } from "@/lib/locomotive";
import { ARC_PAGE_RAIL_MAX } from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type ScrollChapterIntroSectionProps = {
  id?: string;
  className?: string;
  headline?: string;
  body: string;
  imageSrc: string;
};

/**
 * Second “chapter” after hero: **pin + scrub** on `#main` (locked viewport while scrolling)
 * so progress drives gradient, image pan/scale, and copy motion — split layout uses left
 * copy column and right photography (header logo stays top-left site-wide).
 */
export function ScrollChapterIntroSection({
  id,
  className,
  headline,
  body,
  imageSrc,
}: ScrollChapterIntroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

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

    let revert: (() => void) | null = null;
    let cancelled = false;

    const setup = () => {
      if (cancelled) return;
      const section = sectionRef.current;
      const main = document.querySelector<HTMLElement>("#main");
      if (!section || !main) return;

      const endDist = () =>
        Math.round((main.clientHeight || Math.round(window.innerHeight || 720)) * 1.12);

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,
          scroller: main,
          start: "top top",
          end: () => `+=${endDist()}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.75,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setProgress(self.progress);
          },
        });
      }, section);

      revert = () => ctx.revert();
      requestAnimationFrame(() => ScrollTrigger.refresh());
      window.setTimeout(() => ScrollTrigger.refresh(), 120);
    };

    const onReady = () => queueMicrotask(setup);

    window.addEventListener(ARC_LOCOMOTIVE_READY_EVENT, onReady as EventListener);

    if ((window as unknown as { locomotiveScroll?: unknown }).locomotiveScroll) {
      onReady();
    }

    const fallback = window.setTimeout(() => {
      if (!cancelled && revert === null) setup();
    }, 1800);

    return () => {
      cancelled = true;
      window.removeEventListener(ARC_LOCOMOTIVE_READY_EVENT, onReady as EventListener);
      window.clearTimeout(fallback);
      revert?.();
    };
  }, [reduceMotion]);

  const p = reduceMotion ? 1 : progress;
  const headlineReveal = Math.min(1, p * 2.45);
  const bodyReveal = Math.min(1, Math.max(0, (p - 0.1) * 2.2));
  const ctaReveal = Math.min(1, Math.max(0, (p - 0.22) * 2.5));
  const imagePan = p * 10 - 5;
  const imageScale = 1.1 + p * 0.06;
  const headlineDrift = (0.45 - p) * 40;
  const bodyDrift = (0.4 - p) * 28;
  const gradientMid = 36 + p * 14;
  const ruleScale = Math.min(1, p * 1.45);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        "relative isolate flex min-h-[100dvh] flex-col overflow-hidden bg-arc-cream",
        className,
      )}
    >
      {/* Full-bleed photography (locked section — pans while pinned) */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-[-8%] will-change-transform"
          style={{
            transform: `translateX(${imagePan}%) scale(${imageScale})`,
          }}
        >
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover object-[55%_center] md:object-[58%_center]"
            sizes="100vw"
          />
        </div>
      </div>

      {/* Progress-driven mist — wide screens: sweep L→R; narrow: top sheet so photo shows below */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] md:hidden"
        style={{
          background: `linear-gradient(180deg,
            rgba(247, 244, 239, ${0.97 - p * 0.08}) 0%,
            rgba(247, 244, 239, ${0.72 - p * 0.25}) 52%,
            rgba(247, 244, 239, 0) 100%)`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden md:block"
        style={{
          background: `linear-gradient(100deg,
            rgba(247, 244, 239, ${0.94 - p * 0.12}) 0%,
            rgba(247, 244, 239, ${0.78 - p * 0.2}) ${gradientMid - 6}%,
            rgba(247, 244, 239, ${0.35 - p * 0.28}) ${gradientMid + 8}%,
            rgba(247, 244, 239, 0) ${Math.min(88, gradientMid + 38)}%)`,
        }}
        aria-hidden
      />

      <div
        className={cn(
          "relative z-10 mx-auto flex min-h-[100dvh] w-full flex-col md:flex-row md:items-stretch",
          ARC_PAGE_RAIL_MAX,
        )}
      >
        {/* Copy column — uses width so center isn’t consumed by a logo */}
        <div className="flex w-full flex-[1.02] flex-col justify-center bg-arc-cream/88 px-6 py-16 backdrop-blur-[1.5px] sm:px-10 sm:py-20 md:max-w-[min(100%,34rem)] md:flex-none md:bg-arc-cream/82 md:px-12 md:py-24 lg:px-14">
          <div
            className="mb-2 h-16 w-px origin-top bg-arc-charcoal/25 sm:h-20 md:h-24"
            style={{
              transform: `scaleY(${ruleScale})`,
              opacity: Math.min(1, p * 1.55),
            }}
            aria-hidden
          />

          {headline ? (
            <h2
              className="max-w-[22ch] font-serif text-3xl font-semibold leading-[1.12] tracking-tight text-arc-charcoal sm:text-[2rem] md:text-[2.25rem] lg:text-[2.45rem]"
              style={{
                opacity: headlineReveal,
                transform: `translateY(${headlineDrift}px)`,
              }}
            >
              {headline}
            </h2>
          ) : null}

          <p
            className={cn(
              "max-w-xl font-sans leading-relaxed text-arc-charcoal/88 sm:text-[1.05rem] md:text-lg",
              headline ? "mt-6 sm:mt-7 md:mt-8" : "mt-0",
            )}
            style={{
              opacity: bodyReveal,
              transform: `translateY(${10 + bodyDrift}px)`,
            }}
          >
            {body}
          </p>

          <ArcStandardCta
            href="/#about"
            className="mt-8 w-fit sm:mt-10"
            style={{
              opacity: ctaReveal,
              transform: `translateY(${6 + (0.35 - p) * 20}px)`,
            }}
          >
            Continue to who we are
          </ArcStandardCta>
        </div>

        {/* Spacer: photo reads on the right; on md+ this flexes so copy doesn’t max out full rail */}
        <div className="hidden min-h-[min(40dvh,320px)] flex-1 md:block" aria-hidden />
      </div>
    </section>
  );
}
