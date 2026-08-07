"use client";

import { ScrollChapterIntroSection } from "@/components/arc/ScrollChapterIntroSection";
import type { ArcChapterHeroCanvasTile } from "@/components/arc/ArcChapterHeroImageCanvas";
import { splitCenterHeroTiles } from "@/content/heroCanvasSplit";
import { ABOUT_HERO_COPY_AMBIENT_IMAGES } from "@/content/backgroundDecoration";

type ArcMarketingChapterHeroProps = {
  id: string;
  headline: string;
  headlineEmphasis: string;
  /** Optional floating window tiles. Omit for a plate-only chapter hero (e.g. Contact). */
  heroCanvasTiles?: readonly ArcChapterHeroCanvasTile[];
  /** Soft cream feather into the next section (background layer). */
  bottomSeam?: boolean;
};

/** Ambient full-bleed chapter hero — headline + optional canvas (one viewport, like About / Treatments). */
export function ArcMarketingChapterHero({
  id,
  headline,
  headlineEmphasis,
  heroCanvasTiles,
  bottomSeam = false,
}: ArcMarketingChapterHeroProps) {
  return (
    <ScrollChapterIntroSection
      id={id}
      layout="ambient-full"
      heroAlign="center"
      motion="enter-once"
      headline={headline}
      headlineEmphasis={headlineEmphasis}
      body=""
      introMode="visible-on-load"
      copyColumnAmbients={ABOUT_HERO_COPY_AMBIENT_IMAGES}
      heroCanvasTiles={
        heroCanvasTiles?.length
          ? splitCenterHeroTiles(heroCanvasTiles)
          : undefined
      }
      bottomSeam={bottomSeam}
      priorityBackground
    />
  );
}
