"use client"

import { 
  Calendar, 
  Heart, 
  Users, 
  Award,
  TrendingUp,
  Clock,
  ChevronRight,
  Bell
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const stats = [
  {
    title: "Membership Status",
    value: "Life Member",
    icon: Award,
    trend: "Active since 2023",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Events Attended",
    value: "12",
    icon: Calendar,
    trend: "+3 this month",
    color: "text-emerald-600",
    bgColor: "bg-emerald-500/10",
  },
  {
    title: "Total Donations",
    value: "₹25,000",
    icon: Heart,
    trend: "+₹5,000 this year",
    color: "text-pink-600",
    bgColor: "bg-pink-500/10",
  },
  {
    title: "Community Points",
    value: "850",
    icon: TrendingUp,
    trend: "Top 10% contributor",
    color: "text-amber-600",
    bgColor: "bg-amber-500/10",
  },
]

const upcomingEvents = [
  {
    title: "Annual Cultural Festival",
    date: "March 15, 2026",
    status: "Registered",
  },
  {
    title: "Young Leaders Workshop",
    date: "February 22, 2026",
    status: "Registered",
  },
  {
    title: "Parampara: Heritage Stories",
    date: "February 15, 2026",
    status: "Open",
  },
]

const recentActivity = [
  {
    action: "Registered for Annual Cultural Festival",
    time: "2 hours ago",
  },
  {
    action: "Donated ₹5,000 to Infrastructure Fund",
    time: "1 week ago",
  },
  {
    action: "Attended WE Acharya Monthly Meeting",
    time: "2 weeks ago",
  },
  {
    action: "Updated profile information",
    time: "1 month ago",
  },
]

const notifications = [
  {
    title: "New Event Announcement",
    message: "Cultural Festival registrations are now open!",
    time: "1 day ago",
    unread: true,
  },
  {
    title: "Donation Receipt",
    message: "Your donation of ₹5,000 has been processed",
    time: "1 week ago",
    unread: false,
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8 pt-12 lg:pt-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-secondary">
            Welcome back, <span className="text-primary">John</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Here&apos;s what&apos;s happening in your community
          </p>
        </div>
        <Button className="w-fit rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:saffron-glow-sm">
          <Bell className="h-4 w-4 mr-2" />
          {notifications.filter(n => n.unread).length} New Notifications
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card border-secondary/10 hover:border-primary/30 transition-all duration-300 group shadow-sm hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className={cn("text-2xl font-serif mt-1", stat.color)}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-1">{stat.trend}</p>
                </div>
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", stat.bgColor)}>
                  <stat.icon className={cn("h-5 w-5", stat.color)} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Events */}
        <Card className="lg:col-span-2 bg-card border-secondary/10 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-serif text-xl text-secondary">Upcoming Events</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div
                key={event.title}
                className={cn(
                  "flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-primary/5 transition-colors",
                  index !== upcomingEvents.length - 1 && "border-b border-secondary/5"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-secondary">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                </div>
                <Badge
                  variant={event.status === "Registered" ? "default" : "outline"}
                  className={
                    event.status === "Registered"
                      ? "bg-primary/15 text-primary border-primary/30"
                      : "border-secondary/30 text-muted-foreground"
                  }
                >
                  {event.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-card border-secondary/10 shadow-sm">
          <CardHeader>
            <CardTitle className="font-serif text-xl text-secondary">Notifications</CardTitle>
            <CardDescription>Stay updated with community news</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.title}
                className={cn(
                  "p-3 rounded-lg transition-colors",
                  notification.unread ? "bg-primary/10" : "bg-muted/50"
                )}
              >
                <div className="flex items-start gap-2">
                  {notification.unread && (
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-secondary">{notification.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Activity & Progress */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="bg-card border-secondary/10 shadow-sm">
          <CardHeader>
            <CardTitle className="font-serif text-xl text-secondary">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="h-4 w-4 text-primary/70" />
                  </div>
                  <div>
                    <p className="text-sm text-secondary">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Community Group Progress */}
        <Card className="bg-card border-secondary/10 shadow-sm">
          <CardHeader>
            <CardTitle className="font-serif text-xl text-secondary">Your Community Groups</CardTitle>
            <CardDescription>Participation progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm text-secondary">Young Leaders</span>
                </div>
                <span className="text-xs text-muted-foreground">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm text-secondary">WE Acharya (Supporter)</span>
                </div>
                <span className="text-xs text-muted-foreground">60%</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm text-secondary">Core Committee</span>
                </div>
                <span className="text-xs text-muted-foreground">40%</span>
              </div>
              <Progress value={40} className="h-2" />
            </div>
            <Button variant="outline" className="w-full rounded-full border-secondary/20 text-secondary hover:bg-secondary hover:text-secondary-foreground">
              Explore More Groups
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
