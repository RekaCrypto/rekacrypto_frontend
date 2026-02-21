"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function followCoin(
  coinId: number,
  frequency: "daily" | "weekly",
) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase.from("user_follows").upsert({
    user_id: user.id,
    coin_id: coinId,
    update_frequency: frequency,
  });

  if (error) throw error;

  revalidatePath("/dashboard"); // adjust if needed
}
