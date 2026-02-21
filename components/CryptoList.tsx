import { fetchCoins } from "@/lib/repositories/coins";
import { fetchUserFollowByUser } from "@/lib/repositories/userFollows";
import CryptoCard from "./CryptoCard";

export default async function CryptoList() {
  const coins = await fetchCoins();
  const userFollows = await fetchUserFollowByUser();

  return (
    <div className="space-y-3">
      {coins.map((coin) => {
        const userFollow = userFollows.find(
          (follow) => follow.coin_id === coin.id,
        );
        return <CryptoCard key={coin.id} coin={coin} userFollow={userFollow} />;
      })}
    </div>
  );
}
