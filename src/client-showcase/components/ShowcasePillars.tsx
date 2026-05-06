import Link from "next/link";
import { showcaseInternalHref } from "@/client-showcase/content";

export function ShowcasePillars() {
  return (
    <section className="border-t border-arc-charcoal/10 bg-arc-cream py-14 sm:py-16 lg:py-20" id="pillars">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-2xl font-semibold capitalize text-arc-charcoal sm:text-3xl md:text-[2.15rem]">
            Elevating your care
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-arc-charcoal/78">
            At ARC Wellness, we treat the whole person—clinical judgment, aesthetics, and lifestyle—so your plan stays
            coherent visit after visit.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-12">
          <div className="rounded-2xl border border-arc-charcoal/10 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="font-serif text-xl font-semibold text-arc-charcoal sm:text-2xl">Aesthetic &amp; clinical refinement</h3>
            <p className="mt-3 font-sans text-sm leading-relaxed text-arc-charcoal/75">
              Natural-looking outcomes, transparent options, and pacing that respects your face, your body, and your
              calendar.
            </p>
            <ul className="mt-6 space-y-3 font-sans text-sm leading-relaxed text-arc-charcoal/85">
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-arc-teal" aria-hidden />
                Skin, face, and body treatments with a physician-led standard of care
              </li>
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-arc-teal" aria-hidden />
                Honest consults—when the best advice is to wait, do less, or sequence differently
              </li>
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-arc-teal" aria-hidden />
                Follow-up and refinement so results age with you, not against you
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-arc-charcoal/10 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="font-serif text-xl font-semibold text-arc-charcoal sm:text-2xl">Integrated wellness &amp; longevity</h3>
            <p className="mt-3 font-sans text-sm leading-relaxed text-arc-charcoal/75">
              Functional-style depth where it helps—labs, vitality, stress load, and habits—paired with a plan you can
              actually sustain.
            </p>
            <ul className="mt-6 space-y-3 font-sans text-sm leading-relaxed text-arc-charcoal/85">
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-arc-teal" aria-hidden />
                Evidence-informed protocols and clear expectations at every step
              </li>
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-arc-teal" aria-hidden />
                Coaching and continuity—not a one-off visit or generic checklist
              </li>
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-arc-teal" aria-hidden />
                A single roadmap across aesthetics, wellness, and longevity goals
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 text-center">
          <Link
            href={showcaseInternalHref("/#about")}
            className="font-sans text-sm font-semibold text-arc-teal-ink underline-offset-4 hover:underline"
          >
            About the practice
          </Link>
        </p>
      </div>
    </section>
  );
}
