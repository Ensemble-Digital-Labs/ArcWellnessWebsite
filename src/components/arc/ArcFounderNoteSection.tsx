"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  ARC_EDITORIAL_BODY_CLASS,
  ARC_STACKED_HEADLINE_SERIF_CLASS,
  TitleEmphasis,
  arcHeadlineEmphasisClass,
} from "@/components/arc/TitleEmphasis";
import { ARC_PAGE_RAIL_MAX, ARC_SECTION_SEAM_OVERLAP_SM_CLASS } from "@/lib/arc-layout";
import { cn } from "@/lib/utils";
import { ArcSectionSeamBlend } from "@/components/arc/ArcSectionSeamBlend";

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
  headlineEmphasisTone?: "rose" | "teal";
  topSeam?: boolean;
  bottomSeam?: boolean;
  compactTop?: boolean;
  compactBottom?: boolean;
};

/**
 * About founder, portrait-forward split; condensed copy (not a full letter wall).
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
  headlineEmphasisTone = "teal",
  topSeam = false,
  bottomSeam = false,
  compactTop = false,
  compactBottom = false,
}: ArcFounderNoteSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        "relative bg-arc-cream",
        topSeam && ARC_SECTION_SEAM_OVERLAP_SM_CLASS,
        className,
      )}
    >
      {topSeam ? (
        <ArcSectionSeamBlend edge="top" tone="cream" variant="soft" scope="background" />
      ) : null}
      <div
        className={cn(
          "relative z-10 mx-auto grid min-h-0 w-full px-6 sm:px-10 lg:min-h-[min(88dvh,780px)] lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-stretch lg:gap-0 lg:p-10 xl:p-12",
          compactTop ? "pt-4 sm:pt-6 lg:pt-8" : "pt-6 sm:pt-8 lg:pt-12",
          compactBottom ? "pb-6 sm:pb-8 lg:pb-10" : "",
          ARC_PAGE_RAIL_MAX,
        )}
      >
        <div
          data-scroll-section
          className="relative min-h-[min(68dvh,520px)] w-full sm:min-h-[min(72dvh,560px)] lg:min-h-0 lg:h-full"
        >
          <div className="absolute inset-0 overflow-hidden rounded-2xl shadow-[0_20px_48px_rgba(44,44,44,0.1)] sm:rounded-3xl lg:rounded-2xl lg:shadow-[0_24px_56px_rgba(44,44,44,0.12)]">
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
        >
          <div className="flex min-w-0 flex-col items-center pb-[0.12em] text-center lg:items-start lg:text-left">
            <h2 className={cn("text-arc-charcoal", ARC_STACKED_HEADLINE_SERIF_CLASS)}>
              <span className="block">{title}</span>
              <TitleEmphasis
                className={cn(
                  arcHeadlineEmphasisClass(headlineEmphasisTone),
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
              {signoff}
            </p>
            <p className="mt-2 font-sans text-sm font-medium uppercase tracking-[0.14em] text-arc-charcoal/55">
              {role}
            </p>
          </footer>
        </div>
      </div>

      {bottomSeam ? (
        <ArcSectionSeamBlend edge="bottom" tone="cream" variant="soft" scope="background" />
      ) : null}
    </section>
  );
}
