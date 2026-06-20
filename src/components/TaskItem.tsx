import { useState } from 'react'
import type { Task } from '../types'

type Props = {
  task: Task
  onToggle: (id: string) => void
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

function formatDue(dueAt: string | null): { label: string; overdue: boolean } | null {
  if (!dueAt) return null
  const d = new Date(dueAt)
  if (Number.isNaN(d.getTime())) return null
  const now = new Date()
  const sameDay =
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  const time = d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
  if (sameDay) return { label: `Today · ${time}`, overdue: d.getTime() < now.getTime() }
  const tomorrow = new Date(now)
  tomorrow.setDate(now.getDate() + 1)
  const isTomorrow =
    d.getFullYear() === tomorrow.getFullYear() &&
    d.getMonth() === tomorrow.getMonth() &&
    d.getDate() === tomorrow.getDate()
  if (isTomorrow) return { label: `Tomorrow · ${time}`, overdue: d.getTime() < now.getTime() }
  const date = d.toLocaleDateString([], { month: 'short', day: 'numeric' })
  return { label: `${date} · ${time}`, overdue: d.getTime() < now.getTime() }
}

export function TaskItem({ task, onToggle, onEdit, onDelete }: Props) {
  const [swiped, setSwiped] = useState(false)
  const due = formatDue(task.dueAt)

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div className="absolute inset-y-0 right-0 w-20 bg-destructive/90 flex items-center justify-center rounded-2xl">
        <button
          onClick={() => onDelete(task.id)}
          className="w-full h-full flex items-center justify-center text-white"
          aria-label="Delete task"
        >
          <TrashIcon />
        </button>
      </div>

      <div
        onClick={() => onEdit(task)}
        className={`relative glass rounded-2xl px-4 py-3.5 flex items-start gap-3.5 shadow-glass transition-all duration-300 ease-out hover:shadow-glass-lg hover:border-primary/20 ${
          swiped ? '-translate-x-20' : 'translate-x-0'
        }`}
        onTouchStart={(e) => {
          const x = e.touches[0].clientX
          const onMove = (ev: TouchEvent) => {
            const dx = ev.touches[0].clientX - x
            if (dx < -40) setSwiped(true)
            else if (dx > 40) setSwiped(false)
          }
          const onEnd = () => {
            window.removeEventListener('touchmove', onMove)
            window.removeEventListener('touchend', onEnd)
          }
          window.addEventListener('touchmove', onMove)
          window.addEventListener('touchend', onEnd)
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggle(task.id)
          }}
          className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            task.completed
              ? 'bg-primary border-primary'
              : 'border-slate-300 hover:border-primary hover:bg-primary/5'
          }`}
          aria-label={task.completed ? 'Mark active' : 'Mark complete'}
        >
          {task.completed && (
            <svg viewBox="0 0 16 16" className="w-4 h-4 pop" fill="none">
              <path d="M3 8.5l3.2 3 6-7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <p
            className={`text-[15px] font-medium leading-snug ${
              task.completed ? 'line-through text-slate-400' : 'text-[#0F172A]'
            }`}
          >
            {task.title}
          </p>
          {task.notes && (
            <p className={`mt-0.5 text-sm leading-snug ${task.completed ? 'text-slate-300 line-through' : 'text-muted'}`}>
              {task.notes}
            </p>
          )}
          {due && (
            <div className="mt-1.5 flex items-center gap-1.5">
              <ClockIcon overdue={due.overdue && !task.completed} />
              <span
                className={`text-xs ${
                  due.overdue && !task.completed ? 'text-destructive font-semibold' : 'text-muted'
                }`}
              >
                {due.label}
                {task.reminder && !task.completed && (
                  <span className="ml-1.5 text-primary font-medium">· reminder on</span>
                )}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete(task.id)
          }}
          className="mt-0.5 p-1.5 rounded-xl text-slate-300 hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
          aria-label="Delete task"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

function ClockIcon({ overdue }: { overdue: boolean }) {
  const stroke = overdue ? '#EF4444' : '#94A3B8'
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="1.8" />
      <path d="M12 7v5l3 2" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function TrashIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M5 7h14M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}