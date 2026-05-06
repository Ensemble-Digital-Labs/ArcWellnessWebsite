"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { BACKGROUND_DECORATION_IMAGES } from "@/content/backgroundDecoration";
import { cn } from "@/lib/utils";

/** Full-bleed mood field behind the sharp physician portrait. */
const FOUNDER_HERO_AMBIENT_SRC = BACKGROUND_DECORATION_IMAGES[1]!;

/** Opening beat: full-bleed ambient only (no portrait, no hero type, minimal grade). */
const AMBIENT_ONLY_END = 0.005;
/** Phase 2 — portrait + grade + type ramp in (longer = less rush into phase 3). */
const HERO_REVEAL_BLEND = 0.26;

/** Phase 2b — zoom / parallax completes; hero layer stays **fully opaque** until `HERO_LAYER_FADE_START`. */
const HERO_SCALE_END = 0.5;

/**
 * Phase 3 handoff — editorial layer stays at opacity 1 until here, then fades out while detail copy
 * fades in (see `FOUNDER_COPY_FADE_IN_*`). Fixes accidental dimming from progress 0 that shortened phase 2.
 */
const HERO_LAYER_FADE_START = 0.58;
const HERO_LAYER_FADE_END = 0.78;

/** Detail copy scrub — keep after hero reveal + hold; import in `ArcFounderIntroSection`. */
export const FOUNDER_COPY_FADE_IN_START = 0.62;
export const FOUNDER_COPY_FADE_IN_END = 0.86;

const textPositionClass =
  "pointer-events-none absolute inset-x-0 bottom-0 z-20 pl-14 pr-5 pb-10 pt-28 sm:pl-24 sm:pr-9 sm:pb-12 sm:pt-32 md:pl-32 md:pr-12 md:pb-16 lg:pl-44 lg:pr-16 lg:pb-[4.5rem]";

