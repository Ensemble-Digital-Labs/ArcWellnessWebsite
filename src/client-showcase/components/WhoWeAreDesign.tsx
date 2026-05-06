import Image from "next/image";
import Link from "next/link";
import { showcaseInternalHref } from "@/client-showcase/content";
import { showcaseDesign } from "@/client-showcase/design-tokens";
import { whoWeAreCopy } from "@/client-showcase/mock-page-content";

type WhoWeAreDesignProps = {
  imageSrc: string;
};

export function WhoWeAreDesign({ imageSrc }: WhoWeAreDesignProps) {
  return (
    <section id="about" className="scroll-mt-36 border-t border-arc-charcoal/10 bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <div className="flex items-center gap-4">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-arc-charcoal/55">{whoWeAreCopy.eyebrow}</p>
            <span className="h-px flex-1 max-w-[4rem] bg-arc-charcoal/20" aria-hidden />
          </div>
          <h2 className="mt-5 font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-tight text-arc-charcoal">
            {whoWeAreCopy.headline}
          </h2>
          <div className="mt-6 space-y-4 font-sans text-base leading-relaxed text-arc-charcoal/78">
            {whoWeAreCopy.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <Link
            href={showcaseInternalHref("/#book")}
            className="mt-8 inline-flex rounded-md px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-arc-charcoal transition-colors hover:opacity-95 sm:text-sm"
            style={{ backgroundColor: showcaseDesign.sage }}
          >
            Book your consultation
          </Link>
        </div>
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg shadow-xl lg:aspect-[3/4]">
          <Image src={imageSrc} alt="Physician consulting with a patient at ARC Wellness" fill className="object-cover object-center" sizes="(min-width: 1024px) 45vw, 100vw" />
        </div>
      </div>
    </section>
  );
}
