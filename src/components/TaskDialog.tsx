import { useEffect, useState } from 'react'

type DraftTask = {
  id?: string
  title: string
  notes: string
  dueAt: string | null
  reminder: boolean
}

type Props = {
  open: boolean
  draft: DraftTask
  onChange: (d: DraftTask) => void
  onClose: () => void
  onSave: (d: DraftTask) => void
}

function toLocalInput(iso: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  // YYYY-MM-DDTHH:MM
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function fromLocalInput(value: string): string | null {
  if (!value) return null
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return null
  return d.toISOString()
}

export function TaskDialog({ open, draft, onChange, onClose, onSave }: Props) {
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    if (open) setShowError(false)
  }, [open])

  if (!open) return null

  const isEditing = Boolean(draft.id)
  const canSubmit = draft.title.trim().length > 0

  function handleSave() {
    if (!canSubmit) {
      setShowError(true)
      return
    }
    onSave(draft)
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center bg-[#0F172A]/20 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-[480px] glass-strong rounded-t-2xl sm:rounded-2xl shadow-glass-lg px-5 pt-4 pb-6 safe-bottom"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-slate-300 sm:hidden" />

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#0F172A]">{isEditing ? 'Edit task' : 'New task'}</h2>
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 rounded-xl transition-colors"
          >
            Cancel
          </button>
        </div>

        <label className="block">
          <span className="text-xs text-muted font-medium">Title</span>
          <input
            autoFocus
            value={draft.title}
            onChange={(e) => onChange({ ...draft, title: e.target.value })}
            placeholder="What needs doing?"
            className="mt-1 w-full bg-white/60 rounded-xl border border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none px-4 py-2.5 text-base text-[#0F172A] placeholder:text-muted/50 transition-all"
          />
          {showError && (
            <span className="text-xs text-destructive mt-1.5 block font-medium">Title is required.</span>
          )}
        </label>

        <label className="block mt-4">
          <span className="text-xs text-muted font-medium">Notes (optional)</span>
          <textarea
            value={draft.notes}
            onChange={(e) => onChange({ ...draft, notes: e.target.value })}
            placeholder="Any details…"
            rows={2}
            className="mt-1 w-full bg-white/60 rounded-xl border border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none px-4 py-2.5 text-base text-[#0F172A] placeholder:text-muted/50 resize-none transition-all"
          />
        </label>

        <div className="mt-4">
          <span className="text-xs text-muted font-medium">Due date</span>
          <div className="mt-1 flex items-center gap-2">
            <input
              type="datetime-local"
              value={toLocalInput(draft.dueAt)}
              onChange={(e) => onChange({ ...draft, dueAt: fromLocalInput(e.target.value) })}
              className="flex-1 bg-white/60 rounded-xl border border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none px-4 py-2.5 text-base text-[#0F172A] transition-all"
            />
            {draft.dueAt && (
              <button
                onClick={() => onChange({ ...draft, dueAt: null })}
                className="text-xs font-medium text-primary hover:text-primary-light px-2 py-1"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <label className="mt-4 flex items-center justify-between px-0.5">
          <div>
            <span className="text-sm text-[#0F172A] font-medium">Reminder</span>
            <p className="text-xs text-muted">Get a notification when due.</p>
          </div>
          <button
            onClick={() => onChange({ ...draft, reminder: !draft.reminder })}
            className={`w-11 h-6 rounded-full transition-all duration-300 relative ${
              draft.reminder ? 'bg-primary shadow-sm shadow-primary/30' : 'bg-slate-300'
            }`}
            aria-pressed={draft.reminder}
            aria-label="Toggle reminder"
            type="button"
          >
            <span
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-300 ${
                draft.reminder ? 'translate-x-[22px]' : 'translate-x-0.5'
              }`}
            />
          </button>
        </label>

        <button
          onClick={handleSave}
          disabled={!canSubmit}
          className="mt-6 w-full py-3 rounded-xl bg-primary text-white font-semibold shadow-lg shadow-primary/25 hover:bg-primary-light hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 disabled:shadow-none"
        >
          {isEditing ? 'Save changes' : 'Add task'}
        </button>
      </div>
    </div>
  )
}