import {
  HeroSection,
  AboutPreview,
  TeachingLevelsGrid,
  ProgrammesSection,
  ProductsPreview,
  TestimonialsSection,
  PricingSection,
  CTASection,
} from '@/components/home'
import { createClient } from '@/lib/supabase/server'

export default async function HomePage() {
  const supabase = await createClient()
  
  // Fetch active testimonials
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(6)

  return (
    <>
      <HeroSection />
      <AboutPreview />
      <TeachingLevelsGrid />
      <ProgrammesSection />
      <ProductsPreview />
      <TestimonialsSection testimonials={testimonials || []} />
      <PricingSection />
      <CTASection />
    </>
  )
}
