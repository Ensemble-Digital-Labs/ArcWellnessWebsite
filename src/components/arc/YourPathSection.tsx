"use client";

import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArcPrimaryCta } from "@/components/arc/ArcPrimaryCta";
import { ArcSectionSeamBlend } from "@/components/arc/ArcSectionSeamBlend";
import { ArcTextReveal } from "@/components/arc/ArcTextReveal";
import { PinnedSection } from "@/components/arc/PinnedSection";
import {
  TitleEmphasis,
} from "@/components/arc/TitleEmphasis";
import {
  PATH_SECTION_INTRO_BACKGROUND_SRC,
  PATH_STEP_IMAGE_SRC,
} from "@/content/backgroundDecoration";
import { pathPinFadeUp, usePathPinScrubProgress } from "@/lib/arcPinReveal";
import {
  ARC_HOME_PATH_BOTTOM_SEAM_SOFT_CLASS,
  ARC_HOME_PATH_STEPS_BOTTOM_SEAM_SOFT_CLASS,
  ARC_HOME_PATH_STEPS_TOP_SEAM_SOFT_CLASS,
  ARC_HOME_PATH_STEPS_TOP_SEAM_DESKTOP_LEFT_CLASS,
  ARC_HOME_PATH_STEPS_TOP_OVERLAP_CLASS,
  ARC_HOME_PATH_STEP_IMAGE_LEFT_FEATHER_CLASS,
  ARC_HOME_PATH_STEP_IMAGE_TOP_FEATHER_CLASS,
  ARC_HOME_PATH_STEP_IMAGE_TOP_FEATHER_DESKTOP_CLASS,
  ARC_HOME_PATH_TOP_SEAM_SOFT_CLASS,
} from "@/lib/arc-layout";
import { useMinMd } from "@/lib/useMinMd";
import { cn } from "@/lib/utils";
import { siteMeta } from "@/content/siteMeta";

type PathStep = {
  title: string;
  stepMeta: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  contentOnLeft: boolean;
};

const PATH_STEPS: PathStep[] = [
  {
    title: "Listen",
    stepMeta: "STEP 01 · 90 MINUTES",
    description:
      "A conversation, not an intake. We ask about your sleep, your work, your weeks. Patterns surface before any test does.",
    imageSrc: PATH_STEP_IMAGE_SRC.listen,
    imageAlt: "Listen, first step of the ARC wellness journey",
    contentOnLeft: false,
  },
  {
    title: "Measure",
    stepMeta: "STEP 02 · TWO VISITS",
    description:
      "Comprehensive panels, body composition, cognitive assessments. We capture the numbers that matter, and the ones most clinics miss.",
    imageSrc: PATH_STEP_IMAGE_SRC.measure,
    imageAlt: "Measure, assessments and diagnostics",
    contentOnLeft: true,
  },
  {
    title: "Author",
    stepMeta: "STEP 03 · ONE WEEK",
    description:
      "Your team meets, without you in the room, and writes a plan in five chapters: surface, shape, foundation, mind, and the long view.",
    imageSrc: PATH_STEP_IMAGE_SRC.author,
    imageAlt: "Author, your personalized care plan",
    contentOnLeft: false,
  },
  {
    title: "Practice",
    stepMeta: "STEP 04 · ONGOING",
    description:
      "We meet monthly. Treatments, coaching, refinements, kept small enough to actually do, long enough to actually work.",
    imageSrc: PATH_STEP_IMAGE_SRC.practice,
    imageAlt: "Practice, ongoing care and coaching",
    contentOnLeft: true,
  },
  {
    title: "Revise",
    stepMeta: "STEP 05 · EACH SEASON",
    description:
      "Every quarter we re-measure and rewrite. The plan ages with you, in pencil, never in stone.",
    imageSrc: PATH_STEP_IMAGE_SRC.revise,
    imageAlt: "Revise, seasonal plan updates",
    contentOnLeft: false,
  },
];

