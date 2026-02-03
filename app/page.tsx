import NewsFilters from "@/components/NewsFilters";
import NewsList from "@/components/NewsList";
import NewsListSkeleton from "@/components/NewsListSkeleton";
import SearchInput from "@/components/SearchInput";
import { Suspense } from "react";
export const dynamic = "force-dynamic";
interface PageProps {
  searchParams: Promise<{
    q?: string;
    coin?: string;
    date?: string;
    sentiment?: string;
    sort?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <div className="space-y-6">
      <SearchInput />
      <NewsFilters />
      <Suspense key={JSON.stringify(params)} fallback={<NewsListSkeleton />}>
        <NewsList
          search={params.q}
          coin={params.coin}
          date={params.date}
          sentiment={params.sentiment}
          sort={params.sort}
        />
      </Suspense>
    </div>
  );
}
