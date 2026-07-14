import { Mail } from "lucide-react";
import { getContactMessages } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import EmptyState from "@/components/EmptyState";

export default function AdminMessagesPage() {
  const items = getContactMessages();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink dark:text-white">Contact messages</h1>
      <p className="mt-1 text-sm text-ink-soft">{items.length} received</p>

      {items.length === 0 ? (
        <div className="mt-6">
          <EmptyState title="No messages yet" description="Messages sent through the contact form will show up here." />
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {items.map((m) => (
            <div key={m.id} className="card p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-ink dark:text-white">{m.name}</p>
                  <a href={`mailto:${m.email}`} className="flex items-center gap-1 text-xs text-emerald-700 hover:underline dark:text-emerald-300">
                    <Mail size={12} /> {m.email}
                  </a>
                </div>
                <time className="shrink-0 text-xs text-ink-soft/70">{formatDate(m.date)}</time>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
