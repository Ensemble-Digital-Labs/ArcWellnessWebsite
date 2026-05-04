"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ARC_LOCOMOTIVE_READY_EVENT } from "@/lib/locomotive";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type ScrollChapterIntroSectionProps = {
  id?: string;
  className?: string;
  /** Serif line above the paragraph (omit or pass empty string to hide). */
  headline?: string;
  body: string;
  /** Right panel image — slow pans horizontally while this block is pinned. */
  imageSrc: string;
};

/**
 * First “chapter” after the hero: same **pin + scrub** model as `ScrollExpandHero`
 * so scroll progress drives image pan and copy motion inside one viewport of travel.
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
        main.clientHeight || Math.round(window.innerHeight || 720);

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,
          scroller: main,
          start: "top top",
          end: () => `+=${endDist()}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.85,
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
  const headlineReveal = Math.min(1, p * 2.6);
  const bodyReveal = Math.min(1, Math.max(0, (p - 0.07) * 2.35));
  const imagePan = p * 12 - 6;
  const headlineDrift = (0.42 - p) * 36;
  const bodyDrift = (0.38 - p) * 32;

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        "relative flex min-h-[100dvh] flex-col justify-center overflow-hidden border-t border-white/10 bg-arc-cream",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-arc-cream via-arc-cream to-arc-teal-muted/20"
        aria-hidden
      />

      <span
        className="pointer-events-none absolute -right-2 top-6 font-serif text-[clamp(4.5rem,17vw,10rem)] font-medium leading-none text-arc-teal/[0.08] sm:right-4 md:top-10 md:text-[clamp(5rem,14vw,11rem)]"
        aria-hidden
      >
        01
      </span>

      {/* Panning photography — desktop; subtle strip on small screens */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] overflow-hidden md:inset-y-0 md:right-0 md:left-auto md:h-full md:w-[min(52%,520px)]"
        aria-hidden
      >
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `translateX(${imagePan}%) scale(1.14)`,
          }}
        >
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width:768px) 100vw, 520px"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-arc-cream via-arc-cream/85 to-arc-cream/40 md:bg-gradient-to-r md:from-arc-cream md:via-arc-cream/88 md:to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col justify-center px-6 pb-[42vh] pt-16 sm:pb-32 md:max-w-4xl md:px-16 md:py-16 md:pb-16 lg:pl-10 lg:pr-28">
        <div
          className="mb-5 h-20 w-px origin-top bg-arc-teal/45 md:mb-6 md:h-24"
          style={{
            transform: `scaleY(${Math.min(1, p * 1.35)})`,
            opacity: Math.min(1, p * 1.65),
          }}
          aria-hidden
        />

        {headline ? (
          <h2
            className="max-w-xl font-serif text-2xl font-semibold leading-snug tracking-tight text-arc-charcoal md:text-3xl lg:text-[2.05rem]"
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
            "max-w-2xl font-sans leading-relaxed text-arc-charcoal/88 md:text-lg lg:text-xl",
            headline ? "mt-5 md:mt-6" : "mt-0 text-lg md:text-xl",
          )}
          style={{
            opacity: bodyReveal,
            transform: `translateY(${8 + bodyDrift}px)`,
          }}
        >
          {body}
        </p>
      </div>
    </section>
  );
}
