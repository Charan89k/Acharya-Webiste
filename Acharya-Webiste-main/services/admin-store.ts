export type AdminEvent = {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  coverImage: string
  registrationLink: string
  status: 'upcoming' | 'completed'
  featured: boolean
  attendees: number
}

export type AdminGalleryItem = {
  id: string
  name: string
  caption: string
  category: 'Events' | 'Community' | 'Celebrations' | 'Heritage'
  imageUrl: string
  addedAt: string
}

export type AdminAnnouncement = {
  id: string
  title: string
  summary: string
  category: string
  active: boolean
  createdAt: string
}

export type AdminData = {
  events: AdminEvent[]
  gallery: AdminGalleryItem[]
  announcements: AdminAnnouncement[]
}

const STORAGE_KEY = 'acharya_admin_content'
const AUTH_KEY = 'acharya_admin_token'
const adminCredentials = {
  email: 'admin@acharya.org',
  password: 'Acharya@2026',
}

const initialData: AdminData = {
  events: [
    {
      id: 'event-1',
      title: 'Annual Cultural Festival',
      description:
        'A grand celebration of our heritage featuring classical performances, traditional arts, and cultural exhibitions. All community members are invited to participate.',
      date: 'March 15, 2026',
      time: '10:00 AM - 8:00 PM',
      location: 'Community Hall, Malkajgiri',
      category: 'Cultural',
      coverImage: '',
      registrationLink: '#',
      status: 'upcoming',
      featured: true,
      attendees: 250,
    },
    {
      id: 'event-2',
      title: 'WE Acharya - Women’s Day Special',
      description:
        'Celebrating women of our community with inspiring talks, skill workshops, and recognition of achievements.',
      date: 'March 8, 2026',
      time: '4:00 PM - 7:00 PM',
      location: 'Virtual & In-person',
      category: 'Empowerment',
      coverImage: '',
      registrationLink: '#',
      status: 'upcoming',
      featured: false,
      attendees: 120,
    },
    {
      id: 'event-3',
      title: 'Young Leaders Workshop',
      description:
        'Interactive session on leadership skills, career guidance, and networking opportunities for youth members.',
      date: 'February 22, 2026',
      time: '2:00 PM - 5:00 PM',
      location: 'Community Centre',
      category: 'Education',
      coverImage: '',
      registrationLink: '#',
      status: 'completed',
      featured: false,
      attendees: 80,
    },
  ],
  gallery: [],
  announcements: [
    {
      id: 'announcement-1',
      title: 'Malkajgiri Land Approved',
      summary:
        'The Telangana Government has approved the land allocation for the Acharya Community Complex in Malkajgiri.',
      category: 'Heritage',
      active: true,
      createdAt: new Date().toISOString(),
    },
  ],
}

function isBrowser() {
  return typeof window !== 'undefined'
}

function generateId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`
}

function getStoredData(): AdminData {
  if (!isBrowser()) {
    return initialData
  }

  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (raw) {
    try {
      return JSON.parse(raw) as AdminData
    } catch {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData))
  return initialData
}

function saveStoredData(data: AdminData) {
  if (!isBrowser()) {
    return
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function isAdminAuthenticated() {
  if (!isBrowser()) {
    return false
  }
  return window.localStorage.getItem(AUTH_KEY) === 'authenticated'
}

export function loginAdmin(email: string, password: string) {
  if (email === adminCredentials.email && password === adminCredentials.password) {
    window.localStorage.setItem(AUTH_KEY, 'authenticated')
    return true
  }
  return false
}

export function logoutAdmin() {
  if (!isBrowser()) {
    return
  }
  window.localStorage.removeItem(AUTH_KEY)
}

export function loadEvents(): AdminEvent[] {
  return getStoredData().events
}

export function saveEvents(events: AdminEvent[]) {
  const data = getStoredData()
  saveStoredData({ ...data, events })
}

export function loadGallery(): AdminGalleryItem[] {
  return getStoredData().gallery
}

export function saveGallery(gallery: AdminGalleryItem[]) {
  const data = getStoredData()
  saveStoredData({ ...data, gallery })
}

export function loadAnnouncements(): AdminAnnouncement[] {
  return getStoredData().announcements
}

export function saveAnnouncements(announcements: AdminAnnouncement[]) {
  const data = getStoredData()
  saveStoredData({ ...data, announcements })
}

export async function loadGalleryItems(): Promise<AdminGalleryItem[]> {
  const local = loadGallery()
  if (local.length > 0) {
    return local
  }

  try {
    const response = await fetch('/api/gallery')
    if (!response.ok) {
      return []
    }

    const data = await response.json()
    return (data as Array<{ id: string; name: string; imageUrl: string }>).map(
      (item) => ({
        id: item.id,
        name: item.name,
        caption: item.name,
        category: 'Community',
        imageUrl: item.imageUrl,
        addedAt: new Date().toISOString(),
      }),
    )
  } catch {
    return []
  }
}

export function createEvent(event: Omit<AdminEvent, 'id' | 'attendees'>) {
  const events = loadEvents()
  const nextEvent = {
    ...event,
    id: generateId('event'),
    attendees: event.attendees ?? 0,
  }
  saveEvents([nextEvent, ...events])
  return nextEvent
}

export function updateEvent(updatedEvent: AdminEvent) {
  const events = loadEvents().map((event) =>
    event.id === updatedEvent.id ? updatedEvent : event,
  )
  saveEvents(events)
}

export function deleteEvent(eventId: string) {
  saveEvents(loadEvents().filter((item) => item.id !== eventId))
}

export function createGalleryItem(item: Omit<AdminGalleryItem, 'id' | 'addedAt'>) {
  const gallery = loadGallery()
  const next = {
    ...item,
    id: generateId('gallery'),
    addedAt: new Date().toISOString(),
  }
  saveGallery([next, ...gallery])
  return next
}

export function updateGalleryItem(updatedItem: AdminGalleryItem) {
  const gallery = loadGallery().map((item) =>
    item.id === updatedItem.id ? updatedItem : item,
  )
  saveGallery(gallery)
}

export function deleteGalleryItem(itemId: string) {
  saveGallery(loadGallery().filter((item) => item.id !== itemId))
}

export function reorderGalleryItem(itemId: string, direction: 'up' | 'down') {
  const gallery = loadGallery()
  const index = gallery.findIndex((item) => item.id === itemId)
  if (index === -1) return
  const swapIndex = direction === 'up' ? index - 1 : index + 1
  if (swapIndex < 0 || swapIndex >= gallery.length) return
  const next = [...gallery]
  ;[next[index], next[swapIndex]] = [next[swapIndex], next[index]]
  saveGallery(next)
}

export function createAnnouncement(announcement: Omit<AdminAnnouncement, 'id' | 'createdAt'>) {
  const announcements = loadAnnouncements()
  const next = {
    ...announcement,
    id: generateId('announcement'),
    createdAt: new Date().toISOString(),
  }
  saveAnnouncements([next, ...announcements])
  return next
}

export function updateAnnouncement(updated: AdminAnnouncement) {
  const announcements = loadAnnouncements().map((item) =>
    item.id === updated.id ? updated : item,
  )
  saveAnnouncements(announcements)
}

export function deleteAnnouncement(announcementId: string) {
  saveAnnouncements(loadAnnouncements().filter((item) => item.id !== announcementId))
}
