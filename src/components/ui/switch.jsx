import { cn } from '../../lib/utils'

export default function Switch({ checked, onChange, className }) {
  return (
    <button
      aria-checked={checked}
      role="switch"
      onClick={() => onChange(!checked)}
      className={cn(
        'inline-flex h-6 w-11 items-center rounded-full border border-white/20 p-0.5 transition-all',
        checked ? 'bg-brand' : 'bg-white/10',
        className
      )}
    >
      <span className={cn('h-5 w-5 rounded-full bg-white transition-transform', checked ? 'translate-x-5' : 'translate-x-0')} />
    </button>
  )
}