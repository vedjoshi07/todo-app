type Props = { onClick: () => void }

export function Fab({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="fixed right-5 bottom-6 w-14 h-14 rounded-full bg-primary text-white shadow-elevated hover:bg-primary-light active:scale-90 transition-all duration-200 flex items-center justify-center"
      aria-label="Add task"
    >
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
        <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    </button>
  )
}