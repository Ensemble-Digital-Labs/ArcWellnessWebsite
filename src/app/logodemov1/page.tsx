import { ArcMarketingHome } from "@/components/arc/ArcMarketingHome";
import { SiteHeader } from "@/components/arc/SiteHeader";
import { logoDemoV1 } from "@/logodemov1/content";

export default function LogoDemoV1Page() {
  return (
    <ArcMarketingHome
      sectionBasePath={logoDemoV1.basePath}
      header={
        <SiteHeader
          logoSrc={logoDemoV1.logoSrc}
          logoAlt={logoDemoV1.logoAlt}
          homeHref={logoDemoV1.basePath}
          sectionBasePath={logoDemoV1.basePath}
        />
      }
    />
  );
}
