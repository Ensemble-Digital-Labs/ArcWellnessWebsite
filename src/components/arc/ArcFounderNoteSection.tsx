"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ARC_EDITORIAL_BODY_CLASS,
  ARC_HEADLINE_TITLE_EMPHASIS_CLASS,
  ARC_STACKED_HEADLINE_SERIF_CLASS,
  TitleEmphasis,
} from "@/components/arc/TitleEmphasis";
import { ARC_LOCOMOTIVE_READY_EVENT } from "@/lib/locomotive";
import { bindArcEnterOnceProgress } from "@/lib/arcEnterOnceScroll";
import { arcScrollTriggerScrollerProps } from "@/lib/arcScrollMode";
import { ARC_VOOBAN_EASE } from "@/lib/arcVoobanMotion";
import { ARC_PAGE_RAIL_MAX } from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type ArcFounderNoteSectionProps = {
  id?: string;
  title: string;
  titleEmphasis: string;
  /** Short pull line under the headline. */
  lead: string;
  /** Condensed letter (1–2 paragraphs). */
  body: string;
  signoff: string;
  role: string;
  imageSrc: string;
  imageAlt: string;
  className?: string;
};

function usePortraitReveal(
  imageRef: React.RefObject<HTMLDivElement | null>,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled) return;
    const el = imageRef.current;
    if (!el) return;

    let revert: (() => void) | null = null;
    let cancelled = false;

    const setup = () => {
      if (cancelled || !imageRef.current) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, scale: 1.04, y: 28 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: ARC_VOOBAN_EASE,
            scrollTrigger: {
              trigger: imageRef.current,
              ...arcScrollTriggerScrollerProps(),
              start: "top 88%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      }, imageRef.current);

      revert = () => ctx.revert();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const onReady = () => queueMicrotask(setup);
    window.addEventListener(ARC_LOCOMOTIVE_READY_EVENT, onReady as EventListener);
    if ((window as unknown as { locomotiveScroll?: unknown }).locomotiveScroll) onReady();
    const fallback = window.setTimeout(() => {
      if (!cancelled && revert === null) setup();
    }, 1600);

    return () => {
      cancelled = true;
      window.removeEventListener(ARC_LOCOMOTIVE_READY_EVENT, onReady as EventListener);
      window.clearTimeout(fallback);
      revert?.();
    };
  }, [imageRef, enabled]);
}

/**
 * About founder — portrait-forward split; condensed copy (not a full letter wall).
 */
export function ArcFounderNoteSection({
  id,
  title,
  titleEmphasis,
  lead,
  body,
  signoff,
  role,
  imageSrc,
  imageAlt,
  className,
}: ArcFounderNoteSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
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

    const section = sectionRef.current;
    if (!section) return;

    return bindArcEnterOnceProgress({
      trigger: section,
      onProgress: setProgress,
      playIfVisibleOnLoad: false,
      duration: 1.35,
    });
  }, [reduceMotion]);

  usePortraitReveal(imageRef, !reduceMotion);

  const p = reduceMotion ? 1 : progress;
  const copyMotion = {
    opacity: Math.min(1, Math.max(0, (p - 0.08) * 1.15)),
    transform: `translate3d(0, ${24 - p * 24}px, 0)`,
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn("overflow-hidden bg-arc-cream", className)}
    >
      <div
        className={cn(
          "mx-auto grid min-h-0 w-full px-6 pt-6 sm:px-10 sm:pt-8 lg:min-h-[min(88dvh,780px)] lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-stretch lg:gap-0 lg:p-10 lg:pt-12 xl:p-12",
          ARC_PAGE_RAIL_MAX,
        )}
      >
        <div
          data-scroll-section
          className="relative min-h-[min(68dvh,520px)] w-full sm:min-h-[min(72dvh,560px)] lg:min-h-0 lg:h-full"
        >
          <div
            ref={imageRef}
            className="absolute inset-0 overflow-hidden rounded-2xl shadow-[0_20px_48px_rgba(44,44,44,0.1)] will-change-[transform,opacity] sm:rounded-3xl lg:rounded-2xl lg:shadow-[0_24px_56px_rgba(44,44,44,0.12)] [transform:translateZ(0)]"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              loading="lazy"
              className="object-cover object-[50%_18%]"
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
            <div
              className="pointer-events-none absolute inset-0 hidden rounded-2xl lg:block lg:rounded-2xl lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-arc-cream/20"
              aria-hidden
            />
          </div>
        </div>

        <div
          data-scroll-section
          className="relative flex flex-col items-center justify-center py-10 text-center sm:py-12 lg:items-start lg:px-4 lg:py-16 lg:text-left xl:px-8 xl:py-20"
          style={reduceMotion ? undefined : copyMotion}
        >
          <div className="flex min-w-0 flex-col items-center pb-[0.12em] text-center lg:items-start lg:text-left">
            <h2 className={cn("text-arc-charcoal", ARC_STACKED_HEADLINE_SERIF_CLASS)}>
              <span className="block">{title}</span>
              <TitleEmphasis
                className={cn(
                  ARC_HEADLINE_TITLE_EMPHASIS_CLASS,
                  "mx-auto mt-3 block w-max max-w-full leading-none sm:mt-3.5 lg:mx-0",
                )}
              >
                {titleEmphasis}
              </TitleEmphasis>
            </h2>
          </div>

          <p
            className={cn(
              "mt-8 max-w-xl font-serif text-[clamp(1.05rem,2.5vw,1.4rem)] font-medium leading-[1.42] tracking-tight text-arc-charcoal sm:mt-10 sm:text-[clamp(1.15rem,2.6vw,1.55rem)]",
            )}
          >
            {lead}
          </p>

          <p className={cn("mt-6 max-w-lg sm:mt-7", ARC_EDITORIAL_BODY_CLASS)}>{body}</p>

          <footer className="mt-10 w-full max-w-lg border-t border-arc-charcoal/10 pt-8 sm:mt-12 lg:max-w-none">
            <p className="font-serif text-[clamp(1.125rem,2.2vw,1.35rem)] font-semibold tracking-tight text-arc-charcoal">
              — {signoff}
            </p>
            <p className="mt-2 font-sans text-sm font-medium uppercase tracking-[0.14em] text-arc-charcoal/55">
              {role}
            </p>
          </footer>
        </div>
      </div>
    </section>
  );
}
