import { CardSkeletonGrid } from "@/components/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="container-page py-16">
      <div className="mx-auto mb-10 h-8 w-64 animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
      <CardSkeletonGrid />
    </div>
  );
}
