export function CardSkeleton() {
  return (
    <div className="card flex h-full flex-col gap-3 p-6">
      <div className="h-3 w-24 animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
      <div className="h-5 w-3/4 animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
      <div className="h-3 w-full animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
      <div className="h-3 w-5/6 animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
      <div className="mt-2 h-3 w-20 animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
    </div>
  );
}

export function CardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
