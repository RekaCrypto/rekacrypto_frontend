import Header from "@/components/Header";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reka Crypto News",
  description: "Get the most recent crypto news summaries easy to read.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-slate-100 antialiased">
        <main className="container mx-auto max-w-6xl px-4 py-10">
          <Header />
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
