'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Class } from '@/types/database'

interface ClassScheduleTableProps {
  classes: Class[]
  onEnrol?: (classId: string) => void
}

export function ClassScheduleTable({ classes, onEnrol }: ClassScheduleTableProps) {
  if (classes.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No classes currently scheduled. Check back soon!
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Class</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Day</TableHead>
            <TableHead>Time (UK)</TableHead>
            <TableHead>Time (Gulf)</TableHead>
            <TableHead>Spots</TableHead>
            <TableHead>Price</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classes.map((classItem) => {
            const spotsLeft = classItem.max_students - (classItem.enrollment_count || 0)
            const isFull = spotsLeft <= 0

            return (
              <TableRow key={classItem.id}>
                <TableCell className="font-medium">{classItem.title}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {classItem.level && <Badge variant="outline">{classItem.level}</Badge>}
                    {classItem.tier && <Badge variant="outline">{classItem.tier}</Badge>}
                  </div>
                </TableCell>
                <TableCell>{classItem.day || '-'}</TableCell>
                <TableCell>{classItem.time_uk || '-'}</TableCell>
                <TableCell>{classItem.time_gulf || '-'}</TableCell>
                <TableCell>
                  <Badge variant={isFull ? 'secondary' : 'default'}>
                    {isFull ? 'Full' : `${spotsLeft} left`}
                  </Badge>
                </TableCell>
                <TableCell>£{classItem.price_per_student}/mo</TableCell>
                <TableCell>
                  <Button 
                    size="sm" 
                    disabled={isFull || classItem.status !== 'active'}
                    onClick={() => onEnrol?.(classItem.id)}
                  >
                    Enrol
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
