import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { bookingLinkExternalProps } from "@/lib/arcBookingLink";
import { ARC_PRIMARY_CTA_CLASS } from "@/lib/arcPrimaryCtaStyles";
import { cn } from "@/lib/utils";

type ArcPrimaryCtaProps = {
  href: string;
  children: ReactNode;
  className?: string;
  centered?: boolean;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "children" | "className">;

/** Primary teal pill CTA — same style as nav “Book now”. */
export function ArcPrimaryCta({
  href,
  children,
  className,
  centered = false,
  ...linkProps
}: ArcPrimaryCtaProps) {
  return (
    <Link
      href={href}
      {...bookingLinkExternalProps(href)}
      className={cn(
        ARC_PRIMARY_CTA_CLASS,
        centered && "mx-auto",
        className,
      )}
      {...linkProps}
    >
      {children}
    </Link>
  );
}
