import { getAllTestimonies } from "@/lib/data";
import TestimonyModerationList from "./TestimonyModerationList";

export default function AdminTestimoniesPage() {
  const items = getAllTestimonies();
  const pending = items.filter((t) => t.status === "PENDING");
  const rest = items.filter((t) => t.status !== "PENDING");

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink dark:text-white">Testimonies</h1>
      <p className="mt-1 text-sm text-ink-soft">{pending.length} awaiting review</p>

      <h2 className="mt-6 text-sm font-semibold uppercase tracking-wide text-ink-soft">Pending</h2>
      <TestimonyModerationList items={pending} />

      <h2 className="mt-10 text-sm font-semibold uppercase tracking-wide text-ink-soft">Reviewed</h2>
      <TestimonyModerationList items={rest} />
    </div>
  );
}
