"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { loginAdmin, changeAdminPassword } from "@/services/admin-store"
import { toast } from "@/hooks/use-toast"
import { Eye, EyeOff, Lock, User, KeyRound, ArrowRight } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Password reset wizard states
  const [requirePasswordChange, setRequirePasswordChange] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [resetError, setResetError] = useState<string | null>(null)
  const [isResetting, setIsResetting] = useState(false)

  useEffect(() => {
    async function verifyAuth() {
      try {
        const res = await fetch('/api/admin/check-auth')
        if (res.ok) {
          const data = await res.json()
          if (data.authenticated) {
            router.replace('/admin/dashboard')
          }
        }
      } catch (err) {
        console.error("Auth check failed:", err)
      }
    }
    verifyAuth()
  }, [router])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    if (!identifier || !password) return

    setIsSubmitting(true)
    const result = await loginAdmin(identifier.trim(), password.trim())
    setIsSubmitting(false)

    if (!result.success) {
      setError(result.error || 'Invalid username/email or password.')
      toast({
        title: 'Login Failed',
        description: result.error || 'Please check your credentials.',
        variant: 'destructive',
      })
      return
    }

    if (result.requirePasswordChange) {
      setRequirePasswordChange(true)
      toast({
        title: 'Security Alert',
        description: 'First login detected. You must change your password to continue.',
      })
    } else {
      toast({
        title: 'Authentication Successful',
        description: 'Welcome to the ACHARYA Control Studio.',
      })
      router.push('/admin/dashboard')
    }
  }

  const handlePasswordResetSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setResetError(null)

    if (newPassword.length < 6) {
      setResetError('Password must be at least 6 characters.')
      return
    }

    if (newPassword !== confirmPassword) {
      setResetError('Passwords do not match.')
      return
    }

    setIsResetting(true)
    const success = await changeAdminPassword(newPassword.trim())
    setIsResetting(false)

    if (success) {
      toast({
        title: 'Password Updated',
        description: 'Your password has been changed. Logging in...',
      })
      router.push('/admin/dashboard')
    } else {
      setResetError('Could not update password. Please try again.')
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row relative overflow-hidden font-sans">
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* LEFT PANEL: Branding & Visuals */}
      <div className="lg:w-1/2 flex flex-col justify-between p-12 bg-gradient-to-br from-orange-600 via-amber-700 to-slate-950 relative overflow-hidden shadow-2xl min-h-[40vh] lg:min-h-screen select-none">
        
        {/* Subtle Mandala SVG Layer */}
        <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none scale-125">
          <svg viewBox="0 0 100 100" className="w-full h-full text-white animate-[spin_200s_linear_infinite]">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
            {Array.from({ length: 24 }).map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="5"
                x2="50"
                y2="95"
                stroke="currentColor"
                strokeWidth="0.25"
                transform={`rotate(${i * 7.5} 50 50)`}
              />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <circle
                key={i}
                cx="50"
                cy="50"
                r={10 + i * 5}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.2"
                strokeDasharray="2,2"
              />
            ))}
          </svg>
        </div>

        {/* Top Header */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="relative w-10 h-10">
            <Image
              src="/images/logo.png"
              alt="ACHARYA Logo"
              fill
              className="object-contain filter drop-shadow-lg"
            />
          </div>
          <span className="font-serif text-lg tracking-[0.25em] text-[#fcd34d]">ACHARYA</span>
        </div>

        {/* Center Content */}
        <div className="my-auto py-12 relative z-10 flex flex-col items-center lg:items-start">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-28 h-28 lg:w-36 lg:h-36 rounded-full bg-slate-900/60 border border-white/20 flex items-center justify-center mb-8 relative shadow-2xl"
          >
            {/* Pulsing Aura behind logo */}
            <div className="absolute inset-0 bg-[#f97316]/25 rounded-full blur-xl animate-pulse" />
            <div className="relative w-20 h-20 lg:w-24 lg:h-24">
              <Image
                src="/images/logo.png"
                alt="ACHARYA Brand"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          <h2 className="font-serif text-4xl lg:text-5xl font-semibold tracking-wide text-white leading-tight text-center lg:text-left drop-shadow-sm">
            Acharya Control Studio
          </h2>
          
          <h4 className="mt-4 text-xs font-serif uppercase tracking-[0.25em] text-orange-200 text-center lg:text-left font-semibold">
            Akhila Chanakya Heritage for Advancement, Research, Youth & Academia
          </h4>
          
          <p className="mt-6 max-w-md text-sm leading-relaxed text-orange-100/80 text-center lg:text-left font-medium">
            "Preserving Heritage, Advancing Knowledge, Empowering Youth"
          </p>
        </div>

        {/* Footer */}
        <div className="text-xs text-orange-200/60 relative z-10 text-center lg:text-left">
          &copy; {new Date().getFullYear()} ACHARYA Administration. All rights reserved.
        </div>
      </div>

      {/* RIGHT PANEL: Glassmorphism Login Card */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-12 relative z-10 min-h-[60vh] lg:min-h-screen">
        <AnimatePresence mode="wait">
          {!requirePasswordChange ? (
            
            // LOGIN SCREEN
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/40 p-8 shadow-2xl backdrop-blur-lg hover:border-white/20 transition-all duration-300"
            >
              <div className="mb-8">
                <span className="text-xs uppercase tracking-[0.35em] text-teal-400 font-semibold">Security Access</span>
                <h3 className="mt-2 text-2xl font-serif text-white">Administrator Login</h3>
                <p className="mt-2 text-xs text-slate-400">Please provide your administrator credentials to login.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">Username / Email Address</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <Input
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="admin or admin@acharya.org"
                      className="pl-10 bg-slate-950/80 border-white/5 focus:border-teal-500 py-6"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">Security Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-10 pr-10 bg-slate-950/80 border-white/5 focus:border-teal-500 py-6"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-slate-500 hover:text-slate-300 focus:outline-none"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-600 bg-slate-950 text-teal-400 h-4 w-4 focus:ring-0 focus:ring-offset-0"
                    />
                    Remember Me
                  </label>
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-xs text-rose-200 font-medium"
                  >
                    {error}
                  </motion.p>
                )}

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full py-6 bg-teal-400 hover:bg-teal-300 text-slate-950 font-semibold shadow-lg shadow-teal-400/5 transition-all duration-300"
                >
                  {isSubmitting ? 'Verifying...' : 'Sign In to Dashboard'}
                </Button>
              </form>
            </motion.div>
          ) : (
            
            // FIRST LOGIN: RESET PASSWORD WIZARD
            <motion.div
              key="reset"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/40 p-8 shadow-2xl backdrop-blur-lg hover:border-white/20 transition-all duration-300"
            >
              <div className="mb-8">
                <span className="text-xs uppercase tracking-[0.35em] text-orange-400 font-semibold flex items-center gap-1.5">
                  <ShieldAlert className="h-4 w-4" />
                  Password Change Required
                </span>
                <h3 className="mt-2 text-2xl font-serif text-white">Reset Credentials</h3>
                <p className="mt-2 text-xs text-slate-400">This account uses initial setup keys. Change password before access.</p>
              </div>

              <form onSubmit={handlePasswordResetSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">New Security Password</label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New password (min 6 chars)"
                      className="pl-10 bg-slate-950/80 border-white/5 focus:border-teal-500 py-6"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">Confirm New Password</label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="pl-10 bg-slate-950/80 border-white/5 focus:border-teal-500 py-6"
                      required
                    />
                  </div>
                </div>

                {resetError && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-xs text-rose-200 font-medium"
                  >
                    {resetError}
                  </motion.p>
                )}

                <Button 
                  type="submit"
                  disabled={isResetting}
                  className="w-full rounded-full py-6 bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold shadow-lg shadow-amber-500/5 transition-all duration-300"
                >
                  {isResetting ? 'Saving Credentials...' : 'Change Password & Enter'}
                  <ArrowRight className="h-4 w-4 ml-1.5 inline" />
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </main>
  )
}
