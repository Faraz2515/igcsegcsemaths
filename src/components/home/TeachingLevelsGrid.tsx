'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'

const levels = [
  {
    title: 'GCSE Foundation',
    description: 'Build strong foundations and achieve grades 1-5 with confidence.',
    examBoard: 'Edexcel',
    features: ['Core concepts mastery', 'Step-by-step problem solving', 'Exam technique training'],
    href: '/tutoring/gcse',
    badge: 'Foundation',
  },
  {
    title: 'GCSE Higher',
    description: 'Target grades 4-9 with advanced problem-solving skills.',
    examBoard: 'Edexcel',
    features: ['Advanced topics coverage', 'Grade 8-9 strategies', 'Past paper practice'],
    href: '/tutoring/gcse',
    badge: 'Higher',
  },
  {
    title: 'IGCSE Core',
    description: 'Master the core curriculum for grades C-G success.',
    examBoard: 'Cambridge',
    features: ['International curriculum', 'Clear explanations', 'Regular assessments'],
    href: '/tutoring/igcse',
    badge: 'Core',
  },
  {
    title: 'IGCSE Extended',
    description: 'Excel in extended papers for grades A*-E achievement.',
    examBoard: 'Cambridge',
    features: ['Extended syllabus coverage', 'A* preparation', 'Challenging problems'],
    href: '/tutoring/igcse',
    badge: 'Extended',
  },
]

export function TeachingLevelsGrid() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-medium">What I Teach</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Comprehensive Maths Tutoring
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Expert tutoring for all levels of GCSE and IGCSE Maths. Whether you need 
            foundation support or are aiming for top grades, I have you covered.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {levels.map((level, index) => (
            <motion.div
              key={level.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{level.badge}</Badge>
                    <span className="text-xs text-muted-foreground">{level.examBoard}</span>
                  </div>
                  <CardTitle className="text-xl">{level.title}</CardTitle>
                  <CardDescription>{level.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {level.features.map((feature, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={level.href}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
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
