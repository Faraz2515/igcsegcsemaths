import { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/layout/PageHeader'
import { MainContainer } from '@/components/layout/MainContainer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileText, Download, ExternalLink, BookOpen, Calculator, Brain } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free Resources',
  description: 'Free GCSE and IGCSE Maths resources including formula sheets, revision guides, and practice questions.',
}

const freeResources = [
  {
    title: 'GCSE Maths Formula Sheet',
    description: 'Complete formula sheet covering all GCSE Maths topics. Print-friendly A4 format.',
    icon: FileText,
    type: 'PDF',
    level: 'GCSE',
    downloadUrl: '#',
  },
  {
    title: 'IGCSE Maths Formula Sheet',
    description: 'Comprehensive formula sheet for Cambridge IGCSE Mathematics (0580).',
    icon: FileText,
    type: 'PDF',
    level: 'IGCSE',
    downloadUrl: '#',
  },
  {
    title: 'Algebra Basics Worksheet',
    description: 'Free practice worksheet covering basic algebraic expressions and equations.',
    icon: BookOpen,
    type: 'PDF',
    level: 'GCSE/IGCSE',
    downloadUrl: '#',
  },
  {
    title: 'Times Tables Practice',
    description: 'Printable times tables practice sheets for building number fluency.',
    icon: Calculator,
    type: 'PDF',
    level: 'Foundation',
    downloadUrl: '#',
  },
  {
    title: 'Exam Technique Guide',
    description: 'Tips and strategies for maximizing your marks in Maths exams.',
    icon: Brain,
    type: 'PDF',
    level: 'All Levels',
    downloadUrl: '#',
  },
  {
    title: 'Common Mistakes to Avoid',
    description: 'Guide to the most common errors students make and how to avoid them.',
    icon: FileText,
    type: 'PDF',
    level: 'All Levels',
    downloadUrl: '#',
  },
]

const externalResources = [
  {
    title: 'Edexcel Past Papers',
    description: 'Official Edexcel GCSE Maths past papers and mark schemes.',
    url: 'https://qualifications.pearson.com/en/support/support-topics/exams/past-papers.html',
  },
  {
    title: 'Cambridge Past Papers',
    description: 'Official Cambridge IGCSE Mathematics past papers.',
    url: 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-mathematics-0580/past-papers/',
  },
  {
    title: 'Desmos Graphing Calculator',
    description: 'Free online graphing calculator for exploring functions.',
    url: 'https://www.desmos.com/calculator',
  },
  {
    title: 'GeoGebra',
    description: 'Free interactive geometry and algebra tools.',
    url: 'https://www.geogebra.org/',
  },
]

export default function FreeResourcesPage() {
  return (
    <MainContainer>
      <PageHeader
        title="Free Resources"
        description="Access free GCSE and IGCSE Maths resources to support your learning. Download formula sheets, practice worksheets, and revision guides at no cost."
      />

      {/* Downloadable Resources */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Downloadable Resources</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {freeResources.map((resource) => (
            <Card key={resource.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <resource.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{resource.type}</Badge>
                    <Badge variant="outline">{resource.level}</Badge>
                  </div>
                </div>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <a href={resource.downloadUrl} download>
                    <Download className="mr-2 h-4 w-4" />
                    Download Free
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* External Resources */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Useful External Links</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {externalResources.map((resource) => (
            <Card key={resource.title}>
              <CardHeader>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visit Website
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-12 bg-muted/50 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">Need More Resources?</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Browse our premium collection of solved past papers, predicted papers, and topic worksheets for comprehensive exam preparation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/past-papers">Browse Past Papers</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Book a Lesson</Link>
          </Button>
        </div>
      </section>
    </MainContainer>
  )
}
