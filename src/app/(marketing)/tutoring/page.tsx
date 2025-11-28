import { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/layout/PageHeader'
import { TutoringLayout, TeachingApproach } from '@/components/tutoring'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, BookOpen, Users, Clock, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tutoring',
  description: 'Expert GCSE and IGCSE Maths tutoring. Personalized 1-to-1 lessons for Edexcel and Cambridge exam boards.',
}

const tutoringOptions = [
  {
    title: 'GCSE Maths',
    description: 'Edexcel GCSE Mathematics tutoring for Foundation and Higher tier students.',
    examBoard: 'Edexcel',
    tiers: ['Foundation (Grades 1-5)', 'Higher (Grades 4-9)'],
    href: '/tutoring/gcse',
    icon: BookOpen,
  },
  {
    title: 'IGCSE Maths',
    description: 'Cambridge IGCSE Mathematics tutoring for Core and Extended curriculum students.',
    examBoard: 'Cambridge',
    tiers: ['Core (Grades C-G)', 'Extended (Grades A*-E)'],
    href: '/tutoring/igcse',
    icon: Award,
  },
]

const features = [
  {
    icon: Users,
    title: '1-to-1 Attention',
    description: 'Dedicated focus on your learning needs with personalized lesson plans.',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Book lessons at times that suit you, including evenings and weekends.',
  },
  {
    icon: BookOpen,
    title: 'Exam Board Specific',
    description: 'Content tailored to your specific exam board and syllabus requirements.',
  },
  {
    icon: Award,
    title: 'Proven Results',
    description: '95% of students achieve their target grade or higher.',
  },
]

export default function TutoringPage() {
  return (
    <TutoringLayout>
      <PageHeader
        title="Expert Maths Tutoring"
        description="Personalized 1-to-1 tutoring for GCSE and IGCSE Maths. Whether you need foundation support or are aiming for top grades, I will help you achieve your goals."
      />

      {/* Tutoring Options */}
      <section className="py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {tutoringOptions.map((option) => (
            <Card key={option.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <option.icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="secondary">{option.examBoard}</Badge>
                </div>
                <CardTitle className="text-2xl">{option.title}</CardTitle>
                <CardDescription className="text-base">{option.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Available Tiers:</p>
                  <div className="flex flex-wrap gap-2">
                    {option.tiers.map((tier) => (
                      <Badge key={tier} variant="outline">{tier}</Badge>
                    ))}
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href={option.href}>
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-12 border-t">
        <h2 className="text-2xl font-bold mb-8 text-center">Why Choose My Tutoring?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto p-3 bg-primary/10 rounded-xl w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <TeachingApproach />

      {/* CTA */}
      <section className="py-12 text-center">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="py-12">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="mb-6 text-primary-foreground/80 max-w-xl mx-auto">
              Book a free introductory session to discuss your goals and see how I can help you succeed.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">
                Book Free Intro Session
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </TutoringLayout>
  )
}
