"use client"

import type { GalleryImage } from "./types"
import { motion } from "framer-motion"

interface GalleryCardProps {
  image: GalleryImage
  onOpen: (image: GalleryImage) => void
}

export function GalleryCard({ image, onOpen }: GalleryCardProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(image)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-2xl shadow-black/20 focus:outline-none focus:ring-2 focus:ring-teal-300/60"
      aria-label={`Open ${image.name} in fullscreen`}
    >
      <div className="relative overflow-hidden">
        <img
          src={image.imageUrl}
          alt={image.name}
          loading="lazy"
          className="h-full w-full min-h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 text-left text-white">
        <span className="inline-flex rounded-full bg-teal-300/10 px-3 py-1 text-[0.7rem] uppercase tracking-[0.35em] text-teal-200">
          {image.category}
        </span>
        <p className="mt-4 text-lg font-semibold leading-7 text-white">{image.name}</p>
      </div>
    </motion.button>
  )
}
