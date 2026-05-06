import Image from "next/image";
import type { HomeTestimonialItem } from "@/client-showcase/types";

type SimpleTestimonialsProps = {
  items: readonly HomeTestimonialItem[];
};

export function SimpleTestimonials({ items }: SimpleTestimonialsProps) {
  return (
    <section
      id="journal"
      className="scroll-mt-28 border-t border-arc-charcoal/10 bg-arc-cream-deep/35 py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-arc-charcoal/55">Patient voices</p>
          <h2 className="mt-3 font-serif text-2xl font-semibold text-arc-charcoal sm:text-3xl">Testimonials</h2>
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex gap-4 rounded-2xl border border-arc-charcoal/10 bg-white p-4 shadow-sm sm:gap-5 sm:p-5"
            >
              <div className="relative size-20 shrink-0 overflow-hidden rounded-full sm:size-24">
                <Image src={item.imageSrc} alt={item.imageAlt} fill className="object-cover object-center" sizes="96px" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-sans text-sm font-medium text-arc-teal-ink">{item.attribution}</p>
                <p className="font-sans text-[11px] uppercase tracking-wide text-arc-charcoal/55">{item.context}</p>
                <blockquote className="mt-2 font-sans text-sm leading-relaxed text-arc-charcoal/85">
                  <span className="text-arc-charcoal/45" aria-hidden>
                    “
                  </span>
                  {item.quote}
                  <span className="text-arc-charcoal/45" aria-hidden>
                    ”
                  </span>
                </blockquote>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
