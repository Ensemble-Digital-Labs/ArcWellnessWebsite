import Image from "next/image";
import type { ServicesShowcaseSlide } from "@/content/servicesShowcaseSlides";
import { servicesShowcaseEyebrow } from "@/content/servicesShowcaseSlides";

type SimpleServicesGridProps = {
  slides: readonly ServicesShowcaseSlide[];
};

export function SimpleServicesGrid({ slides }: SimpleServicesGridProps) {
  return (
    <section id="services" className="scroll-mt-28 border-t border-arc-charcoal/10 bg-arc-charcoal py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-white/55">Services</p>
          <h2 className="mt-3 font-serif text-2xl font-semibold leading-snug text-[#f7f4ef] sm:text-3xl md:text-[2.1rem]">
            A few places we focus your plan
          </h2>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {slides.map((slide) => (
            <li
              key={slide.title}
              className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
            >
              <div className="relative aspect-[16/10] w-full">
                <Image src={slide.imageSrc} alt="" fill className="object-cover object-center" sizes="(min-width: 1024px) 33vw, 50vw" />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-arc-teal/90">
                  {servicesShowcaseEyebrow(slide)}
                </p>
                <h3 className="font-serif text-lg font-semibold text-[#f7f4ef] sm:text-xl">{slide.title}</h3>
                <p className="font-sans text-sm leading-relaxed text-white/75">{slide.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
