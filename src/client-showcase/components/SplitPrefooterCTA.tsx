import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { showcaseInternalHref } from "@/client-showcase/content";
import { showcaseMembershipBandCopy as copy } from "@/client-showcase/mock-page-content";

type SplitPrefooterCTAProps = {
  imageSrc: string;
};

/**
 * Full-bleed cohort / membership band: left copy stack, bottom-right year + cohort line + pill CTAs
 * (reference: dark clinical photography, white + rose-gold type, ghost + solid buttons).
 */
export function SplitPrefooterCTA({ imageSrc }: SplitPrefooterCTAProps) {
  const reserveHref = showcaseInternalHref("/#contact");
  /** Same destination until a dedicated membership route exists */
  const memberHref = showcaseInternalHref("/#contact");

  return (
    <section
      id="book"
      aria-labelledby="membership-band-heading"
      className="relative scroll-mt-36 overflow-hidden border-t border-white/10"
    >
      <div className="relative min-h-[min(76svh,42rem)] w-full sm:min-h-[min(72svh,38rem)] lg:min-h-[min(68svh,36rem)]">
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={false}
        />
        {/* Mood + legibility: base darken + vignette */}
        <div className="pointer-events-none absolute inset-0 bg-black/45 sm:bg-black/40" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-transparent sm:from-black/50" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/40" aria-hidden />

        <div className="relative z-[1] mx-auto flex min-h-[min(76svh,42rem)] max-w-[1600px] flex-col justify-between px-5 pb-8 pt-10 sm:min-h-[min(72svh,38rem)] sm:px-10 sm:pb-10 sm:pt-12 lg:min-h-[min(68svh,36rem)] lg:px-14 lg:pb-11 lg:pt-14">
          <div className="max-w-[26rem] text-left sm:max-w-xl">
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="h-px w-8 shrink-0 bg-arc-rose-gold/90 sm:w-10" aria-hidden />
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.32em] text-arc-rose-gold sm:text-[11px] sm:tracking-[0.34em]">
                {copy.eyebrow}
              </p>
            </div>
            <h2
              id="membership-band-heading"
              className="mt-4 flex flex-col gap-4 font-serif text-[clamp(2rem,5.6vw,3.35rem)] font-normal leading-[1.06] tracking-[-0.03em] text-[#f5f5f5] [text-shadow:0_2px_36px_rgba(0,0,0,0.5)] sm:mt-5 sm:gap-5 lg:gap-6"
            >
              <span className="block">{copy.headlineLine1}</span>
              <span className="block">{copy.headlineLine2}</span>
              <span className="block">
                <em className="font-normal italic text-[#f5f5f5]">{copy.headlineItalicWord}</em>
                <span className="font-normal not-italic">{copy.headlineAfterItalic}</span>
              </span>
            </h2>
            <p className="mt-5 max-w-lg font-sans text-[15px] font-normal leading-[1.65] text-[#cccccc] sm:mt-6 sm:text-base sm:leading-[1.7]">
              {copy.body}
            </p>
          </div>

          <div className="mt-8 flex w-full flex-col gap-6 sm:mt-10 lg:mt-8 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
            <div className="hidden lg:block lg:min-h-0 lg:flex-1" aria-hidden />

            <div className="flex w-full flex-col gap-5 lg:max-w-xl lg:items-end">
              <div className="flex flex-col gap-1 lg:items-end lg:text-right">
                <span className="font-serif text-[clamp(2.75rem,11vw,5.5rem)] leading-[0.92] text-white [text-shadow:0_4px_48px_rgba(0,0,0,0.5)]">
                  {copy.yearDisplay}
                </span>
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-white/78 sm:text-[11px] sm:tracking-[0.26em]">
                  {copy.cohortLine}
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end sm:gap-4">
                <Link
                  href={reserveHref}
                  className={cn(
                    "inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/85 px-8 py-3 text-center font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-white/12 sm:text-[11px] sm:tracking-[0.22em]",
                  )}
                >
                  {copy.reserveLabel}
                </Link>
                <Link
                  href={memberHref}
                  className={cn(
                    "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-arc-rose-gold px-8 py-3 text-center font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_12px_40px_-12px_rgba(0,0,0,0.55)] transition-colors hover:bg-arc-rose-gold-hover sm:text-[11px]",
                  )}
                >
                  {copy.memberLabel}
                  <ArrowRight className="size-4 shrink-0 opacity-95" strokeWidth={2} aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
