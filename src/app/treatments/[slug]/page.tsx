import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArcMarketingShell } from "@/components/arc/ArcMarketingShell";
import { ExionTreatmentContent } from "@/components/arc/pages/ExionTreatmentContent";
import { InfusionTreatmentContent } from "@/components/arc/pages/InfusionTreatmentContent";
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
      {treatment.slug === "exion" ? (
        <ExionTreatmentContent treatment={treatment} />
      ) : treatment.slug === "infusion-therapy" ? (
        <InfusionTreatmentContent treatment={treatment} />
      ) : (
        <TreatmentDetailContent treatment={treatment} />
      )}
    </ArcMarketingShell>
  );
}
