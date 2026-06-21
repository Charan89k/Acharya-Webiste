import mongoose from 'mongoose'

const DonationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Completed' },
  message: { type: String },
})

export const Donation = mongoose.models.Donation || mongoose.model('Donation', DonationSchema)
