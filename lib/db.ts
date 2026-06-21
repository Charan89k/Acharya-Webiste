import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/acharya'

let cached = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null;
    throw e
  }

  // Check and seed the Super Admin if the Admin collection is empty
  try {
    const Admin = mongoose.models.Admin || mongoose.model('Admin', new mongoose.Schema({
      username: { type: String, unique: true, required: true },
      email: { type: String, unique: true, required: true },
      passwordHash: { type: String, required: true },
      role: { type: String, required: true },
      requirePasswordChange: { type: Boolean, default: false }
    }))

    const adminCount = await Admin.countDocuments()
    if (adminCount === 0) {
      // Lazy load bcrypt to avoid import issues before install completes
      const bcrypt = require('bcryptjs')
      const passwordHash = await bcrypt.hash('ChangeOnFirstLogin', 10)
      await Admin.create({
        username: 'admin',
        email: 'admin@acharya.org',
        passwordHash,
        role: 'super-admin',
        requirePasswordChange: true,
      })
      console.log('Seeded default super admin account (admin / ChangeOnFirstLogin).')
    }
  } catch (err) {
    console.error('Error during auto-seeding of super admin:', err)
  }

  return cached.conn
}