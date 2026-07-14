"use client";

import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import { useToast } from "@/components/Toast";
import { formatDate } from "@/lib/utils";
import { Testimony } from "@/types";

export default function TestimonyModerationList({ items }: { items: Testimony[] }) {
  const router = useRouter();
  const { notify } = useToast();

  async function setStatus(id: string, status: "APPROVED" | "REJECTED") {
    const res = await fetch(`/api/testimonies/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      notify(status === "APPROVED" ? "Testimony approved." : "Testimony rejected.");
      router.refresh();
    } else {
      notify("Something went wrong.", "error");
    }
  }

  if (items.length === 0) {
    return <p className="mt-6 text-sm text-ink-soft">No testimonies here.</p>;
  }

  return (
    <div className="mt-6 space-y-3">
      {items.map((t) => (
        <div key={t.id} className="card p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-ink dark:text-white">{t.name || "Anonymous"}</p>
              <time className="text-xs text-ink-soft/70">{formatDate(t.date)}</time>
            </div>
            <span className={
              "shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold " +
              (t.status === "APPROVED"
                ? "bg-emerald-50 text-emerald-700"
                : t.status === "REJECTED"
                ? "bg-red-50 text-red-600"
                : "bg-gold-200/50 text-gold-600")
            }>
              {t.status}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{t.content}</p>

          {t.status === "PENDING" && (
            <div className="mt-4 flex gap-2">
              <button onClick={() => setStatus(t.id, "APPROVED")} className="btn-primary !px-4 !py-2 text-xs">
                <Check size={14} /> Approve
              </button>
              <button onClick={() => setStatus(t.id, "REJECTED")} className="btn !border-red-200 !px-4 !py-2 text-xs text-red-600 hover:!bg-red-50">
                <X size={14} /> Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
