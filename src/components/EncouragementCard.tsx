"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { Encouragement } from "@/types";
import { formatDate } from "@/lib/utils";

export default function EncouragementCard({
  item,
  index = 0,
}: {
  item: Encouragement;
  index?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.3) }}
      className="card group flex h-full flex-col p-6 transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
        <BookOpen size={14} />
        {item.scripture}
      </div>
      <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-ink dark:text-white">
        {item.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
        {item.excerpt}
      </p>
      <div className="mt-5 flex items-center justify-between">
        <time className="text-xs text-ink-soft/70">{formatDate(item.date)}</time>
        <Link
          href={`/encouragements/${item.slug}`}
          className="text-sm font-semibold text-emerald-700 transition group-hover:underline dark:text-emerald-300"
        >
          Read more →
        </Link>
      </div>
    </motion.article>
  );
}
