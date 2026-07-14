"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Testimony } from "@/types";
import { formatDate } from "@/lib/utils";

export default function TestimonyCard({ item, index = 0 }: { item: Testimony; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.3) }}
      className="card flex h-full flex-col p-6"
    >
      <Quote size={20} className="text-gold-500" />
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{item.content}</p>
      <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-4 text-xs dark:border-white/10">
        <span className="font-semibold text-ink dark:text-white">{item.name || "Anonymous"}</span>
        <time className="text-ink-soft/70">{formatDate(item.date)}</time>
      </div>
    </motion.article>
  );
}
