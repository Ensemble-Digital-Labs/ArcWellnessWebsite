import type { ReactNode } from "react";
import { ArcFooter } from "@/components/arc/ArcFooter";
import { ArcScrollShell } from "@/components/arc/ArcScrollShell";
import { SiteHeader } from "@/components/arc/SiteHeader";

type ArcMarketingShellProps = {
  children: ReactNode;
};

/** Homepage chrome: overlay header, Lenis scroll shell, pinned footer. */
export function ArcMarketingShell({ children }: ArcMarketingShellProps) {
  return (
    <>
      <SiteHeader homeHref="/" />
      <ArcScrollShell>
        {children}
        <ArcFooter />
      </ArcScrollShell>
    </>
  );
}
