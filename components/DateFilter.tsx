import { buildHref, CHIP_STYLES, classNames } from '@/lib/utils'

type DateFilterProps = {
  selectedCoins?: string[]
  search?: string
  currentDate?: 'today' | 'week' | 'month' | 'year'
}

export default function DateFilter({ selectedCoins, search, currentDate }: DateFilterProps) {
  const dateOptions = [
    { key: 'today' as const, label: 'Today' },
    { key: 'week' as const, label: 'This Week' },
    { key: 'month' as const, label: 'This Month' },
    { key: 'year' as const, label: 'This Year' }
  ]

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={buildHref({ coins: selectedCoins, search })}
        className={classNames(CHIP_STYLES.base, !currentDate ? CHIP_STYLES.active : CHIP_STYLES.inactive)}
      >
        All time
      </a>
      {dateOptions.map(({ key, label }) => (
        <a
          key={key}
          href={buildHref({ coins: selectedCoins, search, date: key })}
          className={classNames(CHIP_STYLES.base, currentDate === key ? CHIP_STYLES.active : CHIP_STYLES.inactive)}
        >
          {label}
        </a>
      ))}
    </div>
  )
}
