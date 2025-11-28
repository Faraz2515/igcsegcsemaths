import { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { ClassesList } from '@/components/dashboard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'My Classes',
  description: 'View your enrolled classes',
}

export default async function ClassesPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return null
  }

  const { data: enrollments } = await supabase
    .from('class_enrollments')
    .select('*, class:classes(*)')
    .eq('user_id', user.id)
    .order('enrolled_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Classes</h1>
          <p className="text-muted-foreground mt-1">
            View and manage your class enrollments.
          </p>
        </div>
        <Button asChild>
          <Link href="/group-classes">Browse Classes</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enrolled Classes</CardTitle>
          <CardDescription>
            Your current and past class enrollments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ClassesList enrollments={enrollments || []} />
        </CardContent>
      </Card>
    </div>
  )
}
