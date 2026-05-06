import Link from "next/link";
import { showcaseInternalHref } from "@/client-showcase/content";

const STEPS = [
  {
    title: "Listen first",
    body: "A real conversation about your life, patterns, and priorities—before tests or treatments.",
  },
  {
    title: "Measure what matters",
    body: "Thoughtful diagnostics and baselines so recommendations stay proportional to you.",
  },
  {
    title: "Partner over time",
    body: "Monthly rhythm, small adjustments, and honest follow-through—not a rushed discharge.",
  },
] as const;

export function SimplePathCompact() {
  return (
    <section id="path" className="scroll-mt-28 border-t border-arc-charcoal/10 bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-arc-charcoal/50">Your path</p>
        <h2 className="mt-3 font-serif text-2xl font-semibold text-arc-charcoal sm:text-3xl">Care designed to stay coherent</h2>
        <p className="mt-4 font-sans text-base leading-relaxed text-arc-charcoal/78">
          A simpler rhythm for busy people who want clarity, not chaos.
        </p>

        <ol className="mt-10 space-y-8 text-left">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex gap-4 sm:gap-5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-arc-teal-muted font-serif text-sm font-semibold text-arc-teal-ink">
                {i + 1}
              </span>
              <div>
                <h3 className="font-serif text-lg font-semibold text-arc-charcoal">{step.title}</h3>
                <p className="mt-1 font-sans text-sm leading-relaxed text-arc-charcoal/78">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <Link
          href={showcaseInternalHref("/#book")}
          className="mt-10 inline-flex rounded-full bg-arc-teal px-7 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-arc-teal-hover"
        >
          Schedule a consult
        </Link>
      </div>
    </section>
  );
}
