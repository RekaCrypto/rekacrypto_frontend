import { createClient } from "@/lib/supabase/server";
import { Button } from "./ui/button";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="mb-8 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-fuchsia-500" />
        <span className="text-xl font-semibold">Reka Crypto</span>
      </div>

      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400">{user.email}</span>
          <form action="/auth/signout" method="post">
            <Button
              type="submit"
              className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              Sign out
            </Button>
          </form>
        </div>
      )}
    </header>
  );
}
