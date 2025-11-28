'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'

interface ContactFormProps {
  type?: 'contact' | 'intro-session'
}

export function ContactForm({ type = 'contact' }: ContactFormProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      country: formData.get('country'),
      level: formData.get('level'),
      exam_board: formData.get('exam_board'),
      message: formData.get('message'),
      type,
    }

    try {
      const endpoint = type === 'intro-session' ? '/api/intro-session' : '/api/contact'
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to send message')
      }

      toast({
        title: type === 'intro-session' ? 'Request Submitted!' : 'Message Sent!',
        description: type === 'intro-session' 
          ? 'I will contact you within 24 hours to schedule your free intro session.'
          : 'Thank you for your message. I will get back to you soon.',
      })

      // Reset form
      e.currentTarget.reset()
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
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            name="name"
            placeholder="Your name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            required
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Select name="country">
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="uae">UAE</SelectItem>
              <SelectItem value="qatar">Qatar</SelectItem>
              <SelectItem value="saudi">Saudi Arabia</SelectItem>
              <SelectItem value="pakistan">Pakistan</SelectItem>
              <SelectItem value="india">India</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="exam_board">Exam Board</Label>
          <Select name="exam_board">
            <SelectTrigger>
              <SelectValue placeholder="Select exam board" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="edexcel">Edexcel</SelectItem>
              <SelectItem value="cambridge">Cambridge</SelectItem>
              <SelectItem value="aqa">AQA</SelectItem>
              <SelectItem value="ocr">OCR</SelectItem>
              <SelectItem value="unsure">Not Sure</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="level">Current Level</Label>
        <Select name="level">
          <SelectTrigger>
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gcse-foundation">GCSE Foundation</SelectItem>
            <SelectItem value="gcse-higher">GCSE Higher</SelectItem>
            <SelectItem value="igcse-core">IGCSE Core</SelectItem>
            <SelectItem value="igcse-extended">IGCSE Extended</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          {type === 'intro-session' ? 'Tell me about your goals' : 'Your Message'} *
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder={
            type === 'intro-session'
              ? 'What are your current challenges? What grade are you aiming for? Any specific topics you need help with?'
              : 'How can I help you?'
          }
          rows={5}
          required
        />
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={loading}>
        {loading 
          ? 'Sending...' 
          : type === 'intro-session' 
            ? 'Request Free Intro Session' 
            : 'Send Message'
        }
      </Button>
    </form>
  )
}
