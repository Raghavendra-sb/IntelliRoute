import { cn } from '../../lib/utils'

export function Alert({ className, variant = 'default', ...props }) {
  const variants = {
    default: 'border-white/20',
    destructive: 'border-red-500/40 text-red-200'
  }
  return <div className={cn('rounded-lg border p-3', variants[variant], className)} {...props} />
}

export function AlertTitle({ className, ...props }) {
  return <h4 className={cn('font-semibold', className)} {...props} />
}

export function AlertDescription({ className, ...props }) {
  return <div className={cn('text-sm opacity-80', className)} {...props} />
}