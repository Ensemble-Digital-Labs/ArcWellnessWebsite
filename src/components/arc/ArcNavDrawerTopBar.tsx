import type { ReactNode } from "react";

/** Top row inside the slide-in drawer — Book now aligns left; slides in with the panel only. */
export function ArcNavDrawerTopBar({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-20 flex shrink-0 items-center justify-start px-8 pb-3 pt-6 sm:px-10 sm:pb-4 sm:pt-8">
      {children}
    </div>
  );
}
