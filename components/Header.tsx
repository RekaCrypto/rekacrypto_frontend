"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="mb-8">
      <Card className="border-slate-800/50 bg-slate-900/50 shadow-sm">
        <div className="flex h-14 items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
            >
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary-500 to-fuchsia-500" />
              <span className="text-base font-semibold tracking-tight text-white">
                Reka Crypto
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/"
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  pathname === "/"
                    ? "text-white bg-slate-800"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                News
              </Link>
              <Link
                href="/cryptos"
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  pathname === "/cryptos"
                    ? "text-white bg-slate-800"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                Track Cryptos
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <form action="/auth/signout" method="post">
              <Button
                type="submit"
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-white hover:bg-slate-800"
              >
                Sign out
              </Button>
            </form>
          </div>
        </div>
      </Card>
    </header>
  );
}
