import type { CryptoCoin, CryptoRecap } from '@/lib/supabase'
import TimelineItem from './TimelineItem'

type NewsTimelineProps = {
  grouped: Record<string, CryptoRecap[]>
  dayKeys: string[]
  coinMap: Map<string, CryptoCoin>
}

export default function NewsTimeline({ grouped, dayKeys, coinMap }: NewsTimelineProps) {
  if (dayKeys.length === 0) {
    return (
      <div className="card p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
          <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-slate-300 mb-2">No news found</h3>
        <p className="text-slate-400">Try adjusting your filters or search terms.</p>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Timeline header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">News Timeline</h2>
          <p className="text-sm text-slate-400">
            {dayKeys.length} {dayKeys.length === 1 ? 'day' : 'days'} • {' '}
            {Object.values(grouped).flat().length} total updates
          </p>
        </div>
      </div>

      {/* Timeline items */}
      <div className="space-y-0">
        {dayKeys.map((day, index) => (
          <TimelineItem
            key={day}
            day={day}
            recaps={grouped[day]}
            coinMap={coinMap}
            isLast={index === dayKeys.length - 1}
          />
        ))}
      </div>
    </div>
  )
}
