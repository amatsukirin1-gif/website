"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email);
  const nameValid = fields.name.trim().length >= 2;
  const messageValid = fields.message.trim().length >= 10;
  const formValid = nameValid && emailValid && messageValid;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!formValid) {
      setError("Please fix the highlighted fields.");
      return;
    }
    setStatus("loading");
    setError(null);
    try {
      // No external service by default — simulate success.
      // Replace with your endpoint: await fetch("/api/contact", { method:"POST", body: JSON.stringify(fields) })
      // For Formspree, set NEXT_PUBLIC_FORMSPREE_ID and uncomment below:
      const id = process.env.NEXT_PUBLIC_FORMSPREE_ID;
      if (id) {
        const res = await fetch(`https://formspree.io/f/${id}`, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify(fields),
        });
        if (!res.ok) throw new Error("Form submission failed");
      } else {
        await new Promise((r) => setTimeout(r, 800));
      }
      setStatus("success");
      setFields({ name: "", email: "", message: "" });
      setTouched({ name: false, email: false, message: false });
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again or email us directly.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="max-w-2xl mx-auto mt-12 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-center">
        <p className="font-semibold text-green-800 dark:text-green-300 text-lg">Message sent!</p>
        <p className="text-sm text-green-700 dark:text-green-400 mt-2">Thank you for reaching out — we’ll get back to you within 1–2 business days.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-describedby={error ? "contact-error" : undefined} className="max-w-2xl mx-auto mt-12 space-y-4 sm:space-y-6">
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Name <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          autoComplete="name"
          required
          maxLength={80}
          aria-invalid={touched.name && !nameValid}
          aria-describedby={touched.name && !nameValid ? "contact-name-error" : undefined}
          value={fields.name}
          onChange={(e) => setFields((s) => ({ ...s, name: e.target.value }))}
          onBlur={() => setTouched((s) => ({ ...s, name: true }))}
          className="w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-500 border-gray-300 dark:border-gray-600"
          placeholder="Jane Doe"
        />
        {touched.name && !nameValid && (
          <p id="contact-name-error" className="mt-1 text-xs text-red-600 dark:text-red-400">Please enter at least 2 characters.</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          autoComplete="email"
          required
          inputMode="email"
          aria-invalid={touched.email && !emailValid}
          aria-describedby={touched.email && !emailValid ? "contact-email-error" : undefined}
          value={fields.email}
          onChange={(e) => setFields((s) => ({ ...s, email: e.target.value }))}
          onBlur={() => setTouched((s) => ({ ...s, email: true }))}
          className="w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-500 border-gray-300 dark:border-gray-600"
          placeholder="jane@example.com"
        />
        {touched.email && !emailValid && (
          <p id="contact-email-error" className="mt-1 text-xs text-red-600 dark:text-red-400">Please enter a valid email address.</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Message <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          maxLength={2000}
          aria-invalid={touched.message && !messageValid}
          aria-describedby={touched.message && !messageValid ? "contact-message-error" : "contact-message-hint"}
          value={fields.message}
          onChange={(e) => setFields((s) => ({ ...s, message: e.target.value }))}
          onBlur={() => setTouched((s) => ({ ...s, message: true }))}
          className="w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-500 border-gray-300 dark:border-gray-600"
          placeholder="How can we help?"
        />
        <div className="mt-1 flex justify-between gap-4">
          <div>
            {touched.message && !messageValid ? (
              <p id="contact-message-error" className="text-xs text-red-600 dark:text-red-400">Please enter at least 10 characters.</p>
            ) : (
              <p id="contact-message-hint" className="text-xs text-gray-500 dark:text-gray-400">{fields.message.length} / 2000</p>
            )}
          </div>
        </div>
      </div>

      {error && (
        <p id="contact-error" role="alert" className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
      {status === "error" && !error && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">Submission failed. Please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        aria-busy={status === "loading"}
        className="w-full px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
      <p className="text-xs text-center text-gray-500 dark:text-gray-400">
        By sending, you agree to our privacy policy. We never share your email.
      </p>
    </form>
  );
}
