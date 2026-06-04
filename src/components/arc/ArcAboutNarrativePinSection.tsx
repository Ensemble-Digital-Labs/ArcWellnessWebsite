"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArcPinProgressRail } from "@/components/arc/ArcPinProgressRail";
import { ArcScrollRevealMask, ArcScrollSplitReveal } from "@/components/arc/ArcScrollSplitReveal";
import { ArcStandardCta } from "@/components/arc/ArcStandardCta";
import { TitleEmphasis } from "@/components/arc/TitleEmphasis";
import { ARC_LOCOMOTIVE_READY_EVENT } from "@/lib/locomotive";
import {
  arcScrollTriggerScrollerProps,
  getArcScrollTriggerScroller,
  getArcScrollViewportHeight,
} from "@/lib/arcScrollMode";
import { pathPinFadeUp } from "@/lib/arcPinReveal";
import { ARC_PAGE_RAIL_MAX } from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type ArcAboutNarrativePinSectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  titleEmphasis: string;
  storyLines: readonly string[];
  ctaHref?: string;
  ctaLabel?: string;
  /** `pin-scrub` locks viewport; `enter-once` reveals lines automatically when scrolled into view. */
  motion?: "pin-scrub" | "enter-once";
};

/**
 * Pinned about narrative — scroll scrubs line-by-line text reveal (Vooban-style).
 */
export function ArcAboutNarrativePinSection({
  id,
  eyebrow,
  title,
  titleEmphasis,
  storyLines,
  ctaHref,
  ctaLabel,
  motion = "enter-once",
}: ArcAboutNarrativePinSectionProps) {
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
      if (!section) return;

      if (motion === "enter-once") {
        setProgress(1);
        return;
      }

      const scroller = getArcScrollTriggerScroller();
      const lineCount = storyLines.length;
      const endDist = () =>
        Math.round(getArcScrollViewportHeight(scroller) * Math.min(2.2, 0.95 + lineCount * 0.18));

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,
          ...arcScrollTriggerScrollerProps(),
          start: "top top",
          end: () => `+=${endDist()}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.75,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setProgress(self.progress),
        });
      }, section);

      revert = () => ctx.revert();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const onReady = () => queueMicrotask(setup);
    window.addEventListener(ARC_LOCOMOTIVE_READY_EVENT, onReady as EventListener);
    if ((window as unknown as { locomotiveScroll?: unknown }).locomotiveScroll) onReady();
    const fallback = window.setTimeout(() => {
      if (!cancelled && revert === null) setup();
    }, 1800);

    return () => {
      cancelled = true;
      window.removeEventListener(ARC_LOCOMOTIVE_READY_EVENT, onReady as EventListener);
      window.clearTimeout(fallback);
      revert?.();
    };
  }, [reduceMotion, motion, storyLines.length]);

  const pinScrub = motion === "pin-scrub";
  const p = reduceMotion || !pinScrub ? 1 : progress;
  const headerBase = pathPinFadeUp(p, 0, 2.4);
  const headerMotion = {
    ...headerBase,
    opacity: Math.max(0.96, typeof headerBase.opacity === "number" ? headerBase.opacity : 0),
    transform:
      p < 0.02
        ? "translate3d(0, 0, 0)"
        : headerBase.transform,
  };
  const ctaMotion = pathPinFadeUp(p, 0.55, 2.5);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        "relative flex flex-col overflow-hidden bg-arc-cream",
        pinScrub ? "min-h-[100dvh]" : "py-20 sm:py-24",
      )}
    >
      {pinScrub ? (
        <ArcPinProgressRail
          progress={p}
          label={`${String(Math.min(storyLines.length, Math.ceil(p * storyLines.length) || 1)).padStart(2, "0")} / ${String(storyLines.length).padStart(2, "0")}`}
        />
      ) : null}

      <div
        className={cn(
          "relative z-10 mx-auto flex w-full flex-col justify-center px-6 sm:px-10 md:px-12",
          pinScrub ? "min-h-[100dvh] py-20" : "py-0",
          ARC_PAGE_RAIL_MAX,
        )}
      >
        <div style={headerMotion}>
          <p className="font-sans text-xs font-bold uppercase tracking-[0.28em] text-arc-teal-ink">{eyebrow}</p>
          <ArcScrollRevealMask className="mt-4">
            <h2 className="max-w-[18ch] font-serif text-[clamp(2rem,6vw,3.25rem)] font-semibold leading-[1.08] tracking-tight text-arc-charcoal">
              {title}{" "}
              <TitleEmphasis className="text-[1.12em] text-arc-rose-gold-ink">{titleEmphasis}</TitleEmphasis>
            </h2>
          </ArcScrollRevealMask>
        </div>

        <ArcScrollSplitReveal
          className="mt-10 max-w-3xl sm:mt-12 md:mt-14"
          lines={storyLines}
          scrubProgress={pinScrub ? p : undefined}
          lineClassName="font-serif text-[clamp(1.25rem,3.2vw,2rem)] font-medium leading-[1.35] tracking-tight text-arc-charcoal/92"
        />

        {ctaHref && ctaLabel ? (
          <div className="mt-10 sm:mt-12" style={ctaMotion}>
            <ArcStandardCta href={ctaHref}>{ctaLabel}</ArcStandardCta>
          </div>
        ) : null}
      </div>
    </section>
  );
}
