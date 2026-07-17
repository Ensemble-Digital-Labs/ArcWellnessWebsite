"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import {
  ARC_ABOUT_COMPACT_BODY_CLASS,
  ARC_STACKED_HEADLINE_SERIF_CLASS,
  TitleEmphasis,
  arcHeadlineEmphasisClass,
} from "@/components/arc/TitleEmphasis";
import { ArcTextReveal } from "@/components/arc/ArcTextReveal";
import { ARC_PAGE_RAIL_MAX, ARC_SECTION_SEAM_OVERLAP_SM_CLASS } from "@/lib/arc-layout";
import { cn } from "@/lib/utils";
import { ArcSectionSeamBlend } from "@/components/arc/ArcSectionSeamBlend";

/** Right-side cream scrim so overlay copy stays readable over the founder band (xl+ desktop). */
const founderBandScrimStyle: CSSProperties = {
  background:
    "linear-gradient(90deg, color-mix(in srgb, var(--arc-cream) 0%, transparent) 22%, color-mix(in srgb, var(--arc-cream) 62%, transparent) 46%, color-mix(in srgb, var(--arc-cream) 92%, transparent) 60%, var(--arc-cream) 100%)",
};

/**
 * Smaller-laptop scrim (lg → <xl): the cream fade starts further right so it clears
 * Dr. Jabbar on the left while still backing the right-anchored copy.
 */
const founderBandScrimStyleLaptop: CSSProperties = {
  background:
    "linear-gradient(90deg, color-mix(in srgb, var(--arc-cream) 0%, transparent) 44%, color-mix(in srgb, var(--arc-cream) 50%, transparent) 56%, color-mix(in srgb, var(--arc-cream) 90%, transparent) 68%, var(--arc-cream) 84%)",
};

