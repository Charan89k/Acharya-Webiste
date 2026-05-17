"use client"

import { useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import type { GalleryImage } from "./types"

interface LightboxProps {
  image: GalleryImage | null
  onClose: () => void
}

export function Lightbox({ image, onClose }: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (image) {
      window.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "auto"
    }
  }, [image, onClose])

  return (
    <AnimatePresence>
      {image ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative max-h-full w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-2xl shadow-black/40"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-950/80 text-slate-100 transition hover:bg-slate-900"
              aria-label="Close fullscreen image"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative overflow-hidden">
              <img
                src={image.imageUrl}
                alt={image.name}
                className="h-[80vh] w-full object-contain"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent px-8 py-6 text-white">
                <p className="text-sm uppercase tracking-[0.35em] text-teal-300/90">{image.category}</p>
                <h2 className="mt-3 text-2xl font-semibold">{image.name}</h2>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
