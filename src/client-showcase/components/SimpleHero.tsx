import Image from "next/image";
import type { ReactNode } from "react";

type SimpleHeroProps = {
  bgImageSrc: string;
  mediaSrc: string;
  title: string;
  intro: ReactNode;
};

export function SimpleHero({ bgImageSrc, mediaSrc, title, intro }: SimpleHeroProps) {
  return (
    <section className="relative overflow-hidden bg-arc-charcoal" aria-labelledby="showcase-hero-title">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-40" aria-hidden>
        <Image src={bgImageSrc} alt="" fill className="object-cover object-center" sizes="100vw" priority />
      </div>
      <div className="relative z-[1] mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8 lg:py-24">
        <div className="max-w-xl text-[#f7f4ef]">
          <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
            ARC Wellness
          </p>
          <h1
            id="showcase-hero-title"
            className="font-serif text-3xl font-semibold leading-[1.12] text-balance sm:text-4xl lg:text-[2.75rem]"
          >
            {title}
          </h1>
          <div className="mt-5 font-sans text-base leading-relaxed text-white/88 sm:text-lg">{intro}</div>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.35)] lg:aspect-[5/4]">
          <Image src={mediaSrc} alt="ARC Wellness reception" fill className="object-cover object-center" sizes="(min-width: 1024px) 45vw, 100vw" priority />
        </div>
      </div>
    </section>
  );
}
