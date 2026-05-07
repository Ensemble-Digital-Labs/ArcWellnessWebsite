import { WhoWeAreRevealGrid } from "@/client-showcase/components/WhoWeAreRevealGrid";
import { showcaseDesign } from "@/client-showcase/design-tokens";

type WhoWeAreDesignProps = {
  imageSrc: string;
};

export function WhoWeAreDesign({ imageSrc }: WhoWeAreDesignProps) {
  return (
    <section
      id="about"
      className="scroll-mt-36 border-t border-arc-charcoal/10 py-20 sm:py-24 lg:py-28"
      style={{ backgroundColor: showcaseDesign.beige }}
    >
      <WhoWeAreRevealGrid imageSrc={imageSrc} introDelaySec={0.3} />
    </section>
  );
}
