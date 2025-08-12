import type { CryptoCoin } from '@/lib/supabase'
import { buildHref, CHIP_STYLES, classNames, toggleCoin } from '@/lib/utils'

type CoinFilterProps = {
  coins: CryptoCoin[]
  selectedCoins?: string[]
  extraSelected: string[]
  search?: string
  date?: 'today' | 'week' | 'month' | 'year'
}

function CoinChip({ 
  coin, 
  isActive, 
  href 
}: { 
  coin: CryptoCoin; 
  isActive: boolean; 
  href: string 
}) {
  return (
    <a
      href={href}
      className={classNames(CHIP_STYLES.base, isActive ? CHIP_STYLES.active : CHIP_STYLES.inactive)}
    >
      <span className="inline-flex items-center gap-2">
        {coin.image_link ? (
          <img src={coin.image_link} alt={coin.shortname} className="h-4 w-4 rounded-full" />
        ) : (
          <span className="h-4 w-4 rounded-full bg-gradient-to-br from-primary-500 to-fuchsia-500 inline-block" />
        )}
        <span className="uppercase">{coin.shortname}</span>
      </span>
    </a>
  )
}

function ExtraCoinChip({ 
  shortname, 
  href 
}: { 
  shortname: string; 
  href: string 
}) {
  return (
    <a
      href={href}
      className={classNames(CHIP_STYLES.base, CHIP_STYLES.active)}
    >
      <span className="inline-flex items-center gap-2">
        <span className="h-4 w-4 rounded-full bg-gradient-to-br from-primary-500 to-fuchsia-500 inline-block" />
        <span className="uppercase">{shortname}</span>
      </span>
    </a>
  )
}

export default function CoinFilter({ 
  coins, 
  selectedCoins, 
  extraSelected, 
  search, 
  date 
}: CoinFilterProps) {
  const hasSelection = selectedCoins && selectedCoins.length > 0

  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={buildHref({ search, date })}
        className={classNames(CHIP_STYLES.base, !hasSelection ? CHIP_STYLES.active : CHIP_STYLES.inactive)}
      >
        All coins
      </a>
      
      {coins.map((coin) => {
        const isActive = !!selectedCoins?.includes(coin.shortname)
        const nextCoins = toggleCoin(selectedCoins || [], coin.shortname)
        const href = buildHref({ coins: nextCoins, search, date })
        
        return (
          <CoinChip
            key={coin.id}
            coin={coin}
            isActive={isActive}
            href={href}
          />
        )
      })}
      
      {extraSelected.map((shortname) => {
        const nextCoins = toggleCoin(selectedCoins || [], shortname)
        const href = buildHref({ coins: nextCoins, search, date })
        
        return (
          <ExtraCoinChip
            key={`extra-${shortname}`}
            shortname={shortname}
            href={href}
          />
        )
      })}
    </div>
  )
}
