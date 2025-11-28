'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'
import { Testimonial } from '@/types/database'

interface TestimonialsSectionProps {
  testimonials?: Testimonial[]
}

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah M.',
    country: 'United Kingdom',
    quote: 'Faraz helped my daughter improve from a grade 4 to a grade 8 in just 6 months. His teaching style is clear and patient, and he really understands how to explain difficult concepts.',
    result: 'Grade 4 to Grade 8',
    rating: 5,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Ahmed K.',
    country: 'UAE',
    quote: 'The best IGCSE Maths tutor we have found. My son was struggling with Extended Maths but now feels confident going into his exams. Highly recommended!',
    result: 'A* in IGCSE',
    rating: 5,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Priya S.',
    country: 'Qatar',
    quote: 'Faraz\'s predicted papers were incredibly accurate. Combined with his tutoring, my daughter achieved an A* which we never thought possible.',
    result: 'A* Achievement',
    rating: 5,
    is_active: true,
    created_at: new Date().toISOString(),
  },
]

export function TestimonialsSection({ testimonials = defaultTestimonials }: TestimonialsSectionProps) {
  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials

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
          <span className="text-primary font-medium">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            What Parents & Students Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Do not just take my word for it. Here is what some of my students and their parents have to say about their experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayTestimonials.slice(0, 6).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="pt-6 space-y-4">
                  <Quote className="h-8 w-8 text-primary/20" />
                  <p className="text-muted-foreground italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="pt-4 border-t">
                    <p className="font-semibold">{testimonial.name}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{testimonial.country}</span>
                      {testimonial.result && (
                        <span className="text-primary font-medium">{testimonial.result}</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
