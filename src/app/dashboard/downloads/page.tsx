import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { DownloadsTable } from '@/components/dashboard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'My Downloads',
  description: 'Access your purchased resources',
}

export default async function DownloadsPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return null
  }

  const { data: purchases } = await supabase
    .from('purchases')
    .select('*, product:products(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Downloads</h1>
        <p className="text-muted-foreground mt-1">
          Access and download your purchased resources.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Purchased Resources</CardTitle>
          <CardDescription>
            Click download to get your files. Downloads are available indefinitely.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DownloadsTable purchases={purchases || []} />
        </CardContent>
      </Card>
    </div>
  )
}
