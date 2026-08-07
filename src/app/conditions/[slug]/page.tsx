import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { preload } from "react-dom";

import { ArcMarketingShell } from "@/components/arc/ArcMarketingShell";
import { ConditionPageContent } from "@/components/arc/pages/ConditionPageContent";
import {
  getAllConditionSlugs,
  getConditionBySlug,
} from "@/content/pages/conditions/registry";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllConditionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const condition = getConditionBySlug(slug);
  if (!condition) return { title: "Condition | Arc Wellness" };
  return {
    title: condition.seo.title,
    description: condition.seo.description,
  };
}

export default async function ConditionDetailPage({ params }: Props) {
  const { slug } = await params;
  const condition = getConditionBySlug(slug);
  if (!condition) notFound();

  preload(condition.hero.imageSrc, { as: "image", fetchPriority: "high" });

  return (
    <ArcMarketingShell>
      <ConditionPageContent content={condition} />
    </ArcMarketingShell>
  );
}
