import { cn } from '../../lib/utils'

export default function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        'flex h-10 w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand',
        'bg-white/80 text-neutral-900 placeholder:text-neutral-500 border border-neutral-300',
        'dark:bg-transparent dark:text-neutral-100 dark:placeholder:text-white/50 dark:border-white/20',
        className
      )}
      {...props}
    />
  )
}