"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { loadDonations, DonationData } from "@/services/admin-store"
import { Download, Heart, Calendar, DollarSign, Search } from "lucide-react"

export function DonationManager() {
  const [donations, setDonations] = useState<DonationData[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDonations() {
      try {
        const data = await loadDonations()
        setDonations(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchDonations()
  }, [])

  const filteredDonations = useMemo(() => {
    return donations.filter((d) => 
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.email.toLowerCase().includes(search.toLowerCase())
    )
  }, [donations, search])

  const stats = useMemo(() => {
    const total = donations.reduce((sum, d) => sum + d.amount, 0)
    
    // Monthly stats
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const monthly = donations
      .filter((d) => {
        const date = new Date(d.date)
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear
      })
      .reduce((sum, d) => sum + d.amount, 0)

    const recent = donations.slice(0, 5).reduce((sum, d) => sum + d.amount, 0)

    return { total, monthly, recent }
  }, [donations])

  const exportToCSV = () => {
    if (donations.length === 0) {
      toast({ title: "No data", description: "There are no donations to export." })
      return
    }

    const headers = ["Name", "Email", "Amount (INR)", "Date", "Payment Status", "Message"]
    const rows = donations.map((d) => [
      d.name,
      d.email,
      d.amount.toString(),
      new Date(d.date).toLocaleString(),
      d.paymentStatus,
      d.message || "",
    ])

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
      + [headers.join(","), ...rows.map(e => e.map(val => `"${val.replace(/"/g, '""')}"`).join(","))].join("\r\n")
      
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `acharya_donations_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast({ title: "Exported", description: "CSV file downloaded successfully." })
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/25">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-teal-300/80">Donation Management</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Track contributions & metrics</h2>
          <p className="mt-3 text-slate-400">View real-time donation analytics, verify payment statuses, and export data records.</p>
        </div>
        <Button 
          onClick={exportToCSV}
          className="rounded-full bg-teal-300 text-slate-950 hover:bg-teal-200 flex items-center gap-2 self-start lg:self-center"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-6 sm:grid-cols-3 mb-8">
        <Card className="bg-slate-950/85 border-white/10 shadow-lg">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Total Donations</p>
              <h3 className="text-2xl font-bold mt-1 text-white">₹{stats.total.toLocaleString()}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-950/85 border-white/10 shadow-lg">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-saffron-500/10 flex items-center justify-center text-orange-400">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Monthly Donations</p>
              <h3 className="text-2xl font-bold mt-1 text-white">₹{stats.monthly.toLocaleString()}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-950/85 border-white/10 shadow-lg">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-400">
              <Heart className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Recent Cycle (Last 5)</p>
              <h3 className="text-2xl font-bold mt-1 text-white">₹{stats.recent.toLocaleString()}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5">
        <p className="text-sm uppercase tracking-[0.35em] text-teal-300/80 mb-4">Search Transactions</p>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email address"
            className="pl-10 bg-slate-950/90"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70">
        {loading ? (
          <div className="p-12 text-center text-slate-400">Loading donation list...</div>
        ) : filteredDonations.length === 0 ? (
          <div className="p-12 text-center text-slate-400">No donations records found matching your search.</div>
        ) : (
          <table className="min-w-full divide-y divide-white/10 text-sm text-slate-200">
            <thead className="bg-slate-900/80 text-slate-400">
              <tr>
                <th className="px-6 py-4 text-left">Donor Name</th>
                <th className="px-6 py-4 text-left">Email Address</th>
                <th className="px-6 py-4 text-left">Amount</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 bg-slate-950/80">
              {filteredDonations.map((d) => (
                <tr key={d.id} className="hover:bg-white/5 transition-colors duration-200">
                  <td className="px-6 py-4 font-medium text-white">{d.name}</td>
                  <td className="px-6 py-4">{d.email}</td>
                  <td className="px-6 py-4 font-semibold text-teal-300">₹{d.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-slate-400">{new Date(d.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block rounded-full bg-teal-500/15 border border-teal-500/35 px-3 py-1 text-xs text-teal-300 uppercase tracking-widest font-semibold">
                      {d.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  )
}
