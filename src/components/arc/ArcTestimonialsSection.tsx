"use client";

import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useId, useMemo, useState } from "react";

import { PinnedSection } from "@/components/arc/PinnedSection";
import SphereImageGrid, {
  type ImageData,
} from "@/components/ui/img-sphere";
import {
  TESTIMONIAL_SPHERE_TILE_COUNT,
  testimonialSphereBaseImages,
} from "@/content/testimonialSphereBaseImages";
import { cn } from "@/lib/utils";

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
  const [selectedId, setSelectedId] = useState<string | null>(
    () => items[0]?.id ?? null,
  );

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

  return (
    <PinnedSection
      id={id}
      className={cn(
        "min-h-[100dvh] scroll-mt-28 border-t border-arc-teal/20 p-0",
        className,
      )}
    >
      <div className="flex min-h-[100dvh] flex-col lg:flex-row lg:items-stretch">
        <div
          data-scroll-section
          className="flex min-h-[52vh] flex-1 items-center justify-center bg-arc-cream px-2 py-12 sm:min-h-[56vh] lg:min-h-[100dvh] lg:w-1/2 lg:justify-end lg:py-8 lg:pl-8 lg:pr-3 xl:pl-12 xl:pr-5"
        >
          <div
            role="region"
            aria-labelledby={sphereHintId}
            className="flex w-full max-w-[min(100%,640px)] flex-col items-center"
          >
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
                if (img.testimonialId) setSelectedId(img.testimonialId);
              }}
            />
            <p
              id={sphereHintId}
              className="mt-4 max-w-[min(100%,20rem)] text-balance text-center font-sans text-xs leading-relaxed text-arc-charcoal/72 sm:mt-5 sm:max-w-sm sm:text-[0.8125rem]"
            >
              {sphereInteractionHint}
            </p>
          </div>
        </div>

        <div
          data-scroll-section
          className="flex flex-1 flex-col items-center justify-center bg-arc-cream px-5 py-12 sm:px-8 lg:w-1/2 lg:py-10 lg:px-6 xl:px-10 2xl:px-14"
        >
          <div className="mx-auto w-full max-w-lg text-center sm:max-w-xl lg:max-w-[min(100%,34rem)] xl:max-w-[min(100%,36rem)]">
            <h2 className="mb-6 font-serif text-[1.75rem] font-semibold leading-tight tracking-tight text-arc-charcoal sm:mb-7 sm:text-3xl md:text-[2rem] lg:mb-8">
              Testimonials
            </h2>
            {selected ? (
              <figure
                className={cn(
                  "relative overflow-hidden rounded-2xl border border-arc-teal/20 bg-white",
                  "p-8 shadow-[0_24px_70px_rgba(0,0,0,0.09)] sm:p-10 md:p-11 lg:p-12",
                  "ring-1 ring-arc-charcoal/[0.04]",
                )}
              >
                <div
                  className="pointer-events-none absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-arc-teal via-arc-teal/70 to-arc-teal/25"
                  aria-hidden
                />
                <div className="flex flex-col gap-8 text-center sm:gap-9">
                  <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-6 md:gap-7">
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-full border-2 border-arc-teal/40 shadow-[0_8px_24px_rgba(0,0,0,0.12)] sm:size-28 md:size-[7.25rem]">
                      <Image
                        src={selected.imageSrc}
                        alt={selected.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 80px, (max-width: 1024px) 112px, 116px"
                      />
                    </div>
                    <figcaption className="min-w-0 self-center pt-0.5">
                      <cite className="not-italic">
                        <span className="block font-sans text-lg font-semibold leading-snug text-arc-charcoal sm:text-xl md:text-[1.35rem]">
                          {selected.attribution}
                        </span>
                        <span className="mt-2 block font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-arc-teal-ink sm:text-xs">
                          {selected.context}
                        </span>
                      </cite>
                    </figcaption>
                  </div>
                  <blockquote className="border-t border-arc-teal/15 pt-8 sm:pt-9">
                    <p className="text-balance font-serif text-[1.125rem] leading-[1.65] text-arc-charcoal sm:text-[1.2rem] sm:leading-[1.62] md:text-[1.35rem] md:leading-[1.58]">
                      <span className="text-arc-teal-ink/90" aria-hidden>
                        “
                      </span>
                      {selected.quote}
                      <span className="text-arc-teal-ink/90" aria-hidden>
                        ”
                      </span>
                    </p>
                  </blockquote>
                </div>
              </figure>
            ) : null}
          </div>
        </div>
      </div>
    </PinnedSection>
  );
}
