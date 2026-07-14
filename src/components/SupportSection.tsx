"use client";

import { useState } from "react";
import { Copy, Check, HandHeart } from "lucide-react";

// M-Pesa / PayPal details are intentionally hard-coded here so they're easy
// to find and edit later — replace the placeholders below with real details.
const MPESA_NAME = "Daily Hope";
const MPESA_TILL = "000000";
const PAYPAL_LINK = ""; // e.g. "https://paypal.me/yourhandle" — leave blank to hide

export default function SupportSection({ compact = false }: { compact?: boolean }) {
  const [copied, setCopied] = useState(false);

  function copyTill() {
    navigator.clipboard?.writeText(MPESA_TILL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section className={compact ? "" : "py-16"}>
      <div className={compact ? "" : "container-page"}>
        <div className="card mx-auto max-w-2xl p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-200/60 text-gold-600">
            <HandHeart size={22} />
          </div>
          <h2 className="mt-4 font-display text-2xl font-semibold text-ink dark:text-white">
            Support This Project
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
            If these messages have encouraged you and you'd like to help keep
            this website online and growing, you're welcome to support the
            project. Every contribution helps cover hosting, maintenance, and
            future improvements. Your support is completely optional and
            sincerely appreciated.
          </p>

          <div className="mt-6 grid gap-3 text-left sm:grid-cols-2">
            <div className="rounded-xl2 border border-black/5 bg-sky-50 p-4 dark:border-white/10 dark:bg-white/5">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">M-Pesa</p>
              <p className="mt-1 text-sm text-ink dark:text-white">{MPESA_NAME}</p>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-lg font-semibold text-ink dark:text-white">{MPESA_TILL}</span>
                <button
                  onClick={copyTill}
                  aria-label="Copy till number"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft hover:bg-black/5 dark:hover:bg-white/10"
                >
                  {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            <div className="rounded-xl2 border border-black/5 bg-emerald-50 p-4 dark:border-white/10 dark:bg-white/5">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">PayPal</p>
              {PAYPAL_LINK ? (
                <a href={PAYPAL_LINK} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-300">
                  Give via PayPal →
                </a>
              ) : (
                <p className="mt-1 text-sm text-ink-soft">Coming soon</p>
              )}
            </div>
          </div>

          <p className="mt-6 text-xs text-ink-soft/80">
            Thank you — truly. Every bit helps this stay online for the next
            person who needs it.
          </p>
        </div>
      </div>
    </section>
  );
}
