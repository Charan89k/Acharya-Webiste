import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { Event } from '@/lib/models/Event'

export async function GET() {
  try {
    await connectToDatabase()
    const events = await Event.find({}).sort({ date: 1 })
    return NextResponse.json(events)
  } catch (error: any) {
    console.error('Failed to fetch events:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
