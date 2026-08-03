"use client";

import { useState } from "react";
import { siteMeta } from "@/content/siteMeta";
import { cn } from "@/lib/utils";

const inputClass = cn(
  "w-full rounded-xl border-2 border-arc-charcoal/20 bg-arc-cream/60 px-4 py-3 font-sans text-sm text-arc-charcoal",
  "placeholder:text-arc-charcoal/40",
  "shadow-[inset_0_1px_2px_rgba(44,44,44,0.05),0_1px_2px_rgba(44,44,44,0.04)]",
  "transition-[border-color,background-color,box-shadow] duration-200",
  "hover:border-arc-teal-ink/35",
  "focus:border-arc-teal-ink/55 focus:bg-white focus:outline-none focus:ring-2 focus:ring-arc-teal/30 focus:shadow-[0_0_0_1px_rgba(69,136,114,0.12),inset_0_1px_2px_rgba(44,44,44,0.04)]",
);

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const name = String(fd.get("name") ?? "");
        const email = String(fd.get("email") ?? "");
        const message = String(fd.get("message") ?? "");
        const subject = encodeURIComponent(`Arc Wellness inquiry from ${name}`);
        const body = encodeURIComponent(
          `Name: ${name}\nEmail: ${email}\n\n${message}`,
        );
        window.location.href = `mailto:${siteMeta.email}?subject=${subject}&body=${body}`;
        setSubmitted(true);
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-[0.16em] text-arc-charcoal/70">
            Name
          </span>
          <input name="name" type="text" required autoComplete="name" className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-[0.16em] text-arc-charcoal/70">
            Email
          </span>
          <input name="email" type="email" required autoComplete="email" className={inputClass} />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-[0.16em] text-arc-charcoal/70">
          Phone <span className="font-normal normal-case tracking-normal text-arc-charcoal/45">(optional)</span>
        </span>
        <input name="phone" type="tel" autoComplete="tel" className={inputClass} />
      </label>
      <label className="block">
        <span className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-[0.16em] text-arc-charcoal/70">
          What brings you here?
        </span>
        <textarea
          name="message"
          required
          rows={5}
          className={cn(inputClass, "resize-y min-h-[8rem]")}
          placeholder="A few words is enough, we’ll take it from there."
        />
      </label>
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full rounded-full bg-arc-teal py-3.5 font-sans text-sm font-semibold uppercase tracking-[0.14em] text-white transition-[filter] hover:brightness-105 sm:w-auto sm:px-10"
        >
          Send message
        </button>
      </div>
      {submitted ? (
        <p className="font-sans text-sm text-arc-charcoal" role="status">
          Opening your email app, if it didn’t open, write us at {siteMeta.email}.
        </p>
      ) : null}
    </form>
  );
}
