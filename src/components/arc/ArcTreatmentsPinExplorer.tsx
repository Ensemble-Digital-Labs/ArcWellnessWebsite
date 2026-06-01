"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TitleEmphasis } from "@/components/arc/TitleEmphasis";
import { ARC_LOCOMOTIVE_READY_EVENT } from "@/lib/locomotive";
import {
  arcScrollTriggerScrollerProps,
  getArcScrollTriggerScroller,
  getArcScrollViewportHeight,
} from "@/lib/arcScrollMode";
import type { TreatmentPage } from "@/content/pages/treatments";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type ArcTreatmentsPinExplorerProps = {
  id?: string;
  title: string;
  subtitle: string;
  treatments: readonly TreatmentPage[];
};

export function ArcTreatmentsPinExplorer({
  id,
  title,
  subtitle,
  treatments,
}: ArcTreatmentsPinExplorerProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const panels = treatments.filter((t) => t.slug !== "overview").slice(0, 6);

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
      const scroller = getArcScrollTriggerScroller();
      const endDist = () => Math.round(getArcScrollViewportHeight(scroller) * 0.95);

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
  }, [reduceMotion]);

  const p = reduceMotion ? 1 : progress;

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative flex h-[100dvh] max-h-[100dvh] min-h-0 flex-col overflow-hidden bg-arc-charcoal"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-arc-charcoal/40 via-arc-charcoal/20 to-arc-charcoal/55" aria-hidden />

      <div
        className="relative z-10 flex min-h-0 flex-1 flex-col px-6 pb-4 pt-28 sm:pt-32 md:px-10 md:pt-36"
        style={{
          opacity: Math.min(1, p * 1.5),
          transform: `translate3d(0, ${Math.max(0, 24 - p * 24)}px, 0)`,
        }}
      >
        <div className="mx-auto w-full max-w-7xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-[#f7f4ef] sm:text-4xl md:text-[2.5rem]">
            Explore{" "}
            <TitleEmphasis className="text-[1.35em] text-arc-rose-gold sm:text-[1.45em]">
              {title}
            </TitleEmphasis>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-sm text-[#f7f4ef]/78 sm:text-base">{subtitle}</p>
        </div>

        <div className="mx-auto mt-8 flex min-h-0 w-full max-w-7xl flex-1 gap-2 overflow-hidden md:mt-10">
          {panels.map((panel, idx) => {
            const isActive = idx === activeIndex;
            return (
              <Link
                key={panel.slug}
                href={`/treatments/${panel.slug}`}
                onMouseEnter={() => setActiveIndex(idx)}
                onFocus={() => setActiveIndex(idx)}
                className={cn(
                  "group relative min-h-0 min-w-0 flex-1 overflow-hidden transition-[flex] duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/60",
                  isActive ? "md:flex-[2.6]" : "md:flex-[1]",
                )}
              >
                <Image
                  src={panel.imageSrc}
                  alt={panel.imageAlt}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
                <div className="absolute bottom-0 left-0 z-10 p-4 md:p-5">
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-arc-teal tabular-nums">
                    <span>{String(idx + 1).padStart(2, "0")}</span>
                    <span className="mx-1.5 text-white/35">/</span>
                    <span>{panel.categoryLabel}</span>
                  </p>
                  <p className="mt-1 font-serif text-lg font-semibold text-white sm:text-xl">{panel.title}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
