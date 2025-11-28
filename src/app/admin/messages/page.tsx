import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MessagesList } from '@/components/admin'

export const metadata: Metadata = {
  title: 'Messages',
  description: 'View and manage contact messages',
}

export default async function AdminMessagesPage() {
  const supabase = await createClient()

  const { data: messages } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })

  const unreadCount = messages?.filter(m => !m.is_read).length || 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground mt-1">
          View and manage contact form submissions.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Messages</CardTitle>
          <CardDescription>
            {messages?.length || 0} messages total, {unreadCount} unread
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MessagesList messages={messages || []} />
        </CardContent>
      </Card>
    </div>
  )
}
