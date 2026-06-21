"use client"

import { useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { isAdminAuthenticated } from "@/services/admin-store"

interface AdminGuardProps {
  children: React.ReactNode
}

export function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter()
  const [initialized, setInitialized] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    async function verifyAuth() {
      try {
        const res = await fetch('/api/admin/check-auth')
        if (res.ok) {
          const data = await res.json()
          if (data.authenticated) {
            setAuthenticated(true)
            setInitialized(true)
            return
          }
        }
      } catch (err) {
        console.error("Auth check failed:", err)
      }
      setAuthenticated(false)
      setInitialized(true)
      router.replace('/admin')
    }
    verifyAuth()
  }, [router])

  if (!initialized || !authenticated) {
    return null
  }

  return <>{children}</>
}
