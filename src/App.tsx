import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Task } from './types'
import { taskRepo } from './taskRepo'
import { notificationsSupported, requestNotificationPermission, startReminderLoop, stopReminderLoop } from './notifications'
import { TopBar } from './components/TopBar'
import { FilterTabs, type Filter } from './components/FilterTabs'
import { TaskList } from './components/TaskList'
import { Fab } from './components/Fab'
import { TaskDialog } from './components/TaskDialog'
import { EmptyState } from './components/EmptyState'
import { Snackbar } from './components/Snackbar'

type DraftTask = {
  id?: string
  title: string
  notes: string
  dueAt: string | null
  reminder: boolean
}

const emptyDraft: DraftTask = { title: '', notes: '', dueAt: null, reminder: true }

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<Filter>('all')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [draft, setDraft] = useState<DraftTask>(emptyDraft)
  const [snackbar, setSnackbar] = useState<string | null>(null)

  const refresh = useCallback(() => setTasks(taskRepo.list()), [])

  useEffect(() => {
    refresh()
  }, [refresh])

  useEffect(() => {
    startReminderLoop()
    return () => stopReminderLoop()
  }, [])

  const counts = useMemo(() => {
    const active = tasks.filter((t) => !t.completed).length
    const completed = tasks.length - active
    return { all: tasks.length, active, completed }
  }, [tasks])

  const visible = useMemo(() => {
    if (filter === 'active') return tasks.filter((t) => !t.completed)
    if (filter === 'completed') return tasks.filter((t) => t.completed)
    return tasks
  }, [tasks, filter])

  function openCreate() {
    setDraft(emptyDraft)
    setDialogOpen(true)
  }

  function openEdit(task: Task) {
    setDraft({
      id: task.id,
      title: task.title,
      notes: task.notes,
      dueAt: task.dueAt,
      reminder: task.reminder,
    })
    setDialogOpen(true)
  }

  async function handleSave(d: DraftTask) {
    const title = d.title.trim()
    if (!title) return

    if (d.id) {
      taskRepo.update(d.id, {
        title,
        notes: d.notes.trim(),
        dueAt: d.dueAt,
        reminder: d.reminder,
      })
      setSnackbar('Task updated')
    } else {
      taskRepo.create({
        title,
        notes: d.notes.trim(),
        dueAt: d.dueAt,
        reminder: d.reminder,
      })
      setSnackbar('Task added')
    }

    if (d.reminder && d.dueAt) {
      if (notificationsSupported()) {
        await requestNotificationPermission()
      }
    }

    setDialogOpen(false)
    refresh()
  }

  function handleToggle(id: string) {
    const updated = taskRepo.toggleComplete(id)
    if (updated) {
      setSnackbar(updated.completed ? 'Marked complete' : 'Marked active')
      refresh()
    }
  }

  function handleDelete(id: string) {
    taskRepo.remove(id)
    setSnackbar('Task deleted')
    refresh()
  }

  return (
    <div className="min-h-full bg-surface-variant flex flex-col safe-top safe-bottom">
      <TopBar taskCount={counts.active} />

      <FilterTabs filter={filter} onChange={setFilter} counts={counts} />

      <main className="flex-1 overflow-y-auto no-scrollbar px-4 pb-28 pt-1">
        {visible.length === 0 ? (
          <EmptyState filter={filter} />
        ) : (
          <TaskList
            tasks={visible}
            onToggle={handleToggle}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        )}
      </main>

      <Fab onClick={openCreate} />

      <TaskDialog
        open={dialogOpen}
        draft={draft}
        onChange={setDraft}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
      />

      {snackbar && (
        <Snackbar
          message={snackbar}
          onDone={() => setSnackbar(null)}
        />
      )}
    </div>
  )
}