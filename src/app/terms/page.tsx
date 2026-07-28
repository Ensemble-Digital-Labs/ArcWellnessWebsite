import type { Metadata } from "next";
import { ArcInnerLayout } from "@/components/pages/ArcInnerLayout";
import { PageSection, SectionHeading } from "@/components/pages/PageSection";
import { siteMeta } from "@/content/siteMeta";

export const metadata: Metadata = {
  title: "Terms & Conditions | Arc Wellness",
  description:
    "Review the terms and conditions for using the Arc Wellness website and booking treatments at our St. Louis, MO clinic.",
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <ArcInnerLayout>
      <PageSection variant="cream" className="pt-28">
        <SectionHeading title="Terms & Conditions" />
        <div className="prose prose-sm max-w-none font-sans text-arc-charcoal/78">
          <p>
            This page is a placeholder. Replace with attorney-approved terms for {siteMeta.brand}.
          </p>
        </div>
      </PageSection>
    </ArcInnerLayout>
  );
}
