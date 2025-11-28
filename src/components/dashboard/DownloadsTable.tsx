'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download, FileText } from 'lucide-react'
import { Purchase } from '@/types/database'
import { format } from 'date-fns'
import { useToast } from '@/hooks/use-toast'

interface DownloadsTableProps {
  purchases: Purchase[]
}

export function DownloadsTable({ purchases }: DownloadsTableProps) {
  const [downloading, setDownloading] = useState<string | null>(null)
  const { toast } = useToast()

  const handleDownload = async (purchaseId: string) => {
    setDownloading(purchaseId)
    try {
      const response = await fetch(`/api/me/purchases/${purchaseId}/download`)
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to download')
      }

      const data = await response.json()
      
      // Open download URL in new tab
      window.open(data.url, '_blank')
      
      toast({
        title: 'Download started',
        description: 'Your file is being downloaded.',
      })
    } catch (error) {
      toast({
        title: 'Download failed',
        description: error instanceof Error ? error.message : 'Something went wrong',
        variant: 'destructive',
      })
    } finally {
      setDownloading(null)
    }
  }

  if (purchases.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
        <h3 className="font-semibold mb-2">No downloads yet</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Purchase resources to see them here.
        </p>
        <Button asChild>
          <a href="/past-papers">Browse Resources</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Purchased</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchases.map((purchase) => (
            <TableRow key={purchase.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{purchase.product?.title || 'Unknown Product'}</p>
                    {purchase.product?.exam_board && (
                      <p className="text-xs text-muted-foreground">{purchase.product.exam_board}</p>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  {purchase.product?.level && (
                    <Badge variant="outline" className="text-xs">{purchase.product.level}</Badge>
                  )}
                  {purchase.product?.tier && (
                    <Badge variant="outline" className="text-xs">{purchase.product.tier}</Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {format(new Date(purchase.created_at), 'MMM d, yyyy')}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  onClick={() => handleDownload(purchase.id)}
                  disabled={downloading === purchase.id}
                >
                  {downloading === purchase.id ? (
                    'Downloading...'
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </>
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
