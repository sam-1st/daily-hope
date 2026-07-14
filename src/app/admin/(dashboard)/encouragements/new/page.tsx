import EncouragementForm from "../EncouragementForm";

export default function NewEncouragementPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink dark:text-white">New encouragement</h1>
      <p className="mt-1 text-sm text-ink-soft">Write and publish a new message.</p>
      <div className="mt-6 max-w-2xl">
        <EncouragementForm mode="create" />
      </div>
    </div>
  );
}
