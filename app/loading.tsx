import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <li key={i} className="card p-4 list-none">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Skeleton className="h-6 w-6 rounded-full flex-shrink-0" />
              <div className="flex items-center gap-2 min-w-0">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-5 w-12 rounded-full" />
              </div>
            </div>
            <div className="flex items-center gap-2.5 min-w-[100px]">
              <Skeleton className="h-2 flex-1 rounded-full" />
              <Skeleton className="h-4 w-5" />
            </div>
          </div>

          <div className="mt-3 space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
          </div>

          <div className="mt-2 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>
        </li>
      ))}
    </div>
  );
}
