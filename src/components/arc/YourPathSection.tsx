import Link from "next/link";
import { MessageCircle, Syringe, HeartHandshake } from "lucide-react";
import { PinnedSection } from "@/components/arc/PinnedSection";

/** Three concentrated beats (consult → active care → sustain). */
const steps = [
  {
    n: 1,
    title: "Consult & plan",
    body: "We listen to your goals and map a clear, personalized plan you can follow with confidence.",
    icon: MessageCircle,
  },
  {
    n: 2,
    title: "Treat & refine",
    body: "Thoughtful procedures and therapies aligned to your timeline—with room to adjust as you respond.",
    icon: Syringe,
  },
  {
    n: 3,
    title: "Sustain & support",
    body: "Monitoring, touchpoints, and long-term partnership so wellness lasts beyond a single visit.",
    icon: HeartHandshake,
  },
];

export function YourPathSection() {
  return (
    <PinnedSection id="path" className="min-h-[100dvh] bg-arc-teal-muted/80 py-20 md:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-6 lg:flex-row lg:items-center lg:gap-20 lg:px-8">
        <div data-scroll-section className="max-w-xl shrink-0 lg:w-[38%]">
          <h2 className="mb-8 font-serif text-3xl font-semibold leading-tight text-arc-charcoal md:text-4xl">
            Your Path to Feeling and Living at Your Best
          </h2>
          <Link
            href="#book"
            className="inline-block bg-arc-teal px-8 py-3 font-sans text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-arc-teal-hover"
          >
            Start Your Journey
          </Link>
        </div>

        <div data-scroll-section className="min-w-0 flex-1 overflow-x-auto pb-2">
          <div className="flex min-w-[min(100%,520px)] justify-center gap-4 md:min-w-0 md:flex-wrap lg:max-w-3xl lg:flex-nowrap lg:justify-center">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.n}
                  className="flex w-[min(100%,200px)] shrink-0 flex-col border border-arc-teal/25 bg-white/90 px-3 py-5 text-center shadow-sm sm:min-w-[140px] md:w-[calc(50%-8px)] md:max-w-none lg:flex-1 lg:basis-0 lg:min-w-[160px] lg:max-w-[300px]"
                >
                  <Icon
                    className="mx-auto mb-3 size-8 text-arc-teal"
                    strokeWidth={1.25}
                    aria-hidden
                  />
                  <span className="font-serif text-lg font-semibold text-arc-charcoal">{step.n}</span>
                  <p className="mt-1 font-sans text-[11px] font-semibold uppercase tracking-wide text-arc-charcoal">
                    {step.title}
                  </p>
                  <p className="mt-3 font-sans text-[11px] leading-snug text-arc-charcoal/75">
                    {step.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PinnedSection>
  );
}