/** Script keywords on light path intro plate. */
const PATH_INTRO_EMPHASIS_CLASS =
  "text-[1.45em] leading-[1.01] text-arc-teal-ink sm:text-[1.5em] md:text-[1.56em] lg:text-[1.62em] xl:text-[1.66em] [text-shadow:0_1px_2px_rgba(255,255,255,0.5),0.015em_0_0_color-mix(in_srgb,currentColor_30%,transparent),-0.015em_0_0_color-mix(in_srgb,currentColor_30%,transparent)]";

function YourPathHeadlineTitle() {
  return (
    <>
      Your Path to{" "}
      <TitleEmphasis className={PATH_INTRO_EMPHASIS_CLASS}>
        Feeling
      </TitleEmphasis>{" "}
      and{" "}
      <TitleEmphasis className={PATH_INTRO_EMPHASIS_CLASS}>
        Living
      </TitleEmphasis>{" "}
      at Your{" "}
      <TitleEmphasis className={PATH_INTRO_EMPHASIS_CLASS}>
        Best
      </TitleEmphasis>
    </>
  );
}

function YourPathIntroSection({
  lead,
  ctaHref,
  ctaLabel,
  topSeam = false,
  bottomSeam = false,
}: {
  lead: string;
  ctaHref: string;
  ctaLabel: string;
  topSeam?: boolean;
  bottomSeam?: boolean;
}) {
  const { setPinProgress } = usePathPinScrubProgress();
  const staticMotion = { opacity: 1, transform: "none" } satisfies CSSProperties;
  const headlineMotion = staticMotion;
  const linkMotion = staticMotion;

  useEffect(() => {
    setPinProgress(1);
  }, [setPinProgress]);

  return (
    <PinnedSection
      id="path"
      pinDistanceMultiplier={0.35}
      onProgress={setPinProgress}
      disabled
      className="relative z-30 min-h-[100dvh] overflow-clip bg-arc-teal-muted"
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

      {topSeam ? (
        <ArcSectionSeamBlend
          edge="top"
          tone="cream"
          variant="soft"
          scope="background"
          className={ARC_HOME_PATH_TOP_SEAM_SOFT_CLASS}
        />
      ) : null}

      <div className="relative z-[1] mx-auto flex min-h-[100dvh] w-full max-w-7xl flex-col items-center px-5 pb-[max(5.75rem,env(safe-area-inset-bottom,0px))] pt-28 text-center sm:px-8 sm:pb-[max(6.5rem,env(safe-area-inset-bottom,0px))] sm:pt-32 md:pb-16 md:pt-36 lg:pt-40">
        <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center lg:max-w-3xl">
          <ArcTextReveal variant="heading">
            <h2
              className="mb-5 max-w-[min(100%,20rem)] font-serif text-[1.65rem] font-semibold leading-[1.12] text-balance text-arc-charcoal sm:mb-6 sm:max-w-2xl sm:text-3xl sm:leading-tight md:text-[2.1rem] lg:mb-6 lg:text-[2.25rem]"
              style={headlineMotion}
            >
              <YourPathHeadlineTitle />
            </h2>
          </ArcTextReveal>
          <ArcTextReveal variant="body" delayIndex={1}>
            <p
              className="mb-4 font-sans text-base leading-relaxed text-arc-charcoal/82 sm:text-lg"
              style={headlineMotion}
            >
              {lead}
            </p>
          </ArcTextReveal>
          <ArcTextReveal variant="body" delayIndex={2}>
            <div style={linkMotion}>
              <ArcPrimaryCta href={ctaHref} centered className="mt-1">
                {ctaLabel}
              </ArcPrimaryCta>
            </div>
          </ArcTextReveal>
        </div>
      </div>

      {bottomSeam ? (
        <ArcSectionSeamBlend
          edge="bottom"
          tone="cream"
          variant="soft"
          scope="background"
          className={ARC_HOME_PATH_BOTTOM_SEAM_SOFT_CLASS}
        />
      ) : null}
    </PinnedSection>
  );
}

