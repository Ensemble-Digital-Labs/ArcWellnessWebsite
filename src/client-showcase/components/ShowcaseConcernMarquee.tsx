import { showcaseConcernMarqueeKeywords } from "@/client-showcase/mock-page-content";

/** Match main-site hero keyword ticker: serif labels on luminous rose-gold bar. */
const LABEL_CLASS =
  "shrink-0 font-serif text-base font-semibold uppercase tracking-[0.14em] text-arc-charcoal sm:text-lg md:text-xl [text-shadow:0_1px_0_rgba(255,255,255,0.42),0_1px_12px_rgba(0,0,0,0.06)]";

/**
 * Full-width infinite horizontal ticker below the hero (duplicated track for seamless loop).
 * Uses the same `animate-arc-marquee` + keyframes as the production hero/footer tickers.
 */
export function ShowcaseConcernMarquee() {
  return (
    <section
      className="overflow-hidden border-y border-arc-charcoal/10 bg-arc-rose-gold shadow-[0_10px_36px_rgba(44,44,44,0.08),0_2px_24px_var(--arc-rose-gold-glow)]"
      aria-label="Concerns we address"
    >
      <div
        className="animate-arc-marquee flex items-center gap-10 whitespace-nowrap py-4 sm:gap-12 sm:py-5 md:gap-14 md:py-6"
        style={{ width: "max-content", animationDuration: "48s" }}
      >
        {[0, 1].map((dup) => (
          <span key={dup} className="inline-flex shrink-0 items-center gap-10 sm:gap-12 md:gap-14">
            {showcaseConcernMarqueeKeywords.map((label) => (
              <span key={`${dup}-${label}`} className="inline-flex shrink-0 items-center gap-10 sm:gap-12 md:gap-14">
                <span className={LABEL_CLASS}>{label}</span>
                <span
                  className="select-none font-sans text-base font-semibold text-arc-charcoal/45 sm:text-lg md:text-xl"
                  aria-hidden
                >
                  ·
                </span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </section>
  );
}
