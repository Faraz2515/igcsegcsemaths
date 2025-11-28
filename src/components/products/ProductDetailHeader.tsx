'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText, ShoppingCart, Download } from 'lucide-react'
import { Product } from '@/types/database'

interface ProductDetailHeaderProps {
  product: Product
  isPurchased?: boolean
  onBuy?: () => void
  onDownload?: () => void
}

export function ProductDetailHeader({
  product,
  isPurchased = false,
  onBuy,
  onDownload,
}: ProductDetailHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid md:grid-cols-2 gap-8"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] bg-muted rounded-xl overflow-hidden">
        {product.thumbnail_url ? (
          <Image
            src={product.thumbnail_url}
            alt={product.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <FileText className="h-24 w-24 text-muted-foreground/30" />
          </div>
        )}
      </div>

      {/* Details */}
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {product.exam_board && (
              <Badge variant="secondary">{product.exam_board}</Badge>
            )}
            {product.level && (
              <Badge variant="outline">{product.level}</Badge>
            )}
            {product.tier && (
              <Badge variant="outline">{product.tier}</Badge>
            )}
            {product.year && (
              <Badge variant="outline">{product.year}</Badge>
            )}
          </div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          {product.short_description && (
            <p className="text-lg text-muted-foreground">{product.short_description}</p>
          )}
        </div>

        <div className="text-4xl font-bold text-primary">
          £{product.price.toFixed(2)}
        </div>

        <div className="flex gap-4">
          {isPurchased ? (
            <Button size="lg" className="flex-1" onClick={onDownload}>
              <Download className="mr-2 h-5 w-5" />
              Download
            </Button>
          ) : (
            <Button size="lg" className="flex-1" onClick={onBuy}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Buy Now
            </Button>
          )}
        </div>

        <div className="text-sm text-muted-foreground">
          <p>Instant download after purchase. PDF format.</p>
        </div>
      </div>
    </motion.div>
  )
}
