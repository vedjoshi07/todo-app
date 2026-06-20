import { useEffect } from 'react'

type Props = { message: string; onDone: () => void }

export function Snackbar({ message, onDone }: Props) {
  useEffect(() => {
    const id = window.setTimeout(onDone, 2000)
    return () => window.clearTimeout(id)
  }, [message, onDone])

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl bg-[#134E4A] text-white text-sm font-medium shadow-elevated animate-slide-up">
      {message}
    </div>
  )
}