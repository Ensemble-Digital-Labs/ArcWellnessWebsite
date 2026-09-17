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

type FormStatus = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const busy = status === "sending";
  const sent = status === "sent";

  return (
    <form
      className="space-y-5"
      aria-busy={busy}
      onSubmit={async (e) => {
        e.preventDefault();
        if (busy || sent) return;

        const form = e.currentTarget;
        const fd = new FormData(form);
        const payload = {
          name: String(fd.get("name") ?? "").trim(),
          email: String(fd.get("email") ?? "").trim(),
          phone: String(fd.get("phone") ?? "").trim(),
          message: String(fd.get("message") ?? "").trim(),
          source: "arcwellness.net/contact",
        };

        setStatus("sending");
        try {
          const res = await fetch(siteMeta.contactWebhookUrl, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
          if (!res.ok) throw new Error("Webhook rejected the request");
          form.reset();
          setStatus("sent");
        } catch {
          setStatus("error");
        }
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-[0.16em] text-arc-charcoal/70">
            Name
          </span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            disabled={busy || sent}
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-[0.16em] text-arc-charcoal/70">
            Email
          </span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            disabled={busy || sent}
            className={inputClass}
          />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-[0.16em] text-arc-charcoal/70">
          Phone <span className="font-normal normal-case tracking-normal text-arc-charcoal/45">(optional)</span>
        </span>
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          disabled={busy || sent}
          className={inputClass}
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-[0.16em] text-arc-charcoal/70">
          What brings you here?
        </span>
        <textarea
          name="message"
          required
          rows={5}
          disabled={busy || sent}
          className={cn(inputClass, "resize-y min-h-[8rem]")}
          placeholder="A few words is enough, we’ll take it from there."
        />
      </label>
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={busy || sent}
          className="w-full rounded-full bg-arc-teal py-3.5 font-sans text-sm font-semibold uppercase tracking-[0.14em] text-white transition-[filter] hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:px-10"
        >
          {busy ? "Sending…" : sent ? "Message sent" : "Send message"}
        </button>
      </div>
      {status === "sent" ? (
        <p className="text-center font-sans text-sm text-arc-charcoal" role="status">
          Thank you. We’ll be in touch shortly.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="text-center font-sans text-sm text-arc-charcoal" role="alert">
          We couldn’t send that just now. Please try again, or email us at{" "}
          <a href={`mailto:${siteMeta.email}`} className="underline underline-offset-2">
            {siteMeta.email}
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
