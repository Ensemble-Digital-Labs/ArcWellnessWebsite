import type { Metadata } from "next";
import { ArcInnerLayout } from "@/components/pages/ArcInnerLayout";
import { PageSection, SectionHeading } from "@/components/pages/PageSection";
import { siteMeta } from "@/content/siteMeta";

export const metadata: Metadata = {
  title: "Privacy Policy | Arc Wellness",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <ArcInnerLayout>
      <PageSection variant="cream" className="pt-28">
        <SectionHeading title="Privacy Policy" />
        <div className="prose prose-sm max-w-none font-sans text-arc-charcoal/78">
          <p>
            This page is a placeholder. Replace with attorney-approved privacy policy copy for{" "}
            {siteMeta.brand}. Contact{" "}
            <a href={`mailto:${siteMeta.email}`} className="text-arc-charcoal">
              {siteMeta.email}
            </a>{" "}
            with questions about how we handle your information.
          </p>
        </div>
      </PageSection>
    </ArcInnerLayout>
  );
}
