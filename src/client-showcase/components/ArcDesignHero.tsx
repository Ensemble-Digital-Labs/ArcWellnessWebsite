import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { showcaseInternalHref } from "@/client-showcase/content";
import { editorialHeroCopy } from "@/client-showcase/mock-page-content";

type ArcDesignHeroProps = {
  imageSrc: string;
};

export function ArcDesignHero({ imageSrc }: ArcDesignHeroProps) {
  const c = editorialHeroCopy;

  return (
    <section className="relative min-h-[min(100dvh,1080px)] overflow-hidden bg-arc-charcoal">
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

      <div className="relative z-[1] flex min-h-[min(100dvh,1080px)] flex-col">
        {/* Top mastheads */}
        <div className="flex items-start justify-between gap-6 px-4 pb-8 pt-6 sm:px-8 sm:pt-8 lg:px-10 lg:pt-10">
          <div className="max-w-[14rem] font-sans text-[9px] font-medium uppercase leading-relaxed tracking-[0.28em] text-white/88 sm:text-[10px] sm:tracking-[0.32em]">
            <p>{c.topLeftLine1}</p>
            <p className="mt-2">{c.topLeftLine2}</p>
          </div>
          <div className="max-w-[min(100%,16rem)] text-right">
            <p className="font-sans text-[9px] font-medium uppercase tracking-[0.26em] text-white/88 sm:text-[10px] sm:tracking-[0.3em]">
              {c.topRightVol}
            </p>
            <blockquote className="mt-3 font-serif text-[13px] italic leading-snug text-white/92 sm:text-sm md:text-[0.95rem]">
              “{c.quote}”
            </blockquote>
          </div>
        </div>

        {/* Center-left headline + body */}
        <div className="flex flex-1 flex-col justify-center px-4 sm:px-8 lg:px-10">
          <div className="max-w-xl">
            <h1 className="font-serif text-[clamp(1.85rem,4.6vw,3.35rem)] font-normal leading-[1.08] tracking-tight text-white">
              {c.headlineLead}
              <em className="italic">{c.headlineItalic}</em>
              {c.headlineTrail}
            </h1>
            <p className="mt-7 max-w-lg font-sans text-[15px] leading-relaxed text-white/88 sm:text-base md:text-[1.05rem]">
              {c.body}
            </p>
          </div>
        </div>

        {/* Bottom: pill CTA + studio */}
        <div className="flex flex-col gap-5 px-4 pb-10 pt-8 sm:flex-row sm:items-center sm:gap-8 sm:px-8 sm:pb-12 lg:px-10">
          <Link
            href={showcaseInternalHref("/#book")}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-7 py-3.5 font-sans text-sm font-semibold text-arc-charcoal shadow-[0_8px_40px_rgba(0,0,0,0.2)] transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-[0_12px_44px_rgba(0,0,0,0.28)] sm:px-9 sm:py-4 sm:text-base"
          >
            {c.ctaLabel}
            <ArrowRight className="size-4 shrink-0" strokeWidth={2} aria-hidden />
          </Link>

          <Link
            href={showcaseInternalHref("/#about")}
            className="inline-flex items-center gap-3 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-white/92 sm:text-[11px] sm:tracking-[0.26em]"
          >
            <span
              className="flex size-11 items-center justify-center rounded-full border-2 border-white/85 text-white"
              aria-hidden
            >
              <Play className="size-4 fill-none translate-x-0.5" strokeWidth={1.75} />
            </span>
            <span>
              {c.videoLine}
              <span className="text-white/55"> · </span>
              {c.videoDuration}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
