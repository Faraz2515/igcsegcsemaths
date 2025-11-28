'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Video, Users } from 'lucide-react'
import { ClassEnrollment } from '@/types/database'
import { format } from 'date-fns'

interface ClassesListProps {
  enrollments: ClassEnrollment[]
}

export function ClassesList({ enrollments }: ClassesListProps) {
  if (enrollments.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
        <h3 className="font-semibold mb-2">No classes yet</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Enrol in a group class to see it here.
        </p>
        <Button asChild>
          <a href="/group-classes">Browse Classes</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {enrollments.map((enrollment) => (
        <Card key={enrollment.id}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{enrollment.class?.title || 'Unknown Class'}</CardTitle>
                {enrollment.class?.description && (
                  <CardDescription className="mt-1">{enrollment.class.description}</CardDescription>
                )}
              </div>
              <Badge
                variant={
                  enrollment.payment_status === 'confirmed'
                    ? 'default'
                    : enrollment.payment_status === 'pending'
                    ? 'secondary'
                    : 'destructive'
                }
              >
                {enrollment.payment_status === 'confirmed'
                  ? 'Active'
                  : enrollment.payment_status === 'pending'
                  ? 'Pending Payment'
                  : 'Cancelled'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                {enrollment.class?.day && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{enrollment.class.day}</span>
                  </div>
                )}
                {enrollment.class?.time_uk && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{enrollment.class.time_uk} (UK) / {enrollment.class.time_gulf || 'TBC'} (Gulf)</span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Video className="h-4 w-4" />
                  <span>Online via Zoom</span>
                </div>
                <p className="text-muted-foreground">
                  Enrolled: {format(new Date(enrollment.enrolled_at), 'MMM d, yyyy')}
                </p>
              </div>
            </div>

            {enrollment.payment_status === 'confirmed' && enrollment.class?.zoom_link && (
              <div className="mt-4 pt-4 border-t">
                <Button asChild>
                  <a href={enrollment.class.zoom_link} target="_blank" rel="noopener noreferrer">
                    <Video className="h-4 w-4 mr-2" />
                    Join Class
                  </a>
                </Button>
              </div>
            )}

            {enrollment.payment_status === 'pending' && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Your enrolment is pending payment confirmation. Please complete payment via {enrollment.payment_method || 'bank transfer'} and we will confirm your spot.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