/** Ambient plate — fills the stage behind the figure. */
function AmbientField({
  motionStyle,
}: {
  motionStyle?: { scale: MotionValue<number> };
}) {
  const inner = (
    <>
      <Image
        src={FOUNDER_HERO_AMBIENT_SRC}
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
      />
      {/* Light vignette only — ambient art stays sharp. */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_45%,transparent_0%,rgba(0,0,0,0.08)_100%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-arc-cream/20 via-transparent to-arc-cream/15 mix-blend-soft-light"
        aria-hidden
      />
    </>
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {motionStyle ? (
        <motion.div
          className="absolute inset-0 origin-center"
          style={{ scale: motionStyle.scale }}
        >
          {inner}
        </motion.div>
      ) : (
        <div className="absolute inset-0 origin-center scale-[1.08]">{inner}</div>
      )}
    </div>
  );
}

const physicianFigureShellClass =
  "pointer-events-none absolute inset-0 z-[1] flex items-end justify-center sm:justify-end sm:pr-[1%] md:pr-[4%] lg:pr-[6%]";

/** Sharp physician figure — anchored right / lower-third so type stays open on the left. */
function PhysicianFigure({
  mainSrc,
  mainAlt,
  motionStyle,
  layerOpacity,
}: {
  mainSrc: string;
  mainAlt: string;
  motionStyle?: { scale: MotionValue<number> };
  layerOpacity?: MotionValue<number>;
}) {
  const figureInner = (
    <div className="relative h-full w-full">
      <Image
        src={mainSrc}
        alt={mainAlt}
        fill
        className="object-cover object-bottom object-[center_42%] sm:object-[center_38%]"
        sizes="(min-width: 1024px) 520px, 55vw"
        priority
      />
    </div>
  );

  const column = (
    <div className="relative h-[min(94%,720px)] w-[min(88vw,400px)] sm:h-full sm:max-h-none sm:w-[min(56vw,460px)] md:w-[min(50vw,500px)] lg:w-[min(46vw,540px)]">
      {motionStyle ? (
        <motion.div
          className="relative h-full w-full origin-bottom"
          style={{ scale: motionStyle.scale }}
        >
          {figureInner}
        </motion.div>
      ) : (
        figureInner
      )}
    </div>
  );

  if (layerOpacity) {
    return (
      <motion.div className={physicianFigureShellClass} style={{ opacity: layerOpacity }}>
        {column}
      </motion.div>
    );
  }

  return <div className={physicianFigureShellClass}>{column}</div>;
}

export type FounderEditorialHeroCopy = {
  meetLead: string;
  nameItalic: string;
  credential: string;
};

type FounderEditorialHeroSharedProps = FounderEditorialHeroCopy & {
  mainSrc: string;
  mainAlt: string;
  className?: string;
};

function HeroType({
  meetLead,
  nameItalic,
  credential,
}: FounderEditorialHeroCopy) {
  return (
    <>
      <p className="font-sans text-lg font-medium tracking-[0.04em] text-white sm:text-xl md:text-2xl lg:text-[1.85rem] [text-shadow:0_3px_24px_rgba(0,0,0,0.55),0_1px_3px_rgba(0,0,0,0.45)]">
        {meetLead}
      </p>
      <p className="mt-2 max-w-[95vw] font-serif text-[clamp(2.85rem,12vw,7.25rem)] font-normal italic leading-[0.98] tracking-[-0.02em] text-white sm:mt-3 sm:max-w-[22ch] [text-shadow:0_4px_36px_rgba(0,0,0,0.55),0_2px_12px_rgba(0,0,0,0.4)]">
        {nameItalic}
      </p>
      <p className="mt-5 max-w-2xl translate-x-20 font-sans text-xs font-semibold uppercase leading-snug tracking-[0.28em] text-white/92 sm:mt-6 sm:translate-x-32 sm:text-sm md:mt-7 md:translate-x-44 md:text-[0.95rem] md:tracking-[0.32em] lg:translate-x-56 xl:translate-x-72 2xl:translate-x-80 [text-shadow:0_2px_16px_rgba(0,0,0,0.5)]">
        {credential}
      </p>
    </>
  );
}

function HeroInteriorStatic(props: FounderEditorialHeroSharedProps) {
  const { mainSrc, mainAlt, className: _omit, ...copy } = props;
  return (
    <>
      <AmbientField />
      <PhysicianFigure mainSrc={mainSrc} mainAlt={mainAlt} />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/58 via-black/12 to-black/22"
        aria-hidden
      />
      <div className={textPositionClass}>
        <HeroType {...copy} />
      </div>
    </>
  );
}

function HeroInteriorMotion({
  progress,
  ...props
}: FounderEditorialHeroSharedProps & { progress: MotionValue<number> }) {
  const { mainSrc, mainAlt, className: _omit, ...copy } = props;

  const heroRevealEnd = AMBIENT_ONLY_END + HERO_REVEAL_BLEND;

  const scaleAmbient = useTransform(
    progress,
    [0, AMBIENT_ONLY_END, HERO_SCALE_END, 1],
    [1.08, 1.08, 1.14, 1.14],
  );
  const scaleFigure = useTransform(
    progress,
    [0, AMBIENT_ONLY_END, HERO_SCALE_END, 1],
    [1, 1, 1.09, 1.09],
  );
  const figureOpacity = useTransform(
    progress,
    [0, AMBIENT_ONLY_END, heroRevealEnd],
    [0, 0, 1],
  );
  const textOpacity = useTransform(
    progress,
    [0, AMBIENT_ONLY_END + 0.04, heroRevealEnd + 0.06],
    [0, 0, 1],
  );
  const gradeOpacity = useTransform(
    progress,
    [0, AMBIENT_ONLY_END, heroRevealEnd],
    [0, 0, 1],
  );
  const textY = useTransform(
    progress,
    [heroRevealEnd, HERO_SCALE_END * 0.88, 1],
    [0, 12, 12],
  );

  return (
    <>
      <AmbientField motionStyle={{ scale: scaleAmbient }} />
      <PhysicianFigure
        mainSrc={mainSrc}
        mainAlt={mainAlt}
        motionStyle={{ scale: scaleFigure }}
        layerOpacity={figureOpacity}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/58 via-black/12 to-black/22"
        style={{ opacity: gradeOpacity }}
        aria-hidden
      />
      <motion.div
        className={textPositionClass}
        style={{ y: textY, opacity: textOpacity }}
      >
        <HeroType {...copy} />
      </motion.div>
    </>
  );
}

/** Full-bleed editorial hero (no outer mat / frame). */
export function FounderEditorialHeroLayer({
  progress,
  className,
  ...rest
}: FounderEditorialHeroSharedProps & {
  progress: MotionValue<number>;
}) {
  const opacityHero = useTransform(
    progress,
    [0, HERO_LAYER_FADE_START, HERO_LAYER_FADE_END, 1],
    [1, 1, 0, 0],
  );

  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute inset-0 z-[1] min-h-0 overflow-hidden",
        className,
      )}
      style={{ opacity: opacityHero }}
    >
      <HeroInteriorMotion progress={progress} {...rest} />
    </motion.div>
  );
}

/** Static hero for reduced-motion layouts. */
export function FounderEditorialHeroStatic({
  className,
  ...rest
}: FounderEditorialHeroSharedProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        "min-h-[min(48dvh,380px)] sm:min-h-[min(52dvh,440px)]",
        className,
      )}
    >
      <HeroInteriorStatic {...rest} />
    </div>
  );
}
