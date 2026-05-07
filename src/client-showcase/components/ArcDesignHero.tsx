import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { showcaseInternalHref } from "@/client-showcase/content";
import { showcaseRoseClass } from "@/client-showcase/design-tokens";
import { editorialHeroCopy } from "@/client-showcase/mock-page-content";

type ArcDesignHeroProps = {
  imageSrc: string;
};

/**
 * Keep the full hero visible in viewport after the sticky two-row header.
 * Uses a responsive header offset so bottom CTA row is not clipped on larger displays.
 */
const SHOWCASE_HERO_MIN_H =
  "h-[min(calc(100svh-12.75rem),52rem)] sm:h-[min(calc(100svh-11rem),54rem)] lg:h-[min(calc(100svh-8.25rem),56rem)]";

export function ArcDesignHero({ imageSrc }: ArcDesignHeroProps) {
  const c = editorialHeroCopy;

  return (
    <section className={`relative overflow-hidden bg-arc-charcoal ${SHOWCASE_HERO_MIN_H}`}>
      <Image src={imageSrc} alt="" fill className="object-cover object-center" sizes="100vw" priority />

      {/* Tone + readability */}
      <div className="absolute inset-0 bg-arc-charcoal/25" aria-hidden />

      {/* Thin white grid (reference: subtle overlay on photography) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)`,
          backgroundSize: "clamp(36px, 5vw, 56px) clamp(36px, 5vw, 56px)",
        }}
        aria-hidden
      />

      <div className={`relative z-[1] flex flex-col ${SHOWCASE_HERO_MIN_H}`}>
        {/* Top mastheads */}
        <div className="flex items-start justify-between gap-3 px-8 pb-2 pt-2.5 sm:gap-4 sm:px-12 sm:pb-3 sm:pt-3 lg:px-16 lg:pt-4">
          <div className="max-w-[13rem] font-sans text-[8px] font-medium uppercase leading-snug tracking-[0.26em] text-white/88 sm:max-w-[14rem] sm:text-[9px] sm:leading-relaxed sm:tracking-[0.3em]">
            <p>{c.topLeftLine1}</p>
            <p className="mt-1">{c.topLeftLine2}</p>
          </div>
          <div className="max-w-[min(100%,15rem)] text-right sm:max-w-[min(100%,16rem)]">
            <p className="font-sans text-[8px] font-medium uppercase tracking-[0.24em] text-white/88 sm:text-[10px] sm:tracking-[0.3em]">
              {c.topRightVol}
            </p>
            <blockquote className="mt-1.5 font-serif text-[12px] italic leading-snug sm:mt-2 sm:text-[13px] md:text-[0.9rem]">
              <span className="text-white/92">“</span>
              <span className="not-italic text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.42)]">
                {c.quote}
              </span>
              <span className="text-white/92">”</span>
            </blockquote>
          </div>
        </div>

        {/* Center-left headline + body */}
        <div className="flex min-h-0 flex-1 flex-col justify-center px-8 py-1 sm:px-12 sm:py-2 lg:px-16">
          <div className="max-w-3xl">
            <h1 className="font-serif text-[clamp(2.05rem,6.1vw,4.25rem)] font-normal leading-[1.05] tracking-tight text-white lg:text-[clamp(2.2rem,5.2vw,4.65rem)] lg:leading-[1.03] xl:text-[clamp(2.25rem,4.6vw,4.85rem)]">
              {c.headlineLead}
              <em className={cn("italic", showcaseRoseClass.bright)}>{c.headlineItalic}</em>
              {c.headlineTrail}
            </h1>
            <p className="mt-2 max-w-lg font-sans text-[13px] leading-snug text-white/88 sm:mt-3 sm:text-[14px] sm:leading-relaxed md:text-[1rem]">
              {c.body}
            </p>
          </div>
        </div>

        {/* Bottom: CTA + studio / video — aligned right */}
        <div className="flex w-full min-w-0 justify-end px-4 pb-8 pt-2 sm:px-8 sm:pb-9 sm:pt-3 lg:px-10 lg:pb-10">
          <div className="flex max-w-full flex-wrap items-center justify-end gap-3 sm:gap-4">
            <Link
              href={showcaseInternalHref("/#book")}
              className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full bg-white px-5 py-2.5 font-sans text-[13px] font-semibold text-arc-charcoal shadow-[0_6px_32px_rgba(0,0,0,0.22)] transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-[0_10px_36px_rgba(0,0,0,0.26)] sm:gap-2 sm:px-7 sm:py-3 sm:text-sm"
            >
              {c.ctaLabel}
              <ArrowRight className="size-4 shrink-0" strokeWidth={2} aria-hidden />
            </Link>

            <Link
              href={showcaseInternalHref("/#about")}
              className="inline-flex max-w-[min(100%,14.5rem)] items-center gap-2 text-right font-sans text-[9px] font-semibold uppercase leading-snug tracking-[0.2em] text-white sm:max-w-none sm:gap-2.5 sm:text-[10px] sm:leading-normal sm:tracking-[0.24em]"
            >
              <span className="min-w-0 text-right">
                <span className="text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.35)]">{c.videoLine}</span>
                <span className="text-white/55"> · </span>
                <span className="text-white">{c.videoDuration}</span>
              </span>
              <span
                className="flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-white/85 text-white sm:size-10"
                aria-hidden
              >
                <Play className="size-3.5 fill-none translate-x-0.5 sm:size-4" strokeWidth={1.75} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
