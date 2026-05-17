"use client"

import { useEffect, useState } from "react"
import { Calendar, MapPin, Clock, ChevronRight, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { loadEvents } from "@/services/admin-store"

interface EventItem {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  featured: boolean
  attendees: number
}

const categoryColors: Record<string, string> = {
  Cultural: "bg-primary/15 text-primary border-primary/30",
  Empowerment: "bg-pink-500/15 text-pink-600 border-pink-500/30",
  Education: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
  Heritage: "bg-amber-500/15 text-amber-600 border-amber-500/30",
  Spiritual: "bg-indigo-500/15 text-indigo-600 border-indigo-500/30",
}

export function EventsSection() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)

  useEffect(() => {
    setEvents(loadEvents())
  }, [])

  return (
    <section id="events" className="py-24 bg-background relative">
      {/* Top Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary bg-primary/5">
            Community Calendar
          </Badge>
          <h2 className="font-serif text-4xl md:text-5xl text-secondary mb-4 text-balance">
            Upcoming Events
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join us in cultural celebrations, educational workshops, and spiritual gatherings
          </p>
          <div className="h-1 w-24 mx-auto mt-6 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
        </div>

        {/* Featured Event */}
        {events.filter(e => e.featured).map(event => (
          <div key={event.id} className="mb-12">
            <Card className="bg-card border-secondary/10 shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-gradient-to-br from-primary/20 to-primary/5 p-8 flex flex-col justify-center items-center text-center">
                  <Badge variant="outline" className="mb-4 border-primary text-primary bg-primary/10">
                    Featured Event
                  </Badge>
                  <Calendar className="h-12 w-12 text-primary mb-4" />
                  <p className="font-serif text-2xl text-primary">{event.date}</p>
                  <p className="text-muted-foreground mt-2">{event.time}</p>
                </div>
                <div className="md:w-2/3 p-8">
                  <Badge className={cn("mb-4 border", categoryColors[event.category])}>
                    {event.category}
                  </Badge>
                  <h3 className="font-serif text-2xl md:text-3xl text-secondary mb-4">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {event.description}
                  </p>
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4 text-primary" />
                      {event.attendees}+ Expected
                    </div>
                  </div>
                  <Button className="mt-6 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:saffron-glow-sm">
                    Register Now
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ))}

        {/* Event Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {events.filter(e => !e.featured).map((event) => (
            <Card
              key={event.id}
              className={cn(
                "bg-card border-secondary/10 transition-all duration-300 cursor-pointer group",
                "hover:border-primary/30 hover:shadow-md",
                selectedEvent === event.id && "border-primary/40 shadow-lg"
              )}
              onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <Badge className={cn("border", categoryColors[event.category])}>
                    {event.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    {event.attendees}+
                  </div>
                </div>
                <CardTitle className="font-serif text-xl text-secondary group-hover:text-primary transition-colors mt-3">
                  {event.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 text-primary/70" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary/70" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary/70" />
                    {event.location}
                  </div>
                </div>
                
                <div className={cn(
                  "overflow-hidden transition-all duration-300",
                  selectedEvent === event.id ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                )}>
                  <p className="text-sm text-muted-foreground leading-relaxed pt-4 border-t border-secondary/10">
                    {event.description}
                  </p>
                  <Button variant="outline" size="sm" className="mt-4 rounded-full border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground">
                    Learn More
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="outline" className="rounded-full px-8 border-secondary/30 text-secondary hover:bg-secondary hover:text-secondary-foreground">
            View All Events
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </section>
  )
}
