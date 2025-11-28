import { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Package, Users, Star, MessageSquare, UserCheck, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin dashboard for IGCSE GCSE Maths',
}

export default async function AdminPage() {
  const supabase = await createClient()

  // Get counts
  const [
    { count: productCount },
    { count: classCount },
    { count: testimonialCount },
    { count: messageCount },
    { count: enrollmentCount },
    { count: unreadMessageCount },
    { count: pendingEnrollmentCount },
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('classes').select('*', { count: 'exact', head: true }),
    supabase.from('testimonials').select('*', { count: 'exact', head: true }),
    supabase.from('messages').select('*', { count: 'exact', head: true }),
    supabase.from('class_enrollments').select('*', { count: 'exact', head: true }),
    supabase.from('messages').select('*', { count: 'exact', head: true }).eq('is_read', false),
    supabase.from('class_enrollments').select('*', { count: 'exact', head: true }).eq('payment_status', 'pending'),
  ])

  const stats = [
    {
      title: 'Products',
      value: productCount || 0,
      icon: Package,
      href: '/admin/products',
      description: 'Digital products',
    },
    {
      title: 'Classes',
      value: classCount || 0,
      icon: Users,
      href: '/admin/classes',
      description: 'Group classes',
    },
    {
      title: 'Testimonials',
      value: testimonialCount || 0,
      icon: Star,
      href: '/admin/testimonials',
      description: 'Student reviews',
    },
    {
      title: 'Messages',
      value: messageCount || 0,
      icon: MessageSquare,
      href: '/admin/messages',
      description: `${unreadMessageCount || 0} unread`,
    },
    {
      title: 'Enrollments',
      value: enrollmentCount || 0,
      icon: UserCheck,
      href: '/admin/enrollments',
      description: `${pendingEnrollmentCount || 0} pending`,
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Manage your products, classes, and content.
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <Button variant="link" className="px-0 mt-2" asChild>
                <Link href={stat.href}>
                  Manage
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild className="w-full justify-start">
              <Link href="/admin/products">
                <Package className="mr-2 h-4 w-4" />
                Add New Product
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/classes">
                <Users className="mr-2 h-4 w-4" />
                Create New Class
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/testimonials">
                <Star className="mr-2 h-4 w-4" />
                Add Testimonial
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Items</CardTitle>
            <CardDescription>Items requiring attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {(unreadMessageCount || 0) > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  <span>{unreadMessageCount} unread messages</span>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/admin/messages">View</Link>
                </Button>
              </div>
            )}
            {(pendingEnrollmentCount || 0) > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-primary" />
                  <span>{pendingEnrollmentCount} pending enrollments</span>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/admin/enrollments">View</Link>
                </Button>
              </div>
            )}
            {(unreadMessageCount || 0) === 0 && (pendingEnrollmentCount || 0) === 0 && (
              <p className="text-muted-foreground text-sm">No pending items</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
