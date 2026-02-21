import NewsCard from "@/components/NewsCard";
import {
  CryptoRecap,
  fetchCryptoRecaps,
} from "@/lib/repositories/cryptoRecaps";
import Link from "next/link";

interface NewsListProps {
  search?: string;
  coin?: string;
  date?: string;
  sentiment?: string;
  sort?: string;
}

function formatDateLabel(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const isToday = date.toDateString() === today.toDateString();
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (isToday) return "Today";
  if (isYesterday) return "Yesterday";

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function groupRecapsByDay(
  recaps: CryptoRecap[],
): Record<string, CryptoRecap[]> {
  return recaps.reduce(
    (acc, recap) => {
      const date = new Date(recap.created_at).toDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(recap);
      return acc;
    },
    {} as Record<string, CryptoRecap[]>,
  );
}

export default async function NewsList({
  search,
  coin,
  date,
  sentiment,
  sort,
}: NewsListProps) {
  const recaps = await fetchCryptoRecaps({
    search,
    coin,
    date,
    sentiment,
    sort,
  });

  if (recaps.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="card p-8 text-center max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-white mb-3">
            No Results Found
          </h2>
          <p className="text-slate-400 mb-6">
            We couldn't find any crypto news matching your search. Try adjusting
            your search terms or clear the search to see all updates.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-fuchsia-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            View All News
          </Link>
        </div>
      </div>
    );
  }

  const grouped = groupRecapsByDay(recaps);
  const dayKeys = Object.keys(grouped).sort((a, b) => {
    const dateA = new Date(a).getTime();
    const dateB = new Date(b).getTime();
    return sort === "oldest" ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-0">
      {dayKeys.map((day, index) => {
        const dayRecaps = grouped[day];
        const isLast = index === dayKeys.length - 1;

        return (
          <div key={day} className="relative">
            {!isLast && (
              <div className="absolute left-6 top-16 bottom-0 w-px bg-gradient-to-b from-slate-600 to-transparent" />
            )}

            <div className="relative flex items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-primary-500/25">
                <div className="w-3 h-3 rounded-full bg-white" />
              </div>

              <div className="flex-1 ml-6">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-white mb-1">
                    {formatDateLabel(dayRecaps[0].created_at)}
                  </h2>
                  <div className="text-sm text-slate-400">
                    {dayRecaps.length}{" "}
                    {dayRecaps.length === 1 ? "update" : "updates"}
                  </div>
                </div>

                <div className="space-y-4 pb-8">
                  {dayRecaps.map((recap) => (
                    <NewsCard
                      key={recap.id}
                      recap={recap}
                      coin={recap.coin}
                      newsId={recap.id}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
