import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    
    const exam_board = searchParams.get('exam_board')
    const level = searchParams.get('level')
    const tier = searchParams.get('tier')
    const year = searchParams.get('year')
    const category = searchParams.get('category')

    let query = supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (exam_board) {
      query = query.eq('exam_board', exam_board)
    }
    if (level) {
      query = query.eq('level', level)
    }
    if (tier) {
      query = query.eq('tier', tier)
    }
    if (year) {
      query = query.eq('year', year)
    }
    if (category) {
      query = query.eq('category_id', category)
    }

    const { data: products, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(products)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
