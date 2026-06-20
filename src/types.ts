export type Task = {
  id: string
  title: string
  notes: string
  dueAt: string | null // ISO string, null = no due date
  reminder: boolean
  completed: boolean
  createdAt: string
  notifiedAt: string | null
}