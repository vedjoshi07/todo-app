import type { Task } from './types'

const STORAGE_KEY = 'todo_app.tasks.v1'

function readAll(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed as Task[]
  } catch {
    return []
  }
}

function writeAll(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

function uid(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export const taskRepo = {
  list(): Task[] {
    return readAll().sort((a, b) => {
      // Incomplete first, then by dueAt (nulls last), then by createdAt desc
      if (a.completed !== b.completed) return a.completed ? 1 : -1
      if (a.dueAt && b.dueAt) return a.dueAt.localeCompare(b.dueAt)
      if (a.dueAt) return -1
      if (b.dueAt) return 1
      return b.createdAt.localeCompare(a.createdAt)
    })
  },

  create(input: Omit<Task, 'id' | 'createdAt' | 'completed' | 'notifiedAt'>): Task {
    const task: Task = {
      ...input,
      id: uid(),
      createdAt: new Date().toISOString(),
      completed: false,
      notifiedAt: null,
    }
    const tasks = readAll()
    tasks.push(task)
    writeAll(tasks)
    return task
  },

  update(id: string, patch: Partial<Task>): Task | null {
    const tasks = readAll()
    const idx = tasks.findIndex((t) => t.id === id)
    if (idx === -1) return null
    const updated: Task = { ...tasks[idx], ...patch, id: tasks[idx].id }
    // If due date changed, reset the notification flag so it can re-fire
    if (patch.dueAt !== undefined && patch.dueAt !== tasks[idx].dueAt) {
      updated.notifiedAt = null
    }
    tasks[idx] = updated
    writeAll(tasks)
    return updated
  },

  remove(id: string): void {
    writeAll(readAll().filter((t) => t.id !== id))
  },

  toggleComplete(id: string): Task | null {
    const tasks = readAll()
    const idx = tasks.findIndex((t) => t.id === id)
    if (idx === -1) return null
    tasks[idx] = { ...tasks[idx], completed: !tasks[idx].completed }
    writeAll(tasks)
    return tasks[idx]
  },
}