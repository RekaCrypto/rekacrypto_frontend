"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function unfollowCoin(coinId: number) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("user_follows")
    .delete()
    .eq("user_id", user.id)
    .eq("coin_id", coinId);

  if (error) throw error;
}
