import { SiteHeader } from "@/components/site-header";
import { Skeleton } from "@/components/skeleton";

export default function Loading() {
  return (
    <>
      <SiteHeader divisionLabel="Real Estate Development" />
      <main
        className="bg-[var(--color-night)] text-[var(--color-night-ink)] min-h-[70vh]"
        role="status"
        aria-label="Loading"
      >
        <div className="container-edge py-20 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Skeleton tone="night" className="h-3 w-56" />
            <Skeleton tone="night" className="mt-5 h-12 w-full max-w-md" />
            <Skeleton tone="night" className="mt-3 h-12 w-1/2 max-w-xs" />
            <Skeleton tone="night" className="mt-6 h-4 w-full max-w-lg" />
            <Skeleton tone="night" className="mt-2 h-4 w-3/4 max-w-md" />
            <Skeleton tone="night" className="mt-2 h-4 w-2/3 max-w-sm" />
            <div className="mt-9 flex gap-4">
              <Skeleton tone="night" className="h-11 w-44" />
              <Skeleton tone="night" className="h-11 w-36" />
            </div>
          </div>
          <Skeleton tone="night" className="aspect-[4/3] w-full" />
        </div>
      </main>
    </>
  );
}
