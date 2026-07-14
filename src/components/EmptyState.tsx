import { Feather } from "lucide-react";

export default function EmptyState({
  title = "Nothing here yet",
  description = "Check back soon — new content is on its way.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl3 border border-dashed border-black/10 py-16 text-center dark:border-white/10">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-50 text-sky-600 dark:bg-white/5">
        <Feather size={20} />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold text-ink dark:text-white">{title}</h3>
      <p className="mt-1 max-w-xs text-sm text-ink-soft">{description}</p>
    </div>
  );
}
