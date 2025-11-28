import { cn } from '@/lib/utils'

interface MainContainerProps {
  children: React.ReactNode
  className?: string
}

export function MainContainer({ children, className }: MainContainerProps) {
  return (
    <main className={cn('container mx-auto px-4 py-8', className)}>
      {children}
    </main>
  )
}
