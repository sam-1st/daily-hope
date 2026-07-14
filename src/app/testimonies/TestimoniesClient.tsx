"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TestimonyCard from "@/components/TestimonyCard";
import TestimonySubmitForm from "@/components/TestimonySubmitForm";
import EmptyState from "@/components/EmptyState";
import { Testimony } from "@/types";

export default function TestimoniesClient({ items }: { items: Testimony[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-center">
        <button onClick={() => setOpen(true)} className="btn-primary">
          Share Your Testimony
        </button>
      </div>

      <div className="mt-12">
        {items.length === 0 ? (
          <EmptyState title="No testimonies yet" description="Be the first to share how you've been encouraged." />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((t, i) => (
              <TestimonyCard key={t.id} item={t} index={i} />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
              className="card relative w-full max-w-md p-6 sm:p-8"
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-ink-soft hover:bg-black/5 dark:hover:bg-white/10"
              >
                <X size={16} />
              </button>
              <h2 className="font-display text-xl font-semibold text-ink dark:text-white">Share Your Testimony</h2>
              <p className="mt-1 text-sm text-ink-soft">Anonymous submissions are welcome.</p>
              <div className="mt-6">
                <TestimonySubmitForm onDone={() => setOpen(false)} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
