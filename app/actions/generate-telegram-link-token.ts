"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { randomUUID } from "crypto";

export async function generateTelegramLinkToken() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const token = randomUUID();

  await supabase.from("telegram_link_tokens").insert({
    token,
    user_id: user.id,
    expires_at: new Date(Date.now() + 10 * 60 * 1000),
  });

  return token;
}
