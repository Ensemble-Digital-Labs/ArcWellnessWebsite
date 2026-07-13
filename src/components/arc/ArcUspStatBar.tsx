"use client";

import Image from "next/image";
import { ArcTextReveal } from "@/components/arc/ArcTextReveal";
import { BACKGROUND_DECORATION_IMAGES } from "@/content/backgroundDecoration";
import { HOME_USP_ITEMS } from "@/content/homeConcerns";
import { cn } from "@/lib/utils";

const USP_CELL_AMBIENT = BACKGROUND_DECORATION_IMAGES[0];

type ArcUspStatBarProps = {
  className?: string;
};

/** Four-cell USP strip (12+ modalities, FDA, etc.). */
export function ArcUspStatBar({ className }: ArcUspStatBarProps) {
  return (
    <div
      className={cn(
        "relative grid w-full shrink-0 grid-cols-2 border-y-2 border-arc-charcoal bg-arc-cream md:grid-cols-4",
        className,
      )}
    >
      {HOME_USP_ITEMS.map((item, i) => (
        <div
          key={item.label}
          className={cn(
            "relative isolate flex min-h-[6.25rem] flex-col items-center justify-center overflow-hidden px-3 py-4 text-center sm:min-h-[8.25rem] sm:px-4 sm:py-6 md:min-h-[9rem] md:py-8 lg:min-h-[10rem] lg:py-9",
            i < 2 ? "border-b-2 border-arc-charcoal md:border-b-0" : "",
            i === 0 || i === 2 ? "border-r-2 border-arc-charcoal" : "",
            i === 1 ? "md:border-r-2 md:border-arc-charcoal" : "",
          )}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <Image
              src={USP_CELL_AMBIENT}
              alt=""
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover object-center"
            />
          </div>
          <div className="relative z-10">
            <ArcTextReveal variant="heading" delayIndex={i * 2}>
              <p className="font-serif text-2xl font-bold leading-none text-arc-charcoal sm:text-3xl md:text-4xl lg:text-[2.5rem] [text-shadow:0_1px_2px_rgba(255,255,255,0.55)]">
                {item.value}
              </p>
            </ArcTextReveal>
            <ArcTextReveal variant="body" delayIndex={i * 2 + 1}>
              <p className="mt-2 font-sans text-xs font-bold uppercase tracking-[0.12em] text-arc-charcoal/90 sm:text-sm md:text-[0.8125rem] md:tracking-[0.14em] [text-shadow:0_1px_2px_rgba(255,255,255,0.45)]">
                {item.label}
              </p>
            </ArcTextReveal>
          </div>
        </div>
      ))}
    </div>
  );
}
