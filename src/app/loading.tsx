import { Skeleton } from "@/components/skeleton";

export default function Loading() {
  return (
    <div className="container-edge pt-24 pb-16 md:pt-32" role="status" aria-label="Loading">
      <Skeleton className="h-3 w-40" />
      <Skeleton className="mt-5 h-12 w-full max-w-xl" />
      <Skeleton className="mt-3 h-12 w-2/3 max-w-md" />
      <Skeleton className="mt-6 h-4 w-full max-w-md" />
      <Skeleton className="mt-2 h-4 w-3/4 max-w-sm" />
      <div className="mt-9 flex gap-4">
        <Skeleton className="h-11 w-48" />
        <Skeleton className="h-11 w-40" />
      </div>
    </div>
  );
}
