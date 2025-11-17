import { cn } from '../../lib/utils'

export function Card({ className, ...props }) {
  return <div className={cn('glass gradient-border p-4', className)} {...props} />
}

export function CardHeader({ className, ...props }) {
  return <div className={cn('mb-3 flex items-center justify-between', className)} {...props} />
}

export function CardTitle({ className, ...props }) {
  return <h3 className={cn('text-lg font-semibold', className)} {...props} />
}

export function CardDescription({ className, ...props }) {
  return <p className={cn('text-sm text-white/70', className)} {...props} />
}

export function CardContent({ className, ...props }) {
  return <div className={cn('space-y-3', className)} {...props} />
}