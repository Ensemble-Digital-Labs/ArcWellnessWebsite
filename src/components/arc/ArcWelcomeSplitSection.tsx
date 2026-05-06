"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArcTibbixelCopyFrame } from "@/components/arc/ArcTibbixelCopyFrame";
import { ArcTextUnderlineCta } from "@/components/arc/ArcTextUnderlineCta";
import { PinnedSection } from "@/components/arc/PinnedSection";
import { TitleEmphasis } from "@/components/arc/TitleEmphasis";
import {
  getWelcomeGallerySlots,
  WELCOME_GALLERY_FOCAL_INDEX,
} from "@/content/welcomeGallery";
import { ARC_PINNED_CLEAR_BELOW_LOGO } from "@/lib/arc-layout";
import { IMMERSIVE_COLLAGE_FRAME_CLASSES } from "@/lib/immersiveCollageFrames";
import { ARC_LOCOMOTIVE_READY_EVENT } from "@/lib/locomotive";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * Gallery motion completes in the first ~half of progress; remaining scroll is stable, readable copy.
 */
const GALLERY_PROGRESS_END = 0.52;

/**
 * Share of section scroll (0–1) where the sticky collage stays static — parallax / zoom scrub starts after.
 * (Feels like a short “lock” on the opening frame before motion kicks in.)
 */
const WELCOME_PARALLAX_HOLD = 0.14;

/** Copy block fade (Framer) — keep in sync with `copyStageBgOpacity` below. */
const COPY_FADE_IN_START = 0.34;
const COPY_FADE_IN_END = 0.56;

/** Full-bleed art behind the about copy phase (after collage fades). */
/** Full-bleed art behind welcome / about copy phase (collage handoff). */
const WELCOME_COPY_STAGE_BG =
  "/assets/decoration/background/welcome-copy-stage-cream.png";

/** Same right-anchored crop as phones for every width below 1440px; center only on wide desktops. */
const COPY_STAGE_BG_OBJECT =
  "object-cover object-right min-[1440px]:object-center";

/** Background art ramps in slightly earlier so it reads during the collage → copy handoff. */
function copyStageBgOpacity(sectionProgress: number): number {
  const start = 0.28;
  const end = GALLERY_PROGRESS_END;
  if (sectionProgress <= start) return 0;
  if (sectionProgress >= end) return 1;
  return (sectionProgress - start) / (end - start);
}

function defaultGallerySrcs(): string[] {
  return getWelcomeGallerySlots();
}

type ArcWelcomeSplitSectionProps = {
  id?: string;
  className?: string;
  /** Primary image for reduced-motion split layout. */
  imageSrc: string;
  /**
   * Optional — defaults to **`getWelcomeGallerySlots()`** (focal at index
   * **`WELCOME_GALLERY_FOCAL_INDEX`**, see `welcomeGallery.ts`). Pass 7 paths for a fixed order.
   */
  galleryImageSrcs?: readonly string[];
  headline: string;
  headlineEmphasisWord: string;
  paragraph1: string;
  paragraph2: string;
  proofLead: string;
  proofRest: string;
  ctaHref: string;
  ctaLabel: string;
};

function splitHeadline(headline: string, headlineEmphasisWord: string) {
  const emphasisIdx = headline.indexOf(headlineEmphasisWord);
  const hasEmphasis =
    headlineEmphasisWord.length > 0 && emphasisIdx !== -1;
  const before = hasEmphasis
    ? headline.slice(0, emphasisIdx).trimEnd()
    : headline.trimEnd();
  const after = hasEmphasis
    ? headline.slice(emphasisIdx + headlineEmphasisWord.length).trimStart()
    : "";
  return { hasEmphasis, before, after };
}

