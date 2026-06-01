"use client";

import { TitleEmphasis } from "@/components/arc/TitleEmphasis";
import { ARC_PAGE_RAIL_MAX } from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

type ValueItem = { title: string; body: string };

type ArcValuesRevealSectionProps = {
  id?: string;
  eyebrow?: string;
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
  eyebrow = "Our values",
  title,
  titleEmphasis,
  intro,
  items,
}: ArcValuesRevealSectionProps) {
  const total = items.length;

  return (
    <section id={id} className="bg-arc-cream px-6 py-16 sm:px-10 sm:py-20 md:px-12 md:py-24 lg:py-28">
      <div className={cn("mx-auto w-full", ARC_PAGE_RAIL_MAX)}>
        <div className="lg:grid lg:grid-cols-[minmax(0,22rem)_1fr] lg:items-start lg:gap-14 xl:grid-cols-[minmax(0,26rem)_1fr] xl:gap-20">
          <header
            data-scroll-section
            className="mb-10 max-w-xl lg:sticky lg:top-28 lg:mb-0 lg:pt-2 xl:top-32"
          >
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-arc-teal-ink">
              {eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-[1.08] tracking-tight text-arc-charcoal sm:text-4xl md:text-[2.5rem]">
              {title}{" "}
              {titleEmphasis ? (
                <TitleEmphasis className="block text-[1.08em] text-arc-rose-gold-ink sm:inline">
                  {titleEmphasis}
                </TitleEmphasis>
              ) : null}
            </h2>
            <p className="mt-5 font-sans text-base leading-relaxed text-arc-charcoal/72">{intro}</p>
          </header>

          <ul className="border-t border-arc-charcoal/12">
            {items.map((item, idx) => (
              <li
                key={item.title}
                data-scroll-section
                className="group border-b border-arc-charcoal/12 transition-colors hover:bg-arc-teal-muted/30 focus-within:bg-arc-teal-muted/25"
              >
                <div className="grid grid-cols-1 gap-3 py-7 sm:grid-cols-[auto_1fr] sm:gap-8 sm:py-8 md:gap-10 md:py-9">
                  <p className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-arc-charcoal/55 tabular-nums sm:pt-1">
                    <span className="text-arc-teal-ink">{String(idx + 1).padStart(2, "0")}</span>
                    <span className="mx-2 text-arc-charcoal/25">/</span>
                    <span>{String(total).padStart(2, "0")}</span>
                  </p>

                  <div className="min-w-0">
                    <h3 className="font-serif text-xl font-semibold tracking-tight text-arc-charcoal transition-colors group-hover:text-arc-teal-ink sm:text-2xl md:text-[1.65rem]">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 max-w-2xl font-sans text-sm leading-relaxed text-arc-charcoal/68 sm:text-[0.9375rem] md:mt-3">
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
