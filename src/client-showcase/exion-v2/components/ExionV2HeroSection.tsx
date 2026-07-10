"use client";

import Image from "next/image";
import { Dna } from "lucide-react";
import { cn } from "@/lib/utils";
import { exionV2Assets } from "@/client-showcase/exion-v2/exion-v2-assets";
import { exionV2Content as c } from "@/client-showcase/exion-v2/exion-v2-content";
import { EXION_V2_MOCK } from "@/client-showcase/exion-v2/exion-v2-tokens";
import { exionV2ImageSrc } from "@/client-showcase/exion-v2/exion-v2-assets";
import { exionV2SectionId } from "@/client-showcase/exion-v2/exion-v2-sections";
import { exionV2Type } from "@/client-showcase/exion-v2/exion-v2-typography";
import { ExionHeroDiamondDivider } from "@/client-showcase/exion-v2/components/ExionHeroDiamondDivider";
import { ExionIcon } from "@/client-showcase/exion-v2/components/ExionIcon";

/** §1 Hero — full composite background + left copy (EXION v2 mock). */
export function ExionV2HeroSection() {
  const backgroundSrc = exionV2ImageSrc(c.hero.background);

  return (
    <section
      id={exionV2SectionId("hero")}
      aria-labelledby={`${exionV2SectionId("hero")}-heading`}
      className="relative overflow-hidden pb-[clamp(4.5rem,10vw,7rem)] pt-12 sm:pt-14 lg:min-h-[min(100dvh,920px)] lg:pt-16"
      style={{ backgroundColor: EXION_V2_MOCK.cream }}
    >
      <Image
        src={backgroundSrc}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[72%_42%] sm:object-[76%_40%] lg:object-[right_center]"
      />

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-arc-cream from-0% via-arc-cream/94 via-[38%] to-transparent to-[52%] sm:via-[40%] sm:to-[55%] lg:via-[34%] lg:to-[48%]"
        aria-hidden
      />

      <div className="relative z-[2] mx-auto grid max-w-[1440px] gap-8 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.52fr)_minmax(0,0.48fr)] lg:items-center lg:gap-4 lg:px-10 xl:gap-8 xl:px-12">
        <div className="max-w-[38rem] lg:max-w-[36rem] lg:py-6">
          <h1 id={`${exionV2SectionId("hero")}-heading`} className="font-serif">
            <span className={exionV2Type.heroTitleLead}>{c.hero.titleLead}</span>
            <span className={exionV2Type.heroTitleEmphasis}>{c.hero.titleEmphasis}</span>
          </h1>

          <p className={cn("mt-5", exionV2Type.heroEyebrow)}>{c.hero.eyebrow}</p>

          <ExionHeroDiamondDivider className="mt-4" />

          <p className={cn("mt-4", exionV2Type.heroBody)}>{c.hero.body}</p>

          <ul className="mt-10 grid grid-cols-2 gap-y-8 sm:mt-11 sm:grid-cols-4 sm:gap-y-0">
            {c.hero.pillars.map((pillar, index) => (
              <li
                key={pillar.label}
                className="relative flex flex-col items-center px-2 text-center sm:px-3 lg:px-4"
              >
                {index > 0 ? (
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute top-[6%] left-0 h-[88%] w-[2px] -translate-x-1/2 bg-[#9A7B52]/38",
                      index % 2 === 0 && "max-sm:hidden",
                    )}
                  />
                ) : null}
                <ExionIcon
                  name={pillar.icon}
                  src={exionV2Assets.icons[pillar.icon]}
                  label={pillar.label}
                  variant="plain"
                />
                <p className={cn("mt-3.5", exionV2Type.heroPillarTitle)}>{pillar.label}</p>
                <p className={exionV2Type.heroPillarBody}>
                  {pillar.descriptionLines.map((line, lineIndex) => (
                    <span key={line}>
                      {lineIndex > 0 ? <br /> : null}
                      {line}
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ul>

          <div
            className={cn(
              "mt-9 flex w-full max-w-[min(100%,38rem)] items-center justify-center overflow-hidden rounded-sm sm:mt-10",
              "border border-[#9A7B52]/32 bg-[color-mix(in_srgb,var(--arc-cream)_54%,white)]/92",
              "px-4 py-3.5 shadow-[0_6px_20px_rgba(140,125,106,0.07)] sm:px-5 sm:py-4",
            )}
          >
            <p className={exionV2Type.heroMarquee}>{c.hero.marquee}</p>
          </div>
        </div>

        {/* DNA callout — compact stacked card (mock) */}
        <div className="relative min-h-[12rem] lg:min-h-[min(72dvh,640px)]">
          <div
            className={cn(
              "absolute bottom-[8%] left-1/2 z-[3] max-w-[min(100%,13.5rem)] -translate-x-1/2 sm:bottom-[12%] sm:left-[8%] sm:max-w-[14.5rem] sm:translate-x-0 lg:bottom-[20%] lg:left-[4%]",
              "rounded-xl border border-white/65 bg-[color-mix(in_srgb,var(--arc-cream)_42%,white)]/72 px-3.5 py-3",
              "shadow-[0_10px_28px_rgba(44,44,44,0.1)] backdrop-blur-md sm:px-4 sm:py-3.5",
            )}
          >
            <div className="flex items-start gap-3">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[#7D7264] bg-transparent">
                <Dna className="size-6 text-[#7D7264]" strokeWidth={1.2} aria-hidden />
              </span>
              <div className="min-w-0 pt-0.5">
                {c.hero.callout.eyebrowLines.map((line) => (
                  <p key={line} className={exionV2Type.heroCalloutEyebrow}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-2.5 space-y-0">
              {c.hero.callout.titleLines.map((line) => (
                <p key={line} className={exionV2Type.heroCalloutTitle}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
