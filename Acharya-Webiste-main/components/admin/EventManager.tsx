"use client"

import { useEffect, useMemo, useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import {
  createEvent,
  deleteEvent,
  loadEvents,
  saveEvents,
  updateEvent,
  AdminEvent,
} from "@/services/admin-store"

const categories = ['Cultural', 'Empowerment', 'Education', 'Heritage', 'Spiritual']
const statusOptions = ['upcoming', 'completed'] as const

const initialFormState: Omit<AdminEvent, 'id' | 'attendees'> = {
  title: '',
  description: '',
  date: '',
  time: '',
  location: '',
  category: 'Cultural',
  coverImage: '',
  registrationLink: '',
  status: 'upcoming',
  featured: false,
}

interface EventManagerProps {
  onUpdate: (events: AdminEvent[]) => void
}

export function EventManager({ onUpdate }: EventManagerProps) {
  const [events, setEvents] = useState<AdminEvent[]>([])
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'upcoming' | 'completed'>('all')
  const [formValues, setFormValues] = useState(initialFormState)
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    const current = loadEvents()
    setEvents(current)
  }, [])

  const filteredEvents = useMemo(
    () =>
      events.filter((event) => {
        const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase()) || event.category.toLowerCase().includes(search.toLowerCase())
        const matchesStatus = filterStatus === 'all' || event.status === filterStatus
        return matchesSearch && matchesStatus
      }),
    [events, filterStatus, search],
  )

  const resetForm = () => {
    setFormValues(initialFormState)
    setEditingId(null)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!formValues.title || !formValues.date) {
      toast({ title: 'Missing fields', description: 'Please enter title and date for the event.' })
      return
    }

    if (editingId) {
      updateEvent({ id: editingId, ...formValues, attendees: events.find((item) => item.id === editingId)?.attendees ?? 0 })
      const next = loadEvents()
      setEvents(next)
      onUpdate(next)
      toast({ title: 'Event updated', description: 'Your event has been updated successfully.' })
    } else {
      createEvent(formValues)
      const next = loadEvents()
      setEvents(next)
      onUpdate(next)
      toast({ title: 'Event added', description: 'New event saved to the public calendar.' })
    }

    resetForm()
  }

  const handleEdit = (eventData: AdminEvent) => {
    setEditingId(eventData.id)
    setFormValues({ ...eventData })
  }

  const handleDelete = (eventId: string) => {
    if (!window.confirm('Delete this event permanently?')) {
      return
    }
    deleteEvent(eventId)
    const next = loadEvents()
    setEvents(next)
    onUpdate(next)
    toast({ title: 'Event deleted', description: 'The event was removed from the dashboard.' })
  }

  const handleFileUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFormValues((current) => ({ ...current, coverImage: reader.result ?? '' }))
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/25">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-teal-300/80">Event Management</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Create and organize events</h2>
          <p className="mt-3 text-slate-400">Add details, schedule dates, and publish event content directly to the public events section.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-300">Title</label>
            <Input
              value={formValues.title}
              onChange={(event) => setFormValues({ ...formValues, title: event.target.value })}
              placeholder="Event title"
              className="mt-3 bg-slate-950/90"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Category</label>
            <select
              value={formValues.category}
              onChange={(event) => setFormValues({ ...formValues, category: event.target.value })}
              className="mt-3 w-full rounded-md border border-slate-700 bg-slate-950/90 px-3 py-2 text-slate-100"
            >
              {categories.map((category) => (
                <option key={category} value={category} className="bg-slate-950 text-slate-100">
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-300">Date</label>
              <Input
                type="date"
                value={formValues.date}
                onChange={(event) => setFormValues({ ...formValues, date: event.target.value })}
                className="mt-3 bg-slate-950/90"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300">Time</label>
              <Input
                type="time"
                value={formValues.time}
                onChange={(event) => setFormValues({ ...formValues, time: event.target.value })}
                className="mt-3 bg-slate-950/90"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300">Location</label>
            <Input
              value={formValues.location}
              onChange={(event) => setFormValues({ ...formValues, location: event.target.value })}
              placeholder="Venue or online link"
              className="mt-3 bg-slate-950/90"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Registration Link</label>
            <Input
              value={formValues.registrationLink}
              onChange={(event) => setFormValues({ ...formValues, registrationLink: event.target.value })}
              placeholder="https://"
              className="mt-3 bg-slate-950/90"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Status</label>
            <select
              value={formValues.status}
              onChange={(event) => setFormValues({ ...formValues, status: event.target.value as typeof statusOptions[number] })}
              className="mt-3 w-full rounded-md border border-slate-700 bg-slate-950/90 px-3 py-2 text-slate-100"
            >
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <Input
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0]
                if (file) {
                  handleFileUpload(file)
                }
              }}
              className="mt-3 text-slate-200"
            />
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <input
              type="checkbox"
              checked={formValues.featured}
              onChange={(event) => setFormValues({ ...formValues, featured: event.target.checked })}
              className="h-4 w-4 rounded border-slate-600 bg-slate-950 text-teal-300"
            />
            <span>Mark as featured event</span>
          </div>

          <Button type="submit" className="w-full rounded-full bg-teal-300 text-slate-950 hover:bg-teal-200">
            {editingId ? 'Update Event' : 'Add Event'}
          </Button>

          {editingId && (
            <Button type="button" variant="outline" className="w-full rounded-full" onClick={resetForm}>
              Cancel editing
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-300">Description</label>
            <Textarea
              value={formValues.description}
              onChange={(event) => setFormValues({ ...formValues, description: event.target.value })}
              placeholder="Add event details and agenda"
              className="mt-3 min-h-[220px] bg-slate-950/90"
            />
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5">
            <p className="text-sm uppercase tracking-[0.35em] text-teal-300/80">Cover preview</p>
            {formValues.coverImage ? (
              <img src={formValues.coverImage} alt="Cover preview" className="mt-4 h-48 w-full rounded-3xl object-cover" />
            ) : (
              <div className="mt-4 flex min-h-[200px] items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/5 text-slate-500">
                Upload a banner or paste an image URL above.
              </div>
            )}
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5">
            <p className="text-sm uppercase tracking-[0.35em] text-teal-300/80">Search & filters</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search events"
                className="bg-slate-950/90"
              />
              <select
                value={filterStatus}
                onChange={(event) => setFilterStatus(event.target.value as 'all' | 'upcoming' | 'completed')}
                className="rounded-md border border-slate-700 bg-slate-950/90 px-3 py-2 text-slate-100"
              >
                <option value="all">All statuses</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>
      </form>

      <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70">
        <table className="min-w-full divide-y divide-white/10 text-sm text-slate-200">
          <thead className="bg-slate-900/80 text-slate-400">
            <tr>
              <th className="px-6 py-4 text-left">Title</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 bg-slate-950/80">
            {filteredEvents.map((eventData) => (
              <tr key={eventData.id} className="hover:bg-white/5 transition-colors duration-200">
                <td className="px-6 py-4 font-medium text-white">{eventData.title}</td>
                <td className="px-6 py-4">{eventData.category}</td>
                <td className="px-6 py-4">{eventData.date}</td>
                <td className="px-6 py-4 capitalize text-teal-200">{eventData.status}</td>
                <td className="px-6 py-4 space-x-2">
                  <Button size="sm" variant="outline" className="rounded-full" onClick={() => handleEdit(eventData)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" className="rounded-full" onClick={() => handleDelete(eventData.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
