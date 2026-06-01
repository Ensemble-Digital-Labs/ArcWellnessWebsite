import type { ReactNode } from "react";
import { ArcInnerHeader } from "@/components/pages/ArcInnerHeader";
import { ArcSimpleFooter } from "@/components/pages/ArcSimpleFooter";

type ArcInnerLayoutProps = {
  children: ReactNode;
};

/** Standard document scroll — no Locomotive (reliable on mobile). */
export function ArcInnerLayout({ children }: ArcInnerLayoutProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-arc-cream text-arc-charcoal">
      <ArcInnerHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <ArcSimpleFooter />
    </div>
  );
}
