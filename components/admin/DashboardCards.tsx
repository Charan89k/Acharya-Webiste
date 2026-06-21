"use client"

import { ImageIcon, CalendarDays, Heart, Users } from "lucide-react"

interface DashboardCardsProps {
  eventsCount: number
  galleryCount: number
  donationsTotal: number
  membersCount: number
}

export function DashboardCards({ eventsCount, galleryCount, donationsTotal, membersCount }: DashboardCardsProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {/* Events */}
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/20">
        <div className="flex items-center justify-between gap-3">
          <div className="rounded-2xl bg-teal-300/10 p-3 text-teal-200">
            <CalendarDays className="h-5 w-5" />
          </div>
          <span className="text-xs uppercase tracking-[0.35em] text-slate-400">Events</span>
        </div>
        <p className="mt-8 text-4xl font-semibold text-white">{eventsCount}</p>
        <p className="mt-2 text-sm text-slate-400">Total event schedules</p>
      </div>

      {/* Gallery */}
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/20">
        <div className="flex items-center justify-between gap-3">
          <div className="rounded-2xl bg-teal-300/10 p-3 text-teal-200">
            <ImageIcon className="h-5 w-5" />
          </div>
          <span className="text-xs uppercase tracking-[0.35em] text-slate-400">Gallery</span>
        </div>
        <p className="mt-8 text-4xl font-semibold text-white">{galleryCount}</p>
        <p className="mt-2 text-sm text-slate-400">Media library items</p>
      </div>

      {/* Donations */}
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/20">
        <div className="flex items-center justify-between gap-3">
          <div className="rounded-2xl bg-teal-300/10 p-3 text-teal-200">
            <Heart className="h-5 w-5" />
          </div>
          <span className="text-xs uppercase tracking-[0.35em] text-slate-400">Donations</span>
        </div>
        <p className="mt-8 text-3xl font-semibold text-white">₹{donationsTotal.toLocaleString()}</p>
        <p className="mt-2 text-sm text-slate-400">Total contributions logged</p>
      </div>

      {/* Members */}
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/20">
        <div className="flex items-center justify-between gap-3">
          <div className="rounded-2xl bg-teal-300/10 p-3 text-teal-200">
            <Users className="h-5 w-5" />
          </div>
          <span className="text-xs uppercase tracking-[0.35em] text-slate-400">Members</span>
        </div>
        <p className="mt-8 text-4xl font-semibold text-white">{membersCount}</p>
        <p className="mt-2 text-sm text-slate-400">Registered member profiles</p>
      </div>
    </div>
  )
}
