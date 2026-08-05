"use client";

import Image from "next/image";
import { motion, useMotionValue, useMotionValueEvent, useTransform, type MotionStyle } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArcMarbleAmbientPlate } from "@/components/arc/ArcMarbleAmbientPlate";
import { ArcTibbixelCopyFrame } from "@/components/arc/ArcTibbixelCopyFrame";
import { ArcSectionSeamBlend } from "@/components/arc/ArcSectionSeamBlend";
import { ArcTextReveal } from "@/components/arc/ArcTextReveal";
import { TitleEmphasis } from "@/components/arc/TitleEmphasis";
import { CLINIC_SPACE_TEASER_AMBIENT_SRC } from "@/content/backgroundDecoration";
import { ARC_MARBLE_AMBIENT_WASH_CLASS, ARC_HOME_WELLNESS_TOP_SEAM_SOFT_CLASS, ARC_PINNED_CLEAR_BELOW_LOGO } from "@/lib/arc-layout";
import { whenArcLocomotiveReady } from "@/lib/locomotive";
import { arcScrollTriggerScrollerProps } from "@/lib/arcScrollMode";
import { arcScrollScrubLag } from "@/lib/arcTouchDevice";
import { useMinMd } from "@/lib/useMinMd";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const WELCOME_SCROLL_TRACK_CLASS =
  "relative scroll-mt-28 overflow-anchor-none bg-arc-cream pt-0 max-md:h-[150svh] md:h-[180vh]";

/** Phase 1 hold — title readable on photo before drift begins. */
const WELCOME_PARALLAX_HOLD = 0.12;

/** Layered Y-parallax + gentle zoom complete by here (phase 2). */
const PARALLAX_DRIFT_END = 0.45;
const BACKDROP_ZOOM_END = PARALLAX_DRIFT_END;

const COPY_FADE_IN_START = 0.38;
const COPY_FADE_IN_END = 0.58;

const WELCOME_COPY_HEADLINE_SERIF_CLASS = "text-arc-charcoal";
const WELCOME_COPY_HEADLINE_EMPHASIS_CLASS =
  "whitespace-nowrap text-[1.82em] leading-[1.02] text-arc-teal-ink sm:text-[1.6em] md:text-[1.72em] lg:text-[1.82em] [text-shadow:0_1px_2px_rgba(255,255,255,0.5),0.015em_0_0_color-mix(in_srgb,currentColor_30%,transparent),-0.015em_0_0_color-mix(in_srgb,currentColor_30%,transparent)]";
const WELCOME_COPY_BODY_CLASS =
  "space-y-3 font-sans text-[13px] leading-relaxed text-arc-charcoal/88 sm:text-[0.92rem] md:text-[0.95rem] md:leading-relaxed lg:max-w-[54rem] lg:text-base";

/** Light cream tint on photo during phase 1 only, keeps title readable without a heavy shadow plate. */
const WELCOME_PHOTO_PHASE_WASH_CLASS =
  "pointer-events-none absolute inset-0 bg-gradient-to-b from-arc-cream/28 via-transparent to-black/20";

/** Same marble plate + cream wash as About clinic gallery (`#about-clinic`). */
function WelcomeCopyStageMarblePlate() {
  return (
    <>
      <ArcMarbleAmbientPlate src={CLINIC_SPACE_TEASER_AMBIENT_SRC} />
      <div className={ARC_MARBLE_AMBIENT_WASH_CLASS} />
    </>
  );
}

type ArcWelcomeSplitSectionProps = {
  id?: string;
  className?: string;
  /** Single full-bleed backdrop, scroll-zoom (collage removed per client review). */
  backdropSrc: string;
  headline: string;
  headlineEmphasisWord: string;
  paragraphs: readonly string[];
  /** Soft cream feather from concerns band above. */
  topSeam?: boolean;
};

function splitHeadline(headline: string, headlineEmphasisWord: string) {
  const emphasisIdx = headline.indexOf(headlineEmphasisWord);
  const hasEmphasis = headlineEmphasisWord.length > 0 && emphasisIdx !== -1;
  const before = hasEmphasis ? headline.slice(0, emphasisIdx).trimEnd() : headline.trimEnd();
  const after = hasEmphasis
    ? headline.slice(emphasisIdx + headlineEmphasisWord.length).trimStart()
    : "";
  return { hasEmphasis, before, after };
}

