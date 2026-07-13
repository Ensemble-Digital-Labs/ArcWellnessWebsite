"use client";

import Image from "next/image";
import { ArcSectionSeamBlend } from "@/components/arc/ArcSectionSeamBlend";
import { ArcTextReveal } from "@/components/arc/ArcTextReveal";
import { TitleEmphasis } from "@/components/arc/TitleEmphasis";
import { ABOUT_HERO_COPY_AMBIENT_IMAGES } from "@/content/backgroundDecoration";
import { ARC_PINNED_CLEAR_BELOW_LOGO, ARC_HOME_FOUNDER_BOTTOM_SEAM_SOFT_CLASS, ARC_FOUNDER_SPLIT_MARBLE_FEATHER_CLASS, ARC_FOUNDER_SPLIT_PORTRAIT_FEATHER_CLASS } from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

const FOUNDER_MARBLE_BG = ABOUT_HERO_COPY_AMBIENT_IMAGES[0];

const FOUNDER_COPY_NAME_EMPHASIS_CLASS =
  "text-[1.45em] leading-[1.01] text-arc-teal-ink sm:text-[1.5em] md:text-[1.56em] lg:text-[1.62em] [text-shadow:0_1px_2px_rgba(255,255,255,0.5),0.015em_0_0_color-mix(in_srgb,currentColor_30%,transparent),-0.015em_0_0_color-mix(in_srgb,currentColor_30%,transparent)]";
const FOUNDER_COPY_EYEBROW_CLASS =
  "font-sans text-xs font-semibold uppercase tracking-[0.18em] text-arc-charcoal/62 sm:text-[0.7rem]";
const FOUNDER_COPY_BODY_CLASS =
  "space-y-4 font-sans text-sm leading-relaxed text-arc-charcoal/88 sm:space-y-5 sm:text-[0.95rem] md:text-base md:leading-relaxed";

type ArcFounderIntroSectionProps = {
  id?: string;
  className?: string;
  imageSrc: string;
  imageAlt: string;
  headline: string;
  headlineEmphasisWord: string;
  headlineEmphasisWord2?: string;
  roleTitle: string;
  letterParagraphs: readonly string[];
  closingLine?: string;
  topSeam?: boolean;
  /** Soft cream exit into the next section (e.g. whole-body slider). */
  bottomSeam?: boolean;
};

function splitHeadline(
  headline: string,
  headlineEmphasisWord: string,
  headlineEmphasisWord2?: string,
) {
  const e1 = headlineEmphasisWord.trim();
  const e2 = headlineEmphasisWord2?.trim() ?? "";
  const i1 = e1.length ? headline.indexOf(e1) : -1;
  const i2 = e2.length && i1 !== -1 ? headline.indexOf(e2, i1 + e1.length) : -1;
  const hasDoubleEmphasis = i1 !== -1 && i2 !== -1;
  const hasSingleEmphasis = !hasDoubleEmphasis && e1.length > 0 && i1 !== -1;

  return {
    hasDoubleEmphasis,
    hasSingleEmphasis,
    e1,
    e2,
    beforeSingle: hasSingleEmphasis ? headline.slice(0, i1).trimEnd() : "",
    afterSingle: hasSingleEmphasis ? headline.slice(i1 + e1.length).trimStart() : "",
    beforeDouble: hasDoubleEmphasis ? headline.slice(0, i1).trimEnd() : "",
    gapDouble: hasDoubleEmphasis ? headline.slice(i1 + e1.length, i2) : "",
    afterDouble: hasDoubleEmphasis ? headline.slice(i2 + e2.length).trimStart() : "",
  };
}

/**
 * Physician-founder, static split: marble letter on the left, portrait on the right (no scroll transitions).
 */
