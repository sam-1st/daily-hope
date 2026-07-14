"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";
import { Encouragement } from "@/types";

type Props = {
  mode: "create" | "edit";
  initial?: Encouragement;
};

export default function EncouragementForm({ mode, initial }: Props) {
  const router = useRouter();
  const { notify } = useToast();
  const [form, setForm] = useState({
    title: initial?.title || "",
    scripture: initial?.scripture || "",
    scriptureText: initial?.scriptureText || "",
    excerpt: initial?.excerpt || "",
    body: initial?.body || "",
    date: initial?.date?.slice(0, 10) || new Date().toISOString().slice(0, 10),
    featured: initial?.featured || false,
  });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = mode === "create" ? "/api/encouragements" : `/api/encouragements/${initial?.slug}`;
      const method = mode === "create" ? "POST" : "PATCH";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      notify(mode === "create" ? "Encouragement published." : "Changes saved.");
      router.push("/admin/encouragements");
      router.refresh();
    } catch {
      notify("Something went wrong. Please check the fields and try again.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4 p-6 sm:p-8">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink dark:text-white">Title</label>
        <input required className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink dark:text-white">Scripture reference</label>
          <input required placeholder="e.g. Psalm 23:1" className="input" value={form.scripture} onChange={(e) => setForm({ ...form, scripture: e.target.value })} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink dark:text-white">Date</label>
          <input required type="date" className="input" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink dark:text-white">Scripture text (optional)</label>
        <textarea rows={2} className="input resize-none" value={form.scriptureText} onChange={(e) => setForm({ ...form, scriptureText: e.target.value })} />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink dark:text-white">Short preview / excerpt</label>
        <textarea required rows={2} className="input resize-none" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink dark:text-white">Full message</label>
        <textarea required rows={8} className="input resize-none" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
        <p className="mt-1 text-xs text-ink-soft">Separate paragraphs with a blank line.</p>
      </div>

      <label className="flex items-center gap-2 text-sm text-ink dark:text-white">
        <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
        Feature on homepage as Today's Encouragement
      </label>

      <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-auto">
        {submitting ? "Saving..." : mode === "create" ? "Publish" : "Save changes"}
      </button>
    </form>
  );
}
