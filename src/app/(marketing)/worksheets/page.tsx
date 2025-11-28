import { Metadata } from 'next'
import { Suspense } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { MainContainer } from '@/components/layout/MainContainer'
import { ProductGrid, ProductFilters } from '@/components/products'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, Layers, CheckCircle, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Topic Worksheets',
  description: 'Focused practice worksheets for every GCSE and IGCSE Maths topic with answers and worked solutions.',
}

interface PageProps {
  searchParams: Promise<{
    exam_board?: string
    level?: string
    tier?: string
    year?: string
  }>
}

const features = [
  {
    icon: Layers,
    title: 'Topic-Focused',
    description: 'Each worksheet targets a specific topic for focused practice.',
  },
  {
    icon: BookOpen,
    title: 'Graded Difficulty',
    description: 'Questions progress from basic to challenging within each worksheet.',
  },
  {
    icon: CheckCircle,
    title: 'Full Solutions',
    description: 'Detailed worked solutions for every question.',
  },
  {
    icon: FileText,
    title: 'Print-Ready',
    description: 'Clean, print-friendly format for offline practice.',
  },
]

async function ProductList({ searchParams }: { searchParams: PageProps['searchParams'] }) {
  const params = await searchParams
  const supabase = await createClient()
  
  let query = supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .ilike('title', '%worksheet%')
    .order('created_at', { ascending: false })

  if (params.exam_board) {
    query = query.eq('exam_board', params.exam_board)
  }
  if (params.level) {
    query = query.eq('level', params.level)
  }
  if (params.tier) {
    query = query.eq('tier', params.tier)
  }

  const { data: products } = await query

  return <ProductGrid products={products || []} />
}

export default async function WorksheetsPage({ searchParams }: PageProps) {
  return (
    <MainContainer>
      <PageHeader
        title="Topic Worksheets"
        description="Focused practice worksheets for every GCSE and IGCSE Maths topic. Each worksheet includes a range of questions from basic to challenging, with full worked solutions to help you master each topic."
      />

      {/* Features */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardContent className="pt-6 text-center">
              <div className="mx-auto p-2 bg-primary/10 rounded-lg w-fit mb-3">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <div className="space-y-8">
        <Suspense fallback={<div>Loading filters...</div>}>
          <ProductFilters years={[]} />
        </Suspense>

        <Suspense fallback={<div className="text-center py-12">Loading products...</div>}>
          <ProductList searchParams={searchParams} />
        </Suspense>
      </div>
    </MainContainer>
  )
}
