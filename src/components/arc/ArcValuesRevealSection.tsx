"use client";

import {
  ARC_EDITORIAL_BODY_CLASS,
  ARC_HEADLINE_TITLE_EMPHASIS_CLASS,
  ARC_STACKED_HEADLINE_SERIF_CLASS,
  TitleEmphasis,
} from "@/components/arc/TitleEmphasis";
import { ARC_PAGE_RAIL_MAX } from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

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
};

/**
 * Vooban-style values index — numbered ruled rows, no floating card grid.
 */
export function ArcValuesRevealSection({
  id,
  title,
  titleEmphasis,
  intro,
  items,
}: ArcValuesRevealSectionProps) {
  const total = items.length;

  return (
    <section id={id} className="bg-arc-cream px-6 py-16 sm:px-10 sm:py-20 md:px-12 md:py-24 lg:py-28">
      <div className={cn("mx-auto w-full", ARC_PAGE_RAIL_MAX)}>
        <div className="min-w-0 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,38rem)_minmax(0,1fr)] xl:gap-16">
          <header
            data-scroll-section
            className="mb-10 min-w-0 lg:sticky lg:top-28 lg:mb-0 lg:max-w-[38rem] lg:pt-2 xl:top-32"
          >
            <div className="pb-[0.12em]">
              <h2 className={cn("min-w-0 text-arc-charcoal", ARC_STACKED_HEADLINE_SERIF_CLASS)}>
                <span className="block max-w-full">{title}</span>
                {titleEmphasis ? (
                  <TitleEmphasis
                    className={cn(
                      ARC_HEADLINE_TITLE_EMPHASIS_CLASS,
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
                    className="font-serif text-[clamp(2.75rem,7vw,4.5rem)] font-normal leading-[0.82] tracking-tight text-arc-rose-gold-ink sm:pt-0.5"
                    aria-hidden
                  >
                    {valueRomanNumeral(idx)}
                  </p>

                  <div className="min-w-0">
                    <h3 className="break-words font-serif text-[clamp(1.25rem,2.4vw,1.65rem)] font-semibold tracking-tight text-arc-rose-gold-ink">
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
