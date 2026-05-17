"use client"

import { 
  Landmark, 
  BookOpen, 
  Users, 
  Heart, 
  Sparkles, 
  GraduationCap, 
  TreeDeciduous, 
  Building2 
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const initiatives = [
  {
    title: "Cultural & Spiritual Centre",
    description: "A sacred space for spiritual gatherings, meditation, and traditional ceremonies honoring our heritage.",
    icon: Landmark,
  },
  {
    title: "Vedic & Academic Institutions",
    description: "Centres of learning combining ancient Vedic wisdom with modern educational excellence.",
    icon: BookOpen,
  },
  {
    title: "Youth Development",
    description: "Programs and facilities dedicated to nurturing young minds and future leaders.",
    icon: Users,
  },
  {
    title: "Community Welfare",
    description: "Services and support systems for the well-being of all community members.",
    icon: Heart,
  },
  {
    title: "Women Empowerment",
    description: "Dedicated spaces and programs for skill development and women leadership.",
    icon: Sparkles,
  },
  {
    title: "Education & Training",
    description: "Modern classrooms and workshops for continuous learning and professional growth.",
    icon: GraduationCap,
  },
  {
    title: "Environmental Responsibility",
    description: "Sustainable practices and green spaces for environmental conservation.",
    icon: TreeDeciduous,
  },
  {
    title: "Community Infrastructure",
    description: "Essential facilities including halls, recreational areas, and gathering spaces.",
    icon: Building2,
  },
]

export function LandAnnouncementSection() {
  return (
    <section id="land" className="py-24 relative overflow-hidden bg-gradient-to-b from-muted/50 to-background">
      {/* Decorative Elements - Soft saffron glows */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />

      {/* Top Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary bg-primary/5">
            Historic Milestone
          </Badge>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-secondary mb-6 text-balance">
            Historic Milestone for<br />Acharya Community
          </h2>
          <div className="h-1 w-48 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent mb-8 rounded-full" />
        </div>

        {/* Main Announcement Banner */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-card border-primary/20 shadow-lg relative overflow-hidden">
            {/* Inner Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-primary/10 blur-3xl" />
            
            <CardContent className="p-8 md:p-12 relative z-10">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/30" />
                <Landmark className="h-8 w-8 text-primary" />
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/30" />
              </div>
              
              <p className="text-center text-lg md:text-xl text-secondary leading-relaxed">
                The Telangana Government has allocated a prime piece of land in{" "}
                <span className="text-primary font-semibold">Malkajgiri</span> for the establishment of the 
                ACHARYA Community Complex — a monumental step towards building a permanent home 
                for our heritage and aspirations.
              </p>
              
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <span className="text-sm text-primary">Location: Malkajgiri, Telangana</span>
                </div>
                <div className="px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20">
                  <span className="text-sm text-secondary">Status: Allocated</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vision Grid */}
        <div className="mb-16">
          <h3 className="font-serif text-2xl md:text-3xl text-center text-secondary mb-8">
            Our Vision for This Sacred Space
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {initiatives.map((initiative, index) => (
              <Card
                key={initiative.title}
                className={cn(
                  "bg-card border-border hover:border-primary/30 transition-all duration-500 group cursor-default",
                  "hover:shadow-lg hover:-translate-y-1"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <initiative.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-serif text-lg text-secondary mb-2 group-hover:text-primary transition-colors">
                    {initiative.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {initiative.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Closing Statement */}
        <div className="text-center">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-radial-saffron opacity-30 blur-2xl" />
            <blockquote className="relative font-serif text-2xl md:text-3xl text-primary italic max-w-3xl">
              &ldquo;This is not just land — it is a foundation for generations.&rdquo;
            </blockquote>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/30" />
            <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/30" />
          </div>
        </div>
      </div>
    </section>
  )
}
