import type { Filter } from './FilterTabs'

type Props = { filter: Filter }

export function EmptyState({ filter }: Props) {
  const messages: Record<Filter, { title: string; body: string }> = {
    all: {
      title: 'No tasks yet',
      body: 'Tap the + button to add your first task. We\'ll keep it tidy here.',
    },
    active: {
      title: 'Nothing active',
      body: 'You\'re all caught up. Enjoy a moment of focus.',
    },
    completed: {
      title: 'Nothing completed yet',
      body: 'Finish a task and it\'ll show up here. Small wins matter.',
    },
  }
  const m = messages[filter]
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-20">
      <Illustration />
      <h3 className="mt-6 text-lg font-semibold text-[#134E4A]">{m.title}</h3>
      <p className="mt-1.5 text-sm text-muted max-w-xs leading-relaxed">{m.body}</p>
    </div>
  )
}

function Illustration() {
  return (
    <svg width="160" height="120" viewBox="0 0 160 120" fill="none" aria-hidden>
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#CCFBF1" />
          <stop offset="100%" stopColor="#99F6E4" />
        </linearGradient>
      </defs>
      <rect x="20" y="18" width="120" height="92" rx="14" fill="url(#g1)" />
      <rect x="34" y="34" width="92" height="10" rx="5" fill="#fff" />
      <rect x="34" y="52" width="72" height="8" rx="4" fill="#fff" opacity="0.7" />
      <rect x="34" y="68" width="84" height="8" rx="4" fill="#fff" opacity="0.7" />
      <circle cx="120" cy="90" r="14" fill="#0D9488" />
      <path d="M114 90.5l4 4 8-8" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}