"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArcTextUnderlineCta } from "@/components/arc/ArcTextUnderlineCta";
import { PinnedSection } from "@/components/arc/PinnedSection";
import {
  ARC_HEADLINE_TITLE_EMPHASIS_CLASS,
  TitleEmphasis,
} from "@/components/arc/TitleEmphasis";
import {
  PATH_SECTION_INTRO_BACKGROUND_SRC,
  PATH_STEP_IMAGE_SRC,
} from "@/content/backgroundDecoration";
import { pathPinFadeUp, usePathPinScrubProgress } from "@/lib/arcPinReveal";
import { useArcFullscreenPin } from "@/lib/arcSectionPins";

type PathStep = {
  numeral: string;
  title: string;
  stepMeta: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  contentOnLeft: boolean;
};

const PATH_STEPS: PathStep[] = [
  {
    numeral: "I.",
    title: "Listen",
    stepMeta: "STEP 01 · 90 MINUTES",
    description:
      "A conversation, not an intake. We ask about your sleep, your work, your weeks. Patterns surface before any test does.",
    imageSrc: PATH_STEP_IMAGE_SRC.listen,
    imageAlt: "Listen — first step of the ARC wellness journey",
    contentOnLeft: false,
  },
  {
    numeral: "II.",
    title: "Measure",
    stepMeta: "STEP 02 · TWO VISITS",
    description:
      "Comprehensive panels, body composition, cognitive assessments. We capture the numbers that matter — and the ones most clinics miss.",
    imageSrc: PATH_STEP_IMAGE_SRC.measure,
    imageAlt: "Measure — assessments and diagnostics",
    contentOnLeft: true,
  },
  {
    numeral: "III.",
    title: "Author",
    stepMeta: "STEP 03 · ONE WEEK",
    description:
      "Your team meets — without you in the room — and writes a plan in five chapters: surface, shape, foundation, mind, and the long view.",
    imageSrc: PATH_STEP_IMAGE_SRC.author,
    imageAlt: "Author — your personalized care plan",
    contentOnLeft: false,
  },
  {
    numeral: "IV.",
    title: "Practice",
    stepMeta: "STEP 04 · ONGOING",
    description:
      "We meet monthly. Treatments, coaching, refinements — kept small enough to actually do, long enough to actually work.",
    imageSrc: PATH_STEP_IMAGE_SRC.practice,
    imageAlt: "Practice — ongoing care and coaching",
    contentOnLeft: true,
  },
  {
    numeral: "V.",
    title: "Revise",
    stepMeta: "STEP 05 · EACH SEASON",
    description:
      "Every quarter we re-measure and rewrite. The plan ages with you, in pencil, never in stone.",
    imageSrc: PATH_STEP_IMAGE_SRC.revise,
    imageAlt: "Revise — seasonal plan updates",
    contentOnLeft: false,
  },
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

function YourPathIntroSection() {
  const { p, setPinProgress } = usePathPinScrubProgress();
  const headlineMotion = pathPinFadeUp(p, 0.08, 2.35);
  const linkMotion = pathPinFadeUp(p, 0.26, 2.2);
  const scrollHintMotion = pathPinFadeUp(p, 0.34, 2.05);

  return (
    <PinnedSection
      id="path"
      pinDistanceMultiplier={0.35}
      onProgress={setPinProgress}
      className="relative min-h-[100dvh] overflow-clip bg-arc-teal-muted"
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src={PATH_SECTION_INTRO_BACKGROUND_SRC}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      <div className="relative z-[1] mx-auto flex min-h-[100dvh] w-full max-w-7xl flex-col items-center px-5 pb-[max(5.75rem,env(safe-area-inset-bottom,0px))] pt-28 text-center sm:px-8 sm:pb-[max(6.5rem,env(safe-area-inset-bottom,0px))] sm:pt-32 md:pt-36 lg:pt-40">
        <div
          data-scroll-section
          className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center lg:max-w-3xl"
        >
          <h2
            className="mb-5 max-w-[min(100%,20rem)] font-serif text-[1.65rem] font-semibold leading-[1.12] text-balance text-arc-charcoal sm:mb-6 sm:max-w-2xl sm:text-3xl sm:leading-tight md:text-[2.1rem] lg:mb-6 lg:text-[2.25rem]"
            style={headlineMotion}
          >
            <YourPathHeadlineTitle />
          </h2>
          <div style={linkMotion}>
            <ArcTextUnderlineCta
              href="#book"
              accent="roseGoldInk"
              className="items-center"
            >
              Start Your Journey
            </ArcTextUnderlineCta>
          </div>
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 z-[2] flex min-h-[5.75rem] w-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-arc-teal-muted/45 to-arc-teal-muted/70 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom,0px))] pt-5 sm:min-h-[6.5rem] sm:gap-2.5 sm:pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] sm:pt-6"
        role="note"
        style={scrollHintMotion}
      >
        <div className="flex max-w-md flex-col items-center gap-2 text-center">
          <p className="font-sans text-[10px] font-semibold uppercase leading-snug tracking-[0.22em] text-arc-charcoal/65 sm:text-[11px] sm:tracking-[0.28em]">
            <span
              aria-hidden
              className="mr-1 inline-block motion-safe:animate-arc-indicator-arrow"
            >
              ↓
            </span>
            Keep scrolling to follow your path{" "}
            <span
              aria-hidden
              className="ml-1 inline-block motion-safe:animate-arc-indicator-arrow"
            >
              ↓
            </span>
          </p>
          <p className="font-sans text-[11px] font-normal leading-relaxed text-arc-charcoal/58 sm:text-xs">
            Your wellness journey unfolds in the steps below.
          </p>
        </div>
      </div>
    </PinnedSection>
  );
}

