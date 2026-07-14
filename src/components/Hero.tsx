"use client";

import { motion } from "framer-motion";
import Button from "./Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-16 sm:pt-24">
      {/* Signature element: a slow "dawn" glow behind the hero, evoking
          daily renewal — the one bold visual moment on the page. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-70 blur-3xl animate-breathe"
        style={{
          background:
            "radial-gradient(closest-side, rgba(216,178,74,0.35), rgba(91,141,166,0.25) 55%, transparent 75%)",
        }}
      />

      <div className="container-page relative">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="section-eyebrow justify-center">A new mercy, every morning</span>
          <h1 className="mt-5 text-balance font-display text-4xl font-medium leading-tight text-ink sm:text-5xl dark:text-white">
            A little hope, waiting for you today
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-balance text-base leading-relaxed text-ink-soft sm:text-lg">
            Short, scripture-rooted reflections and real stories from
            everyday people — no noise, no pressure, just a quiet place to
            be encouraged.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="/encouragements">Start reading</Button>
            <Button href="/testimonies" variant="secondary">Read testimonies</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
