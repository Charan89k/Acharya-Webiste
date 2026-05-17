"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ background: "radial-gradient(ellipse 90% 80% at 50% 30%, #3d2a0e 0%, #1e1508 40%, #120d05 100%)" }}
    >
      {/* Subtle vignette overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 20%, rgba(90,55,10,0.18) 0%, transparent 70%), radial-gradient(ellipse 100% 50% at 50% 100%, rgba(8,5,2,0.55) 0%, transparent 70%)",
        }}
      />

      {/* Star/sparkle — top right corner (matches reference) */}
      <motion.div
        className="absolute bottom-8 right-8 text-[#c8a96e] opacity-60"
        animate={{ rotate: [0, 15, -10, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="currentColor">
          <path d="M14 0 L15.5 12.5 L28 14 L15.5 15.5 L14 28 L12.5 15.5 L0 14 L12.5 12.5 Z" />
        </svg>
      </motion.div>

      {/* Main content — full viewport, vertically centred */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 pb-10 pt-24 text-center sm:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.16, delayChildren: 0.1 }}
          className="flex w-full flex-col items-center"
        >

          {/* ── Large hero artwork ── */}
          <motion.div
            variants={fadeIn}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="relative w-full max-w-[520px] sm:max-w-[620px] md:max-w-[700px]"
          >
            {/* Warm gold ambient glow behind image */}
            <div
              className="absolute inset-x-0 top-[10%] mx-auto h-[55%] w-[65%] rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(200,140,30,0.22) 0%, transparent 72%)" }}
            />

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/images/logo-bg.png"
                alt="ACHARYA — Ancient Wisdom"
                width={901}
                height={772}
                priority
                className="relative z-0 w-full h-auto object-contain drop-shadow-[0_24px_60px_rgba(180,110,20,0.30)]"
              />
            </motion.div>
          </motion.div>

          {/* ── ACHARYA wordmark ── */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 -mt-6 sm:-mt-10 md:-mt-14 flex flex-col items-center"
          >
            <h1
              className="font-serif leading-none tracking-[0.18em] text-[#e8d5a8]"
              style={{
                fontSize: "clamp(3.2rem, 12vw, 8rem)",
                textShadow: "0 4px 40px rgba(180,120,20,0.28), 0 1px 0 rgba(255,220,120,0.15)",
              }}
            >
              ACHARYA
            </h1>
          </motion.div>

          {/* ── Tagline ── */}
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-sm text-center text-sm leading-6 tracking-wide text-[#c4a97a]/80 sm:mt-5 sm:max-w-md sm:text-base sm:leading-7"
          >
            Handcrafted divine insights made with purity and devotion.
            <br />
            Designed to elevate your mind with ancient wisdom.
          </motion.p>

          {/* ── Explore button ── */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 sm:mt-8"
          >
            <Link href="#circular">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="group inline-flex items-center gap-2.5 rounded-full px-8 py-3 text-sm tracking-[0.12em] text-[#e8d5a8] transition-all duration-300"
                style={{
                  border: "1px solid rgba(200,169,110,0.45)",
                  background: "rgba(255,255,255,0.04)",
                  boxShadow: "0 2px 20px rgba(180,120,20,0.10)",
                  backdropFilter: "blur(6px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)"
                  e.currentTarget.style.borderColor = "rgba(200,169,110,0.75)"
                  e.currentTarget.style.boxShadow = "0 4px_32px rgba(180,120,20,0.22)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)"
                  e.currentTarget.style.borderColor = "rgba(200,169,110,0.45)"
                  e.currentTarget.style.boxShadow = "0 2px 20px rgba(180,120,20,0.10)"
                }}
              >
                <span className="font-medium">Explore</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
