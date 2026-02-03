import NewsList from "@/components/NewsList";
import NewsListSkeleton from "@/components/NewsListSkeleton";
import SearchInput from "@/components/SearchInput";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { q } = await searchParams;

  return (
    <div className="space-y-6">
      <SearchInput />
      <Suspense key={q || "all"} fallback={<NewsListSkeleton />}>
        <NewsList search={q} />
      </Suspense>
    </div>
  );
}
