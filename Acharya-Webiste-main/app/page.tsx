import { HeroSection } from "@/components/sections/hero"
import { CircularSection } from "@/components/sections/circular"
import { LandAnnouncementSection } from "@/components/sections/land-announcement"
import { EventsSection } from "@/components/sections/events"
import { AnnouncementsSection } from "@/components/sections/announcements"
import { DonationSection } from "@/components/sections/donation"
import { ContactSection } from "@/components/sections/contact"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <CircularSection />
      <LandAnnouncementSection />
      <EventsSection />
      <AnnouncementsSection />
      <DonationSection />
      <ContactSection />
    </main>
  )
}
