import CryptoListClient from "@/components/CryptoListClient";
import SearchInput from "@/components/SearchInput";
import { fetchCoins } from "@/lib/supabase";
import { createClient } from "@/lib/supabase/server";

interface PageProps {
  searchParams: Promise<{
    q?: string;
    filter?: "all" | "following";
  }>;
}

export default async function CryptosPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let coins = await fetchCoins();

  // Apply search filter
  if (params.q) {
    const searchLower = params.q.toLowerCase();
    coins = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchLower) ||
        coin.shortname.toLowerCase().includes(searchLower),
    );
  }

  // Mock following count for UI demo
  const followingCount = 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Track Cryptocurrencies
          </h1>
          <p className="text-slate-400">
            Follow your favorite cryptocurrencies and get daily or weekly
            updates
          </p>
        </div>
        {followingCount > 0 && (
          <div className="card px-4 py-2">
            <span className="text-sm text-slate-400">Following: </span>
            <span className="text-lg font-semibold text-white">
              {followingCount}
            </span>
          </div>
        )}
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <SearchInput />
        </div>
        <div className="flex gap-2">
          <a
            href="/cryptos"
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              params.filter !== "following"
                ? "bg-primary-600 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            All
          </a>
          <a
            href="/cryptos?filter=following"
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              params.filter === "following"
                ? "bg-primary-600 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Following
          </a>
        </div>
      </div>

      <CryptoListClient coins={coins} userId={user?.id || null} />
    </div>
  );
}
