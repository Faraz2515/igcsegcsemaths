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
import { Product } from '@/types/database'

interface ProductFormProps {
  product?: Product
  onSuccess?: () => void
}

export function ProductForm({ product, onSuccess }: ProductFormProps) {
  const [loading, setLoading] = useState(false)
  const [isActive, setIsActive] = useState(product?.is_active ?? true)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get('title'),
      slug: formData.get('slug'),
      description: formData.get('description'),
      short_description: formData.get('short_description'),
      exam_board: formData.get('exam_board'),
      level: formData.get('level'),
      tier: formData.get('tier'),
      year: formData.get('year'),
      price: parseFloat(formData.get('price') as string) || 0,
      lemonsqueezy_id: formData.get('lemonsqueezy_id'),
      file_url: formData.get('file_url'),
      thumbnail_url: formData.get('thumbnail_url'),
      is_active: isActive,
    }

    try {
      const url = product 
        ? `/api/admin/products/${product.id}` 
        : '/api/admin/products'
      const method = product ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to save product')
      }

      toast({
        title: product ? 'Product updated' : 'Product created',
        description: 'The product has been saved successfully.',
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
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            name="title"
            defaultValue={product?.title || ''}
            placeholder="Product title"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug *</Label>
          <Input
            id="slug"
            name="slug"
            defaultValue={product?.slug || ''}
            placeholder="product-slug"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="short_description">Short Description</Label>
        <Input
          id="short_description"
          name="short_description"
          defaultValue={product?.short_description || ''}
          placeholder="Brief description for listings"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Full Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={product?.description || ''}
          placeholder="Detailed product description"
          rows={4}
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="exam_board">Exam Board</Label>
          <Select name="exam_board" defaultValue={product?.exam_board || ''}>
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
          <Select name="level" defaultValue={product?.level || ''}>
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
          <Select name="tier" defaultValue={product?.tier || ''}>
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

        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            name="year"
            defaultValue={product?.year || ''}
            placeholder="2024"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price (GBP) *</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            defaultValue={product?.price || ''}
            placeholder="9.99"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lemonsqueezy_id">LemonSqueezy Product ID</Label>
          <Input
            id="lemonsqueezy_id"
            name="lemonsqueezy_id"
            defaultValue={product?.lemonsqueezy_id || ''}
            placeholder="ls_product_id"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="file_url">File URL</Label>
          <Input
            id="file_url"
            name="file_url"
            defaultValue={product?.file_url || ''}
            placeholder="https://..."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="thumbnail_url">Thumbnail URL</Label>
          <Input
            id="thumbnail_url"
            name="thumbnail_url"
            defaultValue={product?.thumbnail_url || ''}
            placeholder="https://..."
          />
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
          {loading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
        </Button>
      </div>
    </form>
  )
}
