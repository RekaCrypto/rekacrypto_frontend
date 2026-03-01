import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const secret = req.headers.get("x-telegram-secret");

    if (secret !== process.env.TELEGRAM_LINK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { token, chatId } = await req.json();

    if (!token || !chatId) {
      return NextResponse.json(
        { error: "Missing token or chatId" },
        { status: 400 },
      );
    }

    const supabase = await createServerSupabaseClient();

    // 1️⃣ Validate token
    const { data: linkToken, error: tokenError } = await supabase
      .from("telegram_link_tokens")
      .select("user_id, expires_at")
      .eq("token", token)
      .single();

    if (tokenError || !linkToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    if (new Date(linkToken.expires_at) < new Date()) {
      return NextResponse.json({ error: "Token expired" }, { status: 400 });
    }

    const userId = linkToken.user_id;

    // 2️⃣ Upsert into profiles table
    const { error: upsertError } = await supabase.from("profiles").upsert({
      id: userId,
      telegram_chat_id: chatId,
    });

    if (upsertError) {
      console.error(upsertError);
      return NextResponse.json(
        { error: "Failed to link account" },
        { status: 500 },
      );
    }

    // 3️⃣ Delete token (one-time use)
    await supabase.from("telegram_link_tokens").delete().eq("token", token);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
