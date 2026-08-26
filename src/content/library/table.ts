import type { LibraryBooklet } from "@/content/library/desk";

export const LIBRARY_TABLE_BOOKLETS: readonly LibraryBooklet[] = [
  {
    slug: "the-nourishing-table",
    title: "The Nourishing Table",
    subtitle: "Real Food, Timeless Recipes & the Pleasure of Eating Well",
    subtitleLines: [
      "Real Food, Timeless Recipes &",
      "the Pleasure of Eating Well",
    ],
    description:
      "An invitation to slow down, cook again, and rediscover the pleasure of eating well — whole foods, simple techniques, and meals that nourish without feeling restrictive.",
    pageCount: 161,
    pdfSrc: "/assets/library/table/the-nourishing-table.pdf",
    coverSrc: "/assets/library/table/the-nourishing-table-cover.webp?v=20260825",
    coverAlt:
      "The Nourishing Table cover — roast chicken, salad, bread, and olives on a rustic table",
  },
];

export function getLibraryTableBooklet(slug: string): LibraryBooklet | undefined {
  return LIBRARY_TABLE_BOOKLETS.find((booklet) => booklet.slug === slug);
}

export function libraryTableBookletHref(slug: string): string {
  return `/library/table/${slug}`;
}
