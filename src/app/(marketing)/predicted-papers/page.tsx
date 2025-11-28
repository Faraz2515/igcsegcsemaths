import { Metadata } from 'next'
import { Suspense } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { MainContainer } from '@/components/layout/MainContainer'
import { ProductGrid, ProductFilters } from '@/components/products'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { Brain, Target, TrendingUp, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Predicted Papers',
  description: 'Expertly crafted predicted papers for GCSE and IGCSE Maths based on exam trends and syllabus analysis.',
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
    icon: Brain,
    title: 'Expert Analysis',
    description: 'Based on careful analysis of past exam trends and syllabus changes.',
  },
  {
    icon: Target,
    title: 'Exam-Style Questions',
    description: 'Questions written in the exact style of real exam papers.',
  },
  {
    icon: TrendingUp,
    title: 'Topic Coverage',
    description: 'Covers topics likely to appear based on recent exam patterns.',
  },
  {
    icon: Award,
    title: 'Full Solutions',
    description: 'Includes detailed mark schemes and worked solutions.',
  },
]

async function ProductList({ searchParams }: { searchParams: PageProps['searchParams'] }) {
  const params = await searchParams
  const supabase = await createClient()
  
  let query = supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .ilike('title', '%predicted%')
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
  if (params.year) {
    query = query.eq('year', params.year)
  }

  const { data: products } = await query

  return <ProductGrid products={products || []} />
}

export default async function PredictedPapersPage({ searchParams }: PageProps) {
  return (
    <MainContainer>
      <PageHeader
        title="Predicted Papers"
        description="Expertly crafted predicted papers based on thorough analysis of exam trends, syllabus changes, and examiner reports. Give yourself the best chance of success with targeted practice."
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
          <ProductFilters />
        </Suspense>

        <Suspense fallback={<div className="text-center py-12">Loading products...</div>}>
          <ProductList searchParams={searchParams} />
        </Suspense>
      </div>
    </MainContainer>
  )
}
