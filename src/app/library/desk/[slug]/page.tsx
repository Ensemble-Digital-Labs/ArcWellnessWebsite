import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArcMarketingShell } from "@/components/arc/ArcMarketingShell";
import { LibraryBookletDetailContent } from "@/components/arc/pages/LibraryBookletDetailContent";
import { getLibraryBooklet } from "@/content/library/desk";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { LIBRARY_BOOKLETS } = await import("@/content/library/desk");
  return LIBRARY_BOOKLETS.map((booklet) => ({ slug: booklet.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const booklet = getLibraryBooklet(slug);
  if (!booklet) return { title: "Booklet | Arc Wellness Library" };

  return {
    title: `${booklet.title} | From the Arc Desk | Arc Wellness`,
    description: booklet.description,
    alternates: { canonical: `/library/desk/${slug}` },
  };
}

export default async function LibraryBookletPage({ params }: PageProps) {
  const { slug } = await params;
  const booklet = getLibraryBooklet(slug);
  if (!booklet) notFound();

  return (
    <ArcMarketingShell headerProps={{ logoClickOnlyAtTop: true }}>
      <LibraryBookletDetailContent booklet={booklet} />
    </ArcMarketingShell>
  );
}
