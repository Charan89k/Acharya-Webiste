export type GalleryCategory = "Events" | "Community" | "Celebrations" | "Heritage"

export interface GalleryImage {
  id: string
  name: string
  imageUrl: string
  category: GalleryCategory
}
