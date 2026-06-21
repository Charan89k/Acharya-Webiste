export type GalleryCategory = "Community"

export interface GalleryImage {
  id: string
  name: string
  imageUrl: string
  category: GalleryCategory
}
