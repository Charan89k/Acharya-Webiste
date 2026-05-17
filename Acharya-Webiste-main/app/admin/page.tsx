"use client"

import { useEffect, useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { loginAdmin, isAdminAuthenticated } from "@/services/admin-store"
import { toast } from "@/hooks/use-toast"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('admin@acharya.org')
  const [password, setPassword] = useState('Acharya@2026')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isAdminAuthenticated()) {
      router.replace('/admin/dashboard')
    }
  }, [router])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const success = loginAdmin(email.trim(), password.trim())

    if (!success) {
      setError('Invalid credentials. Use admin@acharya.org / Acharya@2026')
      toast({
        title: 'Login Failed',
        description: 'Please verify your email and password.',
      })
      return
    }

    toast({
      title: 'Welcome back, Admin',
      description: 'Redirecting to the dashboard…',
    })

    router.push('/admin/dashboard')
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="container mx-auto px-6 py-24">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-800/90 bg-slate-900/95 p-10 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-teal-300/80">Admin Login</p>
            <h1 className="mt-4 text-4xl font-serif text-white">Acharya Admin Portal</h1>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Securely manage events, gallery uploads, announcements, and community activity.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@acharya.org"
                className="mt-3 bg-slate-950/90"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="mt-3 bg-slate-950/90"
                required
              />
            </div>

            {error && (
              <p className="rounded-3xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                {error}
              </p>
            )}

            <Button className="w-full rounded-full bg-teal-300 text-slate-950 shadow-lg shadow-teal-300/10 hover:bg-teal-200">
              Sign in
            </Button>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-400">
              <p className="font-medium text-slate-200">Demo credentials</p>
              <p>Use <span className="text-teal-200">admin@acharya.org</span> and <span className="text-teal-200">Acharya@2026</span>.</p>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
