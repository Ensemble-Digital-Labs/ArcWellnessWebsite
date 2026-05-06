import Image from "next/image";
import Link from "next/link";
import { showcaseInternalHref } from "@/client-showcase/content";

type VidaStyleHeroProps = {
  backgroundSrc: string;
  /** Single dominant all-caps word (reference: REFINEMENT). */
  headlineWord?: string;
};

/**
 * Full-bleed hero modeled on clinical wellness references:
 * one large caps sans headline, “WHERE SCIENCE MEETS” + italic serif emphasis,
 * rectangular white schedule CTA.
 */
export function VidaStyleHero({ backgroundSrc, headlineWord = "REFINEMENT" }: VidaStyleHeroProps) {
  return (
    <section className="relative flex min-h-[min(88dvh,920px)] items-center justify-center overflow-hidden bg-arc-charcoal">
      <Image
        src={backgroundSrc}
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-arc-charcoal/35 via-arc-charcoal/25 to-arc-charcoal/50" aria-hidden />

      <div className="relative z-[1] mx-auto flex w-full max-w-5xl flex-col items-center px-5 py-20 text-center sm:py-24">
        <h1 className="font-sans text-[clamp(2.75rem,12vw,6.75rem)] font-semibold uppercase leading-[0.92] tracking-[0.14em] text-white sm:tracking-[0.18em] md:tracking-[0.22em]">
          {headlineWord}
        </h1>

        <p className="mt-8 max-w-2xl font-sans text-[11px] font-medium uppercase leading-relaxed tracking-[0.28em] text-white/95 sm:text-xs sm:tracking-[0.32em] md:text-[13px]">
          Where science meets{" "}
          <span className="font-serif text-[1.15em] font-normal normal-case tracking-normal text-white italic">
            serenity
          </span>
        </p>

        <Link
          href={showcaseInternalHref("/#book")}
          className="mt-10 inline-flex items-center justify-center rounded-md bg-white px-10 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-arc-charcoal shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)] sm:px-12 sm:py-4 sm:text-xs sm:tracking-[0.24em]"
        >
          Schedule an appointment
        </Link>
      </div>
    </section>
  );
}