function YourPathStepPanel({
  step,
  panelStyle,
  imageStyle,
  textStyle,
}: {
  step: PathStep;
  panelStyle: CSSProperties;
  imageStyle?: CSSProperties;
  textStyle?: CSSProperties;
}) {
  return (
    <article
      className="absolute inset-0"
      style={panelStyle}
      aria-hidden={panelStyle.opacity === 0}
    >
      <div className="grid min-h-[100dvh] grid-cols-1 md:grid-cols-2">
        <div
          className={[
            "relative min-h-[42dvh] md:min-h-[100dvh]",
            step.contentOnLeft ? "md:order-2" : "md:order-1",
          ].join(" ")}
          style={imageStyle}
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
            "relative flex min-h-[58dvh] items-center justify-center bg-arc-cream/95 px-6 py-14 sm:px-10 sm:py-16 md:min-h-[100dvh] md:px-12 lg:px-16",
            step.contentOnLeft ? "md:order-1" : "md:order-2",
          ].join(" ")}
        >
          <div className="w-full max-w-xl text-left" style={textStyle}>
            <p className="mb-3 font-serif text-3xl leading-none text-arc-charcoal sm:text-4xl">
              {step.title}
            </p>
            <p className="mb-6 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-arc-charcoal/60 sm:text-[0.8rem]">
              {step.stepMeta}
            </p>
            <p className="font-sans text-base leading-relaxed text-arc-charcoal/80 sm:text-lg sm:leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

function getMobileStepOpacities(
  index: number,
  stepCount: number,
  timeline: number,
  revealProgress: number,
  holdUnitsPerStep: number,
  crossfadeUnitsBetweenSteps: number,
  imageFadeInUnits: number,
  textFadeInUnits: number,
) {
  const isLastStep = index === stepCount - 1;
  const segmentStart = index * (holdUnitsPerStep + crossfadeUnitsBetweenSteps);
  const holdEnd = segmentStart + holdUnitsPerStep;
  const segmentEnd = holdEnd + crossfadeUnitsBetweenSteps;
  const local = timeline - segmentStart;
  const textFadeInStart = imageFadeInUnits;

  let panelOpacity = 0;
  let imageOpacity = 0;
  let textOpacity = 0;

  if (index === 0) {
    if (timeline >= segmentStart && timeline <= holdEnd) {
      panelOpacity = 1;
      imageOpacity = 1;
      textOpacity = revealProgress;
    } else if (!isLastStep && timeline > holdEnd && timeline <= segmentEnd) {
      const fadeOut = 1 - (timeline - holdEnd) / crossfadeUnitsBetweenSteps;
      panelOpacity = fadeOut;
      imageOpacity = fadeOut;
      textOpacity = Math.min(1, revealProgress) * fadeOut;
    } else if (isLastStep && timeline > segmentStart) {
      panelOpacity = 1;
      imageOpacity = 1;
      textOpacity = 1;
    }
  } else if (local >= 0 && local <= holdUnitsPerStep) {
    panelOpacity = 1;
    imageOpacity = clamp01(local / imageFadeInUnits);
    textOpacity =
      local < textFadeInStart ? 0 : clamp01((local - textFadeInStart) / textFadeInUnits);
  } else if (!isLastStep && timeline > holdEnd && timeline <= segmentEnd) {
    const fadeOut = 1 - (timeline - holdEnd) / crossfadeUnitsBetweenSteps;
    panelOpacity = fadeOut;
    imageOpacity = fadeOut;
    textOpacity = fadeOut;
  } else if (isLastStep && local > 0) {
    panelOpacity = 1;
    imageOpacity = 1;
    textOpacity = 1;
  }

  return { panelOpacity, imageOpacity, textOpacity };
}

/** Mobile-only scroll-scrub crossfade (pinned). Laptop uses {@link YourPathStepsInteractiveSection}. */
const MOBILE_STEP_SEQUENCE_PIN_DISTANCE = 4.2;

