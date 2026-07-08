"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useStableNativeScroll } from "@/lib/useStableNativeScroll";
import { ArcSectionSeamBlend } from "@/components/arc/ArcSectionSeamBlend";
import { TitleEmphasis } from "@/components/arc/TitleEmphasis";
import { CONCERN_PANELS, CONCERNS_SECTION_BG } from "@/content/concernsSection";
import { homeConcerns } from "@/content/homeConcerns";
import { ARC_HOME_CONCERNS_BOTTOM_SEAM_SOFT_CLASS } from "@/lib/arc-layout";

export function ArcConcernsPinnedSection({
  className,
  bottomSeam = false,
}: {
  className?: string;
  /** Soft cream exit into wellness intro below. */
  bottomSeam?: boolean;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const nativeScroll = useStableNativeScroll();

  useEffect(() => {
    ScrollTrigger.getById("arc-concerns-pin")?.kill(true);
  }, []);

  return (
    <div
      className={cn(
        "relative overflow-hidden border-t border-arc-cream/80 bg-arc-cream",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src={CONCERNS_SECTION_BG}
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-[50%_40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-arc-cream/78 via-arc-cream/52 to-arc-cream/40" />
      </div>

      <section
        ref={sectionRef}
        className={cn(
          "relative z-10 flex flex-col overflow-hidden",
          nativeScroll ? "max-md:min-h-0" : "h-[100dvh] max-h-[100dvh] min-h-0",
          "md:h-[100dvh] md:max-h-[100dvh] md:min-h-0",
        )}
      >
        <div className="relative z-10 flex min-h-0 flex-1 flex-col">
          <div className="flex min-h-0 flex-1 flex-col px-4 pb-6 pt-24 sm:px-6 sm:pb-8 sm:pt-32 md:px-10 md:pt-36 lg:pt-40 [@media(max-height:900px)]:pt-32 [@media(max-height:820px)]:pb-4 [@media(max-height:820px)]:pt-[8.75rem]">
            <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col">
              <div className="shrink-0 text-center">
                <h2 className="font-serif text-3xl font-bold leading-[1.12] tracking-tight text-arc-charcoal sm:text-4xl md:text-[2.65rem] md:leading-[1.08] [@media(max-height:820px)]:text-[1.85rem] [@media(max-height:820px)]:sm:text-[2.05rem] [@media(max-height:820px)]:md:text-[2.35rem]">
                  <span className="text-balance">
                    {homeConcerns.titleBefore}{" "}
                    <TitleEmphasis className="text-[1.52em] leading-[1.04] text-arc-teal-ink sm:text-[1.6em] md:text-[1.72em] lg:text-[1.82em] [text-shadow:0_1px_2px_rgba(255,255,255,0.45),0.015em_0_0_color-mix(in_srgb,currentColor_30%,transparent),-0.015em_0_0_color-mix(in_srgb,currentColor_30%,transparent)]">
                      {homeConcerns.titleEmphasis}
                    </TitleEmphasis>
                  </span>
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-pretty font-sans text-base leading-relaxed text-arc-charcoal/78 sm:mt-5 sm:text-lg md:mt-6 [@media(max-height:820px)]:mt-3 [@media(max-height:820px)]:text-sm [@media(max-height:820px)]:sm:text-base">
                  {homeConcerns.intro}
                </p>
              </div>

              <div
                className={cn(
                  "mt-6 grid w-full gap-x-2 gap-y-5 sm:mt-8 sm:gap-x-3 sm:gap-y-6 md:mt-10",
                  "max-md:grid-flow-col max-md:auto-cols-[min(72vw,15rem)] max-md:grid-rows-1 max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory max-md:pb-1 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden",
                  "md:min-h-0 md:flex-1 md:grid-cols-3 md:grid-rows-2 md:overflow-hidden",
                  "lg:grid-cols-6 lg:grid-rows-1 lg:gap-y-0",
                  "[@media(max-height:780px)]:mt-4 [@media(max-height:680px)]:mt-3",
                )}
              >
                {CONCERN_PANELS.map((panel) => (
                  <article
                    key={panel.title}
                    className="group flex max-md:snap-center flex-col items-center text-center md:h-full md:min-h-0"
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl sm:aspect-[5/6] md:aspect-auto md:min-h-0 md:flex-1">
                      <Image
                        src={panel.image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 72vw, 16vw"
                        className="object-cover object-center transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="mt-3 flex w-full shrink-0 flex-col items-center sm:mt-3.5 md:mt-2.5">
                      <div
                        className="h-px w-full max-w-[88%] bg-gradient-to-r from-transparent via-arc-teal/65 to-transparent"
                        aria-hidden
                      />
                      <div className="w-full border-t border-arc-charcoal/8 pt-3 sm:pt-3.5 md:pt-2.5">
                        <h3 className="text-pretty font-serif text-[0.95rem] font-semibold leading-tight tracking-tight text-arc-charcoal sm:text-base">
                          {panel.title}
                        </h3>
                        <p className="mx-auto mt-1.5 max-w-[15rem] text-pretty font-sans text-[0.72rem] leading-relaxed text-arc-charcoal/72 sm:mt-2 sm:text-[0.75rem] md:max-w-[16rem] md:text-[0.8125rem] lg:max-w-[12.5rem]">
                          {panel.tagline}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breathing room before Wellness — background plate continues through this band. */}
      <div
        aria-hidden
        className="relative z-[1] h-[min(10vh,5rem)] shrink-0 md:h-[min(12vh,6rem)]"
      />

      {bottomSeam ? (
        <ArcSectionSeamBlend
          edge="bottom"
          tone="cream"
          variant="soft"
          scope="background"
          className={ARC_HOME_CONCERNS_BOTTOM_SEAM_SOFT_CLASS}
        />
      ) : null}
    </div>
  );
}