export function ArcWelcomeSplitSection({
  id,
  className,
  imageSrc,
  galleryImageSrcs,
  headline,
  headlineEmphasisWord,
  paragraph1,
  paragraph2,
  proofLead,
  proofRest,
  ctaHref,
  ctaLabel,
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
      <PinnedSection
        id={id}
        className={cn(
          ARC_PINNED_CLEAR_BELOW_LOGO,
          "relative box-border flex h-[100dvh] max-h-[100dvh] min-h-0 flex-col overflow-hidden bg-arc-cream px-5 pb-5 scroll-mt-28 sm:px-7 md:px-10 lg:px-12",
          className,
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          <Image
            src={WELCOME_COPY_STAGE_BG}
            alt=""
            fill
            className={COPY_STAGE_BG_OBJECT}
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-arc-cream/30" />
        </div>
        <div className="relative z-10 flex min-h-0 w-full flex-1 flex-col">
          <WelcomeSplitStaticBody
            imageSrc={imageSrc}
            split={split}
            headline={headline}
            headlineEmphasisWord={headlineEmphasisWord}
            paragraph1={paragraph1}
            paragraph2={paragraph2}
            proofLead={proofLead}
            proofRest={proofRest}
            ctaHref={ctaHref}
            ctaLabel={ctaLabel}
          />
        </div>
      </PinnedSection>
    );
  }

  return (
    <WelcomeImmersiveScrollBody
      id={id}
      className={className}
      gallerySrcs={
        galleryImageSrcs?.length
          ? [...galleryImageSrcs]
          : defaultGallerySrcs()
      }
      split={split}
      headline={headline}
      headlineEmphasisWord={headlineEmphasisWord}
      paragraph1={paragraph1}
      paragraph2={paragraph2}
      proofLead={proofLead}
      proofRest={proofRest}
      ctaHref={ctaHref}
      ctaLabel={ctaLabel}
    />
  );
}

type SplitHeadline = ReturnType<typeof splitHeadline>;

function WelcomeSplitStaticBody({
  imageSrc,
  split,
  headline,
  headlineEmphasisWord,
  paragraph1,
  paragraph2,
  proofLead,
  proofRest,
  ctaHref,
  ctaLabel,
}: {
  imageSrc: string;
  split: SplitHeadline;
  headline: string;
  headlineEmphasisWord: string;
  paragraph1: string;
  paragraph2: string;
  proofLead: string;
  proofRest: string;
  ctaHref: string;
  ctaLabel: string;
}) {
  const { hasEmphasis, before, after } = split;

  return (
    <div
      className={cn(
        "mx-auto grid min-h-0 w-full max-w-6xl flex-1 grid-cols-1 content-start gap-5",
        "sm:gap-6",
        "md:grid-cols-12 md:items-start md:gap-x-10 md:gap-y-0 lg:max-w-7xl lg:gap-x-14",
      )}
    >
      <div
        data-scroll-section
        className={cn(
          "relative w-full shrink-0 overflow-hidden rounded-sm bg-arc-cream-deep/15",
          "h-[min(28vh,240px)] min-h-[150px] max-h-[280px] sm:h-[min(30vh,260px)] sm:max-h-[300px]",
          "md:col-span-5 md:h-[min(68dvh,600px)] md:min-h-[260px] md:max-h-none lg:col-span-5",
        )}
      >
        <Image
          src={imageSrc}
          alt="Consultation at ARC Wellness"
          fill
          className="object-cover"
          sizes="(min-width: 768px) 38vw, 100vw"
          priority={false}
        />
      </div>

      <div
        data-scroll-section
        className={cn(
          "flex min-h-0 flex-col justify-start md:col-span-7 lg:col-span-7",
          "pt-0.5 md:pt-1 md:pb-2 md:pl-2 lg:pl-4",
        )}
      >
        <ArcTibbixelCopyFrame
          className="w-full"
          innerClassName="items-start text-left"
          ornamentClassName="w-[min(92vw,52rem)]"
        >
          <h2 className="mb-3 max-w-[22ch] font-serif text-[1.65rem] font-bold leading-[1.12] tracking-tight text-arc-charcoal sm:text-3xl md:mb-4 md:max-w-none md:text-[2rem] md:leading-[1.1] lg:text-[2.35rem]">
            {hasEmphasis ? (
              <>
                {before}
                {before ? " " : null}
                <TitleEmphasis className="text-[1.52em] leading-[1.04] sm:text-[1.6em] md:text-[1.72em] lg:text-[1.82em] text-arc-teal-ink [text-shadow:0_1px_2px_rgba(255,255,255,0.5),0.015em_0_0_color-mix(in_srgb,currentColor_30%,transparent),-0.015em_0_0_color-mix(in_srgb,currentColor_30%,transparent)]">
                  {headlineEmphasisWord}
                </TitleEmphasis>
                {after ? <> {after}</> : null}
              </>
            ) : (
              headline
            )}
          </h2>

          <div className="max-w-xl space-y-2.5 font-sans text-[13px] leading-[1.55] text-arc-charcoal/88 sm:space-y-3 sm:text-[0.92rem] md:max-w-2xl md:text-[0.95rem] md:leading-relaxed lg:max-w-[44rem] lg:text-base">
            <p>{paragraph1}</p>
            <p>{paragraph2}</p>
            <p className="text-arc-charcoal">
              <strong className="font-semibold text-arc-charcoal">{proofLead}</strong>{" "}
              {proofRest}
            </p>
          </div>

          <ArcTextUnderlineCta
            href={ctaHref}
            className="mt-5 w-fit items-start sm:mt-6 md:mt-7"
          >
            {ctaLabel}
          </ArcTextUnderlineCta>
        </ArcTibbixelCopyFrame>
      </div>
    </div>
  );
}

function WelcomeImmersiveScrollBody({
  id,
  className,
  gallerySrcs,
  split,
  headline,
  headlineEmphasisWord,
  paragraph1,
  paragraph2,
  proofLead,
  proofRest,
  ctaHref,
  ctaLabel,
}: {
  id?: string;
  className?: string;
  gallerySrcs: string[];
  split: SplitHeadline;
  headline: string;
  headlineEmphasisWord: string;
  paragraph1: string;
  paragraph2: string;
  proofLead: string;
  proofRest: string;
  ctaHref: string;
  ctaLabel: string;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const copyStageBgRef = useRef<HTMLDivElement | null>(null);
  const progress = useMotionValue(0);

  /** Center / focal tile — reference layout slot + **`WELCOME_GALLERY_FOCAL_SRC`** (strong zoom). */
  const focalIndex = WELCOME_GALLERY_FOCAL_INDEX;

  /** Parallax scrub only — frozen while raw scroll progress < `WELCOME_PARALLAX_HOLD`. */
  const parallaxProgress = useTransform(
    progress,
    [0, WELCOME_PARALLAX_HOLD, 1],
    [0, 0, 1],
  );

  const scaleFocal = useTransform(
    parallaxProgress,
    [0, GALLERY_PROGRESS_END, 1],
    [1, 4.25, 4.25],
  );
  const scalePeripheral = useTransform(
    parallaxProgress,
    [0, GALLERY_PROGRESS_END, 1],
    [1, 1.08, 1.08],
  );

  const opacityImage = useTransform(
    parallaxProgress,
    [0, GALLERY_PROGRESS_END, 1],
    [1, 0, 0],
  );

  const opacityCopy = useTransform(
    progress,
    [COPY_FADE_IN_START, COPY_FADE_IN_END, 1],
    [0, 1, 1],
  );
  const copyScale = useTransform(
    progress,
    [COPY_FADE_IN_START, COPY_FADE_IN_END, 1],
    [0.94, 1, 1],
  );

  const { hasEmphasis, before, after } = split;

  const pictures = Array.from({ length: 7 }, (_, index) => ({
    src: gallerySrcs[index % gallerySrcs.length] ?? gallerySrcs[0],
    scale: index === focalIndex ? scaleFocal : scalePeripheral,
    frameClass: IMMERSIVE_COLLAGE_FRAME_CLASSES[index]!,
    isFocal: index === focalIndex,
  }));

  useEffect(() => {
    let revert: (() => void) | null = null;
    let cancelled = false;

    const setup = () => {
      if (cancelled) return;
      const section = sectionRef.current;
      const main = document.querySelector<HTMLElement>("#main");
      if (!section || !main) return;

      const ctx = gsap.context(() => {
        const syncCopyStageBg = (sectionProgress: number) => {
          const el = copyStageBgRef.current;
          if (!el) return;
          el.style.opacity = String(copyStageBgOpacity(sectionProgress));
        };

        const st = ScrollTrigger.create({
          trigger: section,
          scroller: main,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.65,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            progress.set(p);
            syncCopyStageBg(p);
          },
        });

        syncCopyStageBg(st.progress);
      }, section);

      revert = () => ctx.revert();

      const syncBgFromTrigger = () => {
        const stNow = ScrollTrigger.getAll().find((t) => t.trigger === section);
        const el = copyStageBgRef.current;
        if (!stNow || !el) return;
        el.style.opacity = String(copyStageBgOpacity(stNow.progress));
      };

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        syncBgFromTrigger();
      });
      window.setTimeout(() => {
        ScrollTrigger.refresh();
        syncBgFromTrigger();
      }, 120);
    };

    const onReady = () => queueMicrotask(setup);
    window.addEventListener(ARC_LOCOMOTIVE_READY_EVENT, onReady as EventListener);
    if ((window as unknown as { locomotiveScroll?: unknown }).locomotiveScroll) {
      onReady();
    }
    const fallback = window.setTimeout(() => {
      if (!cancelled && revert === null) setup();
    }, 1800);

    return () => {
      cancelled = true;
      window.removeEventListener(ARC_LOCOMOTIVE_READY_EVENT, onReady as EventListener);
      window.clearTimeout(fallback);
      revert?.();
    };
  }, [progress]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        "relative h-[230vh] scroll-mt-28 bg-arc-cream pt-0",
        className,
      )}
    >
      {/* Full-bleed sticky stage — collage uses full viewport (runs under fixed logo); copy carries logo clearance */}
      <div className="sticky top-0 flex h-[100dvh] max-h-[100dvh] min-h-0 w-full flex-col overflow-hidden bg-arc-cream">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-2 z-0 overflow-hidden sm:top-2.5 md:top-3">
          <div className="absolute inset-0 flex items-center justify-center origin-center scale-[1.12] sm:scale-[1.22] md:scale-[1.3]">
            {pictures.map(({ src, scale, frameClass, isFocal }, index) => (
              <motion.div
                key={`${src}-${index}`}
                style={{ scale, opacity: opacityImage }}
                className={cn(
                  "absolute inset-0 flex items-center justify-center",
                  isFocal ? "z-10" : "z-[1]",
                )}
              >
                <div className={cn("relative overflow-hidden rounded-sm bg-arc-cream-deep/10", frameClass)}>
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 45vw, 30vw"
                    priority={isFocal}
                  />
                  {isFocal ? (
                    <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center bg-gradient-to-t from-black/50 via-black/20 to-black/25 px-3 sm:px-5">
                      <p className="max-w-[min(92vw,20rem)] text-balance text-center font-serif text-3xl font-bold leading-[1.08] tracking-tight drop-shadow-[0_2px_24px_rgba(0,0,0,0.7)] sm:max-w-[24rem] sm:text-4xl md:max-w-[28rem] md:text-5xl md:leading-[1.06] lg:max-w-[32rem] lg:text-[3.25rem] xl:text-[3.5rem]">
                        <span className="text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.72),0_0_28px_rgba(0,0,0,0.4)]">
                          Wellness.
                        </span>{" "}
                        <TitleEmphasis className="text-[1.2em] leading-[1.04] text-arc-teal sm:text-[1.24em] md:text-[1.28em] lg:text-[1.32em] [text-shadow:0_2px_22px_rgba(0,0,0,0.55),0_0_40px_rgba(78,196,176,0.42),0.02em_0_0_color-mix(in_srgb,currentColor_35%,transparent),-0.02em_0_0_color-mix(in_srgb,currentColor_35%,transparent)]">
                          Made personal
                        </TitleEmphasis>
                        <span className="font-serif text-arc-teal [text-shadow:0_2px_16px_rgba(0,0,0,0.55),0_0_28px_rgba(78,196,176,0.4)]">
                          .
                        </span>
                      </p>
                    </div>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div
          ref={copyStageBgRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[15] overflow-hidden opacity-0"
        >
          {/* Plain img: avoids Next/Image + motion stacking quirks; opacity driven by GSAP (see ScrollTrigger). */}
          <img
            alt=""
            src={WELCOME_COPY_STAGE_BG}
            className={cn(
              "absolute inset-0 h-full w-full",
              COPY_STAGE_BG_OBJECT,
            )}
            width={1920}
            height={1080}
            decoding="async"
            fetchPriority="high"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/[0.12]" />
        </div>

        <motion.div
          style={{ opacity: opacityCopy, scale: copyScale }}
          className={cn(
            ARC_PINNED_CLEAR_BELOW_LOGO,
            "relative z-20 mx-auto flex h-full w-full max-w-3xl flex-1 flex-col items-center justify-center px-5 pb-8 sm:px-7 md:max-w-4xl md:px-10 lg:px-12",
          )}
        >
          <ArcTibbixelCopyFrame
            className="pointer-events-auto max-w-2xl text-center md:max-w-4xl lg:max-w-5xl"
            ornamentClassName="w-[min(98vw,68rem)]"
          >
            <h2 className="mb-4 font-serif text-[1.65rem] font-bold leading-[1.12] tracking-tight sm:mb-5 sm:text-3xl md:text-[2rem] md:leading-[1.1] lg:text-[2.35rem]">
              {hasEmphasis ? (
                <>
                  <span className="text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.75),0_0_32px_rgba(0,0,0,0.35)]">
                    {before}
                  </span>
                  {before ? " " : null}
                  <TitleEmphasis className="text-[1.52em] leading-[1.04] sm:text-[1.6em] md:text-[1.72em] lg:text-[1.82em] text-arc-teal [text-shadow:0_2px_22px_rgba(0,0,0,0.55),0_0_40px_rgba(78,196,176,0.45),0.02em_0_0_color-mix(in_srgb,currentColor_35%,transparent),-0.02em_0_0_color-mix(in_srgb,currentColor_35%,transparent)]">
                    {headlineEmphasisWord}
                  </TitleEmphasis>
                  {after ? (
                    after.trim() === "." ? (
                      <span className="font-serif text-arc-teal [text-shadow:0_2px_16px_rgba(0,0,0,0.55),0_0_28px_rgba(78,196,176,0.4)]">
                        .
                      </span>
                    ) : (
                      <> {after}</>
                    )
                  ) : (
                    <span className="font-serif text-arc-teal [text-shadow:0_2px_16px_rgba(0,0,0,0.55),0_0_28px_rgba(78,196,176,0.4)]">
                      .
                    </span>
                  )}
                </>
              ) : (
                <span className="text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.75)]">{headline}</span>
              )}
            </h2>

            <div className="space-y-3 font-sans text-[13px] leading-relaxed text-[#f7f4ef]/90 sm:text-[0.92rem] md:text-[0.95rem] md:leading-relaxed lg:max-w-[54rem] lg:text-base">
              <p>{paragraph1}</p>
              <p>{paragraph2}</p>
              <p className="text-[#f7f4ef]/95">
                <strong className="font-semibold text-white">{proofLead}</strong>{" "}
                {proofRest}
              </p>
            </div>

            <ArcTextUnderlineCta
              href={ctaHref}
              accent="tealBright"
              className="mt-6 items-center sm:mt-8"
            >
              {ctaLabel}
            </ArcTextUnderlineCta>
          </ArcTibbixelCopyFrame>
        </motion.div>
      </div>
    </section>
  );
}
