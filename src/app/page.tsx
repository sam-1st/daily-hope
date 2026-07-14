import Link from "next/link";
import { BookOpen } from "lucide-react";
import Hero from "@/components/Hero";
import EncouragementCard from "@/components/EncouragementCard";
import Button from "@/components/Button";
import { getEncouragements, getFeaturedEncouragement } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default function HomePage() {
  const featured = getFeaturedEncouragement();
  const recent = getEncouragements().filter((e) => e.id !== featured.id).slice(0, 3);

  return (
    <>
      <Hero />

      {/* Today's Encouragement */}
      <section className="container-page">
        <div className="mx-auto max-w-3xl">
          <span className="section-eyebrow">Today's encouragement</span>
          <div className="card mt-4 overflow-hidden p-8 sm:p-10">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
              <BookOpen size={16} />
              {featured.scripture}
            </div>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl dark:text-white">
              {featured.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">{featured.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <time className="text-sm text-ink-soft/70">{formatDate(featured.date)}</time>
              <Button href={`/encouragements/${featured.slug}`}>Read the full message</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured scripture */}
      <section className="container-page mt-20">
        <div className="mx-auto max-w-2xl rounded-xl3 bg-emerald-600 px-8 py-12 text-center text-white shadow-soft sm:px-14">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">Featured scripture</span>
          <p className="mt-4 text-balance font-display text-2xl italic leading-relaxed sm:text-3xl">
            "{featured.scriptureText}"
          </p>
          <p className="mt-4 text-sm font-semibold text-emerald-100">{featured.scripture}</p>
        </div>
      </section>

      {/* Recent encouragements */}
      <section className="container-page mt-20 pb-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="section-eyebrow">Recent encouragements</span>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl dark:text-white">
              More reflections to sit with
            </h2>
          </div>
          <Link href="/encouragements" className="hidden text-sm font-semibold text-emerald-700 hover:underline sm:block dark:text-emerald-300">
            View all →
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recent.map((item, i) => (
            <EncouragementCard key={item.id} item={item} index={i} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button href="/encouragements" variant="secondary">View all encouragements</Button>
        </div>
      </section>
    </>
  );
}
