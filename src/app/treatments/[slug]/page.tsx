import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { preload } from "react-dom";
import { ArcMarketingShell } from "@/components/arc/ArcMarketingShell";
import { EmsculptNeoTreatmentContent } from "@/components/arc/pages/EmsculptNeoTreatmentContent";
import { EmsellaTreatmentContent } from "@/components/arc/pages/EmsellaTreatmentContent";
import { ExionTreatmentContent } from "@/components/arc/pages/ExionTreatmentContent";
import { ExoMindTreatmentContent } from "@/components/arc/pages/ExoMindTreatmentContent";
import { InfusionTreatmentContent } from "@/components/arc/pages/InfusionTreatmentContent";
import { ServiceTemplateContent } from "@/components/arc/pages/ServiceTemplateContent";
import { TreatmentDetailContent } from "@/components/arc/pages/TreatmentDetailContent";
import { emsculptNeoHero } from "@/content/pages/emsculpt-neo";
import { emsellaHero } from "@/content/pages/emsella";
import { exionHero } from "@/content/pages/exion";
import { exomindHero } from "@/content/pages/exomind";
import { infusionHero } from "@/content/pages/infusion";
import { getServiceTemplateBySlug } from "@/content/pages/serviceTemplateRegistry";
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

  const serviceTemplate = getServiceTemplateBySlug(treatment.slug);

  // Kick LCP heroes early on cold / direct loads (raw WebP).
  // Homepage idle warm still uses the matching `/_next/image` variant for SPA nav.
  if (treatment.slug === "exion") {
    preload(exionHero.imageSrc, { as: "image", fetchPriority: "high" });
  } else if (treatment.slug === "infusion-therapy") {
    preload(infusionHero.imageSrc, { as: "image", fetchPriority: "high" });
  } else if (treatment.slug === "emsella") {
    preload(emsellaHero.imageSrc, { as: "image", fetchPriority: "high" });
  } else if (treatment.slug === "emsculpt-neo") {
    preload(emsculptNeoHero.imageSrc, { as: "image", fetchPriority: "high" });
  } else if (treatment.slug === "exomind") {
    preload(exomindHero.imageSrc, { as: "image", fetchPriority: "high" });
  } else if (serviceTemplate) {
    preload(serviceTemplate.hero.imageSrc, { as: "image", fetchPriority: "high" });
  }

  return (
    <ArcMarketingShell>
      {treatment.slug === "exion" ? (
        <ExionTreatmentContent treatment={treatment} />
      ) : treatment.slug === "exomind" ? (
        <ExoMindTreatmentContent treatment={treatment} />
      ) : treatment.slug === "emsella" ? (
        <EmsellaTreatmentContent treatment={treatment} />
      ) : treatment.slug === "emsculpt-neo" ? (
        <EmsculptNeoTreatmentContent treatment={treatment} />
      ) : treatment.slug === "infusion-therapy" ? (
        <InfusionTreatmentContent treatment={treatment} />
      ) : serviceTemplate ? (
        <ServiceTemplateContent
          treatment={treatment}
          content={serviceTemplate.content}
        />
      ) : (
        <TreatmentDetailContent treatment={treatment} />
      )}
    </ArcMarketingShell>
  );
}
