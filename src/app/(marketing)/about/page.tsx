import { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/layout/PageHeader'
import { MainContainer } from '@/components/layout/MainContainer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Users, Globe, BookOpen, Target, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Faraz Hassan, expert GCSE and IGCSE Maths tutor with 10+ years of experience helping students achieve top grades.',
}

const qualifications = [
  'Mathematics Degree',
  '10+ Years Teaching Experience',
  'Edexcel & Cambridge Specialist',
  '500+ Students Taught',
  '95% Grade 7-9 Achievement Rate',
  'International Teaching Experience',
]

const values = [
  {
    icon: Target,
    title: 'Student-Centered',
    description: 'Every lesson is tailored to the individual student\'s needs, learning style, and goals.',
  },
  {
    icon: BookOpen,
    title: 'Exam-Focused',
    description: 'I teach not just the content, but the exam techniques needed to maximize marks.',
  },
  {
    icon: Users,
    title: 'Supportive',
    description: 'I create a positive learning environment where students feel confident to ask questions.',
  },
  {
    icon: Globe,
    title: 'Accessible',
    description: 'Online tutoring makes quality education accessible to students worldwide.',
  },
]

const timeline = [
  {
    year: '2014',
    title: 'Started Teaching',
    description: 'Began tutoring GCSE Maths students while completing my degree.',
  },
  {
    year: '2016',
    title: 'Full-Time Tutoring',
    description: 'Transitioned to full-time tutoring, expanding to IGCSE curriculum.',
  },
  {
    year: '2018',
    title: 'International Students',
    description: 'Started working with students in UAE, Qatar, and other GCC countries.',
  },
  {
    year: '2020',
    title: 'Online Expansion',
    description: 'Fully transitioned to online tutoring, reaching students globally.',
  },
  {
    year: '2022',
    title: 'Resource Development',
    description: 'Launched solved past papers and predicted papers for students.',
  },
  {
    year: '2024',
    title: 'Group Classes',
    description: 'Introduced small group classes to make tutoring more accessible.',
  },
]

export default function AboutPage() {
  return (
    <MainContainer>
      <PageHeader
        title="About Faraz Hassan"
        description="Dedicated GCSE and IGCSE Maths tutor helping students achieve their best grades through personalized teaching and exam-focused preparation."
      />

      {/* Main About Section */}
      <section className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="space-y-6">
          <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center">
            <div className="text-center p-8">
              <h3 className="text-8xl font-bold text-primary mb-4">FH</h3>
              <p className="text-xl font-semibold">Faraz Hassan</p>
              <p className="text-muted-foreground">GCSE & IGCSE Maths Specialist</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">My Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I have been teaching GCSE and IGCSE Mathematics for over 10 years, helping hundreds of students 
                achieve their target grades and beyond. My journey in education began during my university years 
                when I discovered my passion for making complex mathematical concepts accessible and enjoyable.
              </p>
              <p>
                What sets my teaching apart is my deep understanding of both the Edexcel and Cambridge exam boards. 
                I do not just teach the content - I teach students how to think like examiners, understand mark schemes, 
                and approach questions strategically to maximize their marks.
              </p>
              <p>
                Over the years, I have worked with students from diverse backgrounds across the UK, UAE, Qatar, 
                and other countries in Asia. This international experience has given me unique insights into 
                the challenges faced by students in different educational systems.
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Qualifications & Experience</h3>
            <ul className="grid grid-cols-2 gap-2">
              {qualifications.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">My Teaching Philosophy</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <Card key={value.title}>
              <CardContent className="pt-6 text-center">
                <div className="mx-auto p-3 bg-primary/10 rounded-xl w-fit mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">My Journey</h2>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={item.year} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {item.year}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mb-16 bg-muted/50 rounded-2xl p-8 md:p-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-primary">500+</p>
            <p className="text-sm text-muted-foreground">Students Taught</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">95%</p>
            <p className="text-sm text-muted-foreground">Grade 7-9 Rate</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">10+</p>
            <p className="text-sm text-muted-foreground">Years Experience</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">15+</p>
            <p className="text-sm text-muted-foreground">Countries Served</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-12 bg-primary text-primary-foreground rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
        <p className="mb-6 text-primary-foreground/80 max-w-xl mx-auto">
          Book a free introductory session to discuss your goals and see how I can help you achieve them.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">
              Book Free Intro Session
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10" asChild>
            <Link href="/tutoring">View Tutoring Options</Link>
          </Button>
        </div>
      </section>
    </MainContainer>
  )
}