function YourPathStepsCrossfadeSection({ pinDisabled = false }: { pinDisabled?: boolean }) {
  const { p, setPinProgress } = usePathPinScrubProgress();
  const stepCount = PATH_STEPS.length;
  const introRevealPortion = 0.08;
  const revealProgress = Math.min(1, Math.max(0, p / introRevealPortion));
  const holdUnitsPerStep = 1.4;
  const crossfadeUnitsBetweenSteps = 1.4;
  const imageFadeInUnits = 0.45;
  const textFadeInUnits = 0.45;
  const transitionProgress = Math.min(
    1,
    Math.max(0, (p - introRevealPortion) / (1 - introRevealPortion)),
  );
  const totalTimelineUnits =
    stepCount * holdUnitsPerStep + Math.max(0, stepCount - 1) * crossfadeUnitsBetweenSteps;
  const timeline = transitionProgress * totalTimelineUnits;

  return (
    <PinnedSection
      data-path-steps-crossfade
      pinDistanceMultiplier={MOBILE_STEP_SEQUENCE_PIN_DISTANCE}
      onProgress={setPinProgress}
      disabled={pinDisabled}
      stabilizeScrollOnToggle
      className="relative z-30 min-h-[100dvh] overflow-clip bg-arc-cream"
    >
      <div className="relative min-h-[100dvh]">
        {PATH_STEPS.map((step, index) => {
          const { panelOpacity, imageOpacity, textOpacity } = getMobileStepOpacities(
            index,
            stepCount,
            timeline,
            revealProgress,
            holdUnitsPerStep,
            crossfadeUnitsBetweenSteps,
            imageFadeInUnits,
            textFadeInUnits,
          );

          const translateY = (1 - panelOpacity) * 8;
          const scale = 0.985 + panelOpacity * 0.015;

          return (
            <YourPathStepPanel
              key={step.stepMeta}
              step={step}
              imageStyle={{ opacity: imageOpacity }}
              textStyle={{
                opacity: textOpacity,
                transform: `translate3d(0, ${(1 - textOpacity) * 12}px, 0)`,
              }}
              panelStyle={{
                opacity: panelOpacity,
                transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
                zIndex: index + 1,
                pointerEvents: panelOpacity > 0.5 ? "auto" : "none",
              }}
            />
          );
        })}
      </div>
    </PinnedSection>
  );
}

/** Desktop/tablet step carousel, dwell per step before auto-advance. */
const PATH_STEP_AUTO_ADVANCE_MS = 5200;

/** Mobile: full-width stacked steps — every step expanded with text then image. */
function YourPathStepsMobileExpanded() {
  return (
    <div aria-label="Your path steps">
      {PATH_STEPS.map((step, index) => (
        <article
          key={step.stepMeta}
          className="border-b border-arc-charcoal/10 bg-arc-cream last:border-b-0"
        >
          <div className="flex w-full flex-col px-5 py-6 sm:px-8 sm:py-7">
            <ArcTextReveal variant="heading" delayIndex={0}>
              <p className="mb-2 font-serif text-[1.75rem] leading-none text-arc-charcoal sm:text-3xl">
                {step.title}
              </p>
            </ArcTextReveal>
            <ArcTextReveal variant="body" delayIndex={1}>
              <p className="mb-4 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-arc-charcoal/52">
                {step.stepMeta}
              </p>
            </ArcTextReveal>
            <ArcTextReveal variant="body" delayIndex={2}>
              <p className="font-sans text-base leading-relaxed text-arc-charcoal/85">
                {step.description}
              </p>
            </ArcTextReveal>
          </div>

          <div className="relative aspect-[4/3] w-full bg-arc-charcoal/5 sm:aspect-[3/2]">
            <div aria-hidden className={ARC_HOME_PATH_STEP_IMAGE_TOP_FEATHER_CLASS} />
            <Image
              src={step.imageSrc}
              alt={step.imageAlt}
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority={index === 0}
            />
          </div>
        </article>
      ))}
    </div>
  );
}

