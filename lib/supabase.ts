import { createClient } from "@supabase/supabase-js";

export type CryptoRecap = {
  id: number;
  summary: string;
  forecast_indicator: number; // 0-10 scale
  description: string;
  sources: string[];
  coin: string;
  created_at: string;
  updated_at: string;
};

export type CryptoCoin = {
  id: number;
  shortname: string;
  name: string;
  image_link: string | null;
};

export function getSupabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
    );
  }
  return createClient(url, anonKey, {
    auth: { persistSession: false },
    global: {
      headers: {
        "cache-control": "no-cache",
      },
    },
  });
}

export type DateRange = "today" | "week" | "month" | "year";

export async function fetchCryptoRecaps(params: {
  coins?: string[];
  search?: string;
  date?: DateRange;
  limit?: number;
}): Promise<CryptoRecap[]> {
  const { coins, search, date, limit = 50 } = params;
  const supabase = getSupabaseServer();

  let query = supabase
    .from("crypto_recaps")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (coins && coins.length > 0) {
    const coinsData = await fetchCoins();
    const shortNameToFullName = new Map(
      coinsData.map((coin) => [coin.shortname, coin.name]),
    );

    const fullNames = coins
      .map((shortname) => shortNameToFullName.get(shortname))
      .filter(Boolean);

    if (fullNames.length > 0) {
      query = query.in("coin", fullNames);
    }
  }

  if (search?.trim()) {
    const searchTerm = `%${search.trim()}%`;
    query = query.or(
      `summary.ilike.${searchTerm},description.ilike.${searchTerm}`,
    );
  }

  if (date) {
    const now = new Date();
    let startDate: Date;

    switch (date) {
      case "today":
        startDate = new Date(now);
        startDate.setHours(0, 0, 0, 0);
        break;
      case "week":
        const dayOfWeek = now.getDay();
        const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        startDate = new Date(now);
        startDate.setDate(now.getDate() - daysFromMonday);
        startDate.setHours(0, 0, 0, 0);
        break;
      case "month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "year":
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        throw new Error(`Invalid date range: ${date}`);
    }

    query = query.gte("created_at", startDate.toISOString());
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching crypto recaps:", error);
    throw error;
  }

  return data || [];
}

export async function fetchCoins(): Promise<CryptoCoin[]> {
  const supabase = getSupabaseServer();

  const { data, error } = await supabase
    .from("crypto_coins")
    .select("id, shortname, name, image_link")
    .order("shortname", { ascending: true });

  if (error) {
    console.error("Error fetching coins:", error);
    throw error;
  }

  return data || [];
}
