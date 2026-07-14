import type { Metadata } from "next";
import EncouragementsClient from "./EncouragementsClient";
import { getEncouragements } from "@/lib/data";

export const metadata: Metadata = {
  title: "Encouragements — Daily Hope",
  description: "Browse every encouragement and scripture-based reflection.",
};

export default function EncouragementsPage() {
  const items = getEncouragements();

  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-2xl text-center">
        <span className="section-eyebrow justify-center">All encouragements</span>
        <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl dark:text-white">
          Words to carry with you
        </h1>
        <p className="mt-3 text-ink-soft">
          Every reflection published here, searchable by title or keyword.
        </p>
      </div>

      <div className="mt-10">
        <EncouragementsClient items={items} />
      </div>
    </div>
  );
}
