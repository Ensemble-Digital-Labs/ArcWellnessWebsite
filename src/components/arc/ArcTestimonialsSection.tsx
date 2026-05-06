"use client";

import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import { PinnedSection } from "@/components/arc/PinnedSection";
import SphereImageGrid, {
  type ImageData,
} from "@/components/ui/img-sphere";
import {
  TESTIMONIAL_SPHERE_TILE_COUNT,
  testimonialSphereBaseImages,
} from "@/content/testimonialSphereBaseImages";
import { pathPinFadeUp, usePathPinScrubProgress } from "@/lib/arcPinReveal";
import { cn } from "@/lib/utils";

const TESTIMONIALS_BACKGROUND_SRC =
  "/assets/sections/testimonials/testimonials-background.png" as const;

export type ArcTestimonialItem = {
  id: string;
  imageSrc: string;
  imageAlt: string;
  quote: string;
  attribution: string;
  /** Short label, e.g. care focus or visit type */
  context: string;
};

type ArcTestimonialsSectionProps = {
  id?: string;
  className?: string;
  items: readonly ArcTestimonialItem[];
};

/**
 * Testimonials: **`SphereImageGrid`** on black void + cream column with card.
 */
export function ArcTestimonialsSection({
  id = "testimonials",
  className,
  items,
}: ArcTestimonialsSectionProps) {
  const sphereHintId = useId();
  const reduceMotion = useReducedMotion();
  const interactionResumeTimeoutRef = useRef<number | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(
    () => items[0]?.id ?? null,
  );
  const [isSphereInteracting, setIsSphereInteracting] = useState(false);
  const { p, setPinProgress } = usePathPinScrubProgress();
  const sphereMotion = pathPinFadeUp(p, 0.08, 2.35);
  const hintMotion = pathPinFadeUp(p, 0.16, 2.05);
  const titleMotion = pathPinFadeUp(p, 0.08, 2.35);
  const cardMotion = pathPinFadeUp(p, 0.26, 2.2);

  const sphereInteractionHint =
    reduceMotion === true
      ? "Tap a portrait to read the testimonials."
      : "Spin me with a drag, then tap a portrait to read the testimonials.";

  const sphereImages: ImageData[] = useMemo(() => {
    const base = testimonialSphereBaseImages;
    const out: ImageData[] = [];
    for (let i = 0; i < TESTIMONIAL_SPHERE_TILE_COUNT; i++) {
      const b = base[i % base.length];
      const t = items[i % items.length];
      if (!t) break;
      out.push({
        id: `sphere-${i + 1}`,
        src: b.src,
        alt: `${b.alt} (${Math.floor(i / base.length) + 1})`,
        title: t.attribution,
        description: t.quote,
        testimonialId: t.id,
      });
    }
    return out;
  }, [items]);

  const selected = useMemo(
    () => items.find((t) => t.id === selectedId) ?? items[0] ?? null,
    [items, selectedId],
  );
  const selectedIndex = useMemo(
    () => (selected ? items.findIndex((t) => t.id === selected.id) : -1),
    [items, selected],
  );

  const holdAutoplayForMs = (ms: number) => {
    setIsSphereInteracting(true);
    if (interactionResumeTimeoutRef.current !== null) {
      window.clearTimeout(interactionResumeTimeoutRef.current);
    }
    interactionResumeTimeoutRef.current = window.setTimeout(() => {
      setIsSphereInteracting(false);
      interactionResumeTimeoutRef.current = null;
    }, ms);
  };

  useEffect(() => {
    if (items.length < 2 || isSphereInteracting) return;
    const timer = window.setInterval(() => {
      setSelectedId((prev) => {
        if (!prev) return items[0]?.id ?? null;
        const idx = items.findIndex((t) => t.id === prev);
        if (idx < 0) return items[0]?.id ?? null;
        return items[(idx + 1) % items.length]?.id ?? prev;
      });
    }, 4200);
    return () => window.clearInterval(timer);
  }, [items, isSphereInteracting]);

  useEffect(() => {
    return () => {
      if (interactionResumeTimeoutRef.current !== null) {
        window.clearTimeout(interactionResumeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <PinnedSection
      id={id}
      pinDistanceMultiplier={0.5}
      onProgress={setPinProgress}
      className={cn(
        "min-h-[100dvh] scroll-mt-28 border-t border-arc-teal/20 p-0",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src={TESTIMONIALS_BACKGROUND_SRC}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      <div className="flex min-h-[100dvh] flex-col lg:flex-row lg:items-stretch">
        <div
          data-scroll-section
          className="relative z-[1] flex min-h-[52vh] flex-1 items-center justify-center px-2 py-12 sm:min-h-[56vh] lg:min-h-[100dvh] lg:w-1/2 lg:justify-end lg:py-8 lg:pl-8 lg:pr-3 xl:pl-12 xl:pr-5"
        >
          <div
            role="region"
            aria-labelledby={sphereHintId}
            className="flex w-full max-w-[min(100%,640px)] flex-col items-center"
            onMouseEnter={() => holdAutoplayForMs(1800)}
            onMouseMove={() => holdAutoplayForMs(1800)}
            onMouseDown={() => holdAutoplayForMs(1800)}
            onMouseLeave={() => holdAutoplayForMs(600)}
            onTouchStart={() => holdAutoplayForMs(1800)}
            onTouchEnd={() => holdAutoplayForMs(900)}
          >
            <div className="w-full" style={sphereMotion}>
              <SphereImageGrid
                images={sphereImages}
                className="w-full"
                containerSize={600}
                sphereRadius={285}
                dragSensitivity={0.8}
                momentumDecay={0.96}
                maxRotationSpeed={6}
                baseImageScale={0.182}
                hoverScale={1.35}
                perspective={1580}
                autoRotate
                autoRotateSpeed={0.08}
                theme="light"
                fitContainer
                selectedId={selectedId}
                showModal={false}
                onImageSelect={(img) => {
                  holdAutoplayForMs(2200);
                  if (img.testimonialId) setSelectedId(img.testimonialId);
                }}
              />
            </div>
            <p
              id={sphereHintId}
              className="mt-4 max-w-[min(100%,20rem)] text-balance text-center font-sans text-xs leading-relaxed text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] sm:mt-5 sm:max-w-sm sm:text-[0.8125rem]"
              style={hintMotion}
            >
              {sphereInteractionHint}
            </p>
          </div>
        </div>

        <div
          data-scroll-section
          className="relative z-[1] flex flex-1 flex-col items-center justify-center px-5 py-12 sm:px-8 lg:w-1/2 lg:py-10 lg:px-6 xl:px-10 2xl:px-14"
        >
          <div className="mx-auto w-full max-w-lg text-center sm:max-w-xl lg:max-w-[min(100%,34rem)] xl:max-w-[min(100%,36rem)]">
            <div style={titleMotion}>
              <h2 className="-translate-y-2 mb-6 font-serif text-[2.1rem] font-semibold leading-tight tracking-tight text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.45)] sm:-translate-y-3 sm:mb-7 sm:text-4xl md:text-[2.45rem] lg:mb-8 lg:text-[2.65rem]">
                Testimonials
              </h2>
            </div>
            {selected ? (
              <div className="mx-auto w-full max-w-[30rem]" style={cardMotion}>
                <figure className="relative mx-auto h-[31rem] w-full max-w-[25rem]">
                  <div
                    aria-hidden
                    className="absolute inset-0 z-0 translate-x-16 translate-y-3 rotate-[14deg] rounded-2xl border border-gray-200/80 bg-white shadow-[0_0_10px_rgba(0,0,0,0.02)]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 z-[1] -translate-x-16 translate-y-3 -rotate-[14deg] rounded-2xl border border-gray-200/80 bg-white shadow-[0_0_10px_rgba(0,0,0,0.02)]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 z-[2] translate-x-10 translate-y-2 rotate-[9deg] rounded-2xl border border-gray-200/80 bg-white shadow-[0_0_10px_rgba(0,0,0,0.02)]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 z-[3] -translate-x-10 translate-y-2 -rotate-[9deg] rounded-2xl border border-gray-200/80 bg-white shadow-[0_0_10px_rgba(0,0,0,0.02)]"
                  />
                  <motion.div
                    key={selected.id}
                    className={cn(
                      "absolute inset-0 z-[4] h-full overflow-hidden rounded-2xl border border-gray-200/80 bg-white",
                      "shadow-[0_0_10px_rgba(0,0,0,0.02)]",
                    )}
                    initial={
                      reduceMotion
                        ? false
                        : {
                            x: selectedIndex % 2 === 0 ? -28 : 28,
                            y: 6,
                            rotate: selectedIndex % 2 === 0 ? -5 : 5,
                            scale: 0.985,
                          }
                    }
                    animate={{ x: 0, y: 0, rotate: 0, scale: 1 }}
                    transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="relative mx-2 mt-2 h-76 w-[calc(100%-1rem)] overflow-hidden rounded-xl shadow-lg">
                      <Image
                        src={selected.imageSrc}
                        alt={selected.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 320px, 350px"
                      />
                    </div>
                    <div className="flex min-h-[11.5rem] flex-col gap-y-3 px-5 py-4 text-left">
                      <figcaption className="min-w-0">
                        <cite className="not-italic">
                          <span className="block font-sans text-lg font-semibold leading-snug text-arc-charcoal">
                            {selected.attribution}
                          </span>
                          <span className="mt-1 block font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-arc-teal-ink">
                            {selected.context}
                          </span>
                        </cite>
                      </figcaption>
                      <blockquote>
                        <p className="font-sans text-[1.05rem] leading-relaxed text-arc-charcoal/80">
                          {selected.quote}
                        </p>
                      </blockquote>
                    </div>
                  </motion.div>
                </figure>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </PinnedSection>
  );
}
