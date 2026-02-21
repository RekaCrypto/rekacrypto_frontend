import { createServerSupabaseClient } from "../supabase/server";

export type UserFollow = {
  user_id: string;
  coin_id: number;
  created_at: string;
  update_frequency: "daily" | "weekly";
};

export async function fetchUserFollowByUser(): Promise<Partial<UserFollow>[]> {
  const client = await createServerSupabaseClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await client
    .from("user_follows")
    .select("update_frequency, coin_id")
    .eq("user_id", user.id);

  if (error) {
    console.error("Error fetching user follows:", error);
    throw error;
  }

  return data || [];
}
