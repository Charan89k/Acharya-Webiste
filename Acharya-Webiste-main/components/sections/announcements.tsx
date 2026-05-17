"use client"

import { useEffect, useState } from "react"
import { Bell, Sparkles } from "lucide-react"
import { loadAnnouncements } from "@/services/admin-store"

export function AnnouncementsSection() {
  const [announcements, setAnnouncements] = useState<Array<{ id: string; title: string; summary: string; category: string; active: boolean }>>([])

  useEffect(() => {
    setAnnouncements(loadAnnouncements())
  }, [])

  const activeAnnouncements = announcements.filter((item) => item.active)

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="mb-12 flex flex-col gap-3 text-center">
          <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.45em] text-primary">
            <Bell className="mr-2 h-4 w-4" />
            Latest Announcements
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-secondary">Community Notices</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Stay informed with the latest community announcements curated by the Acharya leadership team.
          </p>
        </div>

        {activeAnnouncements.length === 0 ? (
          <div className="rounded-[2rem] border border-primary/10 bg-white/80 p-12 text-center text-slate-600 shadow-lg shadow-slate-200/10">
            <p className="text-lg font-semibold text-secondary">No active announcements yet.</p>
            <p className="mt-3">Use the admin dashboard to publish the latest updates for your community.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activeAnnouncements.map((item) => (
              <article key={item.id} className="rounded-[1.75rem] border border-primary/10 bg-white/90 p-6 shadow-2xl shadow-slate-200/10">
                <div className="flex items-center gap-3 text-primary">
                  <Sparkles className="h-5 w-5" />
                  <span className="text-xs uppercase tracking-[0.35em]">{item.category}</span>
                </div>
                <h3 className="mt-4 text-xl font-serif text-secondary">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.summary}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
