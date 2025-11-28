'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Target, BookOpen, Brain, TrendingUp, Clock, MessageCircle } from 'lucide-react'

const approaches = [
  {
    icon: Target,
    title: 'Personalized Learning',
    description: 'Every lesson is tailored to your specific needs, learning style, and exam board requirements.',
  },
  {
    icon: BookOpen,
    title: 'Exam-Focused',
    description: 'Learn exam techniques, mark scheme requirements, and how to maximize your marks.',
  },
  {
    icon: Brain,
    title: 'Conceptual Understanding',
    description: 'Build deep understanding rather than just memorizing formulas and procedures.',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Regular assessments and feedback to monitor your improvement and adjust the plan.',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Book lessons at times that work for you, including evenings and weekends.',
  },
  {
    icon: MessageCircle,
    title: 'Ongoing Support',
    description: 'WhatsApp support between lessons for quick questions and homework help.',
  },
]

export function TeachingApproach() {
  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-4">My Teaching Approach</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          I believe every student can succeed in Maths with the right support. 
          My approach combines clear explanations, plenty of practice, and exam-focused strategies.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {approaches.map((approach, index) => (
          <motion.div
            key={approach.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <approach.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{approach.title}</h3>
                    <p className="text-sm text-muted-foreground">{approach.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
