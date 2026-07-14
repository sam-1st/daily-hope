import Link from "next/link";
import { Sunrise } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <Sunrise size={32} className="text-gold-500" />
      <h1 className="mt-4 font-display text-3xl font-semibold text-ink dark:text-white">Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-ink-soft">
        The page you're looking for has moved or doesn't exist.
      </p>
      <Link href="/" className="btn-primary mt-6">Back to home</Link>
    </div>
  );
}
