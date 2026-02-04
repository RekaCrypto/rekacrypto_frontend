"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";

const authSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function login(formData: FormData) {
  const supabase = await createClient();

  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validatedData = authSchema.safeParse(rawData);

  if (!validatedData.success) {
    console.error("Validation error:", validatedData.error.flatten());
    redirect("login/error");
  }

  const { error } = await supabase.auth.signInWithPassword(validatedData.data);

  if (error) {
    console.error("Login error:", error.message, error);
    redirect("login/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validatedData = authSchema.safeParse(rawData);

  if (!validatedData.success) {
    console.error(z.treeifyError(validatedData.error));
    redirect("login/error");
  }

  const { error } = await supabase.auth.signUp(validatedData.data);

  if (error) {
    console.error("Signup error:", error.message, error);
    redirect("login/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
