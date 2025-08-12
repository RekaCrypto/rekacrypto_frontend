type SearchFormProps = {
  search?: string
  selectedCoins?: string[]
  date?: 'today' | 'week' | 'month' | 'year'
}

export default function SearchForm({ search, selectedCoins, date }: SearchFormProps) {
  return (
    <form className="card p-4 grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto]" action="/">
      <input
        type="text"
        name="search"
        placeholder="Search in summary or description..."
        defaultValue={search}
        className="input"
      />
      
      {/* preserve current filters on search */}
      {selectedCoins?.map((coin) => (
        <input key={coin} type="hidden" name="coins" value={coin} />
      ))}
      {date && <input type="hidden" name="date" value={date} />}
      
      <button className="button" type="submit">
        Search
      </button>
    </form>
  )
}