function YourPathStepSection({ step }: { step: PathStep }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { p, setPinProgress } = usePathPinScrubProgress();
  useArcFullscreenPin(sectionRef, {
    pinDistanceMultiplier: 0.35,
    onProgress: setPinProgress,
  });

  const leftPanelYPercent = (1 - p) * 1;
  const rightPanelYPercent = (p - 1) * 1;
  const titleMotion = pathPinFadeUp(p, 0.08, 2.35);
  const metaMotion = pathPinFadeUp(p, 0.16, 2.05);
  const bodyMotion = pathPinFadeUp(p, 0.24, 2.0);

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] overflow-clip bg-arc-cream">
      <div className="grid min-h-[100dvh] grid-cols-1 md:grid-cols-2">
        <div
          className={[
            "relative min-h-[42dvh] will-change-transform md:min-h-[100dvh]",
            step.contentOnLeft ? "md:order-2" : "md:order-1",
          ].join(" ")}
          style={{
            transform: `translate3d(0, ${leftPanelYPercent}%, 0)`,
          }}
        >
          <Image
            src={step.imageSrc}
            alt={step.imageAlt}
            fill
            className="object-cover object-center"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>

        <div
          className={[
            "relative flex min-h-[58dvh] items-center justify-center bg-arc-cream/95 px-6 py-14 will-change-transform sm:px-10 sm:py-16 md:min-h-[100dvh] md:px-12 lg:px-16",
            step.contentOnLeft ? "md:order-1" : "md:order-2",
          ].join(" ")}
          style={{
            transform: `translate3d(0, ${rightPanelYPercent}%, 0)`,
          }}
        >
          <div className="w-full max-w-xl text-left">
            <p
              className="mb-3 font-serif text-3xl leading-none text-arc-rose-gold-ink sm:text-4xl"
              style={titleMotion}
            >
              {step.numeral} {step.title}
            </p>
            <p
              className="mb-6 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-arc-charcoal/60 sm:text-[0.8rem]"
              style={metaMotion}
            >
              {step.stepMeta}
            </p>
            <p
              className="font-sans text-base leading-relaxed text-arc-charcoal/80 sm:text-lg sm:leading-relaxed"
              style={bodyMotion}
            >
              {step.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function YourPathSection() {
  return (
    <>
      <YourPathIntroSection />
      {PATH_STEPS.map((step) => (
        <YourPathStepSection key={step.stepMeta} step={step} />
      ))}
    </>
  );
}
