'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, CheckCircle, XCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { format } from 'date-fns'

interface Enrollment {
  id: string
  class_id: string
  user_id: string
  payment_method: string | null
  payment_status: 'pending' | 'confirmed' | 'cancelled'
  enrolled_at: string
  class?: {
    title: string
    day: string
    time_uk: string
  }
  profile?: {
    full_name: string
    email?: string
  }
}

export default function AdminEnrollmentsPage() {
    const [enrollments, setEnrollments] = useState<Enrollment[]>([])
    const [loading, setLoading] = useState(true)
    const { toast } = useToast()

  const fetchEnrollments = async () => {
    try {
      const response = await fetch('/api/admin/class-enrollments')
      if (response.ok) {
        const data = await response.json()
        setEnrollments(data)
      }
    } catch (error) {
      console.error('Failed to fetch enrollments:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEnrollments()
  }, [])

  const handleUpdateStatus = async (id: string, status: 'confirmed' | 'cancelled') => {
    try {
      const response = await fetch(`/api/admin/class-enrollments/${id}/confirm`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payment_status: status }),
      })

      if (!response.ok) {
        throw new Error('Failed to update enrollment')
      }

      toast({
        title: 'Enrollment updated',
        description: `Enrollment has been ${status}.`,
      })

        fetchEnrollments()
      } catch {
        toast({
          title: 'Error',
          description: 'Failed to update enrollment',
          variant: 'destructive',
        })
      }
    }

  const pendingCount = enrollments.filter(e => e.payment_status === 'pending').length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Enrollments</h1>
        <p className="text-muted-foreground mt-1">
          Manage class enrollments and payment confirmations.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Enrollments</CardTitle>
          <CardDescription>
            {enrollments.length} enrollments total, {pendingCount} pending confirmation
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : enrollments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No enrollments yet
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Enrolled</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[70px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enrollments.map((enrollment) => (
                    <TableRow key={enrollment.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{enrollment.profile?.full_name || 'Unknown'}</p>
                          {enrollment.profile?.email && (
                            <p className="text-xs text-muted-foreground">{enrollment.profile.email}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{enrollment.class?.title || 'Unknown'}</TableCell>
                      <TableCell>
                        {enrollment.class?.day} {enrollment.class?.time_uk}
                      </TableCell>
                      <TableCell>{enrollment.payment_method || '-'}</TableCell>
                      <TableCell>
                        {format(new Date(enrollment.enrolled_at), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            enrollment.payment_status === 'confirmed'
                              ? 'default'
                              : enrollment.payment_status === 'pending'
                              ? 'secondary'
                              : 'destructive'
                          }
                        >
                          {enrollment.payment_status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {enrollment.payment_status === 'pending' && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleUpdateStatus(enrollment.id, 'confirmed')}
                              >
                                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                                Confirm Payment
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleUpdateStatus(enrollment.id, 'cancelled')}
                                className="text-destructive"
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                Cancel
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
