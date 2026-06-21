import mongoose from 'mongoose'

const GallerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  caption: { type: String },
  category: { type: String, default: 'Community' },
  imageUrl: { type: String, required: true },
  addedAt: { type: Date, default: Date.now },
  order: { type: Number, default: 0 },
})

export const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema)
