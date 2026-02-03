import { createClient } from "@supabase/supabase-js";

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

const supabase = getSupabaseServer();

export type DateRange = "today" | "week" | "month" | "year";

export async function fetchCoins(): Promise<CryptoCoin[]> {
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

export interface FetchCryptoRecapsOptions {
  limit?: number;
  coinName?: string;
  dateRange?: DateRange;
}

export async function fetchCryptoRecaps(
  options: FetchCryptoRecapsOptions = {},
): Promise<CryptoRecap[]> {
  const { limit = 50, coinName, dateRange } = options;

  let query = supabase
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
      coin:crypto_coins!crypto_recaps_coin_id_fkey(
        id,
        shortname,
        name,
        image_link
      )
    `,
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  // Filter by coin name if provided
  // if (coinName) {
  //   query = query.eq("coin", coinName);
  // }

  // Filter by date range if provided
  // if (dateRange) {
  //   const now = new Date();
  //   let startDate: Date;

  //   switch (dateRange) {
  //     case "today":
  //       startDate = new Date(now.setHours(0, 0, 0, 0));
  //       break;
  //     case "week":
  //       startDate = new Date(now.setDate(now.getDate() - 7));
  //       break;
  //     case "month":
  //       startDate = new Date(now.setMonth(now.getMonth() - 1));
  //       break;
  //     case "year":
  //       startDate = new Date(now.setFullYear(now.getFullYear() - 1));
  //       break;
  //   }

  //   query = query.gte("created_at", startDate.toISOString());
  // }

  const { data, error } = await query;

  await new Promise((res) => setTimeout(res, 1000));

  if (error) {
    console.error("Error fetching crypto recaps:", error);
    throw error;
  }

  return (data as any) || [];
}
