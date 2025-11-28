'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileText, ShoppingCart } from 'lucide-react'
import { Product } from '@/types/database'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow group overflow-hidden">
        {/* Thumbnail */}
        <div className="relative aspect-[4/3] bg-muted overflow-hidden">
          {product.thumbnail_url ? (
            <Image
              src={product.thumbnail_url}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <FileText className="h-12 w-12 text-muted-foreground/50" />
            </div>
          )}
          {product.exam_board && (
            <Badge className="absolute top-2 left-2" variant="secondary">
              {product.exam_board}
            </Badge>
          )}
        </div>

        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg line-clamp-2">{product.title}</CardTitle>
          </div>
          {product.short_description && (
            <CardDescription className="line-clamp-2">
              {product.short_description}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {product.level && (
              <Badge variant="outline" className="text-xs">{product.level}</Badge>
            )}
            {product.tier && (
              <Badge variant="outline" className="text-xs">{product.tier}</Badge>
            )}
            {product.year && (
              <Badge variant="outline" className="text-xs">{product.year}</Badge>
            )}
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xl font-bold">
              £{product.price.toFixed(2)}
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/past-papers/${product.slug}`}>View</Link>
              </Button>
              <Button size="sm">
                <ShoppingCart className="h-4 w-4 mr-1" />
                Buy
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
