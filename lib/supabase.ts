import { createClient } from '@supabase/supabase-js'

export type CryptoRecap = {
  id: number
  summary: string
  forecast_indicator: 'bullish' | 'bearish' | 'neutral'
  description: string
  sources: string[]
  coin: string // shortname the recap relates to
  created_at: string
  updated_at: string
}

export type CryptoCoin = {
  id: number
  shortname: string
  name: string
  image_link: string | null
}

export function getSupabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anonKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }
  return createClient(url, anonKey, {
    auth: { persistSession: false },
  })
}

export type DateRange = 'today' | 'week' | 'month' | 'year'

export async function fetchCryptoRecaps(params: {
  coins?: string[] // list of shortnames
  search?: string
  date?: DateRange
  limit?: number
}) {
  const { coins, search, date, limit = 50 } = params
  const supabase = getSupabaseServer()

  let query = supabase
    .from('crypto_recaps')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (coins && coins.length) {
    query = query.in('coin', coins)
  }

  if (search && search.trim()) {
    const s = `%${search.trim()}%`
    query = query.or(`summary.ilike.${s},description.ilike.${s}`)
  }

  if (date) {
    const now = new Date()
    let start = new Date(now)
    if (date === 'today') {
      start.setHours(0, 0, 0, 0)
    } else if (date === 'week') {
      // Get start of current week (Monday)
      const dayOfWeek = now.getDay()
      const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1 // Sunday is 0, make Monday = 0
      start = new Date(now)
      start.setDate(now.getDate() - daysFromMonday)
      start.setHours(0, 0, 0, 0)
    } else if (date === 'month') {
      start = new Date(now.getFullYear(), now.getMonth(), 1)
    } else if (date === 'year') {
      start = new Date(now.getFullYear(), 0, 1)
    }
    query = query.gte('created_at', start.toISOString())
  }

  const { data, error } = await query
  if (error) throw error
  return data as CryptoRecap[]
}

export async function fetchCoins(): Promise<CryptoCoin[]> {
  const supabase = getSupabaseServer()
  const { data, error } = await supabase
    .from('crypto_coins')
    .select('id, shortname, name, image_link')
    .order('shortname', { ascending: true })

  if (error) {
    // Fallback to recaps-derived coins if table is protected or errors
    return fallbackCoinsFromRecaps(supabase)
  }

  if (!data || data.length === 0) {
    return fallbackCoinsFromRecaps(supabase)
  }

  return data as CryptoCoin[]
}

async function fallbackCoinsFromRecaps(supabase: ReturnType<typeof getSupabaseServer>): Promise<CryptoCoin[]> {
  const { data } = await supabase
    .from('crypto_recaps')
    .select('coin')
    .order('coin', { ascending: true })
    .limit(5000)

  const set = new Set<string>((data as any[])?.map((d) => d.coin).filter(Boolean) ?? [])
  const list = Array.from(set).sort((a, b) => a.localeCompare(b))
  return list.map((sn, idx) => ({ id: idx + 1, shortname: sn, name: sn.toUpperCase(), image_link: null }))
}
