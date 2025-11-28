import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function verifyWebhookSignature(payload: string, signature: string): boolean {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET
  if (!secret) return false

  const hmac = crypto.createHmac('sha256', secret)
  const digest = hmac.update(payload).digest('hex')
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))
}

export async function POST(request: Request) {
  try {
    const payload = await request.text()
    const signature = request.headers.get('x-signature') || ''

    // Verify webhook signature
    if (!verifyWebhookSignature(payload, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const data = JSON.parse(payload)
    const eventName = data.meta?.event_name

    // Handle order_created event
    if (eventName === 'order_created') {
      const order = data.data
      const attributes = order.attributes
      const customData = data.meta?.custom_data || {}

      const userId = customData.user_id
      const productIds = customData.product_ids || []

      if (!userId) {
        console.error('No user_id in webhook custom data')
        return NextResponse.json({ error: 'Missing user_id' }, { status: 400 })
      }

      // Create order record
      const { data: orderRecord, error: orderError } = await supabaseAdmin
        .from('orders')
        .insert({
          user_id: userId,
          ls_order_id: order.id,
          total_amount: attributes.total / 100, // Convert from cents
          currency: attributes.currency,
          status: attributes.status === 'paid' ? 'paid' : 'pending',
        })
        .select()
        .single()

      if (orderError) {
        console.error('Error creating order:', orderError)
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
      }

      // Create purchase records for each product
      for (const productId of productIds) {
        const { error: purchaseError } = await supabaseAdmin
          .from('purchases')
          .insert({
            user_id: userId,
            product_id: productId,
            order_id: orderRecord.id,
          })

        if (purchaseError) {
          console.error('Error creating purchase:', purchaseError)
        }
      }

      // TODO: Send confirmation email via Resend
      // const resend = new Resend(process.env.RESEND_API_KEY)
      // const { data: user } = await supabaseAdmin.auth.admin.getUserById(userId)
      // if (user?.user?.email) {
      //   await resend.emails.send({
      //     from: 'noreply@igcsegcsemaths.com',
      //     to: user.user.email,
      //     subject: 'Your Purchase Confirmation',
      //     html: `...`,
      //   })
      // }

      return NextResponse.json({ success: true })
    }

    // Handle subscription events if needed
    if (eventName === 'subscription_created' || eventName === 'subscription_updated') {
      // Handle subscription logic here
      return NextResponse.json({ success: true })
    }

    // Handle refund events
    if (eventName === 'order_refunded') {
      const order = data.data
      const lsOrderId = order.id

      // Update order status
      await supabaseAdmin
        .from('orders')
        .update({ status: 'refunded' })
        .eq('ls_order_id', lsOrderId)

      return NextResponse.json({ success: true })
    }

    // Unknown event type
    return NextResponse.json({ received: true })
  } catch {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
