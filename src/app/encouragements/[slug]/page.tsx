import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import ShareAndLike from "@/components/ShareAndLike";
import EncouragementCard from "@/components/EncouragementCard";
import { getEncouragementBySlug, getEncouragements } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const item = getEncouragementBySlug(params.slug);
  if (!item) return {};
  return {
    title: `${item.title} — Daily Hope`,
    description: item.excerpt,
    openGraph: { title: item.title, description: item.excerpt, type: "article" },
  };
}

export default function MessageDetailPage({ params }: { params: { slug: string } }) {
  const item = getEncouragementBySlug(params.slug);
  if (!item) notFound();

  const all = getEncouragements();
  const index = all.findIndex((e) => e.slug === item.slug);
  const prev = all[index + 1]; // older
  const next = all[index - 1]; // newer
  const related = all.filter((e) => e.slug !== item.slug).slice(0, 3);

  return (
    <article className="container-page py-16">
      <div className="mx-auto max-w-2xl">
        <Link href="/encouragements" className="text-sm font-medium text-ink-soft hover:text-emerald-600">
          ← All encouragements
        </Link>

        <div className="mt-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
          <BookOpen size={16} />
          {item.scripture}
        </div>

        <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl dark:text-white">
          {item.title}
        </h1>
        <time className="mt-3 block text-sm text-ink-soft/70">{formatDate(item.date)}</time>

        {item.scriptureText && (
          <blockquote className="mt-8 rounded-xl2 border-l-4 border-gold-500 bg-gold-200/20 px-6 py-5 font-display text-lg italic leading-relaxed text-ink dark:bg-white/5 dark:text-white">
            "{item.scriptureText}"
            <footer className="mt-2 text-sm not-italic text-ink-soft">— {item.scripture}</footer>
          </blockquote>
        )}

        <div className="mt-8 max-w-none text-base leading-relaxed text-ink-soft">
          {item.body.split("\n\n").map((para, i) => (
            <p key={i} className="mb-4">{para}</p>
          ))}
        </div>

        <div className="mt-10 border-t border-black/5 pt-6 dark:border-white/10">
          <ShareAndLike slug={item.slug} title={item.title} initialLikes={item.likes} />
        </div>

        <nav className="mt-10 grid grid-cols-2 gap-4 border-t border-black/5 pt-6 dark:border-white/10">
          {prev ? (
            <Link href={`/encouragements/${prev.slug}`} className="group flex flex-col rounded-xl2 border border-black/5 p-4 hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5">
              <span className="flex items-center gap-1 text-xs text-ink-soft"><ChevronLeft size={14} /> Previous</span>
              <span className="mt-1 truncate text-sm font-semibold text-ink dark:text-white">{prev.title}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/encouragements/${next.slug}`} className="group flex flex-col items-end rounded-xl2 border border-black/5 p-4 text-right hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5">
              <span className="flex items-center gap-1 text-xs text-ink-soft">Next <ChevronRight size={14} /></span>
              <span className="mt-1 truncate text-sm font-semibold text-ink dark:text-white">{next.title}</span>
            </Link>
          ) : <div />}
        </nav>
      </div>

      {related.length > 0 && (
        <div className="mx-auto mt-20 max-w-5xl">
          <span className="section-eyebrow">Related encouragements</span>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r, i) => (
              <EncouragementCard key={r.id} item={r} index={i} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
