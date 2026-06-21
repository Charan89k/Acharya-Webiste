"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { loadMessages, updateMessageRead, MessageData } from "@/services/admin-store"
import { Search, Mail, MailOpen, Calendar, User, MessageSquare } from "lucide-react"

export function MessageManager() {
  const [messages, setMessages] = useState<MessageData[]>([])
  const [search, setSearch] = useState('')
  const [filterRead, setFilterRead] = useState<'All' | 'Unread' | 'Read'>('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMessages() {
      try {
        const data = await loadMessages()
        setMessages(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchMessages()
  }, [])

  const filteredMessages = useMemo(() => {
    return messages.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.email.toLowerCase().includes(search.toLowerCase()) ||
        (m.subject || '').toLowerCase().includes(search.toLowerCase()) ||
        m.message.toLowerCase().includes(search.toLowerCase())
      
      const matchesRead =
        filterRead === 'All' ||
        (filterRead === 'Unread' && !m.read) ||
        (filterRead === 'Read' && m.read)

      return matchesSearch && matchesRead
    })
  }, [messages, search, filterRead])

  const handleToggleRead = async (id: string, currentRead: boolean) => {
    const success = await updateMessageRead(id, !currentRead)
    if (success) {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, read: !currentRead } : m))
      )
      toast({
        title: !currentRead ? 'Marked as read' : 'Marked as unread',
        description: 'Message status updated successfully.',
      })
    } else {
      toast({
        title: 'Status change failed',
        description: 'Could not update message read status.',
      })
    }
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/25">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.35em] text-teal-300/80">Contact Form Submissions</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Review community messages</h2>
        <p className="mt-3 text-slate-400">Read inquiries, follow-ups, and requests from public contact form submissions.</p>
      </div>

      {/* Filters & Search */}
      <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="flex gap-2 flex-wrap">
          {(['All', 'Unread', 'Read'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setFilterRead(mode)}
              className={`rounded-full px-4 py-2 text-xs uppercase tracking-wider font-semibold border transition-all duration-200 ${
                filterRead === mode
                  ? 'bg-teal-300/10 border-teal-300/40 text-teal-300'
                  : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'
              }`}
            >
              {mode} Messages
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search keyword, name, email"
            className="pl-10 bg-slate-950/90"
          />
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400">Loading messages...</div>
      ) : filteredMessages.length === 0 ? (
        <div className="p-12 text-center text-slate-400">No contact messages match your selection.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredMessages.map((m) => (
            <Card 
              key={m.id} 
              className={`border-white/10 shadow-lg transition-all duration-300 relative ${
                m.read ? 'bg-slate-950/40 opacity-75' : 'bg-slate-950/85 border-l-2 border-l-teal-400'
              }`}
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-white font-medium">
                      <User className="h-4 w-4 text-slate-400" />
                      <span>{m.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Mail className="h-3 w-3" />
                      <span>{m.email}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(m.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-3">
                  <p className="text-xs uppercase tracking-widest text-teal-400 font-semibold mb-1">
                    Subject: {m.subject || '(No Subject)'}
                  </p>
                  <p className="text-sm leading-relaxed text-slate-300 flex gap-2 items-start mt-2">
                    <MessageSquare className="h-4 w-4 text-slate-500 shrink-0 mt-0.5" />
                    <span className="whitespace-pre-wrap">{m.message}</span>
                  </p>
                </div>

                <div className="flex justify-end pt-2 border-t border-white/5">
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full text-xs font-semibold hover:bg-teal-300/10 border-teal-300/20 text-teal-300"
                    onClick={() => handleToggleRead(m.id, m.read)}
                  >
                    {m.read ? (
                      <>
                        <Mail className="h-3.5 w-3.5 mr-1" />
                        Mark Unread
                      </>
                    ) : (
                      <>
                        <MailOpen className="h-3.5 w-3.5 mr-1" />
                        Mark Read
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}
