import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArcMarketingShell } from "@/components/arc/ArcMarketingShell";
import { LibraryBookletDetailContent } from "@/components/arc/pages/LibraryBookletDetailContent";
import {
  getLibraryTableBooklet,
  LIBRARY_TABLE_BOOKLETS,
} from "@/content/library/table";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return LIBRARY_TABLE_BOOKLETS.map((booklet) => ({ slug: booklet.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const booklet = getLibraryTableBooklet(slug);
  if (!booklet) return { title: "Booklet | Arc Wellness Library" };

  return {
    title: `${booklet.title} | From the Arc Table | Arc Wellness`,
    description: booklet.description,
    alternates: { canonical: `/library/table/${slug}` },
  };
}

export default async function LibraryTableBookletPage({ params }: PageProps) {
  const { slug } = await params;
  const booklet = getLibraryTableBooklet(slug);
  if (!booklet) notFound();

  return (
    <ArcMarketingShell headerProps={{ logoClickOnlyAtTop: true }}>
      <LibraryBookletDetailContent
        booklet={booklet}
        backHref="/library/table"
        backLabel="From the Arc Table"
      />
    </ArcMarketingShell>
  );
}
