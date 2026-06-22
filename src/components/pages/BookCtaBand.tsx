import Link from "next/link";
import { siteMeta } from "@/content/siteMeta";
import { cn } from "@/lib/utils";

type BookCtaBandProps = {
  title?: string;
  body?: string;
  className?: string;
};

export function BookCtaBand({
  title = "Ready to begin?",
  body = "Schedule a free consultation—we’ll map aesthetics, vitality, and longevity in one cohesive plan.",
  className,
}: BookCtaBandProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-y border-arc-teal/15 bg-gradient-to-br from-arc-teal-muted/60 via-arc-cream to-arc-cream-deep/40 py-16 sm:py-20",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-arc-teal/15 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-serif text-3xl font-semibold tracking-tight text-arc-charcoal sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 font-sans text-base leading-relaxed text-arc-charcoal/75 sm:text-lg">{body}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/book"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-arc-teal px-8 py-3 font-sans text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-[0_8px_28px_rgba(131,208,187,0.4)] transition-[filter] hover:brightness-105"
          >
            Book consultation
          </Link>
          <a
            href={`tel:${siteMeta.phoneTel}`}
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-arc-charcoal/15 bg-white/80 px-8 py-3 font-sans text-sm font-medium text-arc-charcoal transition-colors hover:border-arc-teal/40 hover:text-arc-teal"
          >
            {siteMeta.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
