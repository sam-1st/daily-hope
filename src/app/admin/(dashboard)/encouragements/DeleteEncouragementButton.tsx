"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/Toast";

export default function DeleteEncouragementButton({ slug, title }: { id: string; slug: string; title: string }) {
  const router = useRouter();
  const { notify } = useToast();
  const [confirming, setConfirming] = useState(false);

  async function handleDelete() {
    const res = await fetch(`/api/encouragements/${slug}`, { method: "DELETE" });
    if (res.ok) {
      notify(`Deleted "${title}".`);
      router.refresh();
    } else {
      notify("Couldn't delete that entry.", "error");
    }
    setConfirming(false);
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <button onClick={handleDelete} className="rounded-full bg-red-600 px-2 py-1 text-xs font-semibold text-white">
          Confirm
        </button>
        <button onClick={() => setConfirming(false)} className="rounded-full px-2 py-1 text-xs text-ink-soft hover:bg-black/5">
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      aria-label={`Delete ${title}`}
      className="flex h-8 w-8 items-center justify-center rounded-full text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
    >
      <Trash2 size={14} />
    </button>
  );
}
