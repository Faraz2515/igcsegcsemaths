'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { AdminTable, ClassForm } from '@/components/admin'
import { Plus } from 'lucide-react'
import { Class } from '@/types/database'
import { useToast } from '@/hooks/use-toast'

export default function AdminClassesPage() {
  const [classes, setClasses] = useState<Class[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingClass, setEditingClass] = useState<Class | null>(null)
    const [deletingClass, setDeletingClass] = useState<Class | null>(null)
    const { toast } = useToast()

  const fetchClasses = async () => {
    try {
      const response = await fetch('/api/admin/classes')
      if (response.ok) {
        const data = await response.json()
        setClasses(data)
      }
    } catch (error) {
      console.error('Failed to fetch classes:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClasses()
  }, [])

  const handleDelete = async () => {
    if (!deletingClass) return

    try {
      const response = await fetch(`/api/admin/classes/${deletingClass.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete class')
      }

      toast({
        title: 'Class deleted',
        description: 'The class has been deleted successfully.',
      })

      fetchClasses()
        } catch {
          toast({
            title: 'Error',
            description: 'Failed to delete class',
            variant: 'destructive',
          })
        } finally {
      setDeletingClass(null)
    }
  }

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'day', label: 'Day' },
    { key: 'time_uk', label: 'Time (UK)' },
    { key: 'level', label: 'Level' },
    { 
      key: 'price_per_student', 
      label: 'Price',
      render: (value: unknown) => `£${Number(value || 0).toFixed(2)}`
    },
    { key: 'max_students', label: 'Max Students' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: unknown) => (
        <Badge variant={value === 'active' ? 'default' : 'secondary'}>
          {value === 'active' ? 'Active' : 'Inactive'}
        </Badge>
      )
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Classes</h1>
          <p className="text-muted-foreground mt-1">
            Manage your group classes.
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingClass(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Class
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingClass ? 'Edit Class' : 'Add Class'}</DialogTitle>
              <DialogDescription>
                {editingClass ? 'Update the class details below.' : 'Fill in the class details below.'}
              </DialogDescription>
            </DialogHeader>
            <ClassForm 
              classItem={editingClass || undefined} 
              onSuccess={() => {
                setDialogOpen(false)
                fetchClasses()
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Classes</CardTitle>
          <CardDescription>
            {classes.length} classes total
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : (
            <AdminTable
              columns={columns}
              data={classes as unknown as Record<string, unknown>[]}
              onEdit={(row) => {
                setEditingClass(row as unknown as Class)
                setDialogOpen(true)
              }}
              onDelete={(row) => setDeletingClass(row as unknown as Class)}
            />
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!deletingClass} onOpenChange={() => setDeletingClass(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete class?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the class
              &quot;{deletingClass?.title}&quot;.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
