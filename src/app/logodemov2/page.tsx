import { ArcMarketingHome } from "@/components/arc/ArcMarketingHome";
import { SiteHeader } from "@/components/arc/SiteHeader";
import { logoDemoV2 } from "@/logodemov2/content";

export default function LogoDemoV2Page() {
  return (
    <ArcMarketingHome
      sectionBasePath={logoDemoV2.basePath}
      header={
        <SiteHeader
          logoSrc={logoDemoV2.logoSrc}
          logoAlt={logoDemoV2.logoAlt}
          homeHref={logoDemoV2.basePath}
          sectionBasePath={logoDemoV2.basePath}
        />
      }
    />
  );
}