export function ArcWelcomeSplitSection({
  id,
  className,
  backdropSrc,
  headline,
  headlineEmphasisWord,
  paragraphs,
  topSeam = false,
}: ArcWelcomeSplitSectionProps) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const split = splitHeadline(headline, headlineEmphasisWord);

  if (reduceMotion) {
    return (
      <section
        id={id}
        className={cn(
          ARC_PINNED_CLEAR_BELOW_LOGO,
          "relative flex min-h-[100dvh] scroll-mt-28 flex-col overflow-hidden bg-arc-cream",
          className,
        )}
      >
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <WelcomeCopyStageMarblePlate />
        </div>
        <WelcomeCopyBlock
          split={split}
          headline={headline}
          headlineEmphasisWord={headlineEmphasisWord}
          paragraphs={paragraphs}
          editorialReveal
        />
      </section>
    );
  }

  return (
    <WelcomeBackdropScrollBody
      id={id}
      className={className}
      backdropSrc={backdropSrc}
      split={split}
      headline={headline}
      headlineEmphasisWord={headlineEmphasisWord}
      paragraphs={paragraphs}
      topSeam={topSeam}
    />
  );
}

type SplitHeadline = ReturnType<typeof splitHeadline>;

function WelcomeTitleOnBackdrop({
  split,
  headline,
  headlineEmphasisWord,
}: {
  split: SplitHeadline;
  headline: string;
  headlineEmphasisWord: string;
}) {
  const { hasEmphasis, before, after } = split;

  return (
    <p className="max-w-[min(96vw,24rem)] text-center font-serif text-3xl font-bold leading-[1.08] tracking-tight drop-shadow-[0_2px_24px_rgba(0,0,0,0.7)] sm:max-w-[24rem] sm:text-4xl md:max-w-[28rem] md:text-5xl md:leading-[1.06] lg:max-w-[32rem] lg:text-[3.25rem] xl:text-[3.5rem]">
      {hasEmphasis ? (
        <>
          <span className="text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.72),0_0_28px_rgba(0,0,0,0.4)]">
            {before}
          </span>
          {before ? (
            <>
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> </span>
            </>
          ) : null}
          <span className="whitespace-nowrap">
            <TitleEmphasis className="text-[1.82em] leading-[1.02] text-white sm:text-[1.48em] md:text-[1.52em] lg:text-[1.56em] [text-shadow:0_2px_20px_rgba(0,0,0,0.72),0_0_28px_rgba(0,0,0,0.4)]">
              {headlineEmphasisWord}
            </TitleEmphasis>
            {after ? (
              <span className="font-serif text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.72),0_0_28px_rgba(0,0,0,0.4)]">
                {after.startsWith(".") ? after : ` ${after}`}
              </span>
            ) : (
              <span className="font-serif text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.72),0_0_28px_rgba(0,0,0,0.4)]">
                .
              </span>
            )}
          </span>
        </>
      ) : (
        <span className="text-white">{headline}</span>
      )}
    </p>
  );
}

