import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MainContainer } from '@/components/layout/MainContainer'
import { ProductDetailHeader, ProductInfoSection } from '@/components/products'
import { createClient } from '@/lib/supabase/server'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: product.title,
    description: product.short_description || product.description || `${product.title} - GCSE IGCSE Maths resource`,
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()
  
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (!product) {
    notFound()
  }

  // Check if user has purchased this product
  const { data: { user } } = await supabase.auth.getUser()
  let isPurchased = false
  
  if (user) {
    const { data: purchase } = await supabase
      .from('purchases')
      .select('id')
      .eq('user_id', user.id)
      .eq('product_id', product.id)
      .single()
    
    isPurchased = !!purchase
  }

  return (
    <MainContainer>
      <ProductDetailHeader product={product} isPurchased={isPurchased} />
      <ProductInfoSection description={product.description} />
    </MainContainer>
  )
}
