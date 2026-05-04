import { cn } from "@/lib/utils";

type ArcTrustStripSectionProps = {
  id?: string;
  className?: string;
  items: readonly string[];
};

/**
 * Single-row **proof strip** — no logos required yet; concentrated trust language.
 */
export function ArcTrustStripSection({ id, className, items }: ArcTrustStripSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "bg-arc-teal-muted/35 py-8 sm:py-10",
        className,
      )}
    >
      <div
        data-scroll-section
        className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-4 px-6 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-3 md:px-10"
      >
        {items.map((item, i) => (
          <span
            key={item}
            className="flex items-center gap-3 font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-arc-charcoal/70 sm:text-xs"
          >
            {i > 0 ? (
              <span className="hidden text-arc-teal/50 sm:inline" aria-hidden>
                ✦
              </span>
            ) : null}
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
