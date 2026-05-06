"use client";

import {
  Activity,
  HeartHandshake,
  MessageCircle,
  PenLine,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { ArcStickyTabs } from "@/components/arc/ArcStickyTabs";
import { ArcTextUnderlineCta } from "@/components/arc/ArcTextUnderlineCta";
import { PinnedSection } from "@/components/arc/PinnedSection";
import {
  ARC_HEADLINE_TITLE_EMPHASIS_CLASS,
  TitleEmphasis,
} from "@/components/arc/TitleEmphasis";
import { PATH_SECTION_INTRO_BACKGROUND_SRC } from "@/content/backgroundDecoration";
import { PATH_JOURNEY_STEPS } from "@/content/pathSteps";

/** Icons for the five journey steps (visual only; copy lives in `pathSteps.ts`). */
const STEP_ICONS: readonly LucideIcon[] = [
  MessageCircle,
  Activity,
  PenLine,
  HeartHandshake,
  RefreshCw,
];

function YourPathHeadlineTitle() {
  return (
    <>
      Your Path to{" "}
      <TitleEmphasis className={ARC_HEADLINE_TITLE_EMPHASIS_CLASS}>
        Feeling
      </TitleEmphasis>{" "}
      and{" "}
      <TitleEmphasis className={ARC_HEADLINE_TITLE_EMPHASIS_CLASS}>
        Living
      </TitleEmphasis>{" "}
      at Your{" "}
      <TitleEmphasis className={ARC_HEADLINE_TITLE_EMPHASIS_CLASS}>
        Best
      </TitleEmphasis>
    </>
  );
}

function YourPathImmersive() {
  return (
    <section id="path" className="relative scroll-mt-28">
      <ArcStickyTabs
        leadSticky
        leadStickyBackgroundSrc={PATH_SECTION_INTRO_BACKGROUND_SRC}
        leadStickyBarClassName="shadow-[0_8px_28px_rgba(0,0,0,0.07)] backdrop-blur-[2px] supports-[backdrop-filter]:bg-arc-teal-muted/10"
        sectionClassName="relative overflow-clip bg-arc-teal-muted"
        lead={
          <div
            data-scroll-section
            className="mx-auto flex w-full max-w-2xl flex-col items-center px-5 text-center sm:px-8 lg:max-w-3xl"
          >
            <h2 className="mb-5 max-w-[min(100%,20rem)] font-serif text-[1.65rem] font-semibold leading-[1.12] text-balance text-arc-charcoal sm:mb-6 sm:max-w-2xl sm:text-3xl sm:leading-tight md:text-[2.1rem] lg:mb-6 lg:text-[2.25rem]">
              <YourPathHeadlineTitle />
            </h2>
            <ArcTextUnderlineCta href="#book" className="items-center">
              Start Your Journey
            </ArcTextUnderlineCta>
          </div>
        }
      >
        {PATH_JOURNEY_STEPS.map((step, index) => {
          const Icon = STEP_ICONS[index] ?? MessageCircle;
          return (
            <ArcStickyTabs.Item
              key={step.id}
              id={step.id}
              title={
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-serif text-base font-semibold text-arc-teal-ink tabular-nums sm:text-lg">
                    {step.id}
                  </span>
                  <span className="text-[1.05em]">{step.title}</span>
                </span>
              }
            >
              <div className="relative z-0 flex min-h-[min(56dvh,520px)] flex-col items-center justify-start pt-3 sm:min-h-[min(60dvh,580px)] sm:pt-5 lg:min-h-[min(64dvh,620px)] lg:pt-6">
                <div className="relative z-0 w-full max-w-lg rounded-2xl border border-arc-teal/30 bg-white px-6 py-8 shadow-[0_24px_60px_rgba(0,0,0,0.08)] sm:px-8 sm:py-9">
                  <Icon
                    className="mb-4 size-9 text-arc-teal-ink sm:size-10"
                    strokeWidth={1.25}
                    aria-hidden
                  />
                  <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-arc-charcoal/80">
                    {step.meta}
                  </p>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-arc-charcoal/85 sm:text-[0.95rem]">
                    {step.body}
                  </p>
                </div>
              </div>
            </ArcStickyTabs.Item>
          );
        })}
      </ArcStickyTabs>
    </section>
  );
}

function YourPathReduced() {
  return (
    <PinnedSection
      id="path"
      className="min-h-[100dvh] bg-arc-teal-muted/80 py-20 md:py-24"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-6 lg:flex-row lg:items-center lg:gap-20 lg:px-8">
        <div data-scroll-section className="max-w-xl shrink-0 lg:w-[38%]">
          <h2 className="mb-8 font-serif text-3xl font-semibold leading-tight text-arc-charcoal md:text-4xl">
            <YourPathHeadlineTitle />
          </h2>
          <ArcTextUnderlineCta href="#book" className="items-start">
            Start Your Journey
          </ArcTextUnderlineCta>
        </div>

        <div data-scroll-section className="min-w-0 flex-1 overflow-x-auto pb-2">
          <div className="flex min-w-[min(100%,520px)] justify-center gap-4 md:min-w-0 md:flex-wrap lg:max-w-5xl lg:flex-nowrap lg:justify-center">
            {PATH_JOURNEY_STEPS.map((step, index) => {
              const Icon = STEP_ICONS[index] ?? MessageCircle;
              return (
                <div
                  key={step.id}
                  className="flex w-[min(100%,200px)] shrink-0 flex-col border border-arc-teal/25 bg-white/90 px-3 py-5 text-center shadow-sm sm:min-w-[140px] md:w-[calc(33.333%-11px)] md:max-w-none lg:flex-1 lg:basis-0 lg:min-w-[140px] lg:max-w-[220px]"
                >
                  <Icon
                    className="mx-auto mb-3 size-8 text-arc-teal-ink"
                    strokeWidth={1.25}
                    aria-hidden
                  />
                  <span className="font-serif text-lg font-semibold text-arc-charcoal">
                    {step.id}
                  </span>
                  <p className="mt-1 font-sans text-[11px] font-semibold uppercase tracking-wide text-arc-charcoal">
                    {step.title}
                  </p>
                  <p className="mt-1 font-sans text-[9px] font-medium uppercase leading-snug tracking-wide text-arc-charcoal/65">
                    {step.meta}
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

export function YourPathSection() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (reduceMotion) {
    return <YourPathReduced />;
  }

  return <YourPathImmersive />;
}
