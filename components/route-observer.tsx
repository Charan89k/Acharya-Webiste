"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function RouteObserver() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [pathname])

  return null
}
