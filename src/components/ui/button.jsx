import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../lib/utils'

export default function Button({ asChild, className, variant = 'default', size = 'md', ...props }) {
  const Comp = asChild ? Slot : 'button'
  const base = 'inline-flex items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-50 disabled:pointer-events-none'
  const variants = {
    default: 'bg-brand text-white hover:bg-brand-dark',
    outline: 'border border-white/20 hover:bg-white/10',
    ghost: 'hover:bg-white/10'
  }
  const sizes = { sm: 'h-9 px-3 text-sm', md: 'h-10 px-4', lg: 'h-11 px-6 text-lg' }
  return <Comp className={cn(base, variants[variant], sizes[size], className)} {...props} />
}