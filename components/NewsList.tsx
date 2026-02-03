import NewsCard from "@/components/NewsCard";
import type { CryptoRecap } from "@/lib/supabase";

interface NewsListProps {
  recaps: CryptoRecap[];
}

export default function NewsList({ recaps }: NewsListProps) {
  if (recaps.length === 0) {
    return (
      <div className="max-w-5xl mx-auto text-center py-12">
        <p className="text-slate-400 text-lg">
          No results found. Try a different search term.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {recaps.map((recap) => (
        <NewsCard key={recap.id} recap={recap} coin={recap.coin} />
      ))}
    </div>
  );
}
