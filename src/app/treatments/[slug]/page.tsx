import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArcMarketingShell } from "@/components/arc/ArcMarketingShell";
import { TreatmentDetailContent } from "@/components/arc/pages/TreatmentDetailContent";
import { getAllTreatmentSlugs, getTreatmentBySlug } from "@/content/pages/treatments";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllTreatmentSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const treatment = getTreatmentBySlug(slug);
  if (!treatment) return { title: "Treatment | Arc Wellness" };
  return {
    title: `${treatment.title} | Arc Wellness`,
    description: treatment.intro,
  };
}

export default async function TreatmentDetailPage({ params }: Props) {
  const { slug } = await params;
  const treatment = getTreatmentBySlug(slug);
  if (!treatment) notFound();

  return (
    <ArcMarketingShell>
      <TreatmentDetailContent treatment={treatment} />
    </ArcMarketingShell>
  );
}
