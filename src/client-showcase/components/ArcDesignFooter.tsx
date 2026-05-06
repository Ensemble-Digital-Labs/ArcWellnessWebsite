import Image from "next/image";
import Link from "next/link";
import { showcaseInternalHref } from "@/client-showcase/content";
import { showcaseDesign } from "@/client-showcase/design-tokens";
import { images } from "@/content/site";
import { IconFacebook, IconInstagram } from "@/components/arc/SocialIcons";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
    </svg>
  );
}

const cols = {
  About: ["Our story", "Providers", "Care philosophy"],
  Services: ["Aesthetics", "Wellness", "Longevity", "Membership"],
  Patients: ["New patients", "Forms", "FAQs"],
  Shop: ["Gift cards", "Skincare", "Supplements"],
} as const;

const linkClass = "font-sans text-sm text-arc-charcoal/75 transition-colors hover:text-arc-charcoal";

export function ArcDesignFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="scroll-mt-36 border-t border-arc-charcoal/10" style={{ backgroundColor: showcaseDesign.beige }}>
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,2fr)_minmax(0,1fr)] lg:gap-10">
          <div>
            <div className="relative h-10 w-36">
              <Image src={images.logo} alt="ARC Wellness" fill className="object-contain object-left" sizes="150px" />
            </div>
            <p className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-arc-charcoal/70">
              Elevated care for aesthetics, wellness, and longevity—rooted in intention and continuity.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-8 sm:grid-cols-4" aria-label="Footer">
            {Object.entries(cols).map(([heading, items]) => (
              <div key={heading}>
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-arc-charcoal/55">{heading}</p>
                <ul className="mt-4 space-y-2.5">
                  {items.map((item) => (
                    <li key={item}>
                      <Link href={showcaseInternalHref("/#contact")} className={linkClass}>
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-arc-charcoal/55">Stay connected</p>
            <div className="mt-4 flex gap-3">
              <a href="#" className="text-arc-charcoal/65 hover:text-arc-charcoal" aria-label="Instagram">
                <IconInstagram className="size-6" />
              </a>
              <a href="#" className="text-arc-charcoal/65 hover:text-arc-charcoal" aria-label="Facebook">
                <IconFacebook className="size-6" />
              </a>
              <a href="#" className="text-arc-charcoal/65 hover:text-arc-charcoal" aria-label="TikTok">
                <TikTokIcon className="size-6" />
              </a>
            </div>
            <Link
              href={showcaseInternalHref("/#book")}
              className="mt-6 inline-flex rounded-md px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-arc-charcoal transition-colors hover:opacity-95"
              style={{ backgroundColor: showcaseDesign.sage }}
            >
              Book here
            </Link>
            <a href="tel:+19495555279" className="mt-4 block font-sans text-sm font-medium text-arc-charcoal/85">
              (949) 555-ARCW
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-arc-charcoal/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-xs text-arc-charcoal/55">
            © {year} ARC Wellness. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 font-sans text-xs text-arc-charcoal/55">
            <Link href="#" className="hover:text-arc-charcoal">
              Privacy policy
            </Link>
            <Link href="#" className="hover:text-arc-charcoal">
              Terms of use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
