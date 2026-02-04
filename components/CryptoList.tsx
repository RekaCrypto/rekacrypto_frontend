import { fetchCoins } from "@/lib/supabase";
import CryptoCard from "./CryptoCard";

export default async function CryptoList() {
  const coins = await fetchCoins();

  return (
    <div className="space-y-3">
      {coins.map((coin) => (
        <CryptoCard key={coin.id} coin={coin} />
      ))}
    </div>
  );
}
