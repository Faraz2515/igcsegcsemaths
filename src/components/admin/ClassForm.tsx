'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { Class } from '@/types/database'

interface ClassFormProps {
  classItem?: Class
  onSuccess?: () => void
}

export function ClassForm({ classItem, onSuccess }: ClassFormProps) {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'active' | 'inactive'>(classItem?.status || 'active')
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      exam_board: formData.get('exam_board'),
      level: formData.get('level'),
      tier: formData.get('tier'),
      day: formData.get('day'),
      time_uk: formData.get('time_uk'),
      time_gulf: formData.get('time_gulf'),
      zoom_link: formData.get('zoom_link'),
      price_per_student: parseFloat(formData.get('price_per_student') as string) || 0,
      max_students: parseInt(formData.get('max_students') as string) || 6,
      status,
    }

    try {
      const url = classItem 
        ? `/api/admin/classes/${classItem.id}` 
        : '/api/admin/classes'
      const method = classItem ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to save class')
      }

      toast({
        title: classItem ? 'Class updated' : 'Class created',
        description: 'The class has been saved successfully.',
      })

      router.refresh()
      onSuccess?.()
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Something went wrong',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          name="title"
          defaultValue={classItem?.title || ''}
          placeholder="Class title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={classItem?.description || ''}
          placeholder="Class description"
          rows={3}
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="exam_board">Exam Board</Label>
          <Select name="exam_board" defaultValue={classItem?.exam_board || ''}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="edexcel">Edexcel</SelectItem>
              <SelectItem value="cambridge">Cambridge</SelectItem>
              <SelectItem value="aqa">AQA</SelectItem>
              <SelectItem value="ocr">OCR</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="level">Level</Label>
          <Select name="level" defaultValue={classItem?.level || ''}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gcse">GCSE</SelectItem>
              <SelectItem value="igcse">IGCSE</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tier">Tier</Label>
          <Select name="tier" defaultValue={classItem?.tier || ''}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="foundation">Foundation</SelectItem>
              <SelectItem value="higher">Higher</SelectItem>
              <SelectItem value="core">Core</SelectItem>
              <SelectItem value="extended">Extended</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="day">Day</Label>
          <Select name="day" defaultValue={classItem?.day || ''}>
            <SelectTrigger>
              <SelectValue placeholder="Select day" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Monday">Monday</SelectItem>
              <SelectItem value="Tuesday">Tuesday</SelectItem>
              <SelectItem value="Wednesday">Wednesday</SelectItem>
              <SelectItem value="Thursday">Thursday</SelectItem>
              <SelectItem value="Friday">Friday</SelectItem>
              <SelectItem value="Saturday">Saturday</SelectItem>
              <SelectItem value="Sunday">Sunday</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="time_uk">Time (UK)</Label>
          <Input
            id="time_uk"
            name="time_uk"
            defaultValue={classItem?.time_uk || ''}
            placeholder="e.g., 5:00 PM"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time_gulf">Time (Gulf)</Label>
          <Input
            id="time_gulf"
            name="time_gulf"
            defaultValue={classItem?.time_gulf || ''}
            placeholder="e.g., 8:00 PM"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="zoom_link">Zoom Link</Label>
        <Input
          id="zoom_link"
          name="zoom_link"
          defaultValue={classItem?.zoom_link || ''}
          placeholder="https://zoom.us/j/..."
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price_per_student">Price per Student (GBP) *</Label>
          <Input
            id="price_per_student"
            name="price_per_student"
            type="number"
            step="0.01"
            min="0"
            defaultValue={classItem?.price_per_student || ''}
            placeholder="50.00"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="max_students">Max Students</Label>
          <Input
            id="max_students"
            name="max_students"
            type="number"
            min="1"
            defaultValue={classItem?.max_students || 6}
            placeholder="6"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="status"
          checked={status === 'active'}
          onCheckedChange={(checked) => setStatus(checked ? 'active' : 'inactive')}
        />
        <Label htmlFor="status">Active (visible on site)</Label>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : classItem ? 'Update Class' : 'Create Class'}
        </Button>
      </div>
    </form>
  )
}
