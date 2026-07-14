"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, BookOpen, MessageSquareHeart, Mail, Settings, LogOut, Sunrise } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/encouragements", label: "Encouragements", icon: BookOpen },
  { href: "/admin/testimonies", label: "Testimonies", icon: MessageSquareHeart },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminShell({ children, userName }: { children: React.ReactNode; userName: string }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-paper dark:bg-paper-dark">
      <div className="mx-auto flex max-w-6xl gap-8 px-5 py-10 sm:px-8">
        <aside className="hidden w-56 shrink-0 md:block">
          <div className="flex items-center gap-2 px-2 font-display text-lg font-semibold text-emerald-700 dark:text-emerald-200">
            <Sunrise size={18} className="text-gold-500" />
            Admin
          </div>
          <nav className="mt-6 space-y-1">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium",
                  pathname === href
                    ? "bg-emerald-50 text-emerald-700 dark:bg-white/10 dark:text-emerald-200"
                    : "text-ink-soft hover:bg-black/5 dark:hover:bg-white/5"
                )}
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
          </nav>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="mt-6 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-black/5 dark:hover:bg-white/5"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="flex items-center justify-between border-b border-black/5 pb-4 dark:border-white/10">
            <p className="text-sm text-ink-soft">Signed in as <span className="font-semibold text-ink dark:text-white">{userName}</span></p>
          </div>
          <div className="mt-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
