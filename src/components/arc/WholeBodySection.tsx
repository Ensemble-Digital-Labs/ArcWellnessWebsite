import { ArcServicesShowcaseSlider } from "@/components/arc/ArcServicesShowcaseSlider";
import { SERVICES_SHOWCASE_SLIDES } from "@/content/servicesShowcaseSlides";

/**
 * Whole-body services showcase — CSS sticky lock (same model as founder section).
 * Avoids GSAP `pin` handoff from founder `sticky`, which caused a one-frame flicker.
 * `72dvh` scroll room matches the former `pinDistanceMultiplier={0.72}`.
 */
export function WholeBodySection() {
  return (
    <section
      id="services"
      className="relative h-auto w-full overflow-x-clip bg-arc-cream motion-safe:h-[calc(100dvh+72dvh)]"
    >
      <div className="sticky top-0 z-0 h-[100dvh] min-h-[320px] w-full overflow-hidden motion-reduce:static">
        <ArcServicesShowcaseSlider
          slides={SERVICES_SHOWCASE_SLIDES}
          className="w-full max-w-none"
        />
      </div>
    </section>
  );
}
