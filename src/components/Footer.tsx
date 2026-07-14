import Link from "next/link";
import { Sunrise } from "lucide-react";

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Daily Hope";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-black/5 bg-white/60 dark:border-white/10 dark:bg-white/[0.02]">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-semibold text-emerald-700 dark:text-emerald-200">
            <Sunrise size={20} className="text-gold-500" />
            {SITE_NAME}
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
            A quiet corner of the internet for encouragement, reflection, and
            hope — one day at a time.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            <li><Link href="/encouragements" className="hover:text-emerald-600">Encouragements</Link></li>
            <li><Link href="/testimonies" className="hover:text-emerald-600">Testimonies</Link></li>
            <li><Link href="/contact" className="hover:text-emerald-600">Contact</Link></li>
          </ul>
        </div>

        <div className="rounded-xl2 border border-gold-500/20 bg-gold-200/20 p-5 dark:border-gold-500/20 dark:bg-white/5">
          <h4 className="text-sm font-semibold text-ink">Support this project</h4>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            If these messages have encouraged you, you're welcome to help
            keep this site online. Completely optional, always appreciated.
          </p>
          <Link href="/support" className="mt-3 inline-block text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-300">
            Learn more →
          </Link>
        </div>
      </div>

      <div className="border-t border-black/5 py-6 text-center text-xs text-ink-soft dark:border-white/10">
        © {new Date().getFullYear()} {SITE_NAME}. Made with care, for anyone who needs a little hope today.
      </div>
    </footer>
  );
}