function WelcomeCopyBlock({
  split,
  headline,
  headlineEmphasisWord,
  paragraphs,
  style,
  editorialReveal = false,
  editorialRevealReady = true,
}: {
  split: SplitHeadline;
  headline: string;
  headlineEmphasisWord: string;
  paragraphs: readonly string[];
  style?: MotionStyle;
  editorialReveal?: boolean;
  /** Gate mount reveals until the scroll crossfade opens the copy stage (welcome scroll track). */
  editorialRevealReady?: boolean;
}) {
  const { hasEmphasis, before, after } = split;

  const headlineBlock = (
    <h2 className="mb-4 font-serif text-[1.65rem] font-bold leading-[1.12] tracking-tight sm:mb-5 sm:text-3xl md:text-[2rem] md:leading-[1.1] lg:text-[2.35rem]">
      {hasEmphasis ? (
        <>
          <span className={WELCOME_COPY_HEADLINE_SERIF_CLASS}>{before}</span>
          {before ? (
            <>
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> </span>
            </>
          ) : null}
          <span className="whitespace-nowrap">
            <TitleEmphasis className={WELCOME_COPY_HEADLINE_EMPHASIS_CLASS}>
              {headlineEmphasisWord}
            </TitleEmphasis>
            {after ? (
              after.trim() === "." ? (
                <span className={cn("font-serif", WELCOME_COPY_HEADLINE_SERIF_CLASS)}>.</span>
              ) : (
                <> {after}</>
              )
            ) : (
              <span className={cn("font-serif", WELCOME_COPY_HEADLINE_SERIF_CLASS)}>.</span>
            )}
          </span>
        </>
      ) : (
        <span className={WELCOME_COPY_HEADLINE_SERIF_CLASS}>{headline}</span>
      )}
    </h2>
  );

  return (
    <motion.div
      style={style}
      className={cn(
        ARC_PINNED_CLEAR_BELOW_LOGO,
        "relative z-20 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-5 pb-6 sm:px-7 md:max-w-4xl md:px-10 lg:px-12",
      )}
    >
      <ArcTibbixelCopyFrame
        className="pointer-events-auto max-w-2xl text-center md:max-w-4xl lg:max-w-5xl"
        ornamentClassName="w-[min(98vw,68rem)]"
      >
        {editorialReveal ? (
          <ArcTextReveal
            variant="heading"
            trigger="mount"
            when={editorialRevealReady}
          >
            {headlineBlock}
          </ArcTextReveal>
        ) : (
          headlineBlock
        )}

        <div className={WELCOME_COPY_BODY_CLASS}>
          {paragraphs.map((paragraph, index) =>
            editorialReveal ? (
              <ArcTextReveal
                key={paragraph.slice(0, 48)}
                variant="body"
                trigger="mount"
                when={editorialRevealReady}
                delayIndex={index + 1}
              >
                <p>{paragraph}</p>
              </ArcTextReveal>
            ) : (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ),
          )}
        </div>
      </ArcTibbixelCopyFrame>
    </motion.div>
  );
}

