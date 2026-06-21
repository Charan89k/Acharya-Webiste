"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { loadSettings, updateSettings, SettingsData } from "@/services/admin-store"
import { Save, Building, Phone, Mail, Globe, Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react"

const initialSettingsState: SettingsData = {
  orgName: 'ACHARYA',
  address: 'ACHARYA Community Centre, Malkajgiri, Hyderabad, Telangana 500047',
  contactNumber: '+91 40 XXXX XXXX',
  email: 'contact@acharya.org',
  facebook: '#',
  twitter: '#',
  instagram: '#',
  youtube: '#',
  linkedin: '#',
}

export function SettingsManager() {
  const [formValues, setFormValues] = useState<SettingsData>(initialSettingsState)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    async function fetchSettings() {
      try {
        const data = await loadSettings()
        if (data) {
          setFormValues(data)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      const success = await updateSettings(formValues)
      if (success) {
        toast({
          title: "Settings Saved",
          description: "Global settings have been updated on the public site.",
        })
      } else {
        toast({
          title: "Save Failed",
          description: "Could not save organization settings.",
        })
      }
    } catch (err) {
      console.error(err)
      toast({
        title: "Error Saving",
        description: "An unexpected error occurred.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return <div className="p-8 text-center text-slate-400">Loading settings...</div>
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/25">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.35em] text-teal-300/80">Global Settings</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Organization Configuration</h2>
        <p className="mt-3 text-slate-400">Manage contact information, address, and social links displaying across the ACHARYA public website.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Info */}
        <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6 space-y-4">
          <h3 className="text-lg font-serif text-white flex items-center gap-2">
            <Building className="h-5 w-5 text-teal-300" />
            Contact & Address Details
          </h3>
          <div className="h-px bg-white/5 w-full" />
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-widest block mb-1">Organization Name</label>
              <Input
                value={formValues.orgName}
                onChange={(e) => setFormValues({ ...formValues, orgName: e.target.value })}
                className="bg-slate-900/90 border-white/5"
                required
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-widest block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <Input
                  type="email"
                  value={formValues.email}
                  onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                  className="pl-10 bg-slate-900/90 border-white/5"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-widest block mb-1">Contact Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <Input
                  value={formValues.contactNumber}
                  onChange={(e) => setFormValues({ ...formValues, contactNumber: e.target.value })}
                  className="pl-10 bg-slate-900/90 border-white/5"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-widest block mb-1">Physical Address</label>
              <Input
                value={formValues.address}
                onChange={(e) => setFormValues({ ...formValues, address: e.target.value })}
                className="bg-slate-900/90 border-white/5"
                required
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6 space-y-4">
          <h3 className="text-lg font-serif text-white flex items-center gap-2">
            <Globe className="h-5 w-5 text-teal-300" />
            Social Media Networks
          </h3>
          <div className="h-px bg-white/5 w-full" />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-widest block mb-1 flex items-center gap-1.5">
                <Facebook className="h-3.5 w-3.5" />
                Facebook Link
              </label>
              <Input
                value={formValues.facebook}
                onChange={(e) => setFormValues({ ...formValues, facebook: e.target.value })}
                className="bg-slate-900/90 border-white/5"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-widest block mb-1 flex items-center gap-1.5">
                <Twitter className="h-3.5 w-3.5" />
                Twitter (X) Link
              </label>
              <Input
                value={formValues.twitter}
                onChange={(e) => setFormValues({ ...formValues, twitter: e.target.value })}
                className="bg-slate-900/90 border-white/5"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-widest block mb-1 flex items-center gap-1.5">
                <Instagram className="h-3.5 w-3.5" />
                Instagram Link
              </label>
              <Input
                value={formValues.instagram}
                onChange={(e) => setFormValues({ ...formValues, instagram: e.target.value })}
                className="bg-slate-900/90 border-white/5"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-widest block mb-1 flex items-center gap-1.5">
                <Youtube className="h-3.5 w-3.5" />
                YouTube Link
              </label>
              <Input
                value={formValues.youtube}
                onChange={(e) => setFormValues({ ...formValues, youtube: e.target.value })}
                className="bg-slate-900/90 border-white/5"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 uppercase tracking-widest block mb-1 flex items-center gap-1.5">
              <Linkedin className="h-3.5 w-3.5" />
              LinkedIn Link
            </label>
            <Input
              value={formValues.linkedin}
              onChange={(e) => setFormValues({ ...formValues, linkedin: e.target.value })}
              className="bg-slate-900/90 border-white/5"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button 
            type="submit" 
            disabled={isSaving}
            className="rounded-full bg-teal-300 text-slate-950 hover:bg-teal-200 py-6 px-8 flex items-center gap-2 shadow-lg"
          >
            <Save className="h-4 w-4" />
            {isSaving ? 'Saving Changes...' : 'Save Configuration'}
          </Button>
        </div>
      </form>
    </section>
  )
}
