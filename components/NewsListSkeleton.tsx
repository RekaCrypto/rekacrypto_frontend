export default function NewsListSkeleton() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="relative flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-700" />
          <div className="flex-1 ml-6">
            <div className="h-6 bg-slate-700 rounded w-32 mb-2" />
            <div className="h-4 bg-slate-700 rounded w-24 mb-4" />
            <div className="space-y-4">
              <div className="h-48 bg-slate-700 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
