import type { Metadata } from "next";
import { ArcInnerLayout } from "@/components/pages/ArcInnerLayout";
import { PageSection, SectionHeading } from "@/components/pages/PageSection";
import { siteMeta } from "@/content/siteMeta";

export const metadata: Metadata = {
  title: "Terms & Conditions | Arc Wellness",
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
