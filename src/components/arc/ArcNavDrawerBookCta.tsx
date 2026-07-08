"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { ARC_NAV_BOOK_CTA } from "@/content/navigation";
import { bookingLinkExternalProps } from "@/lib/arcBookingLink";
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
          "arc-nav-menu-book-cta inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full border border-arc-teal bg-arc-teal px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_4px_20px_rgba(131,208,187,0.35)] transition-[filter,transform] hover:brightness-105 sm:px-6 sm:py-3 sm:text-sm",
          className,
        )}
      >
        {ARC_NAV_BOOK_CTA.label}
      </Link>
    );
  },
);
