import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { preload } from "react-dom";
import { ArcMarketingShell } from "@/components/arc/ArcMarketingShell";
import { EmsculptNeoTreatmentContent } from "@/components/arc/pages/EmsculptNeoTreatmentContent";
import { EmsellaTreatmentContent } from "@/components/arc/pages/EmsellaTreatmentContent";
import { ExionTreatmentContent } from "@/components/arc/pages/ExionTreatmentContent";
import { ExoMindTreatmentContent } from "@/components/arc/pages/ExoMindTreatmentContent";
import { InfusionTreatmentContent } from "@/components/arc/pages/InfusionTreatmentContent";
import { TreatmentDetailContent } from "@/components/arc/pages/TreatmentDetailContent";
import { emsculptNeoHero } from "@/content/pages/emsculpt-neo";
import { emsellaHero } from "@/content/pages/emsella";
import { exionHero } from "@/content/pages/exion";
import { exomindHero } from "@/content/pages/exomind";
import { infusionHero } from "@/content/pages/infusion";
import { getAllTreatmentSlugs, getTreatmentBySlug } from "@/content/pages/treatments";

type Props = { params: Promise<{ slug: string }> };

const TREATMENT_META_BY_SLUG: Record<string, { title: string; description: string }> = {
  overview: {
    title: "Treatment Overview | ExoMind, EmSculpt Neo, Peptides & More",
    description:
      "See every treatment path at Arc Wellness, neuromodulation, pelvic health, body contouring, IV nutrients, peptides, and physician-selected supplements.",
  },
  exomind: {
    title: "ExoMind TMS Neuromodulation | Arc Wellness, St. Louis",
    description:
      "ExoMind uses precise Transcranial Magnetic Stimulation to recalibrate brain communication and support healthier function. Available at Arc Wellness, St. Louis.",
  },
  emsella: {
    title: "EmSella Pelvic Floor Therapy | Arc Wellness, St. Louis",
    description:
      "EmSella is a non-invasive HIFEM treatment that strengthens pelvic floor muscles while you stay fully clothed. Book a session at Arc Wellness, St. Louis.",
  },
  "emsculpt-neo": {
    title: "EmSculpt Neo Body Contouring | Arc Wellness, St. Louis",
    description:
      "EmSculpt Neo combines two technologies to reduce fat and build muscle at once, no surgery, no downtime. Available at Arc Wellness in St. Louis, MO.",
  },
  emface: {
    title: "EmFace Non-Invasive Facial Toning | Arc Wellness, St. Louis",
    description:
      "EmFace lifts, tones, and reduces wrinkles by treating facial skin and muscle at once, no needles, no downtime. Book at Arc Wellness in St. Louis.",
  },
  exion: {
    title: "Exion Skin Rejuvenation (RF + Ultrasound) | Arc Wellness",
    description:
      "Exion combines radiofrequency and ultrasound to boost collagen, elastin, and hyaluronic acid for firmer, healthier-looking skin. Available in St. Louis.",
  },
  daxxify: {
    title: "DAXXIFY Long-Lasting Wrinkle Injections | Arc Wellness",
    description:
      "DAXXIFY is an FDA-approved neuromodulator that smooths moderate to severe frown lines with longer-lasting results. Book at Arc Wellness in St. Louis, MO.",
  },
  rha: {
    title: "RHA Dermal Fillers for Dynamic Wrinkles | Arc Wellness",
    description:
      "The RHA Collection is the first FDA-approved filler line built specifically for dynamic wrinkles and folds. Available at Arc Wellness in St. Louis, MO.",
  },
  knesko: {
    title: "Knesko Collagen Masks & Gemstone Facials | Arc Wellness",
    description:
      "Knesko Skin blends clinical science with gemstone-infused collagen masks for a luxury facial that treats skin, mind, and spirit. Book at Arc Wellness.",
  },
  "peptide-therapy": {
    title: "Peptide Therapy for Recovery & Longevity | Arc Wellness",
    description:
      "Peptide therapy works with your body's natural repair and regulation systems to support healing, recovery, and regeneration. Available in St. Louis, MO.",
  },
  supplements: {
    title: "Physician-Guided Supplements | Arc Wellness, St. Louis",
    description:
      "Supplements at Arc Wellness are chosen carefully, dosed correctly, and paired with a physician-guided plan, never generic retail products.",
  },
};

export async function generateStaticParams() {
  return getAllTreatmentSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const matchedMeta = TREATMENT_META_BY_SLUG[slug];
  if (matchedMeta) {
    return matchedMeta;
  }

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
      ) : (
        <TreatmentDetailContent treatment={treatment} />
      )}
    </ArcMarketingShell>
  );
}
