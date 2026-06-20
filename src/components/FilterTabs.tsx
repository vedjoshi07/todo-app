export type Filter = 'all' | 'active' | 'completed'

type Props = {
  filter: Filter
  onChange: (f: Filter) => void
  counts: { all: number; active: number; completed: number }
}

export function FilterTabs({ filter, onChange, counts }: Props) {
  const tabs: { id: Filter; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: counts.all },
    { id: 'active', label: 'Active', count: counts.active },
    { id: 'completed', label: 'Done', count: counts.completed },
  ]
  return (
    <div className="px-4 pt-1 pb-4">
      <div className="bg-white rounded-xl p-1 flex shadow-card">
        {tabs.map((t) => {
          const active = filter === t.id
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                active
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-muted hover:text-primary-onContainer'
              }`}
            >
              {t.label}
              <span className={`ml-1.5 text-xs ${active ? 'text-white/70' : 'text-muted/60'}`}>
                {t.count}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}