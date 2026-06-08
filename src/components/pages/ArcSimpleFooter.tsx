import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { images } from "@/content/site";
import { FOOTER_AMBIENT_BG } from "@/content/backgroundDecoration";
import { siteMeta } from "@/content/siteMeta";
import { IconFacebook, IconInstagram } from "@/components/arc/SocialIcons";
import { cn } from "@/lib/utils";

const footerLinks = {
  Explore: [
    { label: "About", href: "/about" },
    { label: "Treatments", href: "/treatments" },
    { label: "Aesthetics", href: "/aesthetics" },
    { label: "Programs", href: "/programs" },
  ],
  Visit: [
    { label: "Contact", href: "/contact" },
    { label: "Financing", href: "/financing" },
    { label: "Book online", href: "/book" },
  ],
} as const;

const linkClass =
  "text-white/85 underline decoration-transparent underline-offset-[3px] transition-colors hover:text-arc-teal hover:decoration-arc-teal/40";

export function ArcSimpleFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden bg-arc-charcoal text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        aria-hidden
      >
        <Image src={FOOTER_AMBIENT_BG} alt="" fill className="object-cover" sizes="100vw" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr_1fr]">
          <div>
            <Link href="/" className="relative mb-6 block h-12 w-[9rem]">
              <Image
                src={images.logo}
                alt={siteMeta.brand}
                fill
                className="object-contain object-left brightness-110"
                sizes="140px"
              />
            </Link>
            <p className="max-w-xs font-serif text-lg italic leading-snug text-white/90">
              {siteMeta.tagline}
            </p>
          </div>

          {Object.entries(footerLinks).map(([heading, items]) => (
            <nav key={heading} aria-label={heading}>
              <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-white/50">
                {heading}
              </p>
              <ul className="space-y-2.5 font-sans text-sm">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <address className="not-italic">
            <p className="font-sans text-sm leading-relaxed text-white/88">
              {siteMeta.address.line1}
              <br />
              {siteMeta.address.line2}
            </p>
            <a
              href={`tel:${siteMeta.phoneTel}`}
              className="mt-3 inline-flex items-center gap-2 font-sans text-base text-white transition-colors hover:text-arc-teal"
            >
              <Phone className="size-4 text-arc-champagne" aria-hidden />
              {siteMeta.phone}
            </a>
            <p className="mt-2 font-sans text-sm text-white/65">{siteMeta.hours[0]}</p>
          </address>

          <div className="flex flex-col gap-4 md:items-end">
            <div className="flex gap-3">
              <a
                href={siteMeta.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-full p-2.5 text-arc-champagne transition-colors hover:bg-white/10"
              >
                <IconInstagram className="size-5" />
              </a>
              <a
                href={siteMeta.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded-full p-2.5 text-arc-champagne transition-colors hover:bg-white/10"
              >
                <IconFacebook className="size-5" />
              </a>
            </div>
            <p className="font-sans text-xs text-white/50">
              © {year} {siteMeta.brand}. All rights reserved.
              <span className="mx-2 text-white/25">·</span>
              <Link href="/privacy" className={cn(linkClass, "text-xs")}>
                Privacy
              </Link>
              <span className="mx-2 text-white/25">·</span>
              <Link href="/terms" className={cn(linkClass, "text-xs")}>
                Terms
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
