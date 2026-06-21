import mongoose from 'mongoose'

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, required: true, default: 'admin' },
  requirePasswordChange: { type: Boolean, default: false },
})

export const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema)
