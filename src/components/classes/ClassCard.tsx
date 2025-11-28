'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, Users, Calendar, Globe } from 'lucide-react'
import { Class } from '@/types/database'

interface ClassCardProps {
  classItem: Class
  index?: number
  onEnrol?: (classId: string) => void
}

export function ClassCard({ classItem, index = 0, onEnrol }: ClassCardProps) {
  const spotsLeft = classItem.max_students - (classItem.enrollment_count || 0)
  const isFull = spotsLeft <= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className={`h-full ${isFull ? 'opacity-75' : 'hover:shadow-lg'} transition-shadow`}>
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant={classItem.status === 'active' ? 'default' : 'secondary'}>
              {classItem.status === 'active' ? 'Enrolling Now' : 'Coming Soon'}
            </Badge>
            {classItem.exam_board && (
              <Badge variant="outline">{classItem.exam_board}</Badge>
            )}
          </div>
          <CardTitle className="text-xl">{classItem.title}</CardTitle>
          {classItem.description && (
            <CardDescription>{classItem.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Class Details */}
          <div className="space-y-2 text-sm">
            {classItem.day && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{classItem.day}</span>
              </div>
            )}
            {classItem.time_uk && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{classItem.time_uk} (UK) / {classItem.time_gulf || 'TBC'} (Gulf)</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>
                {isFull ? 'Class Full' : `${spotsLeft} spots remaining`} (max {classItem.max_students})
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Globe className="h-4 w-4" />
              <span>Online via Zoom</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {classItem.level && (
              <Badge variant="outline" className="text-xs">{classItem.level}</Badge>
            )}
            {classItem.tier && (
              <Badge variant="outline" className="text-xs">{classItem.tier}</Badge>
            )}
          </div>

          {/* Price and Action */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <span className="text-2xl font-bold">£{classItem.price_per_student}</span>
              <span className="text-sm text-muted-foreground">/month</span>
            </div>
            <Button 
              disabled={isFull || classItem.status !== 'active'}
              onClick={() => onEnrol?.(classItem.id)}
            >
              {isFull ? 'Full' : 'Enrol Now'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
