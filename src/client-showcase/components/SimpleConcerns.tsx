import Image from "next/image";
import { showcaseConcernPanels, showcaseUspStats } from "@/client-showcase/content";

import { CONCERNS_SECTION_BG } from "@/content/concernsSection";

const SECTION_BG = CONCERNS_SECTION_BG;

export function SimpleConcerns() {
  return (
    <section
      id="concerns"
      className="scroll-mt-28 border-t border-arc-charcoal/10 bg-arc-cream"
      aria-labelledby="showcase-concerns-heading"
    >
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.14]" aria-hidden>
          <Image src={SECTION_BG} alt="" fill className="object-cover object-center" sizes="100vw" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-arc-charcoal/55">
              How we help
            </p>
            <h2
              id="showcase-concerns-heading"
              className="mt-3 font-serif text-2xl font-semibold leading-snug text-arc-charcoal sm:text-3xl md:text-[2.1rem]"
            >
              Concerns we address with whole-person care
            </h2>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {showcaseConcernPanels.map((panel) => (
              <li
                key={panel.title}
                className="flex flex-col overflow-hidden rounded-2xl border border-arc-charcoal/10 bg-white/80 shadow-sm backdrop-blur-sm"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image src={panel.image} alt="" fill className="object-cover object-center" sizes="(min-width: 1024px) 33vw, 50vw" />
                </div>
                <div className="flex flex-1 flex-col px-4 pb-4 pt-0 sm:px-5 sm:pb-5">
                  <div
                    className="h-px w-full bg-gradient-to-r from-arc-teal/70 via-arc-charcoal/15 to-transparent"
                    aria-hidden
                  />
                  <div className="border-t border-arc-charcoal/8 pt-3 sm:pt-3.5">
                    <h3 className="font-serif text-lg font-semibold text-arc-charcoal">{panel.title}</h3>
                    {"tagline" in panel && panel.tagline ? (
                      <p className="mt-1.5 font-sans text-sm leading-relaxed text-arc-charcoal/72">{panel.tagline}</p>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {showcaseUspStats.map((item) => (
              <li
                key={item.label}
                className="rounded-xl border border-arc-charcoal/10 bg-white/70 px-3 py-4 text-center sm:px-4"
              >
                <p className="font-serif text-2xl font-semibold text-arc-charcoal sm:text-3xl">{item.value}</p>
                <p className="mt-1 font-sans text-[11px] font-medium uppercase leading-snug tracking-wide text-arc-charcoal/65 sm:text-xs">
                  {item.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
