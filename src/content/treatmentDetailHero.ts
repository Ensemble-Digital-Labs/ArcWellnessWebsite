import type { ArcChapterHeroCanvasTile } from "@/components/arc/ArcChapterHeroImageCanvas";
import type { TreatmentPage } from "@/content/pages/treatments";

/** Single floating still for treatment detail heroes (ambient-full layout). */
export function buildTreatmentHeroCanvasTiles(
  treatment: Pick<TreatmentPage, "imageSrc" | "imageAlt">,
): readonly ArcChapterHeroCanvasTile[] {
  return [
    {
      src: treatment.imageSrc,
      alt: treatment.imageAlt,
      placement: "left-1/2 top-[52%] z-20 -translate-x-1/2 -translate-y-1/2",
      widthClass: "w-[min(62%,340px)] lg:w-[min(56%,380px)]",
      aspectClass: "aspect-[4/5]",
      rotate: 4,
      order: 0,
      enterFrom: { x: 0, y: 40, scale: 0.92, rotate: 8 },
      scrollSpread: { x: 0, y: -6, rotate: 0 },
    },
  ] as const;
}

/** Split section headings into serif line + script emphasis (last word). */
export function splitTreatmentSectionHeading(heading: string): {
  title: string;
  titleEmphasis?: string;
} {
  const words = heading.trim().split(/\s+/);
  if (words.length <= 1) {
    return { title: heading };
  }
  const titleEmphasis = words.pop()!;
  return { title: words.join(" "), titleEmphasis };
}

export function treatmentSectionParagraphs(section: TreatmentPage["sections"][number]): string[] {
  const parts: string[] = [];
  if (section.body) parts.push(section.body);
  if (section.bullets?.length) parts.push(...section.bullets);
  return parts;
}
