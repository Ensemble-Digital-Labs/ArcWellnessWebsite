import { ArcMarketingHome } from "@/components/arc/ArcMarketingHome";
import { SiteHeader } from "@/components/arc/SiteHeader";
import { logoDemoV3 } from "@/logodemov3/content";

export default function LogoDemoV3Page() {
  return (
    <ArcMarketingHome
      sectionBasePath={logoDemoV3.basePath}
      header={
        <SiteHeader
          logoSrc={logoDemoV3.logoSrc}
          logoAlt={logoDemoV3.logoAlt}
          homeHref={logoDemoV3.basePath}
          sectionBasePath={logoDemoV3.basePath}
        />
      }
    />
  );
}
