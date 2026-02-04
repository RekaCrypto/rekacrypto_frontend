import CryptoList from "@/components/CryptoList";
import CryptoListSkeleton from "@/components/CryptoListSkeleton";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{
    q?: string;
    filter?: "all" | "following";
  }>;
}

export default async function CryptosPage({ searchParams }: PageProps) {
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
      </div>

      <Suspense fallback={<CryptoListSkeleton />}>
        <CryptoList />
      </Suspense>
    </div>
  );
}
