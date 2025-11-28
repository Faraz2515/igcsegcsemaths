'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

const highlights = [
  'Edexcel & Cambridge Specialist',
  '10+ Years Teaching Experience',
  'Proven Track Record of Grade 7-9 Results',
  'Personalized Learning Approach',
  'Flexible Online Sessions',
  'UK, UAE, Qatar & Asia Coverage',
]

export function AboutPreview() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image/Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center">
              <div className="text-center p-8">
                <h3 className="text-6xl font-bold text-primary mb-4">FH</h3>
                <p className="text-xl font-semibold">Faraz Hassan</p>
                <p className="text-muted-foreground">GCSE & IGCSE Maths Specialist</p>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-card border rounded-xl p-4 shadow-lg">
              <p className="text-2xl font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground">Students Helped</p>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <span className="text-primary font-medium">About Your Tutor</span>
              <h2 className="text-3xl md:text-4xl font-bold">
                Meet Faraz Hassan
              </h2>
              <p className="text-muted-foreground text-lg">
                I am a dedicated GCSE and IGCSE Maths tutor with over 10 years of experience 
                helping students achieve their best grades. My teaching approach combines 
                clear explanations, exam-focused strategies, and personalized attention to 
                ensure every student reaches their full potential.
              </p>
              <p className="text-muted-foreground">
                Having taught hundreds of students across the UK, UAE, Qatar, and Asia, 
                I understand the unique challenges students face with different exam boards 
                and curricula. Whether you are preparing for Edexcel or Cambridge exams, 
                I provide the guidance and resources you need to succeed.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>

            <Button asChild>
              <Link href="/about">Learn More About Me</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
