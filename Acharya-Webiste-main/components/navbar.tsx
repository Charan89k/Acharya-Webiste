"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/#about", label: "About" },
    { href: "/#circular", label: "Community" },
    { href: "/#land", label: "Vision" },
    { href: "/#events", label: "Events" },
    { href: "/gallery", label: "Gallery" },
    { href: "/#donate", label: "Donate" },
    { href: "/#contact", label: "Contact" },
  ]

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-border py-3 shadow-sm"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11">
            <Image
              src="/images/logo.png"
              alt="ACHARYA Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className={cn(
            "font-serif text-xl tracking-[0.15em] transition-colors group-hover:text-primary",
            isScrolled ? "text-secondary" : "text-[#e8d5a8]"
          )}>
            ACHARYA
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm tracking-wide transition-colors duration-300 relative group",
                  isActive
                    ? "text-primary font-semibold"
                    : isScrolled
                    ? "text-muted-foreground hover:text-primary"
                    : "text-[#e8d5a8]/80 hover:text-[#e8d5a8]"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-primary rounded-full transition-all duration-300",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            )
          })}
        </div>

        {/* Login Button - Gold outline or teal fill */}
        <div className="hidden lg:block">
          <Link href="/dashboard">
            <Button
              variant="outline"
              className={cn(
                "rounded-full px-6 transition-all duration-300",
                isScrolled
                  ? "border-primary/40 text-secondary hover:bg-primary hover:text-primary-foreground hover:border-primary"
                  : "border-[#c8a96e]/50 text-[#e8d5a8] bg-transparent hover:bg-[#c8a96e]/15 hover:border-[#c8a96e]"
              )}
            >
              Log in
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-secondary p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-md border-b border-border transition-all duration-300 overflow-hidden shadow-lg",
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
            <Button
              className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 mt-2"
            >
              Log in
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
