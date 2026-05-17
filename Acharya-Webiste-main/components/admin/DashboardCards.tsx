"use client"

import { Sparkles, ImageIcon, CalendarDays, Bell } from "lucide-react"

interface DashboardCardsProps {
  eventsCount: number
  galleryCount: number
  announcementsCount: number
  upcomingCount: number
}

export function DashboardCards({ eventsCount, galleryCount, announcementsCount, upcomingCount }: DashboardCardsProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-4">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/20">
        <div className="flex items-center justify-between gap-3">
          <div className="rounded-2xl bg-teal-300/10 p-3 text-teal-200">
            <CalendarDays className="h-5 w-5" />
          </div>
          <span className="text-xs uppercase tracking-[0.35em] text-slate-400">Events</span>
        </div>
        <p className="mt-8 text-4xl font-semibold text-white">{eventsCount}</p>
        <p className="mt-2 text-sm text-slate-400">Active event records</p>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/20">
        <div className="flex items-center justify-between gap-3">
          <div className="rounded-2xl bg-saffron-light/15 p-3 text-saffron-light">
            <ImageIcon className="h-5 w-5" />
          </div>
          <span className="text-xs uppercase tracking-[0.35em] text-slate-400">Gallery</span>
        </div>
        <p className="mt-8 text-4xl font-semibold text-white">{galleryCount}</p>
        <p className="mt-2 text-sm text-slate-400">Uploaded media items</p>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/20">
        <div className="flex items-center justify-between gap-3">
          <div className="rounded-2xl bg-primary/15 p-3 text-primary">
            <Bell className="h-5 w-5" />
          </div>
          <span className="text-xs uppercase tracking-[0.35em] text-slate-400">Announcements</span>
        </div>
        <p className="mt-8 text-4xl font-semibold text-white">{announcementsCount}</p>
        <p className="mt-2 text-sm text-slate-400">Active notice items</p>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/20">
        <div className="flex items-center justify-between gap-3">
          <div className="rounded-2xl bg-navy-light/10 p-3 text-navy-light">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-xs uppercase tracking-[0.35em] text-slate-400">Upcoming</span>
        </div>
        <p className="mt-8 text-4xl font-semibold text-white">{upcomingCount}</p>
        <p className="mt-2 text-sm text-slate-400">Upcoming event statuses</p>
      </div>
    </div>
  )
}
