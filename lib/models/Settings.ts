import mongoose from 'mongoose'

const SettingsSchema = new mongoose.Schema({
  orgName: { type: String, default: 'ACHARYA' },
  address: { type: String, default: 'ACHARYA Community Centre, Malkajgiri, Hyderabad, Telangana 500047' },
  contactNumber: { type: String, default: '+91 40 XXXX XXXX' },
  email: { type: String, default: 'contact@acharya.org' },
  facebook: { type: String, default: '#' },
  twitter: { type: String, default: '#' },
  instagram: { type: String, default: '#' },
  youtube: { type: String, default: '#' },
  linkedin: { type: String, default: '#' },
})

export const Settings = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema)
