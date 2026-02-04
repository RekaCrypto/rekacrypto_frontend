"use client";

import { useRouter } from "next/navigation";
import CryptoCard from "./CryptoCard";

interface CryptoListClientProps {
  coins: Array<{
    id: number;
    shortname: string;
    name: string;
    image_link: string | null;
  }>;
  userId: string | null;
}

export default function CryptoListClient({
  coins,
  userId,
}: CryptoListClientProps) {
  const router = useRouter();

  const handleToggleTracking = async (
    coinId: number,
    frequency: "daily" | "weekly" | null,
  ) => {
    if (!userId) {
      // Redirect to login if not authenticated
      router.push("/login");
      return;
    }

    // TODO: Implement database tracking when ready
    console.log(
      `Toggle tracking for coin ${coinId} with frequency ${frequency}`,
    );
  };

  if (coins.length === 0) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="card p-8 text-center max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-3">
            No Cryptocurrencies Found
          </h2>
          <p className="text-slate-400">
            We couldn't find any cryptocurrencies. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {coins.map((coin) => (
        <CryptoCard
          key={coin.id}
          coin={coin}
          onToggleTracking={handleToggleTracking}
        />
      ))}
    </div>
  );
}
