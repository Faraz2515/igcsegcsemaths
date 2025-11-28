'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileText, Brain, BookOpen, ArrowRight } from 'lucide-react'

const productCategories = [
  {
    icon: FileText,
    title: 'Solved Past Papers',
    description: 'Comprehensive solutions to past exam papers with detailed mark schemes and examiner tips.',
    href: '/past-papers',
    badge: 'Popular',
    count: '50+',
  },
  {
    icon: Brain,
    title: 'Predicted Papers',
    description: 'Expertly crafted predicted papers based on exam trends and syllabus analysis.',
    href: '/predicted-papers',
    badge: 'New',
    count: '20+',
  },
  {
    icon: BookOpen,
    title: 'Topic Worksheets',
    description: 'Focused practice worksheets for every topic with answers and worked solutions.',
    href: '/worksheets',
    badge: null,
    count: '100+',
  },
]

export function ProductsPreview() {
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
          <span className="text-primary font-medium">Digital Resources</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Premium Study Materials
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Boost your exam preparation with our carefully crafted resources. 
            Each product is designed to help you understand concepts and practice effectively.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {productCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                      <category.icon className="h-8 w-8 text-primary" />
                    </div>
                    {category.badge && (
                      <Badge variant={category.badge === 'New' ? 'default' : 'secondary'}>
                        {category.badge}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    <span className="text-2xl font-bold text-foreground">{category.count}</span> resources available
                  </p>
                  <Button className="w-full" asChild>
                    <Link href={category.href}>
                      Browse Collection
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" asChild>
            <Link href="/free-resources">
              View Free Resources
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
