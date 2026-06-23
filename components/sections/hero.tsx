"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.play().catch(err => {
        console.error("Autoplay failed:", err)
      })
    }
  }, [])

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
      {/* 🎥 VIDEO */}
      <video
        ref={videoRef}
        src="/drone.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 🌤 DARK OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/45 to-slate-950/75" />

      {/* TEXT CONTENT */}
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-serif text-white mb-4 tracking-tight drop-shadow-md">
          Building a Sacred Future for Our Community
        </h1>
        <p className="text-lg md:text-xl text-slate-200 mb-4 font-light leading-relaxed">
          Be a part of creating a permanent cultural and spiritual center for future generations.
        </p>
        <p className="text-base text-slate-300 mb-6 max-w-2xl mx-auto leading-relaxed">
          The land in Malkajgiri will become a hub for Vedic learning, community welfare, and cultural preservation.
        </p>
        <Button className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-medium px-8 py-3 rounded-full transition-transform hover:scale-105 shadow-lg" asChild>
          <a href="https://rzp.io/rzp/B4BNmsw">
            Contribute Now
          </a>
        </Button>
      </div>
    </section>
  )
}
