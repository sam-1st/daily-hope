import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { getEncouragements } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import DeleteEncouragementButton from "./DeleteEncouragementButton";

export default function AdminEncouragementsPage() {
  const items = getEncouragements();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink dark:text-white">Encouragements</h1>
          <p className="mt-1 text-sm text-ink-soft">{items.length} published</p>
        </div>
        <Link href="/admin/encouragements/new" className="btn-primary">
          <Plus size={16} /> New
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl2 border border-black/5 dark:border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-black/[0.02] text-xs uppercase tracking-wide text-ink-soft dark:bg-white/5">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="hidden px-4 py-3 sm:table-cell">Scripture</th>
              <th className="hidden px-4 py-3 sm:table-cell">Date</th>
              <th className="px-4 py-3">Likes</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-black/5 dark:border-white/10">
                <td className="px-4 py-3 font-medium text-ink dark:text-white">{item.title}</td>
                <td className="hidden px-4 py-3 text-ink-soft sm:table-cell">{item.scripture}</td>
                <td className="hidden px-4 py-3 text-ink-soft sm:table-cell">{formatDate(item.date)}</td>
                <td className="px-4 py-3 text-ink-soft">{item.likes}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/encouragements/${item.id}/edit`}
                      aria-label={`Edit ${item.title}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft hover:bg-black/5 dark:hover:bg-white/10"
                    >
                      <Pencil size={14} />
                    </Link>
                    <DeleteEncouragementButton id={item.id} slug={item.slug} title={item.title} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
