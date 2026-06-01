"use client";

import Image from "next/image";
import { TitleEmphasis } from "@/components/arc/TitleEmphasis";
import { ARC_PAGE_RAIL_MAX } from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

export type ArcStatItem = {
  value: string;
  label: string;
  caption?: string;
  imageSrc: string;
  imageAlt: string;
};

type ArcStatsBandSectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  titleEmphasis?: string;
  items: readonly ArcStatItem[];
  className?: string;
};

/**
 * Vooban-inspired metrics band: oversized serif numerals, small captions, square photography.
 */
export function ArcStatsBandSection({
  id,
  eyebrow,
  title,
  titleEmphasis,
  items,
  className,
}: ArcStatsBandSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden bg-arc-teal-ink px-6 py-16 text-arc-cream sm:px-10 sm:py-20 md:px-12 md:py-24",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(78,196,176,0.22),transparent_55%)]"
        aria-hidden
      />

      <div className={cn("relative", ARC_PAGE_RAIL_MAX)}>
        <div data-scroll-section className="max-w-2xl">
          {eyebrow ? (
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-arc-teal/90">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-[2.35rem]">
            {title}
            {titleEmphasis ? (
              <>
                {" "}
                <TitleEmphasis className="text-[1.08em] text-arc-rose-gold">{titleEmphasis}</TitleEmphasis>
              </>
            ) : null}
          </h2>
        </div>

        <ul className="mt-12 flex flex-col gap-10 md:mt-14 md:gap-0">
          {items.map((item, idx) => (
            <li
              key={item.label}
              data-scroll-section
              className={cn(
                "grid grid-cols-1 items-center gap-6 border-arc-cream/15 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_auto] md:gap-10 md:border-t md:py-10",
                idx === items.length - 1 && "md:border-b",
              )}
            >
              <p
                className="font-serif text-[clamp(3.5rem,12vw,7.5rem)] font-light leading-[0.9] tracking-tight text-arc-cream"
                aria-hidden
              >
                {item.value}
              </p>

              <div className="min-w-0 md:pr-4">
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-arc-teal/85">
                  {String(idx + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 font-serif text-xl font-semibold text-arc-cream sm:text-2xl">{item.label}</p>
                {item.caption ? (
                  <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-arc-cream/75">{item.caption}</p>
                ) : null}
              </div>

              <div className="relative mx-auto aspect-square w-full max-w-[200px] shrink-0 overflow-hidden rounded-sm border border-arc-cream/20 md:mx-0 md:max-w-[220px]">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  className="object-cover"
                  sizes="220px"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
