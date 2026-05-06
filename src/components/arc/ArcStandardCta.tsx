import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ArcStandardCtaProps = {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

/**
 * Standardized site CTA link: uppercase sans + subtle right-arrow.
 * Use across sections for consistent lightweight call-to-action treatment.
 */
export function ArcStandardCta({ href, children, className, style }: ArcStandardCtaProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2.5 font-sans text-sm font-bold uppercase tracking-[0.22em]",
        "text-arc-teal-ink transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-arc-teal-ink-hover",
        "[text-shadow:0_1px_0_rgba(255,255,255,0.5),0_1px_3px_rgba(44,44,44,0.12),0_0_16px_rgba(40,122,109,0.2)]",
        "outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-arc-teal-ink/50 focus-visible:ring-offset-2 focus-visible:ring-offset-arc-cream/80",
        "motion-reduce:transition-none sm:text-base",
        className,
      )}
      style={style}
    >
      {children}
      <ArrowRight
        className="size-[1.125rem] shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-0.5 motion-reduce:transition-none sm:size-5"
        strokeWidth={2.25}
        aria-hidden
      />
    </Link>
  );
}
