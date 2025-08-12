import type { CryptoCoin, CryptoRecap } from '@/lib/supabase'
import { formatDateLabel } from '@/lib/utils'
import NewsCard from './NewsCard'

type NewsSectionProps = {
  day: string
  recaps: CryptoRecap[]
  coinMap: Map<string, CryptoCoin>
}

export default function NewsSection({ day, recaps, coinMap }: NewsSectionProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-medium uppercase tracking-wider text-slate-400">
        {formatDateLabel(day)}
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recaps.map((recap) => {
          const coin = coinMap.get(recap.coin)
          return (
            <NewsCard
              key={recap.id}
              recap={recap}
              coin={coin}
            />
          )
        })}
      </ul>
    </section>
  )
}
