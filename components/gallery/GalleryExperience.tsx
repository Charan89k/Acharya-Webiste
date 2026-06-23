"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import { GalleryGrid } from "./GalleryGrid"
import { Lightbox } from "./Lightbox"
import type { GalleryCategory, GalleryImage } from "./types"

const STATIC_IMAGES: GalleryImage[] = [
  {
    id: "img-1",
    name: "Youth Vedic Discourse",
    caption: "A traditional gathering focused on sharing heritage lessons with the younger generation.",
    category: "Community",
    imageUrl: "https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "img-2",
    name: "Heritage Complex Land Site",
    caption: "The beautiful plot in Malkajgiri slated for the new community center development.",
    category: "Community",
    imageUrl: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "img-3",
    name: "Hanuman Jayanti Pooja",
    caption: "Devotees attending the grand prayer session and Hanuman Chalisa recitation.",
    category: "Community",
    imageUrl: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "img-4",
    name: "Sanskrit Speaking Circle",
    caption: "Weekly study sessions celebrating classical language learning and transmission.",
    category: "Community",
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "img-5",
    name: "Vedic Yajna Ceremony",
    caption: "A sacred fire ceremony conducted to bless the land and community welfare activities.",
    category: "Community",
    imageUrl: "https://images.unsplash.com/photo-1542382156909-9ae37b3f56fd?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "img-6",
    name: "Acharya Cultural Fest",
    caption: "Students performing traditional music and dance during the annual cultural day.",
    category: "Community",
    imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=1200",
  }
]

const categories: GalleryCategory[] = ["Community"]

export function GalleryExperience() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("Community")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  useEffect(() => {
    // Directly load static mock images
    setImages(STATIC_IMAGES)
    setLoading(false)
  }, [])

  const filteredImages = useMemo(
    () => images.filter((image) => image.category === activeCategory),
    [activeCategory, images]
  )

  return (
    <motion.section
      className="relative overflow-hidden bg-slate-950 text-slate-100"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
      <div className="container mx-auto px-6 pt-10 pb-20">
        <div className="max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-slate-900/70 px-4 py-1 text-xs uppercase tracking-[0.4em] text-teal-300/90">
            Gallery Experience
          </span>
          <h1 className="mt-8 text-4xl font-serif tracking-tight text-white sm:text-5xl">
            Community Gallery
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            An immersive collection of community gatherings captured in motion.
            Browse the gallery for a premium visual story of Acharya’s spiritual community.
          </p>
        </div>



        <div className="mt-10">
          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-[320px] rounded-[2rem]" />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-4xl border border-rose-500/20 bg-rose-500/5 p-10 text-center text-slate-100">
              <p className="text-lg font-semibold">{error}</p>
              <p className="mt-2 text-sm text-slate-300">Please refresh or check your Drive folder permissions.</p>
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="rounded-4xl border border-white/10 bg-white/5 p-16 text-center text-slate-300">
              <p className="text-xl font-semibold text-white">No images found for this category yet.</p>
              <p className="mt-3 text-sm leading-6">Try another category or add new images to your Google Drive folder.</p>
            </div>
          ) : (
            <GalleryGrid images={filteredImages} onOpen={setSelectedImage} />
          )}
        </div>
      </div>

      <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    </motion.section>
  )
}
