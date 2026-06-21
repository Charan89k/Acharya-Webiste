"use client"

import type { GalleryImage } from "./types"
import { GalleryCard } from "./GalleryCard"

interface GalleryGridProps {
  images: GalleryImage[]
  onOpen: (image: GalleryImage) => void
}

export function GalleryGrid({ images, onOpen }: GalleryGridProps) {
  return (
    <div className="columns-1 gap-4 space-y-4 sm:columns-2 xl:columns-3">
      {images.map((image) => (
        <div key={image.id} className="break-inside-avoid">
          <GalleryCard image={image} onOpen={onOpen} />
        </div>
      ))}
    </div>
  )
}
