'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TutoringLayoutProps {
  children: React.ReactNode
  className?: string
}

export function TutoringLayout({ children, className }: TutoringLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn('container mx-auto px-4 py-12', className)}
    >
      {children}
    </motion.div>
  )
}