export function ArcFounderIntroSection({
  id,
  className,
  imageSrc,
  imageAlt,
  headline,
  headlineEmphasisWord,
  headlineEmphasisWord2,
  roleTitle,
  letterParagraphs,
  closingLine,
  topSeam = false,
  bottomSeam = false,
}: ArcFounderIntroSectionProps) {
  const split = splitHeadline(headline, headlineEmphasisWord, headlineEmphasisWord2);

  return (
    <section
      id={id}
      className={cn("relative scroll-mt-28 overflow-hidden bg-arc-cream", className)}
    >
      {topSeam ? (
        <ArcSectionSeamBlend
          edge="top"
          tone="cream"
          variant="soft"
          scope="background"
          className="h-[min(10vh,4.5rem)] bg-gradient-to-b from-arc-cream from-40% via-arc-cream/75 via-70% to-transparent [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_30%,transparent_100%)] mask-image-[linear-gradient(to_bottom,black_0%,black_30%,transparent_100%)]"
        />
      ) : null}
      <div className="grid w-full lg:min-h-[min(88dvh,860px)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-stretch">
        <div
          className={cn(
            ARC_PINNED_CLEAR_BELOW_LOGO,
            "relative flex flex-col justify-center px-5 py-12 sm:px-8 sm:py-14 md:px-10 md:py-16 lg:px-12 lg:py-20 xl:px-14",
          )}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <Image
              src={FOUNDER_MARBLE_BG}
              alt=""
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
            <div className="absolute inset-0 bg-arc-cream/8" />
          </div>
          <div
            aria-hidden
            className={cn(ARC_FOUNDER_SPLIT_MARBLE_FEATHER_CLASS, "max-lg:hidden")}
          />

          <div className="relative z-10 mx-auto w-full max-w-xl text-left lg:max-w-lg xl:max-w-xl">
            <ArcTextReveal variant="heading">
              <h2 className="mb-2 max-w-full break-words font-serif text-[2rem] font-bold leading-[1.08] tracking-tight text-arc-charcoal sm:text-[2.35rem] sm:leading-[1.06] md:text-[2.65rem] lg:text-[2.85rem]">
                {split.hasDoubleEmphasis ? (
                  <>
                    {split.beforeDouble}
                    {split.beforeDouble ? " " : null}
                    <TitleEmphasis className={FOUNDER_COPY_NAME_EMPHASIS_CLASS}>{split.e1}</TitleEmphasis>
                    {split.gapDouble || " "}
                    <TitleEmphasis className={FOUNDER_COPY_NAME_EMPHASIS_CLASS}>{split.e2}</TitleEmphasis>
                    {split.afterDouble ? <> {split.afterDouble}</> : null}
                  </>
                ) : split.hasSingleEmphasis ? (
                  <>
                    {split.beforeSingle}
                    {split.beforeSingle ? " " : null}
                    <TitleEmphasis className={FOUNDER_COPY_NAME_EMPHASIS_CLASS}>{split.e1}</TitleEmphasis>
                    {split.afterSingle ? <> {split.afterSingle}</> : null}
                  </>
                ) : (
                  headline
                )}
              </h2>
            </ArcTextReveal>

            <ArcTextReveal variant="body" delayIndex={1}>
              <p className={cn("mb-6 sm:mb-8", FOUNDER_COPY_EYEBROW_CLASS)}>{roleTitle}</p>
            </ArcTextReveal>

            <div className={FOUNDER_COPY_BODY_CLASS}>
              {letterParagraphs.map((paragraph, index) => (
                <ArcTextReveal key={paragraph.slice(0, 48)} variant="body" delayIndex={index + 2}>
                  <p>{paragraph}</p>
                </ArcTextReveal>
              ))}
              {closingLine ? (
                <ArcTextReveal variant="body" delayIndex={letterParagraphs.length + 2}>
                  <p className="font-serif text-[1.05rem] font-semibold leading-snug text-arc-charcoal sm:text-lg">
                    {closingLine}
                  </p>
                </ArcTextReveal>
              ) : null}
            </div>
          </div>
        </div>

        <div
          data-scroll-section
          className={cn(
            "relative min-h-[min(68dvh,520px)] w-full min-w-0 sm:min-h-[min(72dvh,560px)] lg:-ml-[min(4.5rem,7%)] lg:min-h-0 lg:h-auto lg:w-[calc(100%+min(4.5rem,7%))]",
            // Brand arch: dome the portrait's top on lg+ only, via mask (no overflow clip) so
            // the curved edge alpha-blends into cream with no compositing hairline. Bottom stays
            // full-bleed; the left feather keeps blending into the marble panel.
            "arc-arch-mask-top",
          )}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover object-[50%_22%]"
            sizes="(min-width: 1024px) 45vw, 100vw"
            priority={false}
          />
          {/* The arch shape + all-border feather come from the soft `arc-arch-mask-top` mask on
              the container (dissolves the image into cream along the curve). The left feather
              keeps the wider blend into the marble text panel. */}
          <div
            aria-hidden
            className={cn(ARC_FOUNDER_SPLIT_PORTRAIT_FEATHER_CLASS, "max-lg:hidden")}
          />
        </div>
      </div>
      {bottomSeam ? (
        <ArcSectionSeamBlend
          edge="bottom"
          tone="cream"
          variant="soft"
          scope="background"
          className={ARC_HOME_FOUNDER_BOTTOM_SEAM_SOFT_CLASS}
        />
      ) : null}
    </section>
  );
}
