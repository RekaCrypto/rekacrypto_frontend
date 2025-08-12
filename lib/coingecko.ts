export type CoinPrice = {
  price: number
  change24h: number
}

// CoinGecko API mapping for shortnames to CoinGecko IDs
export const getCoinGeckoId = (shortname: string): string => {
  const coinGeckoIds: Record<string, string> = {
    'BTC': 'bitcoin',        // Bitcoin
    'ETH': 'ethereum',       // Ethereum  
    'BNB': 'binancecoin',    // BNB
    'USDT': 'tether',        // Tether
    'SOL': 'solana',         // Solana
    'XRP': 'ripple',         // XRP
    'USDC': 'usd-coin',      // USD Coin
    'ADA': 'cardano',        // Cardano
    'DOGE': 'dogecoin',      // Dogecoin
    'AVAX': 'avalanche-2'    // Avalanche
  }
  
  return coinGeckoIds[shortname] || shortname.toLowerCase()
}

// Fetch real prices from CoinGecko API
export const fetchCoinGeckoPrices = async (coinIds: string[]): Promise<Record<string, CoinPrice>> => {
  try {
    const idsString = coinIds.join(',')
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${idsString}&vs_currencies=usd&include_24hr_change=true`,
      { next: { revalidate: 300 } } // Cache for 5 minutes
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch prices')
    }
    
    const data = await response.json()
    
    // Transform CoinGecko response to our format
    const pricesMap: Record<string, CoinPrice> = {}
    Object.entries(data).forEach(([coinId, priceData]: [string, any]) => {
      pricesMap[coinId] = {
        price: priceData.usd || 0,
        change24h: priceData.usd_24h_change || 0
      }
    })
    
    return pricesMap
  } catch (error) {
    console.error('Error fetching CoinGecko prices:', error)
    return {}
  }
}
