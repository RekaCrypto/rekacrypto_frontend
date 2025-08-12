import type { CryptoCoin, CryptoRecap } from '@/lib/supabase'
import { formatDateLabel } from '@/lib/utils'
import NewsCard from './NewsCard'

type TimelineItemProps = {
  day: string
  recaps: CryptoRecap[]
  coinMap: Map<string, CryptoCoin>
  isLast: boolean
}

export default function TimelineItem({ day, recaps, coinMap, isLast }: TimelineItemProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-6 top-16 bottom-0 w-px bg-gradient-to-b from-slate-600 to-transparent" />
      )}
      
      {/* Timeline dot */}
      <div className="relative flex items-start">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-primary-500/25">
          <div className="w-3 h-3 rounded-full bg-white" />
        </div>
        
        {/* Content */}
        <div className="flex-1 ml-6">
          {/* Date header */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white mb-1">
              {formatDateLabel(day)}
            </h2>
            <div className="text-sm text-slate-400">
              {recaps.length} {recaps.length === 1 ? 'update' : 'updates'}
            </div>
          </div>
          
          {/* News cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pb-8">
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
          </div>
        </div>
      </div>
    </div>
  )
}
