import { preload } from "react-dom";
import { ArcMarketingHome } from "@/components/arc/ArcMarketingHome";
import { ArcSitePreloader } from "@/components/arc/ArcSitePreloader";
import { SiteHeader } from "@/components/arc/SiteHeader";
import { images } from "@/content/site";

/** Common next/image widths for `sizes="100vw"` — match what Lighthouse / phones request. */
const HOME_LCP_IMAGE_WIDTHS = [750, 1080, 1920] as const;

for (const width of HOME_LCP_IMAGE_WIDTHS) {
  preload(
    `/_next/image?url=${encodeURIComponent(images.heroMedia)}&w=${width}&q=75`,
    { as: "image", fetchPriority: "high" },
  );
}

export default function Home() {
  return (
    <>
      <ArcSitePreloader />
      <ArcMarketingHome header={<SiteHeader hideLogoInHero />} />
    </>
  );
}
