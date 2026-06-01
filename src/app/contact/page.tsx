import type { Metadata } from "next";
import { ArcMarketingShell } from "@/components/arc/ArcMarketingShell";
import { ContactPageContent } from "@/components/arc/pages/ContactPageContent";
import { contactPage } from "@/content/pages/contact";

export const metadata: Metadata = {
  title: contactPage.seo.title,
  description: contactPage.seo.description,
};

export default function ContactPage() {
  return (
    <ArcMarketingShell>
      <ContactPageContent />
    </ArcMarketingShell>
  );
}
