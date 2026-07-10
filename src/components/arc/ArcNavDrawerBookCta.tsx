"use client";

import Link from "next/link";
import { forwardRef } from "react";
import { ARC_NAV_BOOK_CTA } from "@/content/navigation";
import { bookingLinkExternalProps } from "@/lib/arcBookingLink";
import { ARC_PRIMARY_CTA_CLASS } from "@/lib/arcPrimaryCtaStyles";
import { cn } from "@/lib/utils";

type ArcNavDrawerBookCtaProps = {
  closeMenu: () => void;
  className?: string;
};

export const ArcNavDrawerBookCta = forwardRef<HTMLAnchorElement, ArcNavDrawerBookCtaProps>(
  function ArcNavDrawerBookCta({ closeMenu, className }, ref) {
    return (
      <Link
        ref={ref}
        href={ARC_NAV_BOOK_CTA.href}
        {...bookingLinkExternalProps(ARC_NAV_BOOK_CTA.href)}
        onClick={closeMenu}
        className={cn(
          "arc-nav-menu-book-cta",
          ARC_PRIMARY_CTA_CLASS,
          className,
        )}
      >
        {ARC_NAV_BOOK_CTA.label}
      </Link>
    );
  },
);
