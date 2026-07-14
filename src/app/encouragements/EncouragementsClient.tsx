"use client";

import { useMemo, useState } from "react";
import SearchBar from "@/components/SearchBar";
import EncouragementCard from "@/components/EncouragementCard";
import EmptyState from "@/components/EmptyState";
import { Encouragement } from "@/types";

const PAGE_SIZE = 6;

export default function EncouragementsClient({ items }: { items: Encouragement[] }) {
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.excerpt.toLowerCase().includes(q) ||
        e.scripture.toLowerCase().includes(q)
    );
  }, [items, query]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  return (
    <div>
      <div className="mx-auto max-w-md">
        <SearchBar
          value={query}
          onChange={(v) => {
            setQuery(v);
            setVisible(PAGE_SIZE);
          }}
        />
      </div>

      {shown.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            title="No encouragements found"
            description="Try a different keyword, or browse all messages by clearing your search."
          />
        </div>
      ) : (
        <>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((item, i) => (
              <EncouragementCard key={item.id} item={item} index={i} />
            ))}
          </div>

          {hasMore && (
            <div className="mt-10 text-center">
              <button onClick={() => setVisible((v) => v + PAGE_SIZE)} className="btn-secondary">
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
