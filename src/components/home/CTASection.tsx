'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, MessageCircle } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Achieve Your Best Grades?
          </h2>
          <p className="text-lg text-primary-foreground/80">
            Book a free introductory session today and discover how personalized tutoring 
            can transform your Maths performance. No commitment required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">
                Book Free Intro Session
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10" asChild>
              <a href="https://wa.me/message" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp Me
              </a>
            </Button>
          </div>
          <p className="text-sm text-primary-foreground/60 pt-4">
            Available for students in UK, UAE, Qatar, GCC, and Asia
          </p>
        </motion.div>
      </div>
    </section>
  )
}
