import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { ActivityLog } from '@/lib/models/ActivityLog'
import { checkAdminAuth } from '@/lib/auth-check'

export async function GET() {
  const admin = await checkAdminAuth()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectToDatabase()
    const logs = await ActivityLog.find({}).sort({ timestamp: -1 }).limit(100)
    return NextResponse.json(logs)
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
