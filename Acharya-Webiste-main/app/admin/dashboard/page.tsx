"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { AdminGuard } from "@/components/admin/AdminGuard"
import { Sidebar } from "@/components/admin/Sidebar"
import { DashboardCards } from "@/components/admin/DashboardCards"
import { EventManager } from "@/components/admin/EventManager"
import { GalleryManager } from "@/components/admin/GalleryManager"
import { AnnouncementManager } from "@/components/admin/AnnouncementManager"
import { loadEvents, loadGallery, loadAnnouncements, logoutAdmin } from "@/services/admin-store"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const sections = ['overview', 'events', 'gallery', 'announcements', 'updates'] as const

export default function AdminDashboardPage() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState<(typeof sections)[number]>('overview')
  const [events, setEvents] = useState(loadEvents())
  const [gallery, setGallery] = useState(loadGallery())
  const [announcements, setAnnouncements] = useState(loadAnnouncements())

  useEffect(() => {
    setEvents(loadEvents())
    setGallery(loadGallery())
    setAnnouncements(loadAnnouncements())
  }, [])

  const upcomingCount = useMemo(
    () => events.filter((event) => event.status === 'upcoming').length,
    [events],
  )

  const handleLogout = () => {
    logoutAdmin()
    router.push('/admin')
  }

  return (
    <AdminGuard>
      <main className="min-h-screen bg-slate-950 text-slate-100">
        <div className="container mx-auto px-6 py-10 lg:py-14">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-teal-300/80">Admin dashboard</p>
              <h1 className="mt-4 text-4xl font-serif text-white">Acharya Content Studio</h1>
              <p className="mt-3 max-w-2xl text-slate-400">
                Manage events, gallery uploads, announcements, and community updates from one secure interface.
              </p>
            </div>
            <Button
              variant="outline"
              className="rounded-full border-teal-300/20 text-teal-200 hover:bg-teal-300/10"
              onClick={handleLogout}
            >
              Log out
            </Button>
          </div>

          <div className="grid gap-8 xl:grid-cols-[280px_1fr]">
            <Sidebar section={activeSection} onSectionChange={setActiveSection} onLogout={handleLogout} />
            <div className="space-y-8">
              <DashboardCards
                eventsCount={events.length}
                galleryCount={gallery.length}
                announcementsCount={announcements.length}
                upcomingCount={upcomingCount}
              />

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="grid gap-8"
              >
                {activeSection === 'overview' && (
                  <section className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/25">
                    <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-center">
                      <div>
                        <p className="text-sm uppercase tracking-[0.35em] text-teal-300/80">Overview</p>
                        <h2 className="mt-3 text-3xl font-semibold text-white">Dashboard Summary</h2>
                        <p className="mt-3 text-slate-400">
                          Your workspace is connected to local persistent data. Admin changes update the public event and gallery pages immediately.
                        </p>
                      </div>
                      <div className="rounded-3xl bg-slate-950/80 p-5 text-sm text-slate-300 ring-1 ring-white/5">
                        <p className="font-semibold text-white">Featured</p>
                        <p className="mt-2 leading-6">
                          Build the Acharya experience with elegant content, secure admin controls, and visual storytelling.
                        </p>
                      </div>
                    </div>
                  </section>
                )}

                {activeSection === 'events' && <EventManager onUpdate={setEvents} />}
                {activeSection === 'gallery' && <GalleryManager onUpdate={setGallery} />}
                {activeSection === 'announcements' && <AnnouncementManager onUpdate={setAnnouncements} />}
                {activeSection === 'updates' && (
                  <section className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/25">
                    <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-center">
                      <div>
                        <p className="text-sm uppercase tracking-[0.35em] text-teal-300/80">Community Updates</p>
                        <h2 className="mt-3 text-3xl font-semibold text-white">Latest Activity</h2>
                        <p className="mt-3 text-slate-400">
                          This section surfaces the latest announcements and event status updates for Acharya stakeholders.
                        </p>
                      </div>
                      <div className="rounded-3xl bg-slate-950/80 p-5 text-sm text-slate-300 ring-1 ring-white/5">
                        <p className="font-semibold text-white">Current status</p>
                        <p className="mt-2 leading-6">{upcomingCount} upcoming events ready for promotion.</p>
                      </div>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
                        <p className="text-sm uppercase tracking-[0.35em] text-teal-300/80">Announcements live</p>
                        <p className="mt-4 text-3xl font-semibold text-white">{announcements.length}</p>
                        <p className="mt-2 text-slate-400">Create announcements that appear in your public feed and updates panel.</p>
                      </div>
                      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
                        <p className="text-sm uppercase tracking-[0.35em] text-teal-300/80">Gallery assets</p>
                        <p className="mt-4 text-3xl font-semibold text-white">{gallery.length}</p>
                        <p className="mt-2 text-slate-400">Upload and categorize community imagery with a luxury presentation.</p>
                      </div>
                    </div>
                  </section>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </AdminGuard>
  )
}