function YourPathStepsInteractiveSection({
  topSeam = false,
  bottomSeam = false,
}: {
  topSeam?: boolean;
  bottomSeam?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPaused, setAutoPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const reduceMotion = useReducedMotion();
  const isMinMd = useMinMd();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? false),
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion || autoPaused || !inView || !isMinMd) return;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % PATH_STEPS.length);
    }, PATH_STEP_AUTO_ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [reduceMotion, autoPaused, inView, isMinMd, activeIndex]);

  const pauseAutoAdvance = () => setAutoPaused(true);
  const resumeAutoAdvance = () => setAutoPaused(false);

  const selectStep = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative overflow-clip bg-arc-cream md:min-h-[100dvh]",
        topSeam && ARC_HOME_PATH_STEPS_TOP_OVERLAP_CLASS,
      )}
      aria-label="Your path steps"
      onMouseEnter={pauseAutoAdvance}
      onMouseLeave={resumeAutoAdvance}
      onFocusCapture={pauseAutoAdvance}
      onTouchStart={pauseAutoAdvance}
      onTouchEnd={() => window.setTimeout(resumeAutoAdvance, 900)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          resumeAutoAdvance();
        }
      }}
    >
      {topSeam ? (
        isMinMd ? (
          <div
            aria-hidden
            className={ARC_HOME_PATH_STEPS_TOP_SEAM_DESKTOP_LEFT_CLASS}
          />
        ) : (
          <ArcSectionSeamBlend
            edge="top"
            tone="cream"
            variant="soft"
            scope="background"
            className={ARC_HOME_PATH_STEPS_TOP_SEAM_SOFT_CLASS}
          />
        )
      ) : null}

      {isMinMd ? (
      <div className="grid min-h-[100dvh] grid-cols-2">
        <div
          className="grid min-h-[100dvh] grid-rows-5 bg-arc-cream"
          role="tablist"
          aria-label="Your path steps"
        >
          {PATH_STEPS.map((step, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={step.stepMeta}
                type="button"
                id={`path-step-tab-${index}`}
                role="tab"
                aria-selected={isActive}
                aria-controls="path-step-image-panel"
                onClick={() => selectStep(index)}
                className={cn(
                  "flex min-h-0 flex-col justify-center border-b border-arc-charcoal/10 px-6 py-4 text-left transition-[background-color,opacity,box-shadow] duration-300 last:border-b-0 lg:px-8 lg:py-5 xl:px-10",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-arc-teal/45",
                  isActive
                    ? "bg-arc-cream shadow-[inset_3px_0_0_0_var(--color-arc-teal)]"
                    : "bg-arc-cream/70 opacity-[0.88] hover:bg-arc-cream/90 hover:opacity-100",
                )}
              >
                <ArcTextReveal variant="line" delayIndex={0} className="w-full">
                  <div className="flex flex-col items-start gap-1.5">
                    <p
                      className={cn(
                        "font-serif text-xl leading-none lg:text-2xl",
                        isActive ? "text-arc-charcoal" : "text-arc-charcoal/52",
                      )}
                    >
                      {step.title}
                    </p>
                    <p className="font-sans text-[9px] font-semibold uppercase tracking-[0.14em] text-arc-charcoal/48 lg:text-[10px] lg:tracking-[0.16em]">
                      {step.stepMeta}
                    </p>
                  </div>
                </ArcTextReveal>
                <ArcTextReveal variant="body" delayIndex={1} className="w-full">
                  <p
                    className={cn(
                      "mt-2 font-sans leading-relaxed",
                      isActive
                        ? "text-sm text-arc-charcoal/85 lg:text-[0.9375rem] lg:leading-relaxed"
                        : "line-clamp-2 text-xs text-arc-charcoal/42 lg:text-sm",
                    )}
                  >
                    {step.description}
                  </p>
                </ArcTextReveal>
              </button>
            );
          })}
        </div>

        <div
          id="path-step-image-panel"
          role="tabpanel"
          aria-labelledby={`path-step-tab-${activeIndex}`}
          className="relative min-h-[100dvh]"
        >
          <div
            aria-hidden
            className={ARC_HOME_PATH_STEP_IMAGE_LEFT_FEATHER_CLASS}
          />
          <div
            aria-hidden
            className={ARC_HOME_PATH_STEP_IMAGE_TOP_FEATHER_DESKTOP_CLASS}
          />
          {PATH_STEPS.map((step, index) => (
            <div
              key={step.stepMeta}
              className={cn(
                "absolute inset-0",
                reduceMotion
                  ? index === activeIndex
                    ? "opacity-100"
                    : "opacity-0"
                  : "transition-opacity duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                index === activeIndex ? "opacity-100" : "opacity-0",
              )}
              aria-hidden={index !== activeIndex}
            >
              <Image
                src={step.imageSrc}
                alt={step.imageAlt}
                fill
                className="object-cover object-center"
                sizes="50vw"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
      ) : (
        <YourPathStepsMobileExpanded />
      )}
      {bottomSeam ? (
        <ArcSectionSeamBlend
          edge="bottom"
          tone="cream"
          variant="soft"
          scope="background"
          className={ARC_HOME_PATH_STEPS_BOTTOM_SEAM_SOFT_CLASS}
        />
      ) : null}
    </section>
  );
}

