import NewsList from "@/components/NewsList";
import SearchInput from "@/components/SearchInput";
import { fetchCryptoRecaps } from "@/lib/supabase";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const recaps = await fetchCryptoRecaps();

  const filteredRecaps = q
    ? recaps.filter(
        (recap) =>
          recap.title.toLowerCase().includes(q.toLowerCase()) ||
          recap.description.toLowerCase().includes(q.toLowerCase()) ||
          recap.coin.name?.toLowerCase().includes(q.toLowerCase()),
      )
    : recaps;

  return (
    <div className="space-y-6">
      <Suspense>
        <SearchInput />
      </Suspense>
      <NewsList recaps={filteredRecaps} />
    </div>
  );
}
