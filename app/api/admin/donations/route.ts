import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { Donation } from '@/lib/models/Donation'
import { checkAdminAuth } from '@/lib/auth-check'

export async function GET() {
  const admin = await checkAdminAuth()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectToDatabase()
    const donations = await Donation.find({}).sort({ date: -1 })
    return NextResponse.json(donations)
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
