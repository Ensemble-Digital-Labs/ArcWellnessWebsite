"use client";

import type { RefObject } from "react";
import { ArcTextReveal } from "@/components/arc/ArcTextReveal";
import { TitleEmphasis } from "@/components/arc/TitleEmphasis";
import { cn } from "@/lib/utils";

export const ARC_LIBRARY_MASTHEAD_CLASS = cn(
  "inline-block font-title-emphasis font-normal not-italic leading-[0.9] tracking-tight text-black",
  "text-[clamp(5.5rem,22vw,7.5rem)] md:text-[clamp(6.5rem,13vw,10.5rem)] lg:text-[clamp(7.75rem,11vw,11.5rem)]",
  "[text-shadow:0_1px_2px_rgba(255,255,255,0.5)]",
);

export type ArcLibraryMastheadCopy = {
  before?: string;
  emphasis: string;
  /** When true, `emphasis` stays on one line (e.g. “Arc Desk”). */
  emphasisNowrap?: boolean;
};

export function ArcLibraryMasthead({
  copy,
  titleRef,
  titleId = "library-masthead-title",
}: {
  copy: ArcLibraryMastheadCopy;
  titleRef?: RefObject<HTMLHeadingElement | null>;
  titleId?: string;
}) {
  const { before, emphasis, emphasisNowrap = false } = copy;

  return (
    <header className="pb-10 text-center sm:pb-12 md:pb-14">
      <ArcTextReveal variant="heading" trigger="mount" when>
        <h1 ref={titleRef} id={titleId} className="leading-[0.9] tracking-tight">
          <TitleEmphasis className={ARC_LIBRARY_MASTHEAD_CLASS}>
            {before ? <span>{before}</span> : null}
            {emphasisNowrap ? (
              <span className="whitespace-nowrap">{emphasis}</span>
            ) : (
              emphasis
            )}
          </TitleEmphasis>
        </h1>
      </ArcTextReveal>
      <div
        className="mx-auto mt-5 h-[2.75rem] max-w-2xl sm:h-[3.25rem] md:mt-6"
        aria-hidden
      />
    </header>
  );
}
