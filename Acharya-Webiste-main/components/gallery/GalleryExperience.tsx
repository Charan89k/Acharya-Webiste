"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import { GalleryGrid } from "./GalleryGrid"
import { Lightbox } from "./Lightbox"
import type { GalleryCategory, GalleryImage } from "./types"
import { loadGalleryItems } from "@/services/admin-store"

const categories: GalleryCategory[] = ["Events", "Community", "Celebrations", "Heritage"]

const categoryHints: Array<[GalleryCategory, string[]]> = [
  ["Events", ["event", "satsang", "seminar", "conference", "yajna", "program"]],
  ["Community", ["community", "group", "member", "meeting", "gathering"]],
  ["Celebrations", ["celebration", "festival", "puja", "ceremony", "ritual", "dance"]],
  ["Heritage", ["heritage", "tradition", "historic", "monument", "culture", "legacy"]],
]

function deriveCategory(name: string): GalleryCategory {
  const lower = name.toLowerCase()

  for (const [category, keywords] of categoryHints) {
    if (keywords.some((keyword) => lower.includes(keyword))) {
      return category
    }
  }

  return "Community"
}

export function GalleryExperience() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("Events")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  useEffect(() => {
    async function fetchGallery() {
      try {
        const items = await loadGalleryItems()
        const normalized = items.map((item) => ({
          ...item,
          category: item.category,
        }))
        setImages(normalized)
      } catch (fetchError) {
        console.error(fetchError)
        setError("Unable to load gallery at this time. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchGallery()
  }, [])

  const filteredImages = useMemo(
    () => images.filter((image) => image.category === activeCategory),
    [activeCategory, images]
  )

  const categoryCounts = useMemo(
    () =>
      categories.map((category) => ({
        category,
        count: images.filter((image) => image.category === category).length,
      })),
    [images]
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
            An immersive collection of cultural ceremonies, community gatherings, heritage moments, and celebrations captured in motion.
            Browse the gallery for a premium visual story of Acharya’s spiritual community.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.6fr_0.9fr]">
          <div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-4xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/20">
                <p className="text-sm uppercase tracking-[0.4em] text-teal-300/80">Luxury feel</p>
                <h2 className="mt-4 text-2xl font-semibold text-white">Curated & premium</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Smooth motion, elegant overlays, and a refined dark palette designed for the Acharya community.
                </p>
              </div>
              <div className="rounded-4xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/20">
                <p className="text-sm uppercase tracking-[0.4em] text-teal-300/80">Fast access</p>
                <h2 className="mt-4 text-2xl font-semibold text-white">Always up to date</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  The gallery pulls directly from Google Drive so new moments appear automatically without manual updates.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-4xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.4em] text-teal-300/80">Current focus</p>
            <div className="mt-5 space-y-4">
              {categoryCounts.map((item) => (
                <div key={item.category} className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/50 px-4 py-4">
                  <span className="font-medium text-slate-100">{item.category}</span>
                  <span className="rounded-full bg-slate-800/80 px-3 py-1 text-xs uppercase tracking-[0.35em] text-slate-300">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3 text-slate-300">
              <span className="text-sm uppercase tracking-[0.35em] text-teal-300/80">Tip</span>
              <span className="grow text-sm leading-6">
                Select a category to refine the gallery and enjoy a more immersive browsing experience.
              </span>
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-4xl border border-white/10 bg-slate-900/80 p-4 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
          <div className="flex flex-wrap items-center gap-3 py-4">
            {categories.map((category) => {
              const isActive = category === activeCategory
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={
                    isActive
                      ? "rounded-full bg-teal-300 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-teal-300/15"
                      : "rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-slate-300 transition hover:border-teal-300/30 hover:bg-slate-800"
                  }
                >
                  {category}
                </button>
              )
            })}
          </div>
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
