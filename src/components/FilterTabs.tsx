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
      <div className="glass-strong rounded-2xl p-1 flex shadow-glass">
        {tabs.map((t) => {
          const active = filter === t.id
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                active
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'text-muted hover:text-[#0F172A]'
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