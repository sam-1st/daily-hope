"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Sunrise } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Daily Hope";

const links = [
  { href: "/", label: "Home" },
  { href: "/encouragements", label: "Encouragements" },
  { href: "/testimonies", label: "Testimonies" },
  { href: "/support", label: "Support" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-paper/80 backdrop-blur-md dark:border-white/10 dark:bg-paper-dark/80">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold text-emerald-700 dark:text-emerald-200">
          <Sunrise size={20} className="text-gold-500" strokeWidth={2} />
          {SITE_NAME}
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-emerald-50 text-emerald-700 dark:bg-white/10 dark:text-emerald-200"
                  : "text-ink-soft hover:bg-black/5 dark:hover:bg-white/5"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-soft hover:bg-black/5 md:hidden dark:hover:bg-white/10"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-black/5 px-5 pb-4 pt-2 md:hidden dark:border-white/10">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-xl px-4 py-3 text-sm font-medium",
                  pathname === link.href
                    ? "bg-emerald-50 text-emerald-700 dark:bg-white/10 dark:text-emerald-200"
                    : "text-ink-soft hover:bg-black/5 dark:hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
