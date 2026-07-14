import { notFound } from "next/navigation";
import { getEncouragements } from "@/lib/data";
import EncouragementForm from "../../EncouragementForm";

export default function EditEncouragementPage({ params }: { params: { id: string } }) {
  const item = getEncouragements().find((e) => e.id === params.id);
  if (!item) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink dark:text-white">Edit encouragement</h1>
      <p className="mt-1 text-sm text-ink-soft">{item.title}</p>
      <div className="mt-6 max-w-2xl">
        <EncouragementForm mode="edit" initial={item} />
      </div>
    </div>
  );
}
