import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { connectToDatabase } from '@/lib/db'
import { Admin } from '@/lib/models/Admin'
import { verifyToken } from '@/lib/auth'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_token')?.value

    if (!token) {
      return NextResponse.json({ authenticated: false })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ authenticated: false })
    }

    await connectToDatabase()
    const admin = await Admin.findById(decoded.id)
    if (!admin) {
      return NextResponse.json({ authenticated: false })
    }

    return NextResponse.json({
      authenticated: true,
      username: admin.username,
      email: admin.email,
      role: admin.role,
      requirePasswordChange: admin.requirePasswordChange,
    })
  } catch (err) {
    console.error("Auth check failed:", err)
    return NextResponse.json({ authenticated: false })
  }
}
