import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageSectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  variant?: "cream" | "white" | "muted" | "dark";
  narrow?: boolean;
};

const variantClass = {
  cream: "bg-arc-cream",
  white: "bg-white",
  muted: "bg-arc-teal-muted/25",
  dark: "bg-arc-charcoal text-white",
};

export function PageSection({
  id,
  children,
  className,
  variant = "cream",
  narrow = false,
}: PageSectionProps) {
  return (
    <section id={id} className={cn(variantClass[variant], "py-14 sm:py-16 lg:py-20", className)}>
      <div
        className={cn(
          "mx-auto px-4 sm:px-6 lg:px-8",
          narrow ? "max-w-3xl" : "max-w-6xl",
        )}
      >
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  title,
  subtitle,
  emphasis,
  dark = false,
  className,
}: {
  title: string;
  subtitle?: string;
  emphasis?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <header className={cn("mb-10 max-w-2xl sm:mb-12", className)}>
      {subtitle ? (
        <p
          className={cn(
            "mb-2 font-sans text-xs font-semibold uppercase tracking-[0.24em]",
            "text-arc-teal",
          )}
        >
          {subtitle}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-serif text-3xl font-semibold tracking-tight sm:text-4xl",
          dark ? "text-white" : "text-arc-charcoal",
        )}
      >
        {title}
        {emphasis ? (
          <span className="block font-title-emphasis text-[1.15em] font-normal not-italic text-arc-teal-ink">
            {emphasis}
          </span>
        ) : null}
      </h2>
    </header>
  );
}
