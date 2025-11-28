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
import { Testimonial } from '@/types/database'

interface TestimonialsFormProps {
  testimonial?: Testimonial
  onSuccess?: () => void
}

export function TestimonialsForm({ testimonial, onSuccess }: TestimonialsFormProps) {
  const [loading, setLoading] = useState(false)
  const [isActive, setIsActive] = useState(testimonial?.is_active ?? true)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      country: formData.get('country'),
      quote: formData.get('quote'),
      result: formData.get('result'),
      rating: parseInt(formData.get('rating') as string) || 5,
      is_active: isActive,
    }

    try {
      const url = testimonial 
        ? `/api/admin/testimonials/${testimonial.id}` 
        : '/api/admin/testimonials'
      const method = testimonial ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to save testimonial')
      }

      toast({
        title: testimonial ? 'Testimonial updated' : 'Testimonial created',
        description: 'The testimonial has been saved successfully.',
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
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Student/Parent Name *</Label>
          <Input
            id="name"
            name="name"
            defaultValue={testimonial?.name || ''}
            placeholder="John D."
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Select name="country" defaultValue={testimonial?.country || ''}>
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="UK">United Kingdom</SelectItem>
              <SelectItem value="UAE">UAE</SelectItem>
              <SelectItem value="Qatar">Qatar</SelectItem>
              <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
              <SelectItem value="Pakistan">Pakistan</SelectItem>
              <SelectItem value="India">India</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="quote">Testimonial Quote *</Label>
        <Textarea
          id="quote"
          name="quote"
          defaultValue={testimonial?.quote || ''}
          placeholder="What did they say about your tutoring?"
          rows={4}
          required
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="result">Result Achieved</Label>
          <Input
            id="result"
            name="result"
            defaultValue={testimonial?.result || ''}
            placeholder="e.g., Grade 9, A*"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rating">Rating (1-5)</Label>
          <Select name="rating" defaultValue={String(testimonial?.rating || 5)}>
            <SelectTrigger>
              <SelectValue placeholder="Select rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="2">2 Stars</SelectItem>
              <SelectItem value="1">1 Star</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="is_active"
          checked={isActive}
          onCheckedChange={setIsActive}
        />
        <Label htmlFor="is_active">Active (visible on site)</Label>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : testimonial ? 'Update Testimonial' : 'Create Testimonial'}
        </Button>
      </div>
    </form>
  )
}
