'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'

const pricingPlans = [
  {
    name: '1-to-1 Tutoring',
    description: 'Personalized lessons tailored to your needs',
    price: '£40',
    period: 'per hour',
    features: [
      'Flexible scheduling',
      'Personalized lesson plans',
      'Exam board specific content',
      'Homework support',
      'Progress tracking',
      'WhatsApp support between lessons',
    ],
    cta: 'Book Intro Session',
    href: '/contact',
    popular: true,
  },
  {
    name: 'Group Classes',
    description: 'Small group sessions (max 6 students)',
    price: '£15',
    period: 'per session',
    features: [
      'Weekly scheduled classes',
      'Interactive learning',
      'Peer discussion',
      'Recorded sessions',
      'Shared resources',
      'Topic-focused lessons',
    ],
    cta: 'View Classes',
    href: '/group-classes',
    popular: false,
  },
  {
    name: 'Resource Bundles',
    description: 'Complete study material packages',
    price: '£25',
    period: 'one-time',
    features: [
      'Solved past papers',
      'Predicted papers',
      'Topic worksheets',
      'Mark schemes',
      'Examiner tips',
      'Instant download',
    ],
    cta: 'Browse Resources',
    href: '/past-papers',
    popular: false,
  },
]

export function PricingSection() {
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
          <span className="text-primary font-medium">Pricing</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the learning option that works best for you. All options include 
            access to quality teaching and support.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`h-full relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="pt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? 'default' : 'outline'}
                    asChild
                  >
                    <Link href={plan.href}>{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          All prices are in GBP. Payment accepted via bank transfer, Payoneer, or Wise.
        </motion.p>
      </div>
    </section>
  )
}
