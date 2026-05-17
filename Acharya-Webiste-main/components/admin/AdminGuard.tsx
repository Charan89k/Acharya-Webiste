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
    const authorized = isAdminAuthenticated()
    setAuthenticated(authorized)
    setInitialized(true)
    if (!authorized) {
      router.replace('/admin')
    }
  }, [router])

  if (!initialized || !authenticated) {
    return null
  }

  return <>{children}</>
}
