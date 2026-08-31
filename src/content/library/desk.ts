export type LibraryBooklet = {
  slug: string;
  title: string;
  subtitle: string;
  /** Optional line breaks so the subtitle does not leave a single orphan word. */
  subtitleLines?: readonly string[];
  description: string;
  pageCount: number;
  /** On-site reader (may be a smaller web PDF). */
  pdfSrc: string;
  /** Optional full-quality file for Download; falls back to `pdfSrc`. */
  downloadSrc?: string;
  /** When false, Read only — no Download / Open PDF. Default true. */
  allowDownload?: boolean;
  coverSrc: string;
  coverAlt: string;
};

export const libraryDeskPage = {
  seo: {
    title: "From the Arc Desk | Arc Wellness Library, St. Louis",
    description:
      "Physician-guided booklets and long-form guides from Arc Wellness — cycle rhythm, wellness foundations, and more.",
  },
  masthead: {
    before: "From the ",
    emphasis: "Arc Desk",
    emphasisNowrap: true,
  },
  collectionHeading: {
    lead: "Our",
    emphasis: "booklets",
  },
} as const;

export const LIBRARY_BOOKLETS: readonly LibraryBooklet[] = [
  {
    slug: "rooted-in-rhythm",
    title: "Rooted in Rhythm",
    subtitle: "A Gentle Guide to Caring for Your Body Through Every Hormonal Phase",
    subtitleLines: [
      "A Gentle Guide to Caring for Your Body",
      "Through Every Hormonal Phase",
    ],
    description:
      "Work with your hormones, not against them — fasting, metabolism, and nourishment aligned to your cycle, from menstrual through luteal phases.",
    pageCount: 7,
    pdfSrc: "/assets/library/desk/rooted-in-rhythm.pdf",
    allowDownload: false,
    coverSrc: "/assets/library/desk/rooted-in-rhythm-cover.webp?v=20260819f",
    coverAlt: "Rooted in Rhythm booklet cover — hormonal rhythm and cycle-aligned wellness",
  },
  {
    slug: "wellness-redefined",
    title: "Wellness, Redefined",
    subtitle: "Cutting-Edge Treatments · A Lifestyle Compass for Whole-Body Health",
    subtitleLines: [
      "Cutting-Edge Treatments",
      "A Lifestyle Compass for Whole-Body Health",
    ],
    description:
      "Nutrition, movement, sleep, mindfulness, and the foundations Arc Wellness builds on — from breakfast reset and gut health to the Lifestyle Compass.",
    pageCount: 39,
    pdfSrc: "/assets/library/desk/wellness-redefined.pdf",
    allowDownload: false,
    coverSrc: "/assets/library/desk/wellness-redefined-cover.webp?v=20260819f",
    coverAlt: "Wellness, Redefined booklet cover — whole-body wellness and lifestyle foundations",
  },
];

export function getLibraryBooklet(slug: string): LibraryBooklet | undefined {
  return LIBRARY_BOOKLETS.find((booklet) => booklet.slug === slug);
}

export function libraryBookletHref(slug: string): string {
  return `/library/desk/${slug}`;
}

export function libraryBookletDownloadSrc(booklet: LibraryBooklet): string {
  return booklet.downloadSrc ?? booklet.pdfSrc;
}

export function libraryBookletAllowsDownload(booklet: LibraryBooklet): boolean {
  return booklet.allowDownload !== false;
}
