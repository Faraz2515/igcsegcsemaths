import { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/layout/PageHeader'
import { TutoringLayout, LevelCard, TeachingApproach, CurriculumBreakdown } from '@/components/tutoring'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'GCSE Maths Tutoring',
  description: 'Expert Edexcel GCSE Maths tutoring for Foundation and Higher tier. Achieve grades 1-9 with personalized lessons.',
}

const levels = [
  {
    title: 'GCSE Foundation',
    description: 'Build strong mathematical foundations and achieve grades 1-5 with confidence. Perfect for students who need to solidify core concepts.',
    tier: 'Foundation',
    examBoard: 'Edexcel',
    features: [
      'Master essential mathematical concepts',
      'Step-by-step problem solving techniques',
      'Build confidence with numbers',
      'Exam technique and time management',
      'Regular practice with past papers',
    ],
    topics: ['Number', 'Algebra', 'Geometry', 'Statistics', 'Probability'],
    href: '/contact',
  },
  {
    title: 'GCSE Higher',
    description: 'Target grades 4-9 with advanced problem-solving skills. Ideal for students aiming for top grades and further Maths study.',
    tier: 'Higher',
    examBoard: 'Edexcel',
    features: [
      'Advanced algebraic techniques',
      'Complex geometry and trigonometry',
      'Grade 8-9 problem solving strategies',
      'Proof and mathematical reasoning',
      'Challenging exam questions practice',
    ],
    topics: ['Advanced Algebra', 'Trigonometry', 'Vectors', 'Circle Theorems', 'Proof'],
    href: '/contact',
  },
]

const curriculumTopics = {
  foundation: [
    {
      name: 'Number',
      subtopics: ['Fractions, decimals, percentages', 'Ratio and proportion', 'Standard form', 'Indices', 'Surds (basic)'],
    },
    {
      name: 'Algebra',
      subtopics: ['Expressions and formulae', 'Linear equations', 'Sequences', 'Graphs of linear functions', 'Inequalities'],
    },
    {
      name: 'Geometry',
      subtopics: ['Angles and polygons', 'Area and perimeter', 'Volume and surface area', 'Transformations', 'Pythagoras theorem'],
    },
    {
      name: 'Statistics',
      subtopics: ['Averages and range', 'Charts and diagrams', 'Scatter graphs', 'Frequency tables', 'Sampling'],
    },
    {
      name: 'Probability',
      subtopics: ['Basic probability', 'Probability diagrams', 'Expected outcomes', 'Relative frequency', 'Combined events'],
    },
  ],
  higher: [
    {
      name: 'Advanced Algebra',
      subtopics: ['Quadratic equations', 'Simultaneous equations', 'Functions', 'Iteration', 'Algebraic fractions'],
    },
    {
      name: 'Trigonometry',
      subtopics: ['Sine and cosine rules', 'Trigonometric graphs', '3D trigonometry', 'Exact values', 'Trigonometric identities'],
    },
    {
      name: 'Geometry & Measures',
      subtopics: ['Circle theorems', 'Vectors', 'Similar shapes', 'Congruence', 'Constructions and loci'],
    },
    {
      name: 'Statistics & Probability',
      subtopics: ['Histograms', 'Cumulative frequency', 'Box plots', 'Conditional probability', 'Tree diagrams'],
    },
    {
      name: 'Proof & Reasoning',
      subtopics: ['Algebraic proof', 'Geometric proof', 'Counter examples', 'Mathematical argument', 'Problem solving'],
    },
  ],
}

export default function GCSEPage() {
  return (
    <TutoringLayout>
      <PageHeader
        title="GCSE Maths Tutoring"
        description="Expert Edexcel GCSE Mathematics tutoring for both Foundation and Higher tier students. Achieve your target grade with personalized lessons and exam-focused preparation."
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
        title="GCSE Curriculum Coverage"
        description="Comprehensive coverage of the Edexcel GCSE Mathematics syllabus for both Foundation and Higher tiers."
        topics={curriculumTopics}
      />

      {/* CTA */}
      <section className="py-12 text-center">
        <div className="bg-muted/50 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-4">Start Your GCSE Success Journey</h2>
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
              <Link href="/past-papers">Browse GCSE Resources</Link>
            </Button>
          </div>
        </div>
      </section>
    </TutoringLayout>
  )
}
