"use client"

import { useEffect, useMemo, useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import {
  AdminAnnouncement,
  createAnnouncement,
  deleteAnnouncement,
  loadAnnouncements,
  saveAnnouncements,
  updateAnnouncement,
} from "@/services/admin-store"

const categories = ['General', 'Event', 'Community', 'Heritage']

interface AnnouncementManagerProps {
  onUpdate: (announcements: AdminAnnouncement[]) => void
}

export function AnnouncementManager({ onUpdate }: AnnouncementManagerProps) {
  const [announcements, setAnnouncements] = useState<AdminAnnouncement[]>([])
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [category, setCategory] = useState('General')
  const [active, setActive] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    setAnnouncements(loadAnnouncements())
  }, [])

  const activeCount = useMemo(() => announcements.filter((item) => item.active).length, [announcements])

  const resetForm = () => {
    setTitle('')
    setSummary('')
    setCategory('General')
    setActive(true)
    setEditingId(null)
  }

  const refreshAnnouncements = () => {
    const current = loadAnnouncements()
    setAnnouncements(current)
    onUpdate(current)
  }

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!title || !summary) {
      toast({ title: 'Incomplete announcement', description: 'Please add a title and brief summary.' })
      return
    }

    if (editingId) {
      updateAnnouncement({ id: editingId, title, summary, category, active, createdAt: announcements.find((item) => item.id === editingId)?.createdAt ?? new Date().toISOString() })
      toast({ title: 'Announcement updated', description: 'Your announcement has been refreshed.' })
    } else {
      createAnnouncement({ title, summary, category, active })
      toast({ title: 'Announcement created', description: 'It will appear in the public feed.' })
    }

    refreshAnnouncements()
    resetForm()
  }

  const handleEdit = (item: AdminAnnouncement) => {
    setEditingId(item.id)
    setTitle(item.title)
    setSummary(item.summary)
    setCategory(item.category)
    setActive(item.active)
  }

  const handleDelete = (itemId: string) => {
    if (!window.confirm('Remove this announcement?')) {
      return
    }
    deleteAnnouncement(itemId)
    refreshAnnouncements()
    toast({ title: 'Removed', description: 'Announcement has been deleted.' })
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/25">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.35em] text-teal-300/80">Announcements</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Publish updates for the community</h2>
        <p className="mt-3 text-slate-400">Create, edit, and retire announcement content from the admin system.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <form onSubmit={handleSave} className="space-y-4 rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6">
          <div>
            <label className="text-sm font-medium text-slate-300">Title</label>
            <Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Announcement title" className="mt-3 bg-slate-950/90" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Summary</label>
            <Textarea value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short announcement text" className="mt-3 min-h-[160px] bg-slate-950/90" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Category</label>
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="mt-3 w-full rounded-md border border-slate-700 bg-slate-950/90 px-3 py-2 text-slate-100">
              {categories.map((option) => (
                <option key={option} value={option} className="bg-slate-950 text-slate-100">
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" checked={active} onChange={(event) => setActive(event.target.checked)} className="h-4 w-4 rounded border-slate-600 bg-slate-950 text-teal-300" />
            <span className="text-sm text-slate-300">Keep this announcement active</span>
          </div>
          <Button type="submit" className="w-full rounded-full bg-teal-300 text-slate-950 hover:bg-teal-200">
            {editingId ? 'Update Announcement' : 'Publish Announcement'}
          </Button>
          {editingId && (
            <Button type="button" variant="outline" className="w-full rounded-full" onClick={() => { resetForm(); }}>
              Clear form
            </Button>
          )}
        </form>

        <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6">
          <p className="text-sm uppercase tracking-[0.35em] text-teal-300/80">Live announcements</p>
          <p className="mt-3 text-slate-400">Active items: {activeCount}</p>
          <div className="mt-6 space-y-4">
            {announcements.map((item) => (
              <div key={item.id} className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-teal-300/80">{item.category}</p>
                    <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.35em] ${item.active ? 'bg-emerald-500/15 text-emerald-200' : 'bg-slate-600/20 text-slate-300'}`}>
                    {item.active ? 'Live' : 'Draft'}
                  </span>
                </div>
                <p className="mt-3 text-slate-400">{item.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" className="rounded-full" onClick={() => handleEdit(item)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" className="rounded-full" onClick={() => handleDelete(item.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
