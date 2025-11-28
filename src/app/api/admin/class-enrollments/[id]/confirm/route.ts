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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const { id } = await params
    
    if (!(await isAdmin(supabase))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { payment_status } = body

    if (!['confirmed', 'cancelled', 'pending'].includes(payment_status)) {
      return NextResponse.json(
        { error: 'Invalid payment status' },
        { status: 400 }
      )
    }

    const { data: enrollment, error } = await supabase
      .from('class_enrollments')
      .update({ payment_status })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // TODO: Send email notification via Resend when confirmed
    // if (payment_status === 'confirmed') {
    //   const resend = new Resend(process.env.RESEND_API_KEY)
    //   await resend.emails.send({
    //     from: 'noreply@igcsegcsemaths.com',
    //     to: userEmail,
    //     subject: 'Your Class Enrollment is Confirmed!',
    //     html: `...`,
    //   })
    // }

    return NextResponse.json(enrollment)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
