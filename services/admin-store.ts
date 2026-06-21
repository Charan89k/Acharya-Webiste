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
  category: 'Community'
  imageUrl: string
  addedAt: string
  order: number
}

export type AdminAnnouncement = {
  id: string
  title: string
  summary: string
  category: string
  active: boolean
  createdAt: string
}

export type DonationData = {
  id: string
  name: string
  email: string
  amount: number
  date: string
  paymentStatus: 'Pending' | 'Completed' | 'Failed'
  message?: string
}

export type MemberData = {
  id: string
  name: string
  email: string
  memberType: 'Ordinary' | 'Life' | 'Patron'
  phone?: string
  address?: string
  joinedAt: string
}

export type MessageData = {
  id: string
  name: string
  email: string
  subject?: string
  message: string
  date: string
  read: boolean
}

export type SettingsData = {
  orgName: string
  address: string
  contactNumber: string
  email: string
  facebook: string
  twitter: string
  instagram: string
  youtube: string
  linkedin: string
}

export type ActivityLogData = {
  id: string
  action: string
  timestamp: string
  details?: string
}

function isBrowser() {
  return typeof window !== 'undefined'
}

// Check locally if session cookie might exist
export function isAdminAuthenticated(): boolean {
  if (!isBrowser()) return false
  return document.cookie.includes('admin_session=true')
}

// Authentication requests
export async function loginAdmin(email: string, password: string): Promise<{ success: boolean; error?: string; requirePasswordChange?: boolean }> {
  try {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    
    const data = await response.json()
    if (response.ok && data.success) {
      return { success: true, requirePasswordChange: data.requirePasswordChange }
    }
    return { success: false, error: data.error || 'Invalid credentials' }
  } catch (error) {
    console.error(error)
    return { success: false, error: 'Network error. Please try again.' }
  }
}

export async function changeAdminPassword(newPassword: string): Promise<boolean> {
  try {
    const response = await fetch('/api/admin/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newPassword }),
    })
    return response.ok
  } catch (error) {
    console.error(error)
    return false
  }
}

export async function logoutAdmin(): Promise<void> {
  try {
    await fetch('/api/admin/logout', { method: 'POST' })
  } catch (error) {
    console.error(error)
  }
}

// Events APIs
export async function loadEvents(): Promise<AdminEvent[]> {
  try {
    const response = await fetch('/api/events')
    if (!response.ok) return []
    const data = await response.json()
    return data.map((item: any) => ({
      id: item._id || item.id,
      title: item.title,
      description: item.description || '',
      date: item.date,
      time: item.time || '',
      location: item.location || '',
      category: item.category,
      coverImage: item.coverImage || '',
      registrationLink: item.registrationLink || '',
      status: item.status || 'upcoming',
      featured: !!item.featured,
      attendees: item.attendees || 0,
    }))
  } catch {
    return []
  }
}

export async function createEvent(event: Omit<AdminEvent, 'id' | 'attendees'>): Promise<AdminEvent | null> {
  try {
    const response = await fetch('/api/admin/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    })
    if (!response.ok) return null
    const item = await response.json()
    return {
      ...item,
      id: item._id,
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function updateEvent(updatedEvent: AdminEvent): Promise<boolean> {
  try {
    const response = await fetch('/api/admin/events', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: updatedEvent.id,
        title: updatedEvent.title,
        description: updatedEvent.description,
        date: updatedEvent.date,
        time: updatedEvent.time,
        location: updatedEvent.location,
        category: updatedEvent.category,
        coverImage: updatedEvent.coverImage,
        registrationLink: updatedEvent.registrationLink,
        status: updatedEvent.status,
        featured: updatedEvent.featured,
        attendees: updatedEvent.attendees,
      }),
    })
    return response.ok
  } catch (error) {
    console.error(error)
    return false
  }
}

export async function deleteEvent(eventId: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/admin/events?id=${eventId}`, {
      method: 'DELETE',
    })
    return response.ok
  } catch (error) {
    console.error(error)
    return false
  }
}

// Gallery APIs
export async function loadGalleryItems(): Promise<AdminGalleryItem[]> {
  try {
    const response = await fetch('/api/gallery')
    if (!response.ok) return []
    const data = await response.json()
    return data.map((item: any) => ({
      id: item.id || item._id,
      name: item.name,
      caption: item.caption || '',
      category: item.category || 'Community',
      imageUrl: item.imageUrl,
      addedAt: item.addedAt || new Date().toISOString(),
      order: typeof item.order === 'number' ? item.order : 0,
    }))
  } catch {
    return []
  }
}

export async function createGalleryItem(item: Omit<AdminGalleryItem, 'id' | 'addedAt' | 'order'>): Promise<AdminGalleryItem | null> {
  try {
    const response = await fetch('/api/admin/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    })
    if (!response.ok) return null
    const created = await response.json()
    return {
      ...created,
      id: created._id,
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function updateGalleryItem(updatedItem: AdminGalleryItem): Promise<boolean> {
  try {
    const response = await fetch('/api/admin/gallery', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: updatedItem.id,
        name: updatedItem.name,
        caption: updatedItem.caption,
        category: updatedItem.category,
        imageUrl: updatedItem.imageUrl,
        order: updatedItem.order,
      }),
    })
    return response.ok
  } catch (error) {
    console.error(error)
    return false
  }
}

export async function deleteGalleryItem(itemId: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/admin/gallery?id=${itemId}`, {
      method: 'DELETE',
    })
    return response.ok
  } catch (error) {
    console.error(error)
    return false
  }
}

