"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { AdminGuard } from "@/components/admin/AdminGuard"
import { Sidebar } from "@/components/admin/Sidebar"
import { DashboardCards } from "@/components/admin/DashboardCards"
import { EventManager } from "@/components/admin/EventManager"
import { GalleryManager } from "@/components/admin/GalleryManager"
import { DonationManager } from "@/components/admin/DonationManager"
import { MemberManager } from "@/components/admin/MemberManager"
import { MessageManager } from "@/components/admin/MessageManager"
import { SettingsManager } from "@/components/admin/SettingsManager"
import {
  loadEvents,
  loadGalleryItems,
  loadDonations,
  loadMembers,
  loadActivityLogs,
  logoutAdmin,
  AdminEvent,
  AdminGalleryItem,
  DonationData,
  MemberData,
  ActivityLogData,
} from "@/services/admin-store"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Clock, User, ShieldAlert } from "lucide-react"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState<string>('dashboard')
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [loading, setLoading] = useState(true)

  // Data states
  const [events, setEvents] = useState<AdminEvent[]>([])
  const [gallery, setGallery] = useState<AdminGalleryItem[]>([])
  const [donations, setDonations] = useState<DonationData[]>([])
  const [members, setMembers] = useState<MemberData[]>([])
  const [activityLogs, setActivityLogs] = useState<ActivityLogData[]>([])

  const fetchData = async () => {
    try {
      const [eventsData, galleryData, donationsData, membersData, logsData] = await Promise.all([
        loadEvents(),
        loadGalleryItems(),
        loadDonations(),
        loadMembers(),
        loadActivityLogs(),
      ])
      setEvents(eventsData)
      setGallery(galleryData)
      setDonations(donationsData)
      setMembers(membersData)
      setActivityLogs(logsData)
    } catch (error) {
      console.error("Error fetching dashboard statistics:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [activeSection])

  const donationsTotal = useMemo(() => {
    return donations.reduce((sum, d) => sum + d.amount, 0)
  }, [donations])

  const handleLogout = async () => {
    await logoutAdmin()
    router.push('/admin')
  }

  return (
    <AdminGuard>
      <main className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}>
        <div className="container mx-auto px-6 py-10 lg:py-14">
          
          {/* Header */}
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-white/10 pb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-teal-500 font-semibold">Admin workspace</p>
              <h1 className={`mt-2 text-4xl font-serif font-semibold ${isDarkMode ? 'text-white' : 'text-teal-950'}`}>
                Acharya Content Studio
              </h1>
              <p className={`mt-2 max-w-2xl text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Manage published events, gallery photos, member registries, donor contributions, and site configurations.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Dark/Light mode Toggle */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`rounded-full border transition-all duration-300 ${
                  isDarkMode 
                    ? 'border-white/10 text-teal-300 hover:bg-white/5 bg-slate-900' 
                    : 'border-slate-200 text-teal-700 hover:bg-slate-100 bg-white'
                }`}
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>

              <Button
                variant="outline"
                className={`rounded-full border px-5 ${
                  isDarkMode 
                    ? 'border-teal-300/20 text-teal-200 hover:bg-teal-300/10' 
                    : 'border-teal-600/30 text-teal-700 hover:bg-teal-50 bg-white'
                }`}
                onClick={handleLogout}
              >
                Log out
              </Button>
            </div>
          </div>

          <div className="grid gap-8 xl:grid-cols-[280px_1fr]">
            
            {/* Sidebar */}
            <Sidebar section={activeSection} onSectionChange={setActiveSection} onLogout={handleLogout} />
            
            {/* Main Content Pane */}
            <div className="space-y-8">
              {loading ? (
                <div className="flex h-64 items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-400 border-t-transparent"></div>
                </div>
              ) : (
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="grid gap-8 animate-none"
                >
                  {/* Dashboard / Overview Section */}
                  {activeSection === 'dashboard' && (
                    <div className="space-y-8">
                      <DashboardCards
                        eventsCount={events.length}
                        galleryCount={gallery.length}
                        donationsTotal={donationsTotal}
                        membersCount={members.length}
                      />

                      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
                        
                        {/* Left column: Activity Log */}
                        <div className={`rounded-[2rem] border p-8 shadow-xl ${
                          isDarkMode ? 'border-white/10 bg-slate-900/90' : 'border-slate-200 bg-white'
                        }`}>
                          <div className="mb-6 flex items-center gap-2">
                            <Clock className="h-5 w-5 text-teal-400" />
                            <h2 className="text-xl font-serif font-semibold">Activity Log History</h2>
                          </div>
                          
                          <div className="h-px bg-white/5 mb-6 w-full" />
                          
                          <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 scrollbar-thin">
                            {activityLogs.length === 0 ? (
                              <p className="text-sm text-slate-500 py-6 text-center">No logged actions recorded yet.</p>
                            ) : (
                              activityLogs.map((log) => (
                                <div 
                                  key={log.id} 
                                  className={`rounded-2xl p-4 border text-sm transition-all duration-200 ${
                                    isDarkMode 
                                      ? 'border-white/5 bg-slate-950/80 hover:bg-slate-950' 
                                      : 'border-slate-100 bg-slate-50 hover:bg-slate-100/70'
                                  }`}
                                >
                                  <div className="flex items-start justify-between gap-2">
                                    <p className="font-semibold text-teal-400">{log.action}</p>
                                    <span className="text-xs text-slate-500 font-medium">
                                      {new Date(log.timestamp).toLocaleString()}
                                    </span>
                                  </div>
                                  <p className={`mt-1.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                    {log.details || 'No additional log details.'}
                                  </p>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        {/* Right column: Admin Profile Card */}
                        <div className={`rounded-[2rem] border p-8 shadow-xl self-start ${
                          isDarkMode ? 'border-white/10 bg-slate-900/90' : 'border-slate-200 bg-white'
                        }`}>
                          <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-4 shadow-inner">
                              <User className="h-10 w-10" />
                            </div>
                            <h3 className="text-lg font-serif font-semibold">ACHARYA Admin</h3>
                            <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">Super Administrator</p>
                            
                            <div className="mt-6 w-full text-left space-y-3 rounded-2xl bg-slate-950/70 border border-white/5 p-4 text-xs text-slate-400">
                              <p className="flex justify-between">
                                <span>Platform System:</span>
                                <span className="font-semibold text-slate-200">Next.js + MongoDB</span>
                              </p>
                              <p className="flex justify-between">
                                <span>Session Status:</span>
                                <span className="font-semibold text-teal-400 flex items-center gap-1">
                                  <span className="h-2 w-2 rounded-full bg-teal-400 animate-ping"></span>
                                  Secure JWT
                                </span>
                              </p>
                            </div>

                            <div className="mt-6 flex flex-col gap-2 w-full">
                              <Button 
                                onClick={() => setActiveSection('settings')}
                                className="w-full rounded-full bg-teal-300 hover:bg-teal-200 text-slate-950 text-xs font-semibold"
                              >
                                Edit Org Settings
                              </Button>
                              <Button 
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                variant="outline" 
                                className="w-full rounded-full text-xs border-white/10"
                              >
                                Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
                              </Button>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* Section Managers mapping */}
                  {activeSection === 'events' && <EventManager onUpdate={setEvents} />}
                  {activeSection === 'gallery' && <GalleryManager onUpdate={setGallery} />}
                  {activeSection === 'donations' && <DonationManager />}
                  {activeSection === 'members' && <MemberManager />}
                  {activeSection === 'messages' && <MessageManager />}
                  {activeSection === 'settings' && <SettingsManager />}
                  
                </motion.div>
              )}
            </div>

          </div>
        </div>
      </main>
    </AdminGuard>
  )
}
