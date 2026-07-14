import Link from "next/link";
import { BookOpen, MessageSquareHeart, Mail, ArrowRight } from "lucide-react";
import { getEncouragements, getAllTestimonies, getContactMessages } from "@/lib/data";

export default function AdminOverviewPage() {
  const encouragements = getEncouragements();
  const testimonies = getAllTestimonies();
  const pendingTestimonies = testimonies.filter((t) => t.status === "PENDING");
  const messages = getContactMessages();

  const toneClass = {
    emerald: "bg-emerald-50 text-emerald-600",
    gold: "bg-gold-200/50 text-gold-600",
    sky: "bg-sky-50 text-sky-600",
  } as const;

  const stats = [
    { label: "Encouragements", value: encouragements.length, href: "/admin/encouragements", icon: BookOpen, tone: "emerald" as const },
    { label: "Pending testimonies", value: pendingTestimonies.length, href: "/admin/testimonies", icon: MessageSquareHeart, tone: "gold" as const },
    { label: "Contact messages", value: messages.length, href: "/admin/messages", icon: Mail, tone: "sky" as const },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink dark:text-white">Dashboard</h1>
      <p className="mt-1 text-sm text-ink-soft">A quick look at what's happening on the site.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, href, icon: Icon, tone }) => (
          <Link key={href} href={href} className="card flex flex-col gap-3 p-5 transition hover:-translate-y-0.5">
            <div className={`flex h-9 w-9 items-center justify-center rounded-full ${toneClass[tone]} dark:bg-white/10`}>
              <Icon size={16} />
            </div>
            <div>
              <p className="text-2xl font-semibold text-ink dark:text-white">{value}</p>
              <p className="text-sm text-ink-soft">{label}</p>
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
              Manage <ArrowRight size={12} />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-xl2 border border-black/5 bg-white/60 p-5 text-sm text-ink-soft dark:border-white/10 dark:bg-white/[0.03]">
        Running in demo mode — content lives in memory (src/lib/data.ts) and
        resets on server restart. Connect a database (see README.md) to
        persist changes.
      </div>
    </div>
  );
}
