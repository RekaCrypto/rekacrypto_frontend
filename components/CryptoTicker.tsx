'use client'

import { useCryptoPrices } from '@/hooks/useCryptoPrices'
import type { CryptoCoin } from '@/lib/supabase'
import Marquee from 'react-fast-marquee'

type CryptoTickerProps = {
  coins: CryptoCoin[]
}

export default function CryptoTicker({ coins }: CryptoTickerProps) {
  const { coinsWithPrices, loading, error } = useCryptoPrices(coins)

  if (loading || coinsWithPrices.length === 0) {
    return (
      <div className="h-16 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg flex items-center justify-center">
        <div className="text-slate-400">
          {error ? error : 'Loading ticker...'}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg p-2 mb-6">
      <Marquee
        gradient={true}
        gradientColor="#1e293b"
        gradientWidth={50}
        speed={50}
        pauseOnHover={true}
      >
        {coinsWithPrices.map((coin, index) => (
          <div
            key={`${coin.id}-${index}`}
            className="flex items-center gap-3 mx-6 py-2"
          >
            {coin.image_link ? (
              <img
                src={coin.image_link}
                alt={coin.shortname}
                className="h-6 w-6 rounded-full"
              />
            ) : (
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary-500 to-fuchsia-500" />
            )}
            
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white text-sm">
                {coin.shortname}
              </span>
              <span className="text-slate-300 text-sm">
                ${coin.price.toLocaleString(undefined, { 
                  minimumFractionDigits: 2, 
                  maximumFractionDigits: coin.price < 1 ? 4 : 2 
                })}
              </span>
              <span className={`text-xs font-medium ${
                coin.change24h >= 0 
                  ? 'text-emerald-400' 
                  : 'text-red-400'
              }`}>
                {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  )
}
