"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    content: "ACHARYA Community Centre, Malkajgiri, Hyderabad, Telangana 500047",
  },
  {
    icon: Mail,
    title: "Email",
    content: "contact@acharya.org",
  },
  {
    icon: Phone,
    title: "Phone",
    content: "+91 40 XXXX XXXX",
  },
]

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <section id="contact" className="py-24 bg-background relative">
      {/* Top Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary bg-primary/5">
            Get in Touch
          </Badge>
          <h2 className="font-serif text-4xl md:text-5xl text-secondary mb-4 text-balance">
            Contact Us
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have questions? We&apos;d love to hear from you. Reach out and connect with our community.
          </p>
          <div className="h-1 w-24 mx-auto mt-6 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-serif text-xl text-secondary mb-6">Contact Information</h3>
            
            {contactInfo.map((item) => (
              <div key={item.title} className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-all duration-300">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-secondary">{item.title}</h4>
                  <p className="text-muted-foreground text-sm mt-1">{item.content}</p>
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="pt-8 border-t border-secondary/10">
              <h4 className="font-medium text-secondary mb-4">Follow Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-muted border border-secondary/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/10 transition-all duration-300"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Office Hours */}
            <div className="p-4 rounded-lg bg-muted/50 border border-secondary/10">
              <h4 className="font-medium text-secondary mb-2">Office Hours</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Monday - Friday: 10:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <Card className="bg-card border-secondary/10 shadow-lg">
              <CardHeader>
                <CardTitle className="font-serif text-xl text-secondary">Send us a Message</CardTitle>
                <CardDescription>Fill out the form below and we&apos;ll get back to you soon.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Your Name</label>
                      <Input
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-muted/30 border-secondary/20 focus:border-primary/50 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Email Address</label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-muted/30 border-secondary/20 focus:border-primary/50 rounded-lg"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Subject</label>
                    <Input
                      placeholder="What is this regarding?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="bg-muted/30 border-secondary/20 focus:border-primary/50 rounded-lg"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Message</label>
                    <Textarea
                      placeholder="Your message..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-muted/30 border-secondary/20 focus:border-primary/50 rounded-lg resize-none"
                      rows={5}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full py-6 bg-primary text-primary-foreground hover:bg-primary/90 saffron-glow-sm hover:saffron-glow transition-all duration-300"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
