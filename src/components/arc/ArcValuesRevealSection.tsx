"use client";

import Image from "next/image";
import {
  ARC_EDITORIAL_BODY_CLASS,
  ARC_STACKED_HEADLINE_SERIF_CLASS,
  TitleEmphasis,
  arcHeadlineEmphasisClass,
} from "@/components/arc/TitleEmphasis";
import { CLINIC_SPACE_TEASER_AMBIENT_SRC } from "@/content/backgroundDecoration";
import { ARC_PAGE_RAIL_MAX } from "@/lib/arc-layout";
import { cn } from "@/lib/utils";
import { ArcSectionSeamBlend } from "@/components/arc/ArcSectionSeamBlend";

type ValueItem = { title: string; body: string };

const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"] as const;

function valueRomanNumeral(index: number): string {
  return ROMAN_NUMERALS[index] ?? String(index + 1);
}

type ArcValuesRevealSectionProps = {
  id?: string;
  title: string;
  titleEmphasis?: string;
  intro: string;
  items: readonly ValueItem[];
  accentTone?: "rose" | "teal";
  /** Same marble plate as the About clinic gallery teaser. */
  marbleAmbient?: boolean;
  topSeam?: boolean;
  bottomSeam?: boolean;
  compactTop?: boolean;
  compactBottom?: boolean;
};

/**
 * Vooban-style values index, numbered ruled rows, no floating card grid.
 */
export function ArcValuesRevealSection({
  id,
  title,
  titleEmphasis,
  intro,
  items,
  accentTone = "teal",
  marbleAmbient = false,
  topSeam = false,
  bottomSeam = false,
  compactTop = false,
  compactBottom = false,
}: ArcValuesRevealSectionProps) {
  const total = items.length;
  const numeralClass =
    accentTone === "teal" ? "text-arc-teal-ink" : "text-arc-rose-gold-ink";
  const titleClass =
    accentTone === "teal" ? "text-arc-teal-ink" : "text-arc-rose-gold-ink";

  return (
    <section
      id={id}
      className={cn(
        "relative text-arc-charcoal",
        marbleAmbient ? "bg-arc-teal-muted/25" : topSeam
          ? "bg-gradient-to-b from-arc-cream from-0% via-arc-cream via-[20%] to-arc-cream-deep/40"
          : "bg-arc-cream-deep/40",
        compactTop && compactBottom
          ? "py-10 sm:py-12 lg:py-14"
          : compactTop
            ? "pb-16 pt-8 sm:pb-20 sm:pt-10 md:pb-24 md:pt-12 lg:pb-28"
            : compactBottom
              ? "pb-10 pt-16 sm:pb-12 sm:pt-20 md:pb-14 md:pt-24 lg:pb-16 lg:pt-28"
              : "py-16 sm:py-20 md:py-24 lg:py-28",
        !topSeam && !marbleAmbient && "border-t border-arc-charcoal/8",
        "px-6 sm:px-10 md:px-12",
      )}
    >
      {marbleAmbient ? (
        <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
          <Image
            src={CLINIC_SPACE_TEASER_AMBIENT_SRC}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-arc-cream/55 via-arc-cream/35 to-arc-cream/70" />
          {topSeam ? (
            <div
              className="absolute inset-x-0 top-0 z-[2] h-[min(18vh,8rem)] bg-gradient-to-b from-arc-cream via-arc-cream/88 to-transparent"
              aria-hidden
            />
          ) : null}
          {bottomSeam ? (
            <div
              className="absolute inset-x-0 bottom-0 z-[2] h-[min(22vh,10rem)] bg-gradient-to-t from-arc-cream via-arc-cream/75 to-transparent"
              aria-hidden
            />
          ) : null}
        </div>
      ) : null}

      {topSeam && !marbleAmbient ? (
        <ArcSectionSeamBlend edge="top" tone="cream" variant="soft" scope="background" />
      ) : null}

      {bottomSeam ? (
        <ArcSectionSeamBlend edge="bottom" tone="cream" variant="soft" scope="background" />
      ) : null}

      <div className={cn("relative z-10 mx-auto w-full", ARC_PAGE_RAIL_MAX)}>
        <div className="min-w-0 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,38rem)_minmax(0,1fr)] xl:gap-16">
          <header
            data-scroll-section
            className="mb-10 min-w-0 lg:sticky lg:top-28 lg:mb-0 lg:max-w-[38rem] lg:self-start lg:pt-2 xl:top-32"
          >
            <div className="pb-[0.12em]">
              <h2 className={cn("min-w-0 text-arc-charcoal", ARC_STACKED_HEADLINE_SERIF_CLASS)}>
                <span className="block max-w-full">{title}</span>
                {titleEmphasis ? (
                  <TitleEmphasis
                    className={cn(
                      arcHeadlineEmphasisClass(accentTone),
                      "mt-3 block leading-none sm:mt-3.5",
                    )}
                  >
                    {titleEmphasis}
                  </TitleEmphasis>
                ) : null}
              </h2>
            </div>
            <p className={cn("mt-8 min-w-0 sm:mt-10", ARC_EDITORIAL_BODY_CLASS)}>{intro}</p>
          </header>

          <ul className="min-w-0 border-t border-arc-charcoal/12">
            {items.map((item, idx) => (
              <li
                key={item.title}
                data-scroll-section
                aria-label={`Value ${idx + 1} of ${total}: ${item.title}`}
                className="border-b border-arc-charcoal/12"
              >
                <div className="grid grid-cols-1 gap-4 py-7 sm:grid-cols-[minmax(4.5rem,6.5rem)_1fr] sm:gap-8 sm:py-8 md:gap-10 md:py-9">
                  <p
                    className={cn(
                      "font-serif text-[clamp(2.75rem,7vw,4.5rem)] font-normal leading-[0.82] tracking-tight sm:pt-0.5",
                      numeralClass,
                    )}
                    aria-hidden
                  >
                    {valueRomanNumeral(idx)}
                  </p>

                  <div className="min-w-0">
                    <h3
                      className={cn(
                        "break-words font-serif text-[clamp(1.25rem,2.4vw,1.65rem)] font-semibold tracking-tight",
                        titleClass,
                      )}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-2.5 break-words md:mt-3",
                        "font-serif text-[clamp(1rem,2.1vw,1.25rem)] font-medium leading-[1.42] tracking-tight text-arc-charcoal/88",
                      )}
                    >
                      {item.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
