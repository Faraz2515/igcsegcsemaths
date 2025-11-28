import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ purchaseId: string }> }
) {
  try {
    const supabase = await createClient()
    const { purchaseId } = await params
    
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify purchase belongs to user
    const { data: purchase, error: purchaseError } = await supabase
      .from('purchases')
      .select('*, product:products(*)')
      .eq('id', purchaseId)
      .eq('user_id', user.id)
      .single()

    if (purchaseError || !purchase) {
      return NextResponse.json({ error: 'Purchase not found' }, { status: 404 })
    }

    if (!purchase.product?.file_url) {
      return NextResponse.json({ error: 'File not available' }, { status: 404 })
    }

    // Log download
    await supabase.from('downloads').insert({
      purchase_id: purchaseId,
      user_id: user.id,
      product_id: purchase.product_id,
      downloaded_at: new Date().toISOString(),
    })

    return NextResponse.json({ url: purchase.product.file_url })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
