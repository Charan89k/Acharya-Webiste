"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  User, 
  Calendar, 
  Heart, 
  Users, 
  Settings,
  LogOut,
  ChevronLeft,
  Menu
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
  { icon: Calendar, label: "Events", href: "/dashboard/events" },
  { icon: Heart, label: "Donations", href: "/dashboard/donations" },
  { icon: Users, label: "Community", href: "/dashboard/community" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border text-secondary shadow-md"
        aria-label="Toggle menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-secondary/10 backdrop-blur-sm z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar - Light Theme */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full z-40 transition-all duration-300",
          "bg-card border-r border-border shadow-lg",
          isCollapsed ? "w-20" : "w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8 px-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10 shrink-0">
                <Image
                  src="/images/logo-icon.jpg"
                  alt="ACHARYA Logo"
                  fill
                  className="object-contain"
                />
              </div>
              {!isCollapsed && (
                <span className="font-serif text-lg tracking-[0.12em] text-secondary">
                  ACHARYA
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-secondary transition-colors"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <ChevronLeft className={cn(
                "h-4 w-4 transition-transform",
                isCollapsed && "rotate-180"
              )} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-primary/15 text-primary border border-primary/20"
                      : "text-muted-foreground hover:text-secondary hover:bg-muted"
                  )}
                >
                  <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-primary")} />
                  {!isCollapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* User Section */}
          <div className="pt-4 border-t border-border">
            <div className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg bg-muted/50",
              isCollapsed && "justify-center"
            )}>
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 shrink-0">
                <span className="text-xs font-semibold text-primary">JD</span>
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-secondary truncate">John Doe</p>
                  <p className="text-xs text-muted-foreground truncate">Life Member</p>
                </div>
              )}
            </div>
            
            <Button
              variant="ghost"
              className={cn(
                "w-full mt-2 text-muted-foreground hover:text-red-500 hover:bg-red-50",
                isCollapsed ? "justify-center px-2" : "justify-start px-3"
              )}
            >
              <LogOut className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2 text-sm">Log out</span>}
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
