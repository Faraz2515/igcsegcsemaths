'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Target, TrendingUp, RefreshCw, Zap } from 'lucide-react'

const programmes = [
  {
    icon: Target,
    title: 'Exam Preparation',
    description: 'Intensive revision programmes designed to maximize your exam performance with focused past paper practice and exam technique training.',
    href: '/tutoring',
  },
  {
    icon: TrendingUp,
    title: 'Grade Boosting',
    description: 'Targeted support to help you move up grade boundaries. Identify weak areas and develop strategies to improve your marks.',
    href: '/tutoring',
  },
  {
    icon: RefreshCw,
    title: 'Catch-Up Programme',
    description: 'Fallen behind in class? Our catch-up programme helps you get back on track with structured lessons covering missed content.',
    href: '/tutoring',
  },
  {
    icon: Zap,
    title: 'Confidence Building',
    description: 'Build mathematical confidence through patient explanations, regular practice, and positive reinforcement.',
    href: '/tutoring',
  },
]

export function ProgrammesSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-medium">Specialist Programmes</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Tailored Learning Programmes
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every student has different needs. Choose a programme that matches your goals 
            and let me help you achieve them.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programmes.map((programme, index) => (
            <motion.div
              key={programme.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow text-center">
                <CardHeader>
                  <div className="mx-auto p-3 bg-primary/10 rounded-xl w-fit mb-4">
                    <programme.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{programme.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{programme.description}</CardDescription>
                  <Button variant="link" asChild>
                    <Link href={programme.href}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
