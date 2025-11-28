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
import { AdminTable, TestimonialsForm } from '@/components/admin'
import { Plus, Star } from 'lucide-react'
import { Testimonial } from '@/types/database'
import { useToast } from '@/hooks/use-toast'

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
    const [deletingTestimonial, setDeletingTestimonial] = useState<Testimonial | null>(null)
    const { toast } = useToast()

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/admin/testimonials')
      if (response.ok) {
        const data = await response.json()
        setTestimonials(data)
      }
    } catch (error) {
      console.error('Failed to fetch testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const handleDelete = async () => {
    if (!deletingTestimonial) return

    try {
      const response = await fetch(`/api/admin/testimonials/${deletingTestimonial.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete testimonial')
      }

      toast({
        title: 'Testimonial deleted',
        description: 'The testimonial has been deleted successfully.',
      })

        fetchTestimonials()
      } catch {
        toast({
          title: 'Error',
          description: 'Failed to delete testimonial',
          variant: 'destructive',
        })
      } finally {
        setDeletingTestimonial(null)
      }
    }

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'country', label: 'Country' },
    { 
      key: 'quote', 
      label: 'Quote',
      render: (value: unknown) => {
        const quote = String(value || '')
        return quote.length > 50 ? `${quote.substring(0, 50)}...` : quote
      }
    },
    { key: 'result', label: 'Result' },
    { 
      key: 'rating', 
      label: 'Rating',
      render: (value: unknown) => (
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          {value}
        </div>
      )
    },
    { 
      key: 'is_active', 
      label: 'Status',
      render: (value: unknown) => (
        <Badge variant={value ? 'default' : 'secondary'}>
          {value ? 'Active' : 'Inactive'}
        </Badge>
      )
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Testimonials</h1>
          <p className="text-muted-foreground mt-1">
            Manage student testimonials.
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingTestimonial(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}</DialogTitle>
              <DialogDescription>
                {editingTestimonial ? 'Update the testimonial details below.' : 'Fill in the testimonial details below.'}
              </DialogDescription>
            </DialogHeader>
            <TestimonialsForm 
              testimonial={editingTestimonial || undefined} 
              onSuccess={() => {
                setDialogOpen(false)
                fetchTestimonials()
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Testimonials</CardTitle>
          <CardDescription>
            {testimonials.length} testimonials total
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : (
            <AdminTable
              columns={columns}
              data={testimonials as unknown as Record<string, unknown>[]}
              onEdit={(row) => {
                setEditingTestimonial(row as unknown as Testimonial)
                setDialogOpen(true)
              }}
              onDelete={(row) => setDeletingTestimonial(row as unknown as Testimonial)}
            />
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!deletingTestimonial} onOpenChange={() => setDeletingTestimonial(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete testimonial?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the testimonial
              from &quot;{deletingTestimonial?.name}&quot;.
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
