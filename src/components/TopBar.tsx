export function TopBar({ taskCount }: { taskCount: number }) {
  return (
    <header className="px-5 pt-8 pb-3">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <p className="text-xs font-semibold text-primary tracking-[0.08em] uppercase">Today</p>
      </div>
      <h1 className="text-4xl font-bold text-[#0F172A] mt-1 leading-tight">
        {taskCount === 0 ? 'All caught up' : `${taskCount} task${taskCount === 1 ? '' : 's'}`}
      </h1>
      <p className="text-sm text-muted mt-1.5 font-normal">
        {taskCount === 0 ? 'Nothing to do — enjoy the calm.' : 'Small steps, big progress.'}
      </p>
    </header>
  )
}