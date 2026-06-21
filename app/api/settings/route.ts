import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { Settings } from '@/lib/models/Settings'

export async function GET() {
  try {
    await connectToDatabase()
    let settings = await Settings.findOne({})
    if (!settings) {
      settings = await Settings.create({})
    }
    return NextResponse.json(settings)
  } catch (error: any) {
    console.error('Failed to fetch settings:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
