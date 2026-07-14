"use client";

import { Search } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search by title or keyword...",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft/60" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search encouragements"
        className="input pl-11"
      />
    </div>
  );
}
