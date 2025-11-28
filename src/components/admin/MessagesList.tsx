'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Mail, MailOpen, Trash2, Calendar, Globe, BookOpen } from 'lucide-react'
import { Message } from '@/types/database'
import { format } from 'date-fns'
import { useToast } from '@/hooks/use-toast'

interface MessagesListProps {
  messages: Message[]
}

export function MessagesList({ messages }: MessagesListProps) {
  const [loading, setLoading] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const handleMarkAsRead = async (id: string, isRead: boolean) => {
    setLoading(id)
    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_read: !isRead }),
      })

      if (!response.ok) {
        throw new Error('Failed to update message')
      }

        router.refresh()
      } catch {
        toast({
          title: 'Error',
          description: 'Failed to update message',
          variant: 'destructive',
        })
      } finally {
        setLoading(null)
      }
    }

    const handleDelete = async (id: string) => {
      setLoading(id)
      try {
        const response = await fetch(`/api/admin/messages/${id}`, {
          method: 'DELETE',
        })

        if (!response.ok) {
          throw new Error('Failed to delete message')
        }

        toast({
          title: 'Message deleted',
          description: 'The message has been deleted.',
        })

        router.refresh()
      } catch {
        toast({
        title: 'Error',
        description: 'Failed to delete message',
        variant: 'destructive',
      })
    } finally {
      setLoading(null)
    }
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-12">
        <Mail className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
        <h3 className="font-semibold mb-2">No messages yet</h3>
        <p className="text-sm text-muted-foreground">
          Messages from the contact form will appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <Card key={message.id} className={message.is_read ? 'opacity-75' : ''}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                {message.is_read ? (
                  <MailOpen className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Mail className="h-4 w-4 text-primary" />
                )}
                <CardTitle className="text-lg">{message.name}</CardTitle>
                <Badge variant={message.type === 'intro-session' ? 'default' : 'secondary'}>
                  {message.type === 'intro-session' ? 'Intro Session' : 'Contact'}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleMarkAsRead(message.id, message.is_read)}
                  disabled={loading === message.id}
                >
                  {message.is_read ? 'Mark Unread' : 'Mark Read'}
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete message?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the message.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(message.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            <CardDescription className="flex items-center gap-4 mt-2">
              <span>{message.email}</span>
              {message.country && (
                <span className="flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  {message.country}
                </span>
              )}
              {message.level && (
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3 w-3" />
                  {message.level}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {format(new Date(message.created_at), 'MMM d, yyyy h:mm a')}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm whitespace-pre-wrap">{message.message}</p>
            {message.exam_board && (
              <p className="text-sm text-muted-foreground mt-2">
                Exam Board: {message.exam_board}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
