import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
})

export const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema)
