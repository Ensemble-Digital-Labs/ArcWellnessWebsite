import { showcaseDesign, showcaseRoseClass } from "@/client-showcase/design-tokens";
import { ShowcaseTestimonialsCarousel } from "@/client-showcase/components/ShowcaseTestimonialsCarousel";
import {
  showcaseTestimonials,
  showcaseTestimonialsHeading as heading,
} from "@/client-showcase/mock-page-content";

/**
 * Client-showcase testimonials — horizontal carousel + expandable cards (`ShowcaseTestimonialsCarousel`).
 */
export function ShowcaseTestimonialsSection() {
  return (
    <section
      id="testimonials"
      aria-labelledby="showcase-testimonials-heading"
      className="relative scroll-mt-36 border-t border-arc-charcoal/10 py-20 sm:py-24 lg:py-28"
      style={{ backgroundColor: showcaseDesign.beige }}
    >
      <div className="relative z-[1] mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl">
          <div className="flex items-center gap-3.5 sm:gap-4">
            <span
              className="h-0.5 w-10 shrink-0 rounded-full bg-arc-rose-gold-ink/90 sm:w-12"
              aria-hidden
            />
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-arc-rose-gold-ink sm:text-xs sm:tracking-[0.3em]">
              {heading.eyebrow}
            </p>
          </div>
          <h2
            id="showcase-testimonials-heading"
            className="mt-5 font-serif text-[clamp(1.65rem,3.4vw,2.65rem)] font-normal leading-[1.12] tracking-[-0.025em] text-arc-charcoal sm:mt-6"
          >
            <span className={showcaseRoseClass.ink}>{heading.title}</span>
          </h2>
          <p className="mt-4 max-w-xl font-sans text-[15px] leading-relaxed text-arc-charcoal/72 sm:text-base">
            {heading.supporting}
          </p>
        </header>

        <ShowcaseTestimonialsCarousel testimonials={showcaseTestimonials} />
      </div>
    </section>
  );
}
