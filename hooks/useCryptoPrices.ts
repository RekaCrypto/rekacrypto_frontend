'use client'

import { fetchCoinGeckoPrices, getCoinGeckoId } from '@/lib/coingecko'
import type { CryptoCoin } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export type CoinWithPrice = CryptoCoin & {
  price: number
  change24h: number
}

export function useCryptoPrices(coins: CryptoCoin[]) {
  const [coinsWithPrices, setCoinsWithPrices] = useState<CoinWithPrice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPrices = async () => {
      if (coins.length === 0) {
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)
      
      try {
        // Get CoinGecko IDs for all coins
        const coinGeckoIds = coins.map(coin => getCoinGeckoId(coin.shortname))
        
        // Fetch prices from CoinGecko
        const pricesData = await fetchCoinGeckoPrices(coinGeckoIds)
        
        // Combine coin data with prices
        const enrichedCoins = coins.map(coin => {
          const coinGeckoId = getCoinGeckoId(coin.shortname)
          const priceInfo = pricesData[coinGeckoId] || { price: 0, change24h: 0 }
          
          return {
            ...coin,
            ...priceInfo
          }
        }).filter(coin => coin.price > 0) // Only show coins with valid prices
        
        setCoinsWithPrices(enrichedCoins)
      } catch (err) {
        setError('Failed to fetch crypto prices')
        console.error('Error in useCryptoPrices:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPrices()
  }, [coins])

  return { coinsWithPrices, loading, error }
}
