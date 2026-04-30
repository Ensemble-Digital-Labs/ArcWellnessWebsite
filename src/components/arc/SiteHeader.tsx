"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { images } from "@/content/site";
import { IconFacebook, IconInstagram } from "@/components/arc/SocialIcons";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services", hasDropdown: true },
  { label: "Conditions / Concerns", href: "#conditions", hasDropdown: true },
  { label: "Patients", href: "#patients", hasDropdown: true },
  { label: "Shop", href: "#shop", hasDropdown: true },
  { label: "Contact", href: "#contact" },
];

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-[60] w-full shadow-sm">
      {/* Utility bar */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 bg-arc-teal px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-white sm:justify-between sm:px-6 sm:text-xs">
        <div className="flex items-center gap-4">
          <a href="#" className="transition-opacity hover:opacity-80" aria-label="Instagram">
            <IconInstagram className="size-4" />
          </a>
          <a href="#" className="transition-opacity hover:opacity-80" aria-label="Facebook">
            <IconFacebook className="size-4" />
          </a>
          <a href="#" className="transition-opacity hover:opacity-80" aria-label="TikTok">
            <TikTokIcon className="size-4" />
          </a>
        </div>
        <div className="hidden gap-8 md:flex">
          <Link href="#" className="hover:underline">
            Specials & Events
          </Link>
          <Link href="#" className="hover:underline">
            Arc Society Membership
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <a href="tel:+15555551234" className="font-medium tracking-normal normal-case">
            (555) 555-1234
          </a>
          <Link
            href="#book"
            className="rounded-none bg-white px-4 py-1.5 text-arc-teal transition-colors hover:bg-arc-cream"
          >
            Book Here
          </Link>
        </div>
      </div>

      {/* Main nav — logo bleeds into horizontal padding so it can render larger */}
      <nav className="border-b border-arc-cream-deep bg-white px-4 py-0 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <Link
            href="/"
            className="-ml-4 flex h-[4.5rem] shrink-0 items-center p-0 sm:-ml-6 sm:h-20"
            aria-label="ARC Wellness home"
          >
            <Image
              src={images.logo}
              alt="ARC Wellness"
              width={480}
              height={160}
              className="h-full w-auto max-w-[min(92vw,400px)] object-contain object-left sm:max-w-[min(48vw,460px)] lg:max-w-[480px]"
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 460px, 480px"
              priority
            />
          </Link>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-semibold uppercase tracking-wide text-arc-charcoal lg:gap-x-6 lg:text-xs">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-0.5 whitespace-nowrap hover:text-arc-teal"
              >
                {item.label}
                {item.hasDropdown ? <ChevronDown className="size-3 opacity-70" /> : null}
              </Link>
            ))}
          </div>
          <Link
            href="#book"
            className={cn(
              "inline-flex items-center justify-center border-2 border-arc-teal px-6 py-2.5 text-xs font-semibold uppercase tracking-wide text-arc-teal transition-colors hover:bg-arc-teal hover:text-white",
            )}
          >
            Book Now
          </Link>
        </div>
      </nav>
    </header>
  );
}
