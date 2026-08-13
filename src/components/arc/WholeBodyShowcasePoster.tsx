"use client";

import Image from "next/image";
import { SERVICES_SHOWCASE_SLIDES } from "@/content/servicesShowcaseSlides";
import { cn } from "@/lib/utils";

const firstSlideSrc = SERVICES_SHOWCASE_SLIDES[0]?.imageSrc;

/**
 * Full-viewport first-slide poster for the whole-body showcase.
 * Used as the deferred-section loading shell and as the permanent underlay
 * so scroll-in never flashes blank cream.
 */
export function WholeBodyShowcasePoster({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  if (!firstSlideSrc) {
    return (
      <div
        className={cn("min-h-[100dvh] w-full bg-arc-cream", className)}
        aria-hidden
      />
    );
  }

  return (
    <div
      className={cn(
        "relative min-h-[100dvh] w-full overflow-hidden bg-arc-cream",
        className,
      )}
      aria-hidden
    >
      <Image
        src={firstSlideSrc}
        alt=""
        fill
        className="object-cover object-[center_20%] md:object-[center_20%] lg:object-top"
        sizes="100vw"
        unoptimized
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
      />
    </div>
  );
}
