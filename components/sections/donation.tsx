"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

export function DonationSection() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [amount, setAmount] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name) {
      toast({
        title: "Fields Required",
        description: "Please fill in your name.",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email: email || "donor@acharya.org",
          amount: Number(amount) || 501,
          message,
        }),
      })

      if (response.ok) {
        toast({
          title: "Donation Initiated",
          description: "Redirecting to our secure payment gateway...",
        })
      }
    } catch (err) {
      console.error("Donation recording error:", err)
    } finally {
      setIsSubmitting(false)
      // Redirect to Razorpay gateway
      window.location.href = "https://rzp.io/rzp/B4BNmsw"
    }
  }

  return (
    <div id="donate" className="bg-stone-50 dark:bg-slate-900 py-16 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* DONATION FORM */}
      <section className="flex justify-center px-4 mb-8">
        <Card className="w-full max-w-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-serif text-teal-900 dark:text-teal-400">
              Make a Donation
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1">Your Name</label>
                <Input
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-slate-50/50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:border-teal-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1">Optional message...</label>
                <Textarea
                  placeholder="Enter any comments or prayer requests"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-slate-50/50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:border-teal-500 resize-none"
                  rows={3}
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-teal-600 dark:bg-teal-500 hover:bg-teal-700 dark:hover:bg-teal-600 text-white rounded-full py-6 transition-all duration-300 font-medium"
              >
                {isSubmitting ? "Processing..." : "Make a Donation"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* RITUALS */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <h2 className="text-center text-3xl font-serif text-teal-900 dark:text-teal-400 mb-12">
          Ritual Contributions
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {rituals.map((ritual) => (
            <Card key={ritual.title} className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:shadow-md hover:border-teal-500/30">
              <CardHeader>
                <CardTitle className="font-serif text-teal-900 dark:text-teal-400 text-xl">{ritual.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{ritual.description}</p>
                <Button
                  onClick={() => {
                    setName("");
                    setEmail("");
                    setAmount("501");
                    setMessage(`Ritual contribution for: ${ritual.title}`);
                    const element = document.getElementById("donate");
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  variant="outline"
                  className="rounded-full border-teal-600 dark:border-teal-500 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/30 w-full"
                >
                  Register Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}