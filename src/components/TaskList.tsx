import type { Task } from '../types'
import { TaskItem } from './TaskItem'

type Props = {
  tasks: Task[]
  onToggle: (id: string) => void
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

export function TaskList({ tasks, onToggle, onEdit, onDelete }: Props) {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li key={task.id} className="list-item-enter">
          <TaskItem task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  )
}