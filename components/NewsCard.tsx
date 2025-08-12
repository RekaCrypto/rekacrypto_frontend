import type { CryptoCoin, CryptoRecap } from '@/lib/supabase'
import { classNames } from '@/lib/utils'

type NewsCardProps = {
  recap: CryptoRecap
  coin?: CryptoCoin
}

export default function NewsCard({ recap, coin }: NewsCardProps) {
  return (
    <li className="card p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-slate-400">
          {new Date(recap.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
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
      
      <h3 className="mt-2 text-lg font-semibold">{recap.summary}</h3>
      <p className="mt-2 line-clamp-4 text-sm text-slate-300">{recap.description}</p>
      
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
      
      <div className="mt-4 flex items-center justify-between">
        <span className="badge bg-white/5 text-slate-300 ring-white/10 inline-flex items-center gap-2">
          {coin?.image_link ? (
            <img src={coin.image_link} alt={recap.coin} className="h-4 w-4 rounded-full" />
          ) : (
            <span className="h-4 w-4 rounded-full bg-gradient-to-br from-primary-500 to-fuchsia-500 inline-block" />
          )}
          <span className="uppercase">{recap.coin}</span>
        </span>
      </div>
    </li>
  )
}
