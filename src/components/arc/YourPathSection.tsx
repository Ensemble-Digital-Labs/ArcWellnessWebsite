import Link from "next/link";
import {
  MessageCircle,
  Syringe,
  LineChart,
  SlidersHorizontal,
  HeartHandshake,
} from "lucide-react";
import { PinnedSection } from "@/components/arc/PinnedSection";

const steps = [
  {
    n: 1,
    title: "Consultation",
    body: "We listen to your goals and map a clear, personalized plan.",
    icon: MessageCircle,
  },
  {
    n: 2,
    title: "Treatment",
    body: "Thoughtful procedures and therapies aligned to your timeline.",
    icon: Syringe,
  },
  {
    n: 3,
    title: "Monitoring",
    body: "Objective tracking so progress stays visible and meaningful.",
    icon: LineChart,
  },
  {
    n: 4,
    title: "Adjustment",
    body: "Fine-tuning based on how you feel, respond, and evolve.",
    icon: SlidersHorizontal,
  },
  {
    n: 5,
    title: "Ongoing Support",
    body: "Long-term partnership for wellness that lasts beyond a single visit.",
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
          <div className="flex min-w-[640px] gap-4 md:min-w-0 md:flex-wrap lg:flex-nowrap lg:justify-between">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.n}
                  className="flex w-[120px] shrink-0 flex-col border border-arc-teal/25 bg-white/90 px-3 py-5 text-center shadow-sm md:w-[calc(50%-8px)] lg:w-[18%] lg:min-w-[100px]"
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
