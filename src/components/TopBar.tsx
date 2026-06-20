export function TopBar({ taskCount }: { taskCount: number }) {
  return (
    <header className="px-5 pt-7 pb-2">
      <p className="text-xs font-semibold text-primary tracking-[0.08em] uppercase">Today</p>
      <h1 className="text-4xl font-bold text-[#134E4A] mt-1 leading-tight">
        {taskCount === 0 ? 'All caught up' : `${taskCount} task${taskCount === 1 ? '' : 's'}`}
      </h1>
      <p className="text-sm text-muted mt-1.5 font-normal">
        {taskCount === 0 ? 'Nothing to do — enjoy the calm.' : 'Small steps, big progress.'}
      </p>
    </header>
  )
}