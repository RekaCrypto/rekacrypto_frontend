import { Skeleton } from "./ui/skeleton";

export default function CryptoListSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="card p-4 flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-[110px]" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}
