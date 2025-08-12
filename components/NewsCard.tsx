import type { CryptoCoin, CryptoRecap } from '@/lib/supabase'
import { classNames } from '@/lib/utils'
import ExpandableDescription from './ExpandableDescription'

type NewsCardProps = {
  recap: CryptoRecap
  coin?: CryptoCoin
}

export default function NewsCard({ recap, coin }: NewsCardProps) {
  return (
    <li className="card p-4 list-none">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {coin?.image_link ? (
            <img
              src={coin.image_link}
              alt={coin.name}
              className="h-6 w-6 rounded-full flex-shrink-0"
            />
          ) : null}
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-sm font-medium text-slate-200 truncate">
              {coin?.name ?? recap.coin}
            </span>
            {coin?.shortname ? (
              <span className="badge bg-white/5 text-slate-300 ring-white/10">
                {coin.shortname}
              </span>
            ) : null}
          </div>
        </div>

        <span
          className={classNames(
            'badge ring-white/10',
            recap.forecast_indicator === 'bullish' && 'bg-emerald-500/10 text-emerald-300',
            recap.forecast_indicator === 'bearish' && 'bg-rose-500/10 text-rose-300',
            recap.forecast_indicator === 'neutral' && 'bg-amber-500/10 text-amber-300',
          )}
        >
          {recap.forecast_indicator}
        </span>
      </div>

      <h3 className="mt-3 text-base md:text-lg font-semibold text-slate-100">{recap.summary}</h3>
      
      <ExpandableDescription 
        text={recap.description} 
        className="mt-2 text-sm text-slate-300" 
      />

      {recap.sources?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {recap.sources.map((source, i) => (
            <a
              key={i}
              href={source}
              target="_blank"
              className="badge bg-white/5 text-slate-300 ring-white/10 hover:bg-white/10"
            >
              Source {i + 1}
            </a>
          ))}
        </div>
      ) : null}
    </li>
  )
}
