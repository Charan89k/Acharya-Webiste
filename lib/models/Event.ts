import mongoose from 'mongoose'

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: String, required: true },
  time: { type: String },
  location: { type: String },
  category: { type: String, required: true },
  coverImage: { type: String },
  registrationLink: { type: String },
  status: { type: String, enum: ['upcoming', 'completed'], default: 'upcoming' },
  featured: { type: Boolean, default: false },
  attendees: { type: Number, default: 0 },
})

export const Event = mongoose.models.Event || mongoose.model('Event', EventSchema)
