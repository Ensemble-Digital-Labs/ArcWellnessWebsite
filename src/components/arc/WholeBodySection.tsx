import Image from "next/image";
import Link from "next/link";
import { PinnedSection } from "@/components/arc/PinnedSection";
import { cn } from "@/lib/utils";

const cards = [
  {
    title: "Rejuvenate Your Appearance",
    bullets: ["Facial aesthetics", "Skin quality", "Confidence-forward planning"],
    tagline: "Look refreshed, not different.",
    highlight: false,
  },
  {
    title: "Restore Peak Performance",
    bullets: ["Energy & recovery", "Metabolic health", "Athletic longevity"],
    tagline: "Feel strong in motion and at rest.",
    highlight: false,
  },
  {
    title: "Strengthen Your Foundation",
    bullets: ["Hormone balance", "Vitality", "Ongoing monitoring"],
    tagline: "Build resilience from the inside out.",
    highlight: true,
  },
  {
    title: "Elevate Sexual Wellness",
    bullets: ["Discreet consults", "Evidence-based options", "Comfort-first care"],
    tagline: "Well-being that respects your privacy.",
    highlight: false,
  },
  {
    title: "Optimize Cognitive Edge",
    bullets: ["Focus & clarity", "Stress resilience", "Healthy aging"],
    tagline: "Stay sharp for what matters most.",
    highlight: false,
  },
];

type WholeBodySectionProps = {
  imageUrls: readonly string[];
};

export function WholeBodySection({ imageUrls }: WholeBodySectionProps) {
  return (
    <PinnedSection
      id="services"
      className="flex min-h-[100dvh] flex-col justify-center bg-white px-6 py-20 md:px-10 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <h2
          data-scroll-section
          className="mb-14 text-center font-serif text-3xl font-semibold text-arc-charcoal md:text-4xl lg:text-[2.5rem]"
        >
          Whole-Body Care. Inside and Out.
        </h2>

        <div data-scroll-section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {cards.map((card, i) => {
            const img = imageUrls[i] ?? imageUrls[0];
            return (
              <article
                key={card.title}
                className={cn(
                  "relative flex flex-col border bg-arc-cream pb-8 pt-0 transition-shadow",
                  card.highlight
                    ? "border-2 border-arc-teal shadow-lg shadow-arc-teal/10"
                    : "border-arc-cream-deep",
                )}
              >
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={img}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 18vw, 50vw"
                  />
                </div>
                <div className="mt-6 flex flex-1 flex-col px-4">
                  <h3 className="mb-4 text-center font-serif text-lg font-semibold text-arc-charcoal">
                    {card.title}
                  </h3>
                  <ul className="mb-4 space-y-2 font-sans text-xs text-arc-charcoal/85">
                    {card.bullets.map((b) => (
                      <li
                        key={b}
                        className="relative pl-4 before:absolute before:left-0 before:top-[0.55em] before:size-1 before:rounded-full before:bg-arc-teal"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                  <p className="mb-6 text-center font-sans text-xs font-medium italic text-arc-charcoal/80">
                    {card.tagline}
                  </p>
                  <Link
                    href="#contact"
                    className="mt-auto text-center font-sans text-[11px] font-semibold uppercase tracking-widest text-arc-teal hover:underline"
                  >
                    Learn more →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </PinnedSection>
  );
}