/**
 * Legacy variant kept for reference only.
 * Not used by `YourPathSection`; current production variant is `YourPathStepsCrossfadeSection`.
 */
export function YourPathStepsLegacyCrossfadeSection() {
  const { p, setPinProgress } = usePathPinScrubProgress();
  const stepCount = PATH_STEPS.length;
  const scaled = p * Math.max(1, stepCount - 1);

  return (
    <PinnedSection
      pinDistanceMultiplier={1.8}
      onProgress={setPinProgress}
      className="relative min-h-[100dvh] overflow-clip bg-arc-cream"
    >
      <div className="relative min-h-[100dvh]">
        {PATH_STEPS.map((step, index) => {
          const blend = Math.max(0, 1 - Math.abs(scaled - index));

          return (
            <YourPathStepPanel
              key={`legacy-${step.stepMeta}`}
              step={step}
              imageStyle={{ opacity: blend }}
              textStyle={{
                opacity: blend,
                transform: `translate3d(0, ${(1 - blend) * 12}px, 0)`,
              }}
              panelStyle={{
                opacity: blend,
                transform: `translate3d(0, ${(1 - blend) * 8}px, 0) scale(${0.985 + blend * 0.015})`,
                zIndex: index + 1,
                pointerEvents: blend > 0.5 ? "auto" : "none",
              }}
            />
          );
        })}
      </div>
    </PinnedSection>
  );
}

export function YourPathSection({
  intro,
  topSeam = false,
  stepsSeam = false,
  bottomSeam = false,
}: {
  intro?: { lead: string; ctaHref: string; ctaLabel: string };
  topSeam?: boolean;
  /** Soft handoff between path intro marble and step carousel. */
  stepsSeam?: boolean;
  /** Soft cream exit into testimonials. */
  bottomSeam?: boolean;
}) {
  const pathIntro = intro ?? {
    lead: "Your story starts here.",
    ctaHref: siteMeta.bookingUrl,
    ctaLabel: "Let's begin",
  };

  return (
    <>
      <YourPathIntroSection
        lead={pathIntro.lead}
        ctaHref={pathIntro.ctaHref}
        ctaLabel={pathIntro.ctaLabel}
        topSeam={topSeam}
        bottomSeam={stepsSeam}
      />
      <YourPathStepsInteractiveSection topSeam={stepsSeam} bottomSeam={bottomSeam} />
    </>
  );
}
