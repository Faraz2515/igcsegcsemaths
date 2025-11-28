import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

async function isAdmin(supabase: Awaited<ReturnType<typeof createClient>>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  
  return profile?.role === 'admin'
}

export async function GET() {
  try {
    const supabase = await createClient()
    
    if (!(await isAdmin(supabase))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: classes, error } = await supabase
      .from('classes')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(classes)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    
    if (!(await isAdmin(supabase))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      title,
      description,
      exam_board,
      level,
      tier,
      day,
      time_uk,
      time_gulf,
      zoom_link,
      price_per_student,
      max_students,
      status,
    } = body

    if (!title || price_per_student === undefined) {
      return NextResponse.json(
        { error: 'Title and price are required' },
        { status: 400 }
      )
    }

    const { data: classData, error } = await supabase
      .from('classes')
      .insert({
        title,
        description,
        exam_board,
        level,
        tier,
        day,
        time_uk,
        time_gulf,
        zoom_link,
        price_per_student,
        max_students: max_students || 6,
        status: status || 'active',
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(classData)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
