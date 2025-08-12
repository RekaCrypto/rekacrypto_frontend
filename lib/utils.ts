// Parse coins from search params supporting both repeated `coins` and comma-separated values
export function parseCoinsParam(param?: string | string[]): string[] {
  if (!param) return []
  const arr = Array.isArray(param) ? param : [param]
  return Array.from(
    new Set(
      arr
        .flatMap((v) => v.split(','))
        .map((s) => s.trim())
        .filter(Boolean)
    )
  )
}

// Build href preserving state with multi coins
export function buildHref(state: { coins?: string[]; search?: string; date?: 'today' | 'week' | 'month' | 'year' }) {
  const q = new URLSearchParams()
  if (state.search) q.set('search', state.search)
  if (state.date) q.set('date', state.date)
  for (const c of state.coins || []) q.append('coins', c)
  const qs = q.toString()
  return qs ? `/?${qs}` : '/'
}

// Toggle coin selection
export function toggleCoin(current: string[], coin: string): string[] {
  return current.includes(coin) ? current.filter((c) => c !== coin) : [...current, coin]
}

// Format date label for display
export function formatDateLabel(dateKey: string): string {
  const todayKey = new Date().toISOString().slice(0, 10)
  if (dateKey === todayKey) return 'Today'
  const d = new Date(dateKey + 'T00:00:00')
  return d.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })
}

// Group recaps by day
export function groupRecapsByDay(recaps: any[]) {
  const grouped: Record<string, typeof recaps> = {}
  for (const r of recaps) {
    const key = new Date(r.created_at).toISOString().slice(0, 10)
    grouped[key] = grouped[key] || []
    grouped[key].push(r)
  }
  const dayKeys = Object.keys(grouped).sort((a, b) => (a < b ? 1 : -1))
  return { grouped, dayKeys }
}

// Utility for class names
export function classNames(...cls: (string | false | null | undefined)[]): string {
  return cls.filter(Boolean).join(' ')
}

// Chip styling constants
export const CHIP_STYLES = {
  base: 'badge cursor-pointer select-none transition-colors',
  inactive: 'bg-white/5 text-slate-300 ring-white/10 hover:bg-white/10',
  active: 'bg-primary-600 text-white ring-primary-500/40 hover:bg-primary-600'
}
