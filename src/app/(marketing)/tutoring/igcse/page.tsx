import { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/layout/PageHeader'
import { TutoringLayout, LevelCard, TeachingApproach, CurriculumBreakdown } from '@/components/tutoring'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'IGCSE Maths Tutoring',
  description: 'Expert Cambridge IGCSE Maths tutoring for Core and Extended curriculum. Achieve grades A*-G with personalized lessons.',
}

const levels = [
  {
    title: 'IGCSE Core',
    description: 'Master the core curriculum and achieve grades C-G with confidence. Ideal for students building foundational mathematical skills.',
    tier: 'Core',
    examBoard: 'Cambridge',
    features: [
      'Solid foundation in key concepts',
      'Clear explanations of methods',
      'Regular practice and reinforcement',
      'Exam technique for Paper 1 & 3',
      'Confidence building approach',
    ],
    topics: ['Number', 'Algebra', 'Geometry', 'Statistics', 'Probability'],
    href: '/contact',
  },
  {
    title: 'IGCSE Extended',
    description: 'Excel in the extended curriculum and achieve grades A*-E. Perfect for students aiming for top grades and A-Level preparation.',
    tier: 'Extended',
    examBoard: 'Cambridge',
    features: [
      'Advanced mathematical concepts',
      'Complex problem solving',
      'A* grade strategies',
      'Exam technique for Paper 2 & 4',
      'Preparation for A-Level Maths',
    ],
    topics: ['Functions', 'Calculus', 'Vectors', 'Matrices', 'Set Theory'],
    href: '/contact',
  },
]

const curriculumTopics = {
  core: [
    {
      name: 'Number',
      subtopics: ['Integers and decimals', 'Fractions and percentages', 'Ratio and proportion', 'Standard form', 'Bounds'],
    },
    {
      name: 'Algebra',
      subtopics: ['Expressions and formulae', 'Linear equations', 'Sequences', 'Straight line graphs', 'Inequalities'],
    },
    {
      name: 'Geometry',
      subtopics: ['Angles and shapes', 'Symmetry', 'Mensuration', 'Trigonometry basics', 'Transformations'],
    },
    {
      name: 'Statistics',
      subtopics: ['Data collection', 'Averages', 'Statistical diagrams', 'Scatter diagrams', 'Correlation'],
    },
    {
      name: 'Probability',
      subtopics: ['Basic probability', 'Combined events', 'Tree diagrams', 'Relative frequency', 'Expected values'],
    },
  ],
  extended: [
    {
      name: 'Advanced Algebra',
      subtopics: ['Quadratics and completing square', 'Simultaneous equations', 'Functions and notation', 'Variation', 'Algebraic fractions'],
    },
    {
      name: 'Functions & Calculus',
      subtopics: ['Function notation', 'Composite functions', 'Inverse functions', 'Differentiation', 'Integration basics'],
    },
    {
      name: 'Advanced Geometry',
      subtopics: ['Circle theorems', 'Vectors in 2D', 'Matrices', 'Transformations with matrices', '3D trigonometry'],
    },
    {
      name: 'Advanced Statistics',
      subtopics: ['Histograms', 'Cumulative frequency', 'Box-and-whisker plots', 'Standard deviation', 'Comparing distributions'],
    },
    {
      name: 'Sets & Logic',
      subtopics: ['Set notation', 'Venn diagrams', 'Set operations', 'Problem solving with sets', 'Logical reasoning'],
    },
  ],
}

export default function IGCSEPage() {
  return (
    <TutoringLayout>
      <PageHeader
        title="IGCSE Maths Tutoring"
        description="Expert Cambridge IGCSE Mathematics tutoring for both Core and Extended curriculum students. Achieve your target grade with personalized lessons and international exam preparation."
      />

      {/* Level Cards */}
      <section className="py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {levels.map((level, index) => (
            <LevelCard key={level.title} {...level} index={index} />
          ))}
        </div>
      </section>

      <TeachingApproach />

      <CurriculumBreakdown
        title="IGCSE Curriculum Coverage"
        description="Comprehensive coverage of the Cambridge IGCSE Mathematics syllabus (0580) for both Core and Extended tiers."
        topics={curriculumTopics}
      />

      {/* International Students Section */}
      <section className="py-12 border-t">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Supporting International Students</h2>
            <p className="text-muted-foreground mb-4">
              I work with students across multiple time zones including UK, UAE, Qatar, and Asia. 
              Lessons are scheduled to accommodate your local time, and I understand the unique 
              challenges faced by international school students.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Flexible scheduling across time zones
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Experience with international school curricula
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Understanding of May/June and Oct/Nov exam sessions
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Support for variant papers
              </li>
            </ul>
          </div>
          <div className="bg-muted/50 rounded-xl p-6">
            <h3 className="font-semibold mb-4">Time Zone Coverage</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>United Kingdom</span>
                <span className="text-muted-foreground">GMT/BST</span>
              </div>
              <div className="flex justify-between">
                <span>UAE (Dubai, Abu Dhabi)</span>
                <span className="text-muted-foreground">GMT+4</span>
              </div>
              <div className="flex justify-between">
                <span>Qatar (Doha)</span>
                <span className="text-muted-foreground">GMT+3</span>
              </div>
              <div className="flex justify-between">
                <span>Pakistan</span>
                <span className="text-muted-foreground">GMT+5</span>
              </div>
              <div className="flex justify-between">
                <span>India</span>
                <span className="text-muted-foreground">GMT+5:30</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 text-center">
        <div className="bg-muted/50 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-4">Start Your IGCSE Success Journey</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Book a free introductory session to discuss your current level, target grade, and create a personalized study plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">
                Book Free Intro Session
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/past-papers">Browse IGCSE Resources</Link>
            </Button>
          </div>
        </div>
      </section>
    </TutoringLayout>
  )
}
