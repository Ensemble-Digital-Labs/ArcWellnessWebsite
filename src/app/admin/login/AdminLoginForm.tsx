"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function AdminLoginForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/admin/insights";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setPending(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error ?? "Login failed.");
        return;
      }
      router.push(nextPath);
      router.refresh();
    } catch {
      setError("Could not reach the server. Try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col justify-center px-6 py-16">
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-arc-charcoal">
        Arc Wellness
      </p>
      <h1 className="mt-3 font-serif text-3xl font-semibold text-arc-charcoal">Admin sign in</h1>
      <p className="mt-3 text-sm leading-relaxed text-arc-charcoal/65">
        Manage blogs and case studies for the Insights hub.
      </p>

      {!configured ? (
        <p className="mt-8 rounded-xl border border-amber-300/50 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          Admin is not configured yet. Add{" "}
          <code className="rounded bg-white/80 px-1">ARC_ADMIN_USERNAME</code>,{" "}
          <code className="rounded bg-white/80 px-1">ARC_ADMIN_PASSWORD</code>, and{" "}
          <code className="rounded bg-white/80 px-1">ARC_ADMIN_SESSION_SECRET</code> to{" "}
          <code className="rounded bg-white/80 px-1">.env.local</code>, then restart the dev server.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-arc-charcoal">Username</span>
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-arc-charcoal/15 bg-white px-4 py-3 text-sm outline-none ring-arc-teal/30 focus:border-arc-teal/40 focus:ring-2"
              required
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-arc-charcoal">Password</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-arc-charcoal/15 bg-white px-4 py-3 text-sm outline-none ring-arc-teal/30 focus:border-arc-teal/40 focus:ring-2"
              required
            />
          </label>
          {error ? (
            <p className="text-sm font-medium text-red-700" role="alert">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-arc-charcoal px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-arc-charcoal/90 disabled:opacity-60"
          >
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>
      )}

      <Link
        href="/library/education"
        className="mt-10 text-center text-sm font-medium text-arc-charcoal/55 underline-offset-2 hover:text-arc-teal hover:underline"
      >
        ← Back to Insights
      </Link>
    </div>
  );
}
