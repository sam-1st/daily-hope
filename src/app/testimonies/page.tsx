import type { Metadata } from "next";
import TestimoniesClient from "./TestimoniesClient";
import { getApprovedTestimonies } from "@/lib/data";

export const metadata: Metadata = {
  title: "Testimonies — Daily Hope",
  description: "Real stories of encouragement and hope from readers.",
};

export default function TestimoniesPage() {
  const items = getApprovedTestimonies();

  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-2xl text-center">
        <span className="section-eyebrow justify-center">Testimonies</span>
        <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl dark:text-white">
          Stories of hope, from people like you
        </h1>
        <p className="mt-3 text-ink-soft">
          Every testimony here is shared by a real reader, reviewed before it's published.
        </p>
      </div>

      <div className="mt-10">
        <TestimoniesClient items={items} />
      </div>
    </div>
  );
}
