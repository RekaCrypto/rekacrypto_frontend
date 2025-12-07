import CoinFilter from "@/components/CoinFilter";
import CryptoTicker from "@/components/CryptoTicker";
import DateFilter from "@/components/DateFilter";
import NewsTimeline from "@/components/NewsTimeline";
import SearchForm from "@/components/SearchForm";
import { fetchCoins, fetchCryptoRecaps } from "@/lib/supabase";
import { groupRecapsByDay, parseCoinsParam } from "@/lib/utils";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

type NewsListProps = {
  coins?: string[];
  search?: string;
  date?: "today" | "week" | "month" | "year";
};

async function NewsList({ coins: selectedCoins, search, date }: NewsListProps) {
  const [coins, recaps] = await Promise.all([
    fetchCoins(),
    fetchCryptoRecaps({ coins: selectedCoins, search, date, limit: 200 }),
  ]);

  const coinMap = new Map(coins.map((c) => [c.name, c]));
  const { grouped, dayKeys } = groupRecapsByDay(recaps);

  return (
    <div className="space-y-6">
      <CryptoTicker coins={coins} />

      <SearchForm search={search} selectedCoins={selectedCoins} date={date} />

      <DateFilter
        selectedCoins={selectedCoins}
        search={search}
        currentDate={date}
      />

      <CoinFilter
        coins={coins}
        selectedCoins={selectedCoins}
        search={search}
        date={date}
      />

      <NewsTimeline grouped={grouped} dayKeys={dayKeys} coinMap={coinMap} />
    </div>
  );
}

type PageProps = {
  searchParams: Promise<{
    coins?: string | string[];
    search?: string;
    date?: "today" | "week" | "month" | "year";
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const coins = parseCoinsParam(params?.coins);
  const search = params?.search || undefined;
  const date =
    (params?.date as "today" | "week" | "month" | "year" | undefined) ||
    undefined;

  return (
    <Suspense fallback={<div className="text-slate-400">Loading...</div>}>
      <NewsList coins={coins} search={search} date={date} />
    </Suspense>
  );
}
