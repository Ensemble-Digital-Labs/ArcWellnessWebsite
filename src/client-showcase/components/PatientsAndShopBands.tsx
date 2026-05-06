import Link from "next/link";
import { showcaseInternalHref } from "@/client-showcase/content";
import { showcaseDesign } from "@/client-showcase/design-tokens";

export function PatientsAndShopBands() {
  return (
    <>
      <section id="patients" className="scroll-mt-36 border-t border-arc-charcoal/10 bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-semibold text-arc-charcoal sm:text-3xl">Patients</h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-arc-charcoal/75">
            New patient forms, visit expectations, and FAQs—our team guides you through every step with calm, clear
            communication.
          </p>
          <Link
            href={showcaseInternalHref("/#book")}
            className="mt-6 inline-flex rounded-md border-2 px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.12em] transition-colors hover:bg-arc-charcoal/[0.03] sm:text-sm"
            style={{ borderColor: showcaseDesign.sageOutline, color: showcaseDesign.sageOutline }}
          >
            Book here
          </Link>
        </div>
      </section>

      <section id="shop" className="scroll-mt-36 border-t border-arc-charcoal/10 py-14 sm:py-16" style={{ backgroundColor: showcaseDesign.beige }}>
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-semibold text-arc-charcoal sm:text-3xl">Shop</h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-arc-charcoal/75">
            Curated skincare, supplements, and gift options—chosen to pair with your in-office plan.
          </p>
          <Link
            href={showcaseInternalHref("/#contact")}
            className="mt-6 inline-flex font-sans text-sm font-semibold text-arc-charcoal underline-offset-4 hover:underline"
          >
            Contact the studio
          </Link>
        </div>
      </section>
    </>
  );
}