export async function reorderGalleryItem(itemId: string, direction: 'up' | 'down'): Promise<void> {
  try {
    const items = await loadGalleryItems()
    const index = items.findIndex((item) => item.id === itemId)
    if (index === -1) return
    const swapIndex = direction === 'up' ? index - 1 : index + 1
    if (swapIndex < 0 || swapIndex >= items.length) return
    
    const item1 = items[index]
    const item2 = items[swapIndex]
    
    const tempOrder = item1.order
    item1.order = item2.order
    item2.order = tempOrder

    await Promise.all([
      updateGalleryItem(item1),
      updateGalleryItem(item2)
    ])
  } catch (error) {
    console.error("Failed to reorder gallery:", error)
  }
}

// Donations APIs
export async function loadDonations(): Promise<DonationData[]> {
  try {
    const response = await fetch('/api/admin/donations')
    if (!response.ok) return []
    const data = await response.json()
    return data.map((item: any) => ({
      id: item._id,
      name: item.name,
      email: item.email,
      amount: item.amount,
      date: item.date,
      paymentStatus: item.paymentStatus,
      message: item.message,
    }))
  } catch {
    return []
  }
}

export async function createDonation(donation: Omit<DonationData, 'id' | 'date' | 'paymentStatus'>): Promise<boolean> {
  try {
    const response = await fetch('/api/donations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(donation),
    })
    return response.ok
  } catch (error) {
    console.error(error)
    return false
  }
}

// Members APIs
export async function loadMembers(): Promise<MemberData[]> {
  try {
    const response = await fetch('/api/admin/members')
    if (!response.ok) return []
    const data = await response.json()
    return data.map((item: any) => ({
      id: item._id,
      name: item.name,
      email: item.email,
      memberType: item.memberType,
      phone: item.phone,
      address: item.address,
      joinedAt: item.joinedAt,
    }))
  } catch {
    return []
  }
}

export async function createMember(member: Omit<MemberData, 'id' | 'joinedAt'>): Promise<MemberData | null> {
  try {
    const response = await fetch('/api/admin/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(member),
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Failed to create member')
    return {
      ...data,
      id: data._id,
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function updateMember(updatedMember: MemberData): Promise<boolean> {
  try {
    const response = await fetch('/api/admin/members', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedMember),
    })
    return response.ok
  } catch (error) {
    console.error(error)
    return false
  }
}

export async function deleteMember(memberId: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/admin/members?id=${memberId}`, {
      method: 'DELETE',
    })
    return response.ok
  } catch (error) {
    console.error(error)
    return false
  }
}

// Contact Messages APIs
export async function loadMessages(): Promise<MessageData[]> {
  try {
    const response = await fetch('/api/admin/messages')
    if (!response.ok) return []
    const data = await response.json()
    return data.map((item: any) => ({
      id: item._id,
      name: item.name,
      email: item.email,
      subject: item.subject,
      message: item.message,
      date: item.date,
      read: !!item.read,
    }))
  } catch {
    return []
  }
}

export async function updateMessageRead(id: string, read: boolean): Promise<boolean> {
  try {
    const response = await fetch('/api/admin/messages', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, read }),
    })
    return response.ok
  } catch (error) {
    console.error(error)
    return false
  }
}

export async function createMessage(msg: Omit<MessageData, 'id' | 'date' | 'read'>): Promise<boolean> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(msg),
    })
    return response.ok
  } catch (error) {
    console.error(error)
    return false
  }
}

// Settings APIs
export async function loadSettings(): Promise<SettingsData | null> {
  try {
    const response = await fetch('/api/settings')
    if (!response.ok) return null
    return await response.json()
  } catch {
    return null
  }
}

export async function updateSettings(settings: SettingsData): Promise<boolean> {
  try {
    const response = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    })
    return response.ok
  } catch (error) {
    console.error(error)
    return false
  }
}

// Activity Logs APIs
export async function loadActivityLogs(): Promise<ActivityLogData[]> {
  try {
    const response = await fetch('/api/admin/activity-logs')
    if (!response.ok) return []
    const data = await response.json()
    return data.map((item: any) => ({
      id: item._id,
      action: item.action,
      timestamp: item.timestamp,
      details: item.details,
    }))
  } catch {
    return []
  }
}

// Legacy LocalStorage fallback announcements just in case they are still used
const STORAGE_KEY = 'acharya_admin_content'
const initialAnnouncements = [
  {
    id: 'announcement-1',
    title: 'Malkajgiri Land Approved',
    summary: 'The Telangana Government has approved the land allocation for the Acharya Community Complex in Malkajgiri.',
    category: 'Heritage',
    active: true,
    createdAt: new Date().toISOString(),
  },
]

export function loadAnnouncements(): AdminAnnouncement[] {
  if (!isBrowser()) return initialAnnouncements
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (raw) {
    try {
      return (JSON.parse(raw) as { announcements: AdminAnnouncement[] }).announcements || initialAnnouncements
    } catch {
      // ignore
    }
  }
  return initialAnnouncements
}

export function saveAnnouncements(announcements: AdminAnnouncement[]) {
  if (!isBrowser()) return
  const raw = window.localStorage.getItem(STORAGE_KEY)
  let currentData = { announcements: [] }
  if (raw) {
    try {
      currentData = JSON.parse(raw)
    } catch {
      // ignore
    }
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...currentData, announcements }))
}

export function createAnnouncement(announcement: Omit<AdminAnnouncement, 'id' | 'createdAt'>) {
  const announcements = loadAnnouncements()
  const next = {
    ...announcement,
    id: `announcement-${Math.random().toString(36).slice(2, 10)}`,
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
