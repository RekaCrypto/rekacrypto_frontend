import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-slate-800 bg-slate-900/50 p-8 shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Access your crypto news dashboard
          </p>
        </div>

        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email address"
                className="border-slate-700 bg-slate-800/50 text-slate-100 placeholder-slate-400 focus-visible:border-blue-500 focus-visible:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Password"
                className="border-slate-700 bg-slate-800/50 text-slate-100 placeholder-slate-400 focus-visible:border-blue-500 focus-visible:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              formAction={login}
              className="w-full bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign in
            </Button>
            <Button
              formAction={signup}
              variant="outline"
              className="w-full border-slate-700 bg-slate-800 text-white hover:bg-slate-700 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              Sign up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
