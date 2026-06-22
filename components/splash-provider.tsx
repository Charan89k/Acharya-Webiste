'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { usePathname } from 'next/navigation'
import { SplashScreen } from './splash-screen'

const SplashContext = createContext({ loading: false })

export function SplashProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsClient(true)
    
    // Skip splash screen on utility pages (dashboard & admin)
    const isUtilityRoute = pathname?.startsWith('/dashboard') || pathname?.startsWith('/admin')
    
    // Check if user has already seen the splash screen in this session
    const seenSplash = sessionStorage.getItem('seen-splash')
    
    if (seenSplash || isUtilityRoute) {
      setLoading(false)
    }
  }, [pathname])

  const handleSplashComplete = () => {
    setLoading(false)
  }

  // During SSR or before client hydration, we render the page normally at opacity-100 to support SEO.
  // Once hydration happens, if the splash is needed, we temporarily transition it to opacity-0.
  const shouldHideContent = isClient && loading

  return (
    <SplashContext.Provider value={{ loading }}>
      <SplashScreen onComplete={handleSplashComplete} />
      <div
        className={`transition-opacity duration-700 ease-out ${
          shouldHideContent
            ? 'opacity-0 h-screen overflow-hidden pointer-events-none'
            : 'opacity-100'
        }`}
      >
        {children}
      </div>
    </SplashContext.Provider>
  )
}

export const useSplash = () => useContext(SplashContext)

