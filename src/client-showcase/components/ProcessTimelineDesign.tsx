import Link from "next/link";
import { showcaseInternalHref } from "@/client-showcase/content";
import { showcaseDesign } from "@/client-showcase/design-tokens";
import { processTimelineSteps } from "@/client-showcase/mock-page-content";

export function ProcessTimelineDesign() {
  return (
    <section id="path" className="scroll-mt-36 border-t border-arc-charcoal/10 bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:items-start lg:gap-10">
          <div className="max-w-md lg:pt-2">
            <h2 className="font-serif text-[clamp(1.65rem,3vw,2.35rem)] font-semibold leading-snug text-arc-charcoal">
              Your Path to Feeling and Living at Your Best
            </h2>
            <Link
              href={showcaseInternalHref("/#book")}
              className="mt-8 inline-flex rounded-md px-7 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-arc-charcoal transition-colors hover:opacity-95 sm:text-sm"
              style={{ backgroundColor: showcaseDesign.sage }}
            >
              Start your journey
            </Link>
          </div>

          <div className="min-w-0">
            <ol className="flex gap-3 overflow-x-auto pb-2 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-4 [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-5 lg:gap-3 lg:overflow-visible">
              {processTimelineSteps.map((step) => (
                <li
                  key={step.step}
                  className="flex w-[11.5rem] shrink-0 flex-col rounded-lg border border-arc-charcoal/10 bg-[#faf9f6] p-4 sm:w-[12.5rem] lg:w-auto lg:min-w-0"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="flex size-8 shrink-0 items-center justify-center rounded-full font-sans text-xs font-bold text-arc-charcoal"
                      style={{ backgroundColor: showcaseDesign.sage }}
                    >
                      {step.step}
                    </span>
                    <step.Icon className="size-4 opacity-70" style={{ color: showcaseDesign.sageOutline }} strokeWidth={1.5} aria-hidden />
                  </div>
                  <h3 className="mt-3 font-serif text-base font-semibold text-arc-charcoal">{step.title}</h3>
                  <p className="mt-2 font-sans text-[11px] leading-relaxed text-arc-charcoal/72 sm:text-xs">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