/** Soft cream edge fade on the mobile/tablet portrait frame (blends photo into cream). */
const FOUNDER_NOTE_FEATHER_PX = 44;
const founderNoteFeatherStyle: CSSProperties = {
  boxShadow: `inset 0 0 0 3px var(--arc-cream), inset 0 0 ${FOUNDER_NOTE_FEATHER_PX}px ${Math.round(FOUNDER_NOTE_FEATHER_PX * 0.55)}px var(--arc-cream), inset 0 0 ${Math.round(FOUNDER_NOTE_FEATHER_PX * 0.45)}px ${Math.round(FOUNDER_NOTE_FEATHER_PX * 0.2)}px var(--arc-cream)`,
};

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
  /** Desktop (lg+) full-width landscape band. */
  imageSrc: string;
  imageAlt: string;
  /** Mobile/tablet (<lg) portrait for the blurred cream frame. Falls back to `imageSrc`. */
  mobileImageSrc?: string;
  mobileImageAlt?: string;
  className?: string;
  headlineEmphasisTone?: "teal";
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
  mobileImageSrc,
  mobileImageAlt,
  className,
  headlineEmphasisTone = "teal",
  topSeam = false,
  bottomSeam = false,
  compactTop = false,
  compactBottom = false,
}: ArcFounderNoteSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const headline = (
    <h2 className={cn("text-arc-charcoal", ARC_STACKED_HEADLINE_SERIF_CLASS)}>
      <span className="block">{title}</span>
      <TitleEmphasis
        className={cn(
          arcHeadlineEmphasisClass(headlineEmphasisTone),
          "mt-3 block w-max max-w-full leading-none sm:mt-3.5",
        )}
      >
        {titleEmphasis}
      </TitleEmphasis>
    </h2>
  );

  const signoffBlock = (
    <footer className="w-full border-t border-arc-charcoal/10 pt-6 sm:pt-7">
      <p className="font-serif text-[clamp(1.125rem,2.2vw,1.35rem)] font-semibold tracking-tight text-arc-charcoal">
        {signoff}
      </p>
      <p className="mt-2 font-sans text-sm font-medium uppercase tracking-[0.14em] text-arc-charcoal/55">
        {role}
      </p>
    </footer>
  );

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

      {/* Mobile / tablet (<lg): intimate portrait in a soft cream frame, copy stacked below */}
      <div className="relative z-10 lg:hidden">
        <div
          className={cn(
            "px-6 sm:px-10",
            compactTop ? "pt-6 sm:pt-8" : "pt-8 sm:pt-10",
          )}
        >
          <div
            data-scroll-section
            className="relative min-h-[min(68dvh,520px)] w-full overflow-hidden rounded-2xl bg-arc-cream sm:min-h-[min(72dvh,560px)] sm:rounded-[1.35rem]"
          >
            <Image
              src={mobileImageSrc ?? imageSrc}
              alt={mobileImageAlt ?? imageAlt}
              fill
              className="object-cover object-[50%_18%]"
              sizes="100vw"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[inherit]"
              style={founderNoteFeatherStyle}
            />
          </div>
        </div>
        <div
          className={cn(
            "flex flex-col items-center px-6 text-center sm:px-10",
            "pt-8 sm:pt-10",
            compactBottom ? "pb-8 sm:pb-10" : "pb-10 sm:pb-12",
          )}
        >
          <ArcTextReveal variant="heading">
            <div className="flex flex-col items-center">{headline}</div>
          </ArcTextReveal>
          <ArcTextReveal variant="body" delayIndex={1}>
            <p className={cn("mt-8 max-w-xl", ARC_ABOUT_COMPACT_BODY_CLASS)}>{lead}</p>
          </ArcTextReveal>
          <ArcTextReveal variant="body" delayIndex={2}>
            <p className={cn("mt-6 max-w-xl", ARC_ABOUT_COMPACT_BODY_CLASS)}>{body}</p>
          </ArcTextReveal>
          <ArcTextReveal variant="body" delayIndex={3}>
            <div className="mt-10 w-full max-w-md">{signoffBlock}</div>
          </ArcTextReveal>
        </div>
      </div>

      {/* Desktop (lg+): full-bleed founder band, copy overlaid on the right over a cream scrim */}
      <div className="relative hidden lg:block">
        <div className="relative min-h-[min(90dvh,820px)] 2xl:min-h-[min(90dvh,68rem)] w-full overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover object-[left_30%]"
            sizes="100vw"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 xl:hidden"
            style={founderBandScrimStyleLaptop}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden xl:block"
            style={founderBandScrimStyle}
          />
          <div
            className={cn(
              "relative z-10 mx-auto flex min-h-[min(90dvh,820px)] 2xl:min-h-[min(90dvh,68rem)] w-full items-center justify-end px-10 xl:px-14",
              ARC_PAGE_RAIL_MAX,
            )}
          >
            <div
              data-scroll-section
              className={cn(
                "flex w-[44%] min-w-[340px] max-w-[440px] flex-col items-end text-right",
                "xl:w-[46%] xl:min-w-[400px] xl:max-w-[520px]",
                compactTop ? "py-12" : "py-16",
              )}
            >
              <ArcTextReveal variant="heading">
                <div className="flex flex-col items-end">{headline}</div>
              </ArcTextReveal>
              <ArcTextReveal variant="body" delayIndex={1}>
                <p className={cn("mt-8 text-right", ARC_ABOUT_COMPACT_BODY_CLASS)}>{lead}</p>
              </ArcTextReveal>
              <ArcTextReveal variant="body" delayIndex={2}>
                <p className={cn("mt-6 text-right", ARC_ABOUT_COMPACT_BODY_CLASS)}>{body}</p>
              </ArcTextReveal>
              <ArcTextReveal variant="body" delayIndex={3}>
                <div className="mt-10 w-full">{signoffBlock}</div>
              </ArcTextReveal>
            </div>
          </div>
        </div>
      </div>

      {bottomSeam ? (
        <ArcSectionSeamBlend edge="bottom" tone="cream" variant="soft" scope="background" />
      ) : null}
    </section>
  );
}
