import { ArcMarketingHome } from "@/components/arc/ArcMarketingHome";
import { ArcSitePreloader } from "@/components/arc/ArcSitePreloader";
import { SiteHeader } from "@/components/arc/SiteHeader";

export default function Home() {
  return (
    <>
      <ArcSitePreloader />
      <ArcMarketingHome header={<SiteHeader />} />
    </>
  );
}
