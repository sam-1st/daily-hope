"use client";

import { useState } from "react";
import { useToast } from "@/components/Toast";

// Demo-mode settings form. Wire this to the SupportSettings Prisma model
// (see prisma/schema.prisma) once a database is connected, so changes here
// actually update src/components/SupportSection.tsx at runtime.
export default function AdminSettingsPage() {
  const { notify } = useToast();
  const [siteName, setSiteName] = useState(process.env.NEXT_PUBLIC_SITE_NAME || "Daily Hope");
  const [mpesaTill, setMpesaTill] = useState("000000");
  const [paypalLink, setPaypalLink] = useState("");

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    notify("Settings saved (demo mode — connect a database to persist this).");
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink dark:text-white">Website settings</h1>
      <p className="mt-1 text-sm text-ink-soft">Basic site details and support information.</p>

      <form onSubmit={handleSave} className="card mt-6 max-w-xl space-y-4 p-6 sm:p-8">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink dark:text-white">Site name</label>
          <input className="input" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink dark:text-white">M-Pesa till / paybill number</label>
          <input className="input" value={mpesaTill} onChange={(e) => setMpesaTill(e.target.value)} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink dark:text-white">PayPal link (optional)</label>
          <input className="input" value={paypalLink} onChange={(e) => setPaypalLink(e.target.value)} placeholder="https://paypal.me/yourhandle" />
        </div>
        <button type="submit" className="btn-primary">Save settings</button>
      </form>
    </div>
  );
}
