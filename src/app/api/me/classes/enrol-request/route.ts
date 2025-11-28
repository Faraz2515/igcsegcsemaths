import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { class_id, payment_method } = body

    if (!class_id) {
      return NextResponse.json({ error: 'Class ID is required' }, { status: 400 })
    }

    // Check if class exists and is active
    const { data: classData, error: classError } = await supabase
      .from('classes')
      .select('*')
      .eq('id', class_id)
      .eq('status', 'active')
      .single()

    if (classError || !classData) {
      return NextResponse.json({ error: 'Class not found or inactive' }, { status: 404 })
    }

    // Check if already enrolled
    const { data: existingEnrollment } = await supabase
      .from('class_enrollments')
      .select('id')
      .eq('class_id', class_id)
      .eq('user_id', user.id)
      .single()

    if (existingEnrollment) {
      return NextResponse.json({ error: 'Already enrolled in this class' }, { status: 400 })
    }

    // Check if class is full
    const { count: enrollmentCount } = await supabase
      .from('class_enrollments')
      .select('*', { count: 'exact', head: true })
      .eq('class_id', class_id)
      .eq('payment_status', 'confirmed')

    if (enrollmentCount && enrollmentCount >= classData.max_students) {
      return NextResponse.json({ error: 'Class is full' }, { status: 400 })
    }

    // Create enrollment
    const { data: enrollment, error: enrollmentError } = await supabase
      .from('class_enrollments')
      .insert({
        class_id,
        user_id: user.id,
        payment_method: payment_method || 'bank_transfer',
        payment_status: 'pending',
        enrolled_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (enrollmentError) {
      return NextResponse.json({ error: enrollmentError.message }, { status: 500 })
    }

    // TODO: Send email notification via Resend
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'noreply@igcsegcsemaths.com',
    //   to: process.env.ADMIN_EMAIL!,
    //   subject: `New Class Enrollment Request`,
    //   html: `...`,
    // })

    return NextResponse.json({ success: true, enrollment })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
