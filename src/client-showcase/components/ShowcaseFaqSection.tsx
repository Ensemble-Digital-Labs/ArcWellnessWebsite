import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { showcaseDesign, showcaseRoseClass } from "@/client-showcase/design-tokens";
import { showcaseFaqHeading as heading, showcaseFaqItems } from "@/client-showcase/mock-page-content";

/**
 * Client-showcase FAQ — native `<details>` accordion, typography aligned with Who we are / testimonials.
 */
export function ShowcaseFaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="showcase-faq-heading"
      className="relative scroll-mt-36 border-t border-arc-charcoal/10 py-20 sm:py-24 lg:py-28"
      style={{ backgroundColor: showcaseDesign.pillarSurface }}
    >
      <div className="relative z-[1] mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16 xl:gap-24">
          <header className="max-w-xl lg:sticky lg:top-36">
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
              id="showcase-faq-heading"
              className="mt-5 font-serif text-[clamp(1.65rem,3.4vw,2.65rem)] font-normal leading-[1.12] tracking-[-0.025em] text-arc-charcoal sm:mt-6"
            >
              <span className={showcaseRoseClass.ink}>{heading.title}</span>
            </h2>
            <p className="mt-4 font-sans text-[15px] leading-relaxed text-arc-charcoal/72 sm:text-base">{heading.supporting}</p>
          </header>

          <div className="min-w-0 border-t border-arc-charcoal/10 lg:border-t-0">
            {showcaseFaqItems.map((item) => (
              <details key={item.id} className="group border-b border-arc-charcoal/12">
                <summary
                  className={cn(
                    "flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-sans text-[15px] font-medium leading-snug text-arc-charcoal sm:text-base",
                    "[&::-webkit-details-marker]:hidden",
                  )}
                >
                  <span className="min-w-0 pr-2">{item.question}</span>
                  <Plus
                    className="size-4 shrink-0 text-arc-rose-gold-ink transition-transform duration-300 ease-out group-open:rotate-45"
                    strokeWidth={2}
                    aria-hidden
                  />
                </summary>
                <p className="pb-5 pt-0 font-sans text-[15px] leading-relaxed text-arc-charcoal/75 sm:pb-6">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
