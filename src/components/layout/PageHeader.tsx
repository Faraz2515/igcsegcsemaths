import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  description?: string
  className?: string
  children?: React.ReactNode
}

export function PageHeader({ title, description, className, children }: PageHeaderProps) {
  return (
    <div className={cn('space-y-4 pb-8 border-b mb-8', className)}>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
      {description && (
        <p className="text-lg text-muted-foreground max-w-3xl">{description}</p>
      )}
      {children}
    </div>
  )
}
