"use client";

import { useState } from "react";
import { useToast } from "./Toast";

const HONEYPOT_FIELD = "company_website";

export default function TestimonySubmitForm({ onDone }: { onDone?: () => void }) {
  const { notify } = useToast();
  const [form, setForm] = useState({ name: "", email: "", content: "", [HONEYPOT_FIELD]: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form[HONEYPOT_FIELD]) return;
    if (form.content.trim().length < 20) {
      setError("Please share a little more detail (at least 20 characters).");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/testimonies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      notify("Thank you — your testimony is awaiting review.");
      setForm({ name: "", email: "", content: "", [HONEYPOT_FIELD]: "" });
      onDone?.();
    } catch {
      notify("Something went wrong. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="t-name" className="mb-1.5 block text-sm font-medium text-ink dark:text-white">
          Name <span className="font-normal text-ink-soft">(optional)</span>
        </label>
        <input id="t-name" className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </div>

      <div>
        <label htmlFor="t-email" className="mb-1.5 block text-sm font-medium text-ink dark:text-white">
          Email <span className="font-normal text-ink-soft">(optional, kept private)</span>
        </label>
        <input id="t-email" type="email" className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </div>

      <div>
        <label htmlFor="t-content" className="mb-1.5 block text-sm font-medium text-ink dark:text-white">Your testimony</label>
        <textarea
          id="t-content"
          rows={5}
          className="input resize-none"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor={HONEYPOT_FIELD}>Company website</label>
        <input id={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" value={form[HONEYPOT_FIELD]} onChange={(e) => setForm({ ...form, [HONEYPOT_FIELD]: e.target.value })} />
      </div>

      <p className="text-xs text-ink-soft">
        Submitted testimonies are reviewed before appearing publicly.
      </p>

      <button type="submit" disabled={submitting} className="btn-primary w-full">
        {submitting ? "Submitting..." : "Submit testimony"}
      </button>
    </form>
  );
}
