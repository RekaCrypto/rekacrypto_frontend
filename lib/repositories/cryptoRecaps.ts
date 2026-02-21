import { createServerSupabaseClient } from "../supabase/server";
import { CryptoCoin } from "./coins";

export interface FetchCryptoRecapsOptions {
  limit?: number;
  search?: string;
  coin?: string;
  date?: string;
  sentiment?: string;
  sort?: string;
}

export type CryptoRecap = {
  id: number;
  title: string;
  summary: string;
  forecast_indicator: number;
  description: string;
  sources: string[];
  coin: CryptoCoin;
  created_at: string;
  updated_at: string;
};

export async function fetchCryptoRecaps(
  options: FetchCryptoRecapsOptions = {},
): Promise<CryptoRecap[]> {
  const client = await createServerSupabaseClient();
  const { limit = 10, search, coin, date, sentiment, sort } = options;

  const coinJoin = coin && coin !== "all" ? "!inner" : "";

  const sortAscending = sort === "oldest";

  let query = client
    .from("crypto_recaps")
    .select(
      `
      id,
      title,
      summary,
      forecast_indicator,
      description,
      sources,
      created_at,
      updated_at,
      coin:crypto_coins!crypto_recaps_coin_id_fkey${coinJoin}(
        id,
        shortname,
        name,
        image_link
      )
    `,
    )
    .order("created_at", { ascending: sortAscending })
    .limit(limit);

  if (coin && coin !== "all") {
    query = query.ilike("coin.shortname", coin);
  }

  if (date && date !== "all") {
    const now = new Date();
    let startDate: Date;

    switch (date) {
      case "today":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case "week":
        const dayOfWeek = now.getDay();
        const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        startDate = new Date(now);
        startDate.setDate(now.getDate() - daysToMonday);
        startDate.setHours(0, 0, 0, 0);
        break;
      case "month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      default:
        startDate = new Date(0);
    }

    query = query.gte("created_at", startDate.toISOString());
  }

  if (sentiment && sentiment !== "all") {
    switch (sentiment) {
      case "positive":
        query = query.gte("forecast_indicator", 7);
        break;
      case "neutral":
        query = query.gte("forecast_indicator", 4).lt("forecast_indicator", 7);
        break;
      case "negative":
        query = query.lt("forecast_indicator", 4);
        break;
    }
  }

  if (search) {
    const searchTerm = `%${search}%`;
    query = query.or(
      `title.ilike.${searchTerm},description.ilike.${searchTerm}`,
    );
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching crypto recaps:", error);
    throw error;
  }

  return (data as any) || [];
}
