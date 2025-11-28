'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, FileText, Clock, Award } from 'lucide-react'

interface ProductInfoSectionProps {
  description: string | null
  features?: string[]
}

const defaultFeatures = [
  'Detailed step-by-step solutions',
  'Mark scheme breakdown',
  'Examiner tips and common mistakes',
  'Grade boundaries explained',
  'Instant PDF download',
  'Print-friendly format',
]

export function ProductInfoSection({ description, features = defaultFeatures }: ProductInfoSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="grid md:grid-cols-3 gap-8 py-12"
    >
      {/* Description */}
      <div className="md:col-span-2 space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {description ? (
              <p>{description}</p>
            ) : (
              <p>
                This comprehensive resource includes fully worked solutions to help you 
                understand the methods and techniques needed to excel in your exams. 
                Each solution is broken down step-by-step with clear explanations and 
                references to the mark scheme.
              </p>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">What is Included</h3>
          <ul className="grid sm:grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Format
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              PDF document, instant download after purchase.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Delivery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Instant access. Download immediately after payment.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="h-5 w-5" />
              Quality
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Created by an experienced GCSE/IGCSE Maths tutor with proven results.
            </p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
