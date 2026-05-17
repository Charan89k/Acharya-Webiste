"use client"

import { Button } from "@/components/ui/button"
import { Home, ImageIcon, CalendarDays, Bell, Sparkles, LogOut } from "lucide-react"

interface SidebarProps {
  section: string
  onSectionChange: (section: string) => void
  onLogout: () => void
}

const items = [
  { key: 'overview', label: 'Overview', icon: Home },
  { key: 'events', label: 'Manage Events', icon: CalendarDays },
  { key: 'gallery', label: 'Manage Gallery', icon: ImageIcon },
  { key: 'announcements', label: 'Announcements', icon: Bell },
  { key: 'updates', label: 'Community Updates', icon: Sparkles },
]

export function Sidebar({ section, onSectionChange, onLogout }: SidebarProps) {
  return (
    <aside className="sticky top-28 hidden lg:block w-full max-w-xs shrink-0 rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-2xl shadow-black/25 backdrop-blur-xl">
      <div className="mb-10 rounded-[1.75rem] bg-slate-900/80 p-5 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-teal-300/80">Admin Panel</p>
        <h2 className="mt-4 text-2xl font-serif text-white">Acharya Control</h2>
        <p className="mt-3 text-sm text-slate-400">Manage events, gallery uploads, announcements, and activity at a glance.</p>
      </div>

      <div className="space-y-3">
        {items.map((item) => {
          const Icon = item.icon
          const active = section === item.key
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onSectionChange(item.key)}
              className={`flex w-full items-center gap-3 rounded-3xl px-4 py-3 text-left transition-all duration-200 ${
                active
                  ? 'bg-teal-300/10 text-white ring-1 ring-teal-300/30'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-8 border-t border-white/10 pt-6">
        <Button
          variant="outline"
          size="default"
          className="w-full rounded-full border-teal-300/20 text-teal-200 hover:bg-teal-300/10"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    </aside>
  )
}
