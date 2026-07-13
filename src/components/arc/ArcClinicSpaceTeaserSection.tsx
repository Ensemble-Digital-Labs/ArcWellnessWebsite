"use client";

import { useEffect, useRef, useState } from "react";
import type { ClinicCarouselSlide } from "@/components/arc/ArcClinicCarouselSection";
import { ClinicGalleryOverlay } from "@/components/arc/clinic-gallery/ClinicGalleryOverlay";
import { ClinicSpacePreviewSlideshow } from "@/components/arc/clinic-gallery/ClinicSpacePreviewSlideshow";
import { ArcTextReveal } from "@/components/arc/ArcTextReveal";
import {
  ARC_SPLIT_HEADLINE_SERIF_CLASS,
  TitleEmphasis,
  arcHeadlineEmphasisClass,
} from "@/components/arc/TitleEmphasis";
import { ArcMarbleAmbientPlate } from "@/components/arc/ArcMarbleAmbientPlate";
import { CLINIC_SPACE_TEASER_AMBIENT_SRC } from "@/content/backgroundDecoration";
import { captureArcPageScrollY } from "@/lib/arcScrollPosition";
import { lockArcPageScrollForModal } from "@/lib/arcModalScrollLock";
import { releaseArcScrollTopGuard } from "@/lib/arcScrollTopGuard";
import {
  ARC_MARBLE_AMBIENT_BOTTOM_SEAM_COMPACT_CLASS,
  ARC_MARBLE_AMBIENT_TOP_SEAM_CLASS,
  ARC_MARBLE_AMBIENT_WASH_CLASS,
  ARC_PAGE_RAIL_MAX,
} from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

function ClinicGalleryHandArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 88 52"
      className={cn("shrink-0 text-arc-teal-ink", className)}
      fill="none"
      aria-hidden
    >
      <path
        d="M6 32C16 14 34 8 52 16C64 22 70 24 78 20"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M70 12L80 20L72 28"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type ArcClinicSpaceTeaserSectionProps = {
  id?: string;
  title: string;
  titleEmphasis?: string;
  previewIntro?: string;
  slides: readonly ClinicCarouselSlide[];
  className?: string;
  headlineEmphasisTone?: "teal";
  /** Soft cream feather at section top (About page seams). */
  topSeam?: boolean;
  /** Soft cream exit into the next section (gallery → mission). */
  bottomSeam?: boolean;
};

export function ArcClinicSpaceTeaserSection({
  id,
  title,
  titleEmphasis,
  previewIntro,
  slides,
  className,
  headlineEmphasisTone = "teal",
  topSeam = false,
  bottomSeam = false,
}: ArcClinicSpaceTeaserSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryReturnFocusRef = useRef<HTMLButtonElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState(0);
  const unlockPageScrollRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const handleCloseGallery = () => {
    setGalleryOpen(false);
    unlockPageScrollRef.current?.();
    unlockPageScrollRef.current = null;
    requestAnimationFrame(() =>
      galleryReturnFocusRef.current?.focus({ preventScroll: true }),
    );
  };

  const openGallery = () => {
    if (galleryOpen) return;
    const scrollY = captureArcPageScrollY();
    releaseArcScrollTopGuard();
    unlockPageScrollRef.current?.();
    unlockPageScrollRef.current = lockArcPageScrollForModal(scrollY);
    setGalleryInitialIndex(previewIndex);
    setGalleryOpen(true);
  };

  return (
    <>
      <section
        ref={sectionRef}
        id={id}
        className={cn(
          "relative overflow-visible bg-arc-teal-muted/6 pt-20 text-arc-charcoal sm:pt-24 md:pt-28",
          bottomSeam
            ? "pb-24 max-lg:pb-[calc(6rem+env(safe-area-inset-bottom,0px))] sm:pb-24 md:pb-28"
            : "pb-20 sm:pb-24 md:pb-28",
          !topSeam && "border-t border-arc-charcoal/8",
          className,
        )}
      >
        <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
          <ArcMarbleAmbientPlate src={CLINIC_SPACE_TEASER_AMBIENT_SRC} priority />
          <div className={ARC_MARBLE_AMBIENT_WASH_CLASS} />
          {topSeam ? <div className={ARC_MARBLE_AMBIENT_TOP_SEAM_CLASS} aria-hidden /> : null}
          {bottomSeam ? (
            <div className={ARC_MARBLE_AMBIENT_BOTTOM_SEAM_COMPACT_CLASS} aria-hidden />
          ) : null}
        </div>

        <div className={cn("relative z-10 mx-auto max-lg:px-4 sm:px-10 md:px-12", ARC_PAGE_RAIL_MAX)}>
          <div className="flex flex-col items-center gap-10 max-lg:gap-12 lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-10 xl:gap-x-14">
            <div className="w-full max-w-md text-center lg:col-span-5 lg:max-w-xl lg:text-left lg:self-center">
              <ArcTextReveal variant="heading">
                <h2
                  className={cn(
                    "max-w-xl pb-[0.14em] text-arc-charcoal",
                    ARC_SPLIT_HEADLINE_SERIF_CLASS,
                  )}
                >
                  <span className="block text-arc-charcoal">{title}</span>
                  {titleEmphasis ? (
                    <TitleEmphasis
                      className={cn(
                        arcHeadlineEmphasisClass(headlineEmphasisTone),
                        "mt-1 block leading-[1.04] sm:mt-1.5",
                      )}
                    >
                      {titleEmphasis}
                    </TitleEmphasis>
                  ) : null}
                </h2>
              </ArcTextReveal>

              {previewIntro ? (
                <ArcTextReveal variant="body" delayIndex={1} className="mt-6 sm:mt-8 lg:flex lg:w-full lg:justify-end">
                  <div className="flex max-w-md flex-col items-center gap-3 lg:max-w-none lg:flex-row lg:items-center lg:gap-3 xl:gap-4">
                    <p className="text-center font-title-emphasis text-[1.65rem] leading-snug tracking-tight text-arc-teal-ink sm:text-[1.85rem] md:text-[2rem] lg:text-right lg:text-[1.95rem] xl:text-[2.1rem]">
                      {previewIntro}
                    </p>
                    <ClinicGalleryHandArrow className="h-11 w-[3.75rem] rotate-90 sm:h-12 sm:w-16 lg:h-12 lg:w-[5.5rem] lg:rotate-0 lg:translate-x-1 xl:h-[3.25rem] xl:w-24 xl:translate-x-2" />
                  </div>
                </ArcTextReveal>
              ) : null}
            </div>

            <div className="relative z-10 w-full sm:max-w-md lg:col-span-7 lg:max-w-none">
              <ClinicSpacePreviewSlideshow
                slides={slides}
                activeIndex={previewIndex}
                onActiveIndexChange={setPreviewIndex}
                onOpenGallery={openGallery}
                reduceMotion={reduceMotion}
                galleryReturnFocusRef={galleryReturnFocusRef}
                pauseAutoAdvance={galleryOpen}
              />
            </div>
          </div>
        </div>
      </section>

      <ClinicGalleryOverlay
        open={galleryOpen}
        onClose={handleCloseGallery}
        slides={slides}
        reduceMotion={reduceMotion}
        initialSlideIndex={galleryInitialIndex}
      />
    </>
  );
}
