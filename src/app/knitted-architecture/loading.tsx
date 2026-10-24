import { SiteHeader } from "@/components/site-header";
import { KaNav } from "@/components/ka-nav";
import { Skeleton } from "@/components/skeleton";

export default function Loading() {
  return (
    <>
      <SiteHeader divisionLabel="Knitted Architecture" />
      <KaNav />
      <div className="container-edge pt-16 pb-16 md:pt-24" role="status" aria-label="Loading">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="mt-5 h-10 w-full max-w-xl" />
        <Skeleton className="mt-3 h-10 w-1/2 max-w-sm" />
        <Skeleton className="mt-6 h-4 w-full max-w-lg" />
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[4/3] w-full" />
          ))}
        </div>
      </div>
    </>
  );
}
