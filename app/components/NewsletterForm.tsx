"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!emailValid) {
      setError("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    setError(null);
    try {
      const id = process.env.NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ID;
      if (id) {
        const res = await fetch(`https://formspree.io/f/${id}`, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        if (!res.ok) throw new Error("Subscription failed");
      } else {
        await new Promise((r) => setTimeout(r, 700));
      }
      setStatus("success");
      setEmail("");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unable to subscribe. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="max-w-xl mx-auto text-center bg-white/15 backdrop-blur rounded-xl px-6 py-5 border border-white/20">
        <p className="font-semibold text-white">You’re subscribed — thank you!</p>
        <p className="text-sm text-blue-100 mt-1">Check your inbox for a confirmation.</p>
        <button onClick={() => setStatus("idle")} className="mt-3 text-sm underline text-white hover:text-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded px-1">Subscribe another email</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-describedby={error ? "newsletter-error" : undefined} className="max-w-xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          aria-invalid={!!error}
          className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:outline-none text-sm sm:text-base disabled:opacity-60"
          disabled={status === "loading"}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          aria-busy={status === "loading"}
          className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white focus-visible:ring-offset-blue-600"
        >
          {status === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      {error && <p id="newsletter-error" role="alert" className="mt-3 text-sm text-white bg-red-500/20 border border-white/20 rounded-lg px-3 py-2">{error}</p>}
      <p className="text-xs sm:text-sm text-blue-100 mt-4 text-center">No spam, unsubscribe anytime. We respect your privacy.</p>
    </form>
  );
}
