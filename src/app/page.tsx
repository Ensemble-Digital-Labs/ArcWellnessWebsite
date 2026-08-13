import { ArcMarketingHome } from "@/components/arc/ArcMarketingHome";
import { ArcSitePreloader } from "@/components/arc/ArcSitePreloader";
import { SiteHeader } from "@/components/arc/SiteHeader";
import { images } from "@/content/site";

function heroPath(src: string) {
  return src.split("?")[0] ?? src;
}

const heroMobilePath = heroPath(images.heroMediaMobile);
const heroDesktopPath = heroPath(images.heroMedia);

/** Match `next/image` URLs the hero will actually request (`quality={82}`). */
const heroMobilePreload = `/_next/image?url=${encodeURIComponent(heroMobilePath)}&w=750&q=82`;
const heroDesktopPreload = `/_next/image?url=${encodeURIComponent(heroDesktopPath)}&w=1080&q=82`;

export default function Home() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={heroMobilePreload}
        media="(max-width: 767px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href={heroDesktopPreload}
        media="(min-width: 768px)"
        fetchPriority="high"
      />
      <ArcSitePreloader />
      <ArcMarketingHome header={<SiteHeader hideLogoInHero />} />
    </>
  );
}
