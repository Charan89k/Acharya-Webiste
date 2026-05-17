"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Star, Crown } from "lucide-react"

export default function DonationPage() {
  const [donationAmount, setDonationAmount] = useState("")
  const [donorName, setDonorName] = useState("")
  const [message, setMessage] = useState("")

  const presetAmounts = [500, 1000, 5000, 10000]

  const rituals = [
    {
      title: "Hanuman Chalisa",
      description: "Support daily recitations and special ceremonies honoring Lord Hanuman for strength and devotion."
    },
    {
      title: "Yajnas / Poojas",
      description: "Contribute to sacred fire ceremonies and traditional rituals that preserve our spiritual heritage."
    },
    {
      title: "Cultural Programs",
      description: "Fund community events, festivals, and educational programs that celebrate our rich traditions."
    }
  ]

  const membershipPlans = [
    {
      name: "Ordinary Membership",
      individual: 1116,
      family: 5116,
      benefits: "No voting rights",
      icon: Heart
    },
    {
      name: "Life Membership",
      individual: 10116,
      family: 25116,
      benefits: "Includes voting rights",
      icon: Star
    },
    {
      name: "Patron Membership",
      individual: null, // Custom amount
      family: null,
      benefits: "Supports land and infrastructure development",
      icon: Crown,
      highlighted: true
    }
  ]

  const handlePresetAmount = (amount: number) => {
    setDonationAmount(amount.toString())
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle donation submission
    console.log({ donorName, donationAmount, message })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Video Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/drone-shot.mp4" type="video/mp4" />
          {/* Fallback image or placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-100 to-green-100"></div>
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>

        {/* Content Overlay */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
            Building a Sacred Future for Our Community
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Be a part of creating a permanent cultural and spiritual center for future generations.
          </p>
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed opacity-90">
            Our land in Malkajgiri will serve as a sanctuary for Vedic learning, community welfare initiatives, and the preservation of our rich cultural heritage.
          </p>
          <Button
            size="lg"
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Contribute Now
          </Button>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-md mx-auto">
          <Card className="shadow-lg border-0">
            <CardHeader className="text-center">
              <CardTitle className="font-serif text-2xl text-gray-900">
                Make Your Contribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                    Donation Amount (₹)
                  </label>
                  <Input
                    id="amount"
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    placeholder="Enter amount"
                    min="1"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quick Select
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {presetAmounts.map((amount) => (
                      <Button
                        key={amount}
                        type="button"
                        variant="outline"
                        onClick={() => handlePresetAmount(amount)}
                        className="w-full border-teal-200 text-teal-700 hover:bg-teal-50 hover:border-teal-300"
                      >
                        ₹{amount.toLocaleString()}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message (Optional)
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Leave a message with your donation..."
                    rows={3}
                    className="w-full"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Donate Now
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Rituals & Membership Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-center text-gray-900 mb-12">
            Rituals & Membership Contributions
          </h2>

          {/* Ritual Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {rituals.map((ritual, index) => (
              <Card key={index} className="bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0">
                <CardHeader>
                  <CardTitle className="font-serif text-xl text-gray-900 text-center">
                    {ritual.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {ritual.description}
                  </p>
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-6">
                    Contribute
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Membership Plans */}
          <div className="grid md:grid-cols-3 gap-8">
            {membershipPlans.map((plan, index) => (
              <Card
                key={index}
                className={`bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 ${
                  plan.highlighted ? 'ring-2 ring-yellow-400 shadow-yellow-100' : ''
                }`}
              >
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      plan.highlighted ? 'bg-yellow-100' : 'bg-teal-100'
                    }`}>
                      <plan.icon className={`h-6 w-6 ${
                        plan.highlighted ? 'text-yellow-600' : 'text-teal-600'
                      }`} />
                    </div>
                  </div>
                  <CardTitle className="font-serif text-xl text-gray-900">
                    {plan.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  {plan.individual !== null && (
                    <div>
                      <p className="text-2xl font-bold text-teal-600">₹{plan.individual.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Individual</p>
                    </div>
                  )}
                  {plan.family !== null && (
                    <div>
                      <p className="text-2xl font-bold text-teal-600">₹{plan.family.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Family</p>
                    </div>
                  )}
                  {plan.individual === null && (
                    <div>
                      <p className="text-lg text-gray-600">Custom Amount</p>
                      <p className="text-sm text-gray-500">Contact for details</p>
                    </div>
                  )}
                  <p className="text-sm text-gray-600">{plan.benefits}</p>
                  <Button
                    className={`w-full rounded-full ${
                      plan.highlighted
                        ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                        : 'bg-teal-600 hover:bg-teal-700 text-white'
                    }`}
                  >
                    Join Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}