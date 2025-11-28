import { Metadata } from 'next'
import { Suspense } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { MainContainer } from '@/components/layout/MainContainer'
import { ProductGrid, ProductFilters } from '@/components/products'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Solved Past Papers',
  description: 'Comprehensive solved past papers for GCSE and IGCSE Maths. Detailed solutions with mark schemes and examiner tips.',
}

interface PageProps {
  searchParams: Promise<{
    exam_board?: string
    level?: string
    tier?: string
    year?: string
  }>
}

async function ProductList({ searchParams }: { searchParams: PageProps['searchParams'] }) {
  const params = await searchParams
  const supabase = await createClient()
  
  let query = supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .ilike('title', '%past paper%')
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

export default async function PastPapersPage({ searchParams }: PageProps) {
  return (
    <MainContainer>
      <PageHeader
        title="Solved Past Papers"
        description="Comprehensive solutions to GCSE and IGCSE Maths past papers. Each paper includes detailed step-by-step solutions, mark scheme breakdowns, and examiner tips to help you understand exactly how to achieve full marks."
      />

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
