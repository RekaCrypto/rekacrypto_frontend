import { createServerSupabaseClient } from "../supabase/server";

export type CryptoCoin = {
  id: number;
  shortname: string;
  name: string;
  image_link: string | null;
};

export async function fetchCoins(): Promise<CryptoCoin[]> {
  const client = await createServerSupabaseClient();
  const { data, error } = await client
    .from("crypto_coins")
    .select("id, shortname, name, image_link")
    .order("shortname", { ascending: true });

  if (error) {
    console.error("Error fetching coins:", error);
    throw error;
  }

  return data || [];
}
