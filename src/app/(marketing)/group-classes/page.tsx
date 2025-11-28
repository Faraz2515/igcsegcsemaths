import { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/layout/PageHeader'
import { MainContainer } from '@/components/layout/MainContainer'
import { ClassCard } from '@/components/classes'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'
import { Users, Clock, Video, MessageCircle, CheckCircle, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Group Classes',
  description: 'Small group GCSE and IGCSE Maths classes. Interactive online sessions with maximum 6 students per class.',
}

const benefits = [
  {
    icon: Users,
    title: 'Small Groups',
    description: 'Maximum 6 students per class for personalized attention.',
  },
  {
    icon: Clock,
    title: 'Weekly Sessions',
    description: 'Regular weekly classes to build momentum and consistency.',
  },
  {
    icon: Video,
    title: 'Live & Interactive',
    description: 'Real-time lessons via Zoom with Q&A and discussion.',
  },
  {
    icon: MessageCircle,
    title: 'Peer Learning',
    description: 'Learn alongside others and benefit from group discussions.',
  },
]

const included = [
  'Weekly live Zoom sessions',
  'Recorded lessons for review',
  'Shared practice materials',
  'WhatsApp group support',
  'Progress tracking',
  'Homework assignments',
]

export default async function GroupClassesPage() {
  const supabase = await createClient()
  
  const { data: classes } = await supabase
    .from('classes')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  return (
    <MainContainer>
      <PageHeader
        title="Group Classes"
        description="Join our small group classes for interactive learning with fellow students. Each class has a maximum of 6 students to ensure everyone gets the attention they need."
      />

      {/* Benefits */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {benefits.map((benefit) => (
          <Card key={benefit.title}>
            <CardContent className="pt-6 text-center">
              <div className="mx-auto p-2 bg-primary/10 rounded-lg w-fit mb-3">
                <benefit.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Available Classes */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Available Classes</h2>
        {classes && classes.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((classItem, index) => (
              <ClassCard key={classItem.id} classItem={classItem} index={index} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">
                No group classes are currently scheduled. Check back soon or contact us to express interest.
              </p>
              <Button asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </section>

      {/* What is Included */}
      <section className="mb-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">What is Included</h2>
            <p className="text-muted-foreground mb-6">
              Every group class subscription includes everything you need for effective learning and exam preparation.
            </p>
            <ul className="space-y-3">
              {included.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <Card className="bg-muted/50">
            <CardContent className="py-8">
              <h3 className="text-xl font-bold mb-4">How It Works</h3>
              <ol className="space-y-4">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">1</span>
                  <div>
                    <p className="font-medium">Choose Your Class</p>
                    <p className="text-sm text-muted-foreground">Select a class that matches your level and schedule.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">2</span>
                  <div>
                    <p className="font-medium">Submit Enrolment</p>
                    <p className="text-sm text-muted-foreground">Click enrol and submit your request.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">3</span>
                  <div>
                    <p className="font-medium">Complete Payment</p>
                    <p className="text-sm text-muted-foreground">Pay via Payoneer or Wise (details sent after enrolment).</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">4</span>
                  <div>
                    <p className="font-medium">Join Your Class</p>
                    <p className="text-sm text-muted-foreground">Receive Zoom link and start learning!</p>
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-12 bg-primary text-primary-foreground rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">Prefer 1-to-1 Tutoring?</h2>
        <p className="mb-6 text-primary-foreground/80 max-w-xl mx-auto">
          If you prefer personalized attention or need flexible scheduling, our 1-to-1 tutoring might be a better fit.
        </p>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/tutoring">
            Explore 1-to-1 Tutoring
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>
    </MainContainer>
  )
}
