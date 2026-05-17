"use client"

import { useState } from "react"
import { Heart, Star, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export function DonationSection() {
  const [amount, setAmount] = useState("")
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")

  const presetAmounts = [500, 1000, 5000, 10000]

  const rituals = [
    {
      title: "Hanuman Chalisa",
      description:
        "Support daily recitations and special ceremonies honoring Lord Hanuman for strength and devotion."
    },
    {
      title: "Yajnas / Poojas",
      description:
        "Contribute to sacred fire ceremonies and traditional rituals that preserve our spiritual heritage."
    },
    {
      title: "Cultural Programs",
      description:
        "Fund community events, festivals, and educational programs that celebrate our rich traditions."
    }
  ]

  const memberships = [
    {
      title: "Ordinary Membership",
      individual: "₹1,116",
      family: "₹5,116",
      rights: "No voting rights",
      icon: Heart,
      premium: false
    },
    {
      title: "Life Membership",
      individual: "₹10,116",
      family: "₹25,116",
      rights: "Includes voting rights",
      icon: Star,
      premium: false
    },
    {
      title: "Patron Membership",
      individual: "Custom",
      family: "Custom",
      rights: "Supports land and infrastructure development",
      icon: Crown,
      premium: true
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Donation submitted:", { name, amount, message })
  }

  return (
    <div className="bg-stone-50 text-slate-800">
      {/* HERO VIDEO SECTION */}
      <section className="relative w-full h-[90vh] overflow-hidden flex items-center justify-center">

        {/* 🎥 VIDEO */}
        <video
          src="/drone.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* 🌤 LIGHT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/40 to-transparent" />

        {/* TEXT CONTENT */}
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-serif text-teal-900 mb-4">
            Building a Sacred Future for Our Community
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-4">
            Be a part of creating a permanent cultural and spiritual center for future generations.
          </p>
          <p className="text-base text-gray-600 mb-6">
            The land in Malkajgiri will become a hub for Vedic learning, community welfare, and cultural preservation.
          </p>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full">
            Contribute Now
          </Button>
        </div>
      </section>

      {/* DONATION FORM */}
      <section className="py-16 flex justify-center px-4">
        <Card className="w-full max-w-lg bg-white shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-serif text-teal-900">
              Make a Donation
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                type="number"
                placeholder="Amount (₹)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />

              <div className="grid grid-cols-4 gap-2">
                {presetAmounts.map((preset) => (
                  <Button
                    key={preset}
                    type="button"
                    variant="outline"
                    onClick={() => setAmount(preset.toString())}
                    className={cn(
                      amount === preset.toString()
                        ? "bg-teal-600 text-white"
                        : ""
                    )}
                  >
                    ₹{preset}
                  </Button>
                ))}
              </div>

              <Textarea
                placeholder="Optional message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <Button className="w-full bg-teal-600 text-white">
                Complete Donation
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* RITUALS */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-center text-4xl font-serif text-teal-900 mb-12">
          Rituals & Membership Contributions
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {rituals.map((ritual) => (
            <Card key={ritual.title}>
              <CardHeader>
                <CardTitle>{ritual.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-600">{ritual.description}</p>
                <Button variant="outline">Contribute</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* MEMBERSHIP */}
        <div className="grid md:grid-cols-3 gap-6">
          {memberships.map((plan) => (
            <Card
              key={plan.title}
              className={cn(
                "text-center",
                plan.premium && "border-amber-400 shadow-lg"
              )}
            >
              <CardHeader>
                <plan.icon className="mx-auto mb-2 text-teal-600" />
                <CardTitle>{plan.title}</CardTitle>
              </CardHeader>

              <CardContent>
                <p>{plan.individual}</p>
                <p>{plan.family}</p>
                <p className="text-sm text-gray-500 mb-4">{plan.rights}</p>

                <Button
                  className={
                    plan.premium
                      ? "bg-amber-500 text-white"
                      : "bg-teal-600 text-white"
                  }
                >
                  Join
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}