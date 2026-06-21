import mongoose from 'mongoose'

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  memberType: { type: String, enum: ['Ordinary', 'Life', 'Patron'], default: 'Ordinary' },
  phone: { type: String },
  address: { type: String },
  joinedAt: { type: Date, default: Date.now },
})

export const Member = mongoose.models.Member || mongoose.model('Member', MemberSchema)
