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
  search?: string;
  coin?: string;
}

export async function fetchCryptoRecaps(
  options: FetchCryptoRecapsOptions = {},
): Promise<CryptoRecap[]> {
  const { limit = 10, search, coin } = options;

  const coinJoin = coin && coin !== "all" ? "!inner" : "";

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
      coin:crypto_coins${coinJoin}!crypto_recaps_coin_id_fkey(
        id,
        shortname,
        name,
        image_link
      )
    `,
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (coin && coin !== "all") {
    query = query.ilike("coin.shortname", coin);
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
