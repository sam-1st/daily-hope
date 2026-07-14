"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { useToast } from "./Toast";

// Honeypot field name — real users never fill it in, bots often do.
const HONEYPOT_FIELD = "company_website";

export default function ContactForm() {
  const { notify } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "", [HONEYPOT_FIELD]: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Please share your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Please enter a valid email.";
    if (form.message.trim().length < 10) next.message = "Message should be at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form[HONEYPOT_FIELD]) return; // silently drop bot submissions
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      notify("Message sent — thank you for reaching out.");
      setForm({ name: "", email: "", message: "", [HONEYPOT_FIELD]: "" });
    } catch {
      notify("Something went wrong. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card space-y-4 p-6 sm:p-8">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink dark:text-white">Name</label>
        <input
          id="name"
          className="input"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && <p id="name-error" className="mt-1 text-xs text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink dark:text-white">Email</label>
        <input
          id="email"
          type="email"
          className="input"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && <p id="email-error" className="mt-1 text-xs text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink dark:text-white">Message</label>
        <textarea
          id="message"
          rows={5}
          className="input resize-none"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && <p id="message-error" className="mt-1 text-xs text-red-600">{errors.message}</p>}
      </div>

      {/* Honeypot: hidden from real visitors via CSS, invisible to screen readers */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={HONEYPOT_FIELD}>Company website</label>
        <input
          id={HONEYPOT_FIELD}
          tabIndex={-1}
          autoComplete="off"
          value={form[HONEYPOT_FIELD]}
          onChange={(e) => setForm({ ...form, [HONEYPOT_FIELD]: e.target.value })}
        />
      </div>

      <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-auto">
        <Send size={16} />
        {submitting ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
