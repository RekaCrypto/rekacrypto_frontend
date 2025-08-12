import Header from '@/components/Header'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Reka Crypto News',
  description: 'Curated crypto recaps with filters',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-slate-100 antialiased">
        <div className="pointer-events-none fixed inset-0 -z-10 opacity-30">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-gradient-to-br from-primary-500/40 to-fuchsia-500/40 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-emerald-500/40 to-cyan-500/40 blur-3xl" />
        </div>
        <main className="container mx-auto max-w-6xl px-4 py-10">
          <Header />
          {children}
        </main>
      </body>
    </html>
  )
}