function WelcomeBackdropScrollBody({
  id,
  className,
  backdropSrc,
  split,
  headline,
  headlineEmphasisWord,
  paragraphs,
  topSeam = false,
}: {
  id?: string;
  className?: string;
  backdropSrc: string;
  split: SplitHeadline;
  headline: string;
  headlineEmphasisWord: string;
  paragraphs: readonly string[];
  topSeam?: boolean;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progress = useMotionValue(0);
  const [editorialRevealReady, setEditorialRevealReady] = useState(false);
  const isMinMd = useMinMd();
  const isCompact = !isMinMd;

  useMotionValueEvent(progress, "change", (value) => {
    if (value >= COPY_FADE_IN_END) setEditorialRevealReady(true);
  });

  useEffect(() => {
    if (progress.get() >= COPY_FADE_IN_END) setEditorialRevealReady(true);
  }, [progress]);

  const parallaxProgress = useTransform(
    progress,
    [0, WELCOME_PARALLAX_HOLD, 1],
    [0, 0, 1],
  );

  const driftAmount = (p: number) =>
    Math.min(1, Math.max(0, p / PARALLAX_DRIFT_END));

  const scaleBackdrop = useTransform(parallaxProgress, (p) => {
    const t = driftAmount(p);
    const maxScale = isCompact ? 1.06 : 1.1;
    return 1 + t * (maxScale - 1);
  });

  /** Background photo — slowest layer. */
  const photoY = useTransform(parallaxProgress, (p) => {
    const t = driftAmount(p);
    const maxVh = isCompact ? 3 : 4;
    return `${-t * maxVh}vh`;
  });

  /** Title on photo — fastest layer, lifts off the image. */
  const titleY = useTransform(parallaxProgress, (p) => {
    const t = driftAmount(p);
    const maxVh = isCompact ? 6 : 10;
    return `${-t * maxVh}vh`;
  });

  /** Marble plate rises as the photo recedes. */
  const marbleY = useTransform(progress, (p) => {
    const span = COPY_FADE_IN_END - WELCOME_PARALLAX_HOLD;
    const t = span > 0 ? Math.min(1, Math.max(0, (p - WELCOME_PARALLAX_HOLD) / span)) : 0;
    const maxVh = isCompact ? 4 : 6;
    return `${(1 - t) * maxVh}vh`;
  });

  const opacityTitleOnBackdrop = useTransform(
    progress,
    [0, COPY_FADE_IN_START, COPY_FADE_IN_END],
    [1, 0.35, 0],
  );

  const opacityCopy = useTransform(
    progress,
    [COPY_FADE_IN_START, COPY_FADE_IN_END, 1],
    [0, 1, 1],
  );
  const copyScale = useTransform(
    progress,
    [COPY_FADE_IN_START, COPY_FADE_IN_END, 1],
    [0.96, 1, 1],
  );

  /** Copy frame — subtle lag behind the marble stage. */
  const copyY = useTransform(progress, (p) => {
    const span = COPY_FADE_IN_END - COPY_FADE_IN_START;
    const t = span > 0 ? Math.min(1, Math.max(0, (p - COPY_FADE_IN_START) / span)) : 0;
    const maxVh = isCompact ? 2 : 3;
    return `${(1 - t) * maxVh}vh`;
  });

  const opacityPhoto = useTransform(
    progress,
    [COPY_FADE_IN_START, COPY_FADE_IN_END],
    [1, 0],
  );

  const opacityCopyStage = useTransform(
    progress,
    [COPY_FADE_IN_START, COPY_FADE_IN_END],
    [0, 1],
  );

  useEffect(() => {
    let revert: (() => void) | null = null;
    let cancelled = false;

    const setup = () => {
      if (cancelled) return;
      const section = sectionRef.current;
      if (!section) return;

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,
          ...arcScrollTriggerScrollerProps(),
          start: "top top",
          end: "bottom bottom",
          scrub: arcScrollScrubLag(),
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progress.set(self.progress);
          },
        });
      }, section);

      revert = () => ctx.revert();

      requestAnimationFrame(() => ScrollTrigger.refresh());
      window.setTimeout(() => ScrollTrigger.refresh(), 120);
    };

    const onReady = () => queueMicrotask(setup);
    const unregisterReady = whenArcLocomotiveReady(onReady);
    const fallback = window.setTimeout(() => {
      if (!cancelled && revert === null) setup();
    }, 1800);

    return () => {
      cancelled = true;
      unregisterReady();
      window.clearTimeout(fallback);
      revert?.();
    };
  }, [progress]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(WELCOME_SCROLL_TRACK_CLASS, "touch-pan-y", className)}
    >
      <div className="sticky top-0 flex h-[100dvh] max-h-[100dvh] min-h-0 w-full flex-col overflow-hidden bg-arc-cream">
        {topSeam ? (
          <ArcSectionSeamBlend
            edge="top"
            tone="cream"
            variant="soft"
            scope="background"
            className={ARC_HOME_WELLNESS_TOP_SEAM_SOFT_CLASS}
          />
        ) : null}
        <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
          <motion.div
            style={{ opacity: opacityCopyStage, y: marbleY }}
            className="pointer-events-none absolute inset-x-0 -top-[6vh] h-[calc(100%+12vh)] z-[1] overflow-hidden"
            aria-hidden
          >
            <WelcomeCopyStageMarblePlate />
          </motion.div>

          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <motion.div
              style={{ y: photoY, scale: scaleBackdrop, opacity: opacityPhoto }}
              className="absolute inset-x-0 -top-[6vh] h-[calc(100%+12vh)] origin-center will-change-transform"
            >
              <Image
                src={backdropSrc}
                alt=""
                fill
                className="object-cover object-center"
                sizes="100vw"
                priority
              />
              <div className={WELCOME_PHOTO_PHASE_WASH_CLASS} />
              {/* Scrim locked to the photo so it never detaches from the image on drift. */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-black/15"
                aria-hidden
              />
            </motion.div>

            <motion.div
              style={{ y: titleY, opacity: opacityTitleOnBackdrop }}
              className="absolute inset-0 z-[2] flex items-center justify-center px-3 sm:px-5"
            >
              <WelcomeTitleOnBackdrop
                split={split}
                headline={headline}
                headlineEmphasisWord={headlineEmphasisWord}
              />
            </motion.div>
          </div>

          <WelcomeCopyBlock
            split={split}
            headline={headline}
            headlineEmphasisWord={headlineEmphasisWord}
            paragraphs={paragraphs}
            editorialReveal
            editorialRevealReady={editorialRevealReady}
            style={{
              opacity: opacityCopy,
              scale: copyScale,
              y: copyY,
            }}
          />
        </div>
      </div>
    </section>
  );
}
