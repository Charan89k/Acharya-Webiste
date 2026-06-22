'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface SplashScreenProps {
  onComplete?: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [mounted, setMounted] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [shouldRender, setShouldRender] = useState(true)

  useEffect(() => {
    setMounted(true)

    // Check if splash screen was already shown in this tab session
    const seenSplash = sessionStorage.getItem('seen-splash')
    if (seenSplash) {
      setShouldRender(false)
      if (onComplete) onComplete()
      return
    }

    // Animation Timeline:
    // At 3.0s: Start the fade-out animation of the splash screen overlay
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true)
      if (onComplete) onComplete()
    }, 3000)

    // At 3.5s: Unmount the splash screen overlay completely and store session state
    const removeTimer = setTimeout(() => {
      setShouldRender(false)
      sessionStorage.setItem('seen-splash', 'true')
    }, 3500)

    return () => {
      clearTimeout(fadeOutTimer)
      clearTimeout(removeTimer)
    }
  }, [onComplete])

  // Prevent SSR mismatch by rendering nothing on server initially
  if (!mounted || !shouldRender) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Loading ACHARYA"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-500 ease-in-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Outer wrapper manages the initial fade-in scaling */}
      <div className="animate-splash-logo-fade-in">
        {/* Inner wrapper manages the continuous gentle pulse and golden/saffron glow */}
        <div className="relative w-[240px] h-[240px] md:w-[280px] md:h-[280px] animate-splash-logo-pulse">
          <Image
            src="/images/logo.png"
            alt="ACHARYA Logo"
            fill
            sizes="(max-width: 768px) 240px, 280px"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  )
}
