import type { Task } from './types'
import { taskRepo } from './taskRepo'

const REMINDER_WINDOW_MS = 60_000 // re-check every minute

async function ensurePermission(): Promise<boolean> {
  if (!('Notification' in window)) return false
  if (Notification.permission === 'granted') return true
  if (Notification.permission === 'denied') return false
  const result = await Notification.requestPermission()
  return result === 'granted'
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) return 'denied'
  if (Notification.permission === 'granted' || Notification.permission === 'denied') {
    return Notification.permission
  }
  return Notification.requestPermission()
}

export function notificationsSupported(): boolean {
  return 'Notification' in window
}

function fireNotification(task: Task) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return
  try {
    const n = new Notification(task.title, {
      body: task.notes || 'Task is due now',
      tag: `task-${task.id}`,
      icon: '/icon-192.png',
    })
    n.onclick = () => {
      window.focus()
      n.close()
    }
  } catch {
    // ignore
  }
}

async function checkDueTasks() {
  const granted = await ensurePermission()
  if (!granted) return

  const now = Date.now()
  const tasks = taskRepo.list()
  for (const task of tasks) {
    if (task.completed) continue
    if (!task.reminder || !task.dueAt) continue
    if (task.notifiedAt) continue
    const dueMs = new Date(task.dueAt).getTime()
    if (Number.isNaN(dueMs)) continue
    if (dueMs <= now) {
      fireNotification(task)
      taskRepo.update(task.id, { notifiedAt: new Date().toISOString() })
    }
  }
}

let intervalId: number | null = null

export function startReminderLoop() {
  // Fire once immediately, then every REMINDER_WINDOW_MS.
  void checkDueTasks()
  if (intervalId !== null) return
  intervalId = window.setInterval(checkDueTasks, REMINDER_WINDOW_MS)
}

export function stopReminderLoop() {
  if (intervalId !== null) {
    window.clearInterval(intervalId)
    intervalId = null
  }
}

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // ignore — the app still works without offline support
      })
    })
  }
}